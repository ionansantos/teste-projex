# Use a imagem PHP e Apache como base
FROM php:8.1-apache

# Defina o diretório de trabalho
WORKDIR /var/www/html/api

# Atualize os pacotes e instale as dependências necessárias
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libpq-dev 

# Instale as extensões PHP necessárias
RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable mysqli pdo pdo_mysql

# Copie todos os arquivos do projeto Symfony para o contêiner
COPY . .

# Instale o Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instale as dependências do Symfony usando o Composer
RUN composer install

# Configure o Apache e habilite o mod_rewrite
RUN a2enmod rewrite
COPY apache/apache2.conf /etc/apache2/apache2.conf
COPY apache/000-default.conf /etc/apache2/sites-available/000-default.conf

# Expor a porta 80 do contêiner
EXPOSE 80

# Inicialize o servidor Apache
CMD ["apache2-foreground"]
