-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 02, 2016 at 05:46 PM
-- Server version: 10.1.8-MariaDB
-- PHP Version: 5.6.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `elsbeauty`
--

-- --------------------------------------------------------

--
-- Table structure for table `eb_barang`
--

CREATE TABLE `eb_barang` (
  `id` int(11) NOT NULL,
  `namabarang` varchar(500) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `stok` double NOT NULL,
  `hargabeli` double NOT NULL,
  `hargajual` double NOT NULL,
  `lasteditedby` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `eb_barang`
--

INSERT INTO `eb_barang` (`id`, `namabarang`, `description`, `stok`, `hargabeli`, `hargajual`, `lasteditedby`) VALUES
(2, 'Make Up A', 'Make Up masa kini', 100.2, 600000, 750000, 8),
(3, 'Make Up B', 'Make Up masa kini', 200, 500000, 750000, 11),
(6, 'Make Up C', 'Make Up masa kini', 123, 200000, 350000, 11);

-- --------------------------------------------------------

--
-- Stand-in structure for view `eb_barang_with_users`
--
CREATE TABLE `eb_barang_with_users` (
`id` int(11)
,`namabarang` varchar(500)
,`description` varchar(1000)
,`stok` double
,`hargabeli` double
,`hargajual` double
,`iduser` int(11)
,`username` varchar(500)
,`name` varchar(500)
);

-- --------------------------------------------------------

--
-- Table structure for table `eb_pembelian`
--

CREATE TABLE `eb_pembelian` (
  `id` int(11) NOT NULL,
  `idbarang` int(11) NOT NULL,
  `iduser` int(11) NOT NULL,
  `jumlah` double NOT NULL,
  `currenthargabeli` double NOT NULL,
  `tanggal` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `eb_pending_queue`
--

CREATE TABLE `eb_pending_queue` (
  `queueid` int(11) NOT NULL,
  `idbarang` int(11) NOT NULL,
  `iduser` int(11) NOT NULL,
  `movement` double NOT NULL,
  `currenthargabeli` double NOT NULL,
  `currenthargajual` double NOT NULL,
  `tanggal` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `eb_pending_queue`
--

INSERT INTO `eb_pending_queue` (`queueid`, `idbarang`, `iduser`, `movement`, `currenthargabeli`, `currenthargajual`, `tanggal`) VALUES
(2, 2, 8, -6, 300000, 500000, '2016-03-02 21:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `eb_penjualan`
--

CREATE TABLE `eb_penjualan` (
  `id` int(11) NOT NULL,
  `idbarang` int(11) NOT NULL,
  `iduser` int(11) NOT NULL,
  `jumlah` double NOT NULL,
  `currenthargabeli` double NOT NULL,
  `currenthargajual` double NOT NULL,
  `tanggal` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `eb_users`
--

CREATE TABLE `eb_users` (
  `id` int(11) NOT NULL,
  `username` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `name` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `eb_users`
--

INSERT INTO `eb_users` (`id`, `username`, `password`, `name`) VALUES
(8, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'Theodorus Yoga Mahendraputra'),
(10, 'admin', '5fd2b1496362af90481ae51a87496487', 'Robertus Sonny Prakoso'),
(11, 'admin', 'a879507e8ecddc5fa48f16cc11d7afb8', 'Rizal');

-- --------------------------------------------------------

--
-- Structure for view `eb_barang_with_users`
--
DROP TABLE IF EXISTS `eb_barang_with_users`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `eb_barang_with_users`  AS  select `barang`.`id` AS `id`,`barang`.`namabarang` AS `namabarang`,`barang`.`description` AS `description`,`barang`.`stok` AS `stok`,`barang`.`hargabeli` AS `hargabeli`,`barang`.`hargajual` AS `hargajual`,`user`.`id` AS `iduser`,`user`.`username` AS `username`,`user`.`name` AS `name` from (`eb_barang` `barang` left join `eb_users` `user` on((`user`.`id` = `barang`.`lasteditedby`))) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `eb_barang`
--
ALTER TABLE `eb_barang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lasteditedby` (`lasteditedby`);

--
-- Indexes for table `eb_pembelian`
--
ALTER TABLE `eb_pembelian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idbarang` (`idbarang`),
  ADD KEY `iduser` (`iduser`);

--
-- Indexes for table `eb_pending_queue`
--
ALTER TABLE `eb_pending_queue`
  ADD PRIMARY KEY (`queueid`),
  ADD KEY `idbarang` (`idbarang`),
  ADD KEY `iduser` (`iduser`);

--
-- Indexes for table `eb_penjualan`
--
ALTER TABLE `eb_penjualan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idbarang` (`idbarang`),
  ADD KEY `iduser` (`iduser`);

--
-- Indexes for table `eb_users`
--
ALTER TABLE `eb_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `eb_barang`
--
ALTER TABLE `eb_barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `eb_pembelian`
--
ALTER TABLE `eb_pembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `eb_pending_queue`
--
ALTER TABLE `eb_pending_queue`
  MODIFY `queueid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `eb_penjualan`
--
ALTER TABLE `eb_penjualan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `eb_users`
--
ALTER TABLE `eb_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `eb_barang`
--
ALTER TABLE `eb_barang`
  ADD CONSTRAINT `eb_barang_ibfk_1` FOREIGN KEY (`lasteditedby`) REFERENCES `eb_users` (`id`);

--
-- Constraints for table `eb_pembelian`
--
ALTER TABLE `eb_pembelian`
  ADD CONSTRAINT `eb_pembelian_ibfk_1` FOREIGN KEY (`idbarang`) REFERENCES `eb_barang` (`id`),
  ADD CONSTRAINT `eb_pembelian_ibfk_2` FOREIGN KEY (`iduser`) REFERENCES `eb_users` (`id`);

--
-- Constraints for table `eb_pending_queue`
--
ALTER TABLE `eb_pending_queue`
  ADD CONSTRAINT `eb_pending_queue_ibfk_1` FOREIGN KEY (`idbarang`) REFERENCES `eb_barang` (`id`),
  ADD CONSTRAINT `eb_pending_queue_ibfk_2` FOREIGN KEY (`iduser`) REFERENCES `eb_users` (`id`);

--
-- Constraints for table `eb_penjualan`
--
ALTER TABLE `eb_penjualan`
  ADD CONSTRAINT `eb_penjualan_ibfk_1` FOREIGN KEY (`idbarang`) REFERENCES `eb_barang` (`id`),
  ADD CONSTRAINT `eb_penjualan_ibfk_2` FOREIGN KEY (`iduser`) REFERENCES `eb_users` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
