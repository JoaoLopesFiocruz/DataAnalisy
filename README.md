# Project Name
## FineBank - Financial Management DashBoard
This project is constructed in Fiocruz to make an statistic analyse from the Library Manguinhos. 
# Programer
## João Gabriel Pereira Lopes
# Technologies
    - React
    - Node
    - Typescript
    - SQL
    - Tailwind
# Company
## Fiocruz/ICICT/CTIC
This project is a project from the Institutional Program of Scientific Initiation Scholarships of João Gabriel Pereira Lopes with the advisors Rosane Abdala Lins and Aline da Silva Alves.  
This Institutional Program of Scientific Initiation Scholarships is making in the ICIT(Institute of Communication and Scientific Information) with the financing of the PIBIC(Institutional Program of Scientific Initiation Scholarships) and the organization from ESPJV(Joaquim Venâncio Polytechnic School of Health)
# Objective
The objetive of this iniciacion is investigate and development of accessible and inclusive digital technologies, with the focus to break barrier experienced by peoples with deficiency in the use of tecnologic to access of information in health.  
In this direction the objetive is the producion of knowledge teoric and technician to contribute to the pratice of pratic of acessibility design, that supports all demands of  diversity of  brazilian popolucion, following the principles of Unified Health System(SUS).  
At the end, this student will develop a dashboard to analyze the balance of the Manguinhos library.
# Applications
This website have three application communicating with each other, this separacion is to make the site more security, scalable and more light to the server, one time it's possible I run each aplication in a diference server.
## Frontend
This application is the visual, here, I take the data and transform in React components, showing a beautiful interface with the data, here, I show Graphics, Images, button... This aplication is runned by the user in your browser, it make the user can use the service and view the data in a better visual form.
## Backend
This application is to connect the frontend to database and the archive server, this application take the frontend data requests, valid, control the acess, answer the requets with the data requested, if needed, processes the information before send to the frontend.
### Backend Routes
#### get /users/:id
This route is to take an specific user from their id, returning their data
``` json
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
This route is to create a new user in the database, creating a new account.
``` json
Request
{
    "Password":"123",
    "Name":"Hermenegildo123", 
    "Email":"Hermenegildo123@god.com"
}
Response
{
    "Message": "Create suceffuly",
    "Status": 200,
    "Sucess": true
}
```
#### put /users/:id
This route is to update a user in the database, changing the account data.
Obs: the paramethers are opcional, except the password
``` json
/users/3 
Request
{
	"Password":"123", 
	"Name":"Hermenegildo", 
	"Email":"Hermenegildo123@god.com"
}
Response
{
	"Message": "Update Suceffully Hermenegildo",
	"Status": 200,
	"Sucess": true
}
```
#### del /users/:id
This route is to delete the user account.
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
This route is to Create a valide token to login in the site.
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
This application is too manage the files, in this case, manage images. This application save, update ,delete and answer the file request from the backend.