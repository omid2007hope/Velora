"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchProductById } from "@/features/catalog/services/catalog-service";
import {
  createReview,
  fetchReviews,
} from "@/features/product/services/review-service";

const initialReview = {
  name: "",
  rating: 5,
  comment: "",
};

export function useProductDetails(productId) {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewForm, setReviewForm] = useState(initialReview);

  useEffect(() => {
    if (!productId) {
      return;
    }

    let active = true;

    async function loadProductData() {
      try {
        setLoading(true);
        const [productData, reviewsData] = await Promise.all([
          fetchProductById(productId),
          fetchReviews(productId),
        ]);

        if (!active) return;

        setProduct(productData);
        setReviews(reviewsData || []);
        setError(null);
      } catch {
        if (!active) return;

        setProduct(null);
        setReviews([]);
        setError("Product not found");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProductData();

    return () => {
      active = false;
    };
  }, [productId]);

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
      throw new Error("Please add your name and comment before submitting a review.");
    }

    try {
      await createReview(productId, review);
    } catch {
      // Keep the optimistic review locally so the UI stays responsive.
    }

    setReviews((previousReviews) => [...previousReviews, review]);
    setReviewForm(initialReview);
  }

  return {
    product,
    reviews,
    loading,
    error,
    reviewForm,
    setReviewForm,
    ratingCounts,
    totalRatings,
    averageRating,
    submitProductReview,
  };
}
