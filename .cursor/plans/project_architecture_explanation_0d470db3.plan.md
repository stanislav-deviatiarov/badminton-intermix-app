---
name: Project Architecture Explanation
overview: This plan explains how the badminton intermix app works, including the player mixing algorithm, data flow, and component structure.
todos: []
isProject: false
---

# Badminton Intermix App - Project Architecture Explanation

## Project Overview

This is a React-based web application for organizing badminton players into courts. The app helps users:

- Manage a list of players
- Select active players and courts
- Randomly assign players to courts (4 players per court)
- Track mixing statistics

## Architecture Overview

### Technology Stack

- **React 18** - UI framework
- **Material-UI (MUI)** - Component library
- **localStorage** - Data persistence
- **Custom RNG** - Deterministic random number generation

### Key Components

1. **Main.js** - Root component with navigation
  - Manages page routing (Mixer vs Settings)
  - Provides app bar with menu
2. **Mixer.js** - Main mixing logic component
  - Manages player and court state
  - Implements the mixing algorithm
  - Handles UI for player/court selection
3. **Storage.js** - localStorage wrapper
  - Persists players, courts, device ID, and mixing statistics
4. **MotherOfAllRNG.js** - Custom random number generator
  - Implements George Marsaglia's algorithm
  - Provides deterministic, seedable randomness
5. **ItemList.js** - Reusable list component
  - Displays checkable items (players/courts)
  - Supports deletion for players
6. **MixedItem.js** - Displays court assignments
  - Shows court name and assigned players
  - Adds divider between teams (after 2nd player)

## The `handleMixPlayers` Method Explained

The `handleMixPlayers` function (lines 220-302 in `Mixer.js`) is the core algorithm that randomly assigns players to courts.

### Step-by-Step Flow

```
1. Filter Active Players & Courts
   ↓
2. Validate Input (early return if empty)
   ↓
3. Initialize RNG with Time-Based Seed
   ↓
4. Handle Odd Player Count (assign one to rest)
   ↓
5. Randomly Assign Players to Courts
   ↓
6. Build UI Components for Results
   ↓
7. Save Statistics
```

### Detailed Algorithm Breakdown

**1. Initial Setup (lines 221-230)**

- Filters active players and courts
- Creates court objects with empty player arrays
- Early return if no active players/courts

**2. RNG Seed Generation (lines 240-251)**

- Uses `Date.now()` as base seed
- On first mix: stores timestamp as `lastMixedTime`
- On subsequent mixes: seed = current time - last mixed time
- This creates deterministic but varying randomness between mixes
- Initializes `MotherOfAllRNG` with the seed

**3. Odd Player Handling (lines 253-257)**

- If odd number of players, randomly selects one to rest
- Ensures remaining players can form complete teams (4 per court)

**4. Player Assignment Loop (lines 259-273)**

- While there are unassigned players:
  - Generates random index from active players
  - Checks if player already assigned (via `usedPlayerIndexes`)
  - If not assigned and court has space (< 4 players):
    - Adds player to current court
    - Marks player as used
  - If court is full (4 players), moves to next court
  - Breaks if all courts are full

**5. UI Generation (lines 275-297)**

- Creates `MixedItem` components for each court with players
- Collects any remaining unassigned players into "resting" section
- Displays Ukrainian text: "Відпочивають" (plural) or "Відпочиває" (singular)

**6. Statistics & State Update (lines 299-301)**

- Updates `mixed` state with generated UI components
- Saves mixing statistics to localStorage (device ID, timestamp, active players/courts)

## Data Flow

```
User Input
  ↓
State Updates (players, courts)
  ↓
localStorage Persistence
  ↓
handleMixPlayers() called
  ↓
RNG generates assignments
  ↓
UI Components created
  ↓
State updated (mixed)
  ↓
Statistics saved
```

## Key Features

1. **Persistent Storage**: All data saved to localStorage
2. **Deterministic Randomness**: Same seed produces same results
3. **Time-Based Variation**: Different seeds on each mix ensure variety
4. **Player Management**: Add, toggle active status, delete players
5. **Court Management**: Toggle active courts (up to 7 courts)
6. **Statistics Tracking**: Records each mixing event with device ID and timestamp

## Potential Issues in Current Implementation

1. **Infinite Loop Risk**: The while loop (line 259) could potentially run indefinitely if random selection keeps picking already-used players
2. **Inefficient Random Selection**: Uses rejection sampling which becomes slower as more players are assigned
3. **Seed Calculation**: The seed calculation (`Date.now() - lastMixedTime`) could produce negative or very small values

## Component Relationships

```
Main.js
  └── MixerPage (Mixer.js)
      ├── ItemList (for players)
      ├── ItemList (for courts)
      ├── MixedItem (for each court result)
      └── Uses Storage.js for persistence
```

The app uses a simple, single-page architecture with localStorage for persistence, making it suitable for offline use.