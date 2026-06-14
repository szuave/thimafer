import {
  Flame,
  Zap,
  FoldVertical,
  Wrench,
  Hammer,
  ShieldCheck,
  Ruler,
  Home,
  Factory,
  Building2,
  PenTool,
  Square,
  type LucideProps,
} from "lucide-react";

const map = {
  Flame,
  Zap,
  FoldVertical,
  Wrench,
  Hammer,
  ShieldCheck,
  Ruler,
  Home,
  Factory,
  Building2,
  PenTool,
} as const;

export type IconName = keyof typeof map;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = map[name as IconName] ?? Square;
  return <Cmp {...props} />;
}
