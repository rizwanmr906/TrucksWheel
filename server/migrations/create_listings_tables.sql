-- SQL schema for vehicle listings management

CREATE TABLE IF NOT EXISTS lightvahical_pending (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vehicle_type ENUM('light', 'heavy') NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  seller VARCHAR(255) NOT NULL,
  year INT,
  city VARCHAR(255),
  kilometers INT,
  transmission VARCHAR(255),
  brand VARCHAR(255),
  fuel_type VARCHAR(255),
  car_type VARCHAR(255),
  photos JSON,
  price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lightvahical_approved (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vehicle_type ENUM('light', 'heavy') NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  seller VARCHAR(255) NOT NULL,
  year INT,
  city VARCHAR(255),
  kilometers INT,
  transmission VARCHAR(255),
  brand VARCHAR(255),
  fuel_type VARCHAR(255),
  car_type VARCHAR(255),
  photos JSON,
  price DECIMAL(10,2),
  approved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lightvahical_rejected (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vehicle_type ENUM('light', 'heavy') NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  seller VARCHAR(255) NOT NULL,
  year INT,
  city VARCHAR(255),
  kilometers INT,
  transmission VARCHAR(255),
  brand VARCHAR(255),
  fuel_type VARCHAR(255),
  car_type VARCHAR(255),
  photos JSON,
  price DECIMAL(10,2),
  rejected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS heavyvahical_pending (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  city VARCHAR(255) NOT NULL,
  kilometers INT NOT NULL,
  description TEXT,
  photos JSON, -- Array of photo URLs or file paths
  price DECIMAL(10,2) NOT NULL,
  seller VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS heavyvahical_approved (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  city VARCHAR(255) NOT NULL,
  kilometers INT NOT NULL,
  description TEXT,
  photos JSON, -- Array of photo URLs or file paths
  price DECIMAL(10,2) NOT NULL,
  seller VARCHAR(255) NOT NULL,
  approved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS heavyvahical_rejected (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  city VARCHAR(255) NOT NULL,
  kilometers INT NOT NULL,
  description TEXT,
  photos JSON, -- Array of photo URLs or file paths
  price DECIMAL(10,2) NOT NULL,
  seller VARCHAR(255) NOT NULL,
  rejected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
