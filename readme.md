# Project Documentation

## Overview

This project is a web application using React for the frontend and Express with Redis for the backend. It allows users to increment and decrement counters for different sections (header, left, article, right, footer) and stores these values in a Redis database. The frontend communicates with the backend to update and retrieve data, ensuring state synchronization.

## Technologies

- **Frontend**: React
- **Backend**: Express
- **Database**: Redis
- **HTTP Client**: SuperAgent

## Structure

### Frontend (React)

1. **App Component**: Manages state and handles backend communication.
2. **PlusMinus Component**: Provides buttons to increment and decrement counters.
3. **Data Component**: Displays counter values.
4. **Rest of components**: represent specific parts of the layout


### Backend (Express)

1. **GET /data**: Retrieves counter values from Redis.
2. **GET /update/:section/:value**: Updates a specific counter in Redis.


#### Initialize Redis

The `initializeRedis` function connects to the Redis server and sets initial values for the counters. This function is called when the server starts to ensure that the Redis database is initialized with default values.

#### Retrieve Data

The `/data` endpoint retrieves the current values of the counters from Redis. It uses the `getData` function to fetch the values from Redis and sends the data back to the client.

#### Update Data

The `/update/:section/:value` endpoint updates the value of a specific counter in Redis. It takes the section and value as parameters, updates the corresponding value in Redis, and then retrieves the updated data to send back to the client.



### Running the Project

To run the project, follow these steps:

1. **Install Dependencies**: Run `npm install` to install the required dependencies.
2. **Start Redis Server**: Ensure that the Redis server is running. You can start a Redis server using Docker with the following command:
    ```sh
    docker run --name redis -p 6379:6379 -d redis
    ```
3. **Start the Backend**: Run `node index.js` to start the Express server.
4. **Open the Frontend**: Open `index.html` in a web browser to view the application.


## Conclusion
This project demonstrates the integration of React, Express, and Redis to create a web application for managing counters. It showcases state management in React, backend communication, and data storage with Redis.