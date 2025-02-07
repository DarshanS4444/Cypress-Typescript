import { defineConfig } from "cypress";

export default defineConfig({
  setupNodeEvents(on, config) {
    // implement node event listeners here
  },
  e2e: {
    specPattern: ['src/e2e/post-deployment-tests/**/*.feature', 'src/e2e/ci-tests/**/*.ts'],
    supportFile: 'src/support/e2e.ts',
  },
});
