import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { events } from "../data/mockData";
import { motion, AnimatePresence } from "framer-motion";

export function ExplorePage() {
  const [filter, setFilter] = useState<string>("all");

  const uniqueOrganizers = Array.from(new Set(events.map(e => e.clubName)));

  const filteredEvents = filter === "all" 
    ? events 
    : events.filter(e => {
        // Map filter button labels to tag values
        const tagMap: { [key: string]: string } = {
          "UBC Events": "UBC events",
          "UBC Athletics": "UBC athletics",
          "Partying Events": "partying events",
          "Club Events": "club events"
        };
        return e.tag === tagMap[filter] || e.tag === filter;
      });

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
        <h2>UBC Events</h2>
        <div className="w-10" />
      </motion.div>

      {/* Filter Pills */}
      <motion.div 
        className="px-6 py-4 overflow-x-auto bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-blue-600 hover:bg-blue-700" : "border-gray-300 hover:bg-gray-100"}
            >
              All Events
            </Button>
          </motion.div>
          {["UBC Events", "UBC Athletics", "Partying Events", "Club Events"].map((category, index) => (
            <motion.div 
              key={category}
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <Button
                variant={filter === category ? "default" : "outline"}
                onClick={() => setFilter(category)}
                className={filter === category ? "bg-blue-600 hover:bg-blue-700" : "border-gray-300 hover:bg-gray-100"}
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Events Grid */}
      <div className="px-6 py-4">
        <motion.p 
          className="text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={filteredEvents.length}
        >
          {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""} found
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow border-gray-100 cursor-pointer">
                    <div className="relative h-64 overflow-hidden group">
                      <motion.img 
                        src={event.image} 
                        alt={event.eventName}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <motion.div 
                        className="absolute top-3 right-3"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300, delay: index * 0.05 + 0.2 }}
                      >
                        <Badge className="bg-blue-600 text-white border-0">
                          {event.price}
                        </Badge>
                      </motion.div>
                      <motion.div 
                        className="absolute bottom-3 left-3 right-3"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                      >
                        <p className="text-white/90 text-sm mb-1">{event.clubName}</p>
                        <h3 className="text-white">{event.eventName}</h3>
                      </motion.div>
                    </div>
                    
                    <CardContent className="p-4 space-y-3">
                      <p className="text-gray-700">
                        {event.description}
                      </p>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <motion.div 
                          className="flex items-center gap-2"
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span>{event.date}</span>
                        </motion.div>
                        <motion.div 
                          className="flex items-center gap-2"
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span>{event.time}</span>
                        </motion.div>
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        {event.rsvpLink ? (
                          <a href={event.rsvpLink} target="_blank" rel="noopener noreferrer">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                              RSVP
                            </Button>
                          </a>
                        ) : (
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled>
                            RSVP
                          </Button>
                        )}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}