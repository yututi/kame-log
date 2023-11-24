type Tags = {
  name: string
  value: string
  color: string
  type: string[]
}
type Image = {
  url: string
}
type Banner = {
  image: Image
  link: string
  title?: string
  description?: string
}
export type EndpointDefinitions = {
  blog: {
    Content: {
      title: string
      body: string
      tags: Tags[]
    }
  }
  tags: {
    Content: Tags
  }
  config: {
    Content: {
      heroBanners: Banner[]
    }
  }
}

export type Endpoints = keyof EndpointDefinitions

export type MicroCMSContentBase = {
  id: string
  publishedAt: string
  revisedAt: string
  createdAt: string
  updatedAt: string
}

export type MicroCMSContentList<T> = {
  contents: (MicroCMSContentBase & T)[]
  totalCount: number
  offset: number
  limit: number
}
