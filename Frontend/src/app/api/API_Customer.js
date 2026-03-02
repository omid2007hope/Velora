import axios from "axios";
import { API_BaseURL } from "./API_BaseURL";

async function FetchCustomerData(customerData) {
  // console.log("customerData API:", customerData);

  try {
    const response = await axios.post(
      `${API_BaseURL}/server/customer`,
      customerData,
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error || error.response?.data || error.message;
    console.error("Request failed:", message);
    throw error;
  }
}

export default FetchCustomerData;
