# SoftUni Library App

## SoftUni Library App works with the softuni practice server

The softuni practice server is initialized with three users, which can be used for immediate testing:

peter@abv.bg : 123456
george@abv.bg : 123456
admin@abv.bg : admin

## SoftUni Library App has two available languages - Bulgarian and English

You can switch between languages with the two buttons in the header.

## Home page

The Home page is a static page containing basic information why reading books is important.

The Home page is accesible for all types of users of the App (guests, registered users, admin).

## Register page

You can register with email and password.

The Register page is accesible for all types of users of the App (guests, registered users, admin).

## Login page

You can login with email and password.

The Login page is accesible for all types of users of the App (guests, registered users, admin).

## All books page

In the All books page all added books in the App are displayed. Every book is displayed with image, title, author, genre, and detials button.

The All books page has pagination. On each page only 6 books are displayed (or fewer than 6 if the total number of books in the App is less than 6). You are shown the current page and the total number of pages.

The All books page is accesible for all types of users of the App (guests, registered users, admin).

## Details page

The Details page displays the details about a certain book. The details displayed are: image, title, author, link to other books by the same author, genre, year, summary, likes, comments.

### Link to other books by the same author

This link takes you to the Search in Google page with pre-filled search where all books for the given author available in Google Book API are displayed.

This functionality is available only for registered users. If guests click on the link they are taken to the Login page.

### Likes

The total likes for a given book are displayed in the Details page.

Every registered user who is not the owner of the book, can like a given book only once. 

The owner of the book and guests can see the total likes the book has but they can not like the book.

### Comments

The Comments for a given book are displayed in the Details page.

Every registered user who is not the owner of the book, can add comments for this book with no restriction to the number of comments. 

The owner of the book and guests can see the comments the book has but they can not add comments.



