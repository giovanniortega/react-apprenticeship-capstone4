import { useState, useCallback } from "react";
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

const useHttp = () => {
  const [apiDataIsLoading, setApiDataIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();

  const fetchData = useCallback(
    async (queryParams: queryParamsType, setApiData: (data: any) => void) => {
      const controller = new AbortController();

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

      return () => {
        controller.abort();
      };
    },
    [apiRef]
  );

  return { apiDataIsLoading, apiError, isApiMetadataLoading, fetchData };
};

export default useHttp;
