import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function BreadcrumbPreview() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>Settings</BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem current>Profile</BreadcrumbItem>
    </Breadcrumb>
  );
}
