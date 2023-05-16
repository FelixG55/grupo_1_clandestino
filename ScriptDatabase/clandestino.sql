-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema clandestino
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema clandestino
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `clandestino` DEFAULT CHARACTER SET utf8mb4 ;
USE `clandestino` ;

-- -----------------------------------------------------
-- Table `clandestino`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clandestino`.`categories` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `clandestino`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clandestino`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `admin` INT(1) NOT NULL,
  `image` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 112
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `clandestino`.`sales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clandestino`.`sales` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(10) NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_sales_users_idx` (`user_id` ASC),
  CONSTRAINT `fk_sales_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `clandestino`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 198
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `clandestino`.`detail_sale`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clandestino`.`detail_sale` (
  `sale_id` INT(11) NOT NULL AUTO_INCREMENT,
  `product_id` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`sale_id`),
  INDEX `fk_detail_sale_product_idx` (`product_id` ASC),
  CONSTRAINT `fk_detail_sale_sale`
    FOREIGN KEY (`sale_id`)
    REFERENCES `clandestino`.`sales` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 198
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `clandestino`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clandestino`.`products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(250) NOT NULL,
  `price` DECIMAL(10,0) NOT NULL,
  `image` VARCHAR(250) NULL DEFAULT NULL,
  `delivery` INT(1) NULL DEFAULT NULL,
  `video` VARCHAR(250) NULL DEFAULT NULL,
  `categories_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_products_categories_idx` (`categories_id` ASC),
  CONSTRAINT `fk_products_categories`
    FOREIGN KEY (`categories_id`)
    REFERENCES `clandestino`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 504
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
