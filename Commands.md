http://localhost:1337/category?name=Programacion
http://localhost:1337/category?name=Tecnología
http://localhost:1337/category?name=Seguridad Informatica
http://localhost:1337/category?name=Base de Datos


http://localhost:1337/article?title=Bitcoin y secuestro&url=http://www.genbeta.com/seguridad/un-hospital-paga-mas-de-15-000-euros-en-bitcoins-para-recuperar-su-sistema-secuestrado&image=http://i.blogs.es/3ed030/hosp/1366_2000.jpg&description=Esta semana se ha sabido que a principios de febrero, el Centro Médico Presbiteriano de Hollywood sufrió un ataque de este tipo, que dejó su sistema informático inservible. Los autores del ataque bloquearon el acceso a todo el sistema y pidieron un rescate de 40 bitcoins - más de 15.000 euros.&categories=1

http://localhost:1337/article?title=Principios Básicos de Seguridad en Bases de Datos&url=http://revista.seguridad.unam.mx/numero-12/principios-b%C3%A1sicos-de-seguridad-en-bases-de-datos&image=http://www.oracle.com/ocom/groups/public/@otn/documents/digitalasset/2183928.png&description=La gran mayoría de los datos sensibles del mundo están almacenados en sistemas gestores de bases de datos comerciales tales como Oracle, Microsoft SQL Server entre otros, y atacar una bases de datos es uno de los objetivos favoritos para los criminales.&categories=3&categories=4

http://localhost:1337/article?title=Play Store y los Colegios&url=http://hipertextual.com/2016/02/play-store-para-la-educacion&image=http://i1.wp.com/hipertextual.com/files/2014/11/educacion-y-tecnologia.jpg&description=A pesar de que Play Store para la educación se presentó como un puerta abierta para el uso de los tablets Android en los colegios e instituciones educativas, parece que la compañía, en su new age de reposicionar servicios y aplicaciones, se ha pensado mejor su estrategia para el mercado educativo, y ha confirmado que cerrará tu Play Store para la educación y replanteará su estrategia para este segmento de mercado.&categories=1&categories=2




NODE_TLS_REJECT_UNAUTHORIZED = "0"

  ssl: {
    ca: require('fs').readFileSync(__dirname + '/ssl/server.crt'),
    key: require('fs').readFileSync(__dirname + '/ssl/server.key'),
    cert: require('fs').readFileSync(__dirname + '/ssl/server.crt')
  },


Install nginx

File /etc/nginx/sites-avaliable/node.conf
....
server {

        listen 80;
        listen 443 ssl;

        ssl_certificate /etc/nginx/ssl/nginx.crt;
        ssl_certificate_key /etc/nginx/ssl/nginx.key;

        server_name sigma.com;
        location / {
                proxy_set_header   X-Forwarded-For $remote_addr;
                proxy_set_header   Host $http_host;
                proxy_pass         http://127.0.0.1:1337;
#               alias /path/to/assets;
#               access_log off;
#               expires max;
        }
}
....
ln -s /etc/nginx/sites-available/node.conf /etc/nginx/sites-enabled/node.conf       
cp config/ssl/ /etc/nginx/ssl/
mv server nginx
