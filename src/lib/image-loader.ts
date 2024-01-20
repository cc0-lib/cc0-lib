// Docs: https://developers.cloudflare.com/images/url-format
export default function cloudflareLoader({
    src,
    width,
    quality,
  }: {
    src: string;
    width: number;
    quality?: number;
  }) {
    const params = [`width=${width}`, `quality=${quality || 75}`, "format=auto"];
    return `https://nero1.run/cdn-cgi/image/${params.join(",")}/${src}`;
  }
  