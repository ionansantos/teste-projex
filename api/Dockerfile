# Use an official PHP runtime as a parent image
FROM php:7.4-apache

# Set the working directory
WORKDIR /var/www/html

# Copy the contents of the Symfony project to the container
COPY . /var/www/html

# Install the required PHP extensions
RUN docker-php-ext-install pdo_mysql

# Expose the port 80
EXPOSE 80
