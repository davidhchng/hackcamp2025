import { Club, Event } from "../types";
import clubInfoData from "./club_info.json";
import eventsInfoData from "./events_info.json";

// Helper function to determine club type based on name and description
function getClubType(name: string, description: string): string {
  const lowerName = name.toLowerCase();
  const lowerDesc = description.toLowerCase();
  
  if (lowerName.includes("squash") || lowerName.includes("disc golf") || lowerName.includes("sport")) {
    return "Sports";
  }
  if (lowerName.includes("statistics") || lowerName.includes("data") || lowerName.includes("ai") || 
      lowerName.includes("stem") || lowerName.includes("tech") || lowerName.includes("engineering") ||
      lowerName.includes("launch pad") || lowerName.includes("robotics")) {
    return "STEM";
  }
  if (lowerName.includes("chinese") || lowerName.includes("hong kong") || lowerName.includes("japan") ||
      lowerName.includes("taiwanese") || lowerName.includes("persian") || lowerName.includes("singapore") ||
      lowerName.includes("korean") || lowerName.includes("jewish") || lowerName.includes("muslim")) {
    return "Culture";
  }
  if (lowerName.includes("finance") || lowerName.includes("business") || lowerName.includes("biztech") ||
      lowerName.includes("startup") || lowerName.includes("career")) {
    return "Business";
  }
  if (lowerName.includes("research") || lowerName.includes("academic") || lowerName.includes("uro")) {
    return "Academic";
  }
  return "General";
}

// Helper function to generate location
function getLocation(type: string): string {
  const locations: Record<string, string> = {
    "Sports": "UBC Recreation Center",
    "STEM": "Engineering Building",
    "Culture": "Student Center",
    "Business": "Sauder School of Business",
    "Academic": "Main Library",
    "General": "Student Center"
  };
  return locations[type] || "Student Center";
}

// Helper function to generate vibe tags
function getVibeTags(name: string, description: string, type: string): string[] {
  const tags: string[] = [];
  const lowerDesc = description.toLowerCase();
  
  if (type === "Sports") {
    tags.push("Active", "Fitness");
  } else if (type === "STEM") {
    tags.push("Technical", "Innovation");
  } else if (type === "Culture") {
    tags.push("Cultural", "Community");
  } else if (type === "Business") {
    tags.push("Professional", "Networking");
  } else if (type === "Academic") {
    tags.push("Intellectual", "Academic");
  }
  
  if (lowerDesc.includes("social") || lowerDesc.includes("community") || lowerDesc.includes("friends")) {
    tags.push("Social");
  }
  if (lowerDesc.includes("workshop") || lowerDesc.includes("learn") || lowerDesc.includes("skill")) {
    tags.push("Educational");
  }
  if (lowerDesc.includes("competition") || lowerDesc.includes("competitive")) {
    tags.push("Competitive");
  }
  if (lowerDesc.includes("beginner") || lowerDesc.includes("welcome") || lowerDesc.includes("all levels")) {
    tags.push("Beginner-Friendly");
  }
  
  return tags.length > 0 ? tags : ["Community", "Social"];
}

// Helper function to generate image URL based on club name
function getImageUrl(name: string, type: string): string {
  const imageMap: Record<string, string> = {
    "Squash Club": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
    "Disc Golf Club": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    "Undergraduate Statistics Society": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    "Chinese Students Association": "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
    "Stem Fellowship": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop",
    "nwPlus": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
    "Hong Kong YOURS Association": "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
    "BizTech": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    "UX Hub": "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=600&fit=crop",
    "Japan Association": "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
    "BOLT": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    "Japan Career Network": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    "AI CLUB": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    "Jewish Students Association": "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
    "Data Science Club": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    "Finance Association": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    "Muslim Students Association": "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
    "UBC Startups": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    "New Taiwanese Generation": "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
    "eProjects": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    "Persian Club": "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
    "Undergraduate Research Opportunities": "https://images.unsplash.com/photo-1532619675605-1ede6c4ed2b8?w=800&h=600&fit=crop",
    "Singapore Students Association": "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
    "Launch Pad": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
    "K-WAVE": "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
    "Women in Data Science": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
  };
  
  return imageMap[name] || `https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop`;
}

// Convert JSON data to Club format
function convertToClubs(jsonData: any[]): Club[] {
  // Filter out invalid entries and duplicates
  const seen = new Set<string>();
  const validClubs = jsonData.filter(club => {
    if (!club.name || club.name === "1" || !club.description || club.description === "1") {
      return false;
    }
    if (seen.has(club.name)) {
      return false; // Skip duplicates
    }
    seen.add(club.name);
    return true;
  });
  
  return validClubs.map((club, index) => {
      const type = getClubType(club.name, club.description);
      const location = getLocation(type);
      const vibe = getVibeTags(club.name, club.description, type);
      const priceStr = club.price === 0 ? "Free" : `$${club.price}/year`;
      
      // Generate random but consistent rating and members
      const seed = club.name.length + index;
      const rating = 4.3 + (seed % 7) * 0.1; // 4.3 to 4.9
      const members = 20 + (seed % 80); // 20 to 100
      
      // Use image from JSON if provided (URL or local path), otherwise fall back to getImageUrl
      let imageUrl: string;
      if (club.image) {
        // If it's a full URL, use it directly
        if (club.image.startsWith('http://') || club.image.startsWith('https://')) {
          imageUrl = club.image;
        } 
        // If it starts with /, it's already a path from root
        else if (club.image.startsWith('/')) {
          imageUrl = club.image;
        }
        // Otherwise, treat it as a filename in the public/images folder
        else {
          imageUrl = `/images/${club.image}`;
        }
      } else {
        // Fall back to the existing getImageUrl function
        imageUrl = getImageUrl(club.name, type);
      }
      
      return {
        id: `club-${index + 1}`,
        name: club.name,
        image: imageUrl,
        description: club.description.substring(0, 150) + (club.description.length > 150 ? "..." : ""),
        type,
        location,
        vibe,
        rating: Math.round(rating * 10) / 10,
        members,
        meetingTime: "Check Instagram for schedule",
        contact: club.contact || "Contact via Instagram",
        details: club.description,
        price: priceStr
      };
    });
}

export const clubs: Club[] = convertToClubs(clubInfoData);

// Convert JSON data to Event format
function convertToEvents(jsonData: any[]): Event[] {
  return jsonData.map((event, index) => {
    // Handle image path similar to clubs
    let imageUrl: string;
    if (event.image) {
      // If it's a full URL, use it directly
      if (event.image.startsWith('http://') || event.image.startsWith('https://')) {
        imageUrl = event.image;
      } 
      // If it starts with /, it's already a path from root
      else if (event.image.startsWith('/')) {
        imageUrl = event.image;
      }
      // Otherwise, treat it as a filename in the public/images folder
      else {
        imageUrl = `/images/${event.image}`;
      }
    } else {
      // Fall back to default image
      imageUrl = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop";
    }
    
    return {
      id: `event-${index + 1}`,
      clubName: event.clubName || "Unknown",
      eventName: event.eventName || "Untitled Event",
      date: event.date || "",
      time: event.time || "",
      image: imageUrl,
      description: event.description || "",
      price: event.price || "Free",
      tag: event.tag || "UBC events",
      freeWithStudentID: event.freeWithStudentID || false,
      rsvpLink: event.rsvpLink || ""
    };
  });
}

export const events: Event[] = convertToEvents(eventsInfoData);

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