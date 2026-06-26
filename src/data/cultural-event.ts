import { CulturalProgramDay } from "@/types";

export const CULTURAL_PROGRAMS_BY_EVENT_ID: Record<
  string,
  CulturalProgramDay[]
> = {
  "dp-2026": [],
  "dp-2025": [
    {
      date: "2025-09-27",
      label: "Program Details",
      items: [
        {
          time: "06:30 PM - 06:45 PM",
          title: "Welcome Invocation",
          segment: "Opening",
          performer: "Event Hosts",
          description: "Ceremonial welcome and stage introduction.",
        },
        {
          time: "06:45 PM - 07:20 PM",
          title: "Children's Dance Medley",
          segment: "Dance",
          performer: "Junior Cultural Team",
          description: "Folk and festive dance performances by children.",
        },
        {
          time: "07:20 PM - 08:00 PM",
          title: "Acoustic Bengali Classics",
          segment: "Music",
          performer: "Oikotan Music Circle",
          description: "Live acoustic set of evergreen classics.",
        },
        {
          time: "08:00 PM - 08:45 PM",
          title: "Community Fashion Walk",
          segment: "Showcase",
          performer: "Community Members",
          description: "Traditional attire presentation and narration.",
        },
      ],
    },
    {
      date: "2025-09-28",
      label: "Program Details",
      items: [
        {
          time: "06:00 PM - 10:00 PM",
          title: "Dandiya Night",
          segment: "Dance and Music",
          performer: "",
          description: "Dandiya night with music and dance.",
        },
      ],
    },
  ],
  "dp-2024": [
    {
      date: "2024-10-12",
      label: "Program Details",
      items: [],
    },
  ],
};
