CREATE TABLE IF NOT EXISTS `PREFIX_sizeinreality` (
  `id_sizeinreality` int(10) NOT NULL AUTO_INCREMENT,
  `id_product` int(10) NOT NULL,
  `file` varchar(125) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`id_sizeinreality`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

