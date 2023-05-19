# Use an official PHP runtime as a parent image
FROM php:8.1-apache

# Set the working directory
WORKDIR /var/www

RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable mysqli pdo pdo_mysql
RUN chown -R www-data:www-data /var/www

COPY composer.json .
COPY composer.lock .
COPY package*.json ./

COPY --from=composer/composer /usr/bin/composer /usr/bin/composer

RUN cd /etc/apache2/mods-available
RUN a2enmod rewrite
RUN rm -f /etc/apache2/apache2.conf
COPY /apache/apache2.conf /etc/apache2

RUN rm -f /etc/apache2/sites-available/000-default.conf
COPY /apache/000-default.conf /etc/apache2/sites-available/000-default.conf


