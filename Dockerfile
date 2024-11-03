# Use the Node alpine official image for building the React app
FROM node:lts-alpine AS build

# Set environment variables to disable unwanted notifications
ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV NPM_CONFIG_FUND=false

# Create and change to the app directory
WORKDIR /app

# Copy package files and install dependencies
COPY frontend/package*.json ./
RUN npm ci

# Copy the entire frontend directory contents and build the app
COPY frontend ./
RUN npm run build

# Use Caddy image for serving the app
FROM caddy

# Set working directory in the Caddy container
WORKDIR /app

# Copy the Caddyfile to configure Caddy for serving
COPY Caddyfile ./

# Format Caddyfile (optional but good practice)
RUN caddy fmt Caddyfile --overwrite

# Copy the build files from the first stage
COPY --from=build /app/build ./dist

# Run Caddy to serve the app
CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]
