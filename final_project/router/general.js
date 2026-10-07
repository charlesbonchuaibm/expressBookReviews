const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Invalid input. Unable to register user."});

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  // Task 1 return res.status(200).send(JSON.stringify(books, null, 4));
  // Task 10
  let myPromiseBooks = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books);
    }, 1000);
  });

  myPromiseBooks.then((promiseBooks) => {
    return res.status(200).send(JSON.stringify(promiseBooks, null, 4));
  })

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  // Task 2
  // const isbn = req.params.isbn;
  // return res.status(200).send(JSON.stringify(books[isbn], null, 4));

  // Task 11
  let myPromiseBooksByIsbn = new Promise((resolve, reject) => {
    setTimeout(() => {
        const isbn = req.params.isbn;
        resolve(books[isbn]);
    }, 1000);
  });

  myPromiseBooksByIsbn.then((promiseBooksByIsbn) => {
    return res.status(200).send(JSON.stringify(promiseBooksByIsbn, null, 4));
  })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  // Task 3
//   const author = req.params.author;
//   const bookKeys = Object.keys(books);
//   let bookByAuthor = [];
//   for (let i = 0; i < bookKeys.length; i++) {
//     if (books[bookKeys[i]]["author"].toString().toLowerCase().includes(author.toLowerCase())) {
//         bookByAuthor.push(books[bookKeys[i]]);
//     }
//   }
//   return res.status(200).send(JSON.stringify(bookByAuthor, null, 4));

  // Task 12
  let myPromiseBooksByAuthor = new Promise((resolve, reject) => {
    setTimeout(() => {
        const author = req.params.author;
        const bookKeys = Object.keys(books);
        let bookByAuthor = [];
        for (let i = 0; i < bookKeys.length; i++) {
            if (books[bookKeys[i]]["author"].toString().toLowerCase().includes(author.toLowerCase())) {
                bookByAuthor.push(books[bookKeys[i]]);
            }
        }
        resolve(bookByAuthor);
    }, 1000);
  });

  myPromiseBooksByAuthor.then((promiseBooksByAuthor) => {
    return res.status(200).send(JSON.stringify(promiseBooksByAuthor, null, 4));
  })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  // Task 4
//   const title = req.params.title;
//   const bookKeys = Object.keys(books);
//   let bookByTitle = [];
//   for (let i = 0; i < bookKeys.length; i++) {
//     if (books[bookKeys[i]]["title"].toString().toLowerCase().includes(title.toLowerCase())) {
//         bookByTitle.push(books[bookKeys[i]]);
//     }
//   }
//   return res.status(200).send(JSON.stringify(bookByTitle, null, 4));

  // Task 13
  let myPromiseBooksByTitle = new Promise((resolve, reject) => {
    setTimeout(() => {
        const title = req.params.title;
        const bookKeys = Object.keys(books);
        let bookByTitle = [];
        for (let i = 0; i < bookKeys.length; i++) {
            if (books[bookKeys[i]]["title"].toString().toLowerCase().includes(title.toLowerCase())) {
                bookByTitle.push(books[bookKeys[i]]);
            }
        }
        resolve(bookByTitle);
    }, 1000);
  });

  myPromiseBooksByTitle.then((promiseBooksByTitle) => {
    return res.status(200).send(JSON.stringify(promiseBooksByTitle, null, 4));
  })

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  return res.status(200).send(JSON.stringify(books[isbn]["reviews"], null, 4));
  
});

module.exports.general = public_users;
