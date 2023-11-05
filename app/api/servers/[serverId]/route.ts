import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH( 
  req: Request,
  { params } : { params : { serverId: string } }
) {

  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.json();

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id
      },
      data
    });

    return NextResponse.json(server);

  } catch (error) {
    console.error("[SERVER_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }

}

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse("Server Id Missing", { status: 400 });
    }

    const server = await db.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[DELETE SERVER SIDE ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}