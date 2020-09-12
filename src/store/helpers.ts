export const storeItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const loadItem = (key: string) => {
  let data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
}

export const clearItem = (key: string) => localStorage.removeItem(key);

export const clearStorage = () => localStorage.clear();