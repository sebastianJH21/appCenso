-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 21, 2024 at 06:18 PM
-- Server version: 8.0.36
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `appcenso`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int NOT NULL,
  `dateAppo` date NOT NULL,
  `timeAppo` time NOT NULL,
  `dni` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `dateAppo`, `timeAppo`, `dni`) VALUES
(14, '2024-08-22', '10:00:00', '11111'),
(15, '2024-08-22', '13:00:00', '22222'),
(16, '2024-08-22', '09:00:00', '33333'),
(18, '2024-08-23', '15:00:00', '44444'),
(19, '2024-08-23', '10:00:00', '55555');

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

CREATE TABLE `people` (
  `dni` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `dateBirth` date NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `people`
--

INSERT INTO `people` (`dni`, `name`, `address`, `dateBirth`, `phone`) VALUES
('11111', 'Sebastian Jimenez', 'Calle 3 #12- 23', '1998-10-09', '11111'),
('22222', 'Camilo Yepez', 'Calle 51 # 13-25', '2002-03-13', '22222'),
('33333', 'Sebastian Hernandez', 'Cra 80 # 30-23', '2006-06-22', '33333'),
('44444', 'Manuela Higuita', 'Diagoa 45 # 3648', '2002-07-18', '44444'),
('55555', 'Juan Perez', 'Cra 78 # 16-14', '1992-07-15', '55555');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `AppointPerson_idx` (`dni`);

--
-- Indexes for table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`dni`),
  ADD UNIQUE KEY `dni_UNIQUE` (`dni`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `AppointPerson` FOREIGN KEY (`dni`) REFERENCES `people` (`dni`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
