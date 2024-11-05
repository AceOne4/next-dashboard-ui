"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { examSchema } from "@/lib/zod";
import { formatDateTimeForInput } from "@/lib/helpers";

type ExamInputs = z.infer<typeof examSchema>;

const ExamForm = ({
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
  } = useForm<ExamInputs>({
    resolver: zodResolver(examSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new exam" : "Update exam"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Exam Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />
        <InputField
          label="Start Time"
          name="startTime"
          type="datetime-local"
          defaultValue={formatDateTimeForInput(data?.startTime)}
          register={register}
          error={errors?.startTime}
        />
        <InputField
          label="End Time"
          name="endTime"
          type="datetime-local"
          defaultValue={formatDateTimeForInput(data?.endTime)}
          register={register}
          error={errors?.endTime}
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

export default ExamForm;
