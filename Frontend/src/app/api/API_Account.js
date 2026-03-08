import axios from "axios";
import { API_BaseURL } from "./API_BaseURL";
import { getAuthHeaders } from "./authHeaders";

async function FetchCustomerDetails(customerDetails) {
  if (!customerDetails) {
    throw new Error("customerDetails payload is required");
  }

  try {
    const response = await axios.post(
      `${API_BaseURL}/server/customer/login/account`,
      customerDetails,
      { headers: getAuthHeaders() },
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error || error.response?.data || error.message;
    console.error("Request failed:", message);
    throw error;
  }
}

export default FetchCustomerDetails;


