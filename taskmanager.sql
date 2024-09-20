-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 20, 2024 at 03:27 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `taskmanager`
--

-- --------------------------------------------------------

--
-- Table structure for table `completedtasks`
--

CREATE TABLE `completedtasks` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `completedtasks`
--

INSERT INTO `completedtasks` (`id`, `title`, `description`, `date`) VALUES
(1, 'Do a research', 'About different programming language.', '2024-09-15'),
(2, 'Analyze gathered data', 'Read the contents of each research.', '2024-09-20');

-- --------------------------------------------------------

--
-- Table structure for table `ongoingtasks`
--

CREATE TABLE `ongoingtasks` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ongoingtasks`
--

INSERT INTO `ongoingtasks` (`id`, `title`, `description`, `date`) VALUES
(3, 'Make a report', 'Create a document about the analysis and findings.', '2024-09-25'),
(4, 'Presentation', 'Plan and provide materials needed.', '2024-11-17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `completedtasks`
--
ALTER TABLE `completedtasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ongoingtasks`
--
ALTER TABLE `ongoingtasks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ongoingtasks`
--
ALTER TABLE `ongoingtasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
