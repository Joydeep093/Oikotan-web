import { FoodMenuDay } from "@/types";

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
