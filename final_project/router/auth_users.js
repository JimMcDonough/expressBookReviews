const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    let validusers = users.filter((user)=>{
        return (user.username === username && user.password === password)
    });
    if(validusers.length > 0){
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  //const review = req.body.review;
  const review = req.query.review;
  const isbn = req.params.isbn;
  const keysArray = Object.keys(books);
  for (const element of keysArray) {
    if ('isbn' in books[element]){
      if (books[element].isbn == isbn) {
        //const reviewkeys = Object.keys(books[element]['reviews'])
        //for (const userkey of reviewkeys) 
        //let currentReview = 
        //let isbnreviews = books[element]['reviews']
        books[element]['reviews'][req.session.authorization.username] = review
        //books[element]['reviews'] = isbnreviews
          //if (req.session.authorization.username in books[element]['reviews']){
            //books[element]['reviews'][req.session.authorization.username] = review;
          //} else {
            //books[element]['reviews'][req.session.authorization.username] = review;
          //}
        //res.send(review)
        res.send(`${isbn} review for ${req.session.authorization.username} updated.  \n${JSON.stringify(books[element]['reviews'])}`);
        
        
        //books[element]['reviews'][req.session.authorization]
      }
    }
  }
  //res.send();
  //return res.status(300).json({message: "Yet to be implemented:)"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const keysArray = Object.keys(books);
    for (const element of keysArray) {
        if ('isbn' in books[element]){
            if (books[element].isbn == isbn) {
                delete books[element]['reviews'][req.session.authorization.username]
            
                res.send(`Review with the username  ${req.session.authorization.username} deleted. \n${JSON.stringify(books[element]['reviews'])}`);
            }
        }
    }
    
   
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
