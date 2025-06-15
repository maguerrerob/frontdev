# Usamos la imagen oficial de Nginx
FROM nginx:stable-alpine

# Copiamos los archivos compilados al directorio donde Nginx sirve contenido estático
COPY dist/frontdev/browser/ /usr/share/nginx/html/

# (Opcional) Si tienes un archivo de configuración personalizado para Nginx, lo copias aquí
# COPY nginx.conf /etc/nginx/nginx.conf

# Exponemos el puerto 80 para HTTP
EXPOSE 80

# Comando para arrancar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]