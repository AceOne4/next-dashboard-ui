"use client"; // Mark this as a client component

import { useState } from "react";
import BigCalendar from "@/components/BigCalendar"; // Assuming you have BigCalendar

const ScheduleSwitcher = ({ students }: { students: TStudent[] }) => {
  // Initialize state with the first student's ID
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?._id);

  // Function to change the selected child based on their ID
  const handleChildSwitch = (studentId: string) => {
    setSelectedStudentId(studentId);
  };

  // Find the currently selected student based on their ID
  const selectedStudent = students.find(
    (student) => student._id === selectedStudentId
  );

  return (
    <>
      {/* Toolbar to Switch Between Children */}
      <div className="flex gap-2 mb-4">
        {students.map((student) => (
          <button
            key={student._id}
            className={`px-4 py-2 rounded-md ${
              student._id === selectedStudentId
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleChildSwitch(student._id as string)}
          >
            {student.name}
          </button>
        ))}
      </div>

      {/* Display only the selected child's schedule */}
      {selectedStudent && (
        <>
          <h1 className="text-xl font-semibold">
            Schedule ({selectedStudent.name})
          </h1>
          <BigCalendar person={selectedStudent} />
        </>
      )}
    </>
  );
};

export default ScheduleSwitcher;
