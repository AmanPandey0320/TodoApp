# TodoApp
App link: https://aman-todoapp.herokuapp.com/mytodoapp
## End-points
Base URL: hhttps://aman-todoapp.herokuapp.com/
### user/signup:
It a post request and requires a body to be sent with type {"username":"someusername", "password":"yourpassword"}. This is used to signup the new user.
 
### user/signin:
It a post request and requires a body to be sent with type {"username":"someusername", "password":"yourpassword"}. This is used to signin the old user.
 
### todo/add:
It a put request and requires a body to be sent with type {"id":"someusername", "time":"millisecondsfromepoch", "title":"your task title", "description":"description to the task"}. This adds new tasks for particular user. username and time stamp is used as the key(id) for each data.
 
### todo/tasks?username=your user name
It a get request and requires a query to be sent with type username=your username. This returns all the tasks by a particular user.

### todo/delete
It a delete request and requires a body to be sent with type {"id":"someusername", "time":"millisecondsfromepoch"}.This delets a tasks for particular user, username and time stamp is used as the key(id) for each data.

### todo/update
It a put request and requires a body to be sent with type {"id":"someusername", "time":"millisecondsfromepoch", "title":"your task title", "description":"description to the task"}. This updates tasks for particular user where username and time stamp is used as the key(id) for each data.
