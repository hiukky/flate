module.exports = {
  name: 'flate',
  displayName: 'Flate',
  theme: {
    background: {
      default: '#1c1d27',
      success: '#6bf178',
      notice: '#ffe066',
      warning: '#f49e4c',
      danger: '#e84855',
      surprise: '#ff5d8f',
      info: '#00cecb',
    },
    foreground: { default: '#ffffff' },
    highlight: {
      default: 'rgba(66, 75, 84, 1)',
      xxs: 'rgba(66, 75, 84, 0.05)',
      xs: 'rgba(66, 75, 84, 0.1)',
      sm: 'rgba(66, 75, 84, 0.25)',
      md: 'rgba(66, 75, 84, 0.35)',
      lg: 'rgba(66, 75, 84, 0.5)',
      xl: 'rgba(66, 75, 84, 0.8)',
    },
    rawCss: `
    .CodeMirror {
      color: #E4CE05 !important;
    }
  `,
    styles: {
      dialog: {
        background: {
          surprise: '#6bf178',
          success: '#ff5d8f',
        },
      },
      pane: {
        foreground: { default: '#FFE066' },
        highlight: {
          default: 'rgba(66, 75, 84, 1)',
          xxs: 'rgba(66, 75, 84, 0.05)',
          xs: 'rgba(66, 75, 84, 0.1)',
          sm: 'rgba(66, 75, 84, 0.25)',
          md: 'rgba(66, 75, 84, 0.35)',
          lg: 'rgba(66, 75, 84, 0.5)',
          xl: 'rgba(66, 75, 84, 0.8)',
        },
        background: {
          default: '#1c1d27',
          success: '#6bf178',
          notice: '#ffffff',
          surprise: '#eab464',
        },
      },
      paneHeader: {
        background: {
          default: '#1c1d27',
          success: '#6bf178',
          surprise: '#ff5d8f',
        },
        foreground: { default: '#ffffff' },
        highlight: {
          default: 'rgba(66, 75, 84, 1)',
          xxs: 'rgba(66, 75, 84, 0.05)',
          xs: 'rgba(66, 75, 84, 0.1)',
          sm: 'rgba(66, 75, 84, 0.25)',
          md: 'rgba(66, 75, 84, 0.35)',
          lg: 'rgba(66, 75, 84, 0.5)',
          xl: 'rgba(66, 75, 84, 0.8)',
        },
      },
      sidebar: {
        foreground: { default: '#6bf178' },
        highlight: {
          default: 'rgba(66, 75, 84, 1)',
          xxs: 'rgba(66, 75, 84, 0.05)',
          xs: 'rgba(66, 75, 84, 0.1)',
          sm: 'rgba(66, 75, 84, 0.25)',
          md: 'rgba(66, 75, 84, 0.35)',
          lg: 'rgba(66, 75, 84, 0.5)',
          xl: 'rgba(66, 75, 84, 0.8)',
        },
        background: { surprise: '#6bf178', success: '#ff5d8f' },
      },
      sidebarHeader: {
        background: { default: '#6bf178' },
        highlight: {
          default: 'rgba(66, 75, 84, 1)',
          xxs: 'rgba(66, 75, 84, 0.05)',
          xs: 'rgba(66, 75, 84, 0.1)',
          sm: 'rgba(66, 75, 84, 0.25)',
          md: 'rgba(66, 75, 84, 0.35)',
          lg: 'rgba(66, 75, 84, 0.5)',
          xl: 'rgba(66, 75, 84, 0.8)',
        },
        foreground: { default: '#1c1d27' },
      },
      sidebarList: {
        foreground: { default: '#ffffff' },
      },
    },
  },
}
