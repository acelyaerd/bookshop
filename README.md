I have created a dynamic web application for a bookshop using NodeJS with the back-end (database) being MongoDB.
I have installed password hashing (bcrypt) and have used it in my web application, with access control functionality: limited access to some routes for logged-in users

Session management is Node.js and Express with express-session.

Sanitsation and validation in Node.js and Express with express-validator and express-sanitiser. 
I have created an API using an OpenWeatherMap API, and accessing with curl.


My web application includes the following pages:
- Home page 
- Register page
- Login page
- Add book page
- List page
- Search page
- weather api page
- api page
- Logout link


In addition to the above:
- Links to all pages are included on the home page.
- Logged in users are only authorised to see list, addbook and search pages.
- I have included form validation for your form-data.
- Informative content (welcome message, nice titles for each page, etc) and also the look of the UI (colors, font sizes, etc).


List of requirements implemented:
1. Hyper link reference in all pages - IMPLEMENTED
2. Access control for list page - IMPLEMENTED
3. Access control for addbook page - IMPLEMENTED
4. Access control for search page - IMPLEMENTED
5. Logout included and working - IMPLEMENTED
6. Links to all pages on the home page including logout - IMPLEMENTED
7. Email validator on register page - IMPLEMENTED
8. Sanitisation - IMPLEMENTED
