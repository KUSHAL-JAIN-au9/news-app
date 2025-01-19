export function truncateString(str: string, length: number = 20): string {
  if (str?.length <= length) {
    return str;
  }
  const output = str?.slice(0, length - 3) + '...';
  return output;
}

/**
 * Extracts specific keys from an array of objects.
 * @param data - The array of objects to extract keys from.
 * @param keys - The array of keys to extract.
 * @returns An array of objects containing only the specified keys.
 */
// export function extractKeys(
//   data: Array<{ [key: string]: string | object }>,
//   keys: string[]
// ): Array<{ [key: string]: string | object }> {
//   return data.map((item) => {
//     const result: { [key: string]: string | object } = {};
//     keys.forEach((key) => {
//       const keyParts = key.split('.');
//       let value: { [key: string]: any } | undefined = item;
//       for (const part of keyParts) {
//         if (typeof value === 'object' && value !== null) {
//           value = value[part];
//         } else {
//           value = undefined;
//           break;
//         }
//       }
//       if (value !== undefined) {
//         result[key] = value;
//       }
//     });
//     return result;
//   });
// }

export function extractKeys(
  data: Array<{ [key: string]: string }>,
  keys: string[]
): Array<{ [key: string]: string | { name: string } }> {
  return data.map((item) => {
    const extracted: { [key: string]: string } = {};
    keys.forEach((key) => {
      if (key in item) {
        extracted[key] = item[key];
      }
    });
    return extracted;
  });
}

/**
 * Filters an array of objects based on matched filters and a search query.
 * @param data - The array of objects to filter.
 * @param filters - An object where keys are the filter names and values are arrays of filter values.
 * @param searchQuery - The search query to filter the objects.
 * @returns The filtered array of objects.
 */
export function filterData(
  data: Array<{ [key: string]: string | object }>,
  filters: { [key: string]: string },
  searchQuery: string
): Array<{ [key: string]: string | object }> {
  return data.filter((item) => {
    // Check if the item matches all filters
    const matchesFilters = Object.keys(filters).every((key) => {
      const filterValues = filters[key];
      if (filterValues.length === 0) return true;
      let itemValue;
      if (key === 'source') {
        itemValue = (item[key] as { name: string }).name;
      } else {
        itemValue = key
          .split('.')
          .reduce((acc: any, part) => acc && acc[part], item);
      }
      return filterValues.includes(itemValue);
    });

    // Check if the item matches the search query
    const matchesSearchQuery = Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );

    return matchesFilters && matchesSearchQuery;
  });
}

//convert date string to dd-MM-yyyy format
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
