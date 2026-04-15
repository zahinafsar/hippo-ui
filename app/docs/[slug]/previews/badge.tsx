import { Badge } from "@/components/ui/badge";
import { CheckIcon } from "lucide-react";

export default function BadgePreview() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="success">
        <CheckIcon />
        Verified
      </Badge>
    </div>
  );
}
