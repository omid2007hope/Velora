// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import axios from "axios";
import { API_BaseURL } from "./API_BaseURL";
import { getAuthHeaders } from "./authHeaders";

async function FetchCustomerAddress(customerAddress) {
  console.log("customerAddress API:", customerAddress);

  if (customerAddress) {
    try {
      const response = await axios.post(
        `${API_BaseURL}/server/customer/login/account/address`,
        customerAddress,
        { headers: getAuthHeaders() },
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


