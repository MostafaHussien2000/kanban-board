import { Icons } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

export default function Header() {
  return (
    <header className="py-3 px-10 border-b border-border sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="p-3 aspect-square rounded-xl bg-blue-600">
            <Icons.Grid color="white" fontWeight={"64"} />
          </div>
          <div className="flex flex-col items-start justify-between font-mono">
            <h4 className="font-bold text-lg text-primary">KANBAN BOARD</h4>
            <span className="text-muted-foreground text-sm font-medium">
              14 Tasks
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="relative bg-input border-muted-foreground rounded-md overflow-hidden flex items-center px-2">
          <Icons.Search className="text-muted-foreground" />
          <Input
            placeholder="Search tasks ..."
            className="bg-transparent border-none focus-visible:ring-0"
          />
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </div>
      </div>
    </header>
  );
}
