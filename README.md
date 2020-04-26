# Introduction 
The code challenge is the simple project where we are building REST APIs for a local camera store who wants to expand and have
asked you to create REST APIs so that web frontend and mobile app can consume those.
Camera store has various products which are divided into categories. User can add product into cart. Also to use the system user
must login into the system.

Here is the brief description which camera store want you to store in database
Category: A category is like Nikon or Canon which has many products under them. A category has following details -
• name (string, like Nikon or Canon, not null)
• type (string, can only be “Mirrorless”, “full frame”, “point and shoot”, not null)
• model (int, year, like 2018, not null)
Product: A product is a item under a category. It has following details -
• name (string, like Nikon D850)
• category (category it belongs to, for example “Nikon”)
• description (string, product description)
• price (decimal, like 20134.34)
• make (int, year when it was built)
User has to login into the system and add product to cart.
Now as per code challenge please create following APIs
• list all products
• list all categories
• list all products of a specific category
• user login
• add product to cart
• get cart for a specific user. 

# Getting Started
 Guide for getting this code up and running on your own system. In this section we have talked about:
1.	Installation process - git clone or download . then go to the folder node-assignment, npm install , use node or nodemon or pm2 to run server.js example :- nodemon server.js. also giving the mysql file, kindly make a local setup. db details are in config file. 
2.	Software dependencies - nodeJs,mysql
3.	Latest releases - 1.0.0
4.	API references -http://localhost:8003/docs/

# Build and Test
TODO: Describe and show how to build your code and run the tests. 

# Contribute
TODO: Explain how other users and developers can contribute to make your code better. 

If you want to learn more about creating good readme files then refer the following [guidelines](https://www.visualstudio.com/en-us/docs/git/create-a-readme). You can also seek inspiration from the below readme files:
- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)