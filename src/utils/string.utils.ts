export abstract class StringUtils {
  static capitalize = (text: string) => {
    const firstLetter = text.charAt(0).toUpperCase();
    return `${firstLetter}${text.slice(1, text.length)}`;
  };
}
