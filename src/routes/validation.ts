// Search field using binarySearch
const searchField = (element: any): boolean => {
  const field = [
    "author",
    "content",
    "country",
    "description",
    "event",
    "insertionDate",
    "publishedAt",
    "region",
    "score",
    "source",
    "title",
    "uf",
    "url",
    "urlToImage",
  ];
  let begin = 0;
  let end = field.length - 1;
  let middle;

  while (end >= begin) {
      middle = Math.trunc((end + begin) / 2);
      if (field[middle] === element) {
          while (field[middle - 1] === element) {
              middle--;
          }
          return true;
      }
      if (element > field[middle]) {
          begin = middle + 1;
      } else {
          end = middle - 1;
      }
  }
  return false;
};

// validation data body
const postDocValidation = (body: any = {}): boolean => {
  const keys = [...Object.keys(body)];
  const keysUnique = [... new Set(keys)];

  // Verifica todos os campos estao no documento e se ha algum repetido
  if (keys.length !== 14 || keys.length !== keysUnique.length) {
    return false;
  }

  for (const key of keys) {
    if (!searchField(key)) {
      return false;
    }
  }
  return true;
};

// validation data body
const patchDocValidation = (body: any = {}): boolean => {
  const keys = [...Object.keys(body)];
  const keysUnique = [... new Set(keys)];

  // Verifica se ha campos repetidos
  if (keys.length !== keysUnique.length) {
    return false;
  }

  for (const key of keys) {
    if (!searchField(key)) {
      return false;
    }
  }
  return true;
};
export {
  patchDocValidation,
  postDocValidation,
};
