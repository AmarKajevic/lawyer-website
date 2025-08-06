
type GoogleMapEmbedProps = {
  iframeHtml: string;
}

 export default function GoogleMapEmbed({iframeHtml}: GoogleMapEmbedProps) {
  return (
    <div
className="flex justify-center "
  style={{ width: '100%', height: '400px' }}
      dangerouslySetInnerHTML={{ __html: iframeHtml }}
    />
  )
}