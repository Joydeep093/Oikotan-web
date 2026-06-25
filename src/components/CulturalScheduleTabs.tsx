"use client";

import { useState } from "react";
import type { CulturalProgramDay } from "@/types";
import { formatProgramDate, formatTabDate } from "@/utils/dateFormatters";

interface CulturalScheduleTabsProps {
  schedule: CulturalProgramDay[];
}

export default function CulturalScheduleTabs({
  schedule,
}: CulturalScheduleTabsProps) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const selectedDay = schedule[selectedDayIndex] ?? null;

  if (schedule.length === 0) {
    return (
      <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-600 shadow-sm">
        Program schedule will be updated soon.
      </div>
    );
  }

  return (
    <>
      <div
        className="mt-6 flex flex-wrap gap-2 border-b border-neutral-200 pb-4"
        role="tablist"
        aria-label="Cultural program days"
      >
        {schedule.map((day, index) => (
          <button
            key={`${day.date}-tab`}
            onClick={() => setSelectedDayIndex(index)}
            role="tab"
            aria-selected={selectedDayIndex === index}
            aria-controls={`tab-panel-${index}`}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
              selectedDayIndex === index
                ? "bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-md shadow-rose-200"
                : "bg-neutral-100 text-neutral-700 hover:bg-rose-50 hover:text-rose-700"
            }`}
          >
            {formatTabDate(day.date)}
          </button>
        ))}
      </div>

      {selectedDay && (
        <article
          key={`${selectedDay.date}-panel`}
          id={`tab-panel-${selectedDayIndex}`}
          role="tabpanel"
          className="mt-6 rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-50 pb-4">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 sm:text-xl">
                {selectedDay.label}
              </h3>
            </div>
            <time
              dateTime={selectedDay.date}
              className="text-sm font-semibold text-indigo-700"
            >
              {formatProgramDate(selectedDay.date)}
            </time>
          </div>

          <ul className="mt-5 grid gap-4 sm:grid-cols-2" role="list">
            {selectedDay.items.length === 0 ? (
              <li className="col-span-2 text-center text-sm text-neutral-500">
                No program schedule available.
              </li>
            ) : (
              selectedDay.items.map((item, index) => (
                <li
                  key={`${selectedDay.date}-${item.time}-${index}`}
                  className="rounded-xl border border-neutral-200 bg-gradient-to-br from-white to-indigo-50/50 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="inline-flex rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-800">
                      {item.segment}
                    </p>
                    <p className="text-xs font-semibold text-indigo-700">
                      {item.time}
                    </p>
                  </div>
                  <h4 className="mt-3 text-base font-semibold text-neutral-900">
                    {item.title}
                  </h4>
                  {item.performer && (
                    <p className="mt-1 text-xs font-medium text-neutral-600">
                      By {item.performer}
                    </p>
                  )}
                  {item.description && (
                    <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </li>
              ))
            )}
          </ul>
        </article>
      )}
    </>
  );
}
