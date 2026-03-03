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

// !  the date comes from two seperated source, one is the register page, one is the account page.
// ! what is the data, it's fullName, email, password, phonenumber, dateofBirth and geneder.
// ! it is bieng send to the backend using one API localhost 3000
// !
