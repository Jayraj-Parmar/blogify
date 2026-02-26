# Use official Node image
FROM node:20-alpine

# Create app directory
WORKDIR /src

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy project files
COPY . .

# Expose app port (change if different)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]