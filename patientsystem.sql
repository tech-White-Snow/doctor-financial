/*
SQLyog Community v13.2.0 (64 bit)
MySQL - 10.4.28-MariaDB : Database - patientsystem
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`patientsystem` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `patientsystem`;

/*Table structure for table `company` */

DROP TABLE IF EXISTS `company`;

CREATE TABLE `company` (
  `id` int(1) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `tel` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `company` */

insert  into `company`(`id`,`logo`,`address`,`tel`) values 
(1,'福氣堂','油麻地彌敦道546號旺角大樓5D 45','2788 2951 34');

/*Table structure for table `patients` */

DROP TABLE IF EXISTS `patients`;

CREATE TABLE `patients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `engname` varchar(50) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `patientid` varchar(30) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `emergency` varchar(50) DEFAULT NULL,
  `emergencynumber` varchar(50) DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `patients` */

insert  into `patients`(`id`,`name`,`engname`,`birthday`,`age`,`sex`,`patientid`,`telephone`,`address`,`emergency`,`emergencynumber`) values 
(1,'明陳小','AAA','2000-03-21',29,'0','A12345678(1)','12345678','九龍乜乜道31號2樓A室','張大玉','555555'),
(2,'陳小明','BBB','1995-07-20',52,'1','A12345678(2)','67123456','九龍乜乜道35號7樓C室','張大玉','333333'),
(3,'陳明小','CCC','2002-02-07',36,'0','A12345678(3)','34567812','九龍乜乜道45號4樓D室','張大玉','111111'),
(21,'AAAA','AAAA','2023-06-12',NULL,'1',NULL,'asdfas','asdfasdf','sdfasdf','asdfsa'),
(22,'SSSS','SSSS','2023-06-12',NULL,'1',NULL,'SSSSS','SSSS','SSSS','SSSS'),
(23,'TTTT','TTTT','2023-06-13',NULL,'0','A12345678(6)','TTTT','TTTT','TTTT','TTTT'),
(24,'','','2023-06-14',NULL,'1','','','','',''),
(25,'李白','Bai Lee','1999-06-12',NULL,'1','Z876543','67777111','Shatin ','Mr Lee','22231111'),
(26,'','','2023-06-15',NULL,'1','','','','','');

/*Table structure for table `pt_cards` */

DROP TABLE IF EXISTS `pt_cards`;

CREATE TABLE `pt_cards` (
  `cardid` int(30) NOT NULL AUTO_INCREMENT,
  `doctorid` varchar(30) NOT NULL,
  `patientid` varchar(30) DEFAULT NULL,
  `doctor` varchar(50) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `album` text DEFAULT NULL,
  `albumtext` text DEFAULT NULL,
  `disease` varchar(255) DEFAULT NULL,
  `diagnosis` varchar(255) DEFAULT NULL,
  `syndromes` text DEFAULT NULL,
  `medicines` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `toll` int(11) DEFAULT NULL,
  `paid` tinyint(1) DEFAULT 0,
  `receipt` text DEFAULT NULL,
  `prescription` text DEFAULT NULL,
  `pasthistory` text DEFAULT NULL,
  `pasthistorydate` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`cardid`),
  KEY `cardid` (`cardid`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `pt_cards` */

insert  into `pt_cards`(`cardid`,`doctorid`,`patientid`,`doctor`,`date`,`album`,`albumtext`,`disease`,`diagnosis`,`syndromes`,`medicines`,`remark`,`toll`,`paid`,`receipt`,`prescription`,`pasthistory`,`pasthistorydate`) values 
(1,'123456','A12345678(1)','黃文智','2023-05-17 05:52:50','','albumtext1234567890','aaaa','diagnosis123','syndromes123','[{\"name\":\"BBBQ\",\"amount\":23},{\"name\":\"XXXA\",\"amount\":52},{\"name\":\"XXXA\",\"amount\":52},{\"name\":\"XXXA\",\"amount\":54}]','AAAZ@@BBBZ@@CCCZ@@DDDZ@@EEEZ',503,1,'123sdfasfdasdf\na\nsdfa\nsd\nfa\nsdfdfsdfs.s\ndf\nsdf1111\nsdf','asdfasdf\nas\ndfa\nsd\nfa\nsdfasdfAAAAAA','asdfasd\nfa\nsdf\na\nsdf\nasdfasdfsdfasdfasdf11111','06-10-2023'),
(2,'123456','A12345678(2)','陳小明','2023-09-07 10:56:23',', 20c3d0194eb8c02e33a902228c7b7b10','Caption','aasaa','diagnosis2aaaa','syndromes2\naaaaa','[{\"name\":\"ZZZ\",\"amount\":14},{\"name\":\"CCC\",\"amount\":12},{\"name\":\"XXX\",\"amount\":3}]','123@@bb1@@cc@@dd@@早上@@',100,0,NULL,NULL,'sdfasdfasdf','10/06/2023'),
(3,'123456','A12345678(1)','小明文','2023-04-18 20:26:32','','albumtext3\r\n',NULL,'132456',NULL,'[{\"name\":\"XXX\",\"amount\":0}]','154@@@@@@@@@@',55,0,NULL,NULL,NULL,NULL),
(4,'123456','A12345678(1)','小文明','2023-06-10 20:33:50','','fasdfasdfasdf123123','123123123','123123123123','123123123','[{\"name\":\"XXX\",\"amount\":23},{\"name\":\"XXXQ\",\"amount\":2}]','asdf@@asdf@@asdf@@asdf@@asdf@@',40,0,NULL,NULL,'dfasdfasdfasdf','10/06/2023'),
(10,'123456','A12345678(1)','Test','2023-06-15 00:00:00',', 54feaed22c342d349418a6d343e38ecb, 24b0f14c73e8d901a59010bcd0926d9c, 42d18b2eee2a4548a2857891dd17c9ad','AAAABBBasdfasdfasdf',NULL,'AAAABBBBasdfasdfasdfasdf','AAAABBBBasdfasdfasdf','[{\"name\":\"XXXB\",\"amount\":23},{\"name\":\"YYYB\",\"amount\":12},{\"name\":\"XXX\",\"amount\":5}]','we1B@@234@@51B@@w34B@@432@@',NULL,1,NULL,'','AAAABBBjdjddasdfasdfasdfasdfas','14/06/2023'),
(11,'123456','A12345678(1)','Test','2023-06-13 12:24:00','','AAAA',NULL,'diagnosis',NULL,'[{\"name\":\"XXX\",\"amount\":2},{\"name\":\"XXXQ\",\"amount\":5}]','z@@s@@w@@e@@r@@',NULL,0,NULL,NULL,'asdfasdfadjjjj','06-13-2023'),
(12,'123456','A12345678(1)','Test','2023-06-11 09:30:00','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL),
(14,'123456','A12345678(6)','Test','2023-06-13 14:51:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL),
(16,'123456','A12345678(1)','Test','2023-06-14 09:11:00',', 821d2f640af5a90ffaf98464880b89d4','sfasdasdaasdfasdfasdfas',NULL,'sdfasdfasdfasdf','asdfasdfasdfasdf','[{\"name\":\"XXX\",\"amount\":23},{\"name\":\"XXX\",\"amount\":0}]','asdf@@@@asdf@@s@@@@',NULL,1,NULL,NULL,'asdfasdfasdfasdfas\ndfaa\nsdf\na\nsdf\nas\ndfa\nsdfasdfasdf\nsd\nfa\nsdf\na\nsdfasdf','14/06/2023'),
(17,'123456','Z876543','Test','2023-06-14 14:20:00',', 9a3502664efbdb70cd57fdb72f7277ca','皮膚發紅',NULL,'敏感','皮膚敏感紅腫','[{\"name\":\"紅棗\",\"amount\":15},{\"name\":\"南北杏\",\"amount\":25}]','2@@3@@6@@午@@後@@',200,1,'早上看診\n休假一天','',NULL,NULL);

/*Table structure for table `pt_history` */

DROP TABLE IF EXISTS `pt_history`;

CREATE TABLE `pt_history` (
  `id` varchar(30) NOT NULL,
  `detail` text DEFAULT NULL,
  `date` date DEFAULT NULL,
  `doctorid` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `pt_history` */

insert  into `pt_history`(`id`,`detail`,`date`,`doctorid`) values 
('A12345678(1)','AAAAAAAAAAAAAABBBBBBBBBCCCC','2023-06-06','123456'),
('A12345678(1)','sdfasdfasdfasdf\r\nasd\r\nfa\r\nsdfasdfasdfasdfasdfasdf','2023-05-08','123456'),
('A12345678(1)','2134234123412341234123','2020-02-17','123456'),
('A12345678(2)','1111111111111111111111111111111111111111','1904-11-04','123456'),
('A12345678(2)','222222222222222222222222222222222222222222222','2023-06-20','123456'),
('A12345678(1)','ASDFASDFASDF','2023-06-14','123456'),
('A12345678(2)','','2023-06-15','123456');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `email` varchar(30) NOT NULL,
  `username` varchar(20) NOT NULL,
  `fullname` varchar(30) NOT NULL,
  `doctorid` varchar(15) NOT NULL,
  `avatar` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `users` */

insert  into `users`(`email`,`username`,`fullname`,`doctorid`,`avatar`,`password`) values 
('admin123@gmail.com','Admin123','Admin','13579','','123456789'),
('admin@gmail.com','Ryan','Admin','13579','','000000'),
('dannyboy05240@gmail.com','Danny','Danny','',NULL,'123456789'),
('jenny_816@hotmail.com','Jenny','Jenny','024680','4b85f319a01b44ab20696c37aa325b63','123456'),
('msyukkochan@gmail.com','Yukko','Yukko Chan','135791','bda721d5976aa9dddbbbeb6dd5f549fc','123456'),
('ngyentuandev@gmail.com','AAA','','AAAA',NULL,'AAAAAA'),
('test@test.com','Test','Test','123456',NULL,'132456');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
