# The Odin Project: Where is Waldo (Frontend)

This is a solution to the [Where is Waldo Project](https://www.theodinproject.com/lessons/nodejs-where-s-waldo-a-photo-tagging-app) as part of The Odin Project curriculum.



## Table of contents


- [The Odin Project: Where is Waldo (Frontend)](#the-odin-project-where-is-waldo-frontend)
  - [Table of contents](#table-of-contents)
  - [🎯 Overview](#-overview)
  - [How To Play](#how-to-play)
  - [🚀 Key Features](#-key-features)
    - [1. Advanced Touch \& Desktop Navigation:](#1-advanced-touch--desktop-navigation)
    - [2. Optimized Game Loop \& State Management:](#2-optimized-game-loop--state-management)
    - [3. Character Tracking:](#3-character-tracking)
  - [🖼️ Screenshots](#️-screenshots)
  - [🔗 Links](#-links)
  - [🛠️ Tech Stack](#️-tech-stack)
  - [📋 Pre-Requisites](#-pre-requisites)
  - [⚙️ Getting Started](#️-getting-started)
  - [📂 Project Structure](#-project-structure)
  - [Credits](#credits)
    - [Images](#images)
    - [Fonts](#fonts)
    - [Icons](#icons)
    - [Resources](#resources)



## 🎯 Overview


**Where's Waldo** is a modern, fully responsive React web application that brings the classic search-and-find puzzle game to the web. Players can choose from multiple immersive game scenes, navigate complex illustrations using fluid drag-to-pan and pinch-to-zoom controls, and track their speed using a high-precision local stopwatch. Once all target characters are successfully located, a completion modal instantly appears — displaying their final time and providing a seamless path to submit their score to the competitive leaderboard.



## How To Play


1. **Select a Scene:** Choose a game scene of your choice from the preview cards on the homepage to start playing
2. **Timer:** A stopwatch starts automatically the moment the game scene loads. Find all listed characters as fast as possible to secure a spot on the Top 10 leaderboard
3. **Navigate the Image (Desktop):** Use your mouse wheel or touchpad to zoom in and out. Click and drag to pan across the map and inspect details closely
4. **Navigate the Image (Mobile & Touch):** Use standard pinch-to-zoom gestures to zoom in and out, and drag a single finger to pan across the screen
5. **Tag a Character:** Click or tap anywhere on the image to open the dropdown character menu, then select the character you believe is a match. A visual indicator will confirm your match!
6. **Target List Tracker:** Track the number of characters you've found after each play in the section above the image
7. **Victory & Score Saving:** The timer stops the exact moment you find the final character. A completion modal will immediately appear showing your final time, allowing you to submit your score to the leaderboard



## 🚀 Key Features


### 1. Advanced Touch & Desktop Navigation:

Custom coordinate-tracking system that supports smooth mouse wheel zoom, drag-to-pan, single-finger panning, and two finger pinch-to-zoom for seamless exploration across both desktop and mobile devices

### 2. Optimized Game Loop & State Management:

High-performance local stopwatch architecture utilizing `useRef` to sync timing data without triggering heavy, app-wide re-renders every second

### 3. Character Tracking:

Track characters to know exactly how many characters left to be found. Temporary popup message displays a successful or failure message after each play. Each successful play adds visual indicators via a check mark next to the character image and updates the number in tracking counter 



## 🖼️ Screenshots


<table>
  <tr>
    <td align="center">
      <img src="" alt="" width="400">
      <br>
      <em>Homepage</em>
    </td>
    <td align="center">
      <img src="" alt="" width="400">
      <br>
      <em></em>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="" alt="" width="400">
      <br>
      <em></em>
    </td>
    <td align="center">
      <img src="" alt="" width="400">
      <br>
      <em></em>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="" alt="" width="400">
      <br>
      <em></em>
    </td>
    <td align="center">
      <img src="" alt="" width="400">
      <br>
      <em></em>
    </td>
  </tr>
</table>



## 🔗 Links


- [Solution URL](https://github.com/py-code314/where-is-waldo-frontend)
- [Live Page](https://chicken-run-where-is-waldo.netlify.app/)



## 🛠️ Tech Stack


- **Library:** React
- **Router:** React Router
- **Build Tool:** Vite
- **Styling:** CSS Modules



## 📋 Pre-Requisites


Before you begin, make sure you have the following tools installed on your machine:

- **Node.js** ( [Installation instructions](https://www.theodinproject.com/lessons/foundations-installing-node-js) )
- **npm** ( Installing Node also installs npm alongside it. )
- Running instance of [**Where is Waldo Backend**](https://github.com/py-code314/where-is-waldo-backend)



## ⚙️ Getting Started


1. Run `git clone https://github.com/py-code314/where-is-waldo-frontend` to clone the repository
2. Run `cd where-is-waldo-frontend` to navigate to the project directory
3. Run `npm install` to install dependencies
4. Create `.env` file and configure the required environment variables based on the `.env.sample` file
5. Run `npm run dev` to start the development server



## 📂 Project Structure


```
├── src
│   ├── assets                     # Static assets (images, fonts, icons)
│   │   ├── fonts/                  
│   │   ├── icons/              
│   │   ├── images/                                    
│   ├── components                 # Reusable React components
│   │   ├── core/                  # Core components (e.g., Button)
│   │   ├── features/              # Feature-specific components (e.g., Posts, Categories)
│   │   ├── forms/                 # Form components (e.g., LoginForm, SignupForm)
│   │   ├── layouts/               # Layout components (e.g., Header, Footer)
│   │   ├── sections/              # Section-specific components (e.g., Hero, Comments)
│   ├── contexts/                  # Contexts for global state management (e.g., AuthContext, PostContext)
│   ├── hooks/                     # Custom React hooks (e.g., useFetchData)
│   ├── pages/                     # React components representing individual pages (e.g., Homepage)
│   ├── routes/                    # React Router routes
│   ├── utils/                     # Utility functions (e.g., validateForm)
│   ├── App.jsx                    # Root component
│   ├── App.module.css             
│   ├── index.css                  # Global styles
│   ├── main.jsx                   # Main entry point
├── .env                           # Environment variables
├── .env.sample                    # Template for required environment variables
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json                   # Project dependencies and scripts
├── README.md                      # Project documentation
└── vite.config.js
```



## Credits


### Images

- `wally-waving.webp` - Image **"Wally Waving Goodbye transparent PNG"** from [Stick PNG](https://www.stickpng.com/img/cartoons/wally/wally-waving-goodbye)
- `wally-with-friends.webp` - Image **"a group of three men standing next to each other"** by "BBiDDac" from [Unsplash](https://unsplash.com/photos/a-group-of-three-men-standing-next-to-each-other--2sc8TrF1oQ)
- All the previews and game scenes - [vussio](https://vuss.io/high-resolution-wheres-waldo-images/)
- Character head shots - [candlewick](https://waldo.candlewick.com/)


### Fonts 

- [Google Fonts](https://fonts.google.com/)


### Icons

- [svgrepo](https://www.svgrepo.com/)


### Resources

- Box shadows - [CSS Scan](https://getcssscan.com/css-box-shadow-examples)
- Target animation - [cssloaders](https://cssloaders.github.io/)
  

