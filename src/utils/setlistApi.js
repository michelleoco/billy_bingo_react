/**
 * Utility functions for interacting with the setlist.fm API
 * Documentation: https://api.setlist.fm/docs/1.0/index.html
 */

// API key provided by the user
const API_KEY = "xFlMsjxDcP4OYfNMyv289wB8buzdOTbh6cNY";
const BASE_URL = "https://api.setlist.fm/rest/1.0";

// Use a CORS proxy for development
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

// Billy Strings' mbid (MusicBrainz ID)
const BILLY_STRINGS_MBID = "640db492-34b4-47a3-8a0a-5b38ede3c328";

// Flag to determine if we should use the API or fallback to hardcoded songs
// Due to CORS issues with the setlist.fm API in development, we'll use fallback songs
// In a production environment, you would set up a proper backend proxy
const USE_FALLBACK = true;

/**
 * Fetches setlists for Billy Strings from the setlist.fm API
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Promise<Array>} - Array of setlists
 */
export const fetchBillyStringsSetlists = async (page = 1) => {
  // If we're using fallback mode, return an empty array to trigger fallback songs
  if (USE_FALLBACK) {
    console.log("Using fallback songs instead of API due to CORS restrictions");
    return [];
  }

  try {
    // Use the CORS proxy to avoid CORS issues in development
    const apiUrl = `${CORS_PROXY}${BASE_URL}/artist/${BILLY_STRINGS_MBID}/setlists?p=${page}`;

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        "x-api-key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.setlist || [];
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
 * Fetches a list of Billy Strings songs from setlist.fm
 * @param {number} maxPages - Maximum number of pages to fetch (default: 3)
 * @returns {Promise<Array<string>>} - Array of song names
 */
export const fetchBillyStringsSongs = async (maxPages = 3) => {
  // If we're using fallback mode, return fallback songs immediately
  if (USE_FALLBACK) {
    console.log("Using fallback songs due to CORS restrictions in development");
    return getFallbackSongs();
  }

  try {
    // Fetch multiple pages of setlists
    const allSetlists = [];

    for (let page = 1; page <= maxPages; page++) {
      const setlists = await fetchBillyStringsSetlists(page);
      if (setlists.length === 0) break;
      allSetlists.push(...setlists);
    }

    // Extract songs from all fetched setlists
    const songs = extractSongsFromSetlists(allSetlists);

    // If no songs were found, return a fallback list
    if (songs.length === 0) {
      console.log("No songs found in API response, using fallback list");
      return getFallbackSongs();
    }

    return songs;
  } catch (error) {
    console.error("Error fetching Billy Strings songs:", error);
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
