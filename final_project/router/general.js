const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }
  

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    // Simulating an asynchronous operation with a Promise
    const getBookList = new Promise((resolve, reject) => {
      // Assume books is a synchronous data structure
      const bookList = JSON.stringify(books, null, 4);
  
     
    resolve(bookList);
     
    });
  
    // Handle the promise result
    getBookList
      .then(bookList => {
        res.send(bookList);
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
      });
  });

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
  
    // Wrap the asynchronous operation in a Promise
    const findBookByISBN = new Promise((resolve, reject) => {
      const isbnresult = [];
      const keysArray = Object.keys(books);
  
      for (const element of keysArray) {
        if ('isbn' in books[element]) {
          if (books[element].isbn == isbn) {
            isbnresult.push(books[element]);
          }
        }
      }
  
      // Resolve the promise with the result
      resolve(isbnresult);
    });
  
    // Handle the promise result
    findBookByISBN
      .then(result => {
        res.send(result);
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
      });
  });
  
/// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
  
    // Wrap the asynchronous operation in a Promise
    const findBooksByAuthor = new Promise((resolve, reject) => {
      const authorResult = [];
      const keysArray = Object.keys(books);
  
      for (const element of keysArray) {
        if ('author' in books[element]) {
          if (books[element].author == author) {
            authorResult.push(books[element]);
          }
        }
      }
  
      // Resolve the promise with the result
      resolve(authorResult);
    });
  
    // Handle the promise result
    findBooksByAuthor
      .then(result => {
        res.send(result);
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
      });
  });

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
  
    // Wrap the asynchronous operation in a Promise
    const findBooksByTitle = new Promise((resolve, reject) => {
      const titleResult = [];
      const keysArray = Object.keys(books);
  
      for (const element of keysArray) {
        if ('title' in books[element]) {
          if (books[element].title == title) {
            titleResult.push(books[element]);
          }
        }
      }
  
      // Resolve the promise with the result
      resolve(titleResult);
    });
  
    // Handle the promise result
    findBooksByTitle
      .then(result => {
        res.send(result);
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
      });
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
