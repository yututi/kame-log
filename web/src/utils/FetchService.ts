import { cache } from "react";

/**
 * getリクエストのみ対応
 * リクエストの重複排除と同じinputに対するレスポンスの使い回しを行う
 */
export default class FetchService {

  fetchingProcesses = new Map<string, Promise<unknown>>()
  cachedResponses = new Map<string, unknown>()

  fetch<T>(input: RequestInfo | URL, init?: RequestInit, force: boolean = false): Promise<T | null> {
    const key = JSON.stringify(input);

    if (force) {
      this.cachedResponses.delete(key);
    }

    if (this.cachedResponses.has(key)) {
      return Promise.resolve(this.cachedResponses.get(key) as T);
    }

    const fetchingProcess = this.fetchingProcesses.get(key)
    if (fetchingProcess) {
      return fetchingProcess as Promise<T>
    }
    const fetchProcess = fetch(input, init)
      .then(res => {
        this.fetchingProcesses.delete(key);
        return res;
      })
      .then(res => res.json() as T)
      .then(body => {
        this.cachedResponses.set(key, body);
        return body;
      });
    this.fetchingProcesses.set(key, fetchProcess)
    return fetchProcess;
  }

}