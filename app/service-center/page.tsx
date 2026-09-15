import type { Metadata } from "next";
import ServiceCenter from "@/components/service-center/ServiceCenter";

export const metadata: Metadata = {
  title: "Service Center | Nexora Tech",
  description: "Get help with your desktop, laptop, printer and other devices. Prepare a service request and explore device care guides.",
};

export default function ServiceCenterPage() {
  return <ServiceCenter />;
}
