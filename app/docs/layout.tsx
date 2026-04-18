import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { ReactNode } from "react";
import { registry } from "@/lib/registry";
import { ThemeToggle } from "@/components/docs/theme-toggle";
import { PaletteSwitcher } from "@/components/docs/palette-switcher";
import { ComponentSearch } from "@/components/docs/component-search";
import { DocsSidebar, DocsMobileNav } from "@/components/docs/docs-sidebar";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur sm:px-6">
        <DocsMobileNav items={registry} />
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src={logo} alt="hippo-ui" width={24} height={24} />
          HippoUI
        </Link>
        <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-3">
          <ComponentSearch items={registry} />
          <PaletteSwitcher />
          <ThemeToggle />
        </div>
      </header>
      <div className="flex">
        <DocsSidebar items={registry} />
        <main className="min-w-0 flex-1 p-4 sm:p-6 md:p-10">
          <div className="mx-auto max-w-3xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
