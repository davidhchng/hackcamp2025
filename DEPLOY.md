# Deploying to GitHub Pages

Your website is now configured to deploy to GitHub Pages automatically!

## Setup Steps

1. **Enable GitHub Pages in your repository:**
   - Go to your GitHub repository: https://github.com/davidhchng/hackcamp2025
   - Click on **Settings** → **Pages**
   - Under "Source", select **GitHub Actions**
   - Save the changes

2. **Push the changes:**
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

3. **Wait for deployment:**
   - Go to the **Actions** tab in your GitHub repository
   - You should see a workflow running called "Deploy to GitHub Pages"
   - Wait for it to complete (usually takes 2-3 minutes)

4. **Access your site:**
   - Once deployed, your site will be available at:
   - `https://davidhchng.github.io/hackcamp2025/`

## Notes

- The site will automatically redeploy every time you push to the `main` branch
- The build uses the `/hackcamp2025/` base path, so all routes will work correctly
- Your OpenAI API key (if needed) should be added as a GitHub Secret named `VITE_OPENAI_API_KEY` in repository settings

## Adding GitHub Secret (Optional)

If you want to use the OpenAI API in production:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `VITE_OPENAI_API_KEY`
4. Value: Your OpenAI API key
5. Click **Add secret**

