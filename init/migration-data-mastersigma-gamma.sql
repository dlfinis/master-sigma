CREATE DATABASE  IF NOT EXISTS `mastersigma` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mastersigma`;
-- MySQL dump 10.13  Distrib 5.7.12, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: mastersigma
-- ------------------------------------------------------
-- Server version	5.5.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `url` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `reading` longtext,
  `state` varchar(15) NOT NULL DEFAULT 'create',
  `kind` varchar(255) NOT NULL DEFAULT 'article',
  `creator` int(10) unsigned DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`uid`),
  UNIQUE KEY `uid` (`uid`),
  UNIQUE KEY `url_UNIQUE` (`url`),
  KEY `fk_article_user1_idx` (`creator`),
  CONSTRAINT `fk_article_creator` FOREIGN KEY (`creator`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,'17ac4541-cec2-4259-b8d6-5186d4cfe677','OnePlus 3','El OnePlus 3 basa toda su estrategia comercial en el precio. A nivel rendimiento puro frente a precio, pocos rivales hay con tan buena base. El año pasado sus antecesores, el OnePlus 2 como el OnePlus X, marcaban una nueva vía para la empresa, consagrada hoy con el One Plus 3.','https://hipertextual.com/analisis/oneplus-3','https://i2.wp.com/hipertextual.com/files/2016/07/OnePlus-3-04.jpg?resize=1154%2C575&ssl=1','{\"duration\":\"2 min de lectura\",\"minutes\":1.716,\"time\":102960,\"words\":429}','create','article',1,'2016-07-13 12:27:40','2016-07-13 12:28:01'),(2,'cc8c2ddb-2600-44fc-9cae-7ea62a431311','Pokémon GO recauda 1,6 millones de dólares al día','Que Pokémon GO es un fenómeno casi inexplicable es ya conocido por todos. Hacía mucho tiempo que no veíamos aterrizar un videojuego para smartphone con tanta fuerza en el mercado, revolucionando la industria. En este caso, hemos visto como las acciones de Nintendo subían en un 25% y millones de jugadores se lanzaban a descargar el juego por otros medios al no encontrarse de forma oficial en la tienda de aplicaciones de su país o región.','https://hipertextual.com/2016/07/pokemon-go-records-ingresos-usuarios','/images/post/2.jpeg','{\"duration\":\"2 min de lectura\",\"minutes\":1.752,\"time\":105120,\"words\":438}','create','article',1,'2016-07-13 12:30:29','2016-07-13 12:30:50'),(3,'3480d951-9862-45eb-a2d3-63a1f17694bc','El fin del medio de pago que ha funcionado desde hace casi tres milenios se acerca','De mantenerse las condiciones actuales de temperatura y presión atmosférica, el dinero físico debería comenzar a desaparecer a finales de este año, al menos en Dinamarca. El Banco Central de dicho país ya no fabrica billetes ni monedas desde 2013, y ha invertido muchos recursos en sistemas electrónicos. Además, es probable que en el futuro los daneses prohíban el uso del dinero físico en tiendas de ropa, gasolineras y restaurantes.','http://pulsosocial.com/2016/07/12/fin-medio-de-pago-ha-funcionado-desde-hace-casi-tres-milenios-se-acerca/','http://i0.wp.com/pulsosocial.com/wp-content/uploads/2016/07/Stockphoto-pe%CC%81nzta%CC%81rca-u%CC%88res-pe%CC%81nz-hia%CC%81ny-e1468343963983.jpg','{\"duration\":\"4 min de lectura\",\"minutes\":3.24,\"time\":194400,\"words\":810}','create','article',1,'2016-07-13 12:32:08','2016-07-13 12:35:41'),(4,'e2a7d64b-038d-4f6a-9e1e-1469fd44fb35','El campo argentino se suma al mercado del Comercio Electrónico','El implemento de la tecnología produce cambios en las prácticas de los usuarios y crea demandas a las cuales las empresas deben estar atentas. Las recientes herramientas digitales, el consolidado uso de dispositivos móviles, la conectividad y la expansión del Ecommerce plantean nuevos desafíos a las compañías, para quienes estar en contacto directo con los usuarios sigue siendo el principal objetivo para ofrecer sus productos y/o servicios.  La innovación es indispensable para brindar oportunidades de negocios, pero para que sea útil debe partir de la propia demanda del mercado y principalmente de los clientes. El caso emblemático lo protagoniza, esta vez, el campo, que supo atender las necesidades propias de sus actores y crear una solución siguiendo las tendencias del desarrollo virtual y tecnológico.','http://pulsosocial.com/2016/07/12/campo-argentino-se-suma-al-mercado-del-comercio-electronico/','http://i0.wp.com/pulsosocial.com/wp-content/uploads/2016/07/pexels-photo-66400-e1468335312706.jpeg','{\"duration\":\"4 min de lectura\",\"minutes\":3.648,\"time\":218880,\"words\":912}','create','article',1,'2016-07-13 12:32:54','2016-07-13 12:35:42'),(5,'a1d09155-173b-4d4b-8063-62925f5312d2','El emprendimiento colombiano ‘Bunny Inc.’ ahora es ‘Torre’','Bunny Inc., líder en el almacenamiento y manejo de las voces humanas, rediseña su marca para darle la bienvenida a nuevos productos que revolucionarán el mercado de voces en el mundo.\nReconocido por su innovador marketplace de voces y destacado por proporcionar servicios a clientes de talla mundial como Apple, Disney, Amazon y Spotify, el Emprendimiento colombiano de Alto Impacto Bunny Inc. renueva su marca para convertirse en Torre Technologies.','http://pulsosocial.com/2016/07/11/emprendimiento-colombiano-bunny-inc-ahora-torre/','http://i1.wp.com/pulsosocial.com/wp-content/uploads/2016/05/AlexTania2-e1464320792648.jpg','{\"duration\":\"2 min de lectura\",\"minutes\":1.74,\"time\":104400,\"words\":435}','create','article',1,'2016-07-13 12:33:40','2016-07-13 12:35:42'),(6,'f40fd958-87de-4310-8762-4a8282bef3ea','Hackatón de Campus Party en México consigue Récord Guinness Mundial','El tradicional evento global de tecnología y emprendimiento ha conseguido un importante hito y Latinoamérica es protagonista.En el reciente Campus Party México, celebrado en Guadalajara (Jalisco), se estableció el primer Récord Guiness Mundial para el tradicional evento global de tecnología y emprendimiento gracias a haber realizado la Hackathon más grande del mundo para el desarrollo social.','http://pulsosocial.com/2016/07/11/hackaton-campus-party-mexico-record-guinness-mundial/','http://i0.wp.com/pulsosocial.com/wp-content/uploads/2016/07/27518326474_3c7f90b6e0_k-e1468259474573.jpg','{\"duration\":\"1 min de lectura\",\"minutes\":0.872,\"time\":52320,\"words\":218}','create','article',1,'2016-07-13 12:34:29','2016-07-13 12:35:41'),(7,'3643d7ba-c682-4f42-88da-ee1a791b3782','Siemens crea “Next 47” para recordar que, en algún momento, fue startup','1.000 millones de euros para crear innovación dentro de la tecnológica.\nSiemens crea “Next 47” para recordar que, en algún momento, fue startup\nMicrosoft en 1975, Apple en 1976, Samsung en 1938 o Siemens en 1847 y así con una larga lista de empresas que, a día de hoy, ya forman parte del grupo de las grandes tecnológicas.\nMás recientes o ancianas, algunas mucho más de lo que nos pensamos, todas guardan algo en común: independientemente de la fecha en la que se fundaron, todas fueron startups. Algunas creadas en un garaje, otras en las aulas de universidades o a raíz de empresas familiares, pero todas con la misma historia de creación.','https://hipertextual.com/2016/07/siemens-startups','https://i0.wp.com/hipertextual.com/files/2013/02/fulllength-robotics-header.jpg','{\"duration\":\"3 min de lectura\",\"minutes\":2.236,\"time\":134160.00000000003,\"words\":559}','create','article',1,'2016-07-13 12:35:18','2016-07-13 12:35:40'),(8,'50c4242a-7cdc-4019-99a5-ec957c283da0','La tecnología inalámbrica revolucionará el sistema eléctrico de los coches','¿Cuántos kilómetros de cable crees que puede tener tu coche para poder conectar todos sus sistemas con la centralita?\nLos coches tienen cada vez más sistemas tecnológicos: sensores, dispositivos multimedia, elementos de seguridad, etcétera. Y todos se conectan con la centralita usando muchos kilómetros de cableado, algo que puede sonar muy antiguo si tenemos en cuenta que cada vez más dispositivos pueden conectarse sin cables. ¿Puede la tecnología inalámbrica mejorar este aspecto?','https://hipertextual.com/2016/07/tecnologia-inalambrica-coches','https://i1.wp.com/hipertextual.com/files/2016/07/o-FUTURE-CARS-facebook.jpg','{\"duration\":\"2 min de lectura\",\"minutes\":1.78,\"time\":106800,\"words\":445}','create','article',1,'2016-07-13 12:36:45','2016-07-13 12:41:11'),(9,'f2aa61d0-c204-47e7-ae2d-9059cb922c61','Cómo el email puede aumentar tu estrés y disminuir tu productividad','Cómo el email puede aumentar tu estrés y disminuir tu productividad\n\nLa multitarea es terrible para tu cerebro. Muchos de los que trabajamos frente a un ordenador tenemos una enorme tendencia a distraernos de la tarea actual e interrumpir lo que hacemos en ese momento. Mientras más corto es el tiempo que logramos enfocarnos en una sola cosa, más nos acercamos a ser una de esas personas que creen que pueden hacer mucho a la vez, cuando en realidad tu cerebro solo puede hacer una sola.','https://hipertextual.com/2016/07/email-estres-productividad','https://i0.wp.com/hipertextual.com/files/2014/09/17lmmqriizsepjpg.jpg?resize=610%2C371&ssl=1','{\"duration\":\"3 min de lectura\",\"minutes\":2.168,\"time\":130080.00000000001,\"words\":542}','create','article',1,'2016-07-13 06:37:25','2016-07-11 06:41:11'),(10,'8ed24ac0-2396-4e68-a8e7-22c72471382f','El MIT mezcla un robot, un alga y una rata para crear su nuevo biohíbrido','El nuevo robot biohíbrido creado en los laboratorios del MIT es parte rata, parte alga, parte plástico, parte oro y, encima, tiene forma de pez. ¿Para qué puede servir semejante y extraña quimera?\nParte rata, parte alga, parte robot. Lo que parece el comienzo de una película de serie B es en realidad un diseño real, fruto de la ingeniosa mente de un científico del MIT que ha creado una especie de biohíbrido que imita a un pez raya. Pero, ¿por qué? Como bien dicen en el MIT, porque se puede. Pero ¿tiene alguna aplicación? Como todo en ciencia, es más que probable que sí. Vamos a verlo.','https://hipertextual.com/2016/07/biohibrido','https://i1.wp.com/hipertextual.com/files/2016/07/ratalgot-2-610x343.jpg','{\"duration\":\"4 min de lectura\",\"minutes\":3.02,\"time\":181200,\"words\":755}','create','article',1,'2016-07-13 12:41:29','2016-07-13 12:47:25'),(11,'714a24bb-b3ec-4d27-a931-e8f60da31079','¿Hay crisis en Vine? El servicio ha dejado de crecer, y sus altos cargos abandonan la empresa','Vine fue presentado por Twitter en enero del 2013, y aunque tras cumplir su primer año todo parecía ir viento en popa, en los últimos tiempos parece estar atravesando una silenciosa crisis. La red social de microvídeos no sólo ha dejado de crecer, sino que pierde usuarios, mientras que varios de sus altos ejecutivos están abandonando el barco.\n\nSegún ha podido saber ReCode, hasta 9 altos cargos de la empresa la han abandonado, incluyendo jefes de datos, su gerente de producto o su responsable de ingeniería. Desde Twitter intentan tranquilizar las aguas diciendo que Vine sigue siendo una parte importante de su estrategia, pero eso podría no estar siendo suficiente.','http://www.genbeta.com/redes-sociales-y-comunidades/hay-crisis-en-vine-el-servicio-ha-dejado-de-crecer-y-sus-altos-cargos-abandonan-la-empresa','http://i.blogs.es/974549/9775763965_e8613b65d1_k/1366_2000.jpg','{\"duration\":\"2 min de lectura\",\"minutes\":1.764,\"time\":105840,\"words\":441}','create','article',1,'2016-07-13 12:44:58','2016-07-13 12:47:25'),(12,'7454448a-f6f7-4700-b431-a4f485453e51','Atajos de teclado: por qué (y cómo) deberías aprender a usarlos','Siempre he sido muy fan de los atajos de teclado. Reconozco que son un poco rollo de aprender, sobre todo cuando cambias de programa o incluso de sistema operativo, pero a larga te permiten hacer todo tipo de tareas de forma más rápida y cómoda (con lo que mejoras tu productividad).\n\nNo es que haya que elegir entre usar el ordenador con el ratón o con el teclado, o que quienes utilizan atajos de teclado sean usuarios más avanzados que quienes no lo hacen. Se trata de combinar las dos herramientas, abriéndote a la posibilidad de hacer ciertas tareas con el teclado en lugar de tener que ir a por el ratón, buscar el cursor, seleccionar algo o hacer clic, y luego volver al teclado.','http://www.genbeta.com/herramientas/atajos-de-teclado-por-que-y-como-deberias-aprender-a-usarlos','http://i.blogs.es/ca3cab/teclado/2560_3000.jpg','{\"duration\":\"4 min de lectura\",\"minutes\":3.876,\"time\":232560,\"words\":969}','create','article',1,'2016-07-13 12:50:14','2016-07-13 12:54:22'),(13,'7d2885e6-8692-48e8-8fbc-18c6cc0b7a4a','Microsoft anuncia un nuevo cliente oficial de Skype y la llegada de Skype Web para Linux','La semana pasada os contamos que en la comunidad de Skype se había anunciado que hoy le darían buenas noticias para los usuarios de GNU/Linux. Y así ha sido, porque el equipo de la aplicación de mensajería ha lanzado la versión Alpha de un nuevo cliente oficial para las distros del pingüino, mientras que Skype Web también se hace utilizable en ellas.\n\nSkype vuelve a la vida en Linux después de que su anterior cliente llevase sin actualizarse casi dos años, y lo hace con uno nuevo en el que se implementa la nueva UI de la que ya gozan en el resto de sistemas operativos. Permitirá que los usuarios puedan compartir archivos, fotos y vídeos, e implementa toda una nueva gama de emoticonos.','http://www.genbeta.com/linux/microsoft-anuncia-un-nuevo-cliente-oficial-de-skype-y-la-llegada-de-skype-web-para-linux','http://i.blogs.es/4b7927/linux_call/1366_2000.png','{\"duration\":\"3 min de lectura\",\"minutes\":2.372,\"time\":142320,\"words\":593}','create','article',1,'2016-07-13 12:51:14','2016-07-13 12:54:22'),(14,'ff19c96f-5569-49a3-b6fd-337ee5c48e59','Facebook lifts the veil on its mobile device testing lab','Each rack features its own Wi-Fi signal and each rack is also an EMI enclosure to make sure that neighboring racks can’t pick up the Wi-Fi signals from its neighbors.\nEvery time an engineer makes changes to one of Facebook’s main mobile apps, that new version of the app is automatically tested on these devices to ensure that there are no crashes or performance issues.\nThe available devices run from basic Android Galaxy phones to the latest iPhones. As Reversat noted, these devices also run a number of different versions of their respective operating systems. For Android, that’s all the latest versions from KitKat on, and for iOS, that’s iOS 7 to 9 (I assume the team is also testing iOS 10 already, as well).\nTo ensure that tests are comparable, the phones all reboot after every test.\nAll of the phones also need to be connected to a PC or Mac in order to receive the latest code. Because of this, there are PCs and Mac Mini’s under every rack. Facebook uses eight Mac Minis per rack for iOS testing (because each one can only talk to four iPhones) or four OCP Leopard servers for testing Android devices.\nBut why opt for on-device testing when there are plenty of simulators that would be much easier to handle?\nThe Facebook teams argues that while simulators are good at figuring out why apps may not be working right, they aren’t great for performance testing.','https://techcrunch.com/2016/07/13/facebook-lifts-the-veil-on-its-mobile-device-lab/','https://tctechcrunch2011.files.wordpress.com/2016/07/fb_data_center-4.jpg','{\"duration\":\"3 min de lectura\",\"minutes\":2.536,\"time\":152160,\"words\":634}','create','article',1,'2016-07-13 12:53:56','2016-07-13 12:54:22');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article_categories__category_articles`
--

DROP TABLE IF EXISTS `article_categories__category_articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article_categories__category_articles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_articles` int(10) unsigned NOT NULL,
  `article_categories` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`,`article_categories`,`category_articles`),
  KEY `fk_article_categories__category_articles_article1_idx` (`article_categories`),
  KEY `fk_article_categories__category_articles_category1_idx` (`category_articles`),
  CONSTRAINT `fk_article_categories` FOREIGN KEY (`category_articles`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_category_articles` FOREIGN KEY (`article_categories`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_categories__category_articles`
--

LOCK TABLES `article_categories__category_articles` WRITE;
/*!40000 ALTER TABLE `article_categories__category_articles` DISABLE KEYS */;
INSERT INTO `article_categories__category_articles` VALUES (1,9,1),(2,6,1),(3,9,2),(4,8,2),(5,5,3),(6,9,3),(7,9,4),(8,5,4),(9,4,4),(10,5,5),(11,9,5),(12,2,5),(13,5,6),(14,8,6),(15,5,7),(16,2,7),(17,9,7),(18,2,8),(19,7,8),(20,6,9),(21,2,9),(22,3,9),(23,2,10),(24,7,10),(25,2,11),(26,9,11),(27,6,12),(28,2,13),(29,4,14),(30,2,14),(31,3,14),(32,17,14),(33,18,14);
/*!40000 ALTER TABLE `article_categories__category_articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article_related`
--

DROP TABLE IF EXISTS `article_related`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article_related` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `main` int(10) unsigned NOT NULL,
  `related` int(10) unsigned NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`related`,`main`),
  UNIQUE KEY `article_UNIQUE` (`main`,`related`),
  KEY `fk_main_article_idx` (`main`),
  KEY `fk_related_article_idx` (`related`),
  CONSTRAINT `fk_main_article` FOREIGN KEY (`main`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_related_article` FOREIGN KEY (`related`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_related`
--

LOCK TABLES `article_related` WRITE;
/*!40000 ALTER TABLE `article_related` DISABLE KEYS */;
INSERT INTO `article_related` VALUES (5,9,12,'2016-07-13 12:00:05'),(6,12,9,'2016-07-13 12:00:05'),(7,8,14,'2016-07-13 12:00:05'),(8,14,8,'2016-07-13 12:00:05'),(9,7,6,'2016-07-13 12:00:05'),(10,7,5,'2016-07-13 12:00:05'),(11,7,4,'2016-07-13 12:00:05');
/*!40000 ALTER TABLE `article_related` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Redes','','2016-03-30 23:57:00','2016-03-30 23:57:00'),(2,'Programación','','2016-03-30 23:57:14','2016-03-30 23:57:14'),(3,'Seguridad','','2016-03-30 23:57:30','2016-03-30 23:57:30'),(4,'Base de Datos','','2016-03-30 23:57:46','2016-03-30 23:57:46'),(5,'Emprendimiento','','2016-03-30 23:57:57','2016-03-30 23:57:57'),(6,'Administración','','2016-03-30 23:58:48','2016-03-30 23:58:48'),(7,'Inteligencia Artificial','','2016-04-02 00:01:49','2016-04-02 00:01:49'),(8,'Gamificación','','2016-04-02 00:03:51','2016-04-02 00:03:51'),(9,'Economía','','2016-04-02 00:04:15','2016-04-02 00:04:15'),(11,'Matemáticas','','2016-04-02 00:08:25','2016-04-02 00:08:25'),(12,'Ingeniería','','2016-04-02 00:08:59','2016-04-02 00:08:59'),(13,'Sistemas','','2016-04-02 00:33:40','2016-04-02 00:33:40'),(14,'Software','','2016-04-02 00:49:27','2016-04-02 00:49:27'),(15,'Elearning','','2016-04-02 00:51:39','2016-04-02 00:51:39'),(16,'GNU/Linux','','2016-04-02 00:54:05','2016-04-02 00:54:05'),(17,'Tecnología','','2016-04-02 00:54:05','2016-04-02 00:54:05'),(18,'Información','','2016-04-02 00:54:05','2016-04-02 00:54:05');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `like` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sid` varchar(255) NOT NULL,
  `article` int(10) unsigned NOT NULL,
  `user` int(10) unsigned NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`article`,`user`),
  UNIQUE KEY `sid_UNIQUE` (`sid`),
  KEY `fk_like_article1_idx` (`article`),
  KEY `fk_like_user1_idx` (`user`),
  CONSTRAINT `fk_like_article1` FOREIGN KEY (`article`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_like_user1` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
INSERT INTO `like` VALUES (1,'1127423443985670',1,1,'2016-07-13 12:28:20'),(2,'1127439117317436',14,1,'2016-07-13 13:04:25'),(3,'1127443167317031',12,1,'2016-07-13 13:13:57'),(4,'1127443303983684',8,1,'2016-07-13 13:14:28'),(5,'1127448533983161',5,1,'2016-07-13 13:27:28');
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `share`
--

DROP TABLE IF EXISTS `share`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `share` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sid` varchar(255) NOT NULL,
  `message` text,
  `user` int(10) unsigned NOT NULL,
  `article` int(10) unsigned NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`user`,`article`),
  UNIQUE KEY `sid_UNIQUE` (`sid`),
  KEY `fk_share_user1_idx` (`user`),
  KEY `fk_share_article1_idx` (`article`),
  CONSTRAINT `fk_share_article1` FOREIGN KEY (`article`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_share_user1` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `share`
--

LOCK TABLES `share` WRITE;
/*!40000 ALTER TABLE `share` DISABLE KEYS */;
INSERT INTO `share` VALUES (1,'1023910934336922_1127444230650258','',1,12,'2016-07-13 13:16:57');
/*!40000 ALTER TABLE `share` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `provider` varchar(255) DEFAULT NULL,
  `uid` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `birthday` varchar(10) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `profileUrl` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid_UNIQUE` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'facebook','1023910934336922','Diego F. Leon','male','19/04/1992','dln.finis@gmail.com','Diego','Leon','https://www.facebook.com/app_scoped_user_id/1',NULL,'2016-03-31 01:20:03','2016-03-31 01:20:03'),(2,'facebook','111836912539414','Will Alaacicaffccg Moiduescu',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2016-02-17 13:12:47','2016-02-17 13:12:47'),(3,'facebook','162453457467136','Open Graph Test User',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2016-02-17 15:09:02','2016-02-17 15:09:02'),(4,'facebook','115894715466160','Mark Alaacfhiehhag Huiberg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2016-02-19 12:10:50','2016-02-19 12:10:50');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visit`
--

DROP TABLE IF EXISTS `visit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visit` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user` int(10) unsigned NOT NULL,
  `article` int(10) unsigned NOT NULL,
  `time` float NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`user`,`article`),
  KEY `fk_visita_article_idx` (`article`),
  KEY `fk_visita_user_idx` (`user`),
  CONSTRAINT `fk_visita_article` FOREIGN KEY (`article`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_visita_user` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visit`
--

LOCK TABLES `visit` WRITE;
/*!40000 ALTER TABLE `visit` DISABLE KEYS */;
INSERT INTO `visit` VALUES (1,1,8,406,'2016-07-13 13:11:16'),(2,1,14,1,'2016-07-13 13:13:01'),(3,1,8,1,'2016-07-13 13:14:58'),(4,1,12,54,'2016-07-13 13:15:59'),(5,1,12,36,'2016-07-13 13:17:01'),(6,1,13,33,'2016-07-13 13:17:38'),(7,1,14,18,'2016-07-13 13:20:22'),(8,1,14,23,'2016-07-13 13:20:52'),(9,1,10,20,'2016-07-13 13:21:16'),(10,1,11,21,'2016-07-13 13:21:46'),(11,1,13,27,'2016-07-13 13:22:41'),(12,1,4,17,'2016-07-13 13:23:32'),(13,1,5,17,'2016-07-13 13:23:54'),(14,1,4,25,'2016-07-13 13:25:15'),(15,1,5,106,'2016-07-13 13:27:07'),(16,1,5,19,'2016-07-13 13:27:30'),(17,1,6,33,'2016-07-13 13:28:32'),(18,1,6,22,'2016-07-13 13:28:56');
/*!40000 ALTER TABLE `visit` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-07-13 12:43:58
