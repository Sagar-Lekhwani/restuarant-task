### README Instructions for Cloning and Setting Up the Node.js Project

#### Cloning the Repository

1. **Clone the Repository:**

   Open your terminal and run the following command to clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```

   Replace `https://github.com/your-username/your-repo-name.git` with the URL of your repository.

2. **Navigate to the Project Directory:**

   ```bash
   cd your-repo-name
   ```

   Replace `your-repo-name` with the name of your project directory.

#### Setting Up the Project

1. **Install Dependencies:**

   Ensure you have Node.js and npm (Node Package Manager) installed. You can check by running `node -v` and `npm -v`. If not installed, download and install them from [nodejs.org](https://nodejs.org/).

   Run the following command to install the project dependencies:

   ```bash
   npm install
   ```

2. **Configure Environment Variables:**

   Create a `.env` file in the root directory of your project. Add necessary environment variables such as database connection strings and JWT secrets. For example:

   ```
   PORT=your port number
   MONGO_URI= your connect string for db
   JWT_SECRET=your jwt secret

   ```

   Replace `your_jwt_secret` and `your_mongo_uri` with your actual values.

3. **Run the Development Server:**

   Start the development server by running:

   ```bash
   npm run dev
   ```

   This will start your Node.js server in development mode.

4. **Access the Application:**

   Open your web browser and navigate to `http://localhost:${your port number}` (or the port specified in your configuration) to access the application.

#### Additional Notes:

- **Data Entry Setup:** for data entry of restaurant refer to sampleData.txt file i have provide in repo just copy it and past in post and hit the route create of restaurant

- **Database Setup:** Ensure your database is up and running if your project depends on it. Check any additional setup or migration instructions provided in the repository.
- **Testing:** If your project includes tests, you can typically run them with:

  ```bash
  npm test
  ```

- **Troubleshooting:** If you encounter any issues, refer to the error messages in the terminal, and check the project's documentation or `README.md` file for more details.

By following these steps, you should be able to clone, set up, and run your Node.js project locally.

### README Instructions for `LoginUser` Route

#### Route: `/api/auth/login`  
**Method:** `POST`

This route allows users to log in by verifying their credentials and returning a JWT token.

#### Request Body:

The request body should contain the following fields:

- `username` (required): The username of the user attempting to log in.
- `password` (required): The password of the user.

Example Request Body:

```json
{
  "username": "user123",
  "password": "password123"
}
```

#### Response Format:

- **On Success:**  
  The response will include a success message:

  ```json
  {
    "msg": "Login successful"
  }
  ```

  A JWT token will be set in an HTTP-only cookie named `token` that expires in 1 hour.

- **On Failure:**
  - **Invalid Credentials (400):**
    ```json
    {
      "msg": "Invalid credentials"
    }
    ```

  - **Server Error (500):**
    ```json
    {
      "error": "Error message explaining the issue"
    }
    ```

#### Example cURL Request:

To log in a user with username `user123` and password `password123`, use:

```bash
curl -X POST http://your-api-domain/api/auth/login \
-H "Content-Type: application/json" \
-d '{"username": "user123", "password": "password123"}'
```

Replace `http://your-api-domain` with your actual API domain.

#### Notes:
- Ensure that `username` and `password` are provided in the request body.
- The JWT token is set in an HTTP-only cookie, enhancing security against XSS attacks. Make sure the `JWT_SECRET` environment variable is properly set.
- In production, ensure that `secure` is set to `true` to enforce HTTPS.


### README Instructions for `RegisterUser` Route

#### Route: `/api/auth/register`  
**Method:** `POST`

This route registers a new user by creating a new user record in the database.

#### Request Body:

The request body should contain the following fields:

- `username` (required): The username for the new user.
- `password` (required): The password for the new user.

Example Request Body:

```json
{
  "username": "newuser",
  "password": "newpassword123"
}
```

#### Response Format:

- **On Success:**  
  The response will include a success message:

  ```json
  {
    "msg": "User registered"
  }
  ```

- **On Failure:**
  - **Server Error (500):**
    ```json
    {
      "error": "Error message explaining the issue"
    }
    ```

#### Example cURL Request:

To register a new user with username `newuser` and password `newpassword123`, use:

```bash
curl -X POST http://your-api-domain/api/auth/register \
-H "Content-Type: application/json" \
-d '{"username": "newuser", "password": "newpassword123"}'
```

Replace `http://your-api-domain` with your actual API domain.

#### Notes:
- Ensure that both `username` and `password` are provided in the request body.
- This endpoint creates a new user with the provided credentials. Make sure to handle password hashing and validation according to your application's security practices before saving the user.


### README Instructions for `createRestaurant` Route

#### Route: `/api/restaurant/create`  
**Method:** `POST`

This route allows users to create one or more restaurant entries in the database. It accepts data in JSON format, which can be either a single restaurant object or an array of restaurant objects.

#### Request Format:

- **For Single Restaurant:**

  ```json
  {
    "name": "Restaurant Name",
    "description": "Brief description of the restaurant",
    "latitude": 23.259933,
    "longitude": 77.412613,
    "averageRating": 4.5,
    "noOfRatings": 10
  }
  ```

- **For Multiple Restaurants:**

  ```json
  [
    {
      "name": "Restaurant Name 1",
      "description": "Brief description of the restaurant 1",
      "latitude": 23.259933,
      "longitude": 77.412613,
      "averageRating": 4.5,
      "noOfRatings": 10
    },
    {
      "name": "Restaurant Name 2",
      "description": "Brief description of the restaurant 2",
      "latitude": 23.259935,
      "longitude": 77.412615,
      "averageRating": 4.0,
      "noOfRatings": 8
    }
  ]
  ```

#### Response:

- **On Success:**
  - **For Single Restaurant:**
    ```json
    {
      "message": "Restaurant created successfully",
      "restaurant": {
        "_id": "unique_restaurant_id",
        "name": "Restaurant Name",
        "description": "Brief description of the restaurant",
        "location": {
          "type": "Point",
          "coordinates": [77.412613, 23.259933]
        },
        "averageRating": 4.5,
        "noOfRatings": 10
      }
    }
    ```

  - **For Multiple Restaurants:**
    ```json
    {
      "message": "Restaurants created successfully",
      "restaurants": [
        {
          "_id": "unique_restaurant_id_1",
          "name": "Restaurant Name 1",
          "description": "Brief description of the restaurant 1",
          "location": {
            "type": "Point",
            "coordinates": [77.412613, 23.259933]
          },
          "averageRating": 4.5,
          "noOfRatings": 10
        },
        {
          "_id": "unique_restaurant_id_2",
          "name": "Restaurant Name 2",
          "description": "Brief description of the restaurant 2",
          "location": {
            "type": "Point",
            "coordinates": [77.412615, 23.259935]
          },
          "averageRating": 4.0,
          "noOfRatings": 8
        }
      ]
    }
    ```

- **On Failure:**
  ```json
  {
    "error": "Error message explaining the issue"
  }
  ```

#### Example cURL Request:

- **Single Restaurant:**

  ```bash
  curl -X POST http://localhost:3000/api/restaurant/create -H "Content-Type: application/json" -d '{
    "name": "Sample Restaurant",
    "description": "A cozy place with delicious food",
    "latitude": 23.259933,
    "longitude": 77.412613,
    "averageRating": 4.5,
    "noOfRatings": 10
  }'
  ```

- **Multiple Restaurants:**

  ```bash
  curl -X POST http://localhost:3000/api/restaurant/create -H "Content-Type: application/json" -d '[
    {
      "name": "Sample Restaurant 1",
      "description": "A cozy place with delicious food 1",
      "latitude": 23.259933,
      "longitude": 77.412613,
      "averageRating": 4.5,
      "noOfRatings": 10
    },
    {
      "name": "Sample Restaurant 2",
      "description": "A cozy place with delicious food 2",
      "latitude": 23.259935,
      "longitude": 77.412615,
      "averageRating": 4.0,
      "noOfRatings": 8
    }
  ]'
  ```

#### Notes:
- Ensure that the `latitude` and `longitude` values are correct and within the valid range.
- The `averageRating` should be a number between 0 and 5, and `noOfRatings` should be an integer.

### README Instructions for `getAllRestaurants` Route

#### Route: `/api/restaurant`  
**Method:** `GET`

This route retrieves a list of all restaurants from the database and returns them in a structured format.

#### Response Format:

- **On Success:**  
  The response will be an array of restaurant objects with the following structure:

  ```json
  [
    {
      "Name of restaurant": "Restaurant Name",
      "Description of restaurant": "Brief description of the restaurant",
      "Location Restaurant": {
        "latitude": 23.259933,
        "longitude": 77.412613
      },
      "Average Rating of the restaurant": 4.5,
      "No. of Ratings": 10
    },
    {
      "Name of restaurant": "Another Restaurant Name",
      "Description of restaurant": "Another brief description",
      "Location Restaurant": {
        "latitude": 23.259935,
        "longitude": 77.412615
      },
      "Average Rating of the restaurant": 4.0,
      "No. of Ratings": 8
    }
  ]
  ```

- **On Failure:**
  ```json
  {
    "message": "Error message explaining the issue"
  }
  ```

#### Example cURL Request:

```bash
curl -X GET http://localhost:3000/api/restaurant
```

#### Notes:
- This route does not require any parameters or body data.
- The response is formatted to include the restaurant's name, description, location (latitude and longitude), average rating, and the number of ratings.

### README Instructions for `getRestaurantsByLocation` Route

#### Route: `/api/restaurant/location`  
**Method:** `GET`

This route retrieves a list of restaurants based on the specified geographic location and distance parameters.

#### Query Parameters:

- `Latitude` (required): The latitude of the location from which to search.
- `Longitude` (required): The longitude of the location from which to search.
- `Radius` (optional): The maximum distance (in meters) from the location to search. If not provided, the `maximumDistance` parameter is used.
- `minimumDistance` (optional): The minimum distance (in meters) from the location to search. Defaults to 0 if not provided.
- `maximumDistance` (optional): The maximum distance (in meters) from the location to search. If not provided, the `Radius` parameter is used.

#### Response Format:

- **On Success:**  
  The response will be an array of restaurant objects with the following structure:

  ```json
  [
    {
      "Name of restaurant": "Restaurant Name",
      "Description of restaurant": "Brief description of the restaurant",
      "Location Restaurant": {
        "latitude": 23.259933,
        "longitude": 77.412613
      },
      "Average Rating of the restaurant": 4.5,
      "No. of Ratings": 10
    },
    {
      "Name of restaurant": "Another Restaurant Name",
      "Description of restaurant": "Another brief description",
      "Location Restaurant": {
        "latitude": 23.259935,
        "longitude": 77.412615
      },
      "Average Rating of the restaurant": 4.0,
      "No. of Ratings": 8
    }
  ]
  ```

- **On Failure:**
  ```json
  {
    "error": "Error message explaining the issue"
  }
  ```

#### Example URL:

To request restaurants near a specific location with a maximum radius of 1000 meters, use:

```
http://your-api-domain/api/restaurant/location?Latitude=40.7128&Longitude=-74.0060&Radius=1000
```

Replace `http://your-api-domain` with your actual API domain and adjust the parameters as needed.

#### Notes:
- Ensure that both `Latitude` and `Longitude` parameters are provided.
- The `Radius`, `minimumDistance`, and `maximumDistance` parameters are optional. If not provided, default values will be used.

### README Instructions for `UpdateRestaurants` Route

#### Route: `/api/restaurant/update/:id`  
**Method:** `POST`

This route updates the details of a specific restaurant in the database.

#### URL Parameters:

- `id` (required): The unique identifier of the restaurant to be updated.

#### Request Body:

The request body should contain the fields to be updated. The structure depends on the restaurant schema. Example:

```json
{
  "name": "Updated Restaurant Name",
  "description": "Updated description of the restaurant",
  "averageRating": 4.7,
  "noOfRatings": 15
}
```

#### Response Format:

- **On Success:**  
  The response will include the updated restaurant details along with a success message:

  ```json
  {
    "restaurant": {
      "_id": "60c72b2f9b1d8e001f6473d6",
      "name": "Updated Restaurant Name",
      "description": "Updated description of the restaurant",
      "location": {
        "type": "Point",
        "coordinates": [77.412613, 23.259933]
      },
      "averageRating": 4.7,
      "noOfRatings": 15
    },
    "msg": "Restaurant Details Updated successfully"
  }
  ```

- **On Failure:**
  - **Restaurant Not Found (404):**
    ```json
    {
      "message": "Restaurant not found"
    }
    ```

  - **Server Error (500):**
    ```json
    {
      "message": "Error message explaining the issue"
    }
    ```

#### Example URL:

To update a restaurant with ID `60c72b2f9b1d8e001f6473d6`, you would send a `PUT` request to:

```
http://your-api-domain/api/restaurant/update/60c72b2f9b1d8e001f6473d6
```

Replace `http://your-api-domain` with your actual API domain and include the appropriate request body.

#### Notes:
- Ensure that the restaurant ID (`:id`) is valid and corresponds to an existing restaurant.
- The request body should match the fields defined in the restaurant schema. Only the fields that need to be updated should be included.

### README Instructions for `DeleteRestaurant` Route

#### Route: `/api/restaurant/delete/:id`  
**Method:** `DELETE`

This route deletes a specific restaurant from the database.

#### URL Parameters:

- `id` (required): The unique identifier of the restaurant to be deleted.

#### Response Format:

- **On Success:**  
  The response will include a success message:

  ```json
  {
    "message": "Restaurant deleted successfully"
  }
  ```

- **On Failure:**
  - **Restaurant Not Found (404):**
    ```json
    {
      "message": "Restaurant not found"
    }
    ```

  - **Server Error (500):**
    ```json
    {
      "message": "Error message explaining the issue"
    }
    ```

#### Example URL:

To delete a restaurant with ID `60c72b2f9b1d8e001f6473d6`, you would send a `DELETE` request to:

```
http://your-api-domain/api/restaurant/delete/60c72b2f9b1d8e001f6473d6
```

Replace `http://your-api-domain` with your actual API domain.

#### Notes:
- Ensure that the restaurant ID (`:id`) is valid and corresponds to an existing restaurant.
- This route does not require a request body.