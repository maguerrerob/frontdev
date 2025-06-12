# Frontdev

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.

## Despliegue sin DockerCompose

1.- Debemos hacer pull de nuestra imagen:
docker pull maguerrerob/front-cont:despliegue
docker pull maguerrerob/backend:despliegue

2.- Creamos una red para los contenedores docker
docker network create app

3.- Creamos los contenedores
docker run -dit --name front -p 80:80 --network app maguerrerob/front-cont:despliegue
docker run -dit --name backend -p 8000:8000 --network app maguerrerob/backend:despliegue

4.- Accedemos al contenedor
docker exec -it front /bin/bash

5.- Actualizamos repositorios
apt update & apt upgrade -y

6.- Instalamos el servicio NGINX y que se active cuando iniciemos la máquina
apt instal nginx -y
service nginx start

7.- Copiamos todo el contenido de la carpeta dist/ a /usr/share/nginx/html
cp -r /frontdev/dist/frontdev/. /usr/share/nginx/html

8.- Editamos la configuracion de NGINX
/etc/nginx/conf.d/default.conf

server {
    listen       80;
    server_name  _;

    # Punto de entrada de la SPA
    root   /usr/share/nginx/html/browser;
    index  index.html;

    # Sirve ficheros existentes y, si no, devuelve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # (Opcional) Si tu backend Django está en otro contenedor y quieres proxy:
    # location /api/ {
    #     proxy_pass http://backend:8000;
    #     proxy_set_header Host $host;
    #     proxy_set_header X-Real-IP $remote_addr;
    #     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    # }
}



x.- Todo el contenido de la carpeta dist dist

## Despliegue con DockerCompose
