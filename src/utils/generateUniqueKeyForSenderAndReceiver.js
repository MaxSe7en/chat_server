export function generateUniqueKeyForSenderAndReceiver(str) {
  const normalizedStr = str.split("|").sort().join("|");
  return normalizedStr;
}
