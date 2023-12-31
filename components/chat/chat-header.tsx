import { Hash } from "lucide-react";
import MobileToggle from "@/components/mobile-toggle";
import UserAvatar from "@/components/user-avatar";
import SocketIndicator from "@/components/socket-indicator";


interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "member";
  imgUrl?: string;
}

const ChatHeader = ({
  serverId,
  name,
  type,
  imgUrl
}: ChatHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="h-5 w-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      {type === "member" && (
        <UserAvatar
          src={imgUrl}
          className="h-8 w-8 mr-2 md:h-8 md:w-8"
        />
      )}
      <p className="font-semibold text-black dark:text-white text-md">
        {name}
      </p>
      <div className="ml-auto flex items-center">
        <SocketIndicator />
      </div>
    </div>
  );
}
 
export default ChatHeader;