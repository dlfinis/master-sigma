-- MySQL Script generated by MySQL Workbench
-- mar 18 oct 2016 00:10:03 ECT
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mastersigma
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mastersigma
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mastersigma` DEFAULT CHARACTER SET utf8 ;
USE `mastersigma` ;

-- -----------------------------------------------------
-- Table `mastersigma`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mastersigma`.`user` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `provider` VARCHAR(15) NULL DEFAULT NULL,
  `uid` VARCHAR(50) NOT NULL,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  `email` VARCHAR(50) NULL DEFAULT NULL,
  `status` VARCHAR(15) NOT NULL DEFAULT 'consumer',
  `firstname` VARCHAR(50) NULL DEFAULT NULL,
  `lastname` VARCHAR(50) NULL DEFAULT NULL,
  `gender` VARCHAR(50) NULL DEFAULT NULL,
  `birthday` VARCHAR(10) NULL,
  `profileUrl` VARCHAR(150) NULL DEFAULT NULL COMMENT 'URL Link to the profile ',
  `password` VARCHAR(50) NULL DEFAULT NULL,
  `createdAt` DATETIME NULL DEFAULT current_timestamp,
  `updatedAt` DATETIME NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uid_UNIQUE` (`uid` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mastersigma`.`article`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mastersigma`.`article` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` LONGTEXT NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL COMMENT 'Path',
  `reading` LONGTEXT NULL,
  `state` VARCHAR(15) NOT NULL DEFAULT 'create' COMMENT 'State: create/edit/disable',
  `kind` VARCHAR(15) NOT NULL DEFAULT 'article' COMMENT 'Kind of article : article/file/sound/video',
  `creator` INT(10) UNSIGNED NULL COMMENT 'User who created the registry',
  `createdAt` DATETIME NULL DEFAULT current_timestamp,
  `updatedAt` DATETIME NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `url_UNIQUE` (`url` ASC),
  INDEX `fk_article_user1_idx` (`creator` ASC),
  CONSTRAINT `fk_article_creator`
    FOREIGN KEY (`creator`)
    REFERENCES `mastersigma`.`user` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mastersigma`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mastersigma`.`category` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL,
  `createdAt` DATETIME NULL DEFAULT current_timestamp,
  `updatedAt` DATETIME NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mastersigma`.`article_categories__category_articles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mastersigma`.`article_categories__category_articles` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_articles` INT(10) UNSIGNED NOT NULL,
  `article_categories` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `article_categories`, `category_articles`),
  INDEX `fk_article_categories__category_articles_article1_idx` (`article_categories` ASC),
  INDEX `fk_article_categories__category_articles_category1_idx` (`category_articles` ASC),
  CONSTRAINT `fk_article_categories`
    FOREIGN KEY (`category_articles`)
    REFERENCES `mastersigma`.`category` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_category_articles`
    FOREIGN KEY (`article_categories`)
    REFERENCES `mastersigma`.`article` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 35
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mastersigma`.`article_related`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mastersigma`.`article_related` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `main` INT(10) UNSIGNED NOT NULL,
  `related` INT(10) UNSIGNED NOT NULL,
  `createdAt` DATETIME NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`, `related`, `main`),
  UNIQUE INDEX `article_UNIQUE` (`main` ASC, `related` ASC),
  INDEX `fk_main_article_idx` (`main` ASC),
  INDEX `fk_related_article_idx` (`related` ASC),
  CONSTRAINT `fk_main_article`
    FOREIGN KEY (`main`)
    REFERENCES `mastersigma`.`article` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_related_article`
    FOREIGN KEY (`related`)
    REFERENCES `mastersigma`.`article` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mastersigma`.`like`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mastersigma`.`like` (
  `id` INT(10) UNSIGNED NOT NULL,
  `sid` VARCHAR(50) NOT NULL,
  `article` INT(10) UNSIGNED NOT NULL,
  `user` INT(10) UNSIGNED NOT NULL,
  `createdAt` DATETIME NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`, `article`, `user`),
  UNIQUE INDEX `sid_UNIQUE` (`sid` ASC),
  INDEX `fk_like_article1_idx` (`article` ASC),
  INDEX `fk_like_user1_idx` (`user` ASC),
  CONSTRAINT `fk_like_article1`
    FOREIGN KEY (`article`)
    REFERENCES `mastersigma`.`article` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_like_user1`
    FOREIGN KEY (`user`)
    REFERENCES `mastersigma`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mastersigma`.`share`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mastersigma`.`share` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `sid` VARCHAR(50) NOT NULL,
  `message` TEXT NULL,
  `user` INT(10) UNSIGNED NOT NULL,
  `article` INT(10) UNSIGNED NOT NULL,
  `createdAt` DATETIME NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`, `user`, `article`),
  UNIQUE INDEX `sid_UNIQUE` (`sid` ASC),
  INDEX `fk_share_user1_idx` (`user` ASC),
  INDEX `fk_share_article1_idx` (`article` ASC),
  CONSTRAINT `fk_share_article1`
    FOREIGN KEY (`article`)
    REFERENCES `mastersigma`.`article` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_share_user1`
    FOREIGN KEY (`user`)
    REFERENCES `mastersigma`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mastersigma`.`visit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mastersigma`.`visit` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user` INT(10) UNSIGNED NOT NULL,
  `article` INT(10) UNSIGNED NOT NULL,
  `time` FLOAT NOT NULL COMMENT 'Time in Seconds.\n1 = Direct open\n',
  `createdAt` DATETIME NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`, `user`, `article`),
  INDEX `fk_visita_article_idx` (`article` ASC),
  INDEX `fk_visita_user_idx` (`user` ASC),
  CONSTRAINT `fk_visita_article`
    FOREIGN KEY (`article`)
    REFERENCES `mastersigma`.`article` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_visita_user`
    FOREIGN KEY (`user`)
    REFERENCES `mastersigma`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
