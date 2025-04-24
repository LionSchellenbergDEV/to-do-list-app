# To-Do-List-App
## Description
This is a simple and intuitive to-do list web application that allows users to efficiently manage their tasks. Users can easily create new to-dos by specifying a title, a detailed description, and a deadline. The application also provides the functionality to delete tasks once they are completed or no longer needed, helping users stay organized and focused on their priorities.

## Requirements
* Node.js
* RDBMS, preferably MySQL Workbench

## Installation
1.  **Download or Clone the Project:** Either download the project as a `.zip` file or copy it to your desired destination folder.

2.  **Import the SQL File:** Import the included SQL file ``` to_dos.sql ``` into your RDBMS (Relational Database Management System), such as MySQL Workbench.

3.  **Configure Database Credentials:** Adjust the login details for your local RDBMS in the `app.js` file.

4.  **Install Dependencies:** Open a command line or terminal in the project directory and execute the following command:
    ```bash
    npm install bcrypt bootstrap ejs express mysql2 nodemon
    ```

5.  **Run the Application:** Execute the following command in the same command line or terminal:
    ```bash
    nodemon app.js
    ```

6.  **Access the Web Application:** You can now access the web application in your preferred browser by navigating to:
    ```
    http://localhost:3000
    ```
