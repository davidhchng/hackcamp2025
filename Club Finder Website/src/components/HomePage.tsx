import { Link } from "react-router-dom";
import { Rocket, Calendar, Heart, User } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { events } from "../data/mockData";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

export function HomePage() {
  const upcomingEvents = events.slice(0, 3);
  const [likedCount, setLikedCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("likedClubs");
    if (saved) {
      const likedClubs = JSON.parse(saved);
      setLikedCount(likedClubs.length);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Profile Icon - Top Right */}
      <motion.div
        className="fixed top-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
      >
        <Link to="/profile">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Button
              size="icon"
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg w-12 h-12"
            >
              <User className="w-6 h-6" />
            </Button>
          </motion.div>
        </Link>
      </motion.div>

      {/* Hero Section */}
      <motion.div 
        className="px-6 py-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-blue-600">Align</span>U
        </motion.h1>
        <motion.p 
          className="text-gray-600 mb-8 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover your perfect club at UBC. Swipe through clubs and find your community.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/swipe">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all">
                <Rocket className="mr-2 w-5 h-5" />
                Start Discovering Clubs
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Upcoming Events Section */}
      <div className="px-6 py-8">
        <motion.div 
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h2>Upcoming Events</h2>
          </div>
          <Link to="/explore">
            <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                View All
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow border-gray-100 cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <motion.img 
                      src={event.image} 
                      alt={event.eventName}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div 
                      className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 500, delay: index * 0.1 + 0.3 }}
                    >
                      {event.price}
                    </motion.div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{event.clubName}</p>
                    <h3 className="mb-2">{event.eventName}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{event.date}</span>
                      <span>{event.time}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="px-6 py-12 bg-gray-50">
        <motion.h2 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          How It Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            { num: "1", title: "Create Your Profile", desc: "Get personalized club recommendations tailored to your interests", link: "/profile" },
            { num: "2", title: "Swipe Through Clubs", desc: "Browse through curated clubs that match your interests", link: "/swipe" },
            { num: "3", title: "Save Your Favorites", desc: "Swipe right on clubs you want to join", link: "/liked" },
            { num: "4", title: "Get Involved", desc: "Check out events and connect with your community", link: "/explore" }
          ].map((step, index) => (
            <Link key={step.num} to={step.link}>
              <motion.div 
                className="text-center cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 5, backgroundColor: "rgb(219 234 254)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="text-blue-600">{step.num}</span>
                </motion.div>
                <motion.h3 
                  className="mb-2"
                  whileHover={{ color: "rgb(37 99 235)" }}
                  transition={{ duration: 0.2 }}
                >
                  {step.title}
                </motion.h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>
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
              size="lg"
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-2xl px-6 relative"
            >
              <Heart className="w-5 h-5 mr-2 fill-white" />
              <span>My Matches</span>
              <motion.div
                className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg"
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