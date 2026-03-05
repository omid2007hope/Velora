// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import axios from "axios";
import { API_BaseURL } from "./API_BaseURL";

async function FetchLoginData(loginData) {
  try {
    const response = await axios.post(
      `${API_BaseURL}/server/customer/login`,
      loginData,
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error || error.response?.data || error.message;
    console.error("Request failed:", message);
    throw error;
  }
}

export default FetchLoginData;


