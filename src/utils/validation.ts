export const validateName = (name: string) => {
  const nameParts = name.trim().split(/\s+/);
  if (nameParts.length < 2 || nameParts.length > 3) {
    return false;
  }
  return nameParts.every((part) => /^[A-Za-z]+$/.test(part));
};
