import { useState, useEffect, useMemo } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "motion/react";
import { X, Heart, Star, MapPin, ArrowLeft, Users, Clock, Mail, Info, ChevronDown, Tag, Sparkles, Loader2, Instagram } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { clubs } from "../data/mockData";
import { Club } from "../types";
import { Link } from "react-router-dom";
import { sortClubsWithChatGPT } from "../utils/chatgptApi";

interface ProfileData {
  adjectives: string[];
  passions: string[];
  major: string;
  bio: string;
  lookingFor: string;
  genderPronouns?: string;
}

const loadingMessages = [
  "✨ Matching your interests...",
  "🎯 Finding perfect clubs for you...",
  "🔍 Analyzing your passions...",
  "💫 Discovering your ideal matches...",
  "🌟 Crafting personalized recommendations...",
  "🚀 Searching through amazing clubs...",
  "🎨 Connecting you with like-minded people...",
  "⚡ Almost there, just a moment...",
];

export function SwipePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedClubs, setSwipedClubs] = useState<{ club: Club; liked: boolean }[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [sortedClubs, setSortedClubs] = useState<Club[]>(clubs);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState(0);
  const [useChatGPT, setUseChatGPT] = useState(() => {
    // Always prioritize .env file key, then localStorage
    const envKey = import.meta.env.VITE_OPENAI_API_KEY;
    const localKey = localStorage.getItem('openai_api_key');
    // Use .env key if available, otherwise check localStorage
    return !!(envKey?.trim() || localKey?.trim());
  });

  // Listen for API key changes (prioritize .env file)
  useEffect(() => {
    const checkApiKey = () => {
      // Always prioritize .env file key first
      const envKey = import.meta.env.VITE_OPENAI_API_KEY;
      const localKey = localStorage.getItem('openai_api_key');
      // Use .env key if available, otherwise check localStorage
      setUseChatGPT(!!(envKey?.trim() || localKey?.trim()));
    };

    // Check on mount
    checkApiKey();

    // Listen for storage changes (when API key is added/removed in localStorage)
    // Note: .env changes require server restart, so we don't need to check for those
    window.addEventListener('storage', checkApiKey);
    
    // Also check periodically (for same-tab updates to localStorage)
    const interval = setInterval(checkApiKey, 2000);

    return () => {
      window.removeEventListener('storage', checkApiKey);
      clearInterval(interval);
    };
  }, []);
  const [likedCount, setLikedCount] = useState(() => {
    const saved = localStorage.getItem("likedClubs");
    return saved ? JSON.parse(saved).length : 0;
  });

  // Load profile from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("alignu_profile");
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing profile:", e);
      }
    }
  }, []);

  // Sort clubs based on profile match (with ChatGPT if enabled)
  useEffect(() => {
    if (!profile) {
      setSortedClubs(clubs);
      return;
    }

    const sortClubs = async () => {
      // Always use ChatGPT if API key is available
      if (useChatGPT) {
        setIsLoadingAI(true);
        setProgress(0);
        
        // Simulate progress and rotate messages
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) return prev; // Don't go to 100 until done
            return prev + Math.random() * 15;
          });
        }, 200);

        // Rotate loading messages
        const messageInterval = setInterval(() => {
          setLoadingMessage((prev) => (prev + 1) % loadingMessages.length);
        }, 1500);

        try {
          const sorted = await sortClubsWithChatGPT(clubs, profile);
          clearInterval(progressInterval);
          clearInterval(messageInterval);
          setProgress(100);
          setLoadingMessage(loadingMessages.length - 1); // Show final message
          setTimeout(() => {
            setSortedClubs(sorted);
            setIsLoadingAI(false);
            setProgress(0);
            setLoadingMessage(0);
          }, 500);
        } catch (error) {
          clearInterval(progressInterval);
          clearInterval(messageInterval);
          console.error("ChatGPT API error:", error);
          // Show error but still try to show clubs (unsorted)
          setProgress(100);
          setLoadingMessage(loadingMessages.length - 1);
          setTimeout(() => {
            // Show clubs in original order if API fails
            setSortedClubs(clubs);
            setIsLoadingAI(false);
            setProgress(0);
            setLoadingMessage(0);
          }, 500);
        }
      } else {
        // No API key available - show clubs in original order
        setSortedClubs(clubs);
      }
    };

    sortClubs();
  }, [profile, useChatGPT]);

  // Reset index when profile first loads (clubs get reordered)
  const [hasResetForProfile, setHasResetForProfile] = useState(false);
  useEffect(() => {
    if (profile && !hasResetForProfile) {
      setCurrentIndex(0);
      setHasResetForProfile(true);
    }
  }, [profile, hasResetForProfile]);

  // Always call hooks - use safe fallback for currentClub
  const currentClub = sortedClubs[currentIndex] || sortedClubs[0]; // fallback to prevent undefined
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  
  // Swipe indicator opacities - must be called unconditionally
  const passOpacity = useTransform(x, [-200, -50, 0], [1, 0.5, 0]);
  const likeOpacity = useTransform(x, [0, 50, 200], [0, 0.5, 1]);
  
  // Check if we're out of clubs
  const noMoreClubs = currentIndex >= sortedClubs.length;

  const handleSwipe = (direction: "left" | "right") => {
    if (noMoreClubs) return;

    const liked = direction === "right";
    setSwipedClubs([...swipedClubs, { club: currentClub, liked }]);
    
    // Save to localStorage if liked
    if (liked) {
      const saved = localStorage.getItem("likedClubs");
      const likedClubs = saved ? JSON.parse(saved) : [];
      const alreadyLiked = likedClubs.some((club: Club) => club.id === currentClub.id);
      
      if (!alreadyLiked) {
        likedClubs.push(currentClub);
        localStorage.setItem("likedClubs", JSON.stringify(likedClubs));
        setLikedCount(likedClubs.length);
      }
    }
    
    setCurrentIndex(currentIndex + 1);
    setIsExpanded(false);
  };

  const handleDragEnd = (_: any, info: any) => {
    if (Math.abs(info.offset.x) > 100) {
      handleSwipe(info.offset.x > 0 ? "right" : "left");
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Now check for the empty state after all hooks are defined
  if (noMoreClubs) {
    return (
      <motion.div 
        className="min-h-screen bg-white flex items-center justify-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center max-w-md w-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className="mb-8"
          >
            <div className="w-28 h-28 mx-auto rounded-full bg-blue-50 flex items-center justify-center">
              <Heart className="w-14 h-14 text-blue-600" />
            </div>
          </motion.div>

          <motion.h2 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            All Clubs Shown
          </motion.h2>
          <motion.p 
            className="text-gray-600 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            You've swiped through all available clubs. Check your matches or explore current events!
          </motion.p>
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {likedCount > 0 && (
              <Link to="/liked">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 shadow-lg">
                    <Heart className="w-5 h-5 mr-2 fill-white" />
                    View Your {likedCount} Match{likedCount !== 1 ? "es" : ""}
                  </Button>
                </motion.div>
              </Link>
            )}
            <Link to="/explore">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 h-14">
                  Explore Events
                </Button>
              </motion.div>
            </Link>
            <Link to="/">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-14">
                  Back to Home
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Loading screen overlay
  if (isLoadingAI) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="text-center space-y-6">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="flex justify-center"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-12 h-12 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Analyzing Your Profile
              </h2>
              <p className="text-gray-600">
                Our AI is finding the perfect clubs for you...
              </p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              <p className="text-sm text-gray-500">
                {Math.round(progress)}% complete
              </p>
            </motion.div>

            {/* Loading steps */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-2 pt-4 min-h-[24px]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={loadingMessage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-gray-600 font-medium"
                >
                  {loadingMessages[loadingMessage]}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <h2>Discover Clubs</h2>
        <div className="w-10" />
      </div>

      {/* Swipe Counter */}
      <div className="text-center mb-4">
        <p className="text-gray-600">
          {currentIndex + 1} / {sortedClubs.length}
        </p>
        {profile && useChatGPT && (
          <p className="text-xs text-gray-400 mt-1">
            ✨ AI-powered recommendations
          </p>
        )}
        {profile && !useChatGPT && (
          <p className="text-xs text-yellow-600 mt-1">
            ⚠️ AI recommendations unavailable - showing all clubs
          </p>
        )}
      </div>

      {/* Card Stack */}
      <div className="flex justify-center items-start px-6 py-8">
        <div className="relative w-full max-w-md" style={{ height: "600px" }}>
          {/* Background cards */}
          {sortedClubs.slice(currentIndex + 1, currentIndex + 3).map((club, idx) => (
            <div
              key={club.id}
              className="absolute inset-0 rounded-3xl shadow-xl"
              style={{
                transform: `scale(${1 - (idx + 1) * 0.05}) translateY(${(idx + 1) * 10}px)`,
                zIndex: 10 - idx,
                opacity: 0.5
              }}
            >
              <img 
                src={club.image} 
                alt={club.name}
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          ))}

          {/* Active card */}
          <motion.div
            className="absolute inset-0 rounded-3xl shadow-2xl cursor-grab active:cursor-grabbing"
            style={{
              x,
              rotate,
              opacity,
              zIndex: 20
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden">
              <img 
                src={currentClub.image} 
                alt={currentClub.name}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent cursor-pointer"
                onClick={toggleExpanded}
              />

              {/* Price Tag */}
              {currentClub.price && (
                <div className="absolute top-6 right-6 pointer-events-none">
                  <div className={`px-4 py-2 rounded-full backdrop-blur-md border shadow-sm ${
                    currentClub.price.toLowerCase() === 'free' 
                      ? 'bg-white/95 border-gray-200 text-blue-600' 
                      : 'bg-blue-600/95 border-blue-500 text-white'
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-4 h-4" />
                      <span className="font-medium">{currentClub.price}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Content */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-black/80 text-white overflow-hidden cursor-pointer"
                initial={false}
                animate={{ 
                  height: isExpanded ? "70%" : "auto",
                  paddingTop: isExpanded ? "2rem" : "0"
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                onClick={toggleExpanded}
              >
                <div className="p-6 overflow-y-auto h-full">
                  {/* Expand Indicator */}
                  <div className="flex justify-center mb-2">
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 text-white/60" />
                    </motion.div>
                  </div>

                  {/* Header Info */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h2 className="mb-1 text-white">{currentClub.name}</h2>
                      <div className="flex items-center gap-2 text-white/90 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{currentClub.location}</span>
                        <span className="mx-2">•</span>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{currentClub.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Short Description */}
                  <p className="text-white/90 text-sm mb-4">
                    {currentClub.description}
                  </p>
                  
                  {/* Vibe Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentClub.vibe.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      className="space-y-4 pt-4 border-t border-white/20"
                    >
                      {/* Additional Details */}
                      {currentClub.details && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-white">
                            <Info className="w-4 h-4" />
                            <span className="text-sm">About</span>
                          </div>
                          <p className="text-white/80 text-sm pl-6">
                            {currentClub.details}
                          </p>
                        </div>
                      )}

                      {/* Members */}
                      {currentClub.members && (
                        <div className="flex items-center gap-2 text-white/90 text-sm">
                          <Users className="w-4 h-4" />
                          <span>{currentClub.members} members</span>
                        </div>
                      )}

                      {/* Meeting Time */}
                      {currentClub.meetingTime && (
                        <div className="flex items-start gap-2 text-white/90 text-sm">
                          <Clock className="w-4 h-4 mt-0.5" />
                          <span>{currentClub.meetingTime}</span>
                        </div>
                      )}

                      {/* Contact */}
                      {currentClub.contact && (
                        <a
                          href={currentClub.contact.startsWith('http') ? currentClub.contact : `https://www.instagram.com/${currentClub.contact.replace('@', '').replace('https://www.instagram.com/', '').replace('https://instagram.com/', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-white/90 text-sm hover:text-white transition-colors"
                        >
                          <Instagram className="w-4 h-4" />
                          <span className="underline">Follow on Instagram</span>
                        </a>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Swipe indicators */}
              <motion.div
                className="absolute top-8 left-8 px-4 py-2 border-4 border-gray-400 rounded-2xl pointer-events-none backdrop-blur-sm bg-white/80"
                style={{
                  opacity: passOpacity,
                  rotate: -30
                }}
              >
                <span className="text-gray-700">PASS</span>
              </motion.div>
              
              <motion.div
                className="absolute top-8 right-8 px-4 py-2 border-4 border-blue-500 rounded-2xl pointer-events-none backdrop-blur-sm bg-white/80"
                style={{
                  opacity: likeOpacity,
                  rotate: 30
                }}
              >
                <span className="text-blue-600">LIKE</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center items-center gap-6 px-6 pb-12">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            size="icon"
            variant="outline"
            className="w-16 h-16 rounded-full border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all"
            onClick={() => handleSwipe("left")}
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 0 }}
            >
              <X className="w-8 h-8 text-gray-600" />
            </motion.div>
          </Button>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }}
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Button
            size="icon"
            className="w-20 h-20 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
            onClick={() => handleSwipe("right")}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-10 h-10" />
            </motion.div>
          </Button>
        </motion.div>
      </div>

      {/* Floating Liked Clubs Button */}
      {likedCount > 0 && (
        <Link to="/liked">
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button
              size="icon"
              className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-2xl relative"
            >
              <Heart className="w-8 h-8 fill-white" />
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {likedCount}
              </motion.div>
            </Button>
          </motion.div>
        </Link>
      )}
    </div>
  );
}