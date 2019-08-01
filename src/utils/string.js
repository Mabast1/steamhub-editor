export const containSpecialChar = str => {
  const forbiddenChar = /[.#%\\/?]/;
  return forbiddenChar.test(str);
};
