export function truncateText(text, maxLength) {
    if (typeof text !== 'string' || maxLength <= 0) {
      throw new Error('Invalid arguments: text must be a string and maxLength must be greater than 0');
    }
    if (text.length > maxLength) {
      return text.slice(0, maxLength - 1) + '…'; // Use ellipsis for truncation
    }
    return text;
  }