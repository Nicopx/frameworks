-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 19-11-2021 a las 13:35:11
-- Versión del servidor: 5.7.31
-- Versión de PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tutorial`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `frameworks`
--

DROP TABLE IF EXISTS `frameworks`;
CREATE TABLE IF NOT EXISTS `frameworks` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `lanzamiento` int(4) NOT NULL,
  `desarrollador` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `frameworks`
--

INSERT INTO `frameworks` (`id`, `nombre`, `lanzamiento`, `desarrollador`) VALUES
(1, 'Angular', 2016, 'Google'),
(2, 'React', 2013, 'Facebook'),
(3, 'Vue,js', 2014, 'Evan You'),
(4, 'Ember.js', 2011, 'Yehuda Katz'),
(5, 'Node.js', 2009, 'Ryan Lienhart Dahl'),
(6, 'Polymer', 2015, 'Google'),
(9, 'Next.js', 2016, 'Guillermo Rauch');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
