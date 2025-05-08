#!/bin/bash
# Netlify API Deployment Script
# This script deploys your site to Netlify using the Netlify API

# Step 1: Install Netlify CLI if not already installed
if ! command -v netlify &> /dev/null; then
    echo "Installing Netlify CLI..."
    npm install netlify-cli -g
fi

# Step 2: Get a Netlify personal access token
# You need to create this token at https://app.netlify.com/user/applications
# and set it as an environment variable
if [ -z "$NETLIFY_AUTH_TOKEN" ]; then
    echo "Please set your Netlify auth token:"
    echo "export NETLIFY_AUTH_TOKEN=your_token_here"
    echo "You can create a token at https://app.netlify.com/user/applications"
    exit 1
fi

# Step 3: Create a new site using the API
echo "Creating new site on Netlify..."
RESPONSE=$(curl -s -X POST "https://api.netlify.com/api/v1/sites" \
    -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"name": "fruits-collection", "custom_domain": null}')

# Extract site ID and site name from response
SITE_ID=$(echo $RESPONSE | grep -o '"id":"[^"]*' | cut -d'"' -f4)
SITE_NAME=$(echo $RESPONSE | grep -o '"name":"[^"]*' | cut -d'"' -f4)
SITE_URL=$(echo $RESPONSE | grep -o '"url":"[^"]*' | cut -d'"' -f4)

if [ -z "$SITE_ID" ]; then
    echo "Failed to create site. Response:"
    echo $RESPONSE
    exit 1
fi

echo "Site created successfully!"
echo "Site ID: $SITE_ID"
echo "Site Name: $SITE_NAME"
echo "Site URL: $SITE_URL"

# Step 4: Link the site to your GitHub repository
echo "Connecting site to GitHub repository..."
curl -s -X POST "https://api.netlify.com/api/v1/sites/$SITE_ID/builds" \
    -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "repo": {
            "provider": "github",
            "repo": "jgordini/fruits-collection", 
            "private": false,
            "branch": "main",
            "cmd": "", 
            "dir": "/", 
            "functions_dir": null
        }
    }'

echo "Build triggered! Your site will be available at: $SITE_URL"
echo "You can also check your site status at: https://app.netlify.com/sites/$SITE_NAME"

# Step 5: Set up continuous deployment (optional but recommended)
echo "Setting up continuous deployment..."
curl -s -X POST "https://api.netlify.com/api/v1/sites/$SITE_ID/service-instances" \
    -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "service": "github",
        "repo": "jgordini/fruits-collection",
        "branch": "main"
    }'

echo "Deployment via API complete! Your fruits collection site should be live shortly."
