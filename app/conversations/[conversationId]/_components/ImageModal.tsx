"use client";

import Modal from "@/components/ui/Modal";
import Image from "next/image";

interface ImageModalProps {
  src?: string | null;
  isOpen?: boolean;
  onClose: () => void;
}

const ImageModal = ({ src, isOpen, onClose }: ImageModalProps) => {
  if (!src) {
    return null;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-96 h-96">
        <Image alt="Image" fill src={src} className="object-cover" />
      </div>
    </Modal>
  );
};

export default ImageModal;
