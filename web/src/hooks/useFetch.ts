
import FetchService from "@/utils/FetchService";
import { useEffect, useState } from "react";

const cache = new Map();

type GetRequestInit = Omit<RequestInit, "method">;

const fetchService = new FetchService();

// 雑に実装しただけ。GET以外は利用できない。
export default function useFetch<T>(input?: RequestInfo | URL, init?: GetRequestInit) {

  const [response, setResponse] = useState<T | null>(null);
  useEffect(() => {
    if (!input) return setResponse(null);

    fetchService.fetch<T>(input, init).then(setResponse)

  }, [input, init]);

  return response;
}
