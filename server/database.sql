CREATE DATABASE perntodo;
CREATE TABLE info (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    date DATE NOT NULL,
    name VARCHAR(50) NOT NULL,
    amount INT NOT NULL,
    range INT NOT NULL
);