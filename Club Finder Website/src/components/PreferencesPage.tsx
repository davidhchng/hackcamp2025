import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { interests } from "../data/mockData";
import { motion, AnimatePresence } from "framer-motion";

export function PreferencesPage() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between px-6 py-4 border-b border-gray-100"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Link to="/">
          <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Button>
          </motion.div>
        </Link>
        <h2 className="text-gray-900">Interests</h2>
        <Link to="/">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              Skip
            </Button>
          </motion.div>
        </Link>
      </motion.div>

      {/* Content */}
      <div className="px-6 py-8">
        <motion.h1
          className="text-gray-900 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Interests
        </motion.h1>
        <motion.p
          className="text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Let everyone know what you're passionate about, by adding it to your profile.
        </motion.p>

        {/* Interest Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {interests.map((interest, index) => {
            const isSelected = selectedInterests.includes(interest);
            return (
              <motion.button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-full border transition-all ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.03, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {interest}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bottom Button */}
      <AnimatePresence>
        <motion.div
          className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <motion.div
            whileHover={{ scale: selectedInterests.length > 0 ? 1.02 : 1 }}
            whileTap={{ scale: selectedInterests.length > 0 ? 0.98 : 1 }}
          >
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg disabled:bg-gray-300 disabled:text-gray-500"
              disabled={selectedInterests.length === 0}
            >
              Continue ({selectedInterests.length}/5)
            </Button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}