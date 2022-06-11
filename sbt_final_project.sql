-- MariaDB dump 10.19  Distrib 10.7.3-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: sbt_final_project
-- ------------------------------------------------------
-- Server version	10.7.3-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `balance` double NOT NULL,
  `currency` enum('RUB','USD','EUR') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'RUB',
  `last_transaction_date` date NOT NULL,
  `type` enum('CARD','CREDIT','SAVING','GENERAL') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'CARD',
  `card_id` int(11) DEFAULT NULL,
  `owner` int(11) NOT NULL,
  `status` enum('ACTIVE','OVERDUE','WAITING','DECLINED') COLLATE utf8mb4_unicode_ci NOT NULL,
  `credit_limit` double DEFAULT NULL,
  `percentage` double DEFAULT NULL,
  `years` int(11) DEFAULT NULL,
  `can_withdraw` tinyint(1) NOT NULL DEFAULT 0,
  `can_deposit` tinyint(1) NOT NULL DEFAULT 0,
  `closable` tinyint(1) NOT NULL DEFAULT 0,
  `capitalized` tinyint(1) NOT NULL DEFAULT 0,
  `min` int(11) DEFAULT NULL,
  `max` int(11) DEFAULT NULL,
  `min_month` int(11) NOT NULL,
  `date_opened` date NOT NULL,
  `activation_code` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `account_currency` (`currency`),
  KEY `card` (`card_id`),
  KEY `owner` (`owner`),
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `card` (`id`),
  CONSTRAINT `account_ibfk_2` FOREIGN KEY (`owner`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES
(2,'3255475754432412345',11340,'RUB','2022-05-13','CARD',1,4,'ACTIVE',NULL,NULL,NULL,0,0,0,0,NULL,NULL,0,'2022-04-26',NULL),
(3,'6867634543755634732',46755,'RUB','2022-05-13','CARD',2,3,'ACTIVE',NULL,NULL,NULL,0,0,0,0,NULL,NULL,0,'2022-04-26',NULL),
(12,'92825269767375930945',0,'RUB','2022-05-05','CREDIT',11,4,'ACTIVE',10000,0.1,NULL,0,0,0,0,NULL,NULL,0,'2022-04-28',NULL),
(17,'79982003090222125125',0,'RUB','2022-05-14','CARD',18,3,'ACTIVE',NULL,NULL,NULL,0,0,0,0,NULL,NULL,0,'2022-05-14',NULL),
(18,'78029278637120223087',0,'RUB','2022-05-15','SAVING',NULL,3,'ACTIVE',NULL,18,3,1,1,1,1,10000,10000000,0,'2022-05-15',NULL);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card`
--

DROP TABLE IF EXISTS `card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `card` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `month_year` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cvv` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('DEBIT','CREDIT') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card`
--

LOCK TABLES `card` WRITE;
/*!40000 ALTER TABLE `card` DISABLE KEYS */;
INSERT INTO `card` VALUES
(1,'1236648426683145','09/22','123','DEBIT'),
(2,'4645324326436344','09/22','321','DEBIT'),
(10,'4181259306815209','05/24','050','CREDIT'),
(11,'4247342171119075','05/24','491','CREDIT'),
(15,'2274843290021647','05/24','936','DEBIT'),
(16,'2121991326941347','05/24','559','DEBIT'),
(17,'2331630352953800','05/24','051','DEBIT'),
(18,'2300483788644310','05/24','269','DEBIT'),
(19,'2211913621642790','05/24','259','CREDIT');
/*!40000 ALTER TABLE `card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credit`
--

DROP TABLE IF EXISTS `credit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `days` int(11) NOT NULL DEFAULT 30,
  `date` date NOT NULL,
  `penalty` double DEFAULT 0,
  `account_id` int(11) NOT NULL,
  `status` enum('ACTIVE','CLOSED','OVERDUE','WAITING') COLLATE utf8mb4_unicode_ci NOT NULL,
  `commission` double DEFAULT 0,
  `total` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `credit_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit`
--

LOCK TABLES `credit` WRITE;
/*!40000 ALTER TABLE `credit` DISABLE KEYS */;
INSERT INTO `credit` VALUES
(4,100,30,'2022-05-05',0,12,'ACTIVE',0,110),
/*!40000 ALTER TABLE `credit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credit_requests`
--

DROP TABLE IF EXISTS `credit_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credit_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `credit_requests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit_requests`
--

LOCK TABLES `credit_requests` WRITE;
/*!40000 ALTER TABLE `credit_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `credit_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `savings_plans`
--

DROP TABLE IF EXISTS `savings_plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `savings_plans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `years` int(11) NOT NULL,
  `percentage` int(11) NOT NULL,
  `can_withdraw` tinyint(1) NOT NULL,
  `can_deposit` tinyint(1) NOT NULL,
  `closable` tinyint(1) NOT NULL,
  `capitalized` tinyint(1) NOT NULL,
  `min` int(11) NOT NULL,
  `max` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `savings_plans`
--

LOCK TABLES `savings_plans` WRITE;
/*!40000 ALTER TABLE `savings_plans` DISABLE KEYS */;
INSERT INTO `savings_plans` VALUES
(1,3,17,1,1,1,1,10000,10000000),
(4,2,5,1,1,1,1,10000,100000);
/*!40000 ALTER TABLE `savings_plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transfer`
--

DROP TABLE IF EXISTS `transfer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transfer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_time` datetime NOT NULL,
  `sender_account_id` int(11) NOT NULL,
  `recipient_account_id` int(11) NOT NULL,
  `status` enum('NEW','DRAFT','COMPLETE','DENIED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'NEW',
  `commission` int(11) NOT NULL,
  `amount` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sender_account_id` (`sender_account_id`),
  KEY `recipient_account_id` (`recipient_account_id`),
  CONSTRAINT `transfer_recipient` FOREIGN KEY (`recipient_account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `transfer_sender` FOREIGN KEY (`sender_account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transfer`
--

LOCK TABLES `transfer` WRITE;
/*!40000 ALTER TABLE `transfer` DISABLE KEYS */;
INSERT INTO `transfer` VALUES
(9,'2022-04-26 18:22:37',2,3,'COMPLETE',0,1000),
(10,'2022-04-26 18:23:01',2,3,'COMPLETE',0,1000),
(17,'2022-05-13 20:58:13',3,2,'COMPLETE',0,1000);
/*!40000 ALTER TABLE `transfer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `age` int(11) DEFAULT NULL,
  `role` enum('USER','ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  `password` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mail` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activation_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password_reset_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 0,
  `enabled` tinyint(1) NOT NULL DEFAULT 0,
  `locked` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
(3,'anotherTest','anotherTesty',NULL,'USER','$2a$08$UIm.PUtCu052TSb8XOzcGOlli9yOYeK/rI6lHd3p34y14t5WOBDWa','wtfomgohohoh@gmail.com',NULL,NULL,1,1,0),
(4,'kamiii','yourgod',NULL,'ADMIN','$2a$08$xxWiv/q6ZMV4Kqa19fj2rOwL/Sjbu55f2o/rV2ubYon7ayxWn41tu','kamixtrash@gmail.com',NULL,NULL,1,1,0),
(5,'fbgfbt','rtyrfef',NULL,'USER','$2a$08$VhpYN0E7.EDZTIk4kiu3iuwJxvBEU3J6Dl9KZz9w1qfg8T2j20uCy','iamjusttesting@mail.ru',NULL,NULL,1,1,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-16 13:08:21
