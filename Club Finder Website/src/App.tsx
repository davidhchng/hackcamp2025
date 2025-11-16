import { HashRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { SwipePage } from "./components/SwipePage";
import { ExplorePage } from "./components/ExplorePage";
import { PreferencesPage } from "./components/PreferencesPage";
import { LikedClubsPage } from "./components/LikedClubsPage";
import { ProfilePage } from "./components/ProfilePage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/swipe" element={<SwipePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
        <Route path="/liked" element={<LikedClubsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </HashRouter>
  );
}