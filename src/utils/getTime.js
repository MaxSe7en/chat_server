/**
 * Converts a timestamp to a human-readable date string.
 * @param {number} timestamp - The timestamp in milliseconds since the Unix epoch.
 * @returns {string} The formatted date string.
 */
export function getTime(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${hours}:${minutes}:${seconds}`;
}
