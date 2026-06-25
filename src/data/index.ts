import type {
  Event,
  Testimonial,
  Partner,
  TeamMember,
  CulturalProgramDay,
  FoodMenuDay,
  EventTicket,
} from "@/types";

export const SITE_NAME = "Oikotan";
export const SITE_TAGLINE =
  "The Indian Bengali Cultural Association in Lithuania";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

// Helper function to get today's date at midnight for comparison
function getTodayAtMidnight() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

// Separate events into upcoming and past
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
    image: "/events/durga-puja.jpg",
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
    image: "/events/durga-puja.jpg",
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
    image: "/events/durga-puja.jpg",
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

const ALL_EVENTS: Event[] = [...UPCOMING_EVENTS, ...PAST_EVENTS];

export const EVENTS = ALL_EVENTS;

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

export const FOOD_MENUS_BY_EVENT_ID: Record<string, FoodMenuDay[]> = {
  "dp-2026": [
    {
      date: "2026-10-17",
      label: "Saptami Feast",
      mode: "meals",
      cateringPartner: "Oikotan",
      meals: [
        {
          name: "Festival Lunch",
          time: "01:00 PM - 03:00 PM",
          items: [
            "Khichuri",
            "Beguni",
            "Labra",
            "Tomato Chutney",
            "Papad",
            "Payesh",
          ],
        },
        {
          name: "Evening Dinner",
          time: "07:30 PM - 09:00 PM",
          items: [
            "Fish Fry",
            "Basanti Pulao",
            "Chicken Kosha",
            "Paneer Butter Masala",
            "Khejur Chutney",
            "Rasgulla",
          ],
        },
      ],
    },
    {
      date: "2026-10-18",
      label: "Street Food Fiesta",
      mode: "mixed",
      note: "some text about the food court and stalls",
      cateringPartner: "Oikotan",
      meals: [
        {
          name: "Nabami Lunch",
          time: "12:30 PM - 02:30 PM",
          items: [
            "Luchi",
            "Cholar Daal",
            "Aloor Dum",
            "Tomato Chutney",
            "Papad",
            "Boondi",
          ],
        },
        {
          name: "Nabami Dinner",
          time: "06:30 PM - 08:30 PM",
          items: [
            "Vegetable Pulao",
            "Paneer Korma",
            "Chicken Curry",
            "Salad",
            "Rosogolla",
          ],
        },
      ],
      stalls: [
        {
          name: "Kolkata Roll House",
          cateringPartner: "Kolkata Roll House",
          cuisine: "Street Food",
          specialty: "Hot kathi rolls and chaats",
          items: ["Chicken Kathi Roll", "Paneer Kathi Roll", "Jhalmuri"],
        },
        {
          name: "Mishti Corner",
          cateringPartner: "Mishti Corner Sweets",
          cuisine: "Desserts",
          specialty: "Fresh sweets and festive treats",
          items: ["Rosogolla", "Malai Cham Cham", "Mihidana Cups"],
        },
        {
          name: "Tea & Adda Station",
          cateringPartner: "Adda Beverages Co.",
          cuisine: "Beverages",
          specialty: "Warm drinks and light bites",
          items: ["Masala Chai", "Lebu Cha", "Nimki", "Vegetable Chop"],
        },
      ],
    },
  ],
  "dp-2025": [
    {
      date: "2025-09-26",
      label: "Sasthi",
      mode: "meals",
      cateringPartner: "India Palace Catering & Events",
      meals: [
        {
          name: "Dinner",
          time: "07:30 PM - 09:00 PM",
          items: [
            "Kolkata-style Fish Fry",
            "Phulkopir Bora",
            "Moonger Daal",
            "Zafraan Bhaat",
            "Mughlai Murg",
            "Malai Ladoo",
          ],
        },
      ],
    },
    {
      date: "2025-09-27",
      label: "Saptami",
      mode: "meals",
      cateringPartner: "Oikotan",
      meals: [
        {
          name: "Lunch",
          time: "01:00 PM - 03:00 PM",
          items: [
            "Crispy Peyanji",
            "Musoor Daal",
            "Plain Rice",
            "Motorshuti Bandhakopir Ghonto",
            "Khejur Chutney",
            "Papad",
            "Mohanthal Mishti",
          ],
        },
        {
          name: "Dinner",
          time: "07:30 PM - 09:30 PM",
          items: [
            "Kolkata-style Fish Fry",
            "Phulkopir Boda",
            "Ghee diye Moonger Daal",
            "Sugandhi Zafraan Bhaat",
            "Lucknowi Mughlai Murg",
            "Paneer Pasanda",
            "Mishti Aamer Chutney",
            "Malai Ladoo",
          ],
        },
      ],
    },
    {
      date: "2025-09-28",
      label: "Food Stalls",
      mode: "mixed",
      cateringPartner: "Festival Community Kitchen",
      meals: [
        {
          name: "Lunch",
          time: "12:30 PM - 02:30 PM",
          items: [
            "Luchi",
            "Narkel diye Cholar Daal",
            "Aloor Dum",
            "Khejur Chutney",
            "Papad",
            "Boondi",
          ],
        },
        {
          name: "Dinner",
          time: "06:30 PM - 08:30 PM",
          items: [
            "Fish Fry",
            "Paneer Cutlet",
            "Pulao",
            "Chicken Kosha",
            "Tomato Chutney",
            "Mishti",
          ],
        },
      ],
      stalls: [
        {
          name: "Bhog Counter",
          cateringPartner: "Bhog Kitchen",
          cuisine: "Traditional",
          specialty: "Freshly served Dashami bhog",
          items: ["Luchi", "Cholar Daal", "Aloor Dum", "Boondi"],
        },
        {
          name: "Kathi Roll Cart",
          cateringPartner: "Calcutta Roll Corner",
          cuisine: "Street Food",
          specialty: "Crowd-favorite evening snacks",
          items: ["Egg Roll", "Paneer Roll", "Chicken Roll"],
        },
        {
          name: "Mishti & Chai Bar",
          cateringPartner: "Sweet Bengal House",
          cuisine: "Desserts",
          specialty: "Desserts and tea for post-event adda",
          items: ["Rosomalai", "Kalakand", "Masala Chai"],
        },
      ],
    },
  ],
  "dp-2024": [
    {
      date: "2024-10-12",
      label: "Community Food Court",
      mode: "stalls",
      note: "Card and cash accepted at all partner counters.",
      stalls: [
        {
          name: "Bengali Bites",
          cateringPartner: "Bengali Bites Catering",
          cuisine: "Festival Snacks",
          specialty: "Quick savory favorites",
          items: ["Veg Chop", "Beguni", "Mughlai Paratha"],
        },
        {
          name: "Home Curry Table",
          cateringPartner: "Home Curry Table",
          cuisine: "Main Course",
          specialty: "Warm homestyle plates",
          items: ["Pulao", "Paneer Curry", "Chicken Curry"],
        },
        {
          name: "Mishti Mela",
          cateringPartner: "Mishti Mela Desserts",
          cuisine: "Sweets",
          specialty: "Classic desserts and sweets",
          items: ["Gulab Jamun", "Sandesh", "Kheer Cup"],
        },
      ],
    },
  ],
};

export const TESTIMONIALS: Testimonial[] = [];

export const TICKETS_BY_EVENT_ID: Record<string, EventTicket[]> = {
  "dp-2026": [
    {
      id: "dp-2026-pass-all",
      title: "Full Festival Pass",
      subtitle: "3-Day All Access",
      description:
        "Complete access to all three days of Durga Puja 2026 including puja darshan, cultural program, and dandiya night.",
      price: 25,
      currency: "EUR",
      category: "pass",
      date: "2026-10-16",
      time: "All 3 Days",
      includes: [
        "All puja sessions",
        "Cultural program evening",
        "Dandiya Night entry",
        "Bijoya Sammiloni",
      ],
      available: true,
      featured: true,
    },
    {
      id: "dp-2026-darshan",
      title: "Darshan Pass",
      subtitle: "Deity Darshan Access",
      description:
        "Access for darshan and participation in Pushpanjali and aarti rituals.",
      price: 0,
      currency: "EUR",
      category: "puja",
      date: "2026-10-16",
      time: "All 3 Days",
      includes: [
        "Pandal entry",
        "Pushpanjali",
        "Aarti sessions",
        "Prasad distribution",
      ],
      note: "Free entry — registration required for crowd management.",
      available: true,
    },
    {
      id: "dp-2026-bhog",
      title: "Ashtami Bhog",
      subtitle: "Traditional Festival Meal",
      description:
        "The sacred Ashtami bhog — a traditional community meal of khichuri, beguni, labra, chutney, and mishti.",
      price: 0,
      currency: "EUR",
      category: "food",
      date: "2026-10-17",
      time: "01:00 PM – 03:00 PM",
      includes: ["Khichuri", "Aloo Dum", "Chutney"],
      available: true,
      maxPerPerson: 4,
    },
    {
      id: "dp-2026-dinner",
      title: "Saptami Dinner",
      subtitle: "Festive Evening Platter",
      description:
        "A curated festive dinner served on Saptami evening with both vegetarian and non-vegetarian options.",
      price: 15,
      priceOptions: [
        { label: "veg", price: 13 },
        { label: "non-veg", price: 15 },
      ],
      currency: "EUR",
      category: "food",
      date: "2026-10-17",
      time: "07:30 PM – 09:00 PM",
      includes: [
        "Fish Fry or Paneer",
        "Basanti Pulao",
        "Chicken Kosha",
        "Chutney",
        "Rasogolla",
      ],
      available: true,
    },
    {
      id: "dp-2026-cultural",
      title: "Cultural Evening",
      subtitle: "Music, Dance & Drama",
      description:
        "Tickets for the dedicated cultural evening featuring performances by community artists — music, dance, and theatre.",
      price: 0,
      currency: "EUR",
      category: "cultural",
      date: "2026-10-17",
      time: "06:30 PM – 09:30 PM",
      includes: ["Seated viewing", "All performances"],
      available: true,
    },
    {
      id: "dp-2026-dandiya",
      title: "Dandiya Night",
      subtitle: "Garba & Dandiya Dance",
      description:
        "Entry ticket for the vibrant Dandiya Night on Dashami evening. Bring your sticks and your energy!",
      price: 10,
      currency: "EUR",
      category: "dandiya",
      date: "2026-10-18",
      time: "07:00 PM – 10:00 PM",
      includes: ["Dance floor access", "Live DJ set", "Welcome drink"],
      available: true,
      featured: true,
    },
    {
      id: "dp-2026-nabami-lunch",
      title: "Nabami Lunch",
      subtitle: "",
      description:
        "A light and joyful Nabami lunch of luchi, cholar daal, aloor dum, and mishti.",
      price: 10,
      priceOptions: [
        { label: "veg", price: 10 },
        { label: "non-veg", price: 12 },
      ],
      currency: "EUR",
      category: "food",
      date: "2026-10-18",
      time: "12:30 PM – 02:30 PM",
      includes: [
        "Luchi",
        "Cholar Daal",
        "Aloor Dum",
        "Tomato Chutney",
        "Boondi",
      ],
      available: true,
    },
  ],
  "dp-2025": [
    {
      id: "dp-2025-pass-all",
      title: "Full Festival Pass",
      subtitle: "3-Day All Access",
      description:
        "Access to all events over all three days of Durga Puja 2025.",
      price: 0,
      currency: "EUR",
      category: "pass",
      date: "2025-09-26",
      time: "All 3 Days",
      includes: [
        "All puja sessions",
        "Cultural program",
        "Dandiya Night",
        "Meals (booked separately)",
      ],
      available: false,
      note: "This event has already concluded.",
      featured: true,
    },
    {
      id: "dp-2025-bhog",
      title: "Ashtami Bhog",
      subtitle: "Traditional Festival Meal",
      description:
        "The traditional community Ashtami bhog served on afternoon.",
      price: 0,
      currency: "EUR",
      category: "food",
      date: "2025-09-27",
      time: "01:00 PM – 03:00 PM",
      includes: ["Khichuri", "Aloo Dum", "Chutney"],
      available: false,
      note: "Event concluded.",
    },
    {
      id: "dp-2025-bhog",
      title: "Ashtami Dinner",
      subtitle: "Traditional Festival Meal",
      description: "Saptami evening festive dinner with both vegetarian and non-vegetarian menu options.",
      price: 15,
      priceOptions: [
        { label: "veg", price: 13 },
        { label: "non-veg", price: 15 },
      ],
      currency: "EUR",
      category: "food",
      date: "2025-09-27",
      time: "07:30 PM – 09:30 PM",
      includes: ["Fish Fry or Paneer", "Pulao", "Chicken / Paneer", "Chutney", "Mishti"],
      available: false,
      note: "Event concluded.",
    },
    {
      id: "dp-2025-bhog",
      title: "Nabami Lunch",
      subtitle: "Traditional Festival Meal",
      description: "Nabami afternoon festive lunch with both vegetarian and non-vegetarian menu options.",
      price: 15,
      priceOptions: [
        { label: "veg", price: 13 },
        { label: "non-veg", price: 15 },
      ],
      currency: "EUR",
      category: "food",
      date: "2025-09-28",
      time: "12:30 PM – 02:30 PM",
      includes: ["Fish Fry or Paneer", "Pulao", "Chicken / Paneer", "Chutney", "Mishti"],
      available: false,
      note: "Event concluded.",
    },
    {
      id: "dp-2025-bhog",
      title: "Nabami Dinner",
      subtitle: "Traditional Festival Meal",
      description: "Nabami evening festive dinner with both vegetarian and non-vegetarian menu options.",
      price: 15,
      priceOptions: [
        { label: "veg", price: 13 },
        { label: "non-veg", price: 15 },
      ],
      currency: "EUR",
      category: "food",
      date: "2025-09-28",
      time: "07:30 PM – 09:30 PM",
      includes: ["Fish Fry or Paneer", "Pulao", "Chicken / Paneer", "Chutney", "Mishti"],
      available: false,
      note: "Event concluded.",
    },
    {
      id: "dp-2025-dandiya",
      title: "Dandiya Night",
      subtitle: "Garba & Dandiya Dance",
      description:
        "Dandiya Night with live music and community dancing on Dashami evening.",
      price: 10,
      currency: "EUR",
      category: "dandiya",
      date: "2025-09-28",
      time: "07:00 PM – 09:00 PM",
      includes: ["Dance floor access", "Live music", "Snacks"],
      available: false,
      featured: true,
      note: "Event concluded.",
    },
  ],
};

export const PARTNERS: Partner[] = [];

export const TEAM: TeamMember[] = [
  { id: "m1", name: "Member 1", role: "Role 1", bio: "Test text" },
  { id: "m2", name: "Member 2", role: "Role 2", bio: "Test text" },
  { id: "m3", name: "Member 3", role: "Role 3", bio: "Test text" },
  { id: "m4", name: "Member 4", role: "Role 4", bio: "Test text" },
];
