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

The Home page is accessible for all types of users of the App (guests, registered users, admin).

## Register page

You can register with email and password. When you register you also have to repeat the password. All fields are required. The email and the password have validation and error messages are displayed if the filled values does not pass the validation.

When you register you are automatically logged in the App and you are taken to the Home page.

The Register page is accessible for all types of users of the App (guests, registered users, admin).

## Login page

You can login with email and password.

After you login, you are taken to the Home page.

The Login page is accessible for all types of users of the App (guests, registered users, admin).

## Logout

Every logged in user can logout of the App by pressing the Logout button in the header.

## All books page

In All books page all added books in the App are displayed. Every book is displayed with image, title, author, genre, and detials button.

The books in the All books page are sorted by default in the order they were added in the App - the newest added book appear first, etc. 

The All books page has pagination. On each page only 6 books are displayed (or fewer than 6 if the total number of books in the App is less than 6). You are shown the current page and the total number of pages. With Next and Prev you can browse through the pages.

The All books page is accessible for all types of users of the App (guests, registered users, admin).

## Details page

The Details page displays the details about a certain book. The details displayed are: image, title, author, link to other books by the same author, genre, year, summary, likes, comments, edit and delete buttons only for the owner of the book and admin.

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

### Edit and Delete buttons only for the owner of the book and admin

Edit and Delete buttons are available for the owner of the book and the admin.

The owner of the book and the admin are the only ones who can edit and delete a book that has already been added in the App.

## My books page

In My books page all added books by a certain registered user are displayed. Every book is displayed with image, title, author, genre, and detials button.

The My books page has pagination. On each page only 6 books are displayed (or fewer than 6 if the total number of added books by the given user is less than 6). You are shown the current page and the total number of pages. With Next and Prev you can browse through the pages.

The My books page is accessible only for registered users.

## Add book

### Add single book

Every logged in user can add a book in the App when the Add book button is clicked.

In order to Add a book, you have to give the title, the author, the genre, image url, the year, and a summary of the book - all fields are required. Every field has validation and an error message is displayed if the filled value does not pass the validation.

You can click on the Cancel button if you want to remove everything that you have filled in and start all over again.

After you Add a book, you are taken to the All books page.

### Add books from Excel

You can add books in the App from an Excel file which is very convinient if you want to add multiple books at the same time.

The Excel spreadsheet has to be pre-filled with the required book information. The Excel spreadsheet must have the following columns: Title, Author, Genre, Image URL, Year, Summary. All columns must be filled. 

Adding books from Excel file also has validation and if the validation fails an error message will be shown on the screen listing all the errors that have to be corrected before sending the file again.

After successful addition of the books you are taken to the All books page.

### Add book via Search in Google

You can Add a book in the App via the Search in Google functionality. Search in Google gives you the functionality to search for books available in the Google Books API. After you find the book you want, you can Add it in the App by clicking on the Add book button displayed for every found book.

Clicking on the Add book button will take you to the Add book form which is pre-filled with the information stored in Google Books API for this specific book.

## Edit page

If you are the owner of a book or you are admin, you can click on the Edit button in the Details page for that specific book.

The Edit button takes you to the Edit form which is pre-filled with the title, the author, the genre, the image url, the year, and the summary of the book. 

You can make the changes you want and click on the Edit Book button to save them. After clicking the Edit button you are taken to the Details page where you can see that the changes you made are visible.

Clicking the Cancel button will take you back to the Details page without making any changes. 

## Delete

If you are the owner of a book or you are admin, you can click on the Delete button in the Details page for that specific book.

A modal will open asking you if you are sure that you want to delete this book. Clicking the Cancel button or outside of the modal will take you back to the Details page without deleting the book. Clicking the Confirm button in the modal will delete the book. After the deletion of the book you are taken to the All books page.

## Search

Search functionality is available only for registered users.

## Search in the site

Search in the site gives you the functionality to search amongst the books added in the App by title, or by author, or by genre.

You can select the search criteria, type in the search field what you are searching for and click on the Search button. You can search by partial match as well.

The search results are displayed with pagination. On each page only 6 books are displayed (or fewer than 6 if the total number of found books is less than 6). You are shown the current page and the total number of pages. With Next and Prev you can browse through the pages. 

Every found book is displayed with image, title, author, genre, and Detials button.

## Search in Google

Search in Google gives you the functionality to search amongst the books available in Google Books API by title, or by author.

You can select the search criteria, type in the search field what you are searching for and click on the Search button.

The search results are displayed with pagination. On each page only 6 books are displayed (or fewer than 6 if the total number of found books is less than 6). You are shown the current page and the total number of pages. With Next and Prev you can browse through the pages. 

Every found book is displayed with image, title, author, genre, year, language, summary and Add book button.

### Add book via Search in Google

You can Add a book in the App via the Search in Google functionality. Search in Google gives you the functionality to search for books available in the Google Books API. After you find the book you want, you can Add it in the App by clicking on the Add book button displayed for every found book.

Clicking on the Add book button will take you to the Add book form which is pre-filled with the information stored in Google Books API for this specific book.

## Guests

Guests:
- can Register/Login
- can view the Home page
- can view the All books page
- can view the Details page but can not Like, nor Comment. 
- can not open the link to other books by the same author displayed in the Details page.

## Registered users

Registered users:
- can Logout
- can view the Home page
- can view the All books page
- can view the My books page
- can Add a book
- can view the Details page
- can open the link to other books by the same author displayed in the Details page
- can Like (only once) a book if they are not the owner of the book
- can comment (as many times as they want) on a book if they are not the owner of the book
- can Edit and Delete a book if they are the owner of the book
- can use the Search functionality (both Search in the site and Search in Google)
- can Add a book via the Search in Google functionality

## Admin

- can Login
- can Logout
- can view Home page
- can view All boooks for admin page (see below for more detials)
- can view the Details page
- can Edit and Delete books even though not owner of the book

### All boooks for admin page

All books for admin page displays all books added in the App in a table format. Each table row contains information for one book - title, author, year, book id, owner email, and actions (edit, delete, info).

The displayed books in the table are sorted by default in the order they were added in the App - the newest added book appear first, etc.

The displayed books in the table are paginated. First you see 6 records (or fewer than 6 if the total number of books in the App is less than 6). When you click on the button More records you see 6 more records (or less than 6 if this is what is left to be shown). When there are no more records to be displayed the button More records disappears. Above the table you see how many records are currently displayed and the total number of records.

The displayed books in the table can be sorted alphabetically by title or author in descending or ascending order by clicking on the arrows next to Title and Author.

Via the action icons (edit, delete, info) the admin can Edit a book, can Delete a book, and can view the Details page (from where he/she can also Edit/Delete the book). 

### Edit book by admin

Clicking on the Edit icon takes the admin to the Edit form pre-filled with the book information - title, author, genre, image url, year, and summary of the book. Clicking on the Edit Book button saves the changes and takes the admin to the Details page. Clicking on the Cancel button turns back the admin to the All books for admin page.

### Delete by admin

Clicking on the Delete icon opens a modal asking the admin if he/she is sure that he/she want to delete the book. Clicking the Cancel button or outside of the modal will take the admin back to the All books for admin page without deleting the book. Clicking the Confirm button in the modal will delete the book. After the deletion of the book the admin is taken to the All books for admin page.

### Details page for admin

Clicking on the Info icon takes the admin to the Details page for the given book.
In the Details page the admin can see the Edit and Delete buttons which he/she can use for editing/deleting the book.


