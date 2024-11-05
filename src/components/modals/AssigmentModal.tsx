// components/AssignmentModal.tsx
import React from "react";
import Modal from "./Modal";
import { convertToDayMonthYear, convertToHourMin } from "@/lib/helpers";

interface AssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignmentDetails: TAssignment;
}

const AssignmentModal: React.FC<AssignmentModalProps> = ({
  isOpen,
  onClose,
  assignmentDetails,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${assignmentDetails.title} Details`}
    >
      <h2 className="text-lg font-semibold">Lesson</h2>
      <p>{(assignmentDetails.lesson as TLesson).name}</p>
      <h2 className="text-lg font-semibold">Start Date</h2>
      <p>{convertToHourMin(String(assignmentDetails.startDate))}</p>
      <h2 className="text-lg font-semibold">Due Date</h2>
      <p>{convertToDayMonthYear(String(assignmentDetails.dueDate))}</p>
    </Modal>
  );
};

export default AssignmentModal;
