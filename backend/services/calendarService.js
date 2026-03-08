import fs from "fs";
import path from "path";

const calendarPath = path.resolve("backend/cache/calendar.json");

function readCalendar() {

  if (!fs.existsSync(calendarPath)) {
    fs.writeFileSync(calendarPath, JSON.stringify([]));
  }

  const data = fs.readFileSync(calendarPath, "utf-8");

  if (!data) return [];

  return JSON.parse(data);

}

function writeCalendar(data) {

  fs.writeFileSync(calendarPath, JSON.stringify(data, null, 2));

}

/*
ADD IDEA TO CALENDAR
*/

export function addIdea(day, idea) {

  const calendar = readCalendar();

  const newEntry = {
    id: Date.now(),
    day: day,
    idea: idea
  };

  calendar.push(newEntry);

  writeCalendar(calendar);

  return newEntry;

}

/*
GET ALL CALENDAR ENTRIES
*/

export function getCalendar() {

  return readCalendar();

}