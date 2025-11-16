import { Club } from "../types";

interface ProfileData {
  adjectives: string[];
  passions: string[];
  major: string;
  bio: string;
  lookingFor: string;
  genderPronouns?: string;
}

/**
 * Scores a club based on how well it matches the user's profile
 * Returns a score from 0-100, higher = better match
 */
export function scoreClubMatch(club: Club, profile: ProfileData): number {
  let score = 0;
  const maxScore = 100;
  
  // Combine all profile text for keyword matching
  const profileText = [
    ...profile.adjectives.filter(a => a.trim()),
    ...profile.passions.filter(p => p.trim()),
    profile.major,
    profile.bio,
    profile.lookingFor
  ].join(" ").toLowerCase();
  
  const clubText = [
    club.name,
    club.description,
    club.details || "",
    club.type,
    ...club.vibe
  ].join(" ").toLowerCase();
  
  // 1. Major matching (30 points)
  if (profile.major) {
    const majorLower = profile.major.toLowerCase();
    const clubTextLower = clubText;
    
    // Check if major keywords appear in club description
    const majorKeywords = extractKeywords(majorLower);
    let majorMatches = 0;
    majorKeywords.forEach(keyword => {
      if (clubTextLower.includes(keyword)) {
        majorMatches++;
      }
    });
    
    // Also check club type alignment
    if (isMajorTypeMatch(profile.major, club.type)) {
      score += 30;
    } else if (majorMatches > 0) {
      score += 20;
    } else {
      score += 5; // Small base score
    }
  }
  
  // 2. Passions matching (25 points)
  if (profile.passions.length > 0) {
    const validPassions = profile.passions.filter(p => p.trim());
    let passionMatches = 0;
    
    validPassions.forEach(passion => {
      const passionLower = passion.toLowerCase();
      const keywords = extractKeywords(passionLower);
      
      keywords.forEach(keyword => {
        if (clubText.includes(keyword) && keyword.length > 2) {
          passionMatches++;
        }
      });
    });
    
    if (passionMatches > 0) {
      score += Math.min(25, (passionMatches / validPassions.length) * 25);
    }
  }
  
  // 3. Adjectives/Vibe matching (20 points)
  if (profile.adjectives.length > 0) {
    const validAdjectives = profile.adjectives.filter(a => a.trim());
    let vibeMatches = 0;
    
    validAdjectives.forEach(adjective => {
      const adjLower = adjective.toLowerCase();
      // Check if adjective matches club vibe tags
      club.vibe.forEach(vibeTag => {
        if (vibeTag.toLowerCase().includes(adjLower) || adjLower.includes(vibeTag.toLowerCase())) {
          vibeMatches++;
        }
      });
      
      // Also check in club description
      if (clubText.includes(adjLower)) {
        vibeMatches += 0.5;
      }
    });
    
    if (vibeMatches > 0) {
      score += Math.min(20, (vibeMatches / validAdjectives.length) * 20);
    }
  }
  
  // 4. "Looking For" matching (15 points)
  if (profile.lookingFor) {
    const lookingForLower = profile.lookingFor.toLowerCase();
    const keywords = extractKeywords(lookingForLower);
    let lookingForMatches = 0;
    
    keywords.forEach(keyword => {
      if (clubText.includes(keyword) && keyword.length > 3) {
        lookingForMatches++;
      }
    });
    
    if (lookingForMatches > 0) {
      score += Math.min(15, (lookingForMatches / Math.max(1, keywords.length)) * 15);
    }
  }
  
  // 5. Bio keyword matching (10 points)
  if (profile.bio) {
    const bioLower = profile.bio.toLowerCase();
    const bioKeywords = extractKeywords(bioLower);
    let bioMatches = 0;
    
    bioKeywords.forEach(keyword => {
      if (clubText.includes(keyword) && keyword.length > 3) {
        bioMatches++;
      }
    });
    
    if (bioMatches > 0) {
      score += Math.min(10, (bioMatches / Math.max(1, bioKeywords.length)) * 10);
    }
  }
  
  // Normalize to 0-100 range
  return Math.min(maxScore, Math.round(score));
}

/**
 * Extract meaningful keywords from text
 */
function extractKeywords(text: string): string[] {
  // Remove common stop words
  const stopWords = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
    'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
    'to', 'was', 'will', 'with', 'i', 'am', 'my', 'me', 'we', 'our',
    'you', 'your', 'they', 'them', 'this', 'these', 'who', 'what',
    'where', 'when', 'why', 'how', 'the', 'a', 'an'
  ]);
  
  return text
    .split(/\s+/)
    .map(word => word.toLowerCase().replace(/[^\w]/g, ''))
    .filter(word => word.length > 2 && !stopWords.has(word));
}

/**
 * Check if major aligns with club type
 */
function isMajorTypeMatch(major: string, clubType: string): boolean {
  const majorLower = major.toLowerCase();
  const typeLower = clubType.toLowerCase();
  
  // STEM majors -> STEM clubs
  if ((majorLower.includes('engineering') || majorLower.includes('computer') || 
       majorLower.includes('science') || majorLower.includes('math') || 
       majorLower.includes('statistics') || majorLower.includes('data') ||
       majorLower.includes('technology') || majorLower.includes('physics') ||
       majorLower.includes('chemistry') || majorLower.includes('biology')) &&
      (typeLower === 'stem' || typeLower === 'academic')) {
    return true;
  }
  
  // Business majors -> Business clubs
  if ((majorLower.includes('business') || majorLower.includes('commerce') || 
       majorLower.includes('economics') || majorLower.includes('finance')) &&
      (typeLower === 'business' || typeLower === 'academic')) {
    return true;
  }
  
  // Arts majors -> Culture/Arts clubs
  if ((majorLower.includes('art') || majorLower.includes('music') || 
       majorLower.includes('drama') || majorLower.includes('theatre') ||
       majorLower.includes('film') || majorLower.includes('creative')) &&
      (typeLower === 'culture' || typeLower === 'general')) {
    return true;
  }
  
  return false;
}

/**
 * Sort clubs by match score (highest first)
 */
export function sortClubsByMatch(clubs: Club[], profile: ProfileData | null): Club[] {
  if (!profile) {
    return clubs; // Return original order if no profile
  }
  
  // Check if profile has any meaningful data
  const hasData = profile.major || 
                  profile.passions.some(p => p.trim()) || 
                  profile.adjectives.some(a => a.trim()) ||
                  profile.bio || 
                  profile.lookingFor;
  
  if (!hasData) {
    return clubs; // Return original order if profile is empty
  }
  
  // Score and sort clubs
  const scoredClubs = clubs.map(club => ({
    club,
    score: scoreClubMatch(club, profile)
  }));
  
  // Sort by score (descending), then by rating as tiebreaker
  scoredClubs.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return b.club.rating - a.club.rating;
  });
  
  return scoredClubs.map(item => item.club);
}

