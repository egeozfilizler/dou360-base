export interface ScheduleItem {
  time: string;
  subject: string;
  teacher?: string;
  room?: string;
}

export interface DaySchedule {
  [day: string]: ScheduleItem[];
}

export interface TeacherScheduleItem {
  time: string;
  subject: string;
  id?: string;
}

export interface TeacherDaySchedule {
  [day: string]: TeacherScheduleItem[];
}

export interface TeacherInfo {
  name: string;
  schedule: TeacherDaySchedule;
}

export interface Room {
  id: string;
  floor: number;
  name: string;
  schedule?: DaySchedule;
  teachers?: TeacherInfo[];
}

export interface FloorRooms {
  [floor: number]: Room[];
}

// Manually created rooms data with schedules
const roomsData: FloorRooms = {
  3: [
    { 
      id: "301", floor: 3, name: "301",
      schedule: {
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
      }
    },
    { 
      id: "302", floor: 3, name: "302",
      schedule: {
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
      }
    },
    { 
      id: "303", floor: 3, name: "303",
      schedule: {
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
      }
    },
    { 
      id: "304", floor: 3, name: "304 - Teachers Lounge",
      teachers: [
        {
          name: "Dr. A. Yılmaz",
          schedule: {
            Monday: [
              { time: "09:00 - 09:50", subject: "Advanced Mathematics", id: "301" },
              { time: "10:00 - 10:50", subject: "Advanced Mathematics", id: "301" },
            ],
            Tuesday: [],
            Wednesday: [
              { time: "09:00 - 09:50", subject: "Advanced Mathematics", id: "301" },
            ],
            Thursday: [],
            Friday: [],
          }
        },
        {
          name: "Prof. E. Şahin",
          schedule: {
            Monday: [
              { time: "13:00 - 13:50", subject: "Linear Algebra", id: "301" },
            ],
            Tuesday: [],
            Wednesday: [
              { time: "15:00 - 15:50", subject: "Linear Algebra", id: "301" },
            ],
            Thursday: [],
            Friday: [],
          }
        },
        {
          name: "Dr. F. Koç",
          schedule: {
            Monday: [],
            Tuesday: [
              { time: "11:00 - 11:50", subject: "Calculus II", id: "301" },
              { time: "14:00 - 14:50", subject: "Calculus II", id: "301" },
            ],
            Wednesday: [],
            Thursday: [],
            Friday: [
              { time: "10:00 - 10:50", subject: "Calculus II", id: "301" },
            ],
          }
        },
        {
          name: "Prof. B. Kaya",
          schedule: {
            Monday: [],
            Tuesday: [
              { time: "09:00 - 09:50", subject: "Physics I", id: "302" },
              { time: "10:00 - 10:50", subject: "Physics I", id: "302" },
            ],
            Wednesday: [
              { time: "13:00 - 13:50", subject: "Physics I", id: "302" },
            ],
            Thursday: [
              { time: "11:00 - 11:50", subject: "Physics I", id: "302" },
            ],
            Friday: [],
          }
        },
        {
          name: "Dr. C. Demir",
          schedule: {
            Monday: [
              { time: "10:00 - 10:50", subject: "Introduction to CS",  id: "303" },
              { time: "11:00 - 11:50", subject: "Introduction to CS", id: "303" },
            ],
            Tuesday: [
              { time: "13:00 - 13:50", subject: "Introduction to CS", id: "303" },
            ],
            Wednesday: [],
            Thursday: [
              { time: "09:00 - 09:50", subject: "Introduction to CS", id: "303" },
            ],
            Friday: [],
          }
        }
      ]
    },
    { 
      id: "305", floor: 3, name: "305",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "306", floor: 3, name: "306",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "307", floor: 3, name: "307",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "308", floor: 3, name: "308",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "309", floor: 3, name: "309",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "310", floor: 3, name: "310",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "311", floor: 3, name: "311",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "312", floor: 3, name: "312",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "313", floor: 3, name: "313",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "314", floor: 3, name: "314",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "315", floor: 3, name: "315",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "316", floor: 3, name: "316",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "317", floor: 3, name: "317",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "318", floor: 3, name: "318",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "319", floor: 3, name: "319",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "320", floor: 3, name: "320",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "321", floor: 3, name: "321",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "322", floor: 3, name: "322",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "323", floor: 3, name: "323",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "324", floor: 3, name: "324",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "325", floor: 3, name: "325",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "326", floor: 3, name: "326",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "327", floor: 3, name: "327",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "328", floor: 3, name: "328",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "329", floor: 3, name: "329",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "330", floor: 3, name: "330",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "331", floor: 3, name: "331",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "332", floor: 3, name: "332",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "333", floor: 3, name: "333",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "334", floor: 3, name: "334",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "335", floor: 3, name: "335",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "336", floor: 3, name: "336",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "337", floor: 3, name: "337",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "338", floor: 3, name: "338",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "339", floor: 3, name: "339",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { 
      id: "340", floor: 3, name: "340",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
  ],
  2: [
    { 
      id: "201", floor: 2, name: "201",
      schedule: {
        Monday: [
          { time: "09:00 - 09:50", subject: "Object Oriented Programming", teacher: "Prof. B. Kaya" },
          { time: "10:00 - 10:50", subject: "Object Oriented Programming", teacher: "Prof. B. Kaya" },
        ],
        Tuesday: [
          { time: "11:00 - 11:50", subject: "OOP Lab", teacher: "Arş. Gör. C. Demir" },
          { time: "13:00 - 13:50", subject: "OOP Lab", teacher: "Arş. Gör. C. Demir" },
        ],
        Wednesday: [
          { time: "14:00 - 14:50", subject: "Object Oriented Programming", teacher: "Prof. B. Kaya" },
        ],
        Thursday: [
          { time: "09:00 - 09:50", subject: "Object Oriented Programming", teacher: "Prof. B. Kaya" },
        ],
        Friday: [],
        Sunday: [{ time: "23:00 - 23:50", subject: "Object Oriented Programming", teacher: "Prof. B. Kaya" },],
      }
    },
    { id: "202", floor: 2, name: "202", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "203", floor: 2, name: "203", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "204", floor: 2, name: "204", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "205", floor: 2, name: "205", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "206", floor: 2, name: "206", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "207", floor: 2, name: "207", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "208", floor: 2, name: "208", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "209", floor: 2, name: "209", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "210", floor: 2, name: "210", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "211", floor: 2, name: "211", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "212", floor: 2, name: "212", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { 
      id: "213", floor: 2, name: "213",
      schedule: {
        Monday: [
          { time: "10:00 - 10:50", subject: "Data Structures", teacher: "Prof. A. Yılmaz" },
        ],
        Tuesday: [
          { time: "14:00 - 14:50", subject: "Data Structures Lab", teacher: "Öğr. Gör. D. Çelik" },
          { time: "15:00 - 15:50", subject: "Data Structures Lab", teacher: "Öğr. Gör. D. Çelik" },
        ],
        Wednesday: [
          { time: "11:00 - 11:50", subject: "Data Structures", teacher: "Prof. A. Yılmaz" },
        ],
        Thursday: [
          { time: "10:00 - 10:50", subject: "Data Structures", teacher: "Prof. A. Yılmaz" },
        ],
        Friday: [],
      }
    },
    { id: "214", floor: 2, name: "214", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "215", floor: 2, name: "215", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "216", floor: 2, name: "216", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "217", floor: 2, name: "217", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "218", floor: 2, name: "218", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "219", floor: 2, name: "219", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "220", floor: 2, name: "220", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "221", floor: 2, name: "221", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "222", floor: 2, name: "222", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "223", floor: 2, name: "223", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "224", floor: 2, name: "224", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "225", floor: 2, name: "225", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "226", floor: 2, name: "226", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "227", floor: 2, name: "227", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "228", floor: 2, name: "228", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "229", floor: 2, name: "229", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "230", floor: 2, name: "230", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "231", floor: 2, name: "231", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "232", floor: 2, name: "232", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "233", floor: 2, name: "233", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "234", floor: 2, name: "234", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "235", floor: 2, name: "235", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "236", floor: 2, name: "236", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "237", floor: 2, name: "237", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "238", floor: 2, name: "238", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "239", floor: 2, name: "239", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "240", floor: 2, name: "240", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "241", floor: 2, name: "241", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "242", floor: 2, name: "242", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "243", floor: 2, name: "243", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "244", floor: 2, name: "244", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "245", floor: 2, name: "245", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "246", floor: 2, name: "246", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "247", floor: 2, name: "247", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "248", floor: 2, name: "248", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "249", floor: 2, name: "249", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "250", floor: 2, name: "250", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "251", floor: 2, name: "251", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
  ],
  1: [
    { 
      id: "101", floor: 1, name: "101",
      schedule: {
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
      }
    },
    { id: "102", floor: 1, name: "102", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "103", floor: 1, name: "103", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "104", floor: 1, name: "104", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "105", floor: 1, name: "105", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "106", floor: 1, name: "106", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "107", floor: 1, name: "107", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "108", floor: 1, name: "108", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "109", floor: 1, name: "109", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "110", floor: 1, name: "110", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "111", floor: 1, name: "111", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "112", floor: 1, name: "112", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "113", floor: 1, name: "113", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "114", floor: 1, name: "114", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "115", floor: 1, name: "115", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "116", floor: 1, name: "116", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "117", floor: 1, name: "117", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "118", floor: 1, name: "118", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "119", floor: 1, name: "119", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "120", floor: 1, name: "120", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "121", floor: 1, name: "121", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "122", floor: 1, name: "122", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { 
      id: "123", floor: 1, name: "123",
      schedule: {
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
      }
    },
    { id: "124", floor: 1, name: "124", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "125", floor: 1, name: "125", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "126", floor: 1, name: "126", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "127", floor: 1, name: "127", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "128", floor: 1, name: "128", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "129", floor: 1, name: "129", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "130", floor: 1, name: "130", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "131", floor: 1, name: "131", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "132", floor: 1, name: "132", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "133", floor: 1, name: "133", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "134", floor: 1, name: "134", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "135", floor: 1, name: "135", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "136", floor: 1, name: "136", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "137", floor: 1, name: "137", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "138", floor: 1, name: "138", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "139", floor: 1, name: "139", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "140", floor: 1, name: "140", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "141", floor: 1, name: "141", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "142", floor: 1, name: "142", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "143", floor: 1, name: "143", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "144", floor: 1, name: "144", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "145", floor: 1, name: "145", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "146", floor: 1, name: "146", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "147", floor: 1, name: "147", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "148", floor: 1, name: "148", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "149", floor: 1, name: "149", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "150", floor: 1, name: "150", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "151", floor: 1, name: "151", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "152", floor: 1, name: "152", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "153", floor: 1, name: "153", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "154", floor: 1, name: "154", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "155", floor: 1, name: "155", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { 
      id: "156", floor: 1, name: "156",
      schedule: {
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
      }
    },
    { id: "157", floor: 1, name: "157", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "158", floor: 1, name: "158", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
  ],
  0: [
    { 
      id: "G-01", floor: 0, name: "G-01",
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      }
    },
    { id: "G-02", floor: 0, name: "G-02", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-03", floor: 0, name: "G-03", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-04", floor: 0, name: "G-04", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { 
      id: "G-05", floor: 0, name: "G-05",
      schedule: {
        Monday: [
          { time: "09:00 - 09:50", subject: "Software Engineering", teacher: "Dr. S. Aydın" },
          { time: "10:00 - 10:50", subject: "Software Engineering", teacher: "Dr. S. Aydın" },
        ],
        Tuesday: [
          { time: "11:00 - 11:50", subject: "Software Engineering Lab", teacher: "Öğr. Gör. H. Tekin" },
          { time: "13:00 - 13:50", subject: "Software Engineering Lab", teacher: "Öğr. Gör. H. Tekin" },
        ],
        Wednesday: [
          { time: "14:00 - 14:50", subject: "Software Engineering", teacher: "Dr. S. Aydın" },
        ],
        Thursday: [
          { time: "09:00 - 09:50", subject: "Software Engineering", teacher: "Dr. S. Aydın" },
        ],
        Friday: [],
      }
    },
    { id: "G-06", floor: 0, name: "G-06", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-07", floor: 0, name: "G-07", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-08", floor: 0, name: "G-08", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-09", floor: 0, name: "G-09", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-10", floor: 0, name: "G-10", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-11", floor: 0, name: "G-11", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-12", floor: 0, name: "G-12", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-13", floor: 0, name: "G-13", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-14", floor: 0, name: "G-14", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-15", floor: 0, name: "G-15", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-16", floor: 0, name: "G-16", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-17", floor: 0, name: "G-17", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-18", floor: 0, name: "G-18", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-19", floor: 0, name: "G-19", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-20", floor: 0, name: "G-20", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-21", floor: 0, name: "G-21", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-22", floor: 0, name: "G-22", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-23", floor: 0, name: "G-23", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-24", floor: 0, name: "G-24", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-25", floor: 0, name: "G-25", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-26", floor: 0, name: "G-26", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-27", floor: 0, name: "G-27", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-28", floor: 0, name: "G-28", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-29", floor: 0, name: "G-29", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-30", floor: 0, name: "G-30", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-31", floor: 0, name: "G-31", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-32", floor: 0, name: "G-32", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-33", floor: 0, name: "G-33", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-34", floor: 0, name: "G-34", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-35", floor: 0, name: "G-35", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-36", floor: 0, name: "G-36", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-37", floor: 0, name: "G-37", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-38", floor: 0, name: "G-38", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-39", floor: 0, name: "G-39", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-40", floor: 0, name: "G-40", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-41", floor: 0, name: "G-41", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { 
      id: "G-42", floor: 0, name: "G-42",
      schedule: {
        Monday: [
          { time: "13:00 - 13:50", subject: "Web Development", teacher: "Prof. C. Yaman" },
        ],
        Tuesday: [
          { time: "10:00 - 10:50", subject: "Web Development Lab", teacher: "Arş. Gör. İ. Sezgin" },
          { time: "11:00 - 11:50", subject: "Web Development Lab", teacher: "Arş. Gör. İ. Sezgin" },
        ],
        Wednesday: [
          { time: "14:00 - 14:50", subject: "Web Development", teacher: "Prof. C. Yaman" },
        ],
        Thursday: [
          { time: "09:00 - 09:50", subject: "Web Development", teacher: "Prof. C. Yaman" },
        ],
        Friday: [
          { time: "15:00 - 15:50", subject: "Web Development Lab", teacher: "Arş. Gör. İ. Sezgin" },
        ],
      }
    },
    { id: "G-43", floor: 0, name: "G-43", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-44", floor: 0, name: "G-44", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-45", floor: 0, name: "G-45", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-46", floor: 0, name: "G-46", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-47", floor: 0, name: "G-47", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-48", floor: 0, name: "G-48", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-49", floor: 0, name: "G-49", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-50", floor: 0, name: "G-50", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-51", floor: 0, name: "G-51", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-52", floor: 0, name: "G-52", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-53", floor: 0, name: "G-53", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-54", floor: 0, name: "G-54", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-55", floor: 0, name: "G-55", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "G-56", floor: 0, name: "G-56", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
  ],
  "-1": [
    { id: "B1-01", floor: -1, name: "B1-01", schedule: { Monday: [{ time: "09:00 - 09:50", subject: "Technical Drawing", teacher: "Arş. Gör. K. Ulu" }], Tuesday: [{ time: "10:00 - 10:50", subject: "Technical Drawing", teacher: "Arş. Gör. K. Ulu" }], Wednesday: [{ time: "14:00 - 14:50", subject: "Technical Drawing Lab", teacher: "Öğr. Gör. M. Çetkin" }], Thursday: [], Friday: [] } },
    { id: "B1-02", floor: -1, name: "B1-02", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-03", floor: -1, name: "B1-03", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-04", floor: -1, name: "B1-04", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-05", floor: -1, name: "B1-05", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-06", floor: -1, name: "B1-06", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-07", floor: -1, name: "B1-07", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-08", floor: -1, name: "B1-08", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-09", floor: -1, name: "B1-09", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-10", floor: -1, name: "B1-10", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-11", floor: -1, name: "B1-11", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-12", floor: -1, name: "B1-12", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-13", floor: -1, name: "B1-13", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-14", floor: -1, name: "B1-14", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-15", floor: -1, name: "B1-15", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-16", floor: -1, name: "B1-16", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-17", floor: -1, name: "B1-17", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-18", floor: -1, name: "B1-18", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-19", floor: -1, name: "B1-19", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-20", floor: -1, name: "B1-20", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-21", floor: -1, name: "B1-21", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-22", floor: -1, name: "B1-22", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-23", floor: -1, name: "B1-23", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-24", floor: -1, name: "B1-24", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-25", floor: -1, name: "B1-25", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-26", floor: -1, name: "B1-26", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-27", floor: -1, name: "B1-27", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-28", floor: -1, name: "B1-28", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-29", floor: -1, name: "B1-29", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-30", floor: -1, name: "B1-30", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-31", floor: -1, name: "B1-31", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-32", floor: -1, name: "B1-32", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-33", floor: -1, name: "B1-33", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-34", floor: -1, name: "B1-34", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-35", floor: -1, name: "B1-35", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-36", floor: -1, name: "B1-36", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-37", floor: -1, name: "B1-37", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-38", floor: -1, name: "B1-38", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-39", floor: -1, name: "B1-39", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-40", floor: -1, name: "B1-40", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-41", floor: -1, name: "B1-41", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-42", floor: -1, name: "B1-42", schedule: { Monday: [{ time: "11:00 - 11:50", subject: "Artificial Intelligence", teacher: "Prof. D. Uzun" }], Tuesday: [{ time: "13:00 - 13:50", subject: "AI Lab", teacher: "Arş. Gör. N. Kılıç" }], Wednesday: [{ time: "10:00 - 10:50", subject: "Artificial Intelligence", teacher: "Prof. D. Uzun" }], Thursday: [{ time: "14:00 - 14:50", subject: "AI Lab", teacher: "Arş. Gör. N. Kılıç" }], Friday: [] } },
    { id: "B1-43", floor: -1, name: "B1-43", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-44", floor: -1, name: "B1-44", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-45", floor: -1, name: "B1-45", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-46", floor: -1, name: "B1-46", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-47", floor: -1, name: "B1-47", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-48", floor: -1, name: "B1-48", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-49", floor: -1, name: "B1-49", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-50", floor: -1, name: "B1-50", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-51", floor: -1, name: "B1-51", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-52", floor: -1, name: "B1-52", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-53", floor: -1, name: "B1-53", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-54", floor: -1, name: "B1-54", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-55", floor: -1, name: "B1-55", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-56", floor: -1, name: "B1-56", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-57", floor: -1, name: "B1-57", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B1-58", floor: -1, name: "B1-58", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
  ],
  "-2": [
    { id: "B2-01", floor: -2, name: "B2-01", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-02", floor: -2, name: "B2-02", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-03", floor: -2, name: "B2-03", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-04", floor: -2, name: "B2-04", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-05", floor: -2, name: "B2-05", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-06", floor: -2, name: "B2-06", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-07", floor: -2, name: "B2-07", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-08", floor: -2, name: "B2-08", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-09", floor: -2, name: "B2-09", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-10", floor: -2, name: "B2-10", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-11", floor: -2, name: "B2-11", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-12", floor: -2, name: "B2-12", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-13", floor: -2, name: "B2-13", schedule: { Monday: [{ time: "09:00 - 09:50", subject: "Machine Learning", teacher: "Prof. E. Şahin" }], Tuesday: [{ time: "10:00 - 10:50", subject: "ML Lab", teacher: "Arş. Gör. G. Yıldız" }], Wednesday: [{ time: "11:00 - 11:50", subject: "Machine Learning", teacher: "Prof. E. Şahin" }], Thursday: [{ time: "13:00 - 13:50", subject: "ML Lab", teacher: "Arş. Gör. G. Yıldız" }], Friday: [] } },
    { id: "B2-14", floor: -2, name: "B2-14", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-15", floor: -2, name: "B2-15", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-16", floor: -2, name: "B2-16", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-17", floor: -2, name: "B2-17", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-18", floor: -2, name: "B2-18", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-19", floor: -2, name: "B2-19", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-20", floor: -2, name: "B2-20", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-21", floor: -2, name: "B2-21", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-22", floor: -2, name: "B2-22", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-23", floor: -2, name: "B2-23", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-24", floor: -2, name: "B2-24", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-25", floor: -2, name: "B2-25", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-26", floor: -2, name: "B2-26", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-27", floor: -2, name: "B2-27", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-28", floor: -2, name: "B2-28", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-29", floor: -2, name: "B2-29", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-30", floor: -2, name: "B2-30", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-31", floor: -2, name: "B2-31", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-32", floor: -2, name: "B2-32", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-33", floor: -2, name: "B2-33", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-34", floor: -2, name: "B2-34", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-35", floor: -2, name: "B2-35", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-36", floor: -2, name: "B2-36", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-37", floor: -2, name: "B2-37", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-38", floor: -2, name: "B2-38", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-39", floor: -2, name: "B2-39", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-40", floor: -2, name: "B2-40", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-41", floor: -2, name: "B2-41", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-42", floor: -2, name: "B2-42", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-43", floor: -2, name: "B2-43", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-44", floor: -2, name: "B2-44", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-45", floor: -2, name: "B2-45", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-46", floor: -2, name: "B2-46", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-47", floor: -2, name: "B2-47", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-48", floor: -2, name: "B2-48", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-49", floor: -2, name: "B2-49", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-50", floor: -2, name: "B2-50", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-51", floor: -2, name: "B2-51", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-52", floor: -2, name: "B2-52", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-53", floor: -2, name: "B2-53", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-54", floor: -2, name: "B2-54", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    { id: "B2-55", floor: -2, name: "B2-55", schedule: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
  ],
};

// Flattened list of all rooms
const allRoomsList: Room[] = Object.values(roomsData).flat();

// Helper function to get rooms for a specific floor
export const getRoomsForFloor = (floor: number): Room[] => {
  return roomsData[floor] || [];
};

// Helper function to find a room by ID
export const findRoomById = (roomId: string): Room | undefined => {
  return allRoomsList.find(room => room.id === roomId);
};

// Summary of floors
export const floorSummary = {
  3: 40,
  2: 51,
  1: 58,
  0: 56,
  "-1": 58,
  "-2": 55,
} as const;

