#!/bin/bash

# This script is used to start the development server for the React backend API.

# Load environment variables from .env file
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# Start the development server
ts-node src/index.ts