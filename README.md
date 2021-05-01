# Waveorb Examples

This example Waveorb application showcases a fully working web app with pages, navigation, bundled assets, plugins, middleware, filters, login, signup, emails and more.

The documentation for Waveorb is [found here.](https://waveorb.com/docs.html)

### Installation

```bash
# Install example application
git clone https://github.com/eldoy/waveorb-examples.git

# Go to your the app
cd waveorb-examples

# Install packages
npm i

# Install nodemon
npm i -g nodemon

# Start the development server
npm run dev
```

### Usage

Add login, signup, reset and contact form to your app:
```bash
# Copy pages to your client
mkdir -p ~/src/your-waveorb-app/app/pages
cp app/pages/{login.js,sent.js,contact.js,settings.js,forgot.js,signup.js} ~/src/your-waveorb-app/app/pages/

# Copy actions to your api
mkdir -p ~/src/your-waveorb-app/app/actions
cp -Rv app/actions/{login,reset,user,contact} ~/src/your-waveorb-app/app/actions

# Copy filters to your api
mkdir -p ~/src/your-waveorb-app/app/filters
cp app/filters/* ~/src/your-waveorb-app/app/filters
```

Please [report issues here.](https://github.com/eldoy/waveorb/issues)

Created by [Eldøy Projects.](https://eldoy.com)

Enjoy!