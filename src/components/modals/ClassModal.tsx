// components/ClassModal.tsx
import React from "react";
import Modal from "./Modal";

interface ClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  classDetails: TClass;
}

const ClassModal: React.FC<ClassModalProps> = ({
  isOpen,
  onClose,
  classDetails,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${classDetails.name} Details`}
    >
      <h2 className="text-lg font-semibold">Class Supervisor</h2>
      <p>{classDetails.supervisor as string}</p>
      <h2 className="text-lg font-semibold">Capacity</h2>
      <p>{classDetails.students.length}</p>
      <h2 className="text-lg font-semibold">Lessons</h2>
      <ul className="list-disc pl-5">
        {classDetails.lessons.map((lesson, index) => (
          <li key={index}>{(lesson as TLesson).name}</li>
        ))}
      </ul>
    </Modal>
  );
};

export default ClassModal;
