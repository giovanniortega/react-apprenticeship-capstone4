import { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants";

interface InitialAPIMetadataType {
  ref: string | null,
  isLoading: boolean
}

interface responseDataType {
  refs: [
    {
      ref: string;
    }
  ]
}

const INITIAL_API_METADATA:InitialAPIMetadataType = { ref: null, isLoading: true };

export function useLatestAPI() {
  const [apiMetadata, setApiMetadata] = useState<InitialAPIMetadataType>(INITIAL_API_METADATA);

  useEffect(() => {
    const controller = new AbortController();

    async function getAPIMetadata() {
      try {
        setApiMetadata(INITIAL_API_METADATA);

        const response:Response = await fetch(API_BASE_URL, {
          signal: controller.signal,
        });

        const responseData:responseDataType = await response.json();
        const { refs } = responseData;
        const ref = refs[0].ref;

        setApiMetadata({ ref, isLoading: false });
      } catch (err) {
        setApiMetadata({ ref: null, isLoading: false });
        console.error(err);
      }
    }

    getAPIMetadata();

    return () => {
      controller.abort();
    };

  }, []);

  return apiMetadata;
}
