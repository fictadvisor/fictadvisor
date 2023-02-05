const UKR_REGEX = "ҐЄІЇЬА-ЩЮЯґєіїьа-щюя";
const UKRSPEC_REGEX = "\\-' ";
const ENG_REGEX = "^[a-zA-Z]+$";
const NUM_REGEX = "^[0-9]+$";

function createRegex(...regexes) {
  return new RegExp("^[" + regexes.toString() + "]+$");
}