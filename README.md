# Build and Dockerize a Full stack React app with (1) Node.js (2) MySQL and (3) Nginx with reverse proxy.

Run `npm i` inside the client directory

Run `npm i` inside the server directory

Run `docker-compose up --build` inside the mainn project directory
****
Access the Adminer using route `http://localhost:8000/`.


To log in, use `mysql_db` as the server Username as `root` and **password** as `MYSQL_ROOT_PASSWORD`.

To start interacting with the application, open `http://localhost:3050/` on a browser.

****
Reference:
1. https://github.com/paullam328/react-docker-eb/blob/main/reverse_proxy/nginx.conf
2. https://github.com/JamesFNGibbons/**RemoteNginxAPI**
3. https://github.com/EGMartins/fullcycle-node-mysql-nginx
4. https://github.com/MarlonFC/docker-proxy-nginx-node-db
5. https://github.com/eoiny1/Basic-Nginx-PHP-Cert-Docker-Compose
6. https://github.com/valtech-sd/docker-nginx-webserver
