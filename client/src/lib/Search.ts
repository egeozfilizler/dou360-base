import { getRoomsForFloor, findRoomById, type ScheduleItem, type Room, type DaySchedule } from '@/data/rooms';

interface TeacherMatch {
  teacher: string;
  subjects: string[];
  rooms: Array<{
    room: Room;
    subjects: string[];
  }>;
  teacherRoom?: Room;
}

interface TeacherSearchResult {
  type: 'teacher';
  matches: TeacherMatch[];
}

interface RoomSearchResult {
  type: 'room';
  room: Room;
  currentSubject: ScheduleItem | null;
  message?: string;
}

interface TeacherSubjectSearchResult {
  type: 'teacher-subject';
  teacher: string;
  subject: string;
  rooms: Room[];
}

interface SubjectSearchResult {
  type: 'subject';
  subject: string;
  classes: Array<{
    room: Room;
    teacher: string;
    time: string;
    day: string;
  }>;
}

type SearchResult = TeacherSearchResult | RoomSearchResult | TeacherSubjectSearchResult | SubjectSearchResult | null;

/**
 * Get all rooms across all floors
 */
function getAllRooms(): Room[] {
  const allRooms: Room[] = [];
  for (let floor = -2; floor <= 3; floor++) {
    allRooms.push(...getRoomsForFloor(floor));
  }
  return allRooms;
}

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
  const teacherMap = new Map<string, {
    subjects: Set<string>;
    roomSubjects: Map<string, Set<string>>;
    teacherRoom?: Room;
  }>();

  const allRooms = getAllRooms();
  
  for (const room of allRooms) {
    if (room.teachers && Array.isArray(room.teachers)) {
      room.teachers.forEach(teacher => {
        if (!matchesTeacherName(teacher.name, teacherName)) return;

        const entry = teacherMap.get(teacher.name) ?? {
          subjects: new Set<string>(),
          roomSubjects: new Map<string, Set<string>>(),
          teacherRoom: room
        };

        if (!entry.teacherRoom) {
          entry.teacherRoom = room;
        }

        Object.values(teacher.schedule).forEach(daySchedule => {
          daySchedule.forEach(item => {
            entry.subjects.add(item.subject);
            if (item.id) {
              if (!entry.roomSubjects.has(item.id)) {
                entry.roomSubjects.set(item.id, new Set());
              }
              entry.roomSubjects.get(item.id)!.add(item.subject);
            }
          });
        });

        teacherMap.set(teacher.name, entry);
      });
    }

    if (room.schedule) {
      Object.values(room.schedule).forEach(daySchedule => {
        daySchedule.forEach(item => {
          if (item.teacher && matchesTeacherName(item.teacher, teacherName)) {
            const entry = teacherMap.get(item.teacher) ?? {
              subjects: new Set<string>(),
              roomSubjects: new Map<string, Set<string>>(),
              teacherRoom: undefined
            };

            entry.subjects.add(item.subject);

            if (!entry.roomSubjects.has(room.id)) {
              entry.roomSubjects.set(room.id, new Set());
            }
            entry.roomSubjects.get(room.id)!.add(item.subject);

            teacherMap.set(item.teacher, entry);
          }
        });
      });
    }
  }

  if (teacherMap.size === 0) {
    return null;
  }

  const matches: TeacherMatch[] = Array.from(teacherMap.entries()).map(([teacher, data]) => {
    const rooms = Array.from(data.roomSubjects.entries()).map(([roomId, subjectsSet]) => {
      const room = findRoomById(roomId);
      return room ? {
        room,
        subjects: Array.from(subjectsSet)
      } : null;
    }).filter((item): item is { room: Room; subjects: string[] } => item !== null);

    return {
      teacher,
      subjects: Array.from(data.subjects),
      rooms,
      teacherRoom: data.teacherRoom
    };
  });

  matches.sort((a, b) => a.teacher.localeCompare(b.teacher));

  return {
    type: 'teacher',
    matches
  };
}

/**
 * Search for classes by subject name
 */
function searchBySubject(subjectName: string): SubjectSearchResult | null {
  const classes: Array<{
    room: Room;
    teacher: string;
    time: string;
    day: string;
  }> = [];

  // Search through all rooms
  const allRooms = getAllRooms();
  
  for (const room of allRooms) {
    // Check if room is a teacher lounge with teachers array
    if (room.teachers && Array.isArray(room.teachers)) {
      room.teachers.forEach(teacher => {
        Object.entries(teacher.schedule).forEach(([day, daySchedule]) => {
          daySchedule.forEach(item => {
            if (item.subject.toLowerCase() === subjectName.toLowerCase()) {
              // For teacher lounges, use the room specified in the schedule item
              const classRoom = item.id ? findRoomById(item.id) : room;
              if (classRoom) {
                classes.push({
                  room: classRoom,
                  teacher: teacher.name,
                  time: item.time,
                  day: day
                });
              }
            }
          });
        });
      });
    } else if (room.schedule) {
      // Regular room format
      Object.entries(room.schedule).forEach(([day, daySchedule]) => {
        daySchedule.forEach(item => {
          if (item.subject.toLowerCase() === subjectName.toLowerCase()) {
            classes.push({
              room: room,
              teacher: item.teacher || 'Unknown',
              time: item.time,
              day: day
            });
          }
        });
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
function searchByRoom(roomId: string): RoomSearchResult | null {
  const room = findRoomById(roomId);
  
  if (!room) {
    return null;
  }

  const currentDay = getCurrentDay();
  const currentTime = getCurrentTime();

  // Check if room is a teacher lounge with teachers array
  if (room.teachers && Array.isArray(room.teachers)) {
    for (const teacher of room.teachers) {
      const daySchedule = teacher.schedule[currentDay];
      if (daySchedule && Array.isArray(daySchedule)) {
        const currentSubject = daySchedule.find(item => 
          isTimeInRange(currentTime, item.time)
        );
        
        if (currentSubject) {
          return {
            type: 'room',
            room: room,
            currentSubject: {
              ...currentSubject,
              teacher: teacher.name
            }
          };
        }
      }
    }
  } else if (room.schedule) {
    // Regular room format
    const daySchedule = room.schedule[currentDay];
    if (daySchedule && Array.isArray(daySchedule)) {
      const currentSubject = daySchedule.find(item => 
        isTimeInRange(currentTime, item.time)
      );
      
      if (currentSubject) {
        return {
          type: 'room',
          room: room,
          currentSubject
        };
      }
    }
  }

  return {
    type: 'room',
    room: room,
    currentSubject: null,
    message: 'No class scheduled at this time'
  };
}

/**
 * Search for room by teacher and subject name
 */
function searchByTeacherAndSubject(teacherName: string, subjectName: string): TeacherSubjectSearchResult | null {
  const roomsSet = new Set<Room>();
  let foundTeacherFullName: string | null = null;

  // Search through all rooms
  const allRooms = getAllRooms();
  
  for (const room of allRooms) {
    // Check if room is a teacher lounge with teachers array
    if (room.teachers && Array.isArray(room.teachers)) {
      const teacher = room.teachers.find(t => matchesTeacherName(t.name, teacherName));
      
      if (teacher) {
        if (!foundTeacherFullName) {
          foundTeacherFullName = teacher.name;
        }
        
        // Check all days for the subject
        Object.values(teacher.schedule).forEach(daySchedule => {
          daySchedule.forEach(item => {
            if (item.subject.toLowerCase() === subjectName.toLowerCase()) {
              // Add the room where the class is held (if specified)
              if (item.id) {
                const classRoom = findRoomById(item.id);
                if (classRoom) {
                  roomsSet.add(classRoom);
                }
              }
            }
          });
        });
      }
    } else if (room.schedule) {
      // Regular room format
      Object.values(room.schedule).forEach(daySchedule => {
        daySchedule.forEach(item => {
          if (
            item.teacher && matchesTeacherName(item.teacher, teacherName) &&
            item.subject.toLowerCase() === subjectName.toLowerCase()
          ) {
            if (!foundTeacherFullName) {
              foundTeacherFullName = item.teacher;
            }
            
            roomsSet.add(room);
          }
        });
      });
    }
  }

  if (roomsSet.size === 0 || !foundTeacherFullName) {
    return null;
  }

  return {
    type: 'teacher-subject',
    teacher: foundTeacherFullName,
    subject: subjectName,
    rooms: Array.from(roomsSet)
  };
}

/**
 * Extract room ID from various query formats
 */
function extractRoomId(query: string): string | null {
  // Remove common prefixes and normalize
  const normalized = query.toLowerCase().trim();
  
  // Allow ground floor (G) and basement (B) prefixes in addition to numeric ids
  const idPattern = "[0-9BG\\-]+";
  const directMatch = query.trim().match(new RegExp(`^(${idPattern})$`, "i"));
  if (directMatch) {
    return directMatch[1].toUpperCase();
  }
  
  // Try to extract room ID from patterns like "room G-02", "classroom 304", "The room B1-12"
  const roomMatch = normalized.match(new RegExp(`(?:room|classroom|lounge)[\\s:]*(${idPattern})`, "i"));
  if (roomMatch) {
    return roomMatch[1].toUpperCase();
  }
  
  // Try to extract any matching pattern at the end
  const trailingMatch = query.match(new RegExp(`(${idPattern})\\s*$`, "i"));
  if (trailingMatch) {
    return trailingMatch[1].toUpperCase();
  }
  
  return null;
}

/**
 * Find room by ID or name (partial match)
 */
function findRoomByIdOrName(query: string): Room | null {
  const allRooms = getAllRooms();
  const roomId = extractRoomId(query);
  
  if (!roomId) {
    return null;
  }
  
  // Try exact ID match first
  const exactMatch = allRooms.find(room => room.id === roomId);
  if (exactMatch) {
    return exactMatch;
  }
  
  // Try name match
  const nameMatch = allRooms.find(room => 
    room.name.toUpperCase().includes(roomId) || room.id.toUpperCase().includes(roomId)
  );
  if (nameMatch) {
    return nameMatch;
  }
  
  return null;
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

  // Check if query is a room ID or name
  const room = findRoomByIdOrName(trimmedQuery);
  if (room) {
    return searchByRoom(room.id);
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
  getCurrentTime,
  getAllRooms
};

export type {
  SearchResult,
  TeacherMatch,
  TeacherSearchResult,
  RoomSearchResult,
  TeacherSubjectSearchResult,
  SubjectSearchResult
};
