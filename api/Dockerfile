# Define a imagem base
FROM php:8.1-apache

# Atualiza a lista de pacotes e instala dependências necessárias
RUN apt-get update && apt-get install -y \
    libicu-dev \
    libpq-dev \
    zlib1g-dev \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Instala extensões PHP necessárias
RUN docker-php-ext-install \
    intl \
    pdo \
    pdo_mysql \
    opcache \
    && a2enmod rewrite

# Copia os arquivos do aplicativo para o contêiner
COPY . /var/www/html
COPY apache.conf /etc/apache2/sites-available/000-default.conf

# Define o diretório de trabalho
WORKDIR /var/www/html

# Instala as dependências do Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-scripts --no-autoloader

# Define as permissões corretas
RUN chown -R www-data:www-data /var/www/html

# Expõe a porta do Apachex
EXPOSE 80

# Executa o servidor Apache
CMD ["apache2-foreground"]
