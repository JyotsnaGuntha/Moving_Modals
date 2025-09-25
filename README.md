# Movable Modals

A simple web application demonstrating a movable, responsive modal component


## Tech Stack

- JavaScript
- HTML
- CSS
- Docker
- Nginx


## How to Run

To run this project, you need to have **Docker** installed and running on your machine.

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/JyotsnaGuntha/Moving_Modals.git
    ```

2.  **Navigate into the project folder:**
    ```sh
    cd Moving_Modals
    ```

3.  **Build the Docker image:**
    ```sh
    docker build -t osi-modal-app .
    ```

4.  **Run the container:**
    ```sh
    docker run -p 8080:80 osi-modal-app
    ```

5.  **View the application:**
    Open your web browser and navigate to `http://localhost:8080`.
