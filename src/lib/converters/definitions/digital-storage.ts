import { HardDrive } from "lucide-react";
import { createLinearConverter } from "../engine";
import type { ConverterDefinition } from "../types";

const BYTES: Record<string, number> = {
  bit: 0.125,
  byte: 1,
  kilobyte: 1024,
  megabyte: 1048576,
  gigabyte: 1073741824,
  terabyte: 1099511627776,
  petabyte: 1125899906842624,
};

const digitalStorage: ConverterDefinition = {
  name: "Digital Storage Converter",
  slug: "digital-storage",
  description:
    "Convert between digital storage units — bits, bytes, kilobytes, megabytes, gigabytes, terabytes, and petabytes — using binary (1024-based) sizing.",
  shortDescription: "Convert bytes, KB, MB, GB, TB, and more.",
  icon: HardDrive,
  keywords: ["digital storage converter", "mb to gb", "bytes converter", "file size converter"],
  isPopular: true,
  kind: "numeric",
  units: [
    { id: "bit", label: "Bit", symbol: "b" },
    { id: "byte", label: "Byte", symbol: "B" },
    { id: "kilobyte", label: "Kilobyte", symbol: "KB" },
    { id: "megabyte", label: "Megabyte", symbol: "MB" },
    { id: "gigabyte", label: "Gigabyte", symbol: "GB" },
    { id: "terabyte", label: "Terabyte", symbol: "TB" },
    { id: "petabyte", label: "Petabyte", symbol: "PB" },
  ],
  defaultFromUnit: "gigabyte",
  defaultToUnit: "megabyte",
  convert: createLinearConverter(BYTES),
  faq: [
    { question: "How many megabytes are in a gigabyte?", answer: "1 gigabyte = 1024 megabytes." },
    {
      question: "How is the conversion calculated?",
      answer:
        "Every unit is stored as a fixed multiple of bytes. To convert, we multiply your value by the source unit's factor to get bytes, then divide by the target unit's factor.",
    },
    {
      question: "Does this use binary or decimal units?",
      answer:
        "This converter uses binary (1024-based, \"KiB-style\") units under the familiar KB/MB/GB names, matching how operating systems commonly report file sizes — not the SI decimal (1000-based) standard.",
    },
  ],
  relatedSlugs: ["typography", "time"],
};

export default digitalStorage;
