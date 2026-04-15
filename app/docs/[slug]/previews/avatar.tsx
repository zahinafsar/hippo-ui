import { Avatar } from "@/components/ui/avatar";

export default function AvatarPreview() {
  return (
    <div className="flex items-center gap-3">
      <Avatar src="https://github.com/zahinafsar.png" alt="zahinafsar" fallback="SC" />
      <Avatar fallback="JD" size="sm" />
      <Avatar fallback="AB" size="lg" />
    </div>
  );
}
