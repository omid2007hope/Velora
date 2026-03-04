const PaymentService = require("../../service/version_1/Payment");

async function PaymentDetails(req, res) {
  try {
    const { name, cardNumber, cvv, expiry } = req.body || {};

    const normalizedInput = {
      name: typeof name === "string" ? name.trim() : "",
      cardNumber: typeof cardNumber === "string" ? cardNumber.trim() : "",
      cvv: typeof cvv === "string" ? cvv.trim() : "",
      expiry: typeof expiry === "string" ? expiry.trim() : "",
    };

    if (
      !normalizedInput.name ||
      !normalizedInput.cardNumber ||
      !normalizedInput.cvv ||
      !normalizedInput.expiry
    ) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["name", "cardNumber", "cvv", "expiry"],
      });
    }

    const normalizedCardNumber = normalizedInput.cardNumber.replace(/\D/g, "");

    if (!/^\d{12,19}$/.test(normalizedCardNumber)) {
      return res.status(400).json({
        error: "Invalid card number format",
      });
    }

    if (!/^\d{3,4}$/.test(normalizedInput.cvv)) {
      return res.status(400).json({
        error: "Invalid cvv format",
      });
    }

    const sendPaymentDetails =
      await PaymentService.PaymentDetails({
        ...normalizedInput,
        cardNumber: normalizedCardNumber,
      });

    const responseBody = {
      _id: sendPaymentDetails?.data?._id,
      ...sendPaymentDetails,
    };

    console.log("Controller: payment create request received");

    // Tests expect a 200; respond with 200 for both new and existing cards.
    return res.status(200).json(responseBody);
  } catch (error) {
    console.error("PaymentDetails error:", error.message);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

module.exports = {
  PaymentDetails,
};
