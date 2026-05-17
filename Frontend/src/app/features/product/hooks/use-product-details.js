"use client";

import { useCallback, useMemo, useState } from "react";
import { fetchProductById } from "@/app/features/catalog/services/catalog-service";
import {
  createReview,
  fetchReviews,
} from "@/app/features/product/services/review-service";
import { useHandleApi } from "@/app/lib/function";

const initialReview = {
  name: "",
  rating: 5,
  comment: "",
};

const initialProductState = {
  product: null,
  reviews: [],
};

export function useProductDetails(productId) {
  const [reviewForm, setReviewForm] = useState(initialReview);

  const apiFn = useCallback(async () => {
    const [productData, reviewsData] = await Promise.all([
      fetchProductById(productId),
      fetchReviews(productId),
    ]);

    return {
      product: productData,
      reviews: reviewsData,
    };
  }, [productId]);

  const { data, loading, error, setData } = useHandleApi(apiFn, {
    initialData: initialProductState,
    enabled: Boolean(productId),
    mapData: (payload) => ({
      product: payload?.product || null,
      reviews: Array.isArray(payload?.reviews) ? payload.reviews : [],
    }),
    fallbackError: "Product not found",
  });

  const product = data?.product || null;
  const reviews = Array.isArray(data?.reviews) ? data.reviews : [];

  const ratingCounts = useMemo(() => {
    return reviews.reduce((accumulator, review) => {
      accumulator[review.rating] = (accumulator[review.rating] || 0) + 1;
      return accumulator;
    }, {});
  }, [reviews]);

  const totalRatings = reviews.length;

  const averageRating = useMemo(() => {
    if (!totalRatings) {
      return 0;
    }

    const sum = reviews.reduce((accumulator, review) => {
      return accumulator + (review.rating || 0);
    }, 0);

    return sum / totalRatings;
  }, [reviews, totalRatings]);

  async function submitProductReview() {
    const review = {
      ...reviewForm,
      rating: Number(reviewForm.rating) || 5,
    };

    if (!review.name.trim() || !review.comment.trim()) {
      throw new Error(
        "Please add your name and comment before submitting a review.",
      );
    }

    try {
      await createReview(productId, review);
    } catch {
      // Keep the optimistic review locally so the UI stays responsive.
    }

    setData((previousData) => ({
      ...previousData,
      reviews: [...(previousData?.reviews || []), review],
    }));
    setReviewForm(initialReview);
  }

  return {
    product,
    reviews,
    loading,
    error: error || null,
    reviewForm,
    setReviewForm,
    ratingCounts,
    totalRatings,
    averageRating,
    submitProductReview,
  };
}
