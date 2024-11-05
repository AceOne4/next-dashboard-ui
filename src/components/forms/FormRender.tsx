import dynamic from "next/dynamic";

const formComponents = {
  teacher: () => import("./TeacherForm"),
  student: () => import("./StudentForm"),
  announcement: () => import("./AnnouncementForm"),
  assignment: () => import("./AssignmentForm"),
  class: () => import("./ClassForm"),
  event: () => import("./EventForm"),
  exam: () => import("./ExamForm"),
  subject: () => import("./SubjectForm"),
};

const forms = Object.fromEntries(
  Object.entries(formComponents).map(([key, importFunc]) => [
    key,
    dynamic(importFunc, {
      loading: () => <h1>Loading...</h1>,
    }),
  ])
);

const formRenderers: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = Object.fromEntries(
  Object.keys(forms).map((key) => [
    key,
    (type, data) => {
      const FormComponent = forms[key];
      return <FormComponent type={type} data={data} />;
    },
  ])
);

export default formRenderers;
