export const taggedDescribe = (tags: string[], name: string, fn: () => void) => {
    const envTags = Cypress.env('TAGS')
    if (!envTags) {
      describe(name, fn)
      return
    }
  
    const tagArray = typeof envTags === 'string' ? envTags.split(',') : envTags
    const shouldRun = tags.some((tag) => tagArray.includes(tag))
  
    if (shouldRun) {
      describe(name, fn)
    }
  }
  
  export const taggedIt = (tags: string[], name: string, fn: () => void) => {
    const envTags = Cypress.env('TAGS')
  
    if (!envTags) {
      it(name, fn)
      return
    }
  
    const tagArray = typeof envTags === 'string' ? envTags.split(',') : envTags
    const shouldRun = tags.some((tag) => tagArray.includes(tag))
  
    if (shouldRun) {
      it(name, fn)
    }
  }
  