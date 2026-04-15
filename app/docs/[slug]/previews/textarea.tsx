import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function TextareaPreview() {
  return (
    <Label content="Message" className="w-80">
      <Textarea placeholder="Type your message..." />
    </Label>
  );
}
