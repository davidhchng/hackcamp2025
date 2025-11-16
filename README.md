# AlignU - UBC Club Finder



<div align="center">
  <h3>Discover your perfect club at UBC. Swipe through clubs and find your community.</h3>
  <p>Built with React, TypeScript, and AI-powered recommendations</p>
</div>

---

## Features

- **Personalized Recommendations** - Get club suggestions tailored to your interests and profile
- **Swipe Interface** - Browse clubs with an intuitive swipe experience
- **Event Discovery** - Find and filter UBC events by category (UBC Events, Athletics, Club Events, Partying Events)
- **Save Favorites** - Like clubs and keep track of your matches
- **Profile Creation** - Build your profile with interests, major, bio, and more
- **Direct Links** - Connect with clubs via Instagram and RSVP to events

## Quick Start

### Prerequisites

- Node.js 18+ and npm

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

## Project Structure

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
│   │   │   ├── club_info.json    # Club database
│   │   │   ├── events_info.json  # Events database
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

## Personalized Recommendations

The app provides intelligent club recommendations based on your profile. Simply create your profile with your interests, major, bio, and what you're looking for, and you'll see clubs sorted by how well they match your preferences. The more details you add to your profile, the better the recommendations get.

<img width="942" height="518" alt="image" src="https://github.com/user-attachments/assets/17957601-0b5d-4088-83a4-5f3bee4e18d4" />


## Available Scripts

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

## Deployment

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

## Data

### Clubs
- Clubs across various categories including:
  - Sports (Squash, Disc Golf, etc.)
  - STEM (Statistics, AI, Data Science, etc.)
  - Culture (Chinese, Japanese, Korean, etc.)
  - Business (BizTech, Finance, etc.)
  - Academic (Research, URO, etc.)

The club database comes from and is updated with the UBC AMS Clubs Directory: https://amsclubs.ca/all-clubs/

### Events
- Events including:
  - UBC Athletics games
  - Club events (datathons, competitions, etc.)
  - Partying events (Koerner's House Party, Rush Hour, etc.)
  - UBC campus events

The events database comes from and is updated with the UBC AMS Clubs Directory, as well: https://amsclubs.ca/all-events/

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + Custom components
- **Animations:** Framer Motion
- **Routing:** React Router (HashRouter for GitHub Pages)
- **State Management:** React Hooks + localStorage

## Key Features Explained

### Swipe Interface
- Swipe right (or click the heart button) to like a club
- Swipe left (or click the X button) to pass
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
  - Adjectives (words that describe you)
  - Passions (your interests)
  - What you're looking for
  - Gender pronouns (optional)
- Save and reset profile functionality
- Profile data used for personalized recommendations





## License

This project is part of HackCamp 2025.

## Acknowledgments

- UBC clubs and organizations for providing information
- All contributors and testers



---

<div align="center">
  <p>Made for UBC students</p>
  <p>Find your community. Discover your passion. Join AlignU.</p>
</div>
