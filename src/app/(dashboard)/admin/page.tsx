import Annocements from "@/components/Annocements";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/events/EventCalendar";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";
import { fetchAllData, processAttendance } from "@/lib/fetchDataAdminPage";
import { hashPassword } from "@/lib/helpers";

async function page() {
  const {
    teachers,
    students,
    parents,
    admins,
    femaleCount,
    attendance,
    events,
    announcements,
  } = await fetchAllData();

  const staffCount = teachers.count + parents.count + admins.count;
  const weeklyData = processAttendance(attendance);
  const password = await hashPassword("AD@58616856");

  return (
    <div className="flex flex-col gap-4 p-4 md:flex-row">
      {/*Left*/}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* usercard */}
        <div className="flex  justify-between flex-wrap g-4">
          <UserCard type="Students" number={students.count} />
          <UserCard type="Parents" number={parents.count} />
          <UserCard type="Teachers" number={teachers.count} />
          <UserCard type="Staff" number={staffCount} />
        </div>
        {/* middlechart */}
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart
              boys={students.count - femaleCount}
              girls={femaleCount}
              total={students.count}
            />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart weeklyData={weeklyData} />
          </div>
        </div>
        {/* bottomchart */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      {/*Right*/}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar events={events.items} />
        <Annocements announcemtnts={announcements.items} />
      </div>
    </div>
  );
}

export default page;
