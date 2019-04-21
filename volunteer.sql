/*
Navicat MySQL Data Transfer

Source Server         : bigfat
Source Server Version : 50725
Source Host           : 120.79.197.63:3306
Source Database       : volunteer

Target Server Type    : MYSQL
Target Server Version : 50725
File Encoding         : 65001

Date: 2019-04-20 22:17:03
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `password` varchar(32) NOT NULL,
  `grade` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------

-- ----------------------------
-- Table structure for entry
-- ----------------------------
DROP TABLE IF EXISTS `entry`;
CREATE TABLE `entry` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `time` datetime(5) DEFAULT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of entry
-- ----------------------------

-- ----------------------------
-- Table structure for help
-- ----------------------------
DROP TABLE IF EXISTS `help`;
CREATE TABLE `help` (
  `id` int(11) NOT NULL,
  `tiltle` varchar(32) NOT NULL,
  `area` varchar(32) NOT NULL,
  `content` mediumtext NOT NULL,
  `address` varchar(32) NOT NULL,
  `name` varchar(20) NOT NULL,
  `phone` int(11) NOT NULL,
  `date` datetime(5) DEFAULT NULL,
  `mark` varchar(32) DEFAULT NULL,
  `grade` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of help
-- ----------------------------

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(32) NOT NULL,
  `date` datetime(5) NOT NULL,
  `content` mediumtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES ('1', '测试数据', '2019-04-07 20:05:13.00000', '<p>fasdffsadf<strong>阿斯顿发生</strong><img src=\"data:image/png;base64,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\"></p><p>划分的十个地方规划</p><p><br></p>');

-- ----------------------------
-- Table structure for personage
-- ----------------------------
DROP TABLE IF EXISTS `personage`;
CREATE TABLE `personage` (
  `id` int(11) NOT NULL,
  `title` varchar(32) DEFAULT NULL,
  `time` datetime(5) DEFAULT NULL,
  `source` varchar(20) DEFAULT NULL,
  `content` mediumtext,
  `type` int(11) DEFAULT NULL,
  `file` varchar(126) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of personage
-- ----------------------------

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `title` varchar(32) DEFAULT NULL,
  `area` varchar(20) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `st_time` datetime(5) DEFAULT NULL,
  `end_time` datetime(5) DEFAULT NULL,
  `work_st_time` datetime(5) DEFAULT NULL,
  `work_end_time` datetime(5) DEFAULT NULL,
  `decs` varchar(32) DEFAULT NULL,
  `content` mediumtext,
  `address` varchar(32) DEFAULT NULL,
  `realname` varchar(20) DEFAULT NULL,
  `manager` varchar(20) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `cm_address` varchar(32) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project
-- ----------------------------

-- ----------------------------
-- Table structure for publish
-- ----------------------------
DROP TABLE IF EXISTS `publish`;
CREATE TABLE `publish` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `time` datetime(5) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of publish
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `password` varchar(30) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `grade` int(2) NOT NULL,
  `email` varchar(30) NOT NULL,
  `user_name` varchar(20) DEFAULT NULL,
  `user_card` varchar(40) DEFAULT NULL,
  `user_sex` varchar(4) DEFAULT NULL,
  `user_date` varchar(20) DEFAULT NULL,
  `user_politic` varchar(20) DEFAULT NULL,
  `user_address` varchar(126) DEFAULT NULL,
  `cm_realname` varchar(20) DEFAULT NULL,
  `cm_manager` varchar(20) DEFAULT NULL,
  `cm_address` varchar(126) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '钟阳山', '111111', '13660365510', '2', '1964005690@qq.com', '钟阳山', '44092319950209215X', '男', '2015-11-11', '团员', '仲恺农业工程学院', null, null, null, '2019-04-11', '1');
INSERT INTO `user` VALUES ('2', '社区', '111111', '13660365510', '3', '19640056@qq.com', null, null, null, null, null, null, null, null, null, null, '0');
INSERT INTO `user` VALUES ('3', 'bb', '111111', '13660365511', '2', '196555@qq.com', 'dapab', '4409454644646846464654', '男', '1995-02-11', '团员', '茂名', null, null, null, '2019-04-11', '0');
INSERT INTO `user` VALUES ('4', 'bigfat', '111111', '13660365510', '2', '1964055@qq.com', null, '440923199502092159', '男', '2019-04-01', '党员', '海珠区', null, null, null, '2019-04-19', '0');
INSERT INTO `user` VALUES ('7', 'test', '111111', '13660365510', '2', '15646465@qq.com', null, '440923199502092152', '男', '2019-04-02', '共青团员', '发生的发生', null, null, null, '2019-04-19', '0');
