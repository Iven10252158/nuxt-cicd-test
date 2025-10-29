// https://nuxt.com/docs/api/configuration/nuxt-config

const isCI = process.env.GITHUB_ACTIONS === 'true'
const repo = 'nuxt-cicd-test' 

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    app: {
      // 本地開發用 '/'；在 GitHub Actions（CI 環境）用 '/<repo-name>/'
      baseURL: isCI ? `/${repo}/` : '/',
    },
    nitro: {
      preset: 'github-pages',
    },
})
