FROM php:8.3-apache
RUN docker-php-ext-install pdo pdo_mysql
COPY ./html/api /var/www/html/api
RUN chown -R www-data:www-data /var/www/html
