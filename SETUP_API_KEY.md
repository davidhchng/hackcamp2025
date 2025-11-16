# Setting Up API Key for GitHub Pages

## ⚠️ Security Warning

**Important:** The API key will be embedded in the built JavaScript files, making it visible to anyone who visits your website. Only use this for demo/testing purposes. Do NOT use a production API key with high rate limits or billing limits.

## Option 1: Using GitHub Secrets (Recommended)

1. **Go to your repository settings:**
   - Navigate to: https://github.com/davidhchng/hackcamp2025/settings/secrets/actions

2. **Add a new secret:**
   - Click "New repository secret"
   - Name: `VITE_OPENAI_API_KEY`
   - Value: Your OpenAI API key
   - Click "Add secret"

3. **The workflow will automatically use it:**
   - The GitHub Actions workflow will use this secret during build
   - The key will be baked into the production bundle

## Option 2: Hardcode in Workflow (For Quick Demo)

The workflow file (`.github/workflows/deploy.yml`) has been updated to include a fallback API key. If you want to use a different key, you can:

1. Edit `.github/workflows/deploy.yml`
2. Replace the API key in the `VITE_OPENAI_API_KEY` environment variable
3. Commit and push

**Note:** This method exposes your key in the repository history. Only use for demo purposes.

## After Setup

1. **Push your changes:**
   ```bash
   git add .
   git commit -m "Configure API key for GitHub Pages"
   git push origin main
   ```

2. **Wait for deployment:**
   - Go to the Actions tab in your repository
   - Wait for the deployment to complete (2-3 minutes)

3. **Test your site:**
   - Visit: https://davidhchng.github.io/hackcamp2025/
   - The AI recommendations should work automatically!

## Monitoring API Usage

Since the key is public, monitor your OpenAI usage:
- Go to: https://platform.openai.com/usage
- Set up usage limits if needed
- Consider setting a monthly spending limit

## Best Practices

- ✅ Use a separate API key for demos
- ✅ Set spending limits on your OpenAI account
- ✅ Monitor usage regularly
- ✅ Rotate keys if needed
- ❌ Don't use production keys
- ❌ Don't commit keys directly to code (use secrets when possible)

