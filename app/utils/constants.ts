export const extractText = (
    text: string,
    replace?: string,
    replaceWith?: string
  ) => text?.toLowerCase()?.replaceAll(replace || "_", replaceWith || " ");
  