import path from 'path'

export const SETTINGS = {
  themeName: 'flate.json',
}

export const DEFAULT_PROPS = {
  rootDir: {
    build: path.join(__dirname, '..', 'mock', 'temp', 'dist'),
    themes: path.join(__dirname, '..', 'mock', 'themes'),
    scss: path.join(__dirname, '..', 'mock', 'scss'),
  },
}

export const COLORS = {
  stage: {
    a: '$red',
    b: '$cyan',
  },
  final: {
    a: '#e84855',
    b: '#00cecb',
  },
  scssJSON: {
    $cyan: '#00cecb',
    $red: '#e84855',
  },
}
