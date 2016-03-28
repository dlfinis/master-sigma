-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: msigmadb
-- Source Schemata: msigmadb
-- Created: Wed Mar 23 11:53:31 2016
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;;

-- ----------------------------------------------------------------------------
-- Schema msigmadb
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `msigmadb` ;
CREATE SCHEMA IF NOT EXISTS `msigmadb` ;

-- ----------------------------------------------------------------------------
-- Table msigmadb.article
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `msigmadb`.`article` (
  `uid` VARCHAR(255) NULL DEFAULT NULL,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `description` LONGTEXT NULL DEFAULT NULL,
  `url` VARCHAR(255) NULL DEFAULT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `state` VARCHAR(255) NULL DEFAULT NULL,
  `creator` INT(11) NULL DEFAULT NULL,
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uid` (`uid` ASC),
  UNIQUE INDEX `url` (`url` ASC),
  INDEX `creator` (`creator` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = latin1;

-- ----------------------------------------------------------------------------
-- Table msigmadb.article_categories__category_articles
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `msigmadb`.`article_categories__category_articles` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `article_categories` INT(11) NULL DEFAULT NULL,
  `category_articles` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = latin1;

-- ----------------------------------------------------------------------------
-- Table msigmadb.category
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `msigmadb`.`category` (
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name` (`name` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = latin1;

-- ----------------------------------------------------------------------------
-- Table msigmadb.like
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `msigmadb`.`like` (
  `sid` VARCHAR(255) NULL DEFAULT NULL,
  `article` INT(11) NULL DEFAULT NULL,
  `user` INT(11) NULL DEFAULT NULL,
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `sid` (`sid` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = latin1;

-- ----------------------------------------------------------------------------
-- Table msigmadb.share
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `msigmadb`.`share` (
  `sid` VARCHAR(255) NULL DEFAULT NULL,
  `article` INT(11) NULL DEFAULT NULL,
  `user` INT(11) NULL DEFAULT NULL,
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `sid` (`sid` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = latin1;

-- ----------------------------------------------------------------------------
-- Table msigmadb.user
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `msigmadb`.`user` (
  `provider` VARCHAR(255) NULL DEFAULT NULL,
  `uid` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `firstname` VARCHAR(255) NULL DEFAULT NULL,
  `lastname` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = latin1;

-- ----------------------------------------------------------------------------
-- Table msigmadb.visit
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `msigmadb`.`visit` (
  `sid` VARCHAR(255) NULL DEFAULT NULL,
  `article` INT(11) NULL DEFAULT NULL,
  `user` INT(11) NULL DEFAULT NULL,
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `sid` (`sid` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = latin1;
SET FOREIGN_KEY_CHECKS = 1;;
