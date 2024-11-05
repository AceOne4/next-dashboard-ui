// import {
//   Admin,
//   Grade,
//   Class,
//   Subject,
//   Teacher,
//   Parent,
//   Student,
//   Lesson,
//   Exam,
//   Assignment,
//   Result,
//   Attendance,
//   Event,
//   Announcement,
// } from "../models"; // Adjust the path according to your project structure
// import dbConnect from "./mongoDB";
// import bcrypt from "bcryptjs";
// import mongoose from "mongoose";

// // Constants for passwords
// const password1 = "AD@58616856";
// const password2 = "AD@58616878";

// // Function to hash passwords
// const hashPassword = async (password: string) => {
//   const salt = await bcrypt.genSalt(10);
//   return bcrypt.hash(password, salt);
// };

// // Helper to create multiple records and link them correctly
// const createAndUpdate = async (
//   Model: any,
//   data: any[],
//   updateOps: any[] = []
// ) => {
//   const createdRecords = await Model.insertMany(data);
//   if (updateOps.length > 0) {
//     await Promise.all(
//       createdRecords.map((record, index) => {
//         const updateOp = updateOps[index];
//         if (updateOp) {
//           const { parentModel, parentField, parentId } = updateOp;
//           return parentModel.updateOne(
//             { _id: parentId },
//             { $push: { [parentField]: record._id } }
//           );
//         }
//       })
//     );
//   }
//   return createdRecords;
// };

// export async function seedDatabase() {
//   try {
//     await dbConnect();

//     // ADMIN
//     const adminData = [
//       {
//         name: "admin1",
//         email: "admin1@aceSchool.io",
//         password: await hashPassword(password1),
//       },
//       {
//         name: "admin2",
//         email: "admin2@aceSchool.io",
//         password: await hashPassword(password2),
//       },
//     ];
//     await Admin.insertMany(adminData);

//     // GRADE
//     const grades = await createAndUpdate(
//       Grade,
//       Array.from({ length: 6 }, (_, i) => ({ level: i + 1 }))
//     );

//     // CLASS
//     const classes = await createAndUpdate(
//       Class,
//       Array.from({ length: 6 }, (_, i) => ({
//         name: `${i + 1}A`,
//         grade: grades[i]._id,
//         capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
//         lessons: [],
//         students: [],
//         events: [],
//         announcements: [],
//       }))
//     );

//     // SUBJECT
//     const subjectNames = [
//       "Mathematics",
//       "Science",
//       "English",
//       "History",
//       "Geography",
//       "Physics",
//       "Chemistry",
//       "Biology",
//       "Computer Science",
//       "Art",
//     ];
//     const subjects = await createAndUpdate(
//       Subject,
//       subjectNames.map((name) => ({ name, teachers: [], lessons: [] }))
//     );

//     // TEACHER
//     const teachers = await createAndUpdate(
//       Teacher,
//       Array.from({ length: 15 }, (_, i) => ({
//         username: `teacher${i + 1}`,
//         name: `TName${i + 1}`,
//         surname: `TSurname${i + 1}`,
//         email: `teacher${i + 1}@example.com`,
//         phone: `123-456-789${i + 1}`,
//         address: `Address${i + 1}`,
//         bloodType: "A+",
//         sex: i % 2 === 0 ? "male" : "female",
//         classes: [],
//         subjects: [],
//         lessons: [],
//         birthday: new Date(
//           new Date().setFullYear(new Date().getFullYear() - 30)
//         ),
//       }))
//     );

//     // Assign subjects to teachers and update subjects
//     await Promise.all(
//       teachers.map((teacher, i) => {
//         const subjectId = subjects[i % subjects.length]._id;
//         return Promise.all([
//           Subject.updateOne(
//             { _id: subjectId },
//             { $push: { teachers: teacher._id } }
//           ),
//           Teacher.updateOne(
//             { _id: teacher._id },
//             { $push: { subjects: subjectId } }
//           ),
//         ]);
//       })
//     );

//     // Assign classes to teachers
//     await Promise.all(
//       teachers.map((teacher, i) => {
//         const classId = classes[i % classes.length]._id;
//         return Teacher.updateOne(
//           { _id: teacher._id },
//           { $push: { classes: classId } }
//         );
//       })
//     );

//     // PARENT
//     const parents = await createAndUpdate(
//       Parent,
//       Array.from({ length: 25 }, (_, i) => ({
//         username: `parent${i + 1}`,
//         name: `PName${i + 1}`,
//         surname: `PSurname${i + 1}`,
//         email: `parent${i + 1}@example.com`,
//         phone: `123-456-789${i + 1}`,
//         address: `address${i + 1}`,
//         students: [],
//       }))
//     );

//     // STUDENT
//     const students = await createAndUpdate(
//       Student,
//       Array.from({ length: 50 }, (_, i) => ({
//         username: `student${i + 1}`,
//         name: `SName${i + 1}`,
//         surname: `SSurname${i + 1}`,
//         email: `student${i + 1}@example.com`,
//         phone: `987-654-321${i + 1}`,
//         address: `Address${i + 1}`,
//         bloodType: "O-",
//         sex: i % 2 === 0 ? "male" : "female",
//         parent: parents[Math.floor(i / 2)]._id,
//         grade: grades[i % grades.length]._id,
//         class: classes[i % classes.length]._id,
//         birthday: new Date(
//           new Date().setFullYear(new Date().getFullYear() - 10)
//         ),
//       })),
//       Array.from({ length: 50 }, (_, i) => [
//         {
//           parentModel: Parent,
//           parentField: "students",
//           parentId: parents[Math.floor(i / 2)]._id,
//         },
//         {
//           parentModel: Class,
//           parentField: "students",
//           parentId: classes[i % classes.length]._id,
//         },
//       ]).flat()
//     );

//     // Update students to have results and attendance linked
//     await Promise.all(
//       students.map((student, i) => {
//         const attendanceId = new mongoose.Types.ObjectId(); // create a new attendance record
//         const resultId = new mongoose.Types.ObjectId(); // create a new result record

//         return Promise.all([
//           Attendance.create({
//             student: student._id,
//             date: new Date(),
//             present: Math.random() > 0.5,
//           }).then((attendance) =>
//             Student.updateOne(
//               { _id: student._id },
//               { $push: { attendance: attendance._id } }
//             )
//           ),
//           Result.create({
//             score: Math.random() * 101,
//             student: student._id,
//           }).then((result) =>
//             Student.updateOne(
//               { _id: student._id },
//               { $push: { results: result._id } }
//             )
//           ),
//         ]);
//       })
//     );

//     // LESSON
//     const lessons = await createAndUpdate(
//       Lesson,
//       Array.from({ length: 30 }, (_, i) => ({
//         name: `Lesson${i + 1}`,
//         day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][i % 5],
//         startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
//         endTime: new Date(new Date().setHours(new Date().getHours() + 3)),
//         subject: subjects[i % subjects.length]._id,
//         class: classes[i % classes.length]._id,
//         teacher: teachers[i % teachers.length]._id,
//         exams: [],
//         assignments: [],
//         attendances: [],
//       })),
//       Array.from({ length: 30 }, (_, i) => [
//         {
//           parentModel: Teacher,
//           parentField: "lessons",
//           parentId: teachers[i % teachers.length]._id,
//         },
//         {
//           parentModel: Class,
//           parentField: "lessons",
//           parentId: classes[i % classes.length]._id,
//         },
//         {
//           parentModel: Subject,
//           parentField: "lessons",
//           parentId: subjects[i % subjects.length]._id,
//         },
//       ]).flat()
//     );

//     // EXAM
//     const exams = await createAndUpdate(
//       Exam,
//       Array.from({ length: 50 }, (_, i) => ({
//         title: `Exam${i + 1}`,
//         startTime: new Date(new Date().setHours(new Date().getHours() + 2)),
//         endTime: new Date(new Date().setHours(new Date().getHours() + 4)),
//         lesson: lessons[i % lessons.length]._id,
//         results: [],
//       })),
//       Array.from({ length: 50 }, (_, i) => [
//         {
//           parentModel: Lesson,
//           parentField: "exams",
//           parentId: lessons[i % lessons.length]._id,
//         },
//       ]).flat()
//     );

//     // ASSIGNMENT
//     const assignments = await createAndUpdate(
//       Assignment,
//       Array.from({ length: 50 }, (_, i) => ({
//         title: `Assignment${i + 1}`,
//         startDate: new Date(new Date().setHours(new Date().getHours() + 1)),
//         dueDate: new Date(new Date().setHours(new Date().getHours() + 5)),
//         lesson: lessons[i % lessons.length]._id,
//       })),
//       Array.from({ length: 50 }, (_, i) => [
//         {
//           parentModel: Lesson,
//           parentField: "assignments",
//           parentId: lessons[i % lessons.length]._id,
//         },
//       ]).flat()
//     );

//     // RESULTS
//     await Promise.all(
//       exams.map((exam, i) => {
//         const studentId = students[i % students.length]._id; // Get student ID for this exam
//         const score = Math.random() * 100; // Generate a random score

//         return Result.create({
//           exam: exam._id,
//           student: studentId,
//           score: score, // Ensure that score is passed correctly
//         }).then((result) => {
//           // Push the result ID into the exam's results array
//           return Exam.updateOne(
//             { _id: exam._id },
//             { $push: { results: result._id } }
//           );
//         });
//       })
//     );

//     // EVENTS and ANNOUNCEMENTS
//     await Promise.all(
//       classes.map((classDoc) => {
//         return Promise.all([
//           Event.create({
//             title: `Event for ${classDoc.name}`,
//             description: `this is Event Description`,
//             startTime: new Date(new Date().setHours(new Date().getHours() + 6)),
//             endTime: new Date(new Date().setHours(new Date().getHours() + 8)),
//           }).then((event) => {
//             return Class.updateOne(
//               { _id: classDoc._id },
//               { $push: { events: event._id } }
//             );
//           }),
//           Announcement.create({
//             title: `Announcement for ${classDoc.name}`,
//             description: "Important announcement.",
//             date: new Date(),
//           }).then((announcement) => {
//             return Class.updateOne(
//               { _id: classDoc._id },
//               { $push: { announcements: announcement._id } }
//             );
//           }),
//         ]);
//       })
//     );

//     console.log("Database seeded successfully!");
//     mongoose.connection.close();
//   } catch (error) {
//     console.error("Error seeding database:", error);
//     mongoose.connection.close();
//   }
// }
