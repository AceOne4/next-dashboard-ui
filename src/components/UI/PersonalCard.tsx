import React from "react";
import ProfessionalInfoElment from "./ProfessionalInfoElment";
import PersonalInfoElment from "./PersonalInfoElment";
import Image from "next/image";
import FormModal from "../FormModal";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

// Type for objects in personalInfo array
type PersonalInfo = {
  id: number;
  image: string;
  title: string;
};

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  bloodType: string;
  dateOfBirth: string; // You might want to change this to Date if you are working with actual Date objects
  sex: "male" | "female"; // Can use union types for better type safety
  img: string;
}
interface SUser {
  id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  bloodType: string;
  birthday: string; // Assuming this is a string in "YYYY-MM-DD" format; could also use Date if you parse it
  sex: "male" | "female"; // Assuming only these two values are allowed
  img: string; // Assuming this is a URL or a simple string
}

// Type for objects in proInfo array
type ProInfo = {
  id: number;
  image: string;
  title: string;
  score: string;
};

type TpersonalCard = {
  image: string;
  name: string;
  discreption: string;
  proInfo: ProInfo[];
  personalInfo: PersonalInfo[];
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
  data: User | SUser;
  session: Session | null;
};

function PersonalCard({
  personalInfo,
  proInfo,
  image,
  name,
  discreption,
  table,
  data,
  session,
}: TpersonalCard) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* user info card */}
      <div className=" bg-lamasky py-6 px-3 rounded-md flex-1 flex items-center gap-4">
        <div className="w-1/3">
          <Image
            src={image}
            alt="profile picture"
            height={144}
            width={144}
            className=" w-36 h-36 rounded-full object-cover"
          />
        </div>
        <div className="w-2/3 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">{name}</h1>

            {session?.user.role === "admin" && (
              <FormModal table={table} type="update" data={data} />
            )}
          </div>

          <p className="text-sm text-gray-500">{discreption}</p>
          <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
            {personalInfo.map((el) => (
              <PersonalInfoElment
                title={el.title}
                image={el.image}
                key={el.id}
              />
            ))}
          </div>
        </div>
      </div>
      {/* small card */}
      <div className="flex-1 flex gap-4  justify-between flex-wrap">
        {proInfo.map((el) => (
          <ProfessionalInfoElment
            image={el.image}
            name={el.title}
            score={el.score}
            key={el.id}
          />
        ))}
      </div>
    </div>
  );
}

export default PersonalCard;
