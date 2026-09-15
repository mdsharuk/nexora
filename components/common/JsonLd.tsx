import { serializeJsonLd, type StructuredData } from "@/modules/structuredData";

export default function JsonLd({ data, id }: { data: StructuredData | StructuredData[] | null; id?: string }) {
  if (!data) return null;
  return <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
