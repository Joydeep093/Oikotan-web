"use client";

import { useState } from "react";
import type { FoodMenuDay } from "@/types";
import { formatProgramDate, formatTabDate } from "@/utils/dateFormatters";

interface FoodMenuTabsProps {
  schedule: FoodMenuDay[];
}

export default function FoodMenuTabs({ schedule }: FoodMenuTabsProps) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const selectedDay = schedule[selectedDayIndex] ?? null;

  if (schedule.length === 0) {
    return (
      <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-600 shadow-sm">
        Food menu will be updated soon.
      </div>
    );
  }

  const hasMeals = (selectedDay?.meals?.length ?? 0) > 0;
  const hasStalls = (selectedDay?.stalls?.length ?? 0) > 0;

  const sectionLabel = hasMeals || hasStalls ? "Food Fiesta" : "";

  return (
    <>
      <div
        className="mt-6 flex flex-wrap gap-2 border-b border-orange-100 pb-4"
        role="tablist"
        aria-label="Food menu days"
      >
        {schedule.map((day, index) => (
          <button
            key={`${day.date}-tab`}
            type="button"
            onClick={() => setSelectedDayIndex(index)}
            role="tab"
            aria-selected={selectedDayIndex === index}
            aria-controls={`food-tab-panel-${index}`}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
              selectedDayIndex === index
                ? "bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white shadow-md shadow-orange-200"
                : "bg-white text-neutral-700 ring-1 ring-orange-100 hover:bg-orange-50 hover:text-orange-700"
            }`}
          >
            {formatTabDate(day.date)}
          </button>
        ))}
      </div>

      {selectedDay && (
        <article
          key={`${selectedDay.date}-panel`}
          id={`food-tab-panel-${selectedDayIndex}`}
          role="tabpanel"
          className="mt-6 rounded-3xl border border-orange-100 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-orange-50 pb-4">
            <div>
              <p className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700">
                {sectionLabel}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-neutral-900 sm:text-2xl">
                {selectedDay.label}
              </h3>
              {selectedDay.note && (
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
                  {selectedDay.note}
                </p>
              )}
            </div>
            <div className="text-left sm:text-right">
              <time
                dateTime={selectedDay.date}
                className="block text-sm font-semibold text-orange-700"
              >
                {formatProgramDate(selectedDay.date)}
              </time>
              {hasMeals && selectedDay.cateringPartner && (
                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
                  Catering: {selectedDay.cateringPartner}
                </p>
              )}
            </div>
          </div>

          <div className="mt-5 space-y-8">
            {hasMeals && (
              <section aria-labelledby={`meal-services-${selectedDayIndex}`}>
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="h-px flex-1 bg-orange-100"
                    aria-hidden="true"
                  />
                  <h4
                    id={`meal-services-${selectedDayIndex}`}
                    className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700"
                  >
                    Lunch and Dinner Menu
                  </h4>
                  <div
                    className="h-px flex-1 bg-orange-100"
                    aria-hidden="true"
                  />
                </div>
                <div className="grid gap-5 lg:grid-cols-2">
                  {selectedDay.meals?.map((meal) => (
                    <section
                      key={`${selectedDay.date}-${meal.name}`}
                      className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-5 shadow-sm"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700 ring-1 ring-orange-200">
                          {meal.name}
                        </p>
                        {meal.time && (
                          <p className="text-sm font-semibold text-orange-700">
                            {meal.time}
                          </p>
                        )}
                      </div>

                      <ul className="mt-4 space-y-2" role="list">
                        {meal.items.map((item) => (
                          <li
                            key={`${meal.name}-${item}`}
                            className="flex items-start gap-3 text-sm text-neutral-700"
                          >
                            <span
                              className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-400"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {meal.note && (
                        <p className="mt-4 rounded-xl bg-white/80 px-3 py-2 text-xs text-neutral-600 ring-1 ring-orange-100">
                          {meal.note}
                        </p>
                      )}
                    </section>
                  ))}
                </div>
              </section>
            )}

            {hasStalls && (
              <section aria-labelledby={`stall-services-${selectedDayIndex}`}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-px flex-1 bg-rose-100" aria-hidden="true" />
                  <h4
                    id={`stall-services-${selectedDayIndex}`}
                    className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-700"
                  >
                    Food Stalls
                  </h4>
                  <div className="h-px flex-1 bg-rose-100" aria-hidden="true" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {selectedDay.stalls?.map((stall) => (
                    <section
                      key={`${selectedDay.date}-${stall.name}`}
                      className="rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50 via-white to-orange-50 p-5 shadow-sm"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-lg font-semibold text-neutral-900">
                          {stall.name}
                        </h4>
                        {stall.cuisine && (
                          <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-200">
                            {stall.cuisine}
                          </span>
                        )}
                      </div>
                      {stall.cateringPartner && (
                        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                          Catering Partner: {stall.cateringPartner}
                        </p>
                      )}
                      {stall.specialty && (
                        <p className="mt-2 text-sm font-medium text-orange-700">
                          {stall.specialty}
                        </p>
                      )}
                      <ul className="mt-4 space-y-2" role="list">
                        {stall.items.map((item) => (
                          <li
                            key={`${stall.name}-${item}`}
                            className="flex items-start gap-3 text-sm text-neutral-700"
                          >
                            <span
                              className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-400"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      {stall.note && (
                        <p className="mt-4 text-xs text-neutral-600">
                          {stall.note}
                        </p>
                      )}
                    </section>
                  ))}
                </div>
              </section>
            )}
          </div>
        </article>
      )}
    </>
  );
}
