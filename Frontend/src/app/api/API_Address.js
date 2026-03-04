import axios from "axios";
import { API_BaseURL } from "./API_BaseURL";

async function FetchCustomerAddress(customerAddress) {
  console.log("customerAddress API:", customerAddress);

  if (customerAddress) {
    try {
      const response = await axios.post(
        `${API_BaseURL}/server/customer/login/account/address`,
        customerAddress,
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.response?.data || error.message;
      console.error("Request failed:", message);
      throw error;
    }
  } else {
    alert("Failed to get CustomerDetails from API_CustomerDetails.js");
    return;
  }
}

export default FetchCustomerAddress;
