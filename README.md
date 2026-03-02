# Project Name
    Native Brasil- Native Population Statistic DashBoard
    This project was developed by Fiocruz to perform a statistical analysis of the Native Populations of Brazil. 
# Programer
    João Gabriel Pereira Lopes
    Aline da Silva Alve
    Rosane Abdala Lins
    Fabrício Procaci Santiago
# Technologies
    - React
    - Node
    - Typescript
    - SQL
    - Tailwind
# Company
## Fiocruz/ICICT/CTIC
This project is part of the Institutional Scientific Initiation Scholarship Program developed by João Gabriel Pereira Lopes under the supervision of Rosane Abdala Lins and Aline da Silva Alves.  
This Institutional Scientific Initiation Scholarship Program is conducted at ICICT (Institute of Communication and Scientific Information in Health), funded by PIBIC (Institutional Program for Scientific Initiation Scholarships), and organized by ESPJV (Joaquim Venâncio Polytechnic School of Health).
# Objective
The objective of this research is to investigate and develop accessible and inclusive digital technologies, focusing on breaking barriers experienced by people with disabilities in accessing health information through technology.  
In this context, the objective is to produce theoretical and technical knowledge that contributes to accessibility design practices, supporting the diverse demands of the Brazilian population, in accordance with the principles of the Unified Health System (SUS)..  
At the end of the project, the student will develop a dashboard to analyze the data about the Native Populations of Brazil.
# Applications
This website has three applications that communicate with each other. This separation makes the system more secure, scalable, and lighter on the server, since it allows each application to run on a different server if necessary.
## Frontend
This application is responsible for the user interface. It transforms data into React components, presenting a visually appealing interface with charts, images, and interactive elements. The application runs in the user's browser, allowing users to access the service and visualize the data in a more intuitive way.
## Backend
This application connects the frontend to the database and the archive server. It handles requests from the frontend, validates them, controls access, and responds with the requested data. If necessary, it processes the information before sending it back to the frontend.
### Backend Routes
#### get /users/:id
This route retrieves a specific user by ID and returns their data.
```json
{
    "Message": "Consulta Realizada com Sucesso",
    "Data": [
        {
            "id": 2,
            "Name": "Hermenegildo",
            "Email": "Email.Email.com"
        }
    ],
    "Status": 200,
    "Sucess": true
}
```
#### post /users
This route creates a new user in the database.  
**Request**
```json
{
    "Password":"123",
    "Name":"Hermenegildo123", 
    "Email":"Hermenegildo123@god.com"
}
```
**Response**
```json
{
    "Message": "Create suceffuly",
    "Status": 200,
    "Sucess": true
}
```
#### put /users/:id
This route updates a user in the database, allowing modification of account information.
Note: All parameters are optional except for the password.
**/users/3 Request**
```json
{
    "Password":"123",
    "Name":"Hermenegildo",
    "Email":"Hermenegildo123@god.com"
}
```
**/users/3 Response**
```json
{
    "Message": "Update Suceffully Hermenegildo",
    "Status": 200,
    "Sucess": true
}
```    
    
#### del /users/:id
This route deletes a user's account.
``` json
    /users/2
    Request
    {
        "Password":"12345"
    }
    Response
    {
        "Message": "Deleted Successfully",
        "Status": 200,
        "Sucess": true
    }
```   
#### put /users/Login
This route is used to create a valid token to log in to the site.
``` json
    request
    {
        "Password":"123",
        "Name":"Hermenegildo123",
        "Email":"Hermenegildo123@god.com"
    }
    Response
    {
        "Message": "Login Successfully",
        "Data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiRW1haWwiOiJIZXJtZW5lZ2lsZG8xMjNAZ29kLmNvbSIsIkdlbmVyYXRlZCI6IjIwMjUtMTItMjNUMTU6Mjg6NTIuNDk4WiIsImlhdCI6MTc2NjUwMzczMiwiZXhwIjoxNzY2NTEwOTMyfQ.1cNCrV7yW31p1i4fVjhlibDdkv79g1HhvspYY9Rlfvw",
        "Status": 200,
        "Sucess": true
    }
```   

## Archive
This application is used to manage files, specifically images. It saves, updates, deletes, and responds to file requests from the backend.
