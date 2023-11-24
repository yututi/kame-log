import HeroBanner from "@/components/HeroBanner";
import { createListQuery, getObject } from "@/services/cms/client";


export default async function SiteTopBanner() {

  const config = await getObject("config", createListQuery({
    fields: ["heroBanners"]
  }));

  return (
    <HeroBanner
      banners={config.heroBanners.map(banner => ({
        ...banner,
        src: banner.image.url
      }))}
    />
  )
}