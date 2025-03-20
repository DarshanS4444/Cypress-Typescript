const report = require('multiple-cucumber-html-reporter')

report.generate({
  jsonDir: 'src/reports',
  reportPath: 'src/reports',
  metadata: {
    browser: {
      name: 'chrome',
      version: '60',
    },
    device: 'Local test machine',
    platform: {
      name: 'mac',
      version: '13.6 (22G120)',
    },
  },
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'Cypress - Typescript' },
      { label: 'Release', value: '1.0.0' },
    ],
  },
})
