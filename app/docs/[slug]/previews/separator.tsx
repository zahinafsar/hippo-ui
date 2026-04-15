import { Separator } from "@/components/ui/separator";

export default function SeparatorPreview() {
  return (
    <div className="flex w-80 flex-col gap-4">
      <div>Above</div>
      <Separator />
      <div>Below</div>
    </div>
  );
}
