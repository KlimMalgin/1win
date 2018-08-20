CREATE TABLE `books` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `title` varchar(255) NOT NULL,
 `date` date NOT NULL,
 `author` varchar(255) NOT NULL,
 `description` text NOT NULL,
 `image` text NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
