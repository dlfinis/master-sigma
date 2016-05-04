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
  `uid` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext,
  `url` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `kind` varchar(255) DEFAULT NULL,
  `creator` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`),
  KEY `creator` (`creator`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES ('3d143929-6254-483c-b3e0-a936363831ac','Bitcoin y secuestro','Esta semana se ha sabido que a principios de febrero, el Centro Médico Presbiteriano de Hollywood sufrió un ataque de este tipo, que dejó su sistema informático inservible. Los autores del ataque bloquearon el acceso a todo el sistema y pidieron un rescate de 40 bitcoins - más de 15.000 euros.','http://www.genbeta.com/seguridad/un-hospital-paga-mas-de-15-000-euros-en-bitcoins-para-recuperar-su-sistema-secuestrado','/images/submarine.png','edit',NULL,1,1,'2016-03-14 01:32:46','2016-03-16 16:09:56'),('9f2a2c2f-5767-40ad-8e48-71a3deceeb14','Principios Básicos de Seguridad en Bases de Datos','La gran mayoría de los datos sensibles del mundo están almacenados en sistemas gestores de bases de datos comerciales tales como Oracle, Microsoft SQL Server entre otros, y atacar una bases de datos es uno de los objetivos favoritos para los criminales.','http://revista.seguridad.unam.mx/numero-12/principios-básicos-de-seguridad-en-bases-de-dato','/images/submarine.png','disable',NULL,1,2,'2016-03-14 01:39:19','2016-05-01 23:51:06'),('10e4ee02-993e-47a4-a0fa-46b61b61b75a','Deep Learning podría mejorar los resultados del traductor de Google','Ha pasado menos de un mes desde que los de Mountain View decidieran actualizar su traductor; un remozado que vino con hasta 13 idiomas más y que llevó a Google Translate a superar la barrera de las 100 lenguas. El añadido mejoró, una vez más, la herramienta en cuestión y sirvió para conocer cuáles son los criterios de los que se vale la compañía a la hora de decantarse por uno u otro.','http://www.genbeta.com/herramientas/asi-es-como-el-deep-learning-podria-mejorar-los-resultados-del-traductor-de-google','/images/submarine.png','create',NULL,1,3,'2016-03-14 01:44:21','2016-03-15 17:34:52'),('a1f8dae8-fd0e-4c89-bce8-37ca406cf688','Ad proident consectetur duis veniam sint commodo ut mollit.','Veniam nisi dolore laborum esse laborum. Elit elit labore officia consequat quis esse labore laborum. Do magna nisi fugiat esse sunt culpa qui nisi esse labore aliqua reprehenderit in consequat excepteur. Tempor nostrud aliquip irure culpa.','http://es.wikipedia.org/wiki/Special:Random','/images/submarine.png','create',NULL,2,4,'2016-04-06 06:30:20','2016-04-06 06:30:20'),('b6f4177a-e107-4338-929b-4a0043812370','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wiki/Special:Random','/images/submarine.png','create',NULL,2,5,'2016-04-06 06:32:21','2016-04-06 06:32:21'),('40f9ca52-d17d-4420-9e02-6717822de8f2','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wiki/Special:Random','/images/submarine.png','create',NULL,2,6,'2016-04-06 06:32:21','2016-04-06 06:32:21'),('699f2f8b-c91a-48ad-abfb-499f57c6d289','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wiki/Special:Random','/images/submarine.png','create',NULL,2,7,'2016-04-06 06:32:21','2016-04-06 06:32:21'),('b8fe4c99-ba7a-4607-a841-c5d32ff92d36','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wiki/Special:Random','/images/submarine.png','create',NULL,2,8,'2016-04-06 06:32:22','2016-04-06 06:32:22'),('c9bc5503-23bb-4da9-bd47-d65b4bccf5cf','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wer','/images/submarine.png','create',NULL,2,9,'2016-04-06 06:32:22','2016-04-06 06:32:22'),('47b51e5b-b0cd-4d75-b2a8-c13431290bf1','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wiki/Special:Random','/images/submarine.png','create',NULL,2,10,'2016-04-06 06:32:22','2016-04-06 06:32:22'),('1e8755a6-c796-433b-a66a-fb2a501044c3','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wiki/Special:Random','/images/submarine.png','create',NULL,2,11,'2016-04-06 06:32:22','2016-04-06 06:32:22'),('227a8c1c-7a72-4553-bfe2-56d219fb9996','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wiki/Special:Random','/images/submarine.png','create',NULL,2,12,'2016-04-06 06:32:22','2016-04-06 06:32:22'),('c513f661-4d70-4a17-860f-a2d619e78d65','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wiki/Special:Random','/images/submarine.png','create',NULL,2,13,'2016-04-06 06:32:22','2016-04-06 06:32:22'),('c6b3b5ec-e21c-4a5a-89a8-699fd9bd55a9','Gamma','Delta','http://es.wikipedia.org/wiki/Special:Random','/images/submarine.png','create',NULL,2,14,'2016-05-02 23:31:50','2016-05-02 23:31:50'),('ff5cc5f3-c66d-4b93-a3b6-ce24b22d1917','Sigma Bravo','Foxtroot','http://es.wikipedia.org/wiki/Special:Random','/images/submarine.png','create',NULL,2,15,'2016-05-02 23:33:38','2016-05-02 23:33:38');
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
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
  `main_article` int(11) DEFAULT NULL,
  `related_article` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
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
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `like` (
  `sid` varchar(255) DEFAULT NULL,
  `article` int(11) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sid` (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
INSERT INTO `like` VALUES ('0c149e4b-a9ff-4d40-914c-ee5c2f117d43',16,2,9,'2016-04-25 15:57:19'),('34120db4-a5df-4759-8ab0-542f11b62e16',16,2,10,'2016-04-25 15:57:24'),('1075848779143137',1,2,13,'2016-04-25 16:40:58'),('0c149e4b-a9ff-4d40-914c-ee5c1f117d43',22,1,14,'2016-04-25 16:43:58'),('1079909155403766',8,1,15,'2016-05-02 00:51:13');
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `share`
--

DROP TABLE IF EXISTS `share`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `share` (
  `sid` varchar(255) DEFAULT NULL,
  `message` longtext,
  `article` int(11) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sid` (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
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
  `provider` varchar(255) DEFAULT NULL,
  `uid` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `profileUrl` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
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

-- Dump completed on 2016-05-04  9:30:29
