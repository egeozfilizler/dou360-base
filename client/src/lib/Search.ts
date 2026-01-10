import { roomSchedules, type ScheduleItem, type RoomSchedule, type TeacherSchedule, type RoomWithTeachers, type DaySchedule } from '@/Data/room-schedules';

interface TeacherSearchResult {
  type: 'teacher';
  teacher: string;
  subjects: string[];
  rooms: string[];
  teacherRooms: string[];
}

/**
 * Type guard to check if a room schedule has teachers
 */
function isRoomWithTeachers(roomData: RoomSchedule): roomData is RoomWithTeachers {
  return 'teachers' in roomData && Array.isArray((roomData as RoomWithTeachers).teachers);
}

/**
 * Type guard to check if a room schedule is a day schedule
 */
function isDaySchedule(roomData: RoomSchedule): roomData is DaySchedule {
  return !isRoomWithTeachers(roomData);
}


interface RoomSearchResult {
  type: 'room';
  room: string;
  currentSubject: ScheduleItem | null;
  message?: string;
}

interface TeacherSubjectSearchResult {
  type: 'teacher-subject';
  teacher: string;
  subject: string;
  rooms: string[];
}

interface SubjectSearchResult {
  type: 'subject';
  subject: string;
  classes: Array<{
    room: string;
    teacher: string;
    time: string;
    day: string;
  }>;
}

type SearchResult = TeacherSearchResult | RoomSearchResult | TeacherSubjectSearchResult | SubjectSearchResult | null;

/**
 * Get current day of the week
 */
function getCurrentDay(): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  return days[today.getDay()];
}

/**
 * Get current time in HH:MM format
 */
function getCurrentTime(): string {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Check if current time is within a time range
 */
function isTimeInRange(currentTime: string, timeRange: string): boolean {
  const [start, end] = timeRange.split(' - ');
  return currentTime >= start && currentTime <= end;
}

/**
 * Check if search query matches teacher name (full name, first name, or last name)
 */
function matchesTeacherName(teacherName: string, searchQuery: string): boolean {
  const nameLower = teacherName.toLowerCase();
  const queryLower = searchQuery.toLowerCase();
  
  // Exact match
  if (nameLower === queryLower) {
    return true;
  }
  
  // Split into first and last name
  const nameParts = nameLower.split(' ');
  
  // Check if query matches any part of the name
  return nameParts.some(part => part === queryLower || part.startsWith(queryLower));
}

/**
 * Search for teacher's subjects and rooms
 */
function searchByTeacher(teacherName: string): TeacherSearchResult | null {
  const subjects = new Set<string>();
  const rooms = new Set<string>();
  const teacherRooms = new Set<string>();
  let foundTeacherFullName: string | null = null;

  // Search through all rooms
  for (const [roomName, roomData] of Object.entries(roomSchedules)) {
    // Check if room has teachers property (Room 2 format)
    if (isRoomWithTeachers(roomData)) {
      const teacher = roomData.teachers.find(
        t => matchesTeacherName(t.name, teacherName)
      );
      
      if (teacher) {
        // Store the full name from the first match
        if (!foundTeacherFullName) {
          foundTeacherFullName = teacher.name;
        }
        
        // This is a teacher room (lounge)
        teacherRooms.add(roomName);
        
        // Add all subjects from this teacher's schedule
        Object.values(teacher.schedule).forEach(daySchedule => {
          daySchedule.forEach(item => {
            subjects.add(item.subject);
            if (item.room) {
              rooms.add(item.room);
            }
          });
        });
      }
    } else {
      // Regular room format (Room 1, 3, 4, 5)
      Object.values(roomData).forEach(daySchedule => {
        if (Array.isArray(daySchedule)) {
          daySchedule.forEach(item => {
            if (item.teacher && matchesTeacherName(item.teacher, teacherName)) {
              // Store the full name from the first match
              if (!foundTeacherFullName) {
                foundTeacherFullName = item.teacher;
              }
              
              subjects.add(item.subject);
              rooms.add(roomName);
            }
          });
        }
      });
    }
  }

  if (subjects.size === 0 || !foundTeacherFullName) {
    return null;
  }

  return {
    type: 'teacher',
    teacher: foundTeacherFullName, // Return full name instead of search query
    subjects: Array.from(subjects),
    rooms: Array.from(rooms),
    teacherRooms: Array.from(teacherRooms)
  };
}

/**
 * Search for classes by subject name
 */
function searchBySubject(subjectName: string): SubjectSearchResult | null {
  const classes: Array<{
    room: string;
    teacher: string;
    time: string;
    day: string;
  }> = [];

  // Search through all rooms
  for (const [roomName, roomData] of Object.entries(roomSchedules)) {
    // Check if room has teachers property (Room 2 format)
    if (isRoomWithTeachers(roomData)) {
      roomData.teachers.forEach(teacher => {
        Object.entries(teacher.schedule).forEach(([day, daySchedule]) => {
          daySchedule.forEach(item => {
            if (item.subject.toLowerCase() === subjectName.toLowerCase()) {
              classes.push({
                room: item.room || roomName,
                teacher: teacher.name,
                time: item.time,
                day: day
              });
            }
          });
        });
      });
    } else {
      // Regular room format
      Object.entries(roomData).forEach(([day, daySchedule]) => {
        if (Array.isArray(daySchedule)) {
          daySchedule.forEach(item => {
            if (item.subject.toLowerCase() === subjectName.toLowerCase()) {
              classes.push({
                room: roomName,
                teacher: item.teacher || 'Unknown',
                time: item.time,
                day: day
              });
            }
          });
        }
      });
    }
  }

  if (classes.length === 0) {
    return null;
  }

  return {
    type: 'subject',
    subject: subjectName,
    classes
  };
}

/**
 * Search for current subject in a room based on current date/time
 */
function searchByRoom(roomName: string): RoomSearchResult | null {
  const room = roomSchedules[roomName];
  
  if (!room) {
    return null;
  }

  const currentDay = getCurrentDay();
  const currentTime = getCurrentTime();

  // Check if room has teachers property (Room 2 format)
  if (isRoomWithTeachers(room)) {
    // For rooms with teachers format, check all teachers' schedules
    for (const teacher of room.teachers) {
      const daySchedule = teacher.schedule[currentDay];
      if (daySchedule) {
        const currentSubject = daySchedule.find(item => 
          isTimeInRange(currentTime, item.time)
        );
        
        if (currentSubject) {
          return {
            type: 'room',
            room: roomName,
            currentSubject: {
              ...currentSubject,
              teacher: teacher.name
            }
          };
        }
      }
    }
  } else {
    // Regular room format
    const daySchedule = room[currentDay];
    if (Array.isArray(daySchedule)) {
      const currentSubject = daySchedule.find(item => 
        isTimeInRange(currentTime, item.time)
      );
      
      if (currentSubject) {
        return {
          type: 'room',
          room: roomName,
          currentSubject
        };
      }
    }
  }

  return {
    type: 'room',
    room: roomName,
    currentSubject: null,
    message: 'No class scheduled at this time'
  };
}

/**
 * Search for room by teacher and subject name
 */
function searchByTeacherAndSubject(teacherName: string, subjectName: string): TeacherSubjectSearchResult | null {
  const rooms = new Set<string>();
  let foundTeacherFullName: string | null = null;

  // Search through all rooms
  for (const [roomName, roomData] of Object.entries(roomSchedules)) {
    // Check if room has teachers property (Room 2 format)
    if (isRoomWithTeachers(roomData)) {
      const teacher = roomData.teachers.find(
        t => matchesTeacherName(t.name, teacherName)
      );
      
      if (teacher) {
        // Store the full name from the first match
        if (!foundTeacherFullName) {
          foundTeacherFullName = teacher.name;
        }
        
        // Check all days for the subject
        Object.values(teacher.schedule).forEach(daySchedule => {
          daySchedule.forEach(item => {
            if (item.subject.toLowerCase() === subjectName.toLowerCase()) {
              if (item.room) {
                rooms.add(item.room);
              }
            }
          });
        });
      }
    } else {
      // Regular room format
      Object.values(roomData).forEach(daySchedule => {
        if (Array.isArray(daySchedule)) {
          daySchedule.forEach(item => {
            if (
              item.teacher && matchesTeacherName(item.teacher, teacherName) &&
              item.subject.toLowerCase() === subjectName.toLowerCase()
            ) {
              // Store the full name from the first match
              if (!foundTeacherFullName) {
                foundTeacherFullName = item.teacher;
              }
              
              rooms.add(roomName);
            }
          });
        }
      });
    }
  }

  if (rooms.size === 0 || !foundTeacherFullName) {
    return null;
  }

  return {
    type: 'teacher-subject',
    teacher: foundTeacherFullName, // Return full name instead of search query
    subject: subjectName,
    rooms: Array.from(rooms)
  };
}

/**
 * Main search function that routes to appropriate search type
 */
export function search(query: string): SearchResult {
  const trimmedQuery = query.trim();
  
  if (!trimmedQuery) {
    return null;
  }

  // Check if query contains a '+' or 'and' to indicate teacher + subject search
  const hasDelimiter = trimmedQuery.includes('+') || /\s+and\s+/i.test(trimmedQuery);
  
  if (hasDelimiter) {
    // Teacher + Subject search
    const parts = trimmedQuery.split(/\s*\+\s*|\s+and\s+/i);
    if (parts.length === 2) {
      return searchByTeacherAndSubject(parts[0].trim(), parts[1].trim());
    }
  }

  // Check if query is a room name
  if (trimmedQuery.toLowerCase().startsWith('room')) {
    const roomKey = Object.keys(roomSchedules).find(
      key => key.toLowerCase() === trimmedQuery.toLowerCase()
    );
    
    if (roomKey) {
      return searchByRoom(roomKey);
    }
  }

  // Try teacher search
  const teacherResult = searchByTeacher(trimmedQuery);
  if (teacherResult) {
    return teacherResult;
  }

  // Try subject search
  const subjectResult = searchBySubject(trimmedQuery);
  if (subjectResult) {
    return subjectResult;
  }

  // If nothing found, return null
  return null;
}

/**
 * Export individual search functions for direct use
 */
export {
  searchByTeacher,
  searchByRoom,
  searchByTeacherAndSubject,
  searchBySubject,
  getCurrentDay,
  getCurrentTime
};

export type {
  SearchResult,
  TeacherSearchResult,
  RoomSearchResult,
  TeacherSubjectSearchResult,
  SubjectSearchResult
};
