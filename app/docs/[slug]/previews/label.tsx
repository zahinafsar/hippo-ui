import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LabelPreview() {
  return (
    <div className="flex flex-col gap-4">
      <Label content="Top" className="w-80">
        <Input />
      </Label>
      <Label content="Bottom" position="bottom" className="w-80">
        <Input />
      </Label>
      <Label content="Left" position="left">
        <Input className="w-60" />
      </Label>
      <Label content="Right" position="right">
        <Input className="w-60" />
      </Label>
    </div>
  );
}
