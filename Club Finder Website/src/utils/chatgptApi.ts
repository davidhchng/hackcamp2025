interface ProfileData {
  adjectives: string[];
  passions: string[];
  major: string;
  bio: string;
  lookingFor: string;
  genderPronouns?: string;
}

interface Club {
  id: string;
  name: string;
  description: string;
  type: string;
  vibe: string[];
  details?: string;
  price?: string;
}

/**
 * Get ChatGPT API key from environment variable
 * Priority: .env file (VITE_OPENAI_API_KEY) > localStorage
 * The .env file key is always used if available
 */
function getApiKey(): string | null {
  // First priority: Check environment variable from .env file (Vite uses VITE_ prefix)
  const envApiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (envApiKey && envApiKey.trim()) {
    // Always use the .env key if it exists
    return envApiKey.trim();
  }
  
  // Fallback: check localStorage (only if no .env key)
  const storedKey = localStorage.getItem('openai_api_key');
  if (storedKey && storedKey.trim()) {
    return storedKey.trim();
  }
  
  return null;
}

/**
 * Call ChatGPT API to get personalized club recommendations
 */
export async function getChatGPTRecommendations(
  profile: ProfileData,
  clubs: Club[]
): Promise<{ clubId: string; score: number; reasoning: string }[]> {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error('OpenAI API key not found. Please set VITE_OPENAI_API_KEY in your .env file or store it in localStorage.');
  }

  // Prepare profile summary
  const profileSummary = `
User Profile:
- Major: ${profile.major || 'Not specified'}
- Passions: ${profile.passions.filter(p => p.trim()).join(', ') || 'Not specified'}
- Adjectives: ${profile.adjectives.filter(a => a.trim()).join(', ') || 'Not specified'}
- Bio: ${profile.bio || 'Not specified'}
- Looking For: ${profile.lookingFor || 'Not specified'}
`;

  // Log profile data to console
  console.log('\n🤖 ===== CHATGPT API REQUEST =====');
  console.log('📋 User Profile:', {
    major: profile.major || 'Not specified',
    passions: profile.passions.filter(p => p.trim()),
    adjectives: profile.adjectives.filter(a => a.trim()),
    bio: profile.bio || 'Not specified',
    lookingFor: profile.lookingFor || 'Not specified'
  });
  console.log(`📊 Analyzing ${clubs.length} clubs...\n`);

  // Prepare clubs summary (send ALL clubs for analysis)
  const clubsSummary = clubs.map((club, index) => 
    `${index + 1}. Club: ${club.name}
Type: ${club.type}
Description: ${club.description}
Vibe: ${club.vibe.join(', ')}
Price: ${club.price || 'Free'}
Details: ${club.details || club.description}
---`
  ).join('\n\n');

  // Create a numbered list of all club names for validation
  const allClubNames = clubs.map((club, index) => `${index + 1}. ${club.name}`).join('\n');

  const prompt = `You are a helpful assistant that recommends student clubs to university students based on their profile.

${profileSummary}

Available Clubs (${clubs.length} total clubs - you MUST analyze ALL of them):
${clubsSummary}

CRITICAL REQUIREMENTS:
1. You MUST analyze and return ALL ${clubs.length} clubs listed above
2. Every single club must appear in your JSON response
3. Use the EXACT club name as shown above (case-sensitive)
4. Even if a club scores 0, you MUST include it in your response

Here is the complete list of all ${clubs.length} clubs you must analyze:
${allClubNames}

For EACH and EVERY club in the list above, provide:
1. A relevance score from 0-100 (where 100 is a perfect match, 0 means no match)
2. A brief reasoning (1-2 sentences) explaining why this club matches (or doesn't match) their profile

Return your response as a JSON array with this exact format:
[
  {
    "clubName": "EXACT Club Name from list above",
    "score": 85,
    "reasoning": "This club matches because..."
  },
  {
    "clubName": "EXACT Club Name from list above",
    "score": 25,
    "reasoning": "Lower match because..."
  }
]

IMPORTANT: Your JSON array MUST contain exactly ${clubs.length} items, one for each club. Do not skip any clubs. Sort by score (highest first).

VERIFICATION: Before submitting your response, count the items in your JSON array. It must equal ${clubs.length}. If it doesn't, you have made an error and must fix it.`;

  try {
    console.log('📤 Sending request to OpenAI API...');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using cheaper model, can change to 'gpt-4' for better results
        messages: [
          {
            role: 'system',
            content: `You are a helpful assistant that provides club recommendations to university students. CRITICAL: You MUST return a JSON array with exactly ${clubs.length} items, one for each club. Never skip any clubs, even if they score 0. Always use the exact club names as provided.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3, // Lower temperature for more consistent output
        max_tokens: 10000 // Further increased to ensure all clubs are included
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ OpenAI API Error:', error);
      throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No response from ChatGPT');
    }

    // Parse JSON response (handle markdown code blocks if present)
    let jsonContent = content.trim();
    if (jsonContent.startsWith('```')) {
      jsonContent = jsonContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    }

    const recommendations = JSON.parse(jsonContent);
    
    // Log ChatGPT's response
    console.log('\n✅ ===== CHATGPT API RESPONSE =====');
    console.log(`📊 Received ${recommendations.length} recommendations from ChatGPT`);
    console.log(`📋 Total clubs in system: ${clubs.length}`);
    
    // Log the actual club names ChatGPT returned (for debugging)
    console.log('\n📝 Clubs returned by ChatGPT:');
    recommendations.forEach((rec: any, index: number) => {
      console.log(`   ${index + 1}. "${rec.clubName || 'MISSING NAME'}"`);
    });
    console.log('');
    
    // Check if we got the expected number
    if (recommendations.length < clubs.length) {
      console.warn(`⚠️  WARNING: ChatGPT only returned ${recommendations.length} clubs, but we expected ${clubs.length}!`);
      console.warn(`   Missing ${clubs.length - recommendations.length} clubs.\n`);
    }
    
    // Helper function for fuzzy name matching (case-insensitive, trim whitespace)
    const normalizeName = (name: string): string => {
      return name.trim().toLowerCase().replace(/\s+/g, ' ');
    };
    
    // Create a map of all clubs with their scores (using normalized names for matching)
    const recommendationMap = new Map<string, { score: number; reasoning: string; originalName: string }>();
    recommendations.forEach((rec: any) => {
      const normalizedName = normalizeName(rec.clubName || '');
      recommendationMap.set(normalizedName, {
        score: rec.score || 0,
        reasoning: rec.reasoning || '',
        originalName: rec.clubName || ''
      });
    });
    
    // Map ALL clubs to recommendations (even if ChatGPT didn't return them)
    const mappedRecommendations = clubs.map((club) => {
      const normalizedClubName = normalizeName(club.name);
      const rec = recommendationMap.get(normalizedClubName);
      
      if (rec) {
        return {
          clubId: club.id,
          score: rec.score,
          reasoning: rec.reasoning
        };
      } else {
        // Try to find a fuzzy match (check if any recommendation name is similar)
        let foundMatch = false;
        let matchedRec: { score: number; reasoning: string } | null = null;
        
        for (const [normalizedRecName, recData] of recommendationMap.entries()) {
          // Check if names are very similar (one contains the other or vice versa)
          if (normalizedClubName.includes(normalizedRecName) || normalizedRecName.includes(normalizedClubName)) {
            // Additional check: if the difference is small (e.g., just punctuation or spacing)
            const similarity = calculateSimilarity(normalizedClubName, normalizedRecName);
            if (similarity > 0.8) {
              foundMatch = true;
              matchedRec = { score: recData.score, reasoning: recData.reasoning };
              console.warn(`⚠️  Fuzzy matched "${club.name}" to "${recData.originalName}" (similarity: ${(similarity * 100).toFixed(0)}%)`);
              break;
            }
          }
        }
        
        if (foundMatch && matchedRec) {
          return {
            clubId: club.id,
            score: matchedRec.score,
            reasoning: matchedRec.reasoning
          };
        } else {
          // Club not returned by ChatGPT - assign default low score
          console.warn(`⚠️  Club "${club.name}" not returned by ChatGPT - assigning default score`);
          return {
            clubId: club.id,
            score: 0,
            reasoning: 'Not analyzed by AI'
          };
        }
      }
    });
    
    // Helper function to calculate string similarity (simple Levenshtein-like)
    function calculateSimilarity(str1: string, str2: string): number {
      const longer = str1.length > str2.length ? str1 : str2;
      const shorter = str1.length > str2.length ? str2 : str1;
      if (longer.length === 0) return 1.0;
      const distance = levenshteinDistance(longer, shorter);
      return (longer.length - distance) / longer.length;
    }
    
    function levenshteinDistance(str1: string, str2: string): number {
      const matrix: number[][] = [];
      for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
      }
      for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
      }
      for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
          if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(
              matrix[i - 1][j - 1] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j] + 1
            );
          }
        }
      }
      return matrix[str2.length][str1.length];
    }
    
    // Log missing clubs (clubs that weren't matched, even with fuzzy matching)
    let missingClubs = mappedRecommendations
      .map((rec, index) => ({ rec, club: clubs[index] }))
      .filter(({ rec }) => rec.score === 0 && rec.reasoning === 'Not analyzed by AI')
      .map(({ club }) => club);
    
    // If we have missing clubs, make a follow-up request just for them
    if (missingClubs.length > 0) {
      console.log(`\n⚠️  ${missingClubs.length} clubs not returned by ChatGPT:`);
      missingClubs.forEach(club => console.log(`   - ${club.name}`));
      console.log('\n🔄 Making follow-up request for missing clubs...\n');
      
      try {
        // Create a focused prompt just for the missing clubs
        const missingClubsSummary = missingClubs.map((club, index) => 
          `${index + 1}. Club: ${club.name}
Type: ${club.type}
Description: ${club.description}
Vibe: ${club.vibe.join(', ')}
Price: ${club.price || 'Free'}
Details: ${club.details || club.description}
---`
        ).join('\n\n');
        
        const missingClubsNames = missingClubs.map((club, index) => `${index + 1}. ${club.name}`).join('\n');
        
        const followUpPrompt = `You are analyzing ${missingClubs.length} student clubs that were missed in a previous analysis.

${profileSummary}

Missing Clubs to Analyze (${missingClubs.length} clubs - you MUST analyze ALL of them):
${missingClubsSummary}

CRITICAL: You MUST return a JSON array with exactly ${missingClubs.length} items, one for each club listed above.

Here are the ${missingClubs.length} clubs you must analyze:
${missingClubsNames}

For EACH club, provide:
1. A relevance score from 0-100
2. A brief reasoning (1-2 sentences)

Return your response as a JSON array:
[
  {
    "clubName": "EXACT Club Name from list above",
    "score": 85,
    "reasoning": "This club matches because..."
  }
]

Your JSON array MUST contain exactly ${missingClubs.length} items.`;

        const followUpResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `You are a helpful assistant. CRITICAL: You MUST return a JSON array with exactly ${missingClubs.length} items. Never skip any clubs.`
              },
              {
                role: 'user',
                content: followUpPrompt
              }
            ],
            temperature: 0.3,
            max_tokens: 4000
          })
        });

        if (followUpResponse.ok) {
          const followUpData = await followUpResponse.json();
          const followUpContent = followUpData.choices[0]?.message?.content;
          
          if (followUpContent) {
            let followUpJson = followUpContent.trim();
            if (followUpJson.startsWith('```')) {
              followUpJson = followUpJson.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            }
            
            const followUpRecommendations = JSON.parse(followUpJson);
            console.log(`✅ Follow-up request returned ${followUpRecommendations.length} recommendations\n`);
            
            // Update the mapped recommendations with the follow-up results (with fuzzy matching)
            followUpRecommendations.forEach((rec: any) => {
              const normalizedRecName = normalizeName(rec.clubName || '');
              
              // First try exact match
              let clubIndex = clubs.findIndex(c => normalizeName(c.name) === normalizedRecName);
              
              // If no exact match, try fuzzy matching
              if (clubIndex === -1) {
                for (let i = 0; i < clubs.length; i++) {
                  const normalizedClubName = normalizeName(clubs[i].name);
                  if (normalizedClubName.includes(normalizedRecName) || normalizedRecName.includes(normalizedClubName)) {
                    const similarity = calculateSimilarity(normalizedClubName, normalizedRecName);
                    if (similarity > 0.8) {
                      clubIndex = i;
                      console.log(`   🔍 Fuzzy matched "${rec.clubName}" to "${clubs[i].name}" (similarity: ${(similarity * 100).toFixed(0)}%)`);
                      break;
                    }
                  }
                }
              }
              
              if (clubIndex !== -1) {
                const existingRec = mappedRecommendations[clubIndex];
                if (existingRec.score === 0 && existingRec.reasoning === 'Not analyzed by AI') {
                  mappedRecommendations[clubIndex] = {
                    clubId: clubs[clubIndex].id,
                    score: rec.score || 0,
                    reasoning: rec.reasoning || ''
                  };
                  console.log(`   ✅ Updated "${clubs[clubIndex].name}" with score ${rec.score || 0}`);
                }
              } else {
                console.warn(`   ⚠️  Could not match follow-up recommendation "${rec.clubName}" to any club`);
              }
            });
            
            // Recalculate missing clubs
            missingClubs = mappedRecommendations
              .map((rec, index) => ({ rec, club: clubs[index] }))
              .filter(({ rec }) => rec.score === 0 && rec.reasoning === 'Not analyzed by AI')
              .map(({ club }) => club);
          }
        }
      } catch (followUpError) {
        console.warn('⚠️  Follow-up request failed:', followUpError);
      }
      
      if (missingClubs.length > 0) {
        console.log(`\n⚠️  ${missingClubs.length} clubs still not analyzed after follow-up request:`);
        missingClubs.forEach(club => console.log(`   - ${club.name}`));
        console.log('');
      } else {
        console.log(`\n✅ All clubs were successfully analyzed after follow-up request!\n`);
      }
    } else {
      console.log(`\n✅ All ${clubs.length} clubs were successfully analyzed by ChatGPT!\n`);
    }

    // Log detailed ratings for ALL clubs
    console.log('🏆 CLUB RATINGS & REASONING (ALL CLUBS):');
    console.log('━'.repeat(80));
    mappedRecommendations
      .sort((a, b) => b.score - a.score)
      .forEach((rec: any, index: number) => {
        const club = clubs.find(c => c.id === rec.clubId);
        console.log(`\n${index + 1}. ${club?.name || 'Unknown Club'}`);
        console.log(`   ⭐ Score: ${rec.score}/100`);
        console.log(`   💭 Reasoning: ${rec.reasoning}`);
      });
    console.log('\n' + '━'.repeat(80));
    console.log(`\n✨ Top 5 Recommendations:`);
    mappedRecommendations
      .slice(0, 5)
      .forEach((rec: any, index: number) => {
        const club = clubs.find(c => c.id === rec.clubId);
        console.log(`   ${index + 1}. ${club?.name} (Score: ${rec.score}/100)`);
      });
    console.log(`\n📊 Total clubs analyzed: ${mappedRecommendations.length}`);
    console.log('\n🤖 ===== END CHATGPT RESPONSE =====\n');

    return mappedRecommendations;

  } catch (error) {
    console.error('\n❌ ===== CHATGPT API ERROR =====');
    console.error('Error details:', error);
    console.error('━'.repeat(80) + '\n');
    throw error;
  }
}

/**
 * Sort clubs using ChatGPT recommendations
 * This is the ONLY sorting method - no fallback to local matching
 */
export async function sortClubsWithChatGPT(
  clubs: Club[],
  profile: ProfileData
): Promise<Club[]> {
  const recommendations = await getChatGPTRecommendations(profile, clubs);
  
  // Create a map of clubId to score
  const scoreMap = new Map<string, number>();
  recommendations.forEach(rec => {
    scoreMap.set(rec.clubId, rec.score);
  });

  // Sort clubs by ChatGPT scores
  const sortedClubs = [...clubs].sort((a, b) => {
    const scoreA = scoreMap.get(a.id) || 0;
    const scoreB = scoreMap.get(b.id) || 0;
    
    if (scoreB !== scoreA) {
      return scoreB - scoreA; // Higher score first
    }
    
    // Tiebreaker: use rating if available
    return (b as any).rating - (a as any).rating;
  });

  // Log final sorted order for ALL clubs
  console.log('\n📋 ===== FINAL SORTED CLUB ORDER (ALL CLUBS) =====');
  sortedClubs.forEach((club, index) => {
    const score = scoreMap.get(club.id) || 0;
    const scoreDisplay = score > 0 ? `${score}` : '0 (not analyzed)';
    console.log(`${index + 1}. ${club.name} - ChatGPT Score: ${scoreDisplay}/100`);
  });
  console.log(`\n📊 Total clubs sorted: ${sortedClubs.length}`);
  console.log('━'.repeat(80) + '\n');

  return sortedClubs;
}

