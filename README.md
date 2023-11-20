# GDSN Client (MongoDb version)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Overview

This project is a facsimile of a Content Management app for a Global Data Syncrhonization Network (GDSN). The main purpose is to allow a business to maintain a catalog of product data. Users register/signin, and can start registering products via the Products page. Products can then be published to prospective customers that then require the product data.

## Libraries used

React Redux for local state (user login, user products retreived from backend)
React Router for managing routes
React-Table for displaying lists of products that belong to user

## Cloud Services used backend server

Render.com is used to host the backend server and Postgres SQL database (User accounts, products, contact requests)
Amazon S3 is used to host product images
