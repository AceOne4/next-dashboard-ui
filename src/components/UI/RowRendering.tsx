import Image from "next/image";
import ActionRow from "./ActionRow";

import {
  convertToDayMonthYear,
  isAnnouncement,
  isAssignment,
  isClass,
  isExam,
  isLesson,
  isParent,
  isResult,
  isStudent,
  isSubject,
  isTeacher,
  isEvent,
  isAttendance,
  convertToHourMin,
} from "@/lib/helpers";

type TRenderProps = {
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
    | TEvent
    | TAttendance;
  table: TableTypes;
};

const RowRendering = ({ item, table }: TRenderProps) => {
  console.log(isAttendance(item));

  return (
    <>
      {isTeacher(item) && (
        <>
          <td className="flex items-center gap-4 p-4">
            <Image
              src={item.img || "/avatar.png"}
              alt="avatar"
              width={40}
              height={40}
              className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-xs text-gray-500">{item?.email}</p>
            </div>
          </td>
          <td className="hidden md:table-cell">{item.id}</td>
          <td className="hidden md:table-cell">
            {item.subjects.map((sub) => (sub as TSubject).name).join(", ")}
          </td>
          <td className="hidden md:table-cell">
            {item.classes.map((cla) => (cla as TClass).name).join(", ")}
          </td>
          <td className="hidden lg:table-cell">{item.phone}</td>
          <td className="hidden lg:table-cell">{item.address}</td>
        </>
      )}
      {isSubject(item) && (
        <>
          <td className="flex items-center gap-4 p-4">{item.name}</td>
          <td className="hidden md:table-cell">
            {item.teachers.map((teach) => (teach as TTeacher).name).join(", ")}
          </td>
        </>
      )}
      {isStudent(item) && (
        <>
          <td className="flex items-center gap-4 p-4">
            <Image
              src={item.img || "/avatar.png"}
              alt=""
              width={40}
              height={40}
              className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-xs text-gray-500">
                {(item.class as TClass).name as string}
              </p>
            </div>
          </td>
          <td className="hidden md:table-cell">{item.id}</td>
          <td className="hidden md:table-cell">
            {(item.grade as TGrade).level}
          </td>
          <td className="hidden lg:table-cell">{item.phone}</td>
          <td className="hidden lg:table-cell">{item.address}</td>
        </>
      )}
      {isParent(item) && (
        <>
          <td className="flex items-center gap-4 p-4">
            <div className="flex flex-col">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-xs text-gray-500">{item?.email}</p>
            </div>
          </td>
          <td className="hidden md:table-cell">
            {item.students.map((stu) => (stu as TStudent).name).join(", ")}
          </td>
          <td className="hidden md:table-cell">{item.phone}</td>
          <td className="hidden md:table-cell">{item.address}</td>
        </>
      )}
      {isClass(item) && (
        <>
          <td className="flex items-center gap-4 p-4">{item.name}</td>
          <td className="hidden md:table-cell">{item.students.length}</td>
          <td className="hidden md:table-cell">
            {(item.grade as TGrade).level}
          </td>
          <td className="hidden md:table-cell">{item.supervisor as string}</td>
        </>
      )}
      {isLesson(item) && (
        <>
          <td className="flex items-center gap-4 p-4">
            {(item.subject as TSubject).name}
          </td>
          <td>{(item.class as TClass).name}</td>
          <td className="hidden md:table-cell">
            {(item.teacher as TTeacher).name}
          </td>
        </>
      )}
      {isExam(item) && (
        <>
          <td className="flex items-center gap-4 p-4">{item.title}</td>
          <td>{(item.lesson as TLesson).name}</td>
          <td className="hidden md:table-cell">
            {convertToDayMonthYear(item.startTime.toString())}
          </td>
        </>
      )}
      {isAssignment(item) && (
        <>
          <td className="flex items-center gap-4 p-4">{item.title}</td>
          <td>{(item.lesson as TLesson).name}</td>
          <td className="hidden md:table-cell">
            {convertToDayMonthYear(item.startDate.toString())}
          </td>
        </>
      )}
      {isAnnouncement(item) && (
        <>
          <td className="flex items-center gap-4 p-4">{item.title}</td>
          <td>{item.description as string}</td>
          <td className="hidden md:table-cell">
            {convertToDayMonthYear(item.date.toString())}
          </td>
        </>
      )}
      {isResult(item) && (
        <>
          <td className="flex items-center gap-4 p-4">{item.id as string}</td>
          <td>{(item.student as TStudent).name as string}</td>
          <td className="hidden md:table-cell">{item.score.toFixed(2)}</td>
          <td className="hidden md:table-cell">
            {((item.student as TStudent).class as TClass).name}
          </td>
        </>
      )}
      {isAttendance(item) && (
        <>
          <td className="flex items-center gap-4 p-4">
            {convertToDayMonthYear(item.date.toString())}
          </td>
          <td className="hidden md:table-cell">
            {(item.student as TStudent).name}
          </td>
          <td>{item.present ? "Present" : "Absent"}</td>
        </>
      )}
      {isEvent(item) && (
        <>
          <td className="flex items-center gap-4 p-4">{item.title}</td>
          <td>{item.description}</td>
          <td className="hidden md:table-cell">
            {convertToHourMin(item.startTime.toString())}
          </td>
          <td>{convertToHourMin(item.endTime.toString())}</td>
        </>
      )}

      <ActionRow id={item.id} table={table} item={item} />
    </>
  );
};

export default RowRendering;
