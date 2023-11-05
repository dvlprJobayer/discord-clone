"use client";

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


const LeaveServerModal = () => {

  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, type, onClose, data } = useModal();
  const router = useRouter();

  const { server } = data
  const isModalOpen = isOpen && type === "leaveServer";

  const onLeave = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/servers/${server?.id}/leave`);

      onClose();
      router.refresh();
      router.push("/");
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
            Leave Server
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to leave <span className="text-indigo-500 font-semibold">{server?.name}</span>?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="px-6 py-4 bg-gray-100">
          <div className="flex items-center justify-between w-full">
            <Button onClick={onClose} variant="ghost" disabled={isLoading}>
              Close
            </Button>
            <Button onClick={onLeave} variant="primary" disabled={isLoading}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
 
export default LeaveServerModal;