// utils/helpers.ts

/**
 * Toggle a value in an array (add if missing, remove if present)
 */
export const toggleItemInArray = (array: string[], item: string): string[] => {
  return array.includes(item)
    ? array.filter(i => i !== item)
    : [...array, item];
};
