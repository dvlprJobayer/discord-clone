import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/sidebar/sidebar";
import ServerSidebar from "./server/server-sidebar";

const MobileToggle = ({
  serverId
}: { serverId: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex gap-0 p-0">
        <div className="w-[72px]">
          <Sidebar />
        </div>
        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
}
 
export default MobileToggle;