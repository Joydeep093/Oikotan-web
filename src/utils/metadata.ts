import type { Metadata } from "next";
import type { Event } from "@/types";

export function generateEventMetadata(event: Event | undefined): Metadata {
  if (!event) {
    return {
      title: "Event Not Found",
      description: "The event you are looking for does not exist.",
    };
  }

  return {
    title: event.title,
    description: event.description,
  };
}

export function generateCulturalProgramMetadata(event: Event | undefined): Metadata {
  if (!event) {
    return {
      title: "Cultural Program Not Found",
      description: "The cultural program you are looking for does not exist.",
    };
  }

  return {
    title: `${event.title} - Cultural Program`,
    description: `Cultural program details and day-wise schedule for ${event.title}.`,
  };
}

export function generateDandiyaProgramMetadata(event: Event | undefined): Metadata {
  if (!event) {
    return {
      title: "Dandiya Night Not Found",
      description: "The Dandiya Night event you are looking for does not exist.",
    };
  }

  return {
    title: `${event.title} - Dandiya Night`,
    description: `Dandiya Night details and information for ${event.title}.`,
  };
}

export function generateTicketsMetadata(event: Event | undefined): Metadata {
  if (!event) {
    return {
      title: "Tickets Not Found",
      description: "The ticket page you are looking for does not exist.",
    };
  }

  return {
    title: `${event.title} - Tickets`,
    description: `Book your tickets for ${event.title}. Food, Bhog, Dandiya, Darshan passes and more.`,
  };
}

export function generateFoodMenuMetadata(event: Event | undefined): Metadata {
  if (!event) {
    return {
      title: "Food Menu Not Found",
      description: "The food menu you are looking for does not exist.",
    };
  }

  return {
    title: `${event.title} - Food Fiesta`,
    description: `Day-wise food menu and food stall details for ${event.title}.`,
  };
}
