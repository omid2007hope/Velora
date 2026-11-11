/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * NOTICE: This file contains proprietary source code licensed exclusively under the
 * terms of the LICENSE file in the root directory of this repository.
 * You may view, download, and compile this code solely to run the unmodified product.
 * Copying, pasting, modifying, redistributing, creating derivative works, or using
 * this code in any other project or AI training system is strictly prohibited.
 * Removal or alteration of this notice is a violation of 17 U.S.C. § 1202 and EU law.
 */

import { useEffect, useRef, useState } from "react";

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
            reqError?.response?.data?.error || reqError?.message || fallbackErrorRef.current
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
