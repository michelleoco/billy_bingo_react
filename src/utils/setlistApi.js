/**
 * Utility functions for interacting with the Billy Bingo backend API
 * which connects to the setlist.fm API via the BmfsdbApi wrapper
 */

// Backend API base URL
const BACKEND_API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.billybingo.moonangel.com/api"
    : "http://localhost:3001/api";

/**
 * Fetches setlists for Billy Strings from the backend API
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Promise<Array>} - Array of setlists
 */
export const fetchBillyStringsSetlists = async (page = 1) => {
  try {
    const response = await fetch(
      `${BACKEND_API_URL}/setlists/billy-strings?page=${page}`
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      return data.data.setlist || [];
    } else {
      throw new Error(data.message || "Failed to fetch setlists");
    }
  } catch (error) {
    console.error("Error fetching setlists:", error);
    return [];
  }
};

/**
 * Extracts all songs from a list of setlists
 * @param {Array} setlists - Array of setlist objects
 * @returns {Array<string>} - Array of song names
 */
export const extractSongsFromSetlists = (setlists) => {
  const songs = new Set();

  setlists.forEach((setlist) => {
    if (setlist.sets && setlist.sets.set) {
      setlist.sets.set.forEach((set) => {
        if (set.song) {
          set.song.forEach((song) => {
            if (song.name) {
              songs.add(song.name);
            }
          });
        }
      });
    }
  });

  return Array.from(songs);
};

/**
 * Fetches a list of Billy Strings songs from the backend API
 * @param {number} maxPages - Maximum number of pages to fetch (default: 5)
 * @returns {Promise<Array<string>>} - Array of song names
 */
export const fetchBillyStringsSongs = async (maxPages = 5) => {
  try {
    const response = await fetch(
      `${BACKEND_API_URL}/setlists/billy-strings/songs?maxPages=${maxPages}`
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.success || data.data) {
      return data.data.songs || [];
    } else {
      throw new Error(data.message || "Failed to fetch songs");
    }
  } catch (error) {
    console.error("Error fetching Billy Strings songs:", error);

    // Fallback to local fallback songs if backend fails
    console.log("Using fallback songs due to API error");
    return getFallbackSongs();
  }
};

/**
 * Returns a fallback list of Billy Strings songs in case the API fails
 * @returns {Array<string>} - Array of song names
 */
export const getFallbackSongs = () => {
  return [
    "Dust in a Baggie",
    "Away From the Mire",
    "Hide and Seek",
    "Turmoil & Tinfoil",
    "In the Morning Light",
    "Red Daisy",
    "Pyramid Country",
    "Secrets",
    "Love and Regret",
    "Heartbeat of America",
    "Know It All",
    "Wargasm",
    "Wharf Rat",
    "Thunder",
    "Likes of Me",
    "Hollow Heart",
    "Doin' Things Right",
    "Thirst Mutilator",
    "Dealing Despair",
    "Highway Hypnosis",
    "Must Be Seven",
    "Taking Water",
    "Fire Line",
    "Hellbender",
    "Enough to Leave",
    "Running the Route",
    "This Old World",
    "Bronzeback",
    "All of Tomorrow",
    "Unwanted Love",
    "Slow Train",
    "Tipper",
    "Fireline",
    "Wargasm",
    "Meet Me at the Creek",
    "Rank Stranger",
    "Lonesome LA Cowboy",
    "Black Clouds",
    "While I'm Waiting Here",
    "Spinning",
    "Heartbeat of America",
    "Running",
    "Dos Banjos",
    "Streamline Cannonball",
    "Hollow Heart",
    "Ernest T. Grass",
    "Doin' Things Right",
    "Thirst Mutilator",
    "Dealing Despair",
    "Highway Hypnosis",
  ];
};
