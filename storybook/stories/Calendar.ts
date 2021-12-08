export interface CalendarProps {
  id: string;
}
export const createCalendar = ({ id }: CalendarProps) => {
  if (!document.getElementById("calendarcomponentscript")) {
    const script = document.createElement("script");
    script.id = "calendarcomponentscript";
    script.src = "http://localhost:6006/calendar/dist/calendar.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("calendar-component");
    c.id = id;
  }

  return c;
};
