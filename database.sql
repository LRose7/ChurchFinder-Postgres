CREATE DATABASE churchfinder;

-- \c churchfinder

CREATE TABLE churches (
    church_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    mailing_one VARCHAR(255) NOT NULL,
    mailing_two VARCHAR(255),
    city VARCHAR(255) NOT NULL,
    state VARCHAR(2) NOT NULL,
    postal_code INT NOT NULL,
    denomination VARCHAR(255),
    web_url VARCHAR(255),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP
);