# Build Stage
FROM node:lts-alpine AS build

# Set config for Node and npm
ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV NPM_CONFIG_FUND=false

# Create and change to the app directory
WORKDIR /app

# Copy only package files first for dependency installation
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the app's frontend source code
COPY frontend .

# Build the React app
RUN npm run build

# Final stage - Serving with Caddy
FROM caddy:latest

# Create and move to app directory
WORKDIR /app

# Copy Caddyfile
COPY Caddyfile .

# Copy the built files from the Node build stage
COPY --from=build /app/build /app/dist

# Run Caddy to serve the files in /dist
CMD ["caddy", "run", "--config", "/app/Caddyfile", "--adapter", "caddyfile"]