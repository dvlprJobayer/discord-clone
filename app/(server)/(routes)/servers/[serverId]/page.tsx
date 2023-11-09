import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";


interface ServerIdPageProps {
  params: {
    serverId: string;
  }
}

const ServerIdPage = async ({
  params
}: ServerIdPageProps) => {

  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id
        }
      }
    },
    include: {
      channels: {
        where: {
          name: "general"
        }
      }
    }
  });

  const generalChannel = server?.channels[0];

  if (!generalChannel) {
    return null;
  }

  return redirect(`/servers/${server.id}/channels/${generalChannel.id}`);
}
 
export default ServerIdPage;