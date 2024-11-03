# Use an official Node.js image as the base
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only the package files first for better caching
COPY frontend/package*.json ./

# Install dependencies, omitting dev dependencies
RUN npm ci --omit=dev

# Copy the rest of the application code
COPY frontend .

# Build the React app
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

# Serve the app using a static server
CMD ["npx", "serve", "-s", "build"]
