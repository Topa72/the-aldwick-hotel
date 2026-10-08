import { images } from "./images"

export const navLinks = [
  { label: "Rooms", href: "#rooms" },
  { label: "Dining", href: "#dining" },
  { label: "Experiences", href: "#experiences" },
  { label: "Location", href: "#location" },
] as const

export const heroChips = ["12 Rooms", "Dog Friendly", "Restaurant", "Free Parking", "Cotswolds"] as const

export const rooms = [
  {
    name: "Classic Rooms",
    count: "6 rooms",
    description: "Original features, sash windows and quiet views across the walled garden.",
    price: 180,
  },
  {
    name: "Deluxe Rooms",
    count: "4 rooms",
    description: "Freestanding baths, generous proportions and long views over open Cotswolds countryside.",
    price: 240,
  },
  {
    name: "The Suite",
    count: "Master suite",
    description: "Our finest room — a vaulted master suite opening onto its own private terrace.",
    price: 380,
  },
] as const

export type GalleryItem = {
  src: string
  label: string
  alt: string
  ratio: "portrait" | "landscape"
}

export const gallery: GalleryItem[] = [
  {
    src: images.gallery.bedroom,
    label: "The Suite",
    alt: "Four-poster bed against warm stone walls, lit by bedside lamps",
    ratio: "portrait",
  },
  {
    src: images.gallery.bathroom,
    label: "Deluxe Bathroom",
    alt: "Roll-top bath beneath a window overlooking the countryside",
    ratio: "landscape",
  },
  {
    src: images.gallery.restaurant,
    label: "The Restaurant",
    alt: "Candlelit dining room beside a glowing stone fireplace",
    ratio: "landscape",
  },
  {
    src: images.gallery.lounge,
    label: "The Library Lounge",
    alt: "Deep armchairs and bookshelves in the firelit lounge",
    ratio: "portrait",
  },
  {
    src: images.gallery.grounds,
    label: "The Grounds at Dawn",
    alt: "Mist over rolling fields and dry-stone walls at sunrise",
    ratio: "portrait",
  },
  {
    src: images.gallery.terrace,
    label: "The Terrace",
    alt: "Morning coffee on the terrace with a countryside view",
    ratio: "landscape",
  },
]

export const diningChips = ["Seasonal Menu", "Locally Sourced", "Open to Non-Residents Thu–Sun"] as const

export const experiences = [
  { title: "Walking & Cycling", detail: "We provide maps and bikes" },
  { title: "Private Dining", detail: "Exclusive hire available" },
  { title: "Spa Treatments", detail: "In-room therapist bookings" },
] as const

export const testimonials = [
  {
    quote:
      "We stayed for three nights and genuinely didn't want to leave. The food was exceptional and every room detail had been thought about.",
    name: "Charlotte & Ben W.",
    room: "The Suite",
  },
  {
    quote:
      "The kind of quiet you forget exists. Breakfast by the fire, a long walk to Bourton, then the tasting menu — a perfect weekend.",
    name: "Eleanor M.",
    room: "Deluxe Room",
  },
  {
    quote:
      "Our spaniel was welcomed like a guest of honour. Beautiful room, warm staff and the best roast we've had in years.",
    name: "Tom & Priya H.",
    room: "Classic Room",
  },
] as const

export const directions = [
  {
    title: "By Car",
    body: "From London, take the M40 to junction 8, then the A40 west towards Cheltenham. At Northleach, follow the A429 north for around ten minutes. The Aldwick is signposted on the left just before Bourton-on-the-Water. Free parking for all guests, with EV charging available.",
  },
  {
    title: "By Train",
    body: "Direct trains run from London Paddington to Moreton-in-Marsh in around 90 minutes. We're a 20-minute taxi ride from the station — let us know your arrival time and we'll happily arrange a car to meet you.",
  },
] as const

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Pinterest", href: "https://www.pinterest.com/" },
  { label: "TripAdvisor", href: "https://www.tripadvisor.co.uk/" },
] as const
