# Use Cases
## UC1 - Login
### Actor
- User
- System
### MF
1. The system displays a form with the fields Email Address and Password, along with a Confirm button.
2. The user fills out the form.
3. The user clicks the Confirm button.
4. The system validates the data.
5. If the data is valid, the system approves the login.
6. The user is redirected to the dashboard.
### AF1 - Invalid Email or password
1. The system displays a form with the fields Email Address and Password, along with a Confirm button.
2. The user fills out the form.
3. The user clicks the Confirm button.
4. The system validates the data.
5. If the data is not valid, the sistem will return the mensage "invalid User or password".
### AF2 - Login with email
1. The system displays a login with Email button.
2. The user clicks the login with Email button.
3. The system shows a modal prompting the user to log in with their email.
4. The user will use your email to login.
5. If the email is registered, the system will aprove the login and will redirect the user to the dashboard.
### AF3 - Failed login with email
1. The system displays a login with Email button.
2. The user clicks the login with Email button.
3. The system shows a modal prompting the user to log in with their email.
4. The user will use your email to login.
5. If the email is not registered, the system not aprove the login and return the mensage "Email do not registered".
### AF4 - Create account redirect
1. The system displays a button to create account.
2. The user click the create account button.
3. The system redirect the user to the create account form.
### AF5 - Password change
1. The sistem sistem display a forget password link.
2. The user click on the link.
3. The system redirect the user to the forget password form.
4. The system display a form to change your password where have the field email and the confirm button
5. The user fill out the field email and click in the confirm button.
6. The system send a email code to the email and open a modal requiring the email code.
7. The user put the code
8. The system redirect the user to the new password form with the field new password.
9. The user put the new password in the field.
10. the system change the password.
## UC2 - Create account 
### Actor
- User
- System
### MF
1. The system display a form to create an account with the fields Name, password and password. A Confirm button is also displayed.
2. The user fill out the form.
3. The user click the confirm button.
4. The system open a modal requesting the code sended to the email.
5. The user put the code email code.
6. If the code is correct, the modal close.
7. If the data is valid and the email code is corrected puted, the system creates the account and redirects the user to the dashboard, logged into the new account.
### AF1 - Invalid data
1. The system display a form to create an account with the fields Name, password and password. A Confirm button is also displayed.
2. The user fill out the form.
3. The user click the confirm button.
4. If the data is invalid, the system reject the account and return the mensage "Data invalid".
### AF2 - Invalid email code
1. The system display a form to create an account with the fields Name, password and password. A Confirm button is also displayed.
2. The user fill out the form.
3. The user click the confirm button.
4. The system open a modal requesting the code sended to the email.
5. The user put the code email code.
6. If the code is incorrect, the modal retorn the message "invalid code".
### AF3 - Email code resend
1. The system display a form to create an account with the fields Name, password and password. A Confirm button is also displayed.
2. The user fill out the form.
3. The user click the confirm button.
4. The system open a modal requesting the code sended to the email.
5. The system display a resend code button.
6. The user click in this button.
7. The system send a new code to the email registered in the form.
### AF4 - Email code modal close
1. The system display a form to create an account with the fields Name, password and password. A Confirm button is also displayed.
2. The user fill out the form.
3. The user click the confirm button.
4. The system open a modal requesting the code sended to the email.
5. The system display a close button.
6. The user click in the close button.
7. The system close the modal.
### AF5 - Email sign up
1. The system display a button to sign up with the google account.
2. The user click in the google account sign up
3. The system open a modal where the user sign up with the google account.
4. The user use their google account to sign up.
5. The sistem create a count with that email and redirect the user to the dashboard.
### AF6 - Login redirect
1. The system display a link to the login form.
2. The user click login link.
3. The system redirect the user to the login form.