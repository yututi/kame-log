import FetchService from '@/utils/FetchService'
import { useEffect, useState } from 'react'

type GetRequestInit = Omit<RequestInit, 'method'>

const fetchService = new FetchService()

// 雑に実装しただけ。GET以外は利用できない。
export default function useFetch<T>(input?: RequestInfo | URL, init?: GetRequestInit) {
  const [response, setResponse] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (!input) return setResponse(null)
    setIsLoading(true)
    fetchService
      .fetch<T>(input, init)
      .then(setResponse)
      .finally(() => setIsLoading(false))
  }, [input, init])

  return { response, isLoading }
}
