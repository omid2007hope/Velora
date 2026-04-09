"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearBasket } from "@/app/redux/slice/BasketSlice";
import { createOrder } from "@/app/features/order/services/order-service";
import { calculateOrderPricing } from "@/app/features/order/utils/order-pricing";
import {
  clearSavedPaymentDraft,
  getSavedAddress,
  getStoredUser,
  saveSavedAddress,
  saveStoredUser,
} from "@/app/lib/browser-storage";

const initialForm = {
  email: "",
  fullName: "",
  street: "",
  country: "",
  city: "",
  postal: "",
};

export function useCheckoutForm(cartItems, onComplete) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    clearSavedPaymentDraft();

    const user = getStoredUser() || {};
    const address = getSavedAddress();

    setForm((previousForm) => ({
      ...previousForm,
      email: user.email || previousForm.email,
      fullName: user.fullName || previousForm.fullName,
      street: address.street || previousForm.street,
      country: address.country || previousForm.country,
      city: address.city || previousForm.city,
      postal: address.postal || previousForm.postal,
    }));
  }, []);

  const pricing = useMemo(() => calculateOrderPricing(cartItems), [cartItems]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
  }

  function validateForm() {
    const requiredFields = [
      "email",
      "fullName",
      "street",
      "country",
      "city",
      "postal",
    ];

    const missingField = requiredFields.some((field) => !form[field]?.trim());

    if (missingField) {
      throw new Error("Please complete all required fields before paying.");
    }

    if (!cartItems.length) {
      throw new Error("Add items to your cart first.");
    }
  }

  function persistCheckoutDetails() {
    saveSavedAddress({
      street: form.street,
      country: form.country,
      city: form.city,
      postal: form.postal,
    });

    saveStoredUser({
      fullName: form.fullName,
      email: form.email,
    });
  }

  async function submitOrder() {
    validateForm();
    setSubmitting(true);

    try {
      persistCheckoutDetails();

      const payload = {
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity ?? 1,
          selectedColor: item.selectedColor ?? null,
          selectedSize: item.selectedSize ?? null,
        })),
        shipping: pricing.shipping,
        tax: pricing.tax,
        currency: "USD",
        addressSnapshot: {
          street: form.street,
          country: form.country,
          city: form.city,
          postalCode: form.postal,
        },
      };

      const orderResponse = await createOrder(payload);
      dispatch(clearBasket());

      if (orderResponse?.paymentIntent?.clientSecret) {
        alert(
          "Payment intent created. Use Stripe Elements to complete the payment with client secret:\n" +
            orderResponse.paymentIntent.clientSecret,
        );
      } else {
        alert("Order created. Payment pending.");
      }

      onComplete?.();
      router.push("/order");
    } finally {
      setSubmitting(false);
    }
  }

  return {
    form,
    updateField,
    submitOrder,
    pricing,
    submitting,
  };
}
