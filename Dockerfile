

# Use the official nginx image as the base
FROM nginx:alpine

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Copy the HTML, CSS, and JS files into the container
COPY . .

# Expose port 80 to make the app accessible
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
