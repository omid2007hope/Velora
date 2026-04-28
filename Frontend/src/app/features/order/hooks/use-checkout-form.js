"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { clearBasket } from "@/app/redux/slice/BasketSlice";
import { createOrder } from "@/app/features/order/services/order-service";
import { calculateOrderPricing } from "@/app/features/order/utils/order-pricing";
import {
  clearSavedPaymentDraft,
  getSavedAddress,
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
  const reduxUser = useSelector((state) => state.auth.user);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    clearSavedPaymentDraft();

    const user = reduxUser || {};
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
  }, [reduxUser]);

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
    setSubmitting(true);
    setSubmitError("");
    setSubmitMessage("");

    try {
      validateForm();
      persistCheckoutDetails();

      const payload = {
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity ?? 1,
          selectedColor: item.selectedColor ?? null,
          selectedSize: item.selectedSize ?? null,
        })),
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
      setSubmitMessage(
        orderResponse?.paymentIntent?.providerIntentId
          ? "Order created. Continue with secure Stripe payment."
          : "Order created. Payment is pending.",
      );

      onComplete?.();
      router.push("/order");
      return true;
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error?.message ||
        "Unable to submit order. Please login and try again.";
      setSubmitError(message);
      return false;
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
    submitError,
    submitMessage,
  };
}
