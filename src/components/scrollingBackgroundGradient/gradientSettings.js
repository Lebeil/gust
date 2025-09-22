const defaultPalette = {
  veryDarkBlue: "#000c2e",
  darkBlue: "#00195c",
  blue: "#0046ff",
}
const makePalette = {
  lightBlue: "#BBE3FF",
  blue: "#0046FF"
}

const openPalette = {
  darkBlue: "#122644",
  lightBlue: "#5c9ec9",
}

const vcPalette = {
  green: "#08F09C",
  blue: "#0046FF"
}

export const PAGE_PALETTES = {
  "/": [
    defaultPalette.veryDarkBlue,
    defaultPalette.darkBlue,
    defaultPalette.blue,
    defaultPalette.blue
  ],
  "/make-it": [
    makePalette.blue,
    makePalette.blue,
    makePalette.blue,
    makePalette.lightBlue
  ],
  "/open": [
    openPalette.darkBlue,
    openPalette.darkBlue,
    openPalette.darkBlue,
    openPalette.lightBlue
  ],
  "/visual-creators": [
    vcPalette.green,
    vcPalette.green,
    vcPalette.green,
    vcPalette.blue
  ],
}

export const DEFAULT_SHADER_SETTINGS = {
  timeMultiplier: 0.10,
  scale: 1,
  distortionIntensity: 1,
  distortionIterations: 1,
}