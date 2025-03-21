import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import { preprocessor } from "@badeball/cypress-cucumber-preprocessor/browserify"
import pdf from 'pdf-parse'

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config)

  on(
    'file:preprocessor',
    preprocessor(config, {
      typescript: require.resolve('typescript'),
    }),
  )

  if (config.env.TAGS) {
    config.env.TAGS = config.env.TAGS.split(',')
  }

  on('task', {
    parsePdf({ filePath }: { filePath: any }) {
      return pdf(filePath).then((data: any) => {
        return data.text
      })
    },
  })
  return config
}
export default defineConfig({
  "chromeWebSecurity": false,
  defaultCommandTimeout: 4000,
  viewportWidth: 1280,
  viewportHeight: 720,
  pageLoadTimeout: 120000,
  requestTimeout: 10000,
  responseTimeout: 30000,
  reporter: '../../node_modules/mocha-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  e2e: {
    specPattern: ['src/e2e/post-deployment-tests/**/*.feature', 'src/e2e/ci-tests/**/*.ts'],
    setupNodeEvents,
    supportFile: 'src/support/e2e.ts',
    fixturesFolder: 'src/fixtures', 
    env: {
      TAGS: '',
      environment: 'prod',
      product: ''
    },
  },
})
