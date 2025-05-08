/**
 * Netlify API Deployment Script (Node.js version)
 * 
 * This script deploys the Fruits Collection site to Netlify using their API
 * 
 * Usage:
 * 1. Install dependencies: npm install node-fetch
 * 2. Set your Netlify token: export NETLIFY_AUTH_TOKEN=your_token_here
 * 3. Run: node netlify-deploy.js
 */

const fetch = require('node-fetch') || globalThis.fetch;

// Configuration
const config = {
  netlifySiteRepo: 'jgordini/fruits-collection',
  netlifySiteName: 'fruits-collection',
  netlifySiteBranch: 'main',
  deployDir: '/',  // Root directory
  buildCommand: '' // No build command needed for simple HTML/CSS
};

// Get auth token from environment
const authToken = process.env.NETLIFY_AUTH_TOKEN;
if (!authToken) {
  console.error('Error: NETLIFY_AUTH_TOKEN environment variable not set.');
  console.error('Please set your Netlify token: export NETLIFY_AUTH_TOKEN=your_token_here');
  console.error('You can create a token at https://app.netlify.com/user/applications');
  process.exit(1);
}

// Netlify API base URL
const apiUrl = 'https://api.netlify.com/api/v1';

// Headers for all requests
const headers = {
  'Authorization': `Bearer ${authToken}`,
  'Content-Type': 'application/json'
};

/**
 * Deploy site to Netlify
 */
async function deploySite() {
  try {
    console.log('🚀 Starting deployment to Netlify...');
    
    // Step 1: Create a new site
    console.log('📝 Creating new site on Netlify...');
    const siteResponse = await fetch(`${apiUrl}/sites`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: config.netlifySiteName,
        custom_domain: null
      })
    });
    
    if (!siteResponse.ok) {
      throw new Error(`Failed to create site: ${await siteResponse.text()}`);
    }
    
    const siteData = await siteResponse.json();
    console.log(`✅ Site created successfully! Site ID: ${siteData.id}`);
    console.log(`🌐 Site URL: ${siteData.ssl_url || siteData.url}`);
    
    // Step 2: Connect to GitHub repository
    console.log('🔄 Connecting site to GitHub repository...');
    const buildResponse = await fetch(`${apiUrl}/sites/${siteData.id}/builds`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        repo: {
          provider: 'github',
          repo: config.netlifySiteRepo,
          private: false,
          branch: config.netlifySiteBranch,
          cmd: config.buildCommand,
          dir: config.deployDir
        }
      })
    });
    
    if (!buildResponse.ok) {
      throw new Error(`Failed to connect to GitHub: ${await buildResponse.text()}`);
    }
    
    console.log('✅ Successfully connected to GitHub repository');
    
    // Step 3: Set up continuous deployment
    console.log('🔄 Setting up continuous deployment...');
    const cdResponse = await fetch(`${apiUrl}/sites/${siteData.id}/service-instances`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        service: 'github',
        repo: config.netlifySiteRepo,
        branch: config.netlifySiteBranch
      })
    });
    
    if (!cdResponse.ok) {
      console.warn(`⚠️ Warning: Failed to set up continuous deployment: ${await cdResponse.text()}`);
      console.warn('You may need to set this up manually in the Netlify dashboard.');
    } else {
      console.log('✅ Continuous deployment configured successfully');
    }
    
    // Success message
    console.log('\n🎉 Deployment process complete!');
    console.log(`Your site should be available at: ${siteData.ssl_url || siteData.url}`);
    console.log(`You can check deployment status at: https://app.netlify.com/sites/${siteData.name}/deploys`);
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

// Execute the deployment
deploySite();
