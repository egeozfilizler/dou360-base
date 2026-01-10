interface ScheduleItem {
  time: string;
  subject: string;
  teacher?: string;
  room?: string;
}

interface DaySchedule {
  [day: string]: ScheduleItem[];
}

interface TeacherSchedule {
  name: string;
  schedule: DaySchedule;
}

interface RoomWithTeachers {
  teachers: TeacherSchedule[];
}

type RoomSchedule = DaySchedule | RoomWithTeachers;

interface RoomSchedules {
  [roomName: string]: RoomSchedule;
}

export const roomSchedules: RoomSchedules = {
  "Room 1": {
    "Monday": [
      { "time": "09:00 - 10:00", "subject": "Math", "teacher": "Bob Johnson" },
      { "time": "10:15 - 11:15", "subject": "Physics", "teacher": "Bob Johnson" }
    ],
    "Tuesday": [
      { "time": "11:30 - 12:30", "subject": "Chemistry", "teacher": "Alice Smith" }
    ],
    "Wednesday": [],
    "Thursday": [],
    "Friday": []
  },
  "Room 2": {
    "teachers": [
      {
        "name": "Alice Smith",
        "schedule": {
          "Monday": [
            { "time": "09:00 - 10:00", "subject": "Biology", "room": "Room 1" }
          ],
          "Tuesday": [
            { "time": "10:15 - 11:15", "subject": "History", "room": "Room 1" }
          ],
          "Wednesday": [
            { "time": "11:30 - 12:30", "subject": "English", "room": "Room 1" }
          ],
          "Thursday": [],
          "Friday": []
        }
      },
      {
        "name": "Bob Johnson",
        "schedule": {
          "Monday": [
            { "time": "09:00 - 10:00", "subject": "Math", "room": "Room 1" }
          ],
          "Tuesday": [
            { "time": "10:15 - 11:15", "subject": "Physics", "room": "Room 1" }
          ],
          "Wednesday": [
            { "time": "11:30 - 12:30", "subject": "Chemistry", "room": "Room 1" }
          ],
          "Thursday": [],
          "Friday": []
        }
      }
    ]
  },
  "Room 3": {
    "Monday": [
      { "time": "09:00 - 10:00", "subject": "Math", "teacher": "Bob Johnson" },
      { "time": "10:15 - 11:15", "subject": "Physics", "teacher": "Bob Johnson" }
    ],
    "Tuesday": [
      { "time": "11:30 - 12:30", "subject": "Chemistry", "teacher": "Alice Smith" }
    ],
    "Wednesday": [],
    "Thursday": [],
    "Friday": []
  },
  "Room 4": {
    "Monday": [
      { "time": "09:00 - 10:00", "subject": "Math", "teacher": "Bob Johnson" },
      { "time": "10:15 - 11:15", "subject": "Physics", "teacher": "Bob Johnson" }
    ],
    "Tuesday": [
      { "time": "11:30 - 12:30", "subject": "Chemistry", "teacher": "Alice Smith" }
    ],
    "Wednesday": [],
    "Thursday": [],
    "Friday": []
  },
  "Room 5": {
    "Monday": [
      { "time": "09:00 - 10:00", "subject": "Math", "teacher": "Bob Johnson" },
      { "time": "10:15 - 11:15", "subject": "Physics", "teacher": "Bob Johnson" }
    ],
    "Tuesday": [
      { "time": "11:30 - 12:30", "subject": "Chemistry", "teacher": "Alice Smith" }
    ],
    "Wednesday": [],
    "Thursday": [],
    "Friday": []
  }
};

export type { RoomSchedules, RoomSchedule, DaySchedule, ScheduleItem, TeacherSchedule, RoomWithTeachers };
