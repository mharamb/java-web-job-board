UNLOCK TABLES;

DROP TABLE IF EXISTS `user_role`;
DROP TABLE IF EXISTS `roles`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `jobs`;
DROP TABLE IF EXISTS `job_applied`;

CREATE TABLE `users` (
                         `id` bigint(19) unsigned NOT NULL AUTO_INCREMENT,
                         `first_name` varchar(255) NOT NULL,
                         `last_name` varchar(255) NOT NULL,
                         `username` varchar(255) NOT NULL,
                         `password` varchar(255) NOT NULL,
                         `email` varchar(255) NOT NULL,
                         `phone` varchar(255),
                         `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         PRIMARY KEY (`id`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `roles` (
                         `id` bigint(19) unsigned NOT NULL AUTO_INCREMENT,
                         `name` varchar(255) NOT NULL,
                         PRIMARY KEY (`id`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `user_role` (
                             `id` bigint(19) unsigned NOT NULL AUTO_INCREMENT,
                             `user_id` bigint(19) unsigned NOT NULL,
                             `role_id` bigint(19) unsigned NOT NULL,
                             PRIMARY KEY (`id`),
                             KEY `fk_security_user_id` (`user_id`),
                             KEY `fk_security_role_id` (`role_id`),
                             CONSTRAINT `fk_security_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
                             CONSTRAINT `fk_security_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `job_status` (
                              `id` bigint(19) unsigned NOT NULL AUTO_INCREMENT,
                              `name` varchar(255) NOT NULL
                              PRIMARY KEY (`id`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `jobs` (
                        `id` bigint(19) unsigned NOT NULL AUTO_INCREMENT,
                        `name` varchar(255) NOT NULL,
                        `description` varchar(500) NOT NULL,
                        `job_status_id` bigint(19) unsigned DEFAULT NULL,
                        `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        PRIMARY KEY (`id`),
                        KEY `fk_jobs_status` (`job_status_id`),
                        CONSTRAINT `fk_jobs_status` FOREIGN KEY (`job_status_id`) REFERENCES `job_status` (`id`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `job_applied` (
                               `id` bigint(19) unsigned NOT NULL AUTO_INCREMENT,
                               `user_id` bigint(19) unsigned NOT NULL,
                               `job_id` bigint(19) unsigned NOT NULL,
                               PRIMARY KEY (`id`),
                               KEY `fk_jobapplied_user_id` (`user_id`),
                               KEY `fk_jobapplied_job_id` (`job_id`),
                               CONSTRAINT `fk_jobapplied_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
                               CONSTRAINT `fk_jobapplied_job_id` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `roles` VALUES (1,'ROLE_ADMIN'),(2,'ROLE_USER');
INSERT INTO `job_status` VALUES (1,'VALID'),(2,'EXPIRED');
