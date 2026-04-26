/**
 * Data Normalizers
 * 
 * These functions take raw dataset items from various sources and map them
 * into a standard format expected by the frontend components:
 * 
 * {
 *   id: string,
 *   username: string,
 *   name: string,
 *   account_based_in: string,
 *   follower_count: number,
 *   number_of_tweets: number,
 *   creation_date: string | null,
 *   profile_pic_url: string | null,
 *   platformUrl: string
 * }
 */

export const normalizeTwitterData = (item) => {
    return {
        ...item,
        // Ensure standard fields exist
        name: item.name || item.username,
        account_based_in: item.account_based_in || item.location || 'Unknown',
        follower_count: item.follower_count || 0,
        number_of_tweets: item.number_of_tweets || 0,
        creation_date: item.creation_date || item.timestamp || null,
        profile_pic_url: item.profile_pic_url || null,
        // Add specific platform link
        platformUrl: `https://twitter.com/${item.username?.replace('@', '')}`
    };
};

export const normalizeInstagramData = (item) => {
    return {
        ...item,
        // Map Insta specific fields to the standard schema
        name: item.full_name || item.username,
        account_based_in: extractLocationFromBio(item.biography) || 'Unknown',
        follower_count: item.follower_count || 0,
        number_of_tweets: item.latest_reel_media || 0, // Fallback for activity metric
        creation_date: null, // Not typically in this insta scrape
        profile_pic_url: item.profile_pic_url || null, // Assuming it might not exist in this specific schema
        // Add specific platform link
        platformUrl: `https://instagram.com/${item.username}`
    };
};

export const normalizeWhiteInternetData = (item) => {
    return {
        ...item,
        // Map White Internet specific fields
        name: item.display_name || item.username,
        username: item.username?.replace('@', '') || 'unknown',
        account_based_in: item.location_status || 'Unknown',
        follower_count: item.follower_count || 0, // Fallback since it's missing in sample
        number_of_tweets: item.number_of_tweets || 0, // Fallback since it's missing in sample
        creation_date: item.account_creation_date || null,
        profile_pic_url: null,
        // Add specific platform link (Assuming Twitter based on '@' handles and UI usage)
        platformUrl: `https://twitter.com/${item.username?.replace('@', '')}`
    };
};

// Helper to look for location-like strings or emojis in bio
const extractLocationFromBio = (bio) => {
    if (!bio) return null;

    // Simplistic check for pin emoji which often precedes location
    const pinMatch = bio.match(/(?:📍|Location:|📍\s*)([^\n]+)/i);
    if (pinMatch && pinMatch[1]) {
        return pinMatch[1].trim();
    }

    return null; // Leave as 'Unknown'
};
