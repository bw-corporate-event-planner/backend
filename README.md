# Planr — A Corporate Event Planner - Back-End

#### https://egge-corporate-ep.herokuapp.com/

<!-- ![Tech Xchange](https://i.imgur.com/q4wJuO0.png) -->

# Samantha Egge

##### Back-End Developer

## Technologies Used
- This is a node.js express server
- The DB in use was postgresSQL, for persistant data
- 

### Initializing the Project for Local Use

- run `npm` in order to install all dependencies
- Replicate the .env.example variables in a local .env file
- use the command `npm run server` to run a live server!

## Dependencies

## devDependencies

### Available User Accounts

## User Endpoints

| Method | Endpoint               | Requires                        | Description                                                             |
| ------ | ---------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| POST   | `/api/register`  | `email`, `username`, `password`, `role_id` | Used for adding a new user to database.                                 |
| POST   | `/api/login`     | `username`, `password`          | Log a user in. Sets user information to a cookie, and returns user information from server. |
| GET   | `/api/logout`     | Authenticated User          | Log a user out from the server, and delete cookie. |
| GET    | `/api/users`           | Authenticated User                | Used to show all users in the database.                                 |
| GET    | `/api/users/:id/`      | Authenticated User                | Used to show a specific user in the database.       NOT IMPLEMENTED YET   |
| GET    | `/api/roles`            | Authenticated User                | Retrieve all roles in the database.                                      |


## Events Endpoints

| Method | Endpoint               | Requires                        | Description                                                             |
| ------ | ---------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| GET    | `/api/events`       | Authenticated User                | Retrieve a list of all events on server. Not paginated.                  |
| GET    | `/api/events/:id`       | Authenticated User                | Retrieve a specific Event. Also returns list items with vendor names.                  |
| POST   | `/api/events`           | Authenticated User (Admin, Manager Roles), Data          | Fields `event_title` .unique.notNullable, `event_description`.notNullable, `event_budget`.notNullable, `event_location`, `event_start`, `event_end`, `event_users`.foreign key from users |
| PUT    | `/api/events/:id`        | Authenticated User (Admin, Manager, User added to event), Data          | Any fields from above can be updated on a single event.                                 |
| DELETE    | `/api/events/:id`        | Authenticated User (Admin, Manager), Data          | Removes a single event from the server               |


## Vendor Endpoints

| Method | Endpoint               | Requires                        | Description                                                             |
| ------ | ---------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| GET    | `/api/vendors`       | Authenticated User                | Retrieve a list of all vendors on server. Not paginated.                  |
| GET    | `/api/vendors/:id`       | Authenticated User                | Retrieve a specific vendor.                  |
| POST   | `/api/vendors`           | Authenticated User, Data          | Fields `vendor_name` .unique.notNullable |
| PUT    | `/api/vendors/:id`        | Authenticated User, Data          | Update `vendor_name` field on a specific vendor.               |
| DELETE    | `/api/vendors/:id`        | Authenticated User (Admin, Manager), Data          | Removes a single vendor from the server               |


## Shopping List Endpoints

| Method | Endpoint               | Requires                        | Description                                                             |
| ------ | ---------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| GET    | `/api/lists`       | Authenticated User                | Retrieve a list of all lists on server. Uses Vendor table to send vendor_name with items. Not paginated.                  |
| GET    | `/api/lists/:id`       | Authenticated User                | Retrieve a specific shopping list item. Uses Vendor table to send vendor_name with item.                  |
| POST   | `/api/lists`           | Authenticated User (Admin, Manager, User on Event), Data          | Fields `event_id`.foreign, `item_name`.notNullable, `item_cost`.notNullable, `item_complete`.boolean defaults to false, `item_vendor`.foreign |
| PUT    | `/api/lists/:id`        | Authenticated User (Admin, Manager, User on Event), Data          | Update the fields above on the selected list item.               |
| DELETE    | `/api/lists/:id`        | Authenticated User (Admin, Manager), Data          | Removes a single item from the server               |
---

