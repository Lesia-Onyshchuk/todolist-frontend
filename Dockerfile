# 1. Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the project
RUN npm run build

# 2. Production stage
FROM nginx:stable-alpine

# Copy built files from the previous stage to nginx's public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Copy custom nginx configuration if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
