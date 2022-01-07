import pkg from "../../lerna.json";

// import type { IEvent } from "../../packages/calendar/app/types/webcomponent.type";

export interface CalendarProps {
  id: string;
  events: any[];
  calendarEventClick: (e) => void;
  changeCalendarDate: (e) => void;
  changeSelectedDate: (e) => void;
}

export const createCalendar = ({
  id,
  events,
  calendarEventClick,
  changeCalendarDate,
  changeSelectedDate,
}: CalendarProps) => {
  if (!document.getElementById("calendarcomponentscript")) {
    const script = document.createElement("script");
    script.id = "calendarcomponentscript";
    script.src = process.env.PRODUCTION
      ? `https://cdn.jsdelivr.net/npm/@htmlbricks/calendar-component@${pkg.version}/release/calendar.js`
      : "http://localhost:6006/calendar/dist/calendar.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("calendar-component");
    c.id = id;
    c.addEventListener("calendarEventClick", (e: any) =>
      calendarEventClick(e.detail)
    );
    c.addEventListener("changeCalendarDate", (e: any) =>
      changeCalendarDate(e.detail)
    );
    c.addEventListener("changeSelectedDate", (e: any) =>
      changeSelectedDate(e.detail)
    );
  }
  if (events) {
    c.setAttribute("events", JSON.stringify(events));
  } else {
    if (c.hasAttribute("events")) c.removeAttribute("events");
  }
  return c;
};
