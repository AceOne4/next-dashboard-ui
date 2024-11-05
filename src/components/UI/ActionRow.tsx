import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import FormModal from "../FormModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ClassModal from "../modals/ClassModal";
import ExamModal from "../modals/ExamModal";
import AssignmentModal from "../modals/AssigmentModal";
import SubjectModal from "../modals/SubjectModal";

type ModalData = TClass | TExam | TAssignment | TSubject | null; // Define the ModalData type

export default function ActionRow({
  id,
  table,
  item,
}: {
  id: number | string;
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  item:
    | TTeacher
    | TStudent
    | TClass
    | TExam
    | TLesson
    | TAssignment
    | TParent
    | TSubject
    | TResult
    | TAnnouncement
    | TAttendance
    | TEvent;
}) {
  const { data } = useSession();
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "class" | "exam" | "assignment" | "subject"
  >("class");
  const [modalData, setModalData] = useState<
    TClass | TExam | TAssignment | TSubject | null
  >(null);

  const handleClick = () => {
    if (table === "teacher" || table === "student" || table === "parent") {
      router.push(`/list/${table}s/${id}`);
    } else {
      setModalType(table as any); // Ensure the table type is set
      setModalData(item as ModalData); // Set the data for the modal
      setModalOpen(true);
    }
  };

  const renderModal = () => {
    switch (modalType) {
      case "class":
        return (
          <ClassModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            classDetails={modalData as TClass}
          />
        );
      case "exam":
        return (
          <ExamModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            examDetails={modalData as TExam}
          />
        );
      case "assignment":
        return (
          <AssignmentModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            assignmentDetails={modalData as TAssignment}
          />
        );
      case "subject":
        return (
          <SubjectModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            subjectDetails={modalData as TSubject}
          />
        );
      default:
        return null;
    }
  };
  return (
    <td>
      <div className="flex items-center gap-2">
        <button
          className="w-7 h-7 flex items-center justify-center bg-lamasky rounded-full"
          onClick={handleClick}
        >
          <Image src="/view.png" alt="view" width={16} height={16} />
        </button>

        {data?.user.role === "admin" && (
          <>
            <FormModal table={table} type="delete" id={id} />
            <FormModal table={table} type="update" data={item} />
          </>
        )}
      </div>
      {isModalOpen && renderModal()}
    </td>
  );
}
