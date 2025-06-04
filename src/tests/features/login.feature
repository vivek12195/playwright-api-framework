Feature: Login
Simulated user login and post-login verification of user details

# User has both valid credentials
  Scenario: Successful user login API call with Valid credentials and post-login retrieval and verification
    Given I have "valid" user credentials
    When I send a login request to the Reqres public API
    Then I should receive a token
    When I make an API call to retrieve the user profile from Reqres
    Then the user's name and email should be correct

# User has entered invalid email and password
  Scenario: Unsuccessful user login API call with Invalid credentials
    Given I have "invalid" user credentials
    When I send a login request to the Reqres public API
    Then I should receive an error message

# User has not entered any credentials
  Scenario: Unsuccessful user login API call with missing credentials
    Given I have "missing" user credentials
    When I send a login request to the Reqres public API
    Then I should receive an error message

# User has a valid email
  Scenario: Unsuccessful user login API call with missing password
    Given I have "missing Password" user credentials
    When I send a login request to the Reqres public API
    Then I should receive an error message

# User has a valid password
  Scenario: Unsuccessful user login API call with missing email
    Given I have "missing email" user credentials
    When I send a login request to the Reqres public API
    Then I should receive an error message



# Commented Invalid Password Scenario as the Public API is unable to handle this scenario as it is a Mock API

# User has entered a valid email but invalid password
#   Scenario: Unsuccessful user login API call with invalid password
#     Given I have "invalid password" user credentials
#     When I send a login request to the Reqres public API
#     Then I should receive an error message

# User has entered a invalid email with a valid password
    Given I have "invalid email" user credentials
    When I send a login request to the Reqres public API
    Then I should receive an error message


