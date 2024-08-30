-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 06, 2024 at 02:36 PM
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
(342, 'Kpanti', '2869877020', 'Sure Odds 22', 'KpantiSure Odds', 'Please pay attention to the top announcement information', '2024-08-01 10:01:34', '2024-08-02 14:27:13'),
(343, 'Kpanti', '1097394375', 'Mark Six 22', 'KpantiMax 6 Game draws', 'Hello Everyone', '2024-08-01 10:57:54', '2024-08-02 14:26:28'),
(344, 'roodev', '2175571750', 'okay', 'roodevokay', 'Please pay attention to the top announcement information', '2024-08-02 10:39:52', '2024-08-02 10:39:52'),
(345, 'roodev', '4110814080', '', 'roodev', 'Please pay attention to the top announcement information', '2024-08-02 15:38:31', '2024-08-02 15:38:31'),
(346, 'Kpanti', '5686251448', 'New Group for Test', 'KpantiNew Group for Test', 'Please pay attention to the top announcement information', '2024-08-06 10:42:46', '2024-08-06 10:42:46');

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
(218, '2869877020', 'logos', '2024-08-01 10:01:34', 'Sure Odds', 'administrator'),
(219, '2869877020', 'Theboy', '2024-08-01 10:01:34', 'Sure Odds', 'member'),
(220, '1097394375', 'Theboy', '2024-08-01 10:57:54', 'Max 6 Game draws', 'member'),
(221, '1097394375', 'logos', '2024-08-01 10:57:54', 'Max 6 Game draws', 'member'),
(222, '1097394375', 'makaifui', '2024-08-01 10:57:54', 'Max 6 Game draws', 'member'),
(223, '2175571750', 'Kpanti', '2024-08-02 10:39:52', 'okay', 'member'),
(224, '2175571750', 'dollarstir', '2024-08-02 10:39:52', 'okay', 'member'),
(225, '2175571750', 'Braniiblack', '2024-08-02 10:39:52', 'okay', 'member'),
(226, '4110814080', 'Kpanti', '2024-08-02 15:38:31', '', 'member'),
(227, '5686251448', 'Theboy', '2024-08-06 10:42:46', 'New Group for Test', 'member'),
(228, '5686251448', 'logos', '2024-08-06 10:42:46', 'New Group for Test', 'member'),
(229, '5686251448', 'makaifui', '2024-08-06 10:42:46', 'New Group for Test', 'member');

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=347;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `member_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=230;

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
