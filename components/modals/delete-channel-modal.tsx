"use client";

import qs from "query-string";
import { useModal } from "@/hooks/use-modal-store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


const DeleteChannelModal = () => {

  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, type, onClose, data } = useModal();
  const router = useRouter();

  const { channel, server } = data;
  const isModalOpen = isOpen && type === "deleteChannel";

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id
        }
      })
      await axios.delete(url);

      onClose();
      router.refresh();
      router.push(`/servers/${server?.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black overflow-hidden p-0">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center text-2xl font-bold">
            Delete Channel
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to do this? <br />
            <span className="text-indigo-500 font-semibold"># {channel?.name}</span> will be permanently deleted.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="px-6 py-4 bg-gray-100">
          <div className="flex items-center justify-between w-full">
            <Button onClick={onClose} variant="ghost" disabled={isLoading}>
              Close
            </Button>
            <Button onClick={onDelete} variant="primary" disabled={isLoading}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
 
export default DeleteChannelModal;