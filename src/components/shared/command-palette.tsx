"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftRight } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useCommandPalette } from "@/hooks/use-command-palette";
import { CATEGORIES } from "@/lib/categories";
import { getToolHref } from "@/lib/routes";
import type { SearchableTool } from "@/types";

export function CommandPalette({ tools }: { tools: SearchableTool[] }) {
  const { open, setOpen } = useCommandPalette();
  const router = useRouter();

  const calculators = tools.filter((t) => t.type === "calculator");
  const converters = tools.filter((t) => t.type === "converter");

  function go(tool: SearchableTool) {
    setOpen(false);
    router.push(getToolHref(tool));
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Search tools"
      description="Search calculators and converters"
    >
      <CommandInput placeholder="Search calculators, converters..." />
      <CommandList>
        <CommandEmpty>No tools found.</CommandEmpty>
        <CommandGroup heading="Calculators">
          {calculators.map((tool) => {
            const Icon = CATEGORIES[tool.category].icon;
            return (
              <CommandItem key={`calculator-${tool.slug}`} value={tool.name} onSelect={() => go(tool)}>
                <Icon className="text-muted-foreground" />
                <span>{tool.name}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandGroup heading="Converters">
          {converters.map((tool) => (
            <CommandItem key={`converter-${tool.slug}`} value={tool.name} onSelect={() => go(tool)}>
              <ArrowLeftRight className="text-muted-foreground" />
              <span>{tool.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
