# Airtribe assignment

### Setup
```
$ git clone https://github.com/AnshVM/airtribe-assignment.git
$ cd airtribe-assignment
$ docker-compose up
```
This will start the server on ```http://localhost:8000/``` 

### Running tests
For running tests you'll need to setup postgres first

Create a .env file in the project root directory and paste the below contents
```
PGHOST=localhost
PGPORT=5432
PGDATABASE=airtribe
PGUSER=postgres
PGPASSWORD=password
```
Next setup the postgres image
```
$ docker pull postgres

$ docker run \ 
--name aitribe \ 
--e POSTGRES_PASSWORD=password \ 
-d \ 
-p 5432:5432 \ 
postgres

$ `docker exec -it airtribe psql -U postgres -c "CREATE DATABASE airtribe;"`
```
In a seperate terminal run the server
```
$ npm run dev
```
Once postgres is ready and the server is running
To run tests
```
$ npm run test
```


### API specification
Create instructor
```
POST /api/instructor

request : {
	name: string
}
response: {
	id: number
}
```

Get instructor by id
```
GET /api/instructor/:id

response {
	name:string
}
```
Create course
```
POST /api/course

request {
	name: string,
	instructorId: number,
	maxSeats: number,
	startDate: Date
}
response {
	id: number
}
```
Update course details
```Note: '?' stands for optional field.```
```
PUT /api/

request {
	id: number,
	name?: string,
	maxSeats?: number,
	startDate?: Date
}
response {
	success:true
}
```
Get course by id 
```
GET /api/course/:id

response {
	id: number,
	name: string,
	maxSeats: number,
	startDate: Date,
	instructorId: number
}
```

Create Lead / Course registration
```
POST /api/lead

request {
	courseId: number,
	name: string,
	email: string,
	phone: string,
	linkedin: string
}
response {
	id: number
}
```
Get lead by id
```
GET /api/lead/:id

response {
	id: number,
	course_id: number,
	status: string,
	name: string,
	phone:string,
	linkedin: string
}
```
Update lead status
```
PUT /api/lead/status

request {
	instructorId:number,
	leadId: number,
	status: string
}
response {
	success:true
}
```

Search leads by name or email
```
GET /api/lead/search?name="name"
GET /api/lead/search?email="email"

response :[{
	id: number,
	course_id: number,
	status: string,
	name: string,
	phone:string,
	linkedin: string
}]
```
Add comment
```
POST /api/comment

request {
	comment:string,
	instructorId: string,
	leadId: string
}
response {
	id: number
}
```

Get comments by lead id
```
GET /api/lead/comments/:id

response [{
	comment:string,
	instructorId: string,
	leadId: string
}]

```
