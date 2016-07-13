CREATE DATABASE  IF NOT EXISTS `msigmadb` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
USE `msigmadb`;
-- MySQL dump 10.13  Distrib 5.7.12, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: msigmadb
-- ------------------------------------------------------
-- Server version	5.7.12-0ubuntu1

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
  `uid` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `description` longtext COLLATE utf8_bin,
  `url` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `image` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `reading` longtext COLLATE utf8_bin,
  `state` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `kind` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `creator` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`),
  UNIQUE KEY `url` (`url`),
  KEY `creator` (`creator`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES ('3d143929-6254-483c-b3e0-a936363831ac','Bitcoin y secuestro','Esta semana se ha sabido que a principios de febrero, el Centro Médico Presbiteriano de Hollywood sufrió un ataque de este tipo, que dejó su sistema informático inservible. Los autores del ataque bloquearon el acceso a todo el sistema y pidieron un rescate de 40 bitcoins - más de 15.000 euros.','http://www.genbeta.com/seguridad/un-hospital-paga-mas-de-15-000-euros-en-bitcoins-para-recuperar-su-sistema-secuestrado','/images/submarine.png','{\"duration\":\"2 min de lectura\",\"minutes\":1.852,\"time\":111120,\"words\":463}','edit','',1,1,'2016-03-14 01:32:46','2016-06-09 13:54:41'),('9f2a2c2f-5767-40ad-8e48-71a3deceeb14','Principios Básicos de Seguridad en Bases de Datos','La gran mayoría de los datos sensibles del mundo están almacenados en sistemas gestores de bases de datos comerciales tales como Oracle, Microsoft SQL Server entre otros, y atacar una bases de datos es uno de los objetivos favoritos para los criminales.','http://revista.seguridad.unam.mx/numero-12/principios-básicos-de-seguridad-en-bases-de-dato','/images/submarine.png',NULL,'disable',NULL,1,2,'2016-03-14 01:39:19','2016-05-01 23:51:06'),('10e4ee02-993e-47a4-a0fa-46b61b61b75a','Deep Learning podría mejorar los resultados del traductor de Google','Ha pasado menos de un mes desde que los de Mountain View decidieran actualizar su traductor; un remozado que vino con hasta 13 idiomas más y que llevó a Google Translate a superar la barrera de las 100 lenguas. El añadido mejoró, una vez más, la herramienta en cuestión y sirvió para conocer cuáles son los criterios de los que se vale la compañía a la hora de decantarse por uno u otro.','http://www.genbeta.com/herramientas/asi-es-como-el-deep-learning-podria-mejorar-los-resultados-del-traductor-de-google','/images/submarine.png','{\"duration\":\"2 min de lectura\",\"minutes\":1.292,\"time\":77520,\"words\":323}','create','',1,3,'2016-03-14 01:44:21','2016-06-09 13:54:38'),('ff5cc5f3-c66d-4b93-a3b6-ce24b22d1918','Ryanair sigue experimentando: ahora ofrecerá alojamiento a sus clientes','Además, no podemos perder de vista el caso de BeMate –el Airbnb (centrada principalmente en apartamentos turísticos con servicios de hotel y lanzada en 2014) , que a principios de este mismo mes presentó una nueva herramienta cuyo fin era el de la comercialización de apartamentos a través de hasta 250 agencias de viajes, con las que han firmado un acuerdo. ','http://www.genbeta.com/actualidad/ryanair-sigue-experimentando-ahora-ofrecera-alojamiento-a-sus-clientes','/images/post/6.jpeg','{\"duration\":\"3 min de lectura\",\"minutes\":2.548,\"time\":152880,\"words\":637}','create',NULL,1,4,'2016-05-03 23:33:38','2016-06-29 20:12:16'),('cf5cc5f3-c66d-4b93-a3b6-ce24b22d1917','Cuando Rusia excavó un pozo de 12 kilómetros de profundidad “para ver qué pasaba”','Es común saber sobre la exploración espacial o la exploración de los océanos; sobre misiones impresionantes y míticos personajes que se aventuraban a lo desconocido. La historia por ejemplo ha registrado también la exploración de países y territorios que impactó la vida de unos y otros; también sabemos de los largos viajes que cambiaron la forma en cómo se conocía a la Tierra y los seres que la habitamos, tales como los viajes de Charles Darwin o, con otros fines, los de Nikolai Vávilov.','http://hipertextual.com/2016/06/pozo-superprofundo','/images/post/5.jpeg','{\"duration\":\"3 min de lectura\",\"minutes\":2.592,\"time\":155520,\"words\":648}','create',NULL,2,5,'2016-05-04 23:33:38','2016-06-09 14:48:04'),('df5cc5f3-c66d-4b93-a3b6-ce24b22d1917','No necesitas apagar tu PC','Si tienes un ordenador moderno, como la gigantesca mayoría de la gente, no importa la marca o el sistema operativo, todos están diseñados para funcionar todo el tiempo. No necesitas apagarlos, simplemente utiliza las funciones de \"suspender\" o \"hibernar\". Si pasas mucho tiempo frente al ordenador, lo más probable es que apagarlo y encenderlo constantemente resulte una inconveniencia, y la verdad es que no hace falta, nunca.','http://hipertextual.com/2016/06/no-necesitas-apagar-pc','/images/post/4.jpeg','{\"duration\":\"3 min de lectura\",\"minutes\":2.716,\"time\":162960,\"words\":679}','create',NULL,1,6,'2016-05-05 23:33:38','2016-06-09 14:48:03'),('gf5cc5f3-c66d-4b93-a3b6-ce24b22d1917','No es magia, sólo ciencia: transforman las emisiones contaminantes de CO2 en rocas',' La revista Science muestra un método seguro y rápido para capturar y almacenar dióxido de carbono.\n    Como por arte de magia, el CO2 se transforma en rocas gracias a una tecnología considerada como \"segura\".','http://hipertextual.com/2016/06/co2-emisiones-rocas-islandia','/images/post/3.jpeg','{\"duration\":\"4 min de lectura\",\"minutes\":3.644,\"time\":218640.00000000003,\"words\":911}','create',NULL,2,7,'2016-05-06 23:33:38','2016-06-09 14:48:03'),('hf5cc5f3-c66d-4b93-a3b6-ce24b22d1917','La violencia en México, explicada para los no-mexicanos','La violencia y la seguridad son términos que los mexicanos tenemos presentes en nuestras cabezas la mayor parte del tiempo. Los medios de comunicación y la realidad de las calles nos recuerdan que lo mejor es ser poco ingenuos, cautelosos y reservados.','http://hipertextual.com/2016/06/violencia-mexico','/images/post/2.jpeg','{\"duration\":\"4 min de lectura\",\"minutes\":3.144,\"time\":188640.00000000003,\"words\":786}','create',NULL,1,8,'2016-06-01 23:33:38','2016-06-09 14:48:04'),('c9bc5503-23bb-4da9-bd47-d65b4bccf5cf','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wer','/images/submarine.png',NULL,'disable',NULL,2,9,'2016-04-06 06:32:22','2016-06-09 13:54:36'),('if5cc5f3-c66d-4b93-a3b6-ce24b22d1917','Tres meses para desarrollar soluciones de movilidad para los problemas del futuro','Doce empresas participarán en un programa de tutoría de tres meses para fomentar la aceleración de sus negocios y ayudarles a crear relaciones con la industria del autómovi','http://hipertextual.com/2016/06/soluciones-de-movilidad-techstars-ford','/images/post/1.jpeg','{\"duration\":\"3 min de lectura\",\"minutes\":2.748,\"time\":164880.00000000003,\"words\":687}','create',NULL,2,10,'2016-06-09 23:33:38','2016-06-09 14:48:04'),('jf5cc5f3-c66d-4b93-a3b6-ce24b22d1917','This is what The Grid’s ‘AI’ website builder looks like','You might have heard about The Grid — it’s been endlessly running banner advertising on every tech website out there for the last few months. What you might not know is what it actually is.\n\nOn first look at its landing page, I thought it wasn’t real. The company claims it uses “artificial intelligence” to build better websites and calls it your “personal AI website developer.”','http://thenextweb.com/dd/2015/07/31/this-is-what-the-grids-ai-website-builder-looks-like/','/images/post/7.jpeg','{\"duration\":\"10 min de lectura\",\"minutes\":9.16,\"time\":549600,\"words\":2290}','create',NULL,2,11,'2016-06-10 23:33:38','2016-06-09 14:48:03'),('ff5cc5f3-c66d-4b93-a3b6-ce24b22d1917','Sigma Bravo','Foxtroot','http://es.wikipedia.org/wiki/Special:Random','/images/submarine.png','{\"duration\":\"2 min de lectura\",\"minutes\":1.48,\"time\":88800,\"words\":370}','create','',2,15,'2016-05-02 23:33:38','2016-06-09 13:54:42');
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
  `article_categories` int(11) DEFAULT NULL,
  `category_articles` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_categories__category_articles`
--

LOCK TABLES `article_categories__category_articles` WRITE;
/*!40000 ALTER TABLE `article_categories__category_articles` DISABLE KEYS */;
INSERT INTO `article_categories__category_articles` VALUES (5,3,1),(6,3,2),(7,1,1),(8,2,1),(9,8,1),(10,8,4),(11,7,1),(12,7,2),(13,7,3),(14,8,4),(15,14,1),(16,14,4),(17,15,1),(18,15,4);
/*!40000 ALTER TABLE `article_categories__category_articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article_related`
--

DROP TABLE IF EXISTS `article_related`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article_related` (
  `main` int(11) DEFAULT NULL,
  `related` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_related`
--

LOCK TABLES `article_related` WRITE;
/*!40000 ALTER TABLE `article_related` DISABLE KEYS */;
INSERT INTO `article_related` VALUES (15,11,1,'2016-06-29 20:13:11'),(15,10,2,'2016-06-29 20:13:14'),(10,8,3,'2016-06-29 20:14:36'),(8,7,4,'2016-06-29 20:14:39'),(8,6,5,'2016-06-29 20:36:02'),(8,5,6,'2016-06-29 20:36:05'),(7,4,7,'2016-06-29 20:36:07');
/*!40000 ALTER TABLE `article_related` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('Redes','',1,'2016-03-30 23:57:00','2016-03-30 23:57:00'),('Programación','',2,'2016-03-30 23:57:14','2016-03-30 23:57:14'),('Seguridad','',3,'2016-03-30 23:57:30','2016-03-30 23:57:30'),('Base de Datos','',4,'2016-03-30 23:57:46','2016-03-30 23:57:46'),('Emprendimiento','',5,'2016-03-30 23:57:57','2016-03-30 23:57:57'),('Administración','',6,'2016-03-30 23:58:48','2016-03-30 23:58:48'),('Inteligencia Artificial','',7,'2016-04-02 00:01:49','2016-04-02 00:01:49'),('Gamificación','',8,'2016-04-02 00:03:51','2016-04-02 00:03:51'),('Economía','',9,'2016-04-02 00:04:15','2016-04-02 00:04:15'),('Matemáticas','',11,'2016-04-02 00:08:25','2016-04-02 00:08:25'),('Ingeniería','',12,'2016-04-02 00:08:59','2016-04-02 00:08:59'),('Sistemas','',13,'2016-04-02 00:33:40','2016-04-02 00:33:40'),('Software','',14,'2016-04-02 00:49:27','2016-04-02 00:49:27'),('Elearning','',15,'2016-04-02 00:51:39','2016-04-02 00:51:39'),('GNU/Linux','',16,'2016-04-02 00:54:05','2016-04-02 00:54:05');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `like` (
  `sid` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `article` int(11) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sid` (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
INSERT INTO `like` VALUES ('1111753108886037',4,3,1,'2016-06-20 21:20:39');
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `related_article`
--

DROP TABLE IF EXISTS `related_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `related_article` (
  `main` int(11) DEFAULT NULL,
  `related` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `related_article`
--

LOCK TABLES `related_article` WRITE;
/*!40000 ALTER TABLE `related_article` DISABLE KEYS */;
/*!40000 ALTER TABLE `related_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `share`
--

DROP TABLE IF EXISTS `share`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `share` (
  `sid` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `message` longtext COLLATE utf8_bin,
  `article` int(11) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sid` (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `share`
--

LOCK TABLES `share` WRITE;
/*!40000 ALTER TABLE `share` DISABLE KEYS */;
INSERT INTO `share` VALUES ('123','',2,1,1,'2016-03-21 11:23:20'),('1077695738958441','',22,1,2,'2016-04-28 13:28:40'),('1077701502291198','',22,1,3,'2016-04-28 13:39:16'),('1077703402291008','',22,1,4,'2016-04-28 13:42:54'),('1080248755369806','',8,1,5,'2016-05-02 14:06:33'),('1080252915369390','',8,1,6,'2016-05-02 14:17:07'),('1080253438702671','',8,1,7,'2016-05-02 14:18:50'),('1080254145369267','',8,1,8,'2016-05-02 14:21:23'),('1080255762035772','',8,1,9,'2016-05-02 14:22:14'),('1080257205368961','',9,1,10,'2016-05-02 14:24:03'),('1080257578702257','',8,1,11,'2016-05-02 14:25:13'),('1080257765368905','',8,1,12,'2016-05-02 14:25:43'),('1080258495368832','',8,1,13,'2016-05-02 14:27:01'),('1080259698702045','',8,1,14,'2016-05-02 14:29:49'),('1080260272035321','',8,1,15,'2016-05-02 14:31:45'),('1080262045368477','',8,1,16,'2016-05-02 14:35:56'),('1080263342035014','',8,1,17,'2016-05-02 14:39:12'),('1080263458701669','',8,1,18,'2016-05-02 14:39:35'),('1080264522034896','',8,1,19,'2016-05-02 14:42:28'),('1080265048701510','',8,1,20,'2016-05-02 14:43:51'),('1080266975367984','',8,1,21,'2016-05-02 14:48:20');
/*!40000 ALTER TABLE `share` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `provider` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `uid` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `firstname` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `lastname` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `gender` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `profileUrl` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('facebook','111836912539414','Will Alaacicaffccg Moiduescu',NULL,NULL,NULL,NULL,NULL,NULL,1,'2016-02-17 13:12:47','2016-02-17 13:12:47'),('facebook','162453457467136','Open Graph Test User',NULL,NULL,NULL,NULL,NULL,NULL,2,'2016-02-17 15:09:02','2016-02-17 15:09:02'),('facebook','1023910934336922','Diego F. Leon',NULL,NULL,NULL,NULL,NULL,NULL,3,'2016-02-17 15:21:36','2016-02-17 15:21:36'),('facebook','115894715466160','Mark Alaacfhiehhag Huiberg',NULL,NULL,NULL,NULL,NULL,NULL,4,'2016-02-19 12:10:50','2016-02-19 12:10:50');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visit`
--

DROP TABLE IF EXISTS `visit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visit` (
  `time` float DEFAULT NULL,
  `article` int(11) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
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

-- Dump completed on 2016-06-29 23:24:27
