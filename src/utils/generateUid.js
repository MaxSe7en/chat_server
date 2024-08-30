import crypto from "crypto";

function generateRandomNumber() {
  // Generate a random number between 0 and 1
  const randomNumber = Math.random();

  // Scale the random number to the range [1, 9]
  const scaledNumber = Math.floor(randomNumber * 9) + 1;

  return scaledNumber.toString();
}

export function generateNumericUUID() {
  const buffer = crypto.randomBytes(5); // 5 bytes = 40 bits
  const randomNumber = generateRandomNumber();
  const numericUUID = parseInt(buffer.toString("hex"), 16).toString(); // Convert buffer to hexadecimal string and then to decimal string
  return numericUUID.padStart(10, randomNumber).slice(0, 10); // Ensure length of 10 characters
}
