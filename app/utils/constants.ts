export const extractText = (
  text: string,
  replace?: string,
  replaceWith?: string
) => text?.toLowerCase()?.replaceAll(replace || "_", replaceWith || " ");

export const decodeToken = (token: string) => {
  try {
    return JSON.parse(window?.atob(token?.split(".")[1]));
  } catch (e) {
    console.error("Failed to decode token:", e);
    return null;
  }
};
