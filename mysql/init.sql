-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : db:3306
-- Généré le : mar. 24 sep. 2024 à 08:16
-- Version du serveur : 8.0.30
-- Version de PHP : 8.0.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `db_telegraph`
--

-- --------------------------------------------------------

--
-- Structure de la table `t_caractere`
--

CREATE TABLE `t_caractere` (
  `caractere_id` int NOT NULL,
  `code_ascii` int NOT NULL,
  `message_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `t_message`
--

CREATE TABLE `t_message` (
  `message_id` int NOT NULL,
  `adresse_ip` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `t_caractere`
--
ALTER TABLE `t_caractere`
  ADD PRIMARY KEY (`caractere_id`),
  ADD UNIQUE KEY `code_Ascii` (`code_ascii`),
  ADD KEY `t_caractere_ibfk_1` (`message_id`);

--
-- Index pour la table `t_message`
--
ALTER TABLE `t_message`
  ADD PRIMARY KEY (`message_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `t_caractere`
--
ALTER TABLE `t_caractere`
  MODIFY `caractere_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `t_message`
--
ALTER TABLE `t_message`
  MODIFY `message_id` int NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `t_caractere`
--
ALTER TABLE `t_caractere`
  ADD CONSTRAINT `t_caractere_ibfk_1` FOREIGN KEY (`message_id`) REFERENCES `t_message` (`message_id`) ON DELETE CASCADE ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
