import { Event } from "@/types";
import homeBannerImage from "@/assets/images/home_banner.jpeg";
import dandiyaNightCardImage from "@/assets/images/dandiya_card.png";

export const UPCOMING_EVENTS: Event[] = [
  {
    id: "dp-2026",
    title: "Durga Puja 2026",
    startDate: "2026-10-16",
    endDate: "2026-10-18",
    time: "7:00 AM - 09:00 PM",
    location: "TBD",
    mapUrl: "https://goo.gl/maps/xyz",
    description:
      "Celebrate the vibrant festival of Durga Puja! Enjoy traditional music, dance performances, and cultural activities with our community.",
    category: "festival",
    image: homeBannerImage,
    programDetails: [
      {
        date: "2026-10-16",
        label: "Day 1 - Sasthi",
        items: [
          {
            time: "06:30 PM - 07:00 PM",
            period: "evening",
            title: "Opening and Lamp Lighting",
            description: "Welcome note and inauguration by committee members.",
          },
          {
            time: "07:00 PM - 08:00 PM",
            period: "evening",
            title: "Bodhon and Sasthi Puja",
            description: "Traditional rituals with mantra chanting.",
          },
          {
            time: "08:00 PM - 09:00 PM",
            period: "evening",
            title: "Community Meet and Prasad",
          },
        ],
      },
      {
        date: "2026-10-17",
        label: "Day 2 - Saptami and Ashtami",
        items: [
          {
            time: "08:00 AM - 11:00 AM",
            period: "morning",
            title: "Maha Saptami Puja and Pushpanjali",
            description: "Includes aarti and bhog offering.",
          },
          {
            time: "01:00 PM - 03:30 PM",
            period: "afternoon",
            title: "Bhog Distribution",
          },
          {
            time: "03:30 PM - 05:00 PM",
            period: "afternoon",
            title: "Maha Ashtami Puja",
          },
          {
            time: "06:30 PM - 09:30 PM",
            period: "evening",
            title: "Cultural Program",
            description: "Music, dance, and performances by community members.",
            url: "cultural",
          },
        ],
      },
      {
        date: "2026-10-18",
        label: "Day 3 - Nabami and Dashami",
        items: [
          {
            time: "08:30 AM - 11:30 AM",
            period: "morning",
            title: "Maha Nabami Puja",
          },
          {
            time: "12:30 PM - 03:30 PM",
            period: "afternoon",
            title: "Dashami Puja and Sindur Khela",
          },
          {
            time: "04:30 PM - 06:00 PM",
            period: "evening",
            title: "Bisorjon Rituals and Bijoya Greetings",
          },
          {
            time: "06:30 PM - 07:00 PM",
            period: "evening",
            title: "Bijoya Sammiloni",
            description: "",
          },
          {
            time: "07:00 PM - 09:00 PM",
            period: "evening",
            title: "Dandiya Night",
            description: "",
            url: "dandiya",
          },
        ],
      },
    ],
  },
  {
    id: "dandiya",
    parentEventId: "dp-2026",
    title: "Dandiya Night",
    startDate: "2026-10-18",
    endDate: "2026-10-18",
    time: "7:00 PM - 10:00 PM",
    location: "TBD",
    mapUrl: "https://goo.gl/maps/xyz",
    description:
      "Join us for a vibrant Dandiya Night! Dance to the beats of live music and enjoy a festive atmosphere.",
    category: "social",
    image: dandiyaNightCardImage,
  },
];

export const PAST_EVENTS: Event[] = [
  {
    id: "dp-2025",
    title: "Durga Puja 2025",
    startDate: "2025-09-26",
    endDate: "2025-09-28",
    time: "7:00 AM - 09:00 PM",
    location: "DASTUDIOS, Vilnius",
    mapUrl: "https://maps.app.goo.gl/6mRhsM9D13bYRhCm8",
    description:
      "Celebrate the vibrant festival of Durga Puja! Enjoy traditional music, dance performances, and cultural activities with our community.",
    category: "festival",
    image: homeBannerImage,
    programDetails: [
      {
        date: "2025-09-26",
        label: "Day 1 - Sasthi",
        items: [
          {
            time: "06:30 PM - 07:00 PM",
            period: "evening",
            title: "Opening and Lamp Lighting",
            description: "Welcome note and inauguration by committee members.",
          },
          {
            time: "07:00 PM - 08:00 PM",
            period: "evening",
            title: "Bodhon and Sasthi Puja",
            description: "Traditional rituals with mantra chanting.",
          },
          {
            time: "08:00 PM - 09:00 PM",
            period: "evening",
            title: "Community Meet and Prasad",
          },
        ],
      },
      {
        date: "2025-09-27",
        label: "Day 2 - Saptami and Ashtami",
        items: [
          {
            time: "08:00 AM - 11:00 AM",
            period: "morning",
            title: "Maha Saptami Puja and Pushpanjali",
            description: "Includes aarti and bhog offering.",
          },
          {
            time: "01:00 PM - 03:30 PM",
            period: "afternoon",
            title: "Bhog Distribution",
          },
          {
            time: "03:30 PM - 05:00 PM",
            period: "afternoon",
            title: "Maha Ashtami Puja",
          },
          {
            time: "06:30 PM - 09:30 PM",
            period: "evening",
            title: "Cultural Program",
            description: "Music, dance, and performances by community members.",
            url: "cultural",
          },
        ],
      },
      {
        date: "2025-09-28",
        label: "Day 3 - Nabami and Dashami",
        items: [
          {
            time: "08:30 AM - 11:30 AM",
            period: "morning",
            title: "Maha Nabami Puja",
          },
          {
            time: "12:30 PM - 03:30 PM",
            period: "afternoon",
            title: "Dashami Puja and Sindur Khela",
          },
          {
            time: "04:30 PM - 06:00 PM",
            period: "evening",
            title: "Bisorjon Rituals and Bijoya Greetings",
          },
          {
            time: "06:30 PM - 07:00 PM",
            period: "evening",
            title: "Bijoya Sammiloni",
            description: "",
          },
          {
            time: "07:00 PM - 09:00 PM",
            period: "evening",
            title: "Dandiya Night",
            description: "",
            url: "dandiya",
          },
        ],
      },
    ],
  },
  {
    id: "dp-2024",
    title: "Durga Puja 2024",
    startDate: "2024-10-12",
    endDate: "2024-10-13",
    time: "7:00 AM - 09:00 PM",
    location: "SARANI centras, Vilnius",
    mapUrl: "https://maps.app.goo.gl/8dEjmHaR6FrF89DA7",
    description:
      "Celebrate the vibrant festival of Durga Puja! Enjoy traditional music, dance performances, and cultural activities with our community.",
    category: "festival",
    image: homeBannerImage,
    programDetails: [
      {
        date: "2024-10-12",
        label: "Day 1 - Maha Ashtami and Maha Nabami",
        items: [
          {
            time: "06:30 PM - 07:00 PM",
            period: "evening",
            title: "Opening and Lamp Lighting",
            description: "Welcome note and inauguration by committee members.",
          },
          {
            time: "07:00 PM - 08:00 PM",
            period: "evening",
            title: "Bodhon and Sasthi Puja",
            description: "Traditional rituals with mantra chanting.",
          },
          {
            time: "07:00 PM - 09:00 PM",
            period: "evening",
            title: "Cultural Program",
            url: "cultural",
            description:
              "Music, dance, and performances by community members and guests.",
          },
        ],
      },
      {
        date: "2024-10-13",
        label: "Day 2 - Bijoys Dasami",
        items: [
          {
            time: "08:00 AM - 11:00 AM",
            period: "morning",
            title: "Puja and Pushpanjali",
            description: "Includes aarti and bhog offering.",
          },
          {
            time: "01:00 PM - 03:30 PM",
            period: "afternoon",
            title: "Dashikarma",
          },
          {
            time: "03:30 PM - 05:00 PM",
            period: "afternoon",
            title: "Thakur Boron, sindur khela, and bisorjon rituals",
          },
          {
            time: "07:00 PM - 09:00 PM",
            period: "evening",
            title: "Cultural Program",
            url: "cultural",
            description:
              "Music, dance, and performances by community members and guests.",
          },
        ],
      },
    ],
  },
];
