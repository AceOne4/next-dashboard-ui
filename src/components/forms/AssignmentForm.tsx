"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { assignmentSchema } from "@/lib/zod";
import { convertToDayMonthYear, formatDateForInput } from "@/lib/helpers";

type AssignmentInputs = z.infer<typeof assignmentSchema>;

const AssignmentForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssignmentInputs>({
    resolver: zodResolver(assignmentSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  console.log(data);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new assignment" : "Update assignment"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Assignment Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />
        <InputField
          label="Start Date"
          name="startDate"
          type="date"
          defaultValue={formatDateForInput(data?.startDate)}
          register={register}
          error={errors?.startDate}
        />
        <InputField
          label="Due Date"
          name="dueDate"
          type="date"
          defaultValue={formatDateForInput(data?.dueDate)}
          register={register}
          error={errors?.dueDate}
        />
        <InputField
          label="Linked Lesson"
          name="lesson"
          defaultValue={data?.lesson._id}
          register={register}
          error={errors?.lesson}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AssignmentForm;
