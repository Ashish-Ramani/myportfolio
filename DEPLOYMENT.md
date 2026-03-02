# Deployment Guide - GitHub Pages

This guide will help you push your portfolio to GitHub and make it live.

## 📋 Prerequisites

- GitHub account
- Git installed on your machine
- Node.js and npm installed

## 🚀 Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Name your repository (e.g., `ashish-ramani-portfolio` or `3d-portfolio`)
4. Choose **Public** or **Private** (Public is required for free GitHub Pages)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

## 📤 Step 2: Push Your Code to GitHub

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

```bash
# Navigate to your project directory
cd "C:\Users\raman\OneDrive\Desktop\Ashish\PROJ\Kimi_Agent_Ashish Ramani 3D Portfolio\app"

# Add the remote repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main (GitHub uses 'main' by default)
git branch -M main

# Push your code
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/ashishramani/3d-portfolio.git
git branch -M main
git push -u origin main
```

## 🌐 Step 3: Enable GitHub Pages

### Option A: Using GitHub Actions (Recommended - Automatic)

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **"GitHub Actions"**
4. The workflow will automatically deploy when you push to `main` branch
5. Your site will be available at: `https://YOUR_USERNAME.github.io/REPO_NAME`

### Option B: Manual Deployment

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **"Deploy from a branch"**
4. Select branch: **`main`** or **`master`**
5. Select folder: **`/ (root)`** or **`/dist`** (if you want to deploy the built version)
6. Click **Save**
7. Your site will be available at: `https://YOUR_USERNAME.github.io/REPO_NAME`

## 🔄 Step 4: Update Base Path in vite.config.ts (If Needed)

If your repository name is not the root URL, you may need to update the base path:

```typescript
// vite.config.ts
export default defineConfig({
  base: '/REPO_NAME/', // Replace REPO_NAME with your actual repo name
  // ... rest of config
});
```

For example, if your repo is `3d-portfolio`:
```typescript
base: '/3d-portfolio/',
```

Then rebuild and push:
```bash
npm run build
git add dist
git commit -m "Update base path for GitHub Pages"
git push
```

## ✅ Step 5: Verify Deployment

1. Wait a few minutes for GitHub to build and deploy
2. Visit your site: `https://YOUR_USERNAME.github.io/REPO_NAME`
3. Check the **Actions** tab in your repository to see deployment status

## 🔧 Troubleshooting

### Site shows 404
- Make sure GitHub Pages is enabled in Settings → Pages
- Check that the base path in `vite.config.ts` matches your repository name
- Wait a few minutes for changes to propagate

### Assets not loading
- Ensure `base` in `vite.config.ts` is set correctly
- Check that all assets are in the `public` folder
- Rebuild and redeploy: `npm run build && git add dist && git commit -m "Rebuild" && git push`

### GitHub Actions failing
- Check the **Actions** tab for error messages
- Ensure Node.js version in workflow matches your local version
- Make sure all dependencies are in `package.json`

## 📝 Future Updates

To update your live site:

```bash
# Make your changes
# ... edit files ...

# Commit and push
git add .
git commit -m "Update portfolio"
git push origin main
```

GitHub Actions will automatically rebuild and deploy your site!

## 🔗 Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file in the `public` folder with your domain:
   ```
   yourdomain.com
   ```
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings to use your custom domain

---

**Need help?** Check the [GitHub Pages documentation](https://docs.github.com/en/pages) or [GitHub Actions documentation](https://docs.github.com/en/actions).
