// Single source of truth for shop hours. Anything that displays hours — the
// footer, the Visit block, the contact page, the JSON-LD — reads from here.

export type HoursRow = {
  label: string;
  hours: string;
  hoursShort: string;
  closed?: boolean;
};

export const HOURS_ROWS: HoursRow[] = [
  { label: "Mon – Fri", hours: "8:30 AM – 5 PM", hoursShort: "8:30 – 5" },
  { label: "Saturday", hours: "8:30 AM – 2 PM", hoursShort: "8:30 – 2" },
  { label: "Sunday", hours: "Closed", hoursShort: "Closed", closed: true },
];

export const openingHoursSpecification = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:30",
    closes: "17:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Saturday",
    opens: "08:30",
    closes: "14:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Sunday",
    opens: "00:00",
    closes: "00:00",
  },
];

// Kept deliberately self-contained — no imports, no references to anything
// outside its own body — because ShopStatus serializes it with toString() and
// runs it as an inline script before hydration. See app/components/ShopStatus.tsx.
export function shopStatus(now: Date): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  let weekday = "";
  let hour = "0";
  let minute = "0";
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].type === "weekday") weekday = parts[i].value;
    else if (parts[i].type === "hour") hour = parts[i].value;
    else if (parts[i].type === "minute") minute = parts[i].value;
  }

  const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // Minutes from midnight, shop-local. null = closed all day.
  const week: (number[] | null)[] = [
    null,
    [510, 1020],
    [510, 1020],
    [510, 1020],
    [510, 1020],
    [510, 1020],
    [510, 840],
  ];

  const day = names.indexOf(weekday);
  const mins = Number(hour) * 60 + Number(minute);

  const clock = (m: number) => {
    const h = Math.floor(m / 60);
    const mm = m % 60;
    const h12 = h % 12 === 0 ? 12 : h % 12;
    const rest = mm === 0 ? "" : ":" + (mm < 10 ? "0" + mm : String(mm));
    return h12 + rest + (h < 12 ? " AM" : " PM");
  };

  const today = week[day];
  if (today && mins >= today[0] && mins < today[1]) {
    return "Open now · until " + clock(today[1]);
  }
  if (today && mins < today[0]) {
    return "Closed · opens today " + clock(today[0]);
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const next = week[d];
    if (next) return "Closed · opens " + names[d] + " " + clock(next[0]);
  }
  return "Closed";
}
