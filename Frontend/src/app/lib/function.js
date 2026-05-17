import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_INITIAL_DATA = [];
const DEFAULT_MAP_DATA = (value) => (Array.isArray(value) ? value : []);

export function useHandleApi(apiFn, options = {}) {
  const {
    initialData = DEFAULT_INITIAL_DATA,
    enabled = true,
    mapData = DEFAULT_MAP_DATA,
    fallbackError = "Could not load any data.",
  } = options;

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refetchCount, setRefetchCount] = useState(0);

  const mapDataRef = useRef(mapData);
  const fallbackErrorRef = useRef(fallbackError);

  mapDataRef.current = mapData;
  fallbackErrorRef.current = fallbackError;

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      setError("");
      setData(initialData);
    }
  }, [enabled, initialData]);

  useEffect(() => {
    let ignore = false;

    if (!enabled) {
      return () => {
        ignore = true;
      };
    }

    async function fetchAndLoad() {
      setLoading(true);
      setError("");

      try {
        const result = await apiFn();

        if (!ignore) {
          setData(mapDataRef.current(result));
        }
      } catch (reqError) {
        if (!ignore) {
          setError(
            reqError?.response?.data?.error ||
              reqError?.message ||
              fallbackErrorRef.current,
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
  }, [apiFn, enabled]);

  return {
    data,
    dataList: data,
    loading,
    error,
    setData,
    setDataList: setData,
  };
}
