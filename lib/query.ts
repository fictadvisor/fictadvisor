import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useQueryParams = (onInitialize?) => {
  const router = useRouter();
  const [params, updateParams] = useState({});
  const [ready, setReady] = useState(false);

  const updateQuery = (params) => {
    router.push({ 
      pathname: router.pathname, 
      query: { ...router.query, ...params } }, 
      null, 
      { shallow: true }
    );
  };

  const setQueryParam = (key, value) => {
    if (value == null || value == '') {
      delete params[key];
      delete router.query[key];
    } else {
      params[key] = value;
    }

    updateParams(params);
    updateQuery(params);
  };

  const withQueryParam = (param, fn) => {
    return (value) => {
      setQueryParam(param, value);
      fn(value);
    };
  };

  useEffect(() => {
    if (!router.isReady) { return; }

    const params = router.query
    updateParams(params);
    
    if (onInitialize) {
      onInitialize(params);
    }

    setReady(true);
  }, [router.isReady]);

  return {
    queryReady: ready,
    queryParams: params,
    withQueryParam,
    setQueryParam,
  };
};
