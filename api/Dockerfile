# Use Node.js 14 as base image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the rest of the API application files
COPY . .

# Expose port 8000 for the API
EXPOSE 8000

CMD ["npm", "install"]

# Command to start the development server
CMD ["npm", "run", "dev"]
