# Dentiflow Project

This repository contains the **Dentiflow** project, organized into two main sections:
- **Frontend**: React-based user interface.
- **Backend**: Spring Boot microservices with Docker and Eureka.

---

## How to Run the Project

### Frontend

1. Navigate to the `frontend` folder:
   ```bash
   cd FrontEnd
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Run the front end:
   ```bash
   npm run dev
   ```


### Backend


1. Navigate to the `backend` folder:
   ```bash
   cd BackEnd
   ```
2. Start the Docker containers (databases):
   ```bash
   docker-compose up -d
   ```
3. Start the Microservices in the following order:
   1. Eureka
   2. Api-gateway
   3. then the rest of microservices

   
