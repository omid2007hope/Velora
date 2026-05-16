import { useEffect, useState } from "react";

export function HandelApi(apiData) {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // `ignore` is used to prevent state updates after component unmount. It starts as false (declared in closure)
  // and is set to true in the cleanup function when the component unmounts or effect re-runs
  let ignore = false;

  useEffect(() => {
    async function fetchAndLoad() {
      setLoading(true);
      setError("");

      try {
        const data = await apiData;

        // Check if component is still mounted (ignore === false). If ignore is true, the component has unmounted,
        // so we skip state updates to avoid memory leaks and "Can't perform a React state update on an unmounted component" warning
        if (!ignore) {
          //! If the fetched data is an array, use it; otherwise, set to an empty array
          //! If It's an array gives us the data otherwise although it is gives us nothing but preventing any potential errors
          setDataList(Array.isArray(data) ? data : []);
        }
      } catch (reqError) {
        // Only update error state if component is still mounted (ignore === false).
        // If ignore is true, the component has unmounted and we should not trigger state updates
        if (!ignore) {
          setError(
            reqError?.response?.data?.error ||
              reqError?.message ||
              "Could not load any data.",
          );
        }
      } finally {
        // Only set loading to false if component is still mounted (ignore === false).
        // This prevents state updates on unmounted components which would cause memory leaks
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchAndLoad();

    // Cleanup function: Set ignore to true when component unmounts or effect re-runs.
    // This signals that any pending state updates from the async operation should be skipped
    // because the component is no longer mounted and cannot accept state updates
    return () => {
      ignore = true;
    };
  }, []);

  return {
    dataList,
    loading,
    error,
    setDataList,
  };
}

//! ignore === true means this function has not been called yet therefore call it
//! ignore === false means this function has been called once therefore there is no need to be called again
