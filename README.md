# Fruits Collection

A beautiful gallery of delicious fruits with descriptions and images.

## Description

This project showcases various fruits in a responsive grid layout. Each fruit card includes:
- A high-quality image
- The fruit name
- A brief description of the fruit

## Technologies Used

- HTML5
- CSS3 (with Grid Layout)
- Responsive design

## Live Demo

The site is published using GitHub Pages and can be viewed at: [https://jgordini.github.io/fruits-collection/](https://jgordini.github.io/fruits-collection/)

## Features

- Responsive grid layout that adapts to different screen sizes
- Beautiful fruit images from Unsplash
- Clean, modern design with subtle shadows and rounded corners

## Deployment Options

This repository provides multiple ways to deploy the site to Netlify:

### 1. Netlify UI Deployment

See the [NETLIFY.md](NETLIFY.md) file for instructions on deploying through the Netlify user interface.

### 2. Netlify API Deployment

Three options are available for API-based deployment:

- **Bash Script**: Use [netlify-api-deploy.sh](netlify-api-deploy.sh) to deploy with a simple shell script
- **Node.js Script**: Use [netlify-deploy.js](netlify-deploy.js) to deploy with JavaScript
- **Manual API Calls**: Follow the detailed guide in [NETLIFY-API-GUIDE.md](NETLIFY-API-GUIDE.md) for step-by-step API calls

All options require a Netlify personal access token that you can generate at [https://app.netlify.com/user/applications](https://app.netlify.com/user/applications).

To use the Node.js script:
```bash
# Install dependencies
npm install

# Set your Netlify token
export NETLIFY_AUTH_TOKEN=your_token_here

# Run the deployment script
npm run deploy
```

## Setup for Local Development

No setup required! Simply open the index.html file in your browser.

## License

This project uses images from Unsplash which are free to use under the Unsplash license.
