"use client"

import { useModal } from "@/hooks/use-modal-store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { ServerWithMembers } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/user-avatar";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from "@/components/ui/dropdown-menu";


const roleIconMap = {
  "GUEST": null,
  "MODERATOR": <ShieldCheck className="h-4 w-4 text-indigo-500" />,
  "ADMIN": <ShieldAlert className="h-4 w-4 text-rose-500" />
}

const MembersModal = () => {

  const [loadingId, setLoadingId] = useState("");

  const { isOpen, type, onClose, data } = useModal();

  const { server } = data as { server: ServerWithMembers } ;
  const isModalOpen = isOpen && type === "manageMembers";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center text-2xl font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            {server?.members.length} Members
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {
            server?.members.map(member => (
              <div className="flex items-center gap-x-2 mb-6" key={member.id}>
                <UserAvatar
                  src={member.profile.imgUrl}
                />
                <div className="flex flex-col gap-y-1">
                  <div className="text-xs font-semibold flex items-center gap-x-1">
                    {member.profile.name}
                    {roleIconMap[member.role]}
                  </div>
                  <p className="text-xs text-zinc-500">
                    {member.profile.email}
                  </p>
                </div>

                {server.profileId !== member.profileId && loadingId !== member.id && (
                    <div className="ml-auto">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreVertical className="h-4 w-4 text-zinc-500" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent side="left">
                          <DropdownMenuSub>

                            <DropdownMenuSubTrigger>
                              <ShieldQuestion className="h-4 w-4 mr-2" />
                              <span>Role</span>
                            </DropdownMenuSubTrigger>

                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                  <Shield
                                    className="h-4 w-4 mr-2"
                                  />
                                  Guest
                                  {
                                    member.role === "GUEST" && (
                                      <Check
                                        className="h-4 w-4 ml-auto"
                                      />
                                    )
                                  }
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <ShieldCheck
                                    className="h-4 w-4 mr-2"
                                  />
                                  Moderator
                                  {
                                    member.role === "MODERATOR" && (
                                      <Check
                                        className="h-4 w-4 ml-auto"
                                      />
                                    )
                                  }
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>

                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Gavel
                              className="h-4 w-4 mr-2"
                            />
                            Kick
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                  {loadingId === member.id && (
                    <Loader2 className="h-4 w-4 animate-spin text-zinc-500 ml-auto" />
                  )}
              </div>
            ))
          }
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
 
export default MembersModal;