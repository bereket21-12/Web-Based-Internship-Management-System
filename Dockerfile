# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN yarn install

# Copy the application code
COPY . .

# Expose the port
EXPOSE 5000

# Define the command to run the application
CMD ["npm", "start"]
