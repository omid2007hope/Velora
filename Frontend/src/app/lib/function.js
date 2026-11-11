// SPDX-License-Identifier: LicenseRef-Velora-Proprietary
/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * PROPRIETARY SOURCE-AVAILABLE SOFTWARE — NOT OPEN SOURCE.
 * Permission to view, clone, or compile this file is granted strictly on the
 * condition precedent of full compliance with the root ./LICENSE file.
 * Copying snippets, modifying, creating derivative works, redistributing,
 * commercial/SaaS use, and AI/ML training (reserved under EU Directive
 * 2019/790 Art. 4(3) and § 42h(6) Austrian UrhG) are strictly prohibited.
 * Removal or alteration of this notice violates 17 U.S.C. § 1202 and § 90c UrhG.
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
