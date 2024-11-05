import {
  getAllAdmins,
  getAllParents,
  getAllStudents,
  getAllTeachers,
  getAnnouncememnts,
  getattendacneCount,
  getEvents,
  getFemaleCount,
} from "@/lib/service-data";

export async function fetchAllData() {
  const [
    teachers,
    students,
    parents,
    admins,
    femaleCount,
    attendance,
    events,
    announcements,
  ] = await Promise.all([
    getAllTeachers(1),
    getAllStudents(1),
    getAllParents(1),
    getAllAdmins(1),
    getFemaleCount(),
    getattendacneCount(),
    getEvents(),
    getAnnouncememnts(),
  ]);

  return {
    teachers,
    students,
    parents,
    admins,
    femaleCount,
    attendance,
    events,
    announcements,
  };
}

// Helper function to get the ISO week number
export function getISOWeekNumber(date: Date): number {
  const tempDate = new Date(date);
  tempDate.setHours(0, 0, 0, 0);
  tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));

  const yearStart = new Date(tempDate.getFullYear(), 0, 1);
  return Math.ceil(
    ((tempDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
  );
}

// Function to get the day name (Mon, Tue, etc.)
export function getDayName(date: Date): string {
  const days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

// Process attendance data into weekly format
export function processAttendance(attendance: any): any {
  const weeklyAttendance: Record<
    number,
    Record<string, { present: number; absent: number }>
  > = {};

  attendance.items.forEach((record: any) => {
    const weekNumber = getISOWeekNumber(new Date(record.date));
    const dayName = getDayName(new Date(record.date));

    if (dayName !== "Sun" && dayName !== "Sat") {
      if (!weeklyAttendance[weekNumber]) {
        weeklyAttendance[weekNumber] = {
          Mon: { present: 0, absent: 0 },
          Tue: { present: 0, absent: 0 },
          Wed: { present: 0, absent: 0 },
          Thu: { present: 0, absent: 0 },
          Fri: { present: 0, absent: 0 },
        };
      }

      if (record.present) {
        weeklyAttendance[weekNumber][dayName].present += 1;
      } else {
        weeklyAttendance[weekNumber][dayName].absent += 1;
      }
    }
  });

  return Object.keys(weeklyAttendance).map((weekNumber) => ({
    week: `Week ${weekNumber}`,
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => ({
      name: day,
      present: weeklyAttendance[parseInt(weekNumber)][day].present,
      absent: weeklyAttendance[parseInt(weekNumber)][day].absent,
    })),
  }));
}
