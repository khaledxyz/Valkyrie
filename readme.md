# Valkyrie
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

## License

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.

Under this license, you may not use this project for:

1. Commercial Purposes
2. Distributing this project after modifying it
3. You may not use this without appropriate attribution
