-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-01-2025 a las 12:10:07
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `laravel`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `biomas`
--

CREATE TABLE `biomas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fondo` varchar(255) NOT NULL,
  `canasta` varchar(255) NOT NULL,
  `balon` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_12_02_120152_create_partidas_table', 1),
(5, '2024_12_02_120206_create_biomas_table', 1),
(6, '2024_12_02_120238_create_nivels_table', 1),
(7, '2024_12_02_120253_create_rankings_table', 1),
(8, '2024_12_02_120301_create_rooms_table', 1),
(9, '2024_12_03_075154_create_personal_access_tokens_table', 1),
(10, '2024_12_04_153412_remove_remember_token_from_users_table', 1),
(11, '2024_12_05_072703_add_personal_access_token_to_users_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nivels`
--

CREATE TABLE `nivels` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_partidas` bigint(20) UNSIGNED NOT NULL,
  `id_bioma` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partidas`
--

CREATE TABLE `partidas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `operacion` varchar(255) NOT NULL,
  `respuesta_correcta` int(11) NOT NULL,
  `respuestaIncorrecta_1` int(11) NOT NULL,
  `respuestaIncorrecta_2` int(11) NOT NULL,
  `respuestaIncorrecta_3` int(11) NOT NULL,
  `nivel` int(11) NOT NULL DEFAULT 1,
  `duracion` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `partidas`
--

INSERT INTO `partidas` (`id`, `operacion`, `respuesta_correcta`, `respuestaIncorrecta_1`, `respuestaIncorrecta_2`, `respuestaIncorrecta_3`, `nivel`, `duracion`, `created_at`, `updated_at`) VALUES
(1, '5 + 3', 8, 9, 7, 10, 1, 15, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(2, '2 + 6', 8, 7, 9, 10, 1, 9, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(3, '7 + 1', 8, 9, 10, 11, 1, 20, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(4, '15 + 12', 27, 26, 28, 25, 2, 22, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(5, '23 + 9', 32, 31, 33, 30, 2, 17, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(6, '14 + 19', 33, 32, 34, 35, 2, 24, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(7, '9 - 4', 5, 6, 4, 3, 3, 16, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(8, '8 - 3', 5, 6, 4, 7, 3, 18, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(9, '6 - 1', 5, 4, 6, 7, 3, 11, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(10, '23 - 8', 15, 16, 14, 13, 4, 19, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(11, '18 - 4', 14, 13, 15, 16, 4, 14, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(12, '27 - 9', 18, 17, 19, 16, 4, 12, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(13, '4 x 3', 12, 11, 13, 10, 5, 8, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(14, '2 x 5', 10, 9, 11, 12, 5, 6, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(15, '6 x 2', 12, 13, 11, 14, 5, 20, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(16, '12 x 7', 84, 83, 85, 82, 6, 23, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(17, '14 x 6', 84, 83, 85, 86, 6, 19, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(18, '13 x 8', 104, 103, 105, 102, 6, 21, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(19, '8 ÷ 2', 4, 3, 5, 6, 7, 16, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(20, '6 ÷ 3', 2, 3, 1, 4, 7, 11, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(21, '9 ÷ 3', 3, 4, 2, 5, 7, 10, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(22, '84 ÷ 12', 7, 6, 8, 9, 8, 13, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(23, '72 ÷ 9', 8, 7, 9, 10, 8, 22, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(24, '96 ÷ 12', 8, 9, 7, 10, 8, 24, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(25, '134 + 256', 390, 102, 832, 483, 9, 15, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(26, '213 x 7', 1491, 1490, 1492, 1489, 9, 23, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(27, '785 + 362', 1147, 2594, 6660, 293, 9, 18, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(28, '437 x 9', 3933, 92, 10234, 3900, 10, 24, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(29, '354 x 6', 2124, 1146, 3012, 50034, 10, 18, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(30, '785 x 3', 2355, 2255, 2345, 2435, 10, 18, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(31, '2 + 6', 8, 7, 9, 10, 0, 24, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(32, '7 + 1', 8, 9, 10, 11, 0, 24, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(33, '15 + 12', 27, 26, 28, 25, 0, 24, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(34, '23 + 9', 32, 31, 33, 30, 0, 24, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(35, '14 + 19', 33, 32, 34, 35, 0, 24, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(36, '9 - 4', 5, 6, 4, 3, 0, 24, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(37, '8 - 3', 5, 6, 4, 7, 0, 24, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(38, '6 - 1', 5, 4, 6, 7, 0, 24, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(39, '23 - 8', 15, 16, 14, 13, 0, 24, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(40, '18 - 4', 14, 13, 15, 16, 0, 24, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(41, '27 - 9', 18, 17, 19, 16, 0, 24, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(42, '4 x 3', 12, 11, 13, 10, 0, 24, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(43, '2 x 5', 10, 9, 11, 12, 0, 24, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(44, '6 x 2', 12, 13, 11, 14, 0, 24, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(45, '12 x 7', 84, 83, 85, 82, 0, 24, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(46, '14 x 6', 84, 83, 85, 86, 0, 24, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(47, '13 x 8', 104, 103, 105, 102, 0, 24, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(48, '8 ÷ 2', 4, 3, 5, 6, 0, 24, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(49, '6 ÷ 3', 2, 3, 1, 4, 0, 24, '2024-12-23 17:35:27', '2024-12-23 17:35:27'),
(50, '9 ÷ 3', 3, 4, 2, 5, 0, 24, '2024-12-23 17:35:27', '2024-12-23 17:35:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rankings`
--

CREATE TABLE `rankings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_users` bigint(20) UNSIGNED NOT NULL,
  `puntuacion` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rooms`
--

CREATE TABLE `rooms` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `codigo` varchar(255) NOT NULL,
  `admin` bigint(20) UNSIGNED NOT NULL,
  `invitado` bigint(20) UNSIGNED NOT NULL,
  `id_bioma` bigint(20) UNSIGNED NOT NULL,
  `puntaje_admin` int(11) NOT NULL,
  `puntaje_invitado` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `personal_access_token` text DEFAULT NULL,
  `nivel` int(11) NOT NULL DEFAULT 1,
  `avatar` int(11) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `biomas`
--
ALTER TABLE `biomas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `nivels`
--
ALTER TABLE `nivels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nivels_id_partidas_foreign` (`id_partidas`),
  ADD KEY `nivels_id_bioma_foreign` (`id_bioma`);

--
-- Indices de la tabla `partidas`
--
ALTER TABLE `partidas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `rankings`
--
ALTER TABLE `rankings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rankings_id_users_foreign` (`id_users`);

--
-- Indices de la tabla `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rooms_admin_foreign` (`admin`),
  ADD KEY `rooms_invitado_foreign` (`invitado`),
  ADD KEY `rooms_id_bioma_foreign` (`id_bioma`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `biomas`
--
ALTER TABLE `biomas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `nivels`
--
ALTER TABLE `nivels`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `partidas`
--
ALTER TABLE `partidas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rankings`
--
ALTER TABLE `rankings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;


--
-- AUTO_INCREMENT de la tabla `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `nivels`
--
ALTER TABLE `nivels`
  ADD CONSTRAINT `nivels_id_bioma_foreign` FOREIGN KEY (`id_bioma`) REFERENCES `biomas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `nivels_id_partidas_foreign` FOREIGN KEY (`id_partidas`) REFERENCES `partidas` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `rankings`
--
ALTER TABLE `rankings`
  ADD CONSTRAINT `rankings_id_users_foreign` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_admin_foreign` FOREIGN KEY (`admin`) REFERENCES `partidas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `rooms_id_bioma_foreign` FOREIGN KEY (`id_bioma`) REFERENCES `biomas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `rooms_invitado_foreign` FOREIGN KEY (`invitado`) REFERENCES `partidas` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
