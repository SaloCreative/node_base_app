## API ENDPOINTS

* [Auth](#auth)
* [Users](#users)
* [Grants](#grants)

### Auth

- **<code>POST</code> [auth/login](./documentation/auth/POST_login.md)** - _Login_
- **<code>GET</code> [auth/token](./documentation/auth/GET_token.md)** - _Token refresh_  ---> **TODO**
- **<code>GET</code> [auth/validate/:token](./documentation/auth/GET_email.md)** - _Email Validate_
- **<code>POST</code> [auth/password/request](./documentation/auth/POST_email_request.md)** - _Request Password reset_
- **<code>POST</code> [auth/password/reset](./documentation/auth/POST_email_reset.md)** - _Reset password_

### Users

[Users model](./documentation/users/users.model.json)

- **<code>POST</code> [users](./documentation/users/POST_user.md)** - _Create a user_
- **<code>GET</code> [users](./documentation/users/GET_users.md)** - _Get all users_
- **<code>GET</code> [users/:id](./documentation/user/GET_user.md)** - _Get a user_
- **<code>PUT</code> [users/:id](./documentation/user/PUT_user.md)** - _Update a user_
- **<code>DELETE</code> [users/:id](./documentation/user/DELETE_user.md)** - _Delete a user_

### Grants

[Grants model](./documentation/grants/grants.model.json)

- **<code>POST</code> [grants/:id](./documentation/grants/POST_grant.md)** - _Create users grants_
- **<code>GET</code> [grants/:id](./documentation/grants/GET_grant.md)** - _Get a users grant_
- **<code>DELETE</code> [grants/:id](./documentation/grants/DELETE_grant.md)** - _Delete a users grants_