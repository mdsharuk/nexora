import type { Metadata } from "next";
import ServiceCenter from "@/components/service-center/ServiceCenter";
import JsonLd from "@/components/common/JsonLd";
import { pageSchema } from "@/modules/structuredData";

export const metadata: Metadata = {
  title: "Service Center | Nexora Tech",
  description: "Get help with your desktop, laptop, printer and other devices. Prepare a service request and explore device care guides.",
};

export default function ServiceCenterPage() {
  return <><JsonLd id="page-jsonld" data={pageSchema("/service-center", "Service Center")} /><ServiceCenter /></>;
}
