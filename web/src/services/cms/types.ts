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
      tags: string[]
      metaDescription: string
      keywords: string
    }
  }
  config: {
    Content: {
      heroBanners: Banner[]
    }
  }
  memo: {
    Content: {
      at: string
      memo: string
      feeds: {
        name: string
        intake: string
      }[]
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
