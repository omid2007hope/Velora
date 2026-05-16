import { useEffect, useState } from "react";
import { getSellerProducts } from "@/api/seller/Seller_API";

export function HandelApi() {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
a
    async function fetchAndLoad() {
      setLoading(true);
      setError("");

      try {
        const data = await getSellerProducts();

        if (!ignore) {
          //! If the fetched data is an array, use it; otherwise, set to an empty array
          //! If It's an array gives us the data otherwise although it is gives us nothing but preventing any potential errors
          setDataList(Array.isArray(data) ? data : []);
        }
      } catch (reqError) {
        if (!ignore) {
          setError(
            reqError?.response?.data?.error ||
              reqError?.message ||
              "Could not load any data.",
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchAndLoad();

    return () => {
      ignore = true;
    };
  }, []);
}

return {
  dataList,
  loading,
  error,
  setDataList,
};

//! ignore === true means this function has not been called yet therefore call it
//! ignore === false means this function has been called once therefore there is no need to be called again
