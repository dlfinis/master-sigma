CREATE DATABASE  IF NOT EXISTS `mastersigma` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mastersigma`;
-- MySQL dump 10.13  Distrib 5.5.47, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: mastersigma
-- ------------------------------------------------------
-- Server version	5.5.47-0ubuntu0.14.04.1

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
  `state` varchar(255) DEFAULT NULL,
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
INSERT INTO `article` VALUES (1,'b56ea9a5-a8c4-4673-9fe4-95944f353383','Deep Learning podría mejorar los resultados del traductor de Google','Ha pasado menos de un mes desde que los de Mountain View decidieran actualizar su traductor; un remozado que vino con hasta 13 idiomas más y que llevó a Google Translate a superar la barrera de las 100 lenguas. El añadido mejoró, una vez más, la herramienta en cuestión y sirvió para conocer cuáles son los criterios de los que se vale la compañía a la hora de decantarse por uno u otro.','http://www.genbeta.com/herramientas/asi-es-como-el-deep-learning-podria-mejorar-los-resultados-del-traductor-de-google','http://i.blogs.es/092bd5/translate/1366_2000.png','create',1,'2016-03-31 16:27:14','2016-03-31 16:27:14'),(2,'9fe73ee8-e59d-4d5b-ba5d-e51e45c51301','Microsoft podría presentar un Bash de Linux','Microsoft lleva varios meses dándole amor a Linux como nunca lo ha hecho, ya sea anunciando una versión de SQL Server 2016 para sus distribuciones, añadiendo Red Hat Linux en Azure o incluso uniéndose a la Linux Foundation. Y por si estos movimientos no fueran suficientes, en las últimas horas se ha estado rumoreando que en la Build de esta tarde podría haber más.','http://www.genbeta.com/actualidad/microsoft-podria-presentar-un-bash-de-linux-nativo-para-windows-10-aliandose-con-canonical','http://i.blogs.es/c278ab/20160330_082633/650_1200.jpg','create',1,'2016-04-01 00:17:26','2016-04-01 00:17:26'),(3,'09ddf091-620e-48e2-9744-8a6a002d864e','Día Mundial del Backup: ¿Cómo resguardar tus archivos?','ESET recuerda la importancia de hacer copias de seguridad de la información para protegerla y que no desaparezca.\n\nLa información es uno de los activos más importantes para los usuarios, por lo tanto, realizar un procedimiento de resguardo de información considerando los medios de almacenamiento y la frecuencia de respaldo, resulta fundamental para proteger correctamente todos los archivos.','http://pulsosocial.com/2016/03/31/dia-mundial-del-backup-como-resguardar-tus-archivos/','http://i0.wp.com/pulsosocial.com/wp-content/uploads/2016/03/20160219104319-other-technology-e1459465468123.jpg?fit=990%2C743','create',1,'2016-04-01 23:26:15','2016-04-01 23:26:15'),(4,'ee85e821-db85-4449-a97a-b286b57c60ee','Woofbox te envía a domicilio cajas con innovadores productos para tu perro','Los hermanos Julia y Eugenio Pacareu están detrás de esta iniciativa llena de amor, ternura y pasión por los animales.\n\nMediante una sencilla suscripción, puedes recibir en casa una caja de forma inmediata, trimestral o semestral con alimentos, juguetes y accesorios únicos y originales pensados para tus mascotas. Además, con tu compra estarás ayudando a la Fundación Vidanimal.','http://pulsosocial.com/2016/03/31/woofbox-te-envia-cajas-con-innovadores-productos-para-tu-perro-a-domicilio/','http://i2.wp.com/pulsosocial.com/wp-content/uploads/2016/03/night-animal-dog-pet-e1459432176382.jpg?fit=990%2C660','create',1,'2016-04-02 00:22:40','2016-04-02 00:22:40'),(5,'d78b03dc-3e1d-4a44-9fd8-8815ed39ec4a','Las nuevas aplicaciones (API) amenazan a cualquier negocio tradicional','\"Si usted está en un negocio debe preguntarse ¿cuál es el \"Uber\" de su segmento de negocios?\", dijo Chris Rowett de CA Technologies.\n\nLos negocios tradicionales deben preguntarse cuál es el ‘Uber’ de su segmento, o “quién va a entrar a su mercado con un nuevo software para afectar su negocio”, advirtió Chris Rowett, vicepresidente de ventas especializadas en tecnología y entrega de aplicaciones en CA Technologies.','http://pulsosocial.com/2016/03/21/las-nuevas-aplicaciones-api-amenazan-a-cualquier-negocio-tradicional/','http://i2.wp.com/pulsosocial.com/wp-content/uploads/2016/03/mobile_apps_post.jpg?w=990','create',1,'2016-04-02 00:31:20','2016-04-02 00:31:20'),(6,'b2c12846-7201-4872-8c01-7bded53052e7','Amazon se plantea entrar en la guerra de los mapas con planes para adquirir parte de HERE','Si sois desarrolladores y alguna vez habéis querido probar esta distribución estáis de enhorabuena, porque Red Hat ha anunciado que va a mejorar su programa interno de desarrolladores para ofrecerle la última versión Red Hat Enterprise Linux gratis a todos los que estén registrados. Parece que estos días no sólo Microsoft está a la caza de desarrolladores.','http://www.genbeta.com/actualidad/amazon-se-plantea-entrar-en-la-guerra-de-los-mapas-con-planes-para-adquirir-parte-de-here','http://i.blogs.es/c34696/2560_3000/1366_2000.png','create',1,'2016-04-02 00:33:06','2016-04-02 00:33:06'),(7,'9aa049da-c5df-413d-99b0-1e4f97e4175a','Una app ayuda a las personas con discapacidad visual a acceder al transporte público','VoiceOver y TalkBack son las dos nuevas funciones que buscan facilitar el uso de Moovit para la población con discapacidad visual.\n\nSe estima que a nivel mundial hay 285 millones de personas con discapacidad visual, según datos de la Organización Mundial de la Salud (OMS)','http://pulsosocial.com/2016/04/01/una-app-ayuda-personas-discapacidad-visual-acceder-transporte-publico/','http://i0.wp.com/pulsosocial.com/wp-content/uploads/2016/04/bus006-e1459550950784.jpg?fit=990%2C658','create',1,'2016-04-02 00:35:07','2016-04-02 00:35:08'),(8,'4e043c0d-af5e-4aa0-a460-880f210a4899','wikiHow adquiere GuideCentral, la startup del argentino Gastón Irigoyen','Con 18 mil guías de productos hechos a mano, desde artesanías hasta tecnología, Guidecentral seguirá siendo una marca independiente.\n\nwikiHow, la web más popular del mundo que explica a los usuarios cómo realizar todo tipo de actividades, anunció la adquisición* de GuideCentral, el destino principalmente móvil para los makers y seguidores del DIY (Hazlo Tú Mismo, por sus siglas en inglés).','http://pulsosocial.com/2016/03/31/wikihow-adquiere-guidecentral-la-startup-del-argentino-gaston-irigoyen/','http://i2.wp.com/pulsosocial.com/wp-content/uploads/2016/03/11088405_816615498393343_878357226645624723_n.png?w=851','create',1,'2016-04-02 00:37:18','2016-04-02 00:37:18'),(9,'33c4cc71-1d67-40f6-b514-f920502b52ac','Windows 10 nos mostrará las notificaciones de Android gracias a Cortana','Aunque la llegada del Bash de Linux a Windows 10 o la visión de futuro centrada en los bots de Nadella fueron posiblemente dos de las mayores noticias que nos dejó la Keynote inaugural de la Build 2016 de Microsoft, en las conferencias que se han ido realizado durante los días siguientes también hemos tenido una buena dosis de novedades.','http://www.genbeta.com/actualidad/windows-10-nos-mostrara-las-aplicaciones-de-android-gracias-a-cortana','http://i.blogs.es/21870e/untitled/650_1200.png','create',1,'2016-04-02 00:41:55','2016-04-02 00:41:55'),(10,'0c330405-0276-40fb-837c-e18bbcfdb1fc','Otro tribunal aleman vuelve a darle la razón a Adblock: bloquear anuncios es legal','A la guerra contra los bloqueadores de publicidad se han sumado tanto algunos gigantes online como Google o Yahoo como muchos otros medios digitales internacionales. Esta situación ha abierto un intenso debate, y grandes titanes de la tecnología como Facebook ya han expresado su preocupación ante el crecimiento de estos programas de bloqueo.','http://www.genbeta.com/actualidad/otro-tribunal-aleman-vuelve-a-darle-la-razon-a-adblock-bloquear-anuncios-es-legal','http://i.blogs.es/c6cafd/16976008988_a2c3a6b013_k/1366_2000.jpg','create',1,'2016-04-02 00:44:31','2016-04-02 00:44:31'),(11,'486fad1d-ca2f-4826-985c-41e4144fae4f','VNC Roulette: Miles de sistemas expuestos en Internet, sin protección','VNC (siglas para Virtual Network Computing) es uno de los recursos más poderosos que tiene cualquier administrador a la hora de controlar un ordenador remoto… si sabe lo que está haciendo. Un sistema VNC desplegado sin las medidas de seguridad adecuadas se traduce en PCs abiertas a Internet de punta a punta. VNC Roulette es un nuevo portal que presenta capturas de pantalla y direcciones IP pertenecientes a dichos ordenadores.','http://www.neoteo.com/vnc-roulette-miles-sistemas-expuestos-internet-sin-proteccion','http://www.neoteo.com/wp-content/uploads/2016/04/logo-1.png','create',1,'2016-04-02 00:46:20','2016-04-02 00:46:20'),(12,'efbded7e-d3ee-45be-9a15-42c912d05a81','Intel OverDrive: Los procesadores «recargados» de Intel','Un detalle que los ordenadores de antaño tenían en común era su precio. Había que pensarlo muy bien antes de invertir cientos, o por qué no miles de dólares en un ordenador que se convertiría (para bien o para mal) en otro miembro más de la familia. Todos y cada uno de los componentes eran caros, e incluso las actualizaciones demandaban un cuidadoso análisis. En aquellos años, los usuarios buscaban exprimir al máximo sus configuraciones y hacerlas perdurar en el tiempo, algo diametralmente opuesto a la obsolescencia programada que nos consume hoy.','http://www.neoteo.com/intel-overdrive-los-procesadores-recargados-intel','http://www.neoteo.com/wp-content/uploads/2016/03/logo-17-750x500.jpg','create',1,'2016-04-02 00:48:00','2016-04-02 00:48:00'),(13,'6c5d4619-1007-44ec-a2d2-989e482ca3eb','Cómo crear tu plataforma E-Learning','En la actualidad los profesionales se vuelcan más a ofrecer sus conocimientos mediante cursos en línea, pero para ello necesitan una buena plataforma E-Learning, por este motivo desde Neoteo pensamos en ti y te acercamos entornos para crear cursos dinámicos en tu web.','http://www.neoteo.com/crear-plataforma-e-learning','http://www.neoteo.com/wp-content/uploads/2016/03/capture31-1-750x438.png','create',1,'2016-04-02 00:53:10','2016-04-02 00:53:10'),(14,'8627404f-01c4-4891-9040-429f7df998c5','El Cloud Privado está a tu alcance con estos informes técnicos','Según un estudio de SUSE, el 90% de las grandes empresas están implementando soluciones de nube privada y se trata sin duda de una tendencia al alza. Así pues, estar debidamente informado para acometer la adopción de dicho modelo es una prioridad, y es que los beneficios que aporta son importantes: ahorro de costes, mayor agilidad, despliegue de cargas de trabajo y mayor flexibilidad son alguno de los más destacados.','http://www.muylinux.com/2016/04/01/cloud-privado-white-papers','http://www.muylinux.com/wp-content/uploads/2016/04/shutterstock_378689239.jpg','create',1,'2016-04-02 00:55:47','2016-04-02 00:55:47');
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_categories__category_articles`
--

LOCK TABLES `article_categories__category_articles` WRITE;
/*!40000 ALTER TABLE `article_categories__category_articles` DISABLE KEYS */;
INSERT INTO `article_categories__category_articles` VALUES (1,1,1),(2,2,1),(4,2,2),(5,1,2),(6,6,2),(7,1,3),(8,3,3),(9,6,3),(10,5,4),(11,2,5),(12,6,5),(13,6,6),(14,1,6),(15,3,6),(16,6,7),(17,3,7),(18,2,7),(19,13,8),(20,6,8),(21,5,8),(22,13,9),(23,1,9),(24,3,9),(25,3,10),(26,13,10),(27,3,11),(28,1,11),(29,13,11),(30,13,12),(31,15,13),(32,14,13),(33,1,14),(34,13,14);
/*!40000 ALTER TABLE `article_categories__category_articles` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
INSERT INTO `like` VALUES (1,'12345',1,1,'2016-03-31 13:18:11');
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
  `user` int(10) unsigned NOT NULL,
  `article` int(10) unsigned NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`article`,`user`),
  UNIQUE KEY `sid_UNIQUE` (`sid`),
  KEY `fk_share_user1_idx` (`user`),
  KEY `fk_share_article1_idx` (`article`),
  CONSTRAINT `fk_share_article1` FOREIGN KEY (`article`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_share_user1` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `share`
--

LOCK TABLES `share` WRITE;
/*!40000 ALTER TABLE `share` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'facebook','1023910934336922','Diego F. Leon','male','dln.finis@gmail.com','Diego','Leon','https://www.facebook.com/app_scoped_user_id/1',NULL,'2016-03-31 01:20:03','2016-03-31 01:20:03'),(2,NULL,'c0ad5893-9f08-4ee3-9c60-e9fafc425b16',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2016-04-01 00:17:26','2016-04-01 00:17:26');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visit`
--

LOCK TABLES `visit` WRITE;
/*!40000 ALTER TABLE `visit` DISABLE KEYS */;
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

-- Dump completed on 2016-04-07 10:18:00
