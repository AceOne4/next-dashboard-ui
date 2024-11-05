// components/SubjectModal.tsx
import React from "react";
import Modal from "./Modal";

interface SubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjectDetails: TSubject;
}

const SubjectModal: React.FC<SubjectModalProps> = ({
  isOpen,
  onClose,
  subjectDetails,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${subjectDetails.name} Details`}
    >
      <h2 className="text-lg font-semibold">Teachers</h2>
      <ul className="list-disc pl-5">
        {subjectDetails.teachers.map((teacher, index) => (
          <li key={index}>{(teacher as TTeacher).name}</li>
        ))}
      </ul>
      <h2 className="text-lg font-semibold">Lessons</h2>
      <ul className="list-disc pl-5">
        {subjectDetails.lessons.map((lesson, index) => (
          <li key={index}>{(lesson as TLesson).name}</li>
        ))}
      </ul>
    </Modal>
  );
};

export default SubjectModal;
