export const getKey = (key: string) => {
  return localStorage.getItem(key);
};

export const setKey = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

