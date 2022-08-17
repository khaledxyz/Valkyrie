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
  - Create .env file that contains the following values
  
        PORT="NUMBER"
        MONGODB_URI="mongodb://[Username:Password(optional)]@HostName:Port/?aruguments"
        JWT_TOKEN_SECRET="STRING"
        
        // To upload images to Cloudinary CDN
        // Not required if you're not planning to upload images
        CLOUDINARY_API_KEY="NUMBER"
        CLOUDINARY_API_SECRET="STRING"
        CLOUDINARY_NAME="STRING"
        CLOUDINARY_URL="URL"

  - Run the server `npm start`.
