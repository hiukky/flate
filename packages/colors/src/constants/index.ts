import path from 'path'

export const DEFAULT_PROPS = {
  rootDir: {
    scss: path.join(__dirname, '..', '..', 'mock'),
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
