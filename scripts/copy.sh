#!/bin/bash

if [ -z "$1" ]; then
  echo -e "\nUsage: scripts/copy.sh $1"
  exit 1
fi

# Copy pages
mkdir -p $1/app/pages
cp -n app/pages/{login.js,sent.js,contact.js,settings.js,forgot.js,signup.js,upload.js} $1/app/pages

# Copy actions
mkdir -p $1/app/actions
cp -Rn app/actions/{login,reset,user,contact,upload} $1/app/actions

# Copy filters
mkdir -p $1/app/filters
cp -n app/filters/* $1/app/filters

# Copy config files
mkdir -p $1/app/config
cp -n app/config/* $1/app/config

# Copy layouts
mkdir -p $1/app/layouts
cp -n app/layouts/{default.js,dialog.js} $1/app/layouts
mkdir -p $1/app/assets/img
cp -n app/assets/img/close.svg $1/app/assets/img

# Copy translations
mkdir -p $1/app/locales
cp -n app/locales/* $1/app/locales

# Copy styles
mkdir -p $1/app/assets/scss
cp -n app/assets/scss/{app.scss,dialog.scss} $1/app/assets/scss
