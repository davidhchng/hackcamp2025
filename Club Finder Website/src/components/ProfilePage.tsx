import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Plus, X, Save, Sparkles, Check, ChevronsUpDown, Target, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { motion, AnimatePresence } from "motion/react";

interface ProfileData {
  adjectives: string[];
  passions: string[];
  major: string;
  bio: string;
  lookingFor: string;
  genderPronouns?: string;
}

const majors = [
  "Applied Animal Biology",
  "Biochemistry",
  "Biology",
  "Biomedical Engineering",
  "Biophysics",
  "Biotechnology",
  "Cellular, Anatomical, and Physiological Sciences",
  "Cognitive Systems",
  "Combined Major in Science",
  "Combined Majors in Statistics",
  "Dental Hygiene",
  "Dentistry",
  "Dietetics",
  "Food Science",
  "Food and Nutritional Sciences",
  "Food, Nutrition, and Health",
  "Integrated Sciences",
  "Interdisciplinary Studies",
  "Kinesiology: Multidisciplinary Science",
  "Kinesiology: Neuromechanical and Physiological Sciences",
  "Kinesiology: Social and Behavioural Sciences",
  "Medical Laboratory Science",
  "Medicine",
  "Microbiology and Immunology",
  "Midwifery",
  "Neuroscience",
  "Nursing",
  "Nutritional Sciences",
  "Pharmaceutical Sciences",
  "Pharmacology",
  "Pharmacy",
  "Psychology",
  "Speech Sciences",
  "Urban Forestry",
  "Vantage One: Science",
  "Archaeology",
  "Architecture",
  "Architecture, Landscape Architecture, and Urbanism",
  "Atmospheric Science",
  "Bioeconomy Sciences and Technology",
  "Business and Markets",
  "Conservation",
  "Data Analytics",
  "Earth and Ocean Sciences",
  "Environmental Engineering",
  "Environmental Engineering (joint UNBC/UBC)",
  "Environmental Sciences",
  "Forest Management",
  "Forest Operations",
  "Forest Sciences",
  "Geographical Sciences",
  "Geography: Environment and Sustainability",
  "Geography: Human Geography",
  "Geology",
  "Geophysics",
  "Global Resource Systems",
  "Indigenous Land Stewardship",
  "Oceanography",
  "Sustainable Agriculture and Environment",
  "Urban Studies",
  "Wood Products",
  "Chemical Engineering",
  "Chemical and Biological Engineering",
  "Civil Engineering",
  "Computer Engineering",
  "Computer Science",
  "Electrical Engineering",
  "Engineering Physics",
  "Geological Engineering",
  "Integrated Computer Science",
  "Integrated Engineering",
  "Manufacturing Engineering",
  "Materials Engineering",
  "Mechanical Engineering",
  "Mining Engineering",
  "Vantage One: Applied Science (Engineering)",
  "Ancient Mediterranean and Near Eastern Studies",
  "Anthropology",
  "Asian Area Studies",
  "Asian Language and Culture",
  "Canadian Studies",
  "English",
  "First Nations and Endangered Languages",
  "First Nations and Indigenous Studies",
  "French",
  "Gender, Race, Sexuality, and Social Justice",
  "Latin American Studies",
  "Modern European Studies",
  "Museum Studies",
  "Philosophy",
  "Religion",
  "Romance Studies",
  "Social Work",
  "Sociology",
  "Spanish",
  "United States Studies",
  "Vantage One: Arts",
  "Art History",
  "Cinema Studies",
  "Creative Writing",
  "Film Production",
  "Journalism",
  "Media Studies",
  "Music",
  "Music: Advanced Performance",
  "Music: Composition",
  "Music: General Studies",
  "Music: Scholarship",
  "Astronomy",
  "Chemistry",
  "Mathematical Sciences",
  "Mathematics",
  "History",
  "International Relations",
  "Law",
  "Medieval Studies",
  "Political Science",
  "Bachelor + Master of Management Dual Degree",
  "Business and Computer Science",
  "Commerce",
  "Economics",
  "International Economics",
  "German",
  "Linguistics",
  "Education: Elementary and Middle Years",
  "Education: Indigenous Teacher Education Program (NITEP)",
  "Education: International Baccalaureate",
  "Education: Secondary",
  "Education: West Kootenay Teacher Education Program (WKTEP)",
].sort();

export function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    adjectives: ["", "", "", "", ""],
    passions: ["", "", "", "", ""],
    major: "",
    bio: "",
    lookingFor: "",
    genderPronouns: "",
  });
  const [isSaved, setIsSaved] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("alignu_profile");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  const handleAdjectiveChange = (index: number, value: string) => {
    const newAdjectives = [...profile.adjectives];
    newAdjectives[index] = value;
    setProfile({ ...profile, adjectives: newAdjectives });
  };

  const handlePassionChange = (index: number, value: string) => {
    const newPassions = [...profile.passions];
    newPassions[index] = value;
    setProfile({ ...profile, passions: newPassions });
  };

  const handleSave = () => {
    localStorage.setItem("alignu_profile", JSON.stringify(profile));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your profile? This will clear all your saved information.")) {
      localStorage.removeItem("alignu_profile");
      setProfile({
        adjectives: ["", "", "", "", ""],
        passions: ["", "", "", "", ""],
        major: "",
        bio: "",
        lookingFor: "",
        genderPronouns: "",
      });
      setIsSaved(false);
    }
  };

  const clearAdjective = (index: number) => {
    handleAdjectiveChange(index, "");
  };

  const clearPassion = (index: number) => {
    handlePassionChange(index, "");
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
          <User className="w-6 h-6 text-blue-600" />
          <h2>Your Profile</h2>
        </div>
        <div className="w-10" />
      </motion.div>

      {/* Content */}
      <div className="px-6 py-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header Text */}
          <div className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            <h1 className="text-gray-900">Create Your Profile</h1>
            <p className="text-gray-600">
              Tell us about yourself to get better club matches
            </p>
          </div>

          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-gray-100 shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <h3 className="text-gray-900">About You</h3>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-gray-700">
                    Describe yourself in one sentence
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="e.g., A Chinese student from Vancouver who enjoys cooking and exploring new cultures"
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    className="min-h-[100px] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Gender Pronouns Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="border-gray-100 shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <h3 className="text-gray-900">Gender Pronouns</h3>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="genderPronouns" className="text-gray-700">
                    Pronouns <span className="text-gray-400 text-sm">(optional)</span>
                  </Label>
                  <Input
                    id="genderPronouns"
                    placeholder="e.g., she/her, he/him, they/them, or any pronouns"
                    value={profile.genderPronouns || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, genderPronouns: e.target.value })
                    }
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Major Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-gray-100 shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h3 className="text-gray-900">Your Major</h3>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="major" className="text-gray-700">
                    What are you studying?
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between border-gray-200 hover:border-blue-500 hover:bg-white"
                      >
                        {profile.major || "Select your major..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search majors..." />
                        <CommandList>
                          <CommandEmpty>No major found.</CommandEmpty>
                          <CommandGroup>
                            {majors.map((major) => (
                              <CommandItem
                                key={major}
                                value={major}
                                onSelect={(currentValue) => {
                                  setProfile({ ...profile, major: currentValue });
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${
                                    profile.major === major ? "opacity-100" : "opacity-0"
                                  }`}
                                />
                                {major}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Adjectives Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-gray-100 shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h3 className="text-gray-900">5 Adjectives That Describe You</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {profile.adjectives.map((adjective, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="relative"
                    >
                      <Input
                        placeholder={`Adjective ${index + 1} (e.g., Creative, Outgoing)`}
                        value={adjective}
                        onChange={(e) =>
                          handleAdjectiveChange(index, e.target.value)
                        }
                        className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                      />
                      {adjective && (
                        <motion.button
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => clearAdjective(index)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </div>
                {/* Display as badges */}
                {profile.adjectives.some((a) => a.trim()) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex flex-wrap gap-2 pt-2 border-t border-gray-100"
                  >
                    {profile.adjectives
                      .filter((a) => a.trim())
                      .map((adjective, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Badge className="bg-blue-100 text-blue-700 border-0">
                            {adjective}
                          </Badge>
                        </motion.div>
                      ))}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Passions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-gray-100 shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h3 className="text-gray-900">5 Things You're Passionate About</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {profile.passions.map((passion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="relative"
                    >
                      <Input
                        placeholder={`Passion ${index + 1} (e.g., Photography, Hiking)`}
                        value={passion}
                        onChange={(e) =>
                          handlePassionChange(index, e.target.value)
                        }
                        className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                      />
                      {passion && (
                        <motion.button
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => clearPassion(index)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </div>
                {/* Display as badges */}
                {profile.passions.some((p) => p.trim()) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex flex-wrap gap-2 pt-2 border-t border-gray-100"
                  >
                    {profile.passions
                      .filter((p) => p.trim())
                      .map((passion, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Badge className="bg-purple-600 text-white border-0">
                            {passion}
                          </Badge>
                        </motion.div>
                      ))}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* What Are You Looking For Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Card className="border-gray-100 shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <h3 className="text-gray-900">What Are You Looking For?</h3>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lookingFor" className="text-gray-700">
                    What kind of club experience are you hoping to find?
                  </Label>
                  <Textarea
                    id="lookingFor"
                    placeholder="e.g., I want to meet people with similar interests, develop new skills, give back to the community, or find career opportunities"
                    value={profile.lookingFor}
                    onChange={(e) =>
                      setProfile({ ...profile, lookingFor: e.target.value })
                    }
                    className="min-h-[100px] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Save and Reset Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="sticky bottom-6 space-y-3"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleSave}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg shadow-lg"
              >
                {isSaved ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      ✓
                    </motion.div>
                    <span>Saved!</span>
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    <span>Save Profile</span>
                  </div>
                )}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full border-red-300 text-red-600 hover:bg-red-50 h-12"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                <span>Reset Profile</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Preview Section */}
          {(profile.bio || profile.major || profile.adjectives.some(a => a.trim()) || profile.passions.some(p => p.trim()) || profile.genderPronouns) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="border-gray-100 shadow-md bg-gradient-to-br from-blue-50 to-white">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <h3 className="text-gray-900">Profile Preview</h3>
                  </div>
                  
                  {profile.bio && (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Bio</p>
                      <p className="text-gray-900">{profile.bio}</p>
                    </div>
                  )}

                  {profile.genderPronouns && (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Pronouns</p>
                      <p className="text-gray-900">{profile.genderPronouns}</p>
                    </div>
                  )}

                  {profile.major && (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Major</p>
                      <p className="text-gray-900">{profile.major}</p>
                    </div>
                  )}

                  {profile.adjectives.some(a => a.trim()) && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Your Adjectives</p>
                      <div className="flex flex-wrap gap-2">
                        {profile.adjectives.filter(a => a.trim()).map((adjective, index) => (
                          <Badge key={index} className="bg-blue-600 text-white border-0">
                            {adjective}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {profile.passions.some(p => p.trim()) && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Your Passions</p>
                      <div className="flex flex-wrap gap-2">
                        {profile.passions.filter(p => p.trim()).map((passion, index) => (
                          <Badge key={index} className="bg-purple-600 text-white border-0">
                            {passion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {profile.lookingFor && (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Looking For</p>
                      <p className="text-gray-900">{profile.lookingFor}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}