const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const isbnresult = [];
  const keysArray = Object.keys(books);
  for (const element of keysArray) {
    if ('isbn' in books[element]){
        if (books[element].isbn == isbn) {
            isbnresult.push(books[element]);
        }
    }
  }
  res.send(isbnresult);

  //let filtered_isbn = books.filter((book) => book.isbn === isbn);
  //res.send(filtered_isbn);
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const authoresult =[];
  const keysArray = Object.keys(books);
  for (const element of keysArray) {
    if ('author' in books[element]){
        if (books[element]['author'] == author) {
            authoresult.push(books[element]);
        }
    }
  }
  res.send(authoresult);



  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const titleresult =[];
  const keysArray = Object.keys(books);
  for (const element of keysArray) {
    if ('title' in books[element]){
        if (books[element]['title'] == title) {
            titleresult.push(books[element]);
        }
    }
  }
  res.send(titleresult);

  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here

  const isbn = req.params.isbn;
  const reviews = [];
  const keysArray = Object.keys(books);
  for (const element of keysArray) {
    if ('isbn' in books[element]){
        if (books[element].isbn == isbn) {
            reviews.push(books[element]['reviews']);
        }
    }
  }
  res.send(reviews);

  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
