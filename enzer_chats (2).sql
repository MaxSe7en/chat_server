-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 29, 2024 at 03:19 PM
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
-- Database: `enzer_chats`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat_groups`
--

CREATE TABLE `chat_groups` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `agent_name` varchar(255) NOT NULL,
  `group_id` varchar(15) NOT NULL,
  `group_name` varchar(255) NOT NULL,
  `username_group` varchar(255) NOT NULL,
  `announcement` text DEFAULT 'Please pay attention to the top announcement information',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chat_groups`
--

INSERT INTO `chat_groups` (`id`, `agent_name`, `group_id`, `group_name`, `username_group`, `announcement`, `created_at`, `updated_at`) VALUES
(420, 'roodev', '5041701269', 'Test 2', 'roodevTest 2', 'Hello Everyone', '2024-08-29 11:06:42', '2024-08-29 11:10:02'),
(421, 'roodev', '8904715036', 'hhhh', 'roodevhhhh', 'Please pay attention to the top announcement information', '2024-08-29 11:06:58', '2024-08-29 11:06:58'),
(423, 'Kpanti', '2437609635', 'Sure Odds', 'KpantiSure Odds', 'Please pay attention to the top announcement information', '2024-08-29 12:08:58', '2024-08-29 12:08:58');

--
-- Triggers `chat_groups`
--
DELIMITER $$
CREATE TRIGGER `update_username_group_before_update` BEFORE UPDATE ON `chat_groups` FOR EACH ROW SET NEW.username_group = CONCAT(NEW.agent_name, NEW.group_name)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `member_id` bigint(20) UNSIGNED NOT NULL,
  `group_id` varchar(15) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `join_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `group_name` varchar(255) NOT NULL,
  `role` enum('member','administrator','','') NOT NULL DEFAULT 'member'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`member_id`, `group_id`, `user_name`, `join_date`, `group_name`, `role`) VALUES
(380, '5041701269', 'Kpanti', '2024-08-29 11:06:42', 'Test 2', 'administrator'),
(381, '5041701269', 'dollarstir', '2024-08-29 11:06:42', 'Test', 'member'),
(383, '8904715036', 'Kpanti', '2024-08-29 11:06:58', 'hhhh', 'member'),
(384, '8904715036', 'dollarstir', '2024-08-29 11:06:58', 'hhhh', 'member'),
(385, '8904715036', 'Braniiblack', '2024-08-29 11:06:58', 'hhhh', 'member'),
(390, '2437609635', 'Theboy', '2024-08-29 12:08:58', 'Sure Odds', 'member'),
(391, '2437609635', 'logos', '2024-08-29 12:08:58', 'Sure Odds', 'member'),
(392, '2437609635', 'makaifui', '2024-08-29 12:08:58', 'Sure Odds', 'member');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat_groups`
--
ALTER TABLE `chat_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `group_id` (`group_id`),
  ADD UNIQUE KEY `username_group` (`username_group`),
  ADD KEY `idx_group_name` (`group_name`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`member_id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `idx_user_name` (`user_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat_groups`
--
ALTER TABLE `chat_groups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=424;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `member_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=393;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `members`
--
ALTER TABLE `members`
  ADD CONSTRAINT `members_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `chat_groups` (`group_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
