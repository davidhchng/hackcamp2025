import { Club, Event } from "../types";

export const clubs: Club[] = [
  {
    id: "1",
    name: "Soccer Club",
    image: "https://images.unsplash.com/photo-1721441904808-6f2c4c116d2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjB0ZWFtJTIwdW5pdmVyc2l0eXxlbnwxfHx8fDE3NjMyNjMyMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Join our competitive soccer team. Practice twice a week and compete in regional tournaments.",
    type: "Sports",
    location: "Main Field",
    vibe: ["Active", "Team Sports", "Competitive"],
    rating: 4.8,
    members: 45,
    meetingTime: "Tuesdays & Thursdays, 4:00 PM - 6:00 PM",
    contact: "soccer@ubc.ca",
    details: "We're a dedicated group of soccer enthusiasts competing in the UBC Intramural League. Whether you're a seasoned player or just getting started, we welcome all skill levels. Join us for practices, friendly matches, and tournament competitions throughout the year.",
    price: "$25/term"
  },
  {
    id: "2",
    name: "Debate Society",
    image: "https://images.unsplash.com/photo-1745078535555-05d259fe826f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWJhdGUlMjBjbHViJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzYzMjYzMjMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Sharpen your public speaking and critical thinking skills through weekly debates and competitions.",
    type: "Academic",
    location: "Student Center",
    vibe: ["Intellectual", "Public Speaking", "Leadership"],
    rating: 4.7,
    members: 32,
    meetingTime: "Wednesdays, 6:00 PM - 8:00 PM",
    contact: "debate@ubc.ca",
    details: "Build confidence in public speaking while engaging with current events and philosophical questions. We host weekly practice debates, attend regional competitions, and provide mentorship for newcomers. Perfect for aspiring lawyers, politicians, or anyone wanting to improve their argumentation skills.",
    price: "Free"
  },
  {
    id: "3",
    name: "Robotics Team",
    image: "https://images.unsplash.com/photo-1614492898637-435e0f87cef8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGVuZ2luZWVyaW5nJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzYzMjYzMjMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Design, build, and program robots for national competitions. Perfect for engineering enthusiasts.",
    type: "STEM",
    location: "Engineering Lab",
    vibe: ["Technical", "Innovation", "Hands-on"],
    rating: 4.9,
    members: 28,
    meetingTime: "Mondays & Fridays, 5:00 PM - 7:00 PM",
    contact: "robotics@ubc.ca",
    details: "Join UBC's award-winning robotics team! We design and build competition robots, participate in international competitions, and collaborate on innovative projects. Great opportunity to gain hands-on experience with mechanical design, electrical systems, and programming.",
    price: "$50/term"
  },
  {
    id: "4",
    name: "Drama Club",
    image: "https://images.unsplash.com/photo-1630050525402-06c617847d27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFtYSUyMHRoZWF0cmUlMjBzdHVkZW50c3xlbnwxfHx8fDE3NjMyNjMyMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Perform in theatrical productions and develop your acting skills. Open to all experience levels.",
    type: "Arts",
    location: "Theatre Building",
    vibe: ["Creative", "Performance", "Expressive"],
    rating: 4.6,
    members: 38,
    meetingTime: "Thursdays, 7:00 PM - 9:00 PM",
    contact: "drama@ubc.ca",
    details: "Express yourself through the art of theatre! We produce 3 major shows per year and host weekly acting workshops. Whether you're interested in acting, directing, stage management, or set design, there's a role for everyone. No experience necessary!",
    price: "Free"
  },
  {
    id: "5",
    name: "Photography Society",
    image: "https://images.unsplash.com/photo-1725353568651-562163a5e3fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMGNsdWJ8ZW58MXx8fHwxNzYzMjYzMjMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Explore photography techniques, go on photo walks, and showcase your work in our annual exhibition.",
    type: "Arts",
    location: "Arts Building",
    vibe: ["Creative", "Visual Arts", "Social"],
    rating: 4.5,
    members: 52,
    meetingTime: "Saturdays, 10:00 AM - 12:00 PM",
    contact: "photo@ubc.ca",
    details: "Capture the world through your lens! We organize weekly photo walks, technique workshops, and critique sessions. Our annual exhibition showcases member work to the entire campus. All camera types welcome - phone, DSLR, film, or mirrorless!",
    price: "$15/term"
  },
  {
    id: "6",
    name: "Community Service",
    image: "https://images.unsplash.com/photo-1751666526244-40239a251eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXIlMjBjb21tdW5pdHklMjBzZXJ2aWNlfGVufDF8fHx8MTc2MzIyNDk2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Make a difference in the local community through volunteering and outreach programs.",
    type: "Service",
    location: "Various Locations",
    vibe: ["Volunteering", "Impact", "Community"],
    rating: 4.8,
    members: 67,
    meetingTime: "Flexible scheduling",
    contact: "service@ubc.ca",
    details: "Make a real impact in Vancouver! We partner with local nonprofits, food banks, and community centers. Choose from weekly commitments or one-off events. Great way to give back while building your resume and meeting passionate people.",
    price: "Free"
  }
];

export const events: Event[] = [
  {
    id: "1",
    clubName: "UBC Events",
    eventName: "Welcome Week Block Party",
    date: "Nov 18, 2025",
    time: "6:00 PM",
    image: "https://images.unsplash.com/photo-1618073194229-5d838801b389?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wdXMlMjBwYXJ0eSUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc2MzI2Mzc4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Kick off the semester with food trucks, live music, and activities on the main quad!",
    price: "Free"
  },
  {
    id: "2",
    clubName: "UBC Athletics",
    eventName: "Thunderbirds vs Huskies - Basketball",
    date: "Nov 19, 2025",
    time: "7:00 PM",
    image: "https://images.unsplash.com/photo-1650124077853-b6fcb0231cc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBnYW1lJTIwc3RhZGl1bXxlbnwxfHx8fDE3NjMyNTI1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Cheer on the Thunderbirds as they take on the Huskies in this exciting rivalry game!",
    price: "Free with ID"
  },
  {
    id: "3",
    clubName: "UBC Career Services",
    eventName: "Fall Career Fair 2025",
    date: "Nov 20, 2025",
    time: "10:00 AM",
    image: "https://images.unsplash.com/photo-1762330472769-cb8e6c8324d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJlZXIlMjBmYWlyJTIwbmV0d29ya2luZ3xlbnwxfHx8fDE3NjMyNjM3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Meet with 100+ employers and explore internship and full-time opportunities.",
    price: "Free"
  },
  {
    id: "4",
    clubName: "AMS Events",
    eventName: "Outdoor Movie Night: Barbie",
    date: "Nov 21, 2025",
    time: "8:00 PM",
    image: "https://images.unsplash.com/photo-1574504212584-29a03eb6e41e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwb3V0ZG9vciUyMGZlc3RpdmFsfGVufDF8fHx8MTc2MzI2Mzc4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Grab a blanket and enjoy a free outdoor screening under the stars on the main quad.",
    price: "Free"
  },
  {
    id: "5",
    clubName: "UBC Library",
    eventName: "Finals Study Marathon",
    date: "Nov 22, 2025",
    time: "8:00 AM",
    image: "https://images.unsplash.com/photo-1589872880544-76e896b0592c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMGdyb3VwJTIwbGlicmFyeXxlbnwxfHx8fDE3NjMxODkyODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "24-hour study session with free coffee, snacks, and quiet study spaces throughout the library.",
    price: "Free"
  },
  {
    id: "6",
    clubName: "UBC Arts",
    eventName: "Student Art Exhibition Opening",
    date: "Nov 23, 2025",
    time: "5:00 PM",
    image: "https://images.unsplash.com/photo-1632834380561-d1e05839a33a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzYzMTkyMDA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Celebrate student creativity at the opening reception for our annual art exhibition.",
    price: "Free"
  },
  {
    id: "7",
    clubName: "Soccer Club",
    eventName: "Regional Tournament Finals",
    date: "Nov 24, 2025",
    time: "2:00 PM",
    image: "https://images.unsplash.com/photo-1721441904808-6f2c4c116d2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjB0ZWFtJTIwdW5pdmVyc2l0eXxlbnwxfHx8fDE3NjMyNjMyMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Cheer on our soccer club as they compete in the regional finals. Free entry for all students!",
    price: "Free"
  },
  {
    id: "8",
    clubName: "Debate Society",
    eventName: "Oxford-Style Debate Night",
    date: "Nov 25, 2025",
    time: "7:00 PM",
    image: "https://images.unsplash.com/photo-1745078535555-05d259fe826f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWJhdGUlMjBjbHViJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzYzMjYzMjMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Join us for an engaging Oxford-style debate on current events. Audience participation encouraged!",
    price: "Free"
  },
  {
    id: "9",
    clubName: "Drama Club",
    eventName: "Fall Play: Hamlet",
    date: "Nov 26, 2025",
    time: "8:00 PM",
    image: "https://images.unsplash.com/photo-1630050525402-06c617847d27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFtYSUyMHRoZWF0cmUlMjBzdHVkZW50c3xlbnwxfHx8fDE3NjMyNjMyMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Experience Shakespeare's classic tragedy performed by our talented drama students.",
    price: "$5"
  }
];

export const interests = [
  "Sports", "Soccer", "Basketball", "Tennis", "Swimming",
  "Arts", "Theatre", "Music", "Photography", "Dance",
  "STEM", "Robotics", "Coding", "Engineering", "Math",
  "Social", "Debate", "Public Speaking", "Leadership", "Networking",
  "Service", "Volunteering", "Community", "Environment", "Charity",
  "Creative", "Writing", "Poetry", "Film", "Design",
  "Academic", "Research", "Study Groups", "Tutoring", "Book Club",
  "Wellness", "Yoga", "Meditation", "Mental Health", "Fitness",
  "Culture", "International", "Languages", "Travel", "Food",
  "Gaming", "Esports", "Board Games", "Video Games", "Tabletop"
];