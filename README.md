# Installation 
1. Clone the repository.
2. Go to client directory `cd client`
3. Run `npm install`
4. Return to the project root directory
5. Copy `.env.example` file to `.env` and edit database url
6. Run `npm install`
7. Run migrations `npx sequelize-cli db:migrate`
8. Run seeders `npx sequelize-cli db:seed:all`

# Running in development mode
1. Run Express.js `npm start`  
2. Run Create React App `cd client && npm start` (type Y when asked "Would you like to run the app on another port instead?")

# Running in production mode
1. Build Create React App `cd client && npm run build`
2. Run Express app `npm start`
