import { isSSR } from "@/utils";
import { URLSearchParams } from "url";
import { EndpointDefinitions, Endpoints, MicroCMSContentBase, MicroCMSContentList } from "./types";

const baseUrl = isSSR ? `https://${process.env.MICROCMS_SERVICE_ID}.microcms.io/api/v1` : "/api/cms"

export const get = async <T extends Endpoints, C = EndpointDefinitions[T]["Content"]>(endpoint: T, contentId: string, params?: URLSearchParams): Promise<MicroCMSContentBase & C> => {
  const res = await fetch(`${baseUrl}/${endpoint}/${contentId}/?${params?.toString()}`, {
    headers: {
      "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY || ""
    },
    next: {
      revalidate: 60 * 60 * 24
    }
  })

  return await res.json();
}

export const getList = async <T extends Endpoints, C = EndpointDefinitions[T]["Content"]>(endpoint: T, params?: URLSearchParams): Promise<MicroCMSContentList<C>> => {
  const res = await fetch(`${baseUrl}/${endpoint}/?${params?.toString()}`, {
    headers: {
      "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY || ""
    },
    next: {
      revalidate: 60
    }
  })

  return await res.json();
}

export const getObject = async <T extends Endpoints, C = EndpointDefinitions[T]["Content"]>(endpoint: T, params?: URLSearchParams): Promise<MicroCMSContentBase & C> => {
  const res = await fetch(`${baseUrl}/${endpoint}/?${params?.toString()}`, {
    headers: {
      "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY || ""
    },
  })

  return await res.json();
}

type Query = {
  fields?: string[];
  draftKey?: string;
  depth?: 1 | 2 | 3;
  richEditorFormat?: boolean;
}
type ListQuery = Query & {
  limit?: number;
  offset?: number;
  orders?: string;
  q?: string;
  ids?: string[];
  filters?: string;
}
export const createQuery = (param: Query) => {
  return convertParams(param);
}
export const createListQuery = (param: ListQuery) => {
  return convertParams(param);
}

const convertParams = (param: any) => {
  return Object.entries(param).reduce((all, [key, value]) => {
    if (!value) return all;
    if (Array.isArray(value)) {
      all.append(key, value.join(","));
    }
    else if (typeof value === "number") {
      all.append(key, String(value));
    }
    else if (typeof value === "boolean") {
      if (value) {
        all.append(key, "true");
      }
    }
    return all;
  }, new URLSearchParams())
}