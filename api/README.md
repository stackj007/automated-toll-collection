# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. adjust .env file to your database configuration
3. Run `npm start` command




Sure, here is the documentation for each route in your `index.ts` file in the format you requested:

## Routes documentation(AI-Generated)
1. Test Server
    - Description: Test route to check if the server is running
    - Authorization: None
    - Path: `/`
    - Method: GET

2. Register
    - Description: Registers a new user
    - Authorization: None
    - Path: `/api/register`
    - Method: POST
    - Request Body:
        - email: User's email address (required)
        - password: User's password (required)
        - confirmPassword: Confirmation of the password (required)
        - name: User's name (required)

3. Login
    - Description: Logs in a user
    - Authorization: None
    - Path: `/api/login`
    - Method: POST
    - Request Body:
        - email: User's email address (required)
        - password: User's password (required)

4. Logout
    - Description: Logs out a user
    - Authorization: User must be logged in
    - Path: `/api/logout`
    - Method: POST

5. Get Current User
    - Description: Gets the current logged in user
    - Authorization: User must be logged in
    - Path: `/api/user`
    - Method: GET

6. Get All Users
    - Description: Gets all users
    - Authorization: User must be an admin
    - Path: `/api/users`
    - Method: GET

7. Delete User
    - Description: Deletes a user
    - Authorization: User must be an admin
    - Path: `/api/delete-user`
    - Method: POST
    - Request Body:
        - id: ID of the user to delete (required)

8. Edit User
    - Description: Edits a user
    - Authorization: User must be an admin
    - Path: `/api/edit-user`
    - Method: POST
    - Request Body:
        - id: ID of the user to edit (required)
        - name: New name for the user (optional)
        - email: New email for the user (optional)

9. Submit User Request
    - Description: Submits a user request
    - Authorization: User must be logged in
    - Path: `/api/user-request`
    - Method: POST
    - Request Body:
        - vehicleNumber: Vehicle number for the request (required)

10. Get User Request
    - Description: Gets a user request
    - Authorization: User must be logged in
    - Path: `/api/user-request`
    - Method: GET

11. Get All User Requests
    - Description: Gets all user requests
    - Authorization: User must be an admin
    - Path: `/api/user-requests`
    - Method: GET

12. Accept User Request
    - Description: Accepts a user request
    - Authorization: User must be an admin
    - Path: `/api/user-requests/:id/accept`
    - Method: POST
    - Path Parameters:
        - id: ID of the request to accept (required)

13. Reject User Request
    - Description: Rejects a user request
    - Authorization: User must be an admin
    - Path: `/api/user-requests/:id/reject`
    - Method: POST
    - Path Parameters:
        - id: ID of the request to reject (required)

14. Get All Toll Gates
    - Description: Gets all toll gates
    - Authorization: User must be an admin
    - Path: `/api/toll-gates`
    - Method: GET

15. Create Toll Gate
    - Description: Creates a toll gate
    - Authorization: User must be an admin
    - Path: `/api/toll-gates`
    - Method: POST
    - Request Body:
        - address: Address of the toll gate (required)
        - fee: Fee for the toll gate (required)

16. Delete Toll Gate
    - Description: Deletes a toll gate
    - Authorization: User must be an admin
    - Path: `/api/toll-gates/:id`
    - Method: DELETE
    - Path Parameters:
        - id: ID of the toll gate to delete (required)

17. Pay Toll Gate
    - Description: Pays for a toll gate
    - Authorization: User must be logged in
    - Path: `/api/toll-gates/pay/:uuid`
    - Method: GET
    - Path Parameters:
        - uuid: UUID of the toll gate to pay for (required)
