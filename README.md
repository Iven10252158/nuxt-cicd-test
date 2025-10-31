# Nuxt + GitHub Pages (CI/CD)
此專案示範如何使用 **Nuxt 3** 透過 **GitHub Actions** 自動部署到 **GitHub Pages**

## 專案重點設定
- `nuxt.config.ts`
  - `app.baseURL`:  
    - 本地：`'/'`  
    - CI（GitHub Actions）：`'/<repo-name>/'`（靠 `process.env.GITHUB_ACTIONS === 'true'` 判斷）
  - `nitro.preset = 'github-pages'`：  
    - 產出對 Pages 友善的 SSG 成品（含 `404.html` fallback）

## Github 設定
GitHub 建立 repo，並在 **Settings → Pages → Build and deployment → Source** 選 **GitHub Actions**。

## 部署流程（CI/CD）
此流程定義於 `.github/workflows/deploy.yml`，在你 push 到`指定分支`時自動執行。
 
### CI 在做什麼
- **Checkout**：取回原始碼  
- **Setup Node**：安裝 Node.js（例如 v20）  
- **Install deps**：`npm ci`  
- **Generate**：`npx nuxi generate`  
  - 套用 `baseURL`（CI 環境）  
  - 產出 `dist/`、指紋化資產、`404.html`  
- **Upload artifact**：把 `dist/` 上傳成 GitHub Pages 工件

 ### CD 在做什麼
 - Deploy to GitHub Pages：actions/deploy-pages 將 artifact 發佈為 Pages 網站，成功後在 Environments → github-pages 可看到 View deployment 與最終網址

### 手動觸發部署
- 進入 GitHub Actions 頁面，選擇 Deploy to GitHub Pages workflow，按 Run workflow。
