export const UKR_REGEX = "ҐЄІЇЬА-ЩЮЯґєіїьа-щюя";
export const UKRSPEC_REGEX = "\\-' ";
export const ENG_REGEX = "a-zA-Z";
export const NUM_REGEX = "0-9";

export function createRegex(...regexes: string[]) {
  return new RegExp("^[" + regexes.join('') + "]+$");
}