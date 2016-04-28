CREATE DATABASE  IF NOT EXISTS `msigmadb` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `msigmadb`;
-- MySQL dump 10.13  Distrib 5.5.49, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: msigmadb
-- ------------------------------------------------------
-- Server version	5.5.49-0ubuntu0.14.04.1

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
  `creator` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`),
  KEY `creator` (`creator`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES ('3d143929-6254-483c-b3e0-a936363831ac','Bitcoin y secuestro','Esta semana se ha sabido que a principios de febrero, el Centro Médico Presbiteriano de Hollywood sufrió un ataque de este tipo, que dejó su sistema informático inservible. Los autores del ataque bloquearon el acceso a todo el sistema y pidieron un rescate de 40 bitcoins - más de 15.000 euros.','http://www.genbeta.com/seguridad/un-hospital-paga-mas-de-15-000-euros-en-bitcoins-para-recuperar-su-sistema-secuestrado','http://i.blogs.es/3ed030/hosp/1366_2000.jpg','edit',1,1,'2016-03-14 01:32:46','2016-03-16 16:09:56'),('9f2a2c2f-5767-40ad-8e48-71a3deceeb14','Principios Básicos de Seguridad en Bases de Datos','La gran mayoría de los datos sensibles del mundo están almacenados en sistemas gestores de bases de datos comerciales tales como Oracle, Microsoft SQL Server entre otros, y atacar una bases de datos es uno de los objetivos favoritos para los criminales.','http://revista.seguridad.unam.mx/numero-12/principios-básicos-de-seguridad-en-bases-de-datos','http://www.oracle.com/ocom/groups/public/@otn/documents/digitalasset/2183928.png','edit',1,2,'2016-03-14 01:39:19','2016-03-16 16:09:56'),('10e4ee02-993e-47a4-a0fa-46b61b61b75a','Deep Learning podría mejorar los resultados del traductor de Google','Ha pasado menos de un mes desde que los de Mountain View decidieran actualizar su traductor; un remozado que vino con hasta 13 idiomas más y que llevó a Google Translate a superar la barrera de las 100 lenguas. El añadido mejoró, una vez más, la herramienta en cuestión y sirvió para conocer cuáles son los criterios de los que se vale la compañía a la hora de decantarse por uno u otro.','http://www.genbeta.com/herramientas/asi-es-como-el-deep-learning-podria-mejorar-los-resultados-del-traductor-de-google','http://i.blogs.es/092bd5/translate/1366_2000.png',NULL,1,3,'2016-03-14 01:44:21','2016-03-15 17:34:52'),('a1f8dae8-fd0e-4c89-bce8-37ca406cf688','Ad proident consectetur duis veniam sint commodo ut mollit.','Veniam nisi dolore laborum esse laborum. Elit elit labore officia consequat quis esse labore laborum. Do magna nisi fugiat esse sunt culpa qui nisi esse labore aliqua reprehenderit in consequat excepteur. Tempor nostrud aliquip irure culpa.','http://es.wikipedia.org/wiki/Special:Random','http://lorempixel.com/1024/800/','create',2,4,'2016-04-06 06:30:20','2016-04-06 06:30:20'),('b6f4177a-e107-4338-929b-4a0043812370','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wiki/Special:Random','http://lorempixel.com/1024/800/','create',2,5,'2016-04-06 06:32:21','2016-04-06 06:32:21'),('40f9ca52-d17d-4420-9e02-6717822de8f2','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wiki/Special:Random','http://lorempixel.com/1024/800/','create',2,6,'2016-04-06 06:32:21','2016-04-06 06:32:21'),('699f2f8b-c91a-48ad-abfb-499f57c6d289','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wiki/Special:Random','http://lorempixel.com/1024/800/','create',2,7,'2016-04-06 06:32:21','2016-04-06 06:32:21'),('b8fe4c99-ba7a-4607-a841-c5d32ff92d36','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wiki/Special:Random','http://lorempixel.com/1024/800/','create',2,8,'2016-04-06 06:32:22','2016-04-06 06:32:22'),('c9bc5503-23bb-4da9-bd47-d65b4bccf5cf','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wiki/Special:Random','http://lorempixel.com/1024/800/','create',2,9,'2016-04-06 06:32:22','2016-04-06 06:32:22'),('47b51e5b-b0cd-4d75-b2a8-c13431290bf1','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wiki/Special:Random','http://lorempixel.com/1024/800/','create',2,10,'2016-04-06 06:32:22','2016-04-06 06:32:22'),('1e8755a6-c796-433b-a66a-fb2a501044c3','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wiki/Special:Random','http://lorempixel.com/1024/800/','create',2,11,'2016-04-06 06:32:22','2016-04-06 06:32:22'),('227a8c1c-7a72-4553-bfe2-56d219fb9996','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wiki/Special:Random','http://lorempixel.com/1024/800/','create',2,12,'2016-04-06 06:32:22','2016-04-06 06:32:22'),('c513f661-4d70-4a17-860f-a2d619e78d65','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wiki/Special:Random','http://lorempixel.com/1024/800/','create',2,13,'2016-04-06 06:32:22','2016-04-06 06:32:22'),('d669f5ba-51f8-475b-af45-46175e43065e','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wiki/Special:Random','http://lorempixel.com/1024/800/','create',2,14,'2016-04-06 06:32:23','2016-04-06 06:32:23'),('116dd058-826a-494c-99a9-f2488a03c401','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wiki/Special:Random','http://lorempixel.com/1024/800/','create',2,15,'2016-04-06 06:32:23','2016-04-06 06:32:23'),('d6bf4c19-3218-49d2-8550-aed3bdf1d9dc','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wiki/Special:Random','http://lorempixel.com/1024/800/','create',2,16,'2016-04-06 06:32:23','2016-04-06 06:32:23'),('e90a508b-f7f7-4a21-90cd-3a678ecdb625','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wiki/Special:Random','http://lorempixel.com/1024/800/','create',2,17,'2016-04-06 06:32:23','2016-04-06 06:32:23'),('60d5d1e2-0c0f-4126-b3d2-1d5a3410851c','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wiki/Special:Random','http://lorempixel.com/1024/800/','create',2,18,'2016-04-06 06:32:23','2016-04-06 06:32:24'),('3ee5ce1b-bbe8-4ff4-a8d7-a6848d909e95','Exercitation amet velit ea enim consequat.','Do nulla anim ea ipsum in commodo aute magna irure eiusmod et non sint nostrud. Incididunt est et laborum aliquip nisi eu deserunt occaecat aute voluptate ut minim commodo. Magna adipisicing sunt consequat et consectetur exercitation adipisicing occaecat officia ea proident nisi sit magna cupidatat proident ex cupidatat commodo. Do ut culpa excepteur quis consequat id nulla nisi sunt sunt duis deserunt nulla enim exercitation. Ex consectetur magna consequat consectetur et fugiat exercitation veniam ut cillum nisi mollit exercitation. In esse ullamco duis fugiat ad ad cillum eu.','http://es.wikipedia.org/wiki/Special:Random','http://lorempixel.com/1024/800/','create',2,19,'2016-04-06 06:32:24','2016-04-06 06:32:24'),('5ebdac36-d330-4fc9-b110-4bab9be198b8','Vivamus elementum semper nisi','Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.','http://en.wikipedia.org/wiki/Special:Random','http://lorempixel.com/1024/600/business/','create',2,20,'2016-04-12 19:23:31','2016-04-12 19:23:31'),('5bf84bd8-0af1-4b8a-a8a9-2c1a7f5f4caf','Vivamus elementum semper nisi','Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.','http://en.wikipedia.org/wiki/Special:Random','http://lorempixel.com/1024/600/business/','create',2,21,'2016-04-12 19:46:31','2016-04-12 19:46:31'),('2ec5dc81-3c0c-4647-a83b-709e7b1a78c4','Vivamus elementum semper nisi','Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.','http://en.wikipedia.org/wiki/Special:Random','http://lorempixel.com/1024/600/business/','create',1,22,'2016-04-12 19:47:04','2016-04-12 19:47:04');
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_categories__category_articles`
--

LOCK TABLES `article_categories__category_articles` WRITE;
/*!40000 ALTER TABLE `article_categories__category_articles` DISABLE KEYS */;
INSERT INTO `article_categories__category_articles` VALUES (5,3,1),(6,3,2),(7,1,1),(8,2,1),(9,22,1),(10,22,4),(11,21,1),(12,21,2),(13,21,3),(14,21,4);
/*!40000 ALTER TABLE `article_categories__category_articles` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('Software','',1,'2016-03-14 00:44:19','2016-03-15 17:11:35'),('Programacion','',2,'2016-03-14 00:46:28','2016-03-14 01:04:34'),('Seguridad Informatica','',3,'2016-03-14 01:08:18','2016-03-14 01:08:18'),('Base de Datos','',4,'2016-04-06 05:22:28','2016-04-06 05:22:28'),('Administración','',5,'2016-04-06 05:22:35','2016-04-06 05:22:35');
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
INSERT INTO `like` VALUES ('0c149e4b-a9ff-4d40-914c-ee5c2f117d43',16,2,9,'2016-04-25 15:57:19'),('34120db4-a5df-4759-8ab0-542f11b62e16',16,2,10,'2016-04-25 15:57:24'),('1075848779143137',1,2,13,'2016-04-25 16:40:58'),('0c149e4b-a9ff-4d40-914c-ee5c1f117d43',22,1,14,'2016-04-25 16:43:58');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `share`
--

LOCK TABLES `share` WRITE;
/*!40000 ALTER TABLE `share` DISABLE KEYS */;
INSERT INTO `share` VALUES ('123','',2,1,1,'2016-03-21 11:23:20');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('facebook','1023910934336922','Diego F. Leon','dln.finis@gmail.com','Diego','Leon','male','https://www.facebook.com/app_scoped_user_id/1023910934336922/',NULL,1,'2016-04-27 00:12:42','2016-04-27 00:12:42'),('facebook','162453457467136','Open Graph Test User',NULL,'Open','Graph',NULL,NULL,NULL,2,'2016-02-17 15:09:02','2016-02-17 15:09:02');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visit`
--

LOCK TABLES `visit` WRITE;
/*!40000 ALTER TABLE `visit` DISABLE KEYS */;
INSERT INTO `visit` VALUES (NULL,2,1,1,'2016-03-21 11:30:09');
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

-- Dump completed on 2016-04-28 11:05:23
