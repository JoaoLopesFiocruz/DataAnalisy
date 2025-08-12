# Link list
# Use Cases
1. [Login](#uc1---login)
2. [Create acount](#uc2---create-account )
3. [Data view](#uc3---data-overview ) 
4. [Balances overview](#uc4---balances-overview ) 
5. [Balance delete](#uc5---balance-delete) 
6. [Balance create](#uc6---balance-create) 
7. [Transactions view](#uc7---transactions-view) 
8. [Bill view](#uc8---bill-view)
9. [Expenses view](#uc9---expenses-view)
10. [Goal view](#uc10---goal-view)
11. [Goal edit](#uc11---goal-edit)
12. [Create goal](#uc12---create-goal)
13. [View profile](#uc13---view-profile)
14. [Edit profile](#uc14---edit-profile)
## UC1 - Login
### Actor
- User
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
## UC3 - Data overview
### Actor
- User
### MF
    1. The user login in the website.
    2. The user will see in the main statistics about the theme in the main page
## UC4 - Balances overview
### Actor
- User
### MF
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the balances.
    4. The user click in the button.
    5. The system display cards with the the account number and total amount, card flag and total amont.
### AF1 - Balances detail view
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the balances.
    4. The user click in the button.
    5. The system display cards with the the account number and total amount, card flag,total amont and the button details.
    6. The user press on details button.
    7. The system open a page with more datails about that Account.
### AF2 - Balances search
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the balances.
    4. The user click in the button.
    5. The system display cards with the the account number and total amount, card flag,total amont and search field.
    6. The user digit the card name.
    7. The systen search that card and show.
## UC5 - Balance delete.
### Actor
- User
### MF
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the balances.
    4. The user click in the button.
    5. The system display cards with the the account number and total amount, card flag,total amont and a remove button.
    6. The user click on the remove.
    7. The system remove open a modal to confirm the decision.
    8. The user click on the confirm button.
    9. The card is removed and the the cards exibed is reloaded

## UC6 - Balance create.
### Actor
- User
### MF    
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the balances.
    4. The user click in the button.
    5. The system display the add account button.
    6. The user click on the button.
    7. The system open the account create modal.
    8. The user fill out the form.
    9. The account is registered and the modal close.
    10. The card is reloaded with the news datas.
### AF1 - Data errors
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the balances.
    4. The user click in the button.
    5. The system display the add account button.
    6. The user click on the button.
    7. The system open the account create modal.
    8. The user fill out the form wrong.
    9. The system return the invalid field message.
### AF2 - account already created
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the balances.
    4. The user click in the button.
    5. The system display the add account button.
    6. The user click on the button.
    7. The system open the account create modal.
    8. The user fill out the form with a account number of a registered account.
    9. The system return the account already created message.
## UC7 - Transactions view.
### Actor
- User
### MF
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the Transactions.
    4. The user click in the button.
    5. The system display list with the the name of item, shop name, date,payment method, amount type of negotiation.
### AF1 - Revenues view.
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the Transactions.
    4. The user click in the button.
    5. The system display list with the the name of item, shop name, date,payment method, amount type of negotiation.
    6. The system display a Revenue filter button.
    7. The user click on the button.
    8. The system filter only the sale transations.
### AF2 - Expanses view.
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the Transactions.
    4. The user click in the button.
    5. The system display list with the the name of item, shop name, date,payment method, amount type of negotiation.
    6. The system display a Expanse filter button.
    7. The user click on the button.
    8. The system filter only the buy transations.
### AF3 - Search Transactions.
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the Transactions.
    4. The user click in the button.
    5. The system display list with the the name of item, shop name, date,payment method, amount type of negotiation.
    6. The system display a search field.
    7. The user fill out the search field.
    8. The system filter the transactionss.

## UC8 - Bill view.
### Actor
- User
### MF
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the Bills.
    4. The user click in the button.
    5. The system display list with the the max date payment, Logo image, Bill description, last charge and the value.
### AF1 - Bill search.
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the Bills.
    4. The user click in the button.
    5. The system display list with the the max date payment, Logo image, Bill description, last charge and the value.
    6. The system display the search field.
    7. The user fill out the field.
    8. The sytem filter the list with the bill with that name.
## UC9 - Expenses view.
### Actor
- User
### MF
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the expenses.
    4. The user click on button.
    5. The system show the datas about expenses.
### AF1 - Time comparation
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the expenses.
    4. The user click on button.
    5. The system show the expenses expenses during the year grouped by months.
    6. The sytem display a button to change to change grouping.
    7. The user click on this button and change the grouping.
    8. The system show the expenses expenses during the year grouped according to the grouping chosen by user.
### AF2 - Expenses search
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the expenses.
    4. The user click on button.
    5. The system show the expenses during the year grouped by months.
    6. The system display a field to search the expense.
    7. The user fill out the field.
    8. The system search that expense.
## UC10 - Goal view.
### Actor
- User
### MF
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the goal.
    4. The user click on button.
    5. The system show the datas about goal.
### AF1 - Time comparation
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the goal.
    4. The user click on button.
    5. The system show the datas about goal year in a time range.
    6. The system display a field to switch the time range.
    7. The system show the datas about goal year in the time range chosen by user.
### AF2 - Goal search
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the goal.
    4. The user click on button.
    5. The system show the datas about goal year in a time range.
    6. The system display a field to search the expense.
    7. The user fill out the field.
    8. The system search that goal.
## UC11 - Goal edit.
### Actor
- User
### MF
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the goal.
    4. The user click on button.
    5. The system show the datas about goal with the button to edit.
    6. The user clicks the button
    7. The system open a modal to write the new value.
    8. The system validate.
    9. The system edit that goal if the data is correct.
### AF1 - Invalid data
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the goal.
    4. The user click on button.
    5. The system show the datas about goal with the button to edit.
    6. The user clicks the button
    7. The system open a modal to write the new value.
    8. The system validate.
    9. The system returns that the information is incorrect, if the data is incorrect.
### AF2 - Close modal
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the goal.
    4. The user click on button.
    5. The system show the datas about goal with the button to edit.
    6. The user clicks the button
    7. The system open a modal to write the new value with the close button.
    8. The user click on button.
    9. The system close the modal.
## UC12 - Create goal
### Actor
- User
### MF
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the goal.
    4. The user click on button.
    5. The system show the datas about goal with the button to create a goal.
    6. The user clicks the button
    7. The system open a modal to write the new goal data.
    8. The system validate.
    9. The system edit that goal if the data is correct.
### AF1 - Invalid data
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the goal.
    4. The user click on button.
    5. The system show the datas about goal with the button to create a new goal.
    6. The user clicks the button
    7. The system open a modal to write the new goal data.
    8. The system validate.
    9. The system returns that the information is incorrect, if the data is incorrect.
### AF2 - Close modal
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the goal.
    4. The user click on button.
    5. The system show the datas about goal with the button to create a new goal.
    6. The user clicks the button
    7. The system open a modal to write the new goal data with the close button.
    8. The user click on button.
    9. The system close the modal.
## UC13 - View profile
### Actor
- User
### MF
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the user profile.
    4. The user click on button.
    5. The system show the user datas
## UC14 - Edit profile
### Actor
- User
### MF
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the user profile.
    4. The user click on button.
    5. The system show the user datas with a button to update.
    6. The user click button.
    7. Rewrite data is enabled.
    8. The edit button transform in a submit button.
    9. The user rewrite they data.
    10. The user rewrite they data.
    11. The user click on the submit button.
    12. The system validate the data.
    13. The system return the sucess message.
### AF1-Invalid data
    1. The user login in the website.
    2. The user be redirected to the main page.
    3. The system display a button to view the user profile.
    4. The user click on button.
    5. The system show the user datas with a button to update.
    6. The user click button.
    7. Rewrite data is enabled.
    8. The edit button transform in a submit button.
    9. The user rewrite they data.
    10. The user rewrite they data.
    11. The user click on the submit button.
    12. The system validate the data.
    13. The system return the invalid data message if the data is invalid.