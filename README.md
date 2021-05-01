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

Add login, signup, reset, upload and contact form to your app:
```bash
scripts/copy.sh ~/src/your-waveorb-app
```

The script does the following, which you can also do manually to install only what you need:
```bash
# Copy pages
mkdir -p ~/src/your-waveorb-app/app/pages
cp -n app/pages/{login.js,sent.js,contact.js,settings.js,forgot.js,signup.js,upload.js} ~/src/your-waveorb-app/app/pages

# Copy actions
mkdir -p ~/src/your-waveorb-app/app/actions
cp -Rvn app/actions/{login,reset,user,contact,upload} ~/src/your-waveorb-app/app/actions

# Copy filters
mkdir -p ~/src/your-waveorb-app/app/filters
cp -n app/filters/* ~/src/your-waveorb-app/app/filters

# Copy config files
mkdir -p ~/src/your-waveorb-app/app/config
cp -n app/config/* ~/src/your-waveorb-app/app/config

# Copy layouts
mkdir -p ~/src/your-waveorb-app/app/layouts
cp -n app/layouts/{default.js,dialog.js} ~/src/your-waveorb-app/app/layouts
mkdir -p ~/src/your-waveorb-app/app/assets/img
cp -n app/assets/img/close.svg ~/src/your-waveorb-app/app/assets/img

# Copy translations
mkdir -p ~/src/your-waveorb-app/app/locales
cp -n app/locales/* ~/src/your-waveorb-app/app/locales

# Copy styles
mkdir -p ~/src/your-waveorb-app/app/assets/scss
cp -n app/assets/scss/{app.scss,dialog.scss} ~/src/your-waveorb-app/app/assets/scss
```

Please [report issues here.](https://github.com/eldoy/waveorb/issues)

Created by [Eldøy Projects.](https://eldoy.com)

Enjoy!