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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,'b56ea9a5-a8c4-4673-9fe4-95944f353383','Deep Learning podría mejorar los resultados del traductor de Google','Ha pasado menos de un mes desde que los de Mountain View decidieran actualizar su traductor; un remozado que vino con hasta 13 idiomas más y que llevó a Google Translate a superar la barrera de las 100 lenguas. El añadido mejoró, una vez más, la herramienta en cuestión y sirvió para conocer cuáles son los criterios de los que se vale la compañía a la hora de decantarse por uno u otro.','http://www.genbeta.com/herramientas/asi-es-como-el-deep-learning-podria-mejorar-los-resultados-del-traductor-de-google','http://i.blogs.es/092bd5/translate/1366_2000.png','{\"duration\":\"2 min de lectura\",\"minutes\":1.292,\"time\":77520,\"words\":323}','create','article',1,'2016-03-31 16:27:14','2016-05-09 14:18:23'),(2,'9fe73ee8-e59d-4d5b-ba5d-e51e45c51301','Microsoft podría presentar un Bash de Linux','Microsoft lleva varios meses dándole amor a Linux como nunca lo ha hecho, ya sea anunciando una versión de SQL Server 2016 para sus distribuciones, añadiendo Red Hat Linux en Azure o incluso uniéndose a la Linux Foundation. Y por si estos movimientos no fueran suficientes, en las últimas horas se ha estado rumoreando que en la Build de esta tarde podría haber más.','http://www.genbeta.com/actualidad/microsoft-podria-presentar-un-bash-de-linux-nativo-para-windows-10-aliandose-con-canonical','http://i.blogs.es/c278ab/20160330_082633/650_1200.jpg','{\"duration\":\"2 min de lectura\",\"minutes\":1.196,\"time\":71759.99999999999,\"words\":299}','create','article',1,'2016-04-01 00:17:26','2016-05-10 08:55:04'),(3,'09ddf091-620e-48e2-9744-8a6a002d864e','Avenida innova en sucursales tomando lo mejor del mundo online y offline','Avenida.com presenta un nuevo modelo de sucursal que combina la opción de retiro de productos con una experiencia presencial más abarcativa. Con el objetivo de continuar generando innovación en las compras online en Argentina, integrando los esquemas de compra online y offline, la compañía renovó su sucursal de Belgrano, en la Ciudad de Buenos Aires.','http://pulsosocial.com/2016/07/08/avenida-innova-en-sucursales-tomando-lo-mejor-del-mundo-online-y-offline/','http://i1.wp.com/pulsosocial.com/wp-content/uploads/2016/07/Sucursal-Belgrano-e1467992630250.jpg','{\"duration\":\"3 min de lectura\",\"minutes\":2.78,\"time\":166799.99999999997,\"words\":695}','edit','article',1,'2016-05-01 23:26:15','2016-07-05 16:16:21'),(6,'b2c12846-7201-4872-8c01-7bded53052e7','Amazon se plantea entrar en la guerra de los mapas con planes para adquirir parte de HERE','Si sois desarrolladores y alguna vez habéis querido probar esta distribución estáis de enhorabuena, porque Red Hat ha anunciado que va a mejorar su programa interno de desarrolladores para ofrecerle la última versión Red Hat Enterprise Linux gratis a todos los que estén registrados. Parece que estos días no sólo Microsoft está a la caza de desarrolladores.','http://www.genbeta.com/actualidad/amazon-se-plantea-entrar-en-la-guerra-de-los-mapas-con-planes-para-adquirir-parte-de-here','http://i.blogs.es/c34696/2560_3000/1366_2000.png','{\"duration\":\"3 min de lectura\",\"minutes\":2.128,\"time\":127680,\"words\":532}','create','article',1,'2016-04-02 00:33:06','2016-06-14 11:42:29'),(7,'9aa049da-c5df-413d-99b0-1e4f97e4175a','Una app ayuda a las personas con discapacidad visual a acceder al transporte público','VoiceOver y TalkBack son las dos nuevas funciones que buscan facilitar el uso de Moovit para la población con discapacidad visual.\n\nSe estima que a nivel mundial hay 285 millones de personas con discapacidad visual, según datos de la Organización Mundial de la Salud (OMS)','http://pulsosocial.com/2016/04/01/una-app-ayuda-personas-discapacidad-visual-acceder-transporte-publico/','http://i0.wp.com/pulsosocial.com/wp-content/uploads/2016/04/bus006-e1459550950784.jpg?fit=990%2C658','{\"duration\":\"3 min de lectura\",\"minutes\":2.94,\"time\":176400,\"words\":735}','create','article',1,'2016-04-02 00:35:07','2016-06-29 21:10:24'),(8,'4e043c0d-af5e-4aa0-a460-880f210a4899','wikiHow adquiere GuideCentral, la startup del argentino Gastón Irigoyen','Con 18 mil guías de productos hechos a mano, desde artesanías hasta tecnología, Guidecentral seguirá siendo una marca independiente.\n\nwikiHow, la web más popular del mundo que explica a los usuarios cómo realizar todo tipo de actividades, anunció la adquisición* de GuideCentral, el destino principalmente móvil para los makers y seguidores del DIY (Hazlo Tú Mismo, por sus siglas en inglés).','http://pulsosocial.com/2016/03/31/wikihow-adquiere-guidecentral-la-startup-del-argentino-gaston-irigoyen/','http://i2.wp.com/pulsosocial.com/wp-content/uploads/2016/03/11088405_816615498393343_878357226645624723_n.png?w=851','{\"duration\":\"2 min de lectura\",\"minutes\":1.58,\"time\":94800.00000000001,\"words\":395}','create','article',1,'2016-04-02 00:37:18','2016-05-05 18:50:10'),(9,'33c4cc71-1d67-40f6-b514-f920502b52ac','Windows 10 nos mostrará las notificaciones de Android gracias a Cortana','Aunque la llegada del Bash de Linux a Windows 10 o la visión de futuro centrada en los bots de Nadella fueron posiblemente dos de las mayores noticias que nos dejó la Keynote inaugural de la Build 2016 de Microsoft, en las conferencias que se han ido realizado durante los días siguientes también hemos tenido una buena dosis de novedades.','http://www.genbeta.com/actualidad/windows-10-nos-mostrara-las-aplicaciones-de-android-gracias-a-cortana','http://i.blogs.es/21870e/untitled/650_1200.png','{\"duration\":\"2 min de lectura\",\"minutes\":1.576,\"time\":94560,\"words\":394}','create','article',1,'2016-04-02 00:41:55','2016-05-05 18:50:09'),(11,'486fad1d-ca2f-4826-985c-41e4144fae4f','VNC Roulette: Miles de sistemas expuestos en Internet, sin protección','VNC (siglas para Virtual Network Computing) es uno de los recursos más poderosos que tiene cualquier administrador a la hora de controlar un ordenador remoto… si sabe lo que está haciendo. Un sistema VNC desplegado sin las medidas de seguridad adecuadas se traduce en PCs abiertas a Internet de punta a punta. VNC Roulette es un nuevo portal que presenta capturas de pantalla y direcciones IP pertenecientes a dichos ordenadores.','http://www.neoteo.com/vnc-roulette-miles-sistemas-expuestos-internet-sin-proteccion','/images/post/2.jpeg','{\"duration\":\"3 min de lectura\",\"minutes\":2.3,\"time\":138000,\"words\":575}','create','article',1,'2016-04-02 00:46:20','2016-05-05 18:50:08'),(12,'efbded7e-d3ee-45be-9a15-42c912d05a81','Intel OverDrive: Los procesadores «recargados» de Intel','Un detalle que los ordenadores de antaño tenían en común era su precio. Había que pensarlo muy bien antes de invertir cientos, o por qué no miles de dólares en un ordenador que se convertiría (para bien o para mal) en otro miembro más de la familia. Todos y cada uno de los componentes eran caros, e incluso las actualizaciones demandaban un cuidadoso análisis. En aquellos años, los usuarios buscaban exprimir al máximo sus configuraciones y hacerlas perdurar en el tiempo, algo diametralmente opuesto a la obsolescencia programada que nos consume hoy.','http://www.neoteo.com/intel-overdrive-los-procesadores-recargados-intel','/images/post/1.jpeg','{\"duration\":\"3 min de lectura\",\"minutes\":2.584,\"time\":155040,\"words\":646}','create','article',1,'2016-04-02 00:48:00','2016-05-05 18:50:08'),(13,'6c5d4619-1007-44ec-a2d2-989e482ca3eb','La nueva ruta de compra multidispositivo','El cliente multidispositivo fragmenta su proceso de compra a través de diferentes instancias y plataformas, y es “la nueva normalidad”.\n\nEl análisis permanente de las 15 millones de solicitudes por segundo que maneja su red de display, permite asegurar a Criteo, con datos concretos, que el comportamiento del cliente online cambió.','http://pulsosocial.com/2016/05/09/nueva-ruta-compra-multidispositivo','/images/post/4.jpeg','{\"duration\":\"4 min de lectura\",\"minutes\":3.212,\"time\":192720,\"words\":803}','disable','article',1,'2016-05-08 16:01:36','2016-06-06 11:24:40'),(14,'8627404f-01c4-4891-9040-429f7df998c5','Usurpación de identidad: la campaña de marketing de Hawkers y Forocoches',' La compañía alicantina les ofrecía fabricar mil lentes a un costo atractivísimo y, claro, los usuarios decidieron entregar el paso y elegir el diseño ganador por votación. Al poco tiempo, aparece un enorme banner de propaganda de Hawkers en Forocoches que anunciaba una angosta cooperación entre el foro de discusión y la compañía.','http://generaciongeek.com/geeks/enganos-y-usurpacion-de-identidad-la-campana-de-marketing-de-hawkers-y-forocoches/','/images/post/8.jpeg','{\"duration\":\"9 min de lectura\",\"minutes\":8.396,\"time\":503760.00000000006,\"words\":2099}','create','article',4,'2016-05-08 16:50:36','2016-05-10 07:13:28'),(15,'3babda37-70f0-4a94-9394-15c557e6c100','First thoughts and a quick setup guide on Bash for Windows','Windows is running Ubuntu user-mode binaries provided by Canonical. This means the command line utilities are the same as those that run within a native Ubuntu environment.\n\nThis is provided as beta software. While many of the coreutil commands provided by Ubuntu will work, there are some that will not. We welcome feedback and will prioritize accordingly. ','https://blogs.windows.com/buildingapps/2016/03/30/run-bash-on-ubuntu-on-windows/','/images/post/10.jpeg','{\"duration\":\"3 min de lectura\",\"minutes\":2.088,\"time\":125280,\"words\":522}','disable','article',3,'2016-05-09 16:51:36','2016-06-17 10:06:02'),(16,'3babda37-70f0-4a94-9394-15c557e6c200','Facebook\'s New Slideshow Feature Almost Leaked My Secret Relationship','If you like the sudden realization that Facebook knows more about you than some of your closest friends, you will love the new Slideshow feature.\n\nWhile checking the Facebook app Wednesday night, I was presented with something worse than those “Good morning, Angela!” notices. Facebook had taken photos from my phone’s album and created a hideous slideshow video. It suggested I share it. ','http://gizmodo.com/facebooks-new-slideshow-feature-almost-leaked-my-secret-1782882117','/images/post/2.jpeg','{\"duration\":\"3 min de lectura\",\"minutes\":2.368,\"time\":142079.99999999997,\"words\":592}','create','article',2,'2016-06-29 16:51:36','2016-06-30 15:16:51'),(17,'8627404f-01c4-4891-9040-429f7df998d6','Por qué Snapchat se ha convertido en una interesante herramienta para el marketing digital','Con 400 millones de usuarios a nivel mundial y 10 mil millones de vistas de video diarias, Snapchat se está convirtiendo en una deseada plataforma para el futuro del marketing digital.\n\nDesde su lanzamiento en 2011 esta red “efímera” ha crecido a gran velocidad, especialmente entre una generación nativa en cuanto al uso del teléfono móvil, y hoy en día el 63% de sus usuarios tiene entre 13 y 24 años, según datos de la compañía.','http://pulsosocial.com/2016/06/16/snapchat-interesante-herramienta-marketing-digital/','http://i1.wp.com/pulsosocial.com/wp-content/uploads/2016/07/man-field-smartphone-yellow-e1467730011567.jpg','{\"duration\":\"3 min de lectura\",\"minutes\":2.104,\"time\":126240.00000000001,\"words\":526}','create','article',2,'2016-07-05 10:51:36','2016-07-05 10:01:04'),(18,'8627404f-01c4-4891-9040-429f7df998a6','Los nuevos talentos prefieren trabajar en startups ¿Por qué?','Generalmente la vida en un startup está asociada a conceptos tales como “horarios flexibles”, “la mesa de ping-pong” o “una oficina más relajada”, aspectos que no reflejan o representan lo que realmente sucede, ni se acercan al espíritu que se respira en un ámbito donde se inicia un emprendimiento.\n\nSi bien no existe una definición única de startup, se la puede considerar como una compañía que tiene un alto potencial de crecimiento a un ritmo muy acelerado y que, además, sostiene una misión ambiciosa para resolver algún problema o necesidad que impacta a muchas personas y organizaciones.','http://pulsosocial.com/2016/07/08/los-nuevos-talentos-prefieren-trabajar-startups/','http://i2.wp.com/pulsosocial.com/wp-content/uploads/2016/07/mars-kid-0317-e1467952371377.jpg','{\"duration\":\"3 min de lectura\",\"minutes\":2.104,\"time\":126240.00000000001,\"words\":526}','create','article',1,'2016-07-08 12:51:36','2016-07-08 12:51:36');
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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_categories__category_articles`
--

LOCK TABLES `article_categories__category_articles` WRITE;
/*!40000 ALTER TABLE `article_categories__category_articles` DISABLE KEYS */;
INSERT INTO `article_categories__category_articles` VALUES (1,1,1),(2,2,1),(4,2,2),(5,1,2),(6,6,2),(7,1,3),(8,3,3),(9,6,3),(13,6,6),(14,1,6),(15,3,6),(16,6,7),(17,3,7),(18,2,7),(19,13,8),(20,6,8),(21,5,8),(22,13,9),(23,1,9),(24,3,9),(27,3,11),(28,1,11),(29,13,11),(30,13,12),(31,15,13),(32,14,13),(33,1,14),(34,13,14),(35,6,15),(36,1,16),(40,5,17),(41,6,17),(42,8,17),(43,9,17),(37,2,18),(38,6,18),(39,9,18);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_related`
--

LOCK TABLES `article_related` WRITE;
/*!40000 ALTER TABLE `article_related` DISABLE KEYS */;
INSERT INTO `article_related` VALUES (1,14,13,'2016-05-08 16:50:36'),(2,14,12,'2016-05-08 16:50:36'),(5,17,16,'2016-07-06 16:51:36'),(6,17,3,'2016-07-06 16:51:36'),(7,17,18,'2016-07-06 16:51:36'),(8,18,17,'2016-07-07 16:51:36'),(9,18,16,'2016-07-07 16:51:36');
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Redes','','2016-03-30 23:57:00','2016-03-30 23:57:00'),(2,'Programación','','2016-03-30 23:57:14','2016-03-30 23:57:14'),(3,'Seguridad','','2016-03-30 23:57:30','2016-03-30 23:57:30'),(4,'Base de Datos','','2016-03-30 23:57:46','2016-03-30 23:57:46'),(5,'Emprendimiento','','2016-03-30 23:57:57','2016-03-30 23:57:57'),(6,'Administración','','2016-03-30 23:58:48','2016-03-30 23:58:48'),(7,'Inteligencia Artificial','','2016-04-02 00:01:49','2016-04-02 00:01:49'),(8,'Gamificación','','2016-04-02 00:03:51','2016-04-02 00:03:51'),(9,'Economía','','2016-04-02 00:04:15','2016-04-02 00:04:15'),(11,'Matemáticas','','2016-04-02 00:08:25','2016-04-02 00:08:25'),(12,'Ingeniería','','2016-04-02 00:08:59','2016-04-02 00:08:59'),(13,'Sistemas','','2016-04-02 00:33:40','2016-04-02 00:33:40'),(14,'Software','','2016-04-02 00:49:27','2016-04-02 00:49:27'),(15,'Elearning','','2016-04-02 00:51:39','2016-04-02 00:51:39'),(16,'GNU/Linux','','2016-04-02 00:54:05','2016-04-02 00:54:05');
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
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
INSERT INTO `like` VALUES (1,'12345',1,1,'2016-03-31 13:18:11'),(2,'1084917731569575',9,1,'2016-05-09 14:05:26'),(3,'1084918538236161',14,1,'2016-05-09 14:06:24'),(4,'1084918571569491',13,1,'2016-05-09 14:06:28'),(6,'257356581319972',15,4,'2016-05-10 07:54:43'),(8,'257359037986393',8,4,'2016-05-10 07:57:33'),(11,'257364931319137',13,1,'2016-05-10 08:04:48'),(13,'257364991319131',14,1,'2016-05-10 08:04:57'),(14,'1010047119063842',15,11,'2016-05-10 09:05:54'),(17,'835553273240408',15,19,'2016-05-10 09:09:31'),(18,'835553313240404',7,19,'2016-05-10 09:09:40'),(19,'1085454064849275',15,14,'2016-05-10 09:15:54'),(24,'1085455391515809',8,1,'2016-05-10 09:19:04'),(27,'10153722340262620',15,14,'2016-05-10 09:33:27'),(28,'10201518870489230',15,16,'2016-05-10 09:43:46'),(30,'279272135795890',15,2,'2016-06-13 00:54:46'),(31,'279272202462550',7,2,'2016-06-13 00:54:57'),(33,'279272462462524',7,1,'2016-06-13 00:55:58'),(34,'279275165795587',6,1,'2016-06-13 00:57:29'),(36,'1072350862830174',7,34,'2016-06-14 11:56:16'),(37,'294079187600774',15,29,'2016-06-14 19:23:43'),(40,'1101760226560660',15,38,'2016-06-14 20:01:29'),(42,'1101770616559621',3,38,'2016-06-14 20:28:25'),(43,'10207924390880118',14,33,'2016-06-14 21:03:23'),(44,'10207924425000971',3,33,'2016-06-14 21:10:10'),(45,'1080587685347376',7,39,'2016-06-14 21:51:08'),(46,'1080602598679218',2,39,'2016-06-14 22:23:42'),(47,'1220649707969822',3,30,'2016-06-14 23:05:41'),(48,'1220651067969686',7,30,'2016-06-14 23:08:29'),(49,'1220653357969457',12,30,'2016-06-14 23:17:26'),(50,'1220662191301907',14,30,'2016-06-14 23:47:37'),(55,'1101899439880072',8,38,'2016-06-15 01:02:54'),(56,'1101903473213002',14,36,'2016-06-15 01:16:19'),(58,'1072737392791521',7,28,'2016-06-15 03:21:18'),(59,'1154527394597420',2,40,'2016-06-17 09:57:53'),(60,'1124735324234747',3,27,'2016-06-17 11:26:20'),(61,'1124735587568054',2,27,'2016-06-17 11:27:10'),(62,'1118017858259562',2,2,'2016-06-30 13:40:35'),(63,'1118018404926174',14,2,'2016-06-30 13:41:56'),(64,'301111900277773',1,4,'2016-06-30 13:44:45'),(65,'1118020624925952',2,1,'2016-06-30 13:47:03'),(67,'1118065584921456',3,10,'2016-06-30 15:26:36'),(68,'1097834436943522',16,1,'2016-06-30 15:28:02'),(69,'1097834896943476',2,10,'2016-06-30 15:29:32'),(72,'1122885254439489',11,1,'2016-07-08 15:41:02'),(73,'1122887394439275',3,1,'2016-07-08 15:47:36'),(74,'1122891911105490',17,1,'2016-07-08 16:01:43'),(75,'1122893001105381',12,1,'2016-07-08 16:04:55'),(76,'1103180896408876',18,10,'2016-07-08 16:37:58'),(78,'1122908981103783',18,1,'2016-07-08 16:45:12');
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `share`
--

LOCK TABLES `share` WRITE;
/*!40000 ALTER TABLE `share` DISABLE KEYS */;
INSERT INTO `share` VALUES (1,'1023910934336922_1084923811568967','Delta',1,14,'2016-05-09 14:17:18'),(2,'1023910934336922_1085350088193006','',1,15,'2016-05-10 06:00:48'),(3,'1023910934336922_1085350291526319','',1,14,'2016-05-10 06:01:33'),(4,'115894715466160_257384957983801','Sigma',4,15,'2016-05-10 08:36:32'),(5,'996441527112742_996444780445750','',17,15,'2016-05-10 09:06:33'),(6,'10153722260832620_10153722299962620','test',11,6,'2016-05-10 09:11:11'),(7,'1173253309386063_1173257229385671','dfg',19,3,'2016-05-10 09:11:39'),(8,'1010046995730521_1010052599063294','',15,7,'2016-05-10 09:16:55'),(9,'835553159907086_835555983240137','',15,6,'2016-05-10 09:17:23'),(10,'1085062728230940_1085075294896350','',15,6,'2016-05-10 09:22:21'),(11,'1205102699530147_1205114852862265','',19,8,'2016-05-10 09:23:02'),(12,'996441527112742_996456577111237','',1,15,'2016-05-10 09:31:27'),(13,'1010046995730521_1010059155729305','',14,15,'2016-05-10 09:33:22'),(14,'10153722260832620_10153722340652620','test',14,15,'2016-05-10 09:33:39'),(15,'835553159907086_835561586572910','',14,15,'2016-05-10 09:33:42'),(16,'10201518863009043_10201518872369277','',16,15,'2016-05-10 09:44:18'),(17,'1023910934336922_1118066294921385','Alfa',1,16,'2016-06-30 15:28:27'),(18,'1008490462544587_1097835050276794','Testing comments',10,14,'2016-06-30 15:30:12'),(19,'1023910934336922_1122892011105480','',1,17,'2016-07-08 16:01:54'),(20,'1008490462544587_1103181199742179','Este artículo es realmente interesante...',10,18,'2016-07-08 16:38:50');
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
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `profileUrl` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid_UNIQUE` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'facebook','1023910934336922','Diego F. Leon','male','dln.finis@gmail.com','Diego','Leon','https://www.facebook.com/app_scoped_user_id/1',NULL,'2016-03-31 01:20:03','2016-03-31 01:20:03'),(2,'facebook','111836912539414','Will Alaacicaffccg Moiduescu',NULL,NULL,NULL,NULL,NULL,NULL,'2016-02-17 13:12:47','2016-02-17 13:12:47'),(3,'facebook','162453457467136','Open Graph Test User',NULL,NULL,NULL,NULL,NULL,NULL,'2016-02-17 15:09:02','2016-02-17 15:09:02'),(4,'facebook','115894715466160','Mark Alaacfhiehhag Huiberg',NULL,NULL,NULL,NULL,NULL,NULL,'2016-02-19 12:10:50','2016-02-19 12:10:50'),(10,NULL,'1008490462544587',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-05-09 16:09:13','2016-05-09 16:09:13'),(11,NULL,'10153722260832620',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-05-10 08:54:05','2016-05-10 08:54:05'),(12,NULL,'1184226491599785',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-05-10 08:54:20','2016-05-10 08:54:20'),(13,NULL,'1031252973626388',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-05-10 08:54:54','2016-05-10 08:54:54'),(14,NULL,'996441527112742',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-05-10 08:56:22','2016-05-10 08:56:22'),(15,NULL,'1085062728230940',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-05-10 08:57:45','2016-05-10 08:57:45'),(16,NULL,'1205102699530147',NULL,'female',NULL,NULL,NULL,NULL,NULL,'2016-05-10 08:58:29','2016-05-10 08:58:29'),(17,NULL,'1173253309386063',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-05-10 09:00:46','2016-05-10 09:00:46'),(18,NULL,'1010046995730521',NULL,'female',NULL,NULL,NULL,NULL,NULL,'2016-05-10 09:05:23','2016-05-10 09:05:23'),(19,NULL,'835553159907086',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-05-10 09:09:03','2016-05-10 09:09:03'),(20,NULL,'10201518863009043',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-05-10 09:39:57','2016-05-10 09:39:57'),(21,NULL,'1051219664953523',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-06-14 11:34:10','2016-06-14 11:34:10'),(22,NULL,'1367388213275003',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-06-14 11:34:30','2016-06-14 11:34:30'),(23,NULL,'1566430263651357',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-06-14 11:35:52','2016-06-14 11:35:52'),(24,NULL,'1033554810063949',NULL,'female',NULL,NULL,NULL,NULL,NULL,'2016-06-14 11:39:40','2016-06-14 11:39:40'),(25,NULL,'1062991480447859',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-06-14 11:39:58','2016-06-14 11:39:58'),(26,NULL,'1113809305349816',NULL,'female',NULL,NULL,NULL,NULL,NULL,'2016-06-14 11:40:49','2016-06-14 11:40:49'),(27,NULL,'1122685311106415',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-06-14 11:41:47','2016-06-14 11:41:47'),(28,NULL,'1072346212830639',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-06-14 11:41:48','2016-06-14 11:41:48'),(29,NULL,'293814624293897',NULL,'female',NULL,NULL,NULL,NULL,NULL,'2016-06-14 11:43:31','2016-06-14 11:43:31'),(30,NULL,'1220309808003812',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-06-14 11:43:32','2016-06-14 11:43:32'),(31,NULL,'1079498402095773',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-06-14 11:45:26','2016-06-14 11:45:26'),(32,NULL,'1098891756839221',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-06-14 11:45:31','2016-06-14 11:45:31'),(33,NULL,'10207921182359907',NULL,'female',NULL,NULL,NULL,NULL,NULL,'2016-06-14 11:46:00','2016-06-14 11:46:00'),(34,NULL,'1195624810456631',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-06-14 11:46:03','2016-06-14 11:46:03'),(35,NULL,'1040273426057980',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-06-14 11:46:11','2016-06-14 11:46:11'),(36,NULL,'1123403277710638',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-06-14 11:46:12','2016-06-14 11:46:12'),(37,NULL,'1019866544729978',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-06-14 11:46:31','2016-06-14 11:46:31'),(38,NULL,'1101758433227506',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-06-14 19:56:22','2016-06-14 19:56:22'),(39,NULL,'1080569232015888',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-06-14 21:21:57','2016-06-14 21:21:57'),(40,NULL,'1154521137931379',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-06-17 09:49:03','2016-06-17 09:49:03'),(41,NULL,'10153735247893481',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-06-17 10:05:38','2016-06-17 10:05:38');
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
) ENGINE=InnoDB AUTO_INCREMENT=224 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visit`
--

LOCK TABLES `visit` WRITE;
/*!40000 ALTER TABLE `visit` DISABLE KEYS */;
INSERT INTO `visit` VALUES (1,1,14,1,'2016-05-09 14:18:36'),(2,1,14,1,'2016-05-09 14:18:58'),(3,1,9,1,'2016-05-09 14:19:28'),(4,1,11,1,'2016-05-09 14:19:47'),(5,10,14,1,'2016-05-09 16:12:53'),(6,10,6,1,'2016-05-09 16:20:10'),(7,10,7,1,'2016-05-09 16:20:46'),(8,10,8,1,'2016-05-09 16:20:57'),(9,10,14,1,'2016-05-09 16:21:06'),(10,10,12,1,'2016-05-09 16:21:13'),(11,10,12,1,'2016-05-09 16:21:19'),(12,10,11,1,'2016-05-09 16:21:26'),(14,10,9,1,'2016-05-09 16:21:37'),(16,10,1,1,'2016-05-09 16:21:54'),(17,1,15,1,'2016-05-09 16:51:59'),(18,1,15,136,'2016-05-10 06:10:25'),(19,1,15,1,'2016-05-10 07:13:36'),(20,1,15,1,'2016-05-10 07:13:56'),(21,1,15,1,'2016-05-10 07:14:05'),(22,1,15,97,'2016-05-10 07:19:11'),(23,4,15,19,'2016-05-10 07:54:45'),(24,4,15,1,'2016-05-10 08:34:07'),(25,4,15,28,'2016-05-10 08:35:07'),(26,4,6,1,'2016-05-10 08:50:00'),(27,15,8,1,'2016-05-10 09:04:51'),(28,14,7,1,'2016-05-10 09:09:06'),(29,14,7,1,'2016-05-10 09:09:25'),(30,11,11,1,'2016-05-10 09:14:08'),(31,11,11,1,'2016-05-10 09:14:34'),(32,11,9,1,'2016-05-10 09:14:46'),(33,11,14,1,'2016-05-10 09:15:18'),(35,11,13,1,'2016-05-10 09:16:01'),(36,15,8,1,'2016-05-10 09:16:03'),(38,11,3,1,'2016-05-10 09:16:32'),(40,11,15,1,'2016-05-10 09:17:27'),(41,17,12,1,'2016-05-10 09:17:49'),(42,17,12,1,'2016-05-10 09:18:14'),(45,17,7,1,'2016-05-10 09:19:23'),(46,18,13,1,'2016-05-10 09:19:43'),(47,11,14,1,'2016-05-10 09:19:51'),(48,11,14,1,'2016-05-10 09:19:59'),(49,17,14,1,'2016-05-10 09:20:26'),(51,17,7,1,'2016-05-10 09:21:24'),(52,17,14,1,'2016-05-10 09:21:40'),(53,17,13,1,'2016-05-10 09:21:48'),(54,17,13,1,'2016-05-10 09:21:57'),(55,17,7,1,'2016-05-10 09:22:36'),(57,11,14,1,'2016-05-10 09:23:56'),(58,11,14,1,'2016-05-10 09:24:56'),(59,11,9,1,'2016-05-10 09:25:08'),(60,14,15,1,'2016-05-10 09:26:49'),(61,11,12,1,'2016-05-10 09:27:48'),(62,11,14,1,'2016-05-10 09:28:02'),(63,11,13,1,'2016-05-10 09:28:06'),(64,11,7,1,'2016-05-10 09:28:09'),(65,11,6,1,'2016-05-10 09:28:14'),(66,18,14,1,'2016-05-10 09:29:52'),(67,11,15,41,'2016-05-10 09:30:24'),(68,11,14,1,'2016-05-10 09:30:31'),(69,11,15,27,'2016-05-10 09:31:08'),(70,16,14,1,'2016-05-10 09:31:16'),(71,11,7,1,'2016-05-10 09:31:16'),(72,15,9,1,'2016-05-10 09:31:26'),(73,14,15,89,'2016-05-10 09:31:34'),(74,18,15,21,'2016-05-10 09:31:46'),(75,16,15,1,'2016-05-10 09:31:58'),(76,1,14,1,'2016-05-10 09:31:58'),(77,17,15,138,'2016-05-10 09:32:05'),(78,19,14,1,'2016-05-10 09:32:10'),(79,17,15,38,'2016-05-10 09:32:48'),(80,17,15,28,'2016-05-10 09:33:16'),(81,11,15,46,'2016-05-10 09:33:47'),(82,17,15,205,'2016-05-10 09:36:43'),(83,14,15,65,'2016-05-10 09:37:28'),(84,20,6,1,'2016-05-10 09:45:26'),(85,15,14,1,'2016-05-10 09:46:10'),(86,15,14,1,'2016-05-10 09:46:19'),(87,15,6,1,'2016-05-10 09:46:48'),(88,20,15,1,'2016-05-10 09:47:34'),(89,15,6,1,'2016-05-10 09:47:47'),(90,20,14,1,'2016-05-10 09:48:14'),(91,20,14,1,'2016-05-10 09:48:20'),(92,15,6,1,'2016-05-10 09:48:35'),(93,16,15,1,'2016-05-10 09:49:03'),(94,20,14,1,'2016-05-10 09:49:14'),(95,20,14,1,'2016-05-10 09:49:24'),(96,20,14,1,'2016-05-10 09:49:30'),(97,15,6,1,'2016-05-10 09:49:44'),(98,10,15,1,'2016-05-13 09:53:01'),(99,10,15,1,'2016-05-13 16:12:18'),(100,10,14,1,'2016-05-13 16:15:00'),(101,10,15,196,'2016-05-13 16:18:28'),(102,1,15,45,'2016-06-03 16:24:31'),(103,1,14,39,'2016-06-03 16:25:13'),(104,1,13,38,'2016-06-03 16:25:56'),(105,1,15,55,'2016-06-03 17:26:15'),(106,1,14,197,'2016-06-03 17:29:36'),(107,1,3,83,'2016-06-03 17:31:13'),(108,1,2,33,'2016-06-03 17:31:50'),(109,1,14,30,'2016-06-03 17:32:28'),(110,1,15,25,'2016-06-06 12:21:54'),(111,1,14,130,'2016-06-06 12:24:10'),(112,1,15,61,'2016-06-06 12:37:45'),(113,1,7,84,'2016-06-06 12:39:15'),(114,1,14,52,'2016-06-06 12:40:20'),(115,1,7,17,'2016-06-06 12:40:48'),(116,1,6,1,'2016-06-06 12:40:55'),(117,1,15,41,'2016-06-06 13:07:52'),(118,1,14,21,'2016-06-06 13:08:22'),(119,1,7,27,'2016-06-06 13:08:54'),(120,1,15,63,'2016-06-10 14:23:04'),(121,1,12,16,'2016-06-10 16:50:55'),(122,1,15,1,'2016-06-10 16:53:23'),(123,1,9,191,'2016-06-10 16:58:08'),(124,1,15,42,'2016-06-10 17:07:31'),(125,1,14,430,'2016-06-10 17:14:44'),(126,1,14,1,'2016-06-10 17:15:01'),(127,1,14,152,'2016-06-13 00:40:17'),(128,1,7,171,'2016-06-13 00:43:21'),(129,2,15,69,'2016-06-13 00:51:09'),(130,10,15,18,'2016-06-13 12:32:34'),(131,10,7,49,'2016-06-13 12:33:28'),(132,10,6,17,'2016-06-13 12:33:50'),(133,10,6,19,'2016-06-13 12:34:22'),(135,10,3,24,'2016-06-13 12:38:36'),(136,22,15,1,'2016-06-14 11:38:32'),(137,22,15,1,'2016-06-14 11:38:41'),(138,22,15,20,'2016-06-14 11:39:15'),(139,22,15,1,'2016-06-14 11:39:20'),(140,25,15,1,'2016-06-14 11:42:50'),(141,22,15,1,'2016-06-14 11:43:42'),(142,23,15,1,'2016-06-14 11:43:46'),(143,22,15,1,'2016-06-14 11:43:52'),(144,22,15,1,'2016-06-14 11:44:00'),(145,30,15,1,'2016-06-14 11:44:37'),(146,32,15,1,'2016-06-14 11:45:42'),(147,22,15,1,'2016-06-14 11:45:50'),(148,22,15,1,'2016-06-14 11:45:59'),(149,30,15,1,'2016-06-14 11:47:38'),(150,31,15,1,'2016-06-14 11:48:07'),(151,28,15,1,'2016-06-14 11:49:21'),(152,24,15,1,'2016-06-14 11:49:50'),(153,35,14,1,'2016-06-14 11:56:36'),(154,33,3,22,'2016-06-14 11:57:05'),(155,27,7,1,'2016-06-14 11:57:10'),(156,35,14,26,'2016-06-14 11:57:23'),(157,23,15,1,'2016-06-14 11:58:28'),(158,38,15,1,'2016-06-14 19:57:24'),(159,38,15,1,'2016-06-14 19:57:26'),(160,38,7,1,'2016-06-14 20:00:47'),(161,38,15,1,'2016-06-14 20:04:03'),(162,38,14,1,'2016-06-14 20:08:26'),(163,38,14,1,'2016-06-14 20:15:31'),(164,38,14,1,'2016-06-14 20:17:20'),(165,38,14,1,'2016-06-14 20:17:22'),(166,38,14,1,'2016-06-14 20:17:35'),(167,38,3,45,'2016-06-14 20:28:32'),(168,38,14,1,'2016-06-14 20:33:08'),(169,38,14,1,'2016-06-14 20:41:39'),(170,33,15,1,'2016-06-14 21:08:36'),(171,33,15,1,'2016-06-14 21:08:44'),(172,33,15,1,'2016-06-14 21:09:13'),(173,33,3,1,'2016-06-14 21:12:22'),(174,39,15,1,'2016-06-14 21:32:00'),(175,39,14,1,'2016-06-14 21:58:00'),(176,39,7,541,'2016-06-14 22:11:54'),(177,39,7,214,'2016-06-14 22:19:42'),(178,39,7,154,'2016-06-14 22:22:34'),(179,23,15,1,'2016-06-14 22:57:39'),(180,30,14,1,'2016-06-14 23:11:23'),(181,30,14,1,'2016-06-14 23:11:42'),(182,30,14,34,'2016-06-14 23:12:37'),(183,30,14,36,'2016-06-14 23:13:42'),(184,30,15,1,'2016-06-14 23:13:49'),(185,30,15,1,'2016-06-14 23:14:06'),(186,30,3,41,'2016-06-14 23:17:10'),(187,30,12,24,'2016-06-14 23:17:40'),(188,23,14,25,'2016-06-14 23:17:46'),(189,30,12,17,'2016-06-14 23:18:07'),(190,23,14,1,'2016-06-14 23:20:33'),(191,23,14,721,'2016-06-14 23:38:30'),(192,23,14,1,'2016-06-14 23:42:43'),(193,23,14,1,'2016-06-14 23:43:17'),(194,23,14,361,'2016-06-14 23:50:55'),(195,36,14,99,'2016-06-15 01:07:02'),(196,36,12,53,'2016-06-15 01:11:23'),(197,36,12,64,'2016-06-15 01:12:40'),(198,36,14,75,'2016-06-15 01:17:16'),(199,36,1,1,'2016-06-15 01:17:40'),(200,36,15,1,'2016-06-15 01:17:54'),(201,36,14,1,'2016-06-15 01:18:16'),(202,28,14,328,'2016-06-15 03:17:25'),(203,34,3,51,'2016-06-16 21:35:25'),(204,34,3,41,'2016-06-16 21:36:14'),(205,40,2,1,'2016-06-17 10:00:01'),(206,40,2,1,'2016-06-17 10:00:13'),(207,41,9,1,'2016-06-17 10:06:42'),(208,1,3,21,'2016-06-20 16:26:27'),(209,10,7,18,'2016-06-20 17:40:34'),(210,1,13,21,'2016-06-30 06:25:05'),(211,1,13,25,'2016-06-30 13:46:39'),(212,1,2,35,'2016-06-30 13:47:19'),(213,1,2,1095,'2016-06-30 14:08:10'),(214,1,2,68,'2016-06-30 14:09:22'),(215,1,14,39,'2016-06-30 14:10:09'),(218,10,3,16,'2016-06-30 15:25:29'),(219,1,16,18,'2016-07-06 16:22:09'),(221,1,17,115,'2016-07-08 16:03:57'),(222,10,18,149,'2016-07-08 16:38:55'),(223,1,18,47,'2016-07-08 16:44:22');
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

-- Dump completed on 2016-07-11 15:40:37
