export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};
