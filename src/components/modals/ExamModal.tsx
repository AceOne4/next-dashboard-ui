// components/ExamModal.tsx
import React from "react";
import Modal from "./Modal";
import { convertToHourMin } from "@/lib/helpers";

interface ExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  examDetails: TExam;
}

const ExamModal: React.FC<ExamModalProps> = ({
  isOpen,
  onClose,
  examDetails,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${examDetails.title} Details`}
    >
      <h2 className="text-lg font-semibold">Lesson</h2>
      <p>{(examDetails.lesson as TLesson).name}</p>
      <h2 className="text-lg font-semibold">Start Time</h2>
      <p>{convertToHourMin(String(examDetails.startTime))}</p>
      <h2 className="text-lg font-semibold">End Time</h2>
      <p>{convertToHourMin(String(examDetails.endTime))}</p>
    </Modal>
  );
};

export default ExamModal;
