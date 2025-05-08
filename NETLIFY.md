# Deploying to Netlify

This document provides step-by-step instructions for deploying this project to Netlify.

## Option 1: Deploy via Netlify UI (Recommended)

1. Go to [Netlify's website](https://www.netlify.com/) and sign in (or create an account if you don't have one)
2. From the Netlify dashboard, click the "Add new site" button and select "Import an existing project"
3. Choose "Deploy with GitHub" (you'll need to authorize Netlify to access your GitHub account if you haven't already)
4. Select the `fruits-collection` repository from the list
5. In the deployment settings, you can leave everything as default since we have a `netlify.toml` file
6. Click "Deploy site"

That's it! Netlify will build and deploy your site. Once deployed, Netlify will provide you with a random URL (like `https://random-words-12345.netlify.app`).

## Option 2: Deploy via Netlify CLI

If you prefer using a command line tool:

1. Install Netlify CLI globally:
   ```
   npm install netlify-cli -g
   ```

2. Clone your repository locally:
   ```
   git clone https://github.com/jgordini/fruits-collection.git
   cd fruits-collection
   ```

3. Login to Netlify:
   ```
   netlify login
   ```

4. Initialize Netlify in this repository:
   ```
   netlify init
   ```

5. Follow the prompts to create a new site or connect to an existing one

6. Deploy your site:
   ```
   netlify deploy --prod
   ```

## Custom Domain

To use a custom domain for your site:

1. Navigate to the "Domain settings" for your site in the Netlify dashboard
2. Click "Add custom domain"
3. Follow the instructions to set up your domain with Netlify

## Continuous Deployment

Netlify automatically sets up continuous deployment. Any changes pushed to your main branch will trigger a new deployment.
