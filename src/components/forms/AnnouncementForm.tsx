"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { announcementSchema } from "@/lib/zod";

type AnnouncementInputs = z.infer<typeof announcementSchema>;

const AnnouncementForm = ({
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
  } = useForm<AnnouncementInputs>({
    resolver: zodResolver(announcementSchema),
  });

  const onSubmit = handleSubmit((data) => {
    const formattedData = {
      ...data,
      date: new Date(data.date), // Convert the date string to a Date object
    };
    console.log(formattedData);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create an announcement" : "Update announcement"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />
        <InputField
          label="Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors?.description}
        />
        <InputField
          label="Date"
          name="date"
          type="date"
          defaultValue={data?.date?.toISOString().split("T")[0]} // Ensure correct format
          register={register}
          error={errors?.date}
        />
        <InputField
          label="Class"
          name="class"
          defaultValue={data?.class}
          register={register}
          error={errors?.class}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AnnouncementForm;
