-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: banke_bihari
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` (`id`, `email`, `password`, `created_at`) VALUES (1,'admin@gmail.com','$2b$10$w2Zl.1zUknOI1yoXg6lF9u0T0ToEexHl/DkUMYJEY.oWDVzUNytIe','2026-03-09 13:26:54');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` (`id`, `title`, `image`, `link`, `created_at`) VALUES (1,'Summer Cooler Sale','cooler-banner.jpg','/products/coolers','2026-03-09 17:58:54');
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gallery` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery`
--

LOCK TABLES `gallery` WRITE;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
INSERT INTO `gallery` (`id`, `image`, `created_at`) VALUES (1,'shop-photo1.jpg','2026-03-09 18:01:13');
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leads`
--

DROP TABLE IF EXISTS `leads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `subject` varchar(200) DEFAULT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leads`
--

LOCK TABLES `leads` WRITE;
/*!40000 ALTER TABLE `leads` DISABLE KEYS */;
INSERT INTO `leads` (`id`, `name`, `email`, `phone`, `subject`, `message`, `created_at`) VALUES (1,'Test User','test@example.com','9876543210','Test Subject','This is a test message from Thunder Client','2026-03-17 18:20:44');
INSERT INTO `leads` (`id`, `name`, `email`, `phone`, `subject`, `message`, `created_at`) VALUES (2,'Test User','test@example.com','9876543210','Test Subject','This is a test message from Thunder Client','2026-03-17 18:23:58');
INSERT INTO `leads` (`id`, `name`, `email`, `phone`, `subject`, `message`, `created_at`) VALUES (3,'Utkarsh Maheshwari','maheshwari.utkarsh2006@gmail.com','8439424125','nothing','nothing','2026-03-17 18:37:34');
/*!40000 ALTER TABLE `leads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stores`
--

DROP TABLE IF EXISTS `stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `address` text,
  `phone` varchar(20) DEFAULT NULL,
  `map_link` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` (`id`, `name`, `address`, `phone`, `map_link`, `created_at`) VALUES (1,'Banke Bihari Traders Main Store','Moradabad, Uttar Pradesh','9876543210','https://maps.google.com','2026-03-09 14:50:58');
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `facebook_id` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `provider` enum('email','google','facebook') DEFAULT 'email',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `google_id`, `facebook_id`, `avatar`, `provider`, `created_at`) VALUES (1,'ShriBankeBihari Traders','shribankebiharitraders141@gmail.com',NULL,NULL,'103156569955139786384',NULL,'https://lh3.googleusercontent.com/a/ACg8ocLODWWvTTbbljY0GR4TAceRjkdWS24fxB8gcYi5MeVy0yxlcQ=s96-c','google','2026-03-23 10:05:59');
INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `google_id`, `facebook_id`, `avatar`, `provider`, `created_at`) VALUES (2,'Utkarsh Maheshwari','maheshwari.utkarsh2006@gmail.com',NULL,NULL,'106600696770761953215',NULL,'https://lh3.googleusercontent.com/a/ACg8ocIKVOeC9SiWzx5AxNU833EMptNs169Hjb2_gu9dnsILK41Z32s-=s96-c','google','2026-03-23 14:47:15');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wholesale_inquiries`
--

DROP TABLE IF EXISTS `wholesale_inquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wholesale_inquiries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `business_name` varchar(200) NOT NULL,
  `owner_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `alternate_phone` varchar(20) DEFAULT NULL,
  `gst_number` varchar(50) DEFAULT NULL,
  `business_type` varchar(50) DEFAULT NULL,
  `years_in_business` varchar(10) DEFAULT NULL,
  `address` text NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `pincode` varchar(10) NOT NULL,
  `country` varchar(50) DEFAULT 'India',
  `products` text NOT NULL,
  `estimated_quantity` varchar(100) NOT NULL,
  `preferred_timeline` varchar(50) NOT NULL,
  `monthly_requirement` varchar(50) DEFAULT NULL,
  `additional_notes` text,
  `document_path` varchar(255) DEFAULT NULL,
  `status` enum('new','contacted','negotiating','converted','rejected') DEFAULT 'new',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wholesale_inquiries`
--

LOCK TABLES `wholesale_inquiries` WRITE;
/*!40000 ALTER TABLE `wholesale_inquiries` DISABLE KEYS */;
INSERT INTO `wholesale_inquiries` (`id`, `business_name`, `owner_name`, `email`, `phone`, `alternate_phone`, `gst_number`, `business_type`, `years_in_business`, `address`, `city`, `state`, `pincode`, `country`, `products`, `estimated_quantity`, `preferred_timeline`, `monthly_requirement`, `additional_notes`, `document_path`, `status`, `created_at`, `updated_at`) VALUES (1,'Test Business Pvt Ltd','Rahul Sharma','test@example.com','9876543210','9876543211','22AAAAA0000A1Z5','retailer','5','123, Test Street, Test Area','Sahaswan','Uttar Pradesh','243638','India','Fans, Coolers, ACs, Lighting','100 units','immediate','1lac-5lac','Need bulk discount for regular orders. Looking for long term partnership.',NULL,'new','2026-03-17 19:40:00','2026-03-17 19:40:00');
INSERT INTO `wholesale_inquiries` (`id`, `business_name`, `owner_name`, `email`, `phone`, `alternate_phone`, `gst_number`, `business_type`, `years_in_business`, `address`, `city`, `state`, `pincode`, `country`, `products`, `estimated_quantity`, `preferred_timeline`, `monthly_requirement`, `additional_notes`, `document_path`, `status`, `created_at`, `updated_at`) VALUES (2,'Sharma Distributors','Amit Sharma','amit@sharmadistributors.com','9988776655','9988776644','09AAAAA0000B1Z6','distributor','8','45, Industrial Area, Phase 2','Lucknow','Uttar Pradesh','226012','India','Fans, Coolers, ACs, Refrigerators, Washing Machines','500 units','urgent','5lac-10lac','Need distributor pricing and credit terms. Can place regular monthly orders.',NULL,'new','2026-03-17 19:40:35','2026-03-17 19:40:35');
INSERT INTO `wholesale_inquiries` (`id`, `business_name`, `owner_name`, `email`, `phone`, `alternate_phone`, `gst_number`, `business_type`, `years_in_business`, `address`, `city`, `state`, `pincode`, `country`, `products`, `estimated_quantity`, `preferred_timeline`, `monthly_requirement`, `additional_notes`, `document_path`, `status`, `created_at`, `updated_at`) VALUES (3,'Shri banke bihari traders','Utkarsh maheshwari','maheshwari.utkarsh2006@gmail.com','8439424125','8439424125','09AYEPM0484G','retailer','4','maheshwari.utkarsh2006@gmail.com','sahaswan','uttar pradesh','243638','India','NSV','1','immediate','less-than-50k','11',NULL,'new','2026-03-17 19:43:56','2026-03-17 19:43:56');
/*!40000 ALTER TABLE `wholesale_inquiries` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-24 15:03:18
