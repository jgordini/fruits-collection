# Deploying to Netlify Using the API

This guide shows you how to deploy your Fruits Collection website to Netlify using the Netlify API directly.

## Prerequisites

- [curl](https://curl.se/) or [Postman](https://www.postman.com/) for making API requests
- A Netlify account
- A Personal Access Token from Netlify

## Step 1: Get a Netlify Personal Access Token

1. Go to [https://app.netlify.com/user/applications](https://app.netlify.com/user/applications)
2. Under "Personal access tokens", click "New access token"
3. Give your token a description (e.g., "Fruits Collection Deployment")
4. Copy the generated token - you'll need it for all API requests

## Step 2: Create a New Site

Using curl to create a new site on Netlify:

```bash
curl -X POST "https://api.netlify.com/api/v1/sites" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fruits-collection",
    "custom_domain": null
  }'
```

This will return a JSON response with site details, including the `site_id` which you'll need for subsequent steps.

## Step 3: Connect to GitHub Repository

Link your Netlify site to your GitHub repository:

```bash
curl -X POST "https://api.netlify.com/api/v1/sites/YOUR_SITE_ID/builds" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "repo": {
      "provider": "github",
      "repo": "jgordini/fruits-collection", 
      "private": false,
      "branch": "main",
      "cmd": "", 
      "dir": "/"
    }
  }'
```

## Step 4: Set Up Continuous Deployment (Optional)

Configure continuous deployment so new pushes to your GitHub repository automatically deploy:

```bash
curl -X POST "https://api.netlify.com/api/v1/sites/YOUR_SITE_ID/service-instances" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "service": "github",
    "repo": "jgordini/fruits-collection",
    "branch": "main"
  }'
```

## Step 5: Check Deployment Status

You can check the status of your deployment:

```bash
curl -X GET "https://api.netlify.com/api/v1/sites/YOUR_SITE_ID" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Step 6: Configure Custom Domain (Optional)

Add a custom domain to your site:

```bash
curl -X POST "https://api.netlify.com/api/v1/sites/YOUR_SITE_ID/domains" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "hostname": "your-custom-domain.com"
  }'
```

## Using the Provided Script

For convenience, we've included a bash script `netlify-api-deploy.sh` in this repository that automates these steps:

1. Download the script from the repository
2. Make it executable: `chmod +x netlify-api-deploy.sh`
3. Set your Netlify token as an environment variable: `export NETLIFY_AUTH_TOKEN=your_token_here`
4. Run the script: `./netlify-api-deploy.sh`

## Using Netlify's JS Client Library

If you prefer using JavaScript, you can use Netlify's official JS client:

```javascript
// Install with: npm install netlify
const NetlifyAPI = require('netlify');

const client = new NetlifyAPI('YOUR_ACCESS_TOKEN');

async function deploySite() {
  // Create a new site
  const site = await client.createSite({
    name: 'fruits-collection'
  });
  
  console.log('Site created:', site);
  
  // Connect to GitHub repo
  await client.updateSite({
    site_id: site.id,
    body: {
      repo: {
        provider: 'github',
        repo: 'jgordini/fruits-collection',
        private: false,
        branch: 'main'
      }
    }
  });
  
  console.log('Site connected to GitHub repository');
}

deploySite().catch(console.error);
```

## Troubleshooting

- If you receive a 401 error, your access token may be invalid or expired
- If you receive a 422 error, check the request body for formatting issues
- For specific error messages, refer to the Netlify API documentation

## References

- [Netlify API Documentation](https://docs.netlify.com/api/get-started/)
- [Netlify JavaScript client](https://github.com/netlify/js-client)
- [GitHub repository API](https://docs.github.com/en/rest/reference)
