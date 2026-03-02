import axios from "axios";
import { API_BaseURL } from "./API_BaseURL";

async function FetchCustomerDetails(customerDetails) {
  // console.log("customerData API:", customerDetail);

  try {
    const response = await axios.post(
      `${API_BaseURL}/server/customer/details`,
      customerDetails,
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
