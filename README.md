1. Clone the Repository

git clone https://github.com/Sanchittanwar30/task_manager_api.git

cd task_manager_app

2. Install dependencies:
   
npm install

3. Start the server
node index.js



EXAMPLE API REQUEST : 

1. Create a Task 
REQUEST :   POST /tasks

 raw json:

 {
  "title": "Welcome to Task manager app",
  "description": "Building REST APIs",
  "status": "pending"
}

RESPONSE : 

{
    "id": 1,
    "title": "Welcome to Task manager app",
    "description": "Building REST APIs",
    "status": "pending",
    "createdAt": "2025-09-11T20:15:21.114Z"
}

2. Get All Tasks 
   
REQUEST : GET /tasks
         

RESPONSE : 

{
    "page": 1,
    "limit": 1,
    "total": 1,
    "tasks": [
        {
            "id": 1,
            "title": "Welcome to Task manager app",
            "description": "Building REST APIs",
            "status": "pending",
            "createdAt": "2025-09-11T20:15:21.114Z"
        }
    ]
}

3. Get Task by ID

REQUEST : GET /tasks/1
          Host: localhost:3000

RESPONSE : 

{
    "id": 1,
    "title": "Welcome to Task manager app",
    "description": "Building REST APIs",
    "status": "pending",
    "createdAt": "2025-09-11T20:15:21.114Z"
}

4. UPDATE a Task 
REQUEST:
PUT /tasks/1

Content-Type: application/json

{
  "status": "completed"
}

RESPONSE : 
{
    "id": 1,
    "title": "Welcome to Task manager app",
    "description": "Building REST APIs",
    "status": "completed",
    "createdAt": "2025-09-11T20:15:21.114Z"
}

5. DELETE a Task 

REQUEST : 
DELETE /tasks/1
// response deleted task 

RESPONSE : 
{
    "id": 1,
    "title": "Welcome to Task manager app",
    "description": "Building REST APIs",
    "status": "pending",
    "createdAt": "2025-09-11T20:20:56.503Z"
}


6. Filtering Tasks by Status : 
   
   REQUEST : GET /tasks?status=pending

   RESPONSE : [
  {
    "id": 1,
    "title": "Task 1",
    "description": "Do something",
    "status": "pending",
    "createdAt": "2025-09-12T10:00:00.000Z"
  },
  {
    "id": 3,
    "title": "Task 3",
    "description": "Another pending task",
    "status": "pending",
    "createdAt": "2025-09-12T10:10:00.000Z"
  }
]

7. PAGINATION : 

REQUEST : /tasks?page=2&limit=3



RESPONSE :

 {
  "page": 2,
  "limit": 3,
  "totalTasks": 8,
  "tasks": [
    {
      "id": 4,
      "title": "Task 4",
      "description": "Task description",
      "status": "completed",
      "createdAt": "2025-09-12T10:15:00.000Z"
    },
    {
      "id": 5,
      "title": "Task 5",
      "description": "Another task",
      "status": "in-progress",
      "createdAt": "2025-09-12T10:20:00.000Z"
    },
    {
      "id": 6,
      "title": "Task 6",
      "description": "Yet another task",
      "status": "pending",
      "createdAt": "2025-09-12T10:25:00.000Z"
    }
  ]
}



FOR RANDOM CREATION OF TASKS : 

REQUEST : 
POST /tasks 

PRE-SCRIPT : 
const statuses = ["pending", "in-progress", "completed"];
pm.variables.set("randomStatus", statuses[Math.floor(Math.random() * statuses.length)]);


BODY : {
  "title": "Task {{$randomInt}}",
  "description": "Random description {{$randomLoremSentence}}",
  "status": "{{randomStatus}}"
}

RESPONSE : 

RUNNER TAB : creations as per the number of iterations defined.








  




