# Use a imagem PHP e Apache como base
FROM php:8.1-apache

# Defina o diretório de trabalho
WORKDIR /var/www

# Atualize os pacotes e instale as dependências necessárias
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libpq-dev 

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

# Build do Angular
WORKDIR /var/www/public
COPY /app /var/www/public


# Expor a porta 80 do contêiner
EXPOSE 80

# Inicialize o servidor Apache
CMD ["apache2-foreground"]
