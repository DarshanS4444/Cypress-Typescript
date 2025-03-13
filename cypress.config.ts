import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import { preprocessor } from "@badeball/cypress-cucumber-preprocessor/browserify"

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
  return config
}
export default defineConfig({
  e2e: {
    specPattern: ['src/e2e/post-deployment-tests/**/*.feature', 'src/e2e/ci-tests/**/*.ts'],
    setupNodeEvents,
    supportFile: 'src/support/e2e.ts',
    fixturesFolder: 'src/fixtures', 
    env: {
      TAGS: '',
      environment: 'prod',
      product: 'swaglabs'
    },
  },
})
