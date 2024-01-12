export const addressEllipsis = (address, length = 4) => {
  if (!address) return "";
  if (!address.startsWith("0x")) address = "0x" + address;

  if (address.length <= length * 2 + 2) return address;
  return `${address.slice(0, length + 2)}...${address.slice(
    address.length - length
  )}`;
};

export const getLocalItem = (key, defaultValue, isJson = false) => {
  if (typeof window === "undefined") {
    return defaultValue; // Return default value or null if window is not defined
  }
  const value =
    window.localStorage.getItem(key) || (isJson ? "{}" : defaultValue);
  return isJson ? JSON.parse(value) : value;
};

export const setLocalItem = (key, value, isJson = false) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, isJson ? JSON.stringify(value) : value);
  }
};

export const clearLocalItems = () => {
  if (typeof window !== "undefined") {
    window.localStorage.clear();
  }
};
