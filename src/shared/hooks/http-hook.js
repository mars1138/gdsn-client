import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsSubmitting(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();
        console.log(responseData);

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          console.log('Http Error!');
          throw new Error(responseData.message);
        }
        setIsSubmitting(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsSubmitting(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(undefined);
  };

  //   abort any active http requests if leaving current page
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isSubmitting, error, sendRequest, clearError };
};
