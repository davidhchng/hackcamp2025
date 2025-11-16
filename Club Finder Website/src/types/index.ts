export interface Club {
  id: string;
  name: string;
  image: string;
  description: string;
  type: string;
  location: string;
  vibe: string[];
  rating: number;
  members?: number;
  meetingTime?: string;
  contact?: string;
  details?: string;
  price?: string;
}

export interface Event {
  id: string;
  clubName: string;
  eventName: string;
  date: string;
  time: string;
  image: string;
  description: string;
  price: string;
  tag: string;
  freeWithStudentID?: boolean;
  rsvpLink?: string;
}