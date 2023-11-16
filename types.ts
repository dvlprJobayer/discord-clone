import { Server, Member, Profile, Message } from "@prisma/client"
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as IoServer } from "socket.io";

export type ServerWithMembers = Server & {
  members: (Member & {
    profile: Profile
  })[];
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: IoServer
    }
  }
}

export type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile
  }
}