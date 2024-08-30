/**
 * Converts a timestamp to a human-readable date string.
 * @param {number} timestamp - The timestamp in milliseconds since the Unix epoch.
 * @returns {string} The formatted date string.
 */
export function getDate(timestamp) {
    const date = new Date(timestamp);
  
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();
  
    return `${day}-${month}-${year}`;
  }
  