# AlignU - UBC Club Finder

<div align="center">
  <h3>Discover your perfect club at UBC. Swipe through clubs and find your community.</h3>
  <p>Built with React, TypeScript, and AI-powered recommendations</p>
</div>

---

## 🌟 Features

- **🎯 AI-Powered Recommendations** - Get personalized club suggestions based on your profile using ChatGPT
- **💫 Swipe Interface** - Tinder-style swiping experience to discover clubs
- **📅 Event Discovery** - Browse and filter UBC events by category (UBC Events, Athletics, Club Events, Partying Events)
- **❤️ Save Favorites** - Like clubs and view your matches
- **👤 Profile Creation** - Build your profile with interests, major, bio, and more
- **🔗 Direct Links** - Connect with clubs via Instagram and RSVP to events

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- (Optional) OpenAI API key for AI recommendations

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/davidhchng/hackcamp2025.git
   cd hackcamp2025
   ```

2. **Install dependencies**
   ```bash
   cd "Club Finder Website"
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - The app will automatically open at `http://localhost:3000`
   - Or manually navigate to the URL shown in your terminal

## 🎨 Project Structure

```
hackcamp2025/
├── Club Finder Website/          # Main application
│   ├── src/
│   │   ├── components/           # React components
│   │   │   ├── HomePage.tsx      # Landing page
│   │   │   ├── SwipePage.tsx     # Club discovery with swipe
│   │   │   ├── ExplorePage.tsx   # Events browser
│   │   │   ├── ProfilePage.tsx   # User profile creation
│   │   │   ├── LikedClubsPage.tsx # Saved clubs
│   │   │   └── ui/               # Reusable UI components
│   │   ├── data/                 # Data files
│   │   │   ├── club_info.json    # Club database (56 clubs)
│   │   │   ├── events_info.json  # Events database (87 events)
│   │   │   └── mockData.ts      # Data processing utilities
│   │   ├── utils/                # Utility functions
│   │   │   ├── chatgptApi.ts    # AI recommendation engine
│   │   │   └── clubMatcher.ts   # Local matching algorithm
│   │   └── types/               # TypeScript type definitions
│   ├── public/
│   │   └── images/              # Club and event images
│   └── package.json
├── club_info.json               # Source club data
├── events_info.json             # Source event data
└── README.md                    # This file
```

## 🤖 AI-Powered Recommendations (Optional)

The app uses ChatGPT to provide intelligent club recommendations based on your profile.

### Setup

**Option 1: Environment Variable (Recommended)**
1. Create a `.env` file in the `Club Finder Website` directory:
   ```bash
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```
2. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
3. Restart the dev server

**Option 2: In-App (Development Only)**
- The API key can be stored in browser localStorage
- Note: This is for development only and not recommended for production

### How It Works

1. Create your profile with interests, major, bio, and what you're looking for
2. The AI analyzes your profile against all 56 clubs
3. Clubs are sorted by relevance score (0-100)
4. You see the most relevant clubs first in the swipe interface

**Note:** Without an API key, clubs are shown in their original order.

## 📦 Available Scripts

```bash
# Start development server
npm run dev
# or
npm start

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### GitHub Pages

The project is configured for automatic deployment to GitHub Pages.

1. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Under "Source", select **GitHub Actions**
   - Save

2. **Deploy automatically:**
   - Every push to `main` triggers automatic deployment
   - Your site will be live at: `https://davidhchng.github.io/hackcamp2025/`

3. **Manual deployment:**
   ```bash
   git push origin main
   ```
   - Check the Actions tab for deployment status

See `DEPLOY.md` for detailed deployment instructions.

## 📊 Data

### Clubs
- **56 clubs** across various categories:
  - Sports (Squash, Disc Golf, etc.)
  - STEM (Statistics, AI, Data Science, etc.)
  - Culture (Chinese, Japanese, Korean, etc.)
  - Business (BizTech, Finance, etc.)
  - Academic (Research, URO, etc.)

### Events
- **87 events** including:
  - UBC Athletics games (74 events)
  - Club events (datathons, competitions, etc.)
  - Partying events (Koerner's House Party, Rush Hour, etc.)
  - UBC campus events

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + Custom components
- **Animations:** Framer Motion
- **Routing:** React Router (HashRouter for GitHub Pages)
- **AI Integration:** OpenAI GPT-4o-mini API
- **State Management:** React Hooks + localStorage

## 🎯 Key Features Explained

### Swipe Interface
- Swipe right (or click ❤️) to like a club
- Swipe left (or click ✖️) to pass
- View detailed information by clicking on the card
- Expandable card view with full club details

### Event Filtering
- Filter by category: All Events, UBC Events, UBC Athletics, Club Events, Partying Events
- Click RSVP buttons to register (opens in new tab)
- View event details, dates, times, and pricing

### Profile System
- Create a comprehensive profile with:
  - Bio and personal description
  - Major selection
  - Adjectives (5 words that describe you)
  - Passions (5 interests)
  - What you're looking for
  - Gender pronouns (optional)
- Save and reset profile functionality
- Profile data used for AI recommendations

## 📝 Adding New Clubs or Events

### Adding Clubs
1. Edit `club_info.json` in the root directory
2. Add a new club object with:
   ```json
   {
     "name": "Club Name",
     "description": "Club description...",
     "price": 0,
     "contact": "https://www.instagram.com/clubhandle/",
     "image": "club_image.png"
   }
   ```
3. Add the club image to `Club Finder Website/public/images/`
4. Copy `club_info.json` to `Club Finder Website/src/data/club_info.json`

### Adding Events
1. Edit `events_info.json` in the root directory
2. Add a new event object with:
   ```json
   {
     "clubName": "Event Organizer",
     "eventName": "Event Name",
     "date": "Nov 20, 2025",
     "time": "7:00 PM",
     "image": "event_image.jpg",
     "description": "Event description...",
     "price": "Free",
     "tag": "club events",
     "freeWithStudentID": true,
     "rsvpLink": "https://..."
   }
   ```
3. Copy `events_info.json` to `Club Finder Website/src/data/events_info.json`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of HackCamp 2025.

## 🙏 Acknowledgments

- UBC clubs and organizations for providing information
- OpenAI for the ChatGPT API
- All contributors and testers

## 📞 Support

For issues, questions, or contributions, please open an issue on GitHub.

---

<div align="center">
  <p>Made with ❤️ for UBC students</p>
  <p>Find your community. Discover your passion. Join AlignU.</p>
</div>
