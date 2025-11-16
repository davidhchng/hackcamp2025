import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, MapPin, Star, Users, Trash2, Clock, Mail, Info, ChevronDown, Instagram } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Club } from "../types";
import { motion, AnimatePresence } from "motion/react";

export function LikedClubsPage() {
  const [likedClubs, setLikedClubs] = useState<Club[]>([]);
  const [expandedClubId, setExpandedClubId] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("likedClubs");
    if (saved) {
      setLikedClubs(JSON.parse(saved));
    }
  }, []);

  const removeLike = (clubId: number) => {
    const updated = likedClubs.filter(club => club.id !== clubId);
    setLikedClubs(updated);
    localStorage.setItem("likedClubs", JSON.stringify(updated));
  };

  const toggleExpand = (clubId: number) => {
    setExpandedClubId(expandedClubId === clubId ? null : clubId);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Link to="/">
          <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </motion.div>
        </Link>
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-blue-600 fill-blue-600" />
          <h2>Your Matches</h2>
        </div>
        <div className="w-10" />
      </motion.div>

      {/* Content */}
      <div className="px-6 py-8">
        {likedClubs.length === 0 ? (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            </motion.div>
            <h2 className="mb-2 text-gray-900">No Matches Yet</h2>
            <p className="text-gray-600 mb-8">
              Start swiping to find clubs you love!
            </p>
            <Link to="/swipe">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Start Swiping
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        ) : (
          <>
            <motion.p 
              className="text-gray-600 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {likedClubs.length} club{likedClubs.length !== 1 ? "s" : ""} matched
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              <AnimatePresence mode="popLayout">
                {likedClubs.map((club, index) => (
                  <motion.div
                    key={club.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Card className="overflow-hidden hover:shadow-xl transition-shadow border-gray-100 group">
                        <div className="relative h-64 overflow-hidden">
                          <motion.img 
                            src={club.image} 
                            alt={club.name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.4 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          
                          {/* Remove Button */}
                          <motion.button
                            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeLike(club.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 className="w-5 h-5 text-red-500" />
                          </motion.button>

                          {/* Price Badge */}
                          {club.price && (
                            <motion.div 
                              className="absolute top-3 left-3"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 300, delay: index * 0.05 + 0.2 }}
                            >
                              <Badge className={`${
                                club.price.toLowerCase() === 'free'
                                  ? 'bg-white text-blue-600'
                                  : 'bg-blue-600 text-white'
                              } border-0`}>
                                {club.price}
                              </Badge>
                            </motion.div>
                          )}

                          <motion.div 
                            className="absolute bottom-3 left-3 right-3"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.05 + 0.1 }}
                          >
                            <h3 className="text-white mb-1">{club.name}</h3>
                            <div className="flex items-center gap-3 text-white/90 text-sm">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{club.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{club.rating}</span>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                        
                        <CardContent className="p-4 space-y-3">
                          <p className="text-gray-700 text-sm line-clamp-2">
                            {club.description}
                          </p>
                          
                          {/* Vibe Tags */}
                          <div className="flex flex-wrap gap-1">
                            {club.vibe.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="bg-blue-50 text-blue-600 border-0 text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Additional Info */}
                          {club.members && (
                            <motion.div 
                              className="flex items-center gap-2 text-gray-600 text-sm"
                              whileHover={{ x: 3 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <Users className="w-4 h-4 text-blue-600" />
                              <span>{club.members} members</span>
                            </motion.div>
                          )}

                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button 
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                              onClick={() => toggleExpand(club.id)}
                            >
                              {expandedClubId === club.id ? (
                                <div className="flex items-center justify-center gap-2">
                                  <span>Hide Details</span>
                                  <motion.div
                                    animate={{ rotate: 180 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <ChevronDown className="w-4 h-4" />
                                  </motion.div>
                                </div>
                              ) : (
                                <div className="flex items-center justify-center gap-2">
                                  <span>View Details</span>
                                  <ChevronDown className="w-4 h-4" />
                                </div>
                              )}
                            </Button>
                          </motion.div>

                          {/* Expanded Details Section */}
                          <AnimatePresence>
                            {expandedClubId === club.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <motion.div 
                                  className="pt-4 mt-4 border-t border-gray-200 space-y-4"
                                  initial={{ y: -20 }}
                                  animate={{ y: 0 }}
                                  transition={{ delay: 0.1 }}
                                >
                                  {/* Full Description */}
                                  {club.details && (
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2 text-gray-900">
                                        <Info className="w-4 h-4 text-blue-600" />
                                        <span className="font-medium text-sm">About</span>
                                      </div>
                                      <p className="text-gray-600 text-sm leading-relaxed">
                                        {club.details}
                                      </p>
                                    </div>
                                  )}

                                  {/* Instagram Contact */}
                                  {club.contact && (
                                    <motion.a
                                      href={club.contact.startsWith('http') ? club.contact : `https://www.instagram.com/${club.contact.replace('@', '').replace('https://www.instagram.com/', '').replace('https://instagram.com/', '')}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all"
                                      whileHover={{ scale: 1.02, x: 3 }}
                                      whileTap={{ scale: 0.98 }}
                                      transition={{ type: "spring", stiffness: 400 }}
                                    >
                                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                        <Instagram className="w-5 h-5" />
                                      </div>
                                      <div className="flex-1 text-left">
                                        <div className="text-xs text-white/90">Follow on Instagram</div>
                                        <div className="font-medium">{club.contact.replace('https://www.instagram.com/', '').replace('https://instagram.com/', '').replace('/', '')}</div>
                                      </div>
                                    </motion.a>
                                  )}

                                  {/* All Vibe Tags */}
                                  {club.vibe.length > 3 && (
                                    <div className="space-y-2">
                                      <span className="font-medium text-sm text-gray-900">All Tags</span>
                                      <div className="flex flex-wrap gap-1">
                                        {club.vibe.map((tag) => (
                                          <Badge key={tag} variant="secondary" className="bg-blue-50 text-blue-600 border-0 text-xs">
                                            {tag}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Action Button */}
                                  <motion.div 
                                    whileHover={{ scale: 1.02 }} 
                                    whileTap={{ scale: 0.98 }}
                                    className="pt-2"
                                  >
                                    <Button className="w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                                      Contact Club
                                    </Button>
                                  </motion.div>
                                </motion.div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
}