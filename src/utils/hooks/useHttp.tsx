import { useState, useCallback } from "react";

const useHttp = () => {
  const [apiDataIsLoading, setApiDataIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (url: string, setApiData: (data: any) => void) => {
      setApiDataIsLoading(true);

      try {
        const response: Response = await fetch(url);

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
    },
    []
  );

  return { apiDataIsLoading, apiError, fetchData };
};

export default useHttp;
