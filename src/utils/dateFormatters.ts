export function formatProgramDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatTabDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatEventDate(event: { startDate: string; endDate: string }): string {
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  if (startDate.toDateString() === endDate.toDateString()) {
    return startDate.toLocaleDateString("en-GB", options);
  } else {
    return `${startDate.toLocaleDateString("en-GB", options)} - ${endDate.toLocaleDateString("en-GB", options)}`;
  }
}
