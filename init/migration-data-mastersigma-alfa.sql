CREATE DATABASE  IF NOT EXISTS `mastersigma` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mastersigma`;
-- MySQL dump 10.13  Distrib 5.7.12, for Linux (x86_64)
--
-- Host: localhost    Database: mastersigma
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,'b56ea9a5-a8c4-4673-9fe4-95944f353383','Deep Learning podría mejorar los resultados del traductor de Google','Ha pasado menos de un mes desde que los de Mountain View decidieran actualizar su traductor; un remozado que vino con hasta 13 idiomas más y que llevó a Google Translate a superar la barrera de las 100 lenguas. El añadido mejoró, una vez más, la herramienta en cuestión y sirvió para conocer cuáles son los criterios de los que se vale la compañía a la hora de decantarse por uno u otro.','http://www.genbeta.com/herramientas/asi-es-como-el-deep-learning-podria-mejorar-los-resultados-del-traductor-de-google','http://i.blogs.es/092bd5/translate/1366_2000.png','{\"duration\":\"2 min de lectura\",\"minutes\":1.292,\"time\":77520,\"words\":323}','create','article',1,'2016-03-31 16:27:14','2016-05-09 14:18:23'),(2,'9fe73ee8-e59d-4d5b-ba5d-e51e45c51301','Microsoft podría presentar un Bash de Linux','Microsoft lleva varios meses dándole amor a Linux como nunca lo ha hecho, ya sea anunciando una versión de SQL Server 2016 para sus distribuciones, añadiendo Red Hat Linux en Azure o incluso uniéndose a la Linux Foundation. Y por si estos movimientos no fueran suficientes, en las últimas horas se ha estado rumoreando que en la Build de esta tarde podría haber más.','http://www.genbeta.com/actualidad/microsoft-podria-presentar-un-bash-de-linux-nativo-para-windows-10-aliandose-con-canonical','http://i.blogs.es/c278ab/20160330_082633/650_1200.jpg','{\"duration\":\"2 min de lectura\",\"minutes\":1.196,\"time\":71759.99999999999,\"words\":299}','create','article',1,'2016-04-01 00:17:26','2016-05-10 08:55:04'),(3,'09ddf091-620e-48e2-9744-8a6a002d864e','Día Mundial del Backup: ¿Cómo resguardar tus archivos?','ESET recuerda la importancia de hacer copias de seguridad de la información para protegerla y que no desaparezca.\n\nLa información es uno de los activos más importantes para los usuarios, por lo tanto, realizar un procedimiento de resguardo de información considerando los medios de almacenamiento y la frecuencia de respaldo, resulta fundamental para proteger correctamente todos los archivos.','http://pulsosocial.com/2016/03/31/dia-mundial-del-backup-como-resguardar-tus-archivos/','http://i0.wp.com/pulsosocial.com/wp-content/uploads/2016/03/20160219104319-other-technology-e1459465468123.jpg?fit=990%2C743','{\"duration\":\"3 min de lectura\",\"minutes\":2.78,\"time\":166799.99999999997,\"words\":695}','create','article',1,'2016-04-01 23:26:15','2016-05-10 08:55:06'),(4,'ee85e821-db85-4449-a97a-b286b57c60ee','Woofbox te envía a domicilio cajas con innovadores productos para tu perro','Los hermanos Julia y Eugenio Pacareu están detrás de esta iniciativa llena de amor, ternura y pasión por los animales.\n\nMediante una sencilla suscripción, puedes recibir en casa una caja de forma inmediata, trimestral o semestral con alimentos, juguetes y accesorios únicos y originales pensados para tus mascotas. Además, con tu compra estarás ayudando a la Fundación Vidanimal.','http://pulsosocial.com/2016/03/31/woofbox-te-envia-cajas-con-innovadores-productos-para-tu-perro-a-domicilio/','http://i2.wp.com/pulsosocial.com/wp-content/uploads/2016/03/night-animal-dog-pet-e1459432176382.jpg?fit=990%2C660','{\"duration\":\"3 min de lectura\",\"minutes\":2.468,\"time\":148079.99999999997,\"words\":617}','create','article',1,'2016-04-02 00:22:40','2016-05-10 08:55:06'),(5,'d78b03dc-3e1d-4a44-9fd8-8815ed39ec4a','Las nuevas aplicaciones (API) amenazan a cualquier negocio tradicional','\"Si usted está en un negocio debe preguntarse ¿cuál es el \"Uber\" de su segmento de negocios?\", dijo Chris Rowett de CA Technologies.\n\nLos negocios tradicionales deben preguntarse cuál es el ‘Uber’ de su segmento, o “quién va a entrar a su mercado con un nuevo software para afectar su negocio”, advirtió Chris Rowett, vicepresidente de ventas especializadas en tecnología y entrega de aplicaciones en CA Technologies.','http://pulsosocial.com/2016/03/21/las-nuevas-aplicaciones-api-amenazan-a-cualquier-negocio-tradicional/','http://i2.wp.com/pulsosocial.com/wp-content/uploads/2016/03/mobile_apps_post.jpg?w=990','{\"duration\":\"4 min de lectura\",\"minutes\":3.348,\"time\":200880,\"words\":837}','create','article',1,'2016-04-02 00:31:20','2016-05-05 18:50:11'),(6,'b2c12846-7201-4872-8c01-7bded53052e7','Amazon se plantea entrar en la guerra de los mapas con planes para adquirir parte de HERE','Si sois desarrolladores y alguna vez habéis querido probar esta distribución estáis de enhorabuena, porque Red Hat ha anunciado que va a mejorar su programa interno de desarrolladores para ofrecerle la última versión Red Hat Enterprise Linux gratis a todos los que estén registrados. Parece que estos días no sólo Microsoft está a la caza de desarrolladores.','http://www.genbeta.com/actualidad/amazon-se-plantea-entrar-en-la-guerra-de-los-mapas-con-planes-para-adquirir-parte-de-here','http://i.blogs.es/c34696/2560_3000/1366_2000.png','{\"duration\":\"3 min de lectura\",\"minutes\":2.128,\"time\":127680,\"words\":532}','create','article',1,'2016-04-02 00:33:06','2016-05-05 18:50:10'),(7,'9aa049da-c5df-413d-99b0-1e4f97e4175a','Una app ayuda a las personas con discapacidad visual a acceder al transporte público','VoiceOver y TalkBack son las dos nuevas funciones que buscan facilitar el uso de Moovit para la población con discapacidad visual.\n\nSe estima que a nivel mundial hay 285 millones de personas con discapacidad visual, según datos de la Organización Mundial de la Salud (OMS)','http://pulsosocial.com/2016/04/01/una-app-ayuda-personas-discapacidad-visual-acceder-transporte-publico/','http://i0.wp.com/pulsosocial.com/wp-content/uploads/2016/04/bus006-e1459550950784.jpg?fit=990%2C658','{\"duration\":\"3 min de lectura\",\"minutes\":2.94,\"time\":176400,\"words\":735}','create','article',1,'2016-04-02 00:35:07','2016-05-05 18:50:11'),(8,'4e043c0d-af5e-4aa0-a460-880f210a4899','wikiHow adquiere GuideCentral, la startup del argentino Gastón Irigoyen','Con 18 mil guías de productos hechos a mano, desde artesanías hasta tecnología, Guidecentral seguirá siendo una marca independiente.\n\nwikiHow, la web más popular del mundo que explica a los usuarios cómo realizar todo tipo de actividades, anunció la adquisición* de GuideCentral, el destino principalmente móvil para los makers y seguidores del DIY (Hazlo Tú Mismo, por sus siglas en inglés).','http://pulsosocial.com/2016/03/31/wikihow-adquiere-guidecentral-la-startup-del-argentino-gaston-irigoyen/','http://i2.wp.com/pulsosocial.com/wp-content/uploads/2016/03/11088405_816615498393343_878357226645624723_n.png?w=851','{\"duration\":\"2 min de lectura\",\"minutes\":1.58,\"time\":94800.00000000001,\"words\":395}','create','article',1,'2016-04-02 00:37:18','2016-05-05 18:50:10'),(9,'33c4cc71-1d67-40f6-b514-f920502b52ac','Windows 10 nos mostrará las notificaciones de Android gracias a Cortana','Aunque la llegada del Bash de Linux a Windows 10 o la visión de futuro centrada en los bots de Nadella fueron posiblemente dos de las mayores noticias que nos dejó la Keynote inaugural de la Build 2016 de Microsoft, en las conferencias que se han ido realizado durante los días siguientes también hemos tenido una buena dosis de novedades.','http://www.genbeta.com/actualidad/windows-10-nos-mostrara-las-aplicaciones-de-android-gracias-a-cortana','http://i.blogs.es/21870e/untitled/650_1200.png','{\"duration\":\"2 min de lectura\",\"minutes\":1.576,\"time\":94560,\"words\":394}','create','article',1,'2016-04-02 00:41:55','2016-05-05 18:50:09'),(10,'0c330405-0276-40fb-837c-e18bbcfdb1fc','Otro tribunal aleman vuelve a darle la razón a Adblock: bloquear anuncios es legal','A la guerra contra los bloqueadores de publicidad se han sumado tanto algunos gigantes online como Google o Yahoo como muchos otros medios digitales internacionales. Esta situación ha abierto un intenso debate, y grandes titanes de la tecnología como Facebook ya han expresado su preocupación ante el crecimiento de estos programas de bloqueo.','http://www.genbeta.com/actualidad/otro-tribunal-aleman-vuelve-a-darle-la-razon-a-adblock-bloquear-anuncios-es-legal','/images/post/6.jpeg','{\"duration\":\"2 min de lectura\",\"minutes\":1.668,\"time\":100080,\"words\":417}','create','article',1,'2016-04-02 00:44:31','2016-05-05 18:50:09'),(11,'486fad1d-ca2f-4826-985c-41e4144fae4f','VNC Roulette: Miles de sistemas expuestos en Internet, sin protección','VNC (siglas para Virtual Network Computing) es uno de los recursos más poderosos que tiene cualquier administrador a la hora de controlar un ordenador remoto… si sabe lo que está haciendo. Un sistema VNC desplegado sin las medidas de seguridad adecuadas se traduce en PCs abiertas a Internet de punta a punta. VNC Roulette es un nuevo portal que presenta capturas de pantalla y direcciones IP pertenecientes a dichos ordenadores.','http://www.neoteo.com/vnc-roulette-miles-sistemas-expuestos-internet-sin-proteccion','/images/post/2.jpeg','{\"duration\":\"3 min de lectura\",\"minutes\":2.3,\"time\":138000,\"words\":575}','create','article',1,'2016-04-02 00:46:20','2016-05-05 18:50:08'),(12,'efbded7e-d3ee-45be-9a15-42c912d05a81','Intel OverDrive: Los procesadores «recargados» de Intel','Un detalle que los ordenadores de antaño tenían en común era su precio. Había que pensarlo muy bien antes de invertir cientos, o por qué no miles de dólares en un ordenador que se convertiría (para bien o para mal) en otro miembro más de la familia. Todos y cada uno de los componentes eran caros, e incluso las actualizaciones demandaban un cuidadoso análisis. En aquellos años, los usuarios buscaban exprimir al máximo sus configuraciones y hacerlas perdurar en el tiempo, algo diametralmente opuesto a la obsolescencia programada que nos consume hoy.','http://www.neoteo.com/intel-overdrive-los-procesadores-recargados-intel','/images/post/1.jpeg','{\"duration\":\"3 min de lectura\",\"minutes\":2.584,\"time\":155040,\"words\":646}','create','article',1,'2016-04-02 00:48:00','2016-05-05 18:50:08'),(13,'6c5d4619-1007-44ec-a2d2-989e482ca3eb','La nueva ruta de compra multidispositivo','El cliente multidispositivo fragmenta su proceso de compra a través de diferentes instancias y plataformas, y es “la nueva normalidad”.\n\nEl análisis permanente de las 15 millones de solicitudes por segundo que maneja su red de display, permite asegurar a Criteo, con datos concretos, que el comportamiento del cliente online cambió.','http://pulsosocial.com/2016/05/09/nueva-ruta-compra-multidispositivo','/images/post/4.jpeg','{\"duration\":\"4 min de lectura\",\"minutes\":3.212,\"time\":192720,\"words\":803}','create','article',1,'2016-05-08 16:01:36','2016-05-08 16:01:36'),(14,'8627404f-01c4-4891-9040-429f7df998c5','Usurpación de identidad: la campaña de marketing de Hawkers y Forocoches',' La compañía alicantina les ofrecía fabricar mil lentes a un costo atractivísimo y, claro, los usuarios decidieron entregar el paso y elegir el diseño ganador por votación. Al poco tiempo, aparece un enorme banner de propaganda de Hawkers en Forocoches que anunciaba una angosta cooperación entre el foro de discusión y la compañía.','http://generaciongeek.com/geeks/enganos-y-usurpacion-de-identidad-la-campana-de-marketing-de-hawkers-y-forocoches/','/images/post/8.jpeg','{\"duration\":\"9 min de lectura\",\"minutes\":8.396,\"time\":503760.00000000006,\"words\":2099}','create','article',1,'2016-05-08 16:50:36','2016-05-10 07:13:28'),(15,'3babda37-70f0-4a94-9394-15c557e6c100','First thoughts and a quick setup guide on Bash for Windows','Windows is running Ubuntu user-mode binaries provided by Canonical. This means the command line utilities are the same as those that run within a native Ubuntu environment.\n\nThis is provided as beta software. While many of the coreutil commands provided by Ubuntu will work, there are some that will not. We welcome feedback and will prioritize accordingly. ','https://blogs.windows.com/buildingapps/2016/03/30/run-bash-on-ubuntu-on-windows/','/images/post/10.jpeg','{\"duration\":\"3 min de lectura\",\"minutes\":2.088,\"time\":125280,\"words\":522}','create','article',1,'2016-05-09 16:51:36','2016-05-10 07:13:28');
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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_categories__category_articles`
--

LOCK TABLES `article_categories__category_articles` WRITE;
/*!40000 ALTER TABLE `article_categories__category_articles` DISABLE KEYS */;
INSERT INTO `article_categories__category_articles` VALUES (1,1,1),(2,2,1),(4,2,2),(5,1,2),(6,6,2),(7,1,3),(8,3,3),(9,6,3),(10,5,4),(11,2,5),(12,6,5),(13,6,6),(14,1,6),(15,3,6),(16,6,7),(17,3,7),(18,2,7),(19,13,8),(20,6,8),(21,5,8),(22,13,9),(23,1,9),(24,3,9),(25,3,10),(26,13,10),(27,3,11),(28,1,11),(29,13,11),(30,13,12),(31,15,13),(32,14,13),(33,1,14),(34,13,14),(35,6,15);
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
  `main_article` int(10) unsigned NOT NULL,
  `related_article` int(10) unsigned NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`related_article`,`main_article`),
  KEY `fk_main_article_idx` (`main_article`),
  KEY `fk_related_article_idx` (`related_article`),
  CONSTRAINT `fk_main_article` FOREIGN KEY (`main_article`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_related_article` FOREIGN KEY (`related_article`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_related`
--

LOCK TABLES `article_related` WRITE;
/*!40000 ALTER TABLE `article_related` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
INSERT INTO `like` VALUES (1,'12345',1,1,'2016-03-31 13:18:11'),(2,'1084917731569575',9,1,'2016-05-09 14:05:26'),(3,'1084918538236161',14,1,'2016-05-09 14:06:24'),(4,'1084918571569491',13,1,'2016-05-09 14:06:28'),(5,'1085013694893312',15,1,'2016-05-09 16:56:00'),(6,'257356581319972',15,9,'2016-05-10 07:54:43'),(8,'257359037986393',8,9,'2016-05-10 07:57:33'),(10,'257364324652531',10,9,'2016-05-10 08:03:17'),(11,'257364931319137',13,1,'2016-05-10 08:04:48'),(13,'257364991319131',14,1,'2016-05-10 08:04:57'),(14,'1010047119063842',15,11,'2016-05-10 09:05:54'),(16,'835553266573742',5,19,'2016-05-10 09:09:28'),(17,'835553273240408',15,19,'2016-05-10 09:09:31'),(18,'835553313240404',7,19,'2016-05-10 09:09:40'),(19,'1085454064849275',15,14,'2016-05-10 09:15:54'),(20,'1085454161515932',4,14,'2016-05-10 09:16:13'),(24,'1085455391515809',8,1,'2016-05-10 09:19:04'),(27,'10153722340262620',15,14,'2016-05-10 09:33:27'),(28,'10201518870489230',15,16,'2016-05-10 09:43:46');
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `share`
--

LOCK TABLES `share` WRITE;
/*!40000 ALTER TABLE `share` DISABLE KEYS */;
INSERT INTO `share` VALUES (1,'1023910934336922_1084923811568967','Delta',1,14,'2016-05-09 14:17:18'),(2,'1023910934336922_1085350088193006','',1,15,'2016-05-10 06:00:48'),(3,'1023910934336922_1085350291526319','',1,14,'2016-05-10 06:01:33'),(4,'115894715466160_257384957983801','Sigma',9,15,'2016-05-10 08:36:32'),(5,'996441527112742_996444780445750','',17,15,'2016-05-10 09:06:33'),(6,'10153722260832620_10153722299962620','test',11,6,'2016-05-10 09:11:11'),(7,'1173253309386063_1173257229385671','dfg',19,3,'2016-05-10 09:11:39'),(8,'1010046995730521_1010052599063294','',15,7,'2016-05-10 09:16:55'),(9,'835553159907086_835555983240137','',15,6,'2016-05-10 09:17:23'),(10,'1085062728230940_1085075294896350','',15,6,'2016-05-10 09:22:21'),(11,'1205102699530147_1205114852862265','',19,8,'2016-05-10 09:23:02'),(12,'996441527112742_996456577111237','',1,15,'2016-05-10 09:31:27'),(13,'1010046995730521_1010059155729305','',14,15,'2016-05-10 09:33:22'),(14,'10153722260832620_10153722340652620','test',14,15,'2016-05-10 09:33:39'),(15,'835553159907086_835561586572910','',14,15,'2016-05-10 09:33:42'),(16,'10201518863009043_10201518872369277','',16,15,'2016-05-10 09:44:18');
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'facebook','1023910934336922','Diego F. Leon','male','dln.finis@gmail.com','Diego','Leon','https://www.facebook.com/app_scoped_user_id/1',NULL,'2016-03-31 01:20:03','2016-03-31 01:20:03'),(2,NULL,'c0ad5893-9f08-4ee3-9c60-e9fafc425b16',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2016-04-01 00:17:26','2016-04-01 00:17:26'),(7,'facebook','111836912539414','Will Alaacicaffccg Moiduescu',NULL,NULL,NULL,NULL,NULL,NULL,'2016-02-17 13:12:47','2016-02-17 13:12:47'),(8,'facebook','162453457467136','Open Graph Test User',NULL,NULL,NULL,NULL,NULL,NULL,'2016-02-17 15:09:02','2016-02-17 15:09:02'),(9,'facebook','115894715466160','Mark Alaacfhiehhag Huiberg',NULL,NULL,NULL,NULL,NULL,NULL,'2016-02-19 12:10:50','2016-02-19 12:10:50'),(10,NULL,'1008490462544587',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-05-09 16:09:13','2016-05-09 16:09:13'),(11,NULL,'10153722260832620',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-05-10 08:54:05','2016-05-10 08:54:05'),(12,NULL,'1184226491599785',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-05-10 08:54:20','2016-05-10 08:54:20'),(13,NULL,'1031252973626388',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-05-10 08:54:54','2016-05-10 08:54:54'),(14,NULL,'996441527112742',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-05-10 08:56:22','2016-05-10 08:56:22'),(15,NULL,'1085062728230940',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-05-10 08:57:45','2016-05-10 08:57:45'),(16,NULL,'1205102699530147',NULL,'female',NULL,NULL,NULL,NULL,NULL,'2016-05-10 08:58:29','2016-05-10 08:58:29'),(17,NULL,'1173253309386063',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-05-10 09:00:46','2016-05-10 09:00:46'),(18,NULL,'1010046995730521',NULL,'female',NULL,NULL,NULL,NULL,NULL,'2016-05-10 09:05:23','2016-05-10 09:05:23'),(19,NULL,'835553159907086',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-05-10 09:09:03','2016-05-10 09:09:03'),(20,NULL,'10201518863009043',NULL,'male',NULL,NULL,NULL,NULL,NULL,'2016-05-10 09:39:57','2016-05-10 09:39:57');
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
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visit`
--

LOCK TABLES `visit` WRITE;
/*!40000 ALTER TABLE `visit` DISABLE KEYS */;
INSERT INTO `visit` VALUES (1,1,14,1,'2016-05-09 14:18:36'),(2,1,14,1,'2016-05-09 14:18:58'),(3,1,9,1,'2016-05-09 14:19:28'),(4,1,11,1,'2016-05-09 14:19:47'),(5,10,14,1,'2016-05-09 16:12:53'),(6,10,6,1,'2016-05-09 16:20:10'),(7,10,7,1,'2016-05-09 16:20:46'),(8,10,8,1,'2016-05-09 16:20:57'),(9,10,14,1,'2016-05-09 16:21:06'),(10,10,12,1,'2016-05-09 16:21:13'),(11,10,12,1,'2016-05-09 16:21:19'),(12,10,11,1,'2016-05-09 16:21:26'),(13,10,10,1,'2016-05-09 16:21:31'),(14,10,9,1,'2016-05-09 16:21:37'),(15,10,5,1,'2016-05-09 16:21:48'),(16,10,1,1,'2016-05-09 16:21:54'),(17,1,15,1,'2016-05-09 16:51:59'),(18,1,15,136,'2016-05-10 06:10:25'),(19,1,15,1,'2016-05-10 07:13:36'),(20,1,15,1,'2016-05-10 07:13:56'),(21,1,15,1,'2016-05-10 07:14:05'),(22,1,15,97,'2016-05-10 07:19:11'),(23,9,15,19,'2016-05-10 07:54:45'),(24,9,15,1,'2016-05-10 08:34:07'),(25,9,15,28,'2016-05-10 08:35:07'),(26,9,6,1,'2016-05-10 08:50:00'),(27,15,8,1,'2016-05-10 09:04:51'),(28,14,7,1,'2016-05-10 09:09:06'),(29,14,7,1,'2016-05-10 09:09:25'),(30,11,11,1,'2016-05-10 09:14:08'),(31,11,11,1,'2016-05-10 09:14:34'),(32,11,9,1,'2016-05-10 09:14:46'),(33,11,14,1,'2016-05-10 09:15:18'),(34,1,10,1,'2016-05-10 09:15:45'),(35,11,13,1,'2016-05-10 09:16:01'),(36,15,8,1,'2016-05-10 09:16:03'),(37,11,4,1,'2016-05-10 09:16:17'),(38,11,3,1,'2016-05-10 09:16:32'),(39,1,5,1,'2016-05-10 09:16:36'),(40,11,15,1,'2016-05-10 09:17:27'),(41,17,12,1,'2016-05-10 09:17:49'),(42,17,12,1,'2016-05-10 09:18:14'),(43,17,10,1,'2016-05-10 09:18:33'),(44,17,10,1,'2016-05-10 09:19:05'),(45,17,7,1,'2016-05-10 09:19:23'),(46,18,13,1,'2016-05-10 09:19:43'),(47,11,14,1,'2016-05-10 09:19:51'),(48,11,14,1,'2016-05-10 09:19:59'),(49,17,14,1,'2016-05-10 09:20:26'),(50,17,5,1,'2016-05-10 09:21:05'),(51,17,7,1,'2016-05-10 09:21:24'),(52,17,14,1,'2016-05-10 09:21:40'),(53,17,13,1,'2016-05-10 09:21:48'),(54,17,13,1,'2016-05-10 09:21:57'),(55,17,7,1,'2016-05-10 09:22:36'),(56,17,10,1,'2016-05-10 09:23:25'),(57,11,14,1,'2016-05-10 09:23:56'),(58,11,14,1,'2016-05-10 09:24:56'),(59,11,9,1,'2016-05-10 09:25:08'),(60,14,15,1,'2016-05-10 09:26:49'),(61,11,12,1,'2016-05-10 09:27:48'),(62,11,14,1,'2016-05-10 09:28:02'),(63,11,13,1,'2016-05-10 09:28:06'),(64,11,7,1,'2016-05-10 09:28:09'),(65,11,6,1,'2016-05-10 09:28:14'),(66,18,14,1,'2016-05-10 09:29:52'),(67,11,15,41,'2016-05-10 09:30:24'),(68,11,14,1,'2016-05-10 09:30:31'),(69,11,15,27,'2016-05-10 09:31:08'),(70,16,14,1,'2016-05-10 09:31:16'),(71,11,7,1,'2016-05-10 09:31:16'),(72,15,9,1,'2016-05-10 09:31:26'),(73,14,15,89,'2016-05-10 09:31:34'),(74,18,15,21,'2016-05-10 09:31:46'),(75,16,15,1,'2016-05-10 09:31:58'),(76,1,14,1,'2016-05-10 09:31:58'),(77,17,15,138,'2016-05-10 09:32:05'),(78,19,14,1,'2016-05-10 09:32:10'),(79,17,15,38,'2016-05-10 09:32:48'),(80,17,15,28,'2016-05-10 09:33:16'),(81,11,15,46,'2016-05-10 09:33:47'),(82,17,15,205,'2016-05-10 09:36:43'),(83,14,15,65,'2016-05-10 09:37:28'),(84,20,6,1,'2016-05-10 09:45:26'),(85,15,14,1,'2016-05-10 09:46:10'),(86,15,14,1,'2016-05-10 09:46:19'),(87,15,6,1,'2016-05-10 09:46:48'),(88,20,15,1,'2016-05-10 09:47:34'),(89,15,6,1,'2016-05-10 09:47:47'),(90,20,14,1,'2016-05-10 09:48:14'),(91,20,14,1,'2016-05-10 09:48:20'),(92,15,6,1,'2016-05-10 09:48:35'),(93,16,15,1,'2016-05-10 09:49:03'),(94,20,14,1,'2016-05-10 09:49:14'),(95,20,14,1,'2016-05-10 09:49:24'),(96,20,14,1,'2016-05-10 09:49:30'),(97,15,6,1,'2016-05-10 09:49:44'),(98,10,15,1,'2016-05-13 09:53:01'),(99,10,15,1,'2016-05-13 16:12:18'),(100,10,14,1,'2016-05-13 16:15:00'),(101,10,15,196,'2016-05-13 16:18:28');
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

-- Dump completed on 2016-06-02 19:24:45
