# node-weightlifting-db

Base URL of deployed version: https://node-weightlifting-db.herokuapp.com/

Front End: TBD


## Register & Login

Method | Endpoint | Description 
------ | -------- | -----------
POST | `api/auth/register` | accepts `username` and `password`, and creates a  `user`
POST | `api/auth/login` | accepts `username` and `password`, and returns a message and token, given valid credentials


#### Accepted Register Schema - POST

```
{
  "username": "stitch",
  "password": "donuts"
}
```

##### Response Body

```
[
  `user_id`
]
```

#### Accepted Login Schema - POST

```
{
  "username": "stitch",
  "password": "donuts"
}
```

##### Response Body

```
{
  "message": "Welcome stitch!",
  "token": "eyJhbHciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJwcmlpaWkiLCJpYXQiOjE2MDMwNzMzMDUsImV4cCI6MTYwMzE1OTcwNX0.nVFWscn817lLmvCgBMcwP8oKu2VLQiqPC_wofLEDyeE"
}
```


## Workouts
##### all endpoints require authorization token

Method | Endpoint | Description
------ | -------- | -----------
GET | `api/workouts` | returns all workouts
GET | `api/workouts/:id` | returns workout with specified id
POST | `api/workouts` | creates a new workout
PATCH | `api/workouts/:id` | updates workout with specified id
DELETE | `api/workouts/:id` | deletes workout with specified id
GET | `api/workouts/:id/exercises` | returns exercises for the specified workout (given the id) if workout exists
POST | `api/workouts/:id/exercises` | adds an exercise to the specified workout (given the id) if workout exists


##### Response Body - GET all workouts

```
[
  {
    "id": 1,
    "name": "Dep 1",
    "created_at": "2020-10-18T16:55:03.388Z",
    "updated_at": "2020-10-18T16:55:03.388Z"
  },
  {
    "id": 2,
    "name": "Dep 3",
    "created_at": "2020-10-18T17:03:55.067Z",
    "updated_at": "2020-10-18T17:03:55.067Z"
  }
]
```

##### Response Body - GET workout by id

```
[
  {
    "id": 2,
    "name": "Dep 3",
    "created_at": "2020-10-18T17:03:55.067Z",
    "updated_at": "2020-10-18T17:03:55.067Z"
  }
]
```

#### Accepted Workout Schema - POST new workout

```
{
  "name": "Day4",
}
```

##### Response Body

```
[
  {
    "id": 4,
    "name": "Day4"
  }
]
```

#### Accepted Workout Schema - PATCH workout with id

```
{
  "name": "Day 4",
}
```

##### Response Body

```
[
  {
    "id": 4,
    "name": "Day 4"
  }
]
```

##### Response Body - DELETE workout with id

```
{
  "message": "Workout deleted."
}
```

##### Response Body - GET exercises for workout with given workout id

```
[
  {
    "workout_id": 1,
    "workout_name": "Dep 1",
    "exercise_id": 3,
    "exercise_name": "triceps",
    "weight_lifted": "5 lbs",
    "reps": 3,
    "exercise_region": "Upper Body"
  },
  {
    "workout_id": 1,
    "workout_name": "Dep 1",
    "exercise_id": 5,
    "exercise_name": "biceps",
    "weight_lifted": "5 lbs",
    "reps": 3,
    "exercise_region": "Upper Body"
  }
]
```

#### Accepted Workout Schema - POST exercise to workout with given workout id

```
{
	"name": "biceps",
	"weight_lifted": "5 lbs",
	"reps": 3,
	"exercise_region": "Upper Body"
}
```

##### Response Body

```
[
  {
    "id": 5,
    "name": "biceps",
    "weight_lifted": "5 lbs",
    "reps": 3,
    "exercise_region": "Upper Body"
  }
]
```


## Exercises
##### all endpoints require authorization token

Method | Endpoint | Description
------ | -------- | -----------
DELETE | `api/exercises/:id` | deletes the exercise with the specified id


##### Response body - DELETE exercise by id
```
{
	"message": "Exercise with id #id was deleted."
}
```


## Users - for Adminstrative purposes ONLY
##### all endpoints require authorization token

Method | Endpoint | Description
------ | -------- | -----------
GET | `api/users` | returns all existing users
GET | `api/users/:username` | returns user with given username, if it exists in the database


##### Response Body - GET all users
```
[
  {
    "id": 1,
    "username": "stitch",
    "password": "$2a$10$xr6hMkVb1dZF9koaptFQ5OXdYiV0BijCdAUb6JZFoFM8QjcDtDa5y"
  },
  {
    "id": 2,
    "username": "random",
    "password": "$2a$10$IKvfgbDqLn2o0x8jgFFvM.mBNiLItU8xSAgjaVTLuQcbTcEiviHyC"
  },
]
```

##### Response Body - GET user by username
```
[
  {
    "id": 1,
    "username": "stitch",
    "password": "$2a$10$xr6hMkVb1dZF9koaptFQ5OXdYiV0BijCdAUb6JZFoFM8QjcDtDa5y"
  }
]
```