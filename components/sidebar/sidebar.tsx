import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import SidebarAction from "@/components/sidebar/sidebar-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarItem from "./sidebar-item";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

const Sidebar = async () => {

  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full w-full text-primary py-3 dark:bg-[#1E1F22] bg-[#E3E5E8]">

      {/* Create Server Button */}
      <SidebarAction />
      <Separator 
        className="h-[2px] w-10 mx-auto bg-zinc-300 dark:bg-zinc-700 rounded-md"
      />

      {/* Scroll Area */}
      <ScrollArea className="flex-1 w-full">
        {
          servers.map(server => (
            <div className="mb-4" key={server.id}>
              <SidebarItem
                id={server.id}
                name={server.name}
                imgUrl={server.imgUrl}
              />
            </div>
          ))
        }
      </ScrollArea>

      {/* User button */}
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[45px] w-[45px]"
            }
          }}
        />
      </div>
    </div>
  );
}
 
export default Sidebar;