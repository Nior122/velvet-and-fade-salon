export const salon = {
  name: "Velvet & Fade",
  tagline: "Where Every Style Becomes Your Signature",
  phone: "+2348123456789",
  whatsappPhone: "2348123456789",
  email: "hello@velvetandfade.ng",
  address: "14 Admiralty Way, Lekki Phase 1, Lagos",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.5!2d3.465!3d6.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjcnMDAuMCJOIDDCsDI3JzU0LjAiRQ!5e0!3m2!1sen!2sng",
  hours: {
    mon: "9:00 AM – 8:00 PM",
    tue: "9:00 AM – 8:00 PM",
    wed: "9:00 AM – 8:00 PM",
    thu: "9:00 AM – 8:00 PM",
    fri: "9:00 AM – 9:00 PM",
    sat: "9:00 AM – 9:00 PM",
    sun: "12:00 PM – 6:00 PM",
  },
  openHour: 9,
  closeHour: 20,
  closedDays: [],
  foundedYear: 2019,
  founderName: "Adaeze Okonkwo",
  founderBio:
    "Adaeze trained at the London School of Beauty before returning to Lagos with a vision: a salon where men and women get the same quality of attention, under one roof. After five years building Velvet & Fade from a single chair in Lekki, she now leads a team of 12 stylists and barbers.",
  stats: [
    { label: "Clients served", value: "8,000+", icon: "users" },
    { label: "Years in Lekki", value: "5", icon: "calendar" },
    { label: "Stylists & barbers", value: "12", icon: "scissors" },
    { label: "Google rating", value: "4.8", icon: "star", suffix: "★" },
  ],
  testimonials: [
    {
      name: "Chioma Adebayo",
      text: "The best salon experience I've had in Lagos. The attention to detail is unmatched — every visit feels like a luxury retreat.",
      rating: 5,
      service: "Colour & Highlights",
    },
    {
      name: "Emeka Okoro",
      text: "Tunde is a master at what he does. My fade has never looked this clean. Velvet & Fade is the only place I trust.",
      rating: 5,
      service: "Skin Fade",
    },
    {
      name: "Fatima Ibrahim",
      text: "From the moment you walk in, the atmosphere is calm and inviting. My braids were done perfectly and the spa treatment was divine.",
      rating: 5,
      service: "Box Braids & Spa",
    },
    {
      name: "Oluwaseun Martins",
      text: "I brought my partner here for our anniversary and we both left feeling incredible. The nail art is stunning too!",
      rating: 5,
      service: "Gel Nails",
    },
  ],
};

export const serviceCategories = {
  mensHaircuts: {
    label: "Haircuts",
    gender: "men",
    image:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80",
    services: [
      {
        id: "m-cut-classic",
        name: "Classic Cut",
        duration: 30,
        price: 5000,
        description: "Timeless scissor cut with a clean finish",
        image:
          "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80",
      },
      {
        id: "m-cut-fade",
        name: "Skin Fade",
        duration: 40,
        price: 7000,
        description: "Precision fade blended to skin",
        image:
          "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80",
      },
      {
        id: "m-cut-crew",
        name: "Crew Cut",
        duration: 25,
        price: 4500,
        description: "Short, structured, effortlessly clean",
        image:
          "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80",
      },
      {
        id: "m-cut-taper",
        name: "Taper Fade",
        duration: 35,
        price: 6000,
        description: "Gradual taper with sharp edge-up",
        image:
          "https://images.unsplash.com/photo-1596362601603-70152a3b36ea?w=600&q=80",
      },
    ],
  },
  mensGrooming: {
    label: "Beard & Grooming",
    gender: "men",
    image:
      "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=800&q=80",
    services: [
      {
        id: "m-beard-shape",
        name: "Beard Sculpt",
        duration: 20,
        price: 3500,
        description: "Hot-towel shape-up and precision line",
        image:
          "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80",
      },
      {
        id: "m-beard-full",
        name: "Full Beard Trim",
        duration: 25,
        price: 4000,
        description: "Clipper and scissor trim with oil finish",
        image:
          "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=600&q=80",
      },
      {
        id: "m-shave",
        name: "Hot Towel Shave",
        duration: 30,
        price: 5000,
        description: "Old-school straight razor shave with balm",
        image:
          "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80",
      },
      {
        id: "m-facial",
        name: "Men's Facial",
        duration: 40,
        price: 8000,
        description: "Deep cleanse, steam, and moisturise",
        image:
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
      },
    ],
  },
  womensHaircuts: {
    label: "Haircuts & Styling",
    gender: "women",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80",
    services: [
      {
        id: "w-cut-bob",
        name: "Precision Bob",
        duration: 45,
        price: 8000,
        description: "Sharp-edged bob tailored to your face shape",
        image:
          "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80",
      },
      {
        id: "w-cut-layer",
        name: "Layered Cut",
        duration: 50,
        price: 9000,
        description: "Movement-focused layers with blow-dry finish",
        image:
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
      },
      {
        id: "w-blowout",
        name: "Blow-Dry & Style",
        duration: 35,
        price: 5000,
        description: "Silky blow-dry with volume and shine",
        image:
          "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80",
      },
      {
        id: "w-updo",
        name: "Event Updo",
        duration: 60,
        price: 12000,
        description: "Bridal or occasion updo with consultation",
        image:
          "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
      },
    ],
  },
  womensColor: {
    label: "Colour",
    gender: "women",
    image:
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80",
    services: [
      {
        id: "w-color-full",
        name: "Full Colour",
        duration: 90,
        price: 18000,
        description: "Root-to-tip colour transformation",
        image:
          "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&q=80",
      },
      {
        id: "w-color-highlights",
        name: "Highlights",
        duration: 120,
        price: 25000,
        description: "Foil highlights for depth and dimension",
        image:
          "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80",
      },
      {
        id: "w-color-gloss",
        name: "Gloss Treatment",
        duration: 45,
        price: 10000,
        description: "Semi-permanent shine boost",
        image:
          "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
      },
    ],
  },
  nails: {
    label: "Nails",
    gender: "everyone",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
    services: [
      {
        id: "n-manicure",
        name: "Classic Manicure",
        duration: 30,
        price: 4000,
        description: "Shape, cuticle care, polish of choice",
        image:
          "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
      },
      {
        id: "n-pedicure",
        name: "Spa Pedicure",
        duration: 45,
        price: 6000,
        description: "Soak, scrub, mask, and polish",
        image:
          "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&q=80",
      },
      {
        id: "n-gel",
        name: "Gel Nails",
        duration: 50,
        price: 7000,
        description: "Long-lasting gel with nail art options",
        image:
          "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&q=80",
      },
      {
        id: "n-acrylic",
        name: "Acrylic Extensions",
        duration: 70,
        price: 10000,
        description: "Full set with custom shape and design",
        image:
          "https://images.unsplash.com/photo-1571290274554-6a2eaa74d75b?w=600&q=80",
      },
    ],
  },
  braiding: {
    label: "Braiding & Plaits",
    gender: "women",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    services: [
      {
        id: "b-box",
        name: "Box Braids",
        duration: 180,
        price: 25000,
        description: "Medium box braids, any length",
        image:
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
      },
      {
        id: "b-cornrow",
        name: "Cornrow Styles",
        duration: 120,
        price: 15000,
        description: "Straight-backs or creative patterns",
        image:
          "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=600&q=80",
      },
      {
        id: "b-twist",
        name: "Senegalese Twists",
        duration: 150,
        price: 20000,
        description: "Two-strand twists with silky finish",
        image:
          "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
      },
    ],
  },
  spa: {
    label: "Spa & Massage",
    gender: "everyone",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    services: [
      {
        id: "s-head",
        name: "Head & Scalp Massage",
        duration: 30,
        price: 5000,
        description: "Tension release with essential oils",
        image:
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
      },
      {
        id: "s-back",
        name: "Back & Shoulder Massage",
        duration: 45,
        price: 8000,
        description: "Deep-tissue relief for desk tension",
        image:
          "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80",
      },
      {
        id: "s-hand",
        name: "Hand & Arm Treatment",
        duration: 25,
        price: 4000,
        description: "Exfoliation, massage, and hydrating mask",
        image:
          "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&q=80",
      },
    ],
  },
};

export const signatureServices = [
  serviceCategories.mensHaircuts.services[1],
  serviceCategories.womensHaircuts.services[1],
  serviceCategories.nails.services[2],
  serviceCategories.braiding.services[0],
];

export const mockBookedSlots = {
  [new Date().toISOString().slice(0, 10)]: new Set(["10:00", "14:00", "16:00"]),
};

export const team = [
  {
    name: "Adaeze Okonkwo",
    role: "Founder & Lead Stylist",
    specialty: "Colour & women's styling",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
  },
  {
    name: "Tunde Bakare",
    role: "Master Barber",
    specialty: "Fades & beard sculpting",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    name: "Ngozi Eze",
    role: "Nail Artist",
    specialty: "Gel art & extensions",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
  },
  {
    name: "Emeka Nwosu",
    role: "Braiding Specialist",
    specialty: "Protective styles & creative braids",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
  },
  {
    name: "Blessing Idoko",
    role: "Colour Specialist",
    specialty: "Highlights & balayage",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
  },
  {
    name: "Femi Adeyemi",
    role: "Spa Therapist",
    specialty: "Deep tissue & scalp treatments",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
  },
];

export const galleryImages = [
  { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80", aspect: "tall" },
  { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80", aspect: "wide" },
  { src: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80", aspect: "square" },
  { src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80", aspect: "tall" },
  { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80", aspect: "wide" },
  { src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80", aspect: "square" },
  { src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80", aspect: "wide" },
  { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80", aspect: "tall" },
  { src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80", aspect: "square" },
  { src: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&q=80", aspect: "tall" },
];
