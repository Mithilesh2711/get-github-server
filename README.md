# get-github

Steps to run the program:-

1. Install node and npm. Then install dependecies of server using command "npm install".
2. Install dependecies of client using "cd client" and "npm install".
3. Create .env file and add details like NODE_ENV and TOKEN in it.
4. You can find token by generating personal access token from github setting developer section. You can take help from this link https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token .
5. After getting personal access token, save this token in env file yoy have created recently.
6. If NODE_ENV=developement then rum "npm start" in server directory and then "cd client" and then "npm start"
7. If NODE_ENV=production then run "npm start" in server directory only.
8. You are done to explore now. Type the github username in input box and search and then BOOM.
