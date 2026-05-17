import { useEffect, useState } from "react";

export function useHandleApi(apiFn) {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function fetchAndLoad() {
      setLoading(true);
      setError("");

      try {
        const data = await apiFn();

        if (!ignore) {
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
  }, [apiFn]);

  return {
    dataList,
    loading,
    error,
    setDataList,
  };
}
