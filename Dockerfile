# Build Stage
FROM node:lts-alpine AS build

# Set config for Node and npm
ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV NPM_CONFIG_FUND=false

# Create and change to the app directory
WORKDIR /app

# Copy only package files first for dependency installation
COPY ./frontend/package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the app's frontend source code
COPY ./frontend .

# Build the React app
RUN npm run build

# Final stage - Serving with Nginx
FROM nginx:alpine

# Copy the built files from the Node build stage to Nginx's HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the server
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]