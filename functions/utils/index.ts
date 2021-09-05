export const getFunctionName = (collection: string): string => {
  if (collection.slice(-1) === 's') collection = collection.slice(0, -1);
  return `Get${collection[0].toUpperCase()}${collection.slice(1)}`;
}

export const getProperCollectionName = (collection: string): string => {
  if (collection.slice(-1) === 's') collection = collection.slice(0, -1);
  return `${collection[0].toUpperCase()}${collection.slice(1)}`;
}

export const getPageSize = (size?: number, verbose?: string | boolean): number => {
  size = size || (verbose ? 12 : 64)
  if (verbose) {
    if (size > 24) return 24;
    return size;
  } else {
    if (size > 64) return 64;
    return size;
  }
}