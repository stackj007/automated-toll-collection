Steps to run this project:

1. Run `npm i` command
2. adjust .env file to your database configuration
3. Run `npm start` command

Using stripe

1. Create an account on stripe
2. Get the secret key and public key
3. Add the keys to the .env file
4. install Stripe CLI
5. Run `stripe listen --forward-to localhost:8000/api/stripe-webhook` to listen for events

## Routes documentation
### General Routes
1. Ping Server
   - Description: Test route to check if the server is running
   - Authorization: None
   - Path: `/api/ping`
   - Method: GET
   - Response: `Pong!`

### User Routes
1. Register
   - Description: Registers a new user
   - Authorization: None
   - Path: `/api/register`
   - Method: POST
   - Request Body:
     - email: User's email address (required)
     - password: User's password (required)
     - confirmPassword: Confirmation of the password (required)
     - name: User's name (required)

2. Login
   - Description: Logs in a user
   - Authorization: None
   - Path: `/api/login`
   - Method: POST
   - Request Body:
     - email: User's email address (required)
     - password: User's password (required)

3. Logout
   - Description: Logs out a user
   - Authorization: User must be logged in
   - Path: `/api/logout`
   - Method: POST

4. Get Current User
   - Description: Gets the current logged in user
   - Authorization: User must be logged in
   - Path: `/api/user`
   - Method: GET

5. Get All Users
   - Description: Gets all users
   - Authorization: User must be an admin
   - Path: `/api/users`
   - Method: GET

6. Delete User
   - Description: Deletes a user
   - Authorization: User must be an admin
   - Path: `/api/delete-user`
   - Method: POST
   - Request Body:
     - id: ID of the user to delete (required)

7. Edit User
   - Description: Edits a user
   - Authorization: User must be an admin
   - Path: `/api/edit-user`
   - Method: POST
   - Request Body:
     - id: ID of the user to edit (required)
     - name: New name for the user (optional)
     - email: New email for the user (optional)
     - isAdmin: make the user admin

8. Recharge
   - Description: Recharges the user's balance
   - Authorization: User must be logged in
   - Path: `/api/user/balance`
   - Method: POST
   - Request Body:
      - amount: Amount to recharge (required)
   - Response Body:
      - url: URL to redirect to for payment

### User Request Routes
1. Submit User Request
   - Description: Submits a user request
   - Authorization: User must be logged in
   - Path: `/api/user-request`
   - Method: POST
   - Request Body:
     - vehicleNumber: Vehicle number for the request (required)

2. Get User Request
   - Description: Gets a user request
   - Authorization: User must be logged in
   - Path: `/api/user-request`
   - Method: GET

3. Get All User Requests
   - Description: Gets all user requests
   - Authorization: User must be an admin
   - Path: `/api/user-requests`
   - Method: GET

4. Accept User Request
   - Description: Accepts a user request
   - Authorization: User must be an admin
   - Path: `/api/user-requests/:id/accept`
   - Method: POST
   - Path Parameters:
     - id: ID of the request to accept (required)

5. Reject User Request
   - Description: Rejects a user request
   - Authorization: User must be an admin
   - Path: `/api/user-requests/:id/reject`
   - Method: POST
   - Path Parameters:
     - id: ID of the request to reject (required)

### Toll Gate Routes
1. Get All Toll Gates
   - Description: Gets all toll gates
   - Authorization: User must be an admin
   - Path: `/api/toll-gates`
   - Method: GET

2. Create Toll Gate
   - Description: Creates a toll gate
   - Authorization: User must be an admin
   - Path: `/api/toll-gates`
   - Method: POST
   - Request Body:
     - address: Address of the toll gate (required)
     - fee: Fee for the toll gate (required)

3. Delete Toll Gate
   - Description: Deletes a toll gate
   - Authorization: User must be an admin
   - Path: `/api/toll-gates/:id`
   - Method: DELETE
   - Path Parameters:
     - id: ID of the toll gate to delete (required)

4. Pay Toll Gate
   - Description: Pays for a toll gate
   - Authorization: User must be logged in
   - Path: `/api/toll-gates/pay/:uuid`
   - Method: GET
   - Path Parameters:
     - uuid: UUID of the toll gate to pay for (required)

5. Edit Toll Gate
    - Description: Edits a toll gate
    - Authorization: User must be an admin
    - Path: `/api/toll-gates/:id`
    - Method: PUT
    - Path Parameters:
        - id: ID of the toll gate to edit (required)
    - Request Body:
        - address: New address for the toll gate
        - fee: New fee for the toll gate

### Transaction Routes
1. Get All Transactions
    - Description: Gets all transactions
    - Authorization: User must be an admin
    - Path: `/api/transactions`
    - Method: GET

2. Get User Transactions
   - Description: Gets all transactions of a user
   - Authorization: User must be logged in and verified
   - Path: `/api/transactions/user`
   - Method: GET

3. Get Transaction
   - Description: Gets a transaction
   - Authorization: User must be an admin
   - Path: `/api/transactions/:id`
   - Method: GET
   - Path Parameters:
     - id: ID of the transaction to get (required)
