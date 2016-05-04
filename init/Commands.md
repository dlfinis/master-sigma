## Get Size of Database Mysql
SELECT table_schema `Data Base Name`,
    sum( data_length + index_length ) / 1024 / 1024 `Data Base Size in MB`,
    sum( data_free )/ 1024 / 1024 `Free Space in MB`
FROM information_schema.TABLES
GROUP BY table_schema ;


http://localhost:1337/category?name=Programacion
http://localhost:1337/category?name=Tecnología
http://localhost:1337/category?name=Seguridad Informatica
http://localhost:1337/category?name=Base de Datos


http://localhost:1337/article?title=Bitcoin y secuestro&url=http://www.genbeta.com/seguridad/un-hospital-paga-mas-de-15-000-euros-en-bitcoins-para-recuperar-su-sistema-secuestrado&image=http://i.blogs.es/3ed030/hosp/1366_2000.jpg&description=Esta semana se ha sabido que a principios de febrero, el Centro Médico Presbiteriano de Hollywood sufrió un ataque de este tipo, que dejó su sistema informático inservible. Los autores del ataque bloquearon el acceso a todo el sistema y pidieron un rescate de 40 bitcoins - más de 15.000 euros.&categories=1

http://localhost:1337/article/create?title=Principios Básicos de Seguridad en Bases de Datos&url=http://revista.seguridad.unam.mx/numero-12/principios-b%C3%A1sicos-de-seguridad-en-bases-de-datos&image=http://www.oracle.com/ocom/groups/public/@otn/documents/digitalasset/2183928.png&description=La gran mayoría de los datos sensibles del mundo están almacenados en sistemas gestores de bases de datos comerciales tales como Oracle, Microsoft SQL Server entre otros, y atacar una bases de datos es uno de los objetivos favoritos para los criminales.&categories=2&categories=1&creator=1

http://localhost:1337/article/create?title=Deep Learning podría mejorar los resultados del traductor de Google&url=http://www.genbeta.com/herramientas/asi-es-como-el-deep-learning-podria-mejorar-los-resultados-del-traductor-de-google&image=http://i.blogs.es/092bd5/translate/1366_2000.png&description=Ha pasado menos de un mes desde que los de Mountain View decidieran actualizar su traductor; un remozado que vino con hasta 13 idiomas más y que llevó a Google Translate a superar la barrera de las 100 lenguas. El añadido mejoró, una vez más, la herramienta en cuestión y sirvió para conocer cuáles son los criterios de los que se vale la compañía a la hora de decantarse por uno u otro.&categories=1&categories=2&creator=1




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
      alias /path/to/assets;

          }
  location /assets {
  }
}

....
ln -s /etc/nginx/sites-available/node.conf /etc/nginx/sites-enabled/node.conf       
cp config/ssl/ /etc/nginx/ssl/
mv server nginx


Buffer request headers
request({ method: 'GET', uri: URI ,gzip:true })
  .on('error', function(err) {
      return res.serverError(err);
  })
  .on('response', function(response) {
      if(response && response.statusCode == 200)
      {
          response.destroy();
          response.on('data',function (chunk) {
                    console.log(chunk);
                    return res.json({
                        type:fileType(chunk).mime
                    });
          });
      }
    });

Test perfomance
var startTime = new Date().getTime();
var delta = function(){
  var mn = (new Date().getTime() - startTime )/1000;
  console.log(mn);
};
