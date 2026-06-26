import type { Event, Testimonial, Partner, TeamMember } from "@/types";
import { PAST_EVENTS, UPCOMING_EVENTS } from "./event-data";

export const SITE_NAME = "Oikotan";
export const SITE_TAGLINE =
  "The Indian Bengali Cultural Association in Lithuania";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Separate events into upcoming and past




const ALL_EVENTS: Event[] = [...UPCOMING_EVENTS, ...PAST_EVENTS];

export const EVENTS = ALL_EVENTS;

export const TESTIMONIALS: Testimonial[] = [];

export const PARTNERS: Partner[] = [];

export const TEAM: TeamMember[] = [
  { id: "m1", name: "Member 1", role: "Role 1", bio: "Test text" },
  { id: "m2", name: "Member 2", role: "Role 2", bio: "Test text" },
  { id: "m3", name: "Member 3", role: "Role 3", bio: "Test text" },
  { id: "m4", name: "Member 4", role: "Role 4", bio: "Test text" },
];
