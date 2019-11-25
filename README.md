FANCY-TODOS

REST-API Documentation

---

GETTING STARTED

installation

first things first, open the server folder, then open your terminal and run this command

    npm install

It will install all dependecy it needed

set your environment variabel by type ' touch .env ' in your terminal and set variables like in  env example

env example :

    PORT=
    SECRET=
    
    *the PORT variabel following Number (ex. PORT=3000)
    *the SECRET variabel following by String (ex. SECRET="owlqueen")



all you need to do next is back to your terminal. Then run this command

    npm run dev

and.... Voila :)

---





USER

GET All Users

    path: '/users/',
    method: 'GET',
    body: 'none'

example output :

    [
      {
        "_id": "5dd94fdc423dfc2b5572e46d",
        "projects": [],
        "username": "owl",
        "password": "$2a$04$MoA4YyDKMQEdJENlt9A/Vupj67FKeNG8RVLvVb/6QdIXEdf3M5co2",
        "__v": 0
      },
      {
        "_id": "5dd9505f54c8d42b81058b88",
        "username": "orca",
        "password": "$2a$04$4NZwgYu0IQ15lwq/fzu1SedaJRXMdUCNXHhGxR0wrP6DR00KXMUWG",
        "__v": 0
      },
      {
        "_id": "5dd9506c54c8d42b81058b89",
        "username": "panda",
        "password": "$2a$04$1C6Us1PAEPFjD9WX0y1WKeafZqmzS7OdQsbcXC7QAU25WH34XsIOe",
        "__v": 0
      },
      {
        "_id": "5dd9507754c8d42b81058b8a",
        "username": "mongol",
        "password": "$2a$04$ahPY4xhHoIRTXvF8cbCziupaLgcSaXTXLtPjeuVT6cVd92HL1ruBW",
        "__v": 0
      }
    ]



POST New User

    path: '/users/',
    method: 'POST',
    body: {
        username,
        password
    }

example output :

    {
      "user": {
        "_id": "5dd9507754c8d42b81058b8a",
        "username": "mongol",
        "password": "$2a$04$ahPY4xhHoIRTXvF8cbCziupaLgcSaXTXLtPjeuVT6cVd92HL1ruBW",
        "__v": 0
      },
      "message": "Thank you mongol :), now you can process your login"
    }



POST Login User

    path: '/users/login',
    method: 'POST',
    body: {
        username,
        password
    }

example output :

    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNWRkOTRmZGM0MjNkZmMyYjU1NzJlNDZkIiwidXNlcm5hbWUiOiJvd2wifSwiaWF0IjoxNTc0NTIzMjk5LCJleHAiOjE1NzQ1MjY4OTl9.OQtD-Z5xyQgCSwi5uN6mlQrivxUmJVca_9Br0p4iajg",
      "message": "Welcome owl, We hope you enjoy our app"
    }



TODOS

POST New Todo

    path: '/todos/',
    method: 'POST',
    headers: token
    body: {
        title,
        description
    }

example output : 

    {
      "todo": {
        "_id": "5dd9525e54c8d42b81058b8b",
        "title": "Chapter I",
        "description": "This is description I",
        "user": "5dd94fdc423dfc2b5572e46d",
        "__v": 0
      },
      "message": "Your new todo has added to your list"
    }



GET User Todo

    path: '/todos/',
    method: 'GET',
    headers: token
    body: none

example output : 

    [
      {
        "_id": "5dd9525e54c8d42b81058b8b",
        "title": "Chapter I",
        "description": "This is description I",
        "user": "5dd94fdc423dfc2b5572e46d",
        "__v": 0
      },
      {
        "_id": "5dd9531c54c8d42b81058b8c",
        "title": "Chapter II",
        "description": "This is description II",
        "user": "5dd94fdc423dfc2b5572e46d",
        "__v": 0
      },
      {
        "_id": "5dd9532454c8d42b81058b8d",
        "title": "Chapter III",
        "description": "This is description III",
        "user": "5dd94fdc423dfc2b5572e46d",
        "__v": 0
      }
    ]



PUT Update Todo

    path: '/todos/:todoId',
    method: 'PUT',
    headers: token
    body: {
        title,
        description
    }

example output :

    {
      "message": "Your selected todo has been updated"
    }



UPDATE Todo Status

    path: '/todos/:todoId',
    method: 'PATCH',
    headers: token
    body: none

example output :

    {
      "message": "Todo set to completed"
    }



DELETE Update Todo

    path: '/todos/:todoId',
    method: 'DELETE',
    headers: token
    body: node

example output :

    {
      "message": "Your selected todo has been deleted"
    }





PROJECT

You can made some projects where you can invite members to the project by using username as find key. In that project, only members who can update or delete the todo in that project. But, for deleting that project, authorize just belongs to owner who made the project.



GET All Project

    path: '/projects/',
    method: 'GET',
    headers: token,
    body: none

example output :

    {
      "projects": [
        {
          "members": [
            "5dd94fdc423dfc2b5572e46d",
            "5dd9506c54c8d42b81058b89"
          ],
          "todos": [],
          "_id": "5dd956f31f6b622c8c84d95a",
          "projectName": "Project chapter I",
          "owner": "5dd94fdc423dfc2b5572e46d",
          "__v": 0
        },
        {
          "members": [
            "5dd94fdc423dfc2b5572e46d"
          ],
          "todos": [],
          "_id": "5dd9574d1f6b622c8c84d95b",
          "projectName": "Project chapter II",
          "owner": "5dd94fdc423dfc2b5572e46d",
          "__v": 0
        }
      ]
    }



POST New Project

    path: '/projects/',
    method: 'POST',
    headers: token,
    body: {
        projectName
    }

example output :

    {
      "project": {
        "members": [
          "5dd94fdc423dfc2b5572e46d"
        ],
        "todos": [],
        "_id": "5dd956f31f6b622c8c84d95a",
        "projectName": "Project chapter I",
        "owner": "5dd94fdc423dfc2b5572e46d",
        "__v": 0
      },
      "message": "Your new project has added to your project list"
    }



POST New Project Todo

    path: '/projects/:projectId/todos',
    method: 'POST',
    headers: token,
    body: {
        title,
        description
    }

example output :

    {
      "project": {
        "members": [
          "5dd94fdc423dfc2b5572e46d"
        ],
        "todos": [],
        "_id": "5dd956f31f6b622c8c84d95a",
        "projectName": "Project chapter I",
        "owner": "5dd94fdc423dfc2b5572e46d",
        "__v": 0
      },
      "message": "Your new project has added to your project list"
    }



POST Todo

    path: '/projects/:projectId/todos',
    method: 'PUT',
    headers: token,
    body: {
        title,
        description
    }

example output :

    {
      "newTodo": {
        "_id": "5ddbcd58dcc18a44b1e69ae0",
        "title": "This is todos project panda",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 						inim veniam, quis nostrud exercitation ullamco laboris nisi ut 							aliquip ex ea commodo consequat. ",
        "user": "5dda5f975c9dd754c9084f24",
        "project": "5dda705d469c43576ec6a609",
        "__v": 0
      },
      "message": "Your todo has added to your project"
    }



UPDATE  Todo

    path: '/projects/:projectId/todos',
    method: 'PUT',
    headers: token,
    body: {
        title,
        description
    }

example output :

    {
      "message": "Your todo Project has been updated"
    }



DELETE Todo

    path: '/projects/:todoId/todos',
    method: 'DELETE',
    headers: token
    body: none

example output :

    {
      "message": "Your project todo has been deleted"
    }



UPDATE Todo Status

    path: '/projects/:todoId/todos',
    method: 'PATCH',
    headers: token
    body: none

example output :

    {
      "message": "Todo set to completed"
    }



PATCH Add new Member

    path: '/projects/:projectId/',
    method: 'PATCH',
    body: {
        username
    }
    

example output :

    {
      "message": "orca has been added to Project chapter I members"
    }























ERROR

Authorize Delete Project Todo

    {
      "message": "Just Owner cant delete this project"
    }
































