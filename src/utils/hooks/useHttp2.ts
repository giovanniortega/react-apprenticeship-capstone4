import { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants";
import { useLatestAPI } from "./useLatestAPI";

interface queryParamsType {
  docId?: string;
  docType?: string;
  docTags?: string;
  searchTerm?: string;
  lang?: string;
  pageSize?: number;
}

const useHttp = (
  queryParams: queryParamsType,
  setApiData: (data: any) => void
) => {
  const [apiDataIsLoading, setApiDataIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();

  useEffect(() => {
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const controller = new AbortController();

    const fetchData = async () => {
      setApiDataIsLoading(true);

      const joinParams = [
        queryParams.docId &&
          `&q=${encodeURIComponent(
            `[[:d = at(document.id, "${queryParams.docId}")]]`
          )}`,
        queryParams.docType &&
          `&q=${encodeURIComponent(
            `[[at(document.type, "${queryParams.docType}")]]`
          )}`,
        queryParams.docTags &&
          `&q=${encodeURIComponent(
            `[[at(document.tags, ["${queryParams.docTags}"])]]`
          )}`,
        queryParams.searchTerm &&
          `&q=${encodeURIComponent(
            `[[fulltext(document, "${queryParams.searchTerm}")]]`
          )}`,
        queryParams.lang && `&lang=${queryParams.lang}`,
        queryParams.pageSize && `&pageSize=${queryParams.pageSize}`,
      ];

      const urlParams = joinParams.join("");

      const URL = `${API_BASE_URL}/documents/search?ref=${apiRef}${urlParams}`;

      try {
        const response: Response = await fetch(URL);

        if (!response.ok) {
          throw new Error("Something went wrong with the service!");
        }

        response.json().then((data: Object | undefined) => {
          setApiData(data);
          setApiDataIsLoading(false);
        });
      } catch (error: any) {
        setApiError(error.message || "Something went wrong");
        setApiDataIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [
    apiRef,
    isApiMetadataLoading,
    setApiData,
    queryParams.docId,
    queryParams.docType,
    queryParams.docTags,
    queryParams.searchTerm,
    queryParams.lang,
    queryParams.pageSize,
  ]);

  return { apiDataIsLoading, apiError };
};

export default useHttp;
