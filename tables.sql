DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS records;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT,
  password TEXT,
  name TEXT,
  clinic TEXT,
  address TEXT,
  postalCode TEXT, 
  contact TEXT
);

CREATE TABLE IF NOT EXISTS records (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  doctor TEXT,
  addon TEXT,
  question TEXT,
  answers TEXT
);