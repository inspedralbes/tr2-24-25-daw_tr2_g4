# Usar la imagen base oficial de PHP con FPM
FROM php:8.2-fpm



# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiar el proyecto al contenedor
WORKDIR /var/www/html
COPY . .

# Establecer permisos para Laravel
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache
