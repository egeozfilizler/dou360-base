export interface ScheduleItem {
  time: string;
  subject: string;
  teacher?: string;
  room?: string;
}

export interface DaySchedule {
  [day: string]: ScheduleItem[];
}

export interface TeacherSchedule {
  name: string;
  schedule: DaySchedule;
}

export interface RoomWithTeachers {
  teachers: TeacherSchedule[];
}

export type RoomSchedule = DaySchedule | RoomWithTeachers;

export interface RoomSchedules {
  [roomName: string]: RoomSchedule;
}

// Manually created mock schedules for rooms
export const roomSchedules: RoomSchedules = {
  // Floor 3 Rooms
  "301": {
    Monday: [
      { time: "09:00 - 09:50", subject: "Advanced Mathematics", teacher: "Dr. A. Yılmaz" },
      { time: "10:00 - 10:50", subject: "Advanced Mathematics", teacher: "Dr. A. Yılmaz" },
      { time: "13:00 - 13:50", subject: "Linear Algebra", teacher: "Prof. E. Şahin" },
    ],
    Tuesday: [
      { time: "11:00 - 11:50", subject: "Calculus II", teacher: "Dr. F. Koç" },
      { time: "14:00 - 14:50", subject: "Calculus II", teacher: "Dr. F. Koç" },
    ],
    Wednesday: [
      { time: "09:00 - 09:50", subject: "Advanced Mathematics", teacher: "Dr. A. Yılmaz" },
      { time: "15:00 - 15:50", subject: "Linear Algebra", teacher: "Prof. E. Şahin" },
    ],
    Thursday: [],
    Friday: [
      { time: "10:00 - 10:50", subject: "Calculus II", teacher: "Dr. F. Koç" },
    ],
  },
  "302": {
    Monday: [],
    Tuesday: [
      { time: "09:00 - 09:50", subject: "Physics I", teacher: "Prof. B. Kaya" },
      { time: "10:00 - 10:50", subject: "Physics I", teacher: "Prof. B. Kaya" },
    ],
    Wednesday: [
      { time: "13:00 - 13:50", subject: "Physics I", teacher: "Prof. B. Kaya" },
      { time: "14:00 - 14:50", subject: "Physics I Lab", teacher: "Arş. Gör. G. Yıldız" },
    ],
    Thursday: [
      { time: "11:00 - 11:50", subject: "Physics I", teacher: "Prof. B. Kaya" },
    ],
    Friday: [],
  },
  "303": {
    Monday: [
      { time: "10:00 - 10:50", subject: "Introduction to CS", teacher: "Dr. C. Demir" },
      { time: "11:00 - 11:50", subject: "Introduction to CS", teacher: "Dr. C. Demir" },
    ],
    Tuesday: [
      { time: "13:00 - 13:50", subject: "Introduction to CS", teacher: "Dr. C. Demir" },
      { time: "14:00 - 14:50", subject: "Introduction to CS Lab", teacher: "Öğr. Gör. D. Çelik" },
    ],
    Wednesday: [],
    Thursday: [
      { time: "09:00 - 09:50", subject: "Introduction to CS", teacher: "Dr. C. Demir" },
    ],
    Friday: [
      { time: "15:00 - 15:50", subject: "Introduction to CS Lab", teacher: "Öğr. Gör. D. Çelik" },
    ],
  },

  // Floor 2 Rooms
  "201": {
    Monday: [
      { time: "09:00 - 09:50", subject: "Data Structures", teacher: "Dr. C. Demir" },
      { time: "11:00 - 11:50", subject: "Data Structures", teacher: "Dr. C. Demir" },
    ],
    Tuesday: [
      { time: "10:00 - 10:50", subject: "Algorithms", teacher: "Prof. B. Kaya" },
      { time: "14:00 - 14:50", subject: "Algorithms", teacher: "Prof. B. Kaya" },
    ],
    Wednesday: [
      { time: "13:00 - 13:50", subject: "Data Structures", teacher: "Dr. C. Demir" },
    ],
    Thursday: [
      { time: "09:00 - 09:50", subject: "Algorithms", teacher: "Prof. B. Kaya" },
      { time: "15:00 - 15:50", subject: "Algorithms Lab", teacher: "Arş. Gör. G. Yıldız" },
    ],
    Friday: [],
  },
  "202": {
    Monday: [],
    Tuesday: [
      { time: "09:00 - 09:50", subject: "Digital Logic", teacher: "Öğr. Gör. D. Çelik" },
    ],
    Wednesday: [
      { time: "10:00 - 10:50", subject: "Digital Logic Lab", teacher: "Arş. Gör. G. Yıldız" },
      { time: "11:00 - 11:50", subject: "Digital Logic Lab", teacher: "Arş. Gör. G. Yıldız" },
    ],
    Thursday: [
      { time: "13:00 - 13:50", subject: "Digital Logic", teacher: "Öğr. Gör. D. Çelik" },
    ],
    Friday: [
      { time: "14:00 - 14:50", subject: "Digital Logic", teacher: "Öğr. Gör. D. Çelik" },
    ],
  },
  "213": {
    Monday: [
      { time: "13:00 - 13:50", subject: "Software Engineering", teacher: "Dr. F. Koç" },
    ],
    Tuesday: [
      { time: "09:00 - 09:50", subject: "Software Engineering", teacher: "Dr. F. Koç" },
      { time: "10:00 - 10:50", subject: "Software Engineering", teacher: "Dr. F. Koç" },
    ],
    Wednesday: [
      { time: "14:00 - 14:50", subject: "Software Engineering Project", teacher: "Prof. E. Şahin" },
    ],
    Thursday: [],
    Friday: [
      { time: "11:00 - 11:50", subject: "Software Engineering", teacher: "Dr. F. Koç" },
    ],
  },

  // Floor 1 Rooms
  "101": {
    Monday: [
      { time: "09:00 - 09:50", subject: "Database Systems", teacher: "Prof. E. Şahin" },
    ],
    Tuesday: [
      { time: "10:00 - 10:50", subject: "Database Systems Lab", teacher: "Arş. Gör. G. Yıldız" },
      { time: "11:00 - 11:50", subject: "Database Systems Lab", teacher: "Arş. Gör. G. Yıldız" },
    ],
    Wednesday: [
      { time: "13:00 - 13:50", subject: "Database Systems", teacher: "Prof. E. Şahin" },
    ],
    Thursday: [
      { time: "14:00 - 14:50", subject: "Database Systems", teacher: "Prof. E. Şahin" },
    ],
    Friday: [],
  },
  "123": {
    Monday: [
      { time: "11:00 - 11:50", subject: "Operating Systems", teacher: "Dr. F. Koç" },
    ],
    Tuesday: [
      { time: "13:00 - 13:50", subject: "Operating Systems Lab", teacher: "Öğr. Gör. D. Çelik" },
      { time: "14:00 - 14:50", subject: "Operating Systems Lab", teacher: "Öğr. Gör. D. Çelik" },
    ],
    Wednesday: [
      { time: "09:00 - 09:50", subject: "Operating Systems", teacher: "Dr. F. Koç" },
    ],
    Thursday: [
      { time: "10:00 - 10:50", subject: "Operating Systems", teacher: "Dr. F. Koç" },
    ],
    Friday: [
      { time: "15:00 - 15:50", subject: "Operating Systems Lab", teacher: "Öğr. Gör. D. Çelik" },
    ],
  },
  "156": {
    Monday: [
      { time: "14:00 - 14:50", subject: "Computer Networks", teacher: "Prof. B. Kaya" },
    ],
    Tuesday: [
      { time: "09:00 - 09:50", subject: "Computer Networks", teacher: "Prof. B. Kaya" },
    ],
    Wednesday: [
      { time: "10:00 - 10:50", subject: "Computer Networks Lab", teacher: "Arş. Gör. G. Yıldız" },
      { time: "11:00 - 11:50", subject: "Computer Networks Lab", teacher: "Arş. Gör. G. Yıldız" },
    ],
    Thursday: [
      { time: "13:00 - 13:50", subject: "Computer Networks", teacher: "Prof. B. Kaya" },
    ],
    Friday: [
      { time: "14:00 - 14:50", subject: "Computer Networks", teacher: "Prof. B. Kaya" },
    ],
  },

  // Ground Floor Rooms
  "G-05": {
    Monday: [
      { time: "09:00 - 09:50", subject: "General Physics", teacher: "Prof. B. Kaya" },
      { time: "10:00 - 10:50", subject: "General Physics", teacher: "Prof. B. Kaya" },
    ],
    Tuesday: [
      { time: "13:00 - 13:50", subject: "General Physics Lab", teacher: "Arş. Gör. G. Yıldız" },
      { time: "14:00 - 14:50", subject: "General Physics Lab", teacher: "Arş. Gör. G. Yıldız" },
    ],
    Wednesday: [],
    Thursday: [
      { time: "11:00 - 11:50", subject: "General Physics", teacher: "Prof. B. Kaya" },
    ],
    Friday: [
      { time: "15:00 - 15:50", subject: "General Physics", teacher: "Prof. B. Kaya" },
    ],
  },
  "G-42": {
    Monday: [],
    Tuesday: [
      { time: "10:00 - 10:50", subject: "Basic Chemistry", teacher: "Dr. A. Yılmaz" },
    ],
    Wednesday: [
      { time: "09:00 - 09:50", subject: "Basic Chemistry Lab", teacher: "Öğr. Gör. D. Çelik" },
      { time: "10:00 - 10:50", subject: "Basic Chemistry Lab", teacher: "Öğr. Gör. D. Çelik" },
    ],
    Thursday: [
      { time: "14:00 - 14:50", subject: "Basic Chemistry", teacher: "Dr. A. Yılmaz" },
    ],
    Friday: [],
  },

  // Basement 1 Rooms
  "B1-01": {
    Monday: [
      { time: "09:00 - 09:50", subject: "Engineering Drawing", teacher: "Öğr. Gör. D. Çelik" },
      { time: "10:00 - 10:50", subject: "Engineering Drawing", teacher: "Öğr. Gör. D. Çelik" },
    ],
    Tuesday: [
      { time: "11:00 - 11:50", subject: "Engineering Drawing", teacher: "Öğr. Gör. D. Çelik" },
    ],
    Wednesday: [],
    Thursday: [
      { time: "13:00 - 13:50", subject: "Engineering Drawing Lab", teacher: "Arş. Gör. G. Yıldız" },
      { time: "14:00 - 14:50", subject: "Engineering Drawing Lab", teacher: "Arş. Gör. G. Yıldız" },
    ],
    Friday: [
      { time: "15:00 - 15:50", subject: "Engineering Drawing", teacher: "Öğr. Gör. D. Çelik" },
    ],
  },
  "B1-42": {
    Monday: [
      { time: "13:00 - 13:50", subject: "Mechanical Engineering Basics", teacher: "Prof. E. Şahin" },
    ],
    Tuesday: [
      { time: "09:00 - 09:50", subject: "Mechanical Engineering Basics", teacher: "Prof. E. Şahin" },
      { time: "10:00 - 10:50", subject: "Mechanical Engineering Basics", teacher: "Prof. E. Şahin" },
    ],
    Wednesday: [
      { time: "14:00 - 14:50", subject: "Mechanical Engineering Lab", teacher: "Arş. Gör. G. Yıldız" },
    ],
    Thursday: [],
    Friday: [
      { time: "11:00 - 11:50", subject: "Mechanical Engineering Basics", teacher: "Prof. E. Şahin" },
    ],
  },

  // Basement 2 Rooms
  "B2-13": {
    Monday: [],
    Tuesday: [
      { time: "09:00 - 09:50", subject: "Electrical Engineering Fundamentals", teacher: "Dr. F. Koç" },
    ],
    Wednesday: [
      { time: "10:00 - 10:50", subject: "Electrical Engineering Lab", teacher: "Öğr. Gör. D. Çelik" },
      { time: "11:00 - 11:50", subject: "Electrical Engineering Lab", teacher: "Öğr. Gör. D. Çelik" },
    ],
    Thursday: [
      { time: "13:00 - 13:50", subject: "Electrical Engineering Fundamentals", teacher: "Dr. F. Koç" },
    ],
    Friday: [
      { time: "14:00 - 14:50", subject: "Electrical Engineering Fundamentals", teacher: "Dr. F. Koç" },
    ],
  },
};