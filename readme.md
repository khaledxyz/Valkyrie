# Valkyrie - ⚠️ The project is still under heavy development 
![Valkyrie Banner](assets/valk_banner.png?raw=true "Valkyrie Banner")

## Set Up
### Client
The client is built using React/Vite.
  - Install Node 18 or the LTS version of Node.
  - Open the client directory `cd client`.
  - Install npm dependencies `npm install`.
  - Run the client `npm start`.
  
### Server
  - Open the server directory `cd server`.
  - Install npm dependencies `npm install`.
  - Create .env file that contains the following values `* => Required`
  
        PORT=4000
        MONGODB_URI=mongodb://[Username:Password(optional)]@HostName:Port/?aruguments *
        JWT_TOKEN_SECRET=Very_Secure_token *
        
  - Run the server `npm start`.
