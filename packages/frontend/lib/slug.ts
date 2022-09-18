// eslint-disable-next-line import/prefer-default-export
export const createSlugFromString = (str: string, id: string) => {
  const parsedStr = str
    .split(' ')
    .map((part) => part.replace(/[^A-Za-z0-9]/g, ''))
    .join('-')
    .toLowerCase();

  return `${parsedStr}-${id}`;
};

export const getIdFromSlug = (slug: string) => {
  const id = slug.split('-').pop();

  if (!id || !parseInt(id, 10))
    throw new Error('Id could not be parsed from slug');

  return id;
};
