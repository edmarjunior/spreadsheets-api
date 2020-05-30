
# pmo-api

This project was generated with [edapi CLI](https://github.com/edmarjunior/edapi-cli) 1.0.3

 ## Included features &nbsp;&nbsp;&nbsp;  [![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Auth%20API&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fedmarjunior%2Fauth-api%2Fmaster%2Finsomnia-export.json%3Ftoken%3DAC52DJGF7PLTZO5QALNOZB26USNKK)
  - create account (activation email)
  - resend account activation (email)
  - activate account
  - signIn
  - recover password (via email)
  - new password

 ## Prerequisites (installations)
  - node
  - yarn
  - docker and docker-compose
   
 ## Running application
  - create .env file and fill in the environment variables (hint: ctrl+C and ctrl+V from the .env.example file)
  - run the commands below at the end (at the root of the project): 
    ```
      yarn 
      docker-compose up -d
      yarn sequelize db:migrate
      yarn dev
    ```
    Description of the above commands:
      - yarn (install the application dependencies if necessary)
      - docker-compose up -d (up postgres + pgAdmin)
      - yarn sequelize db:migrate (create the migrations in the database)
      - yarn dev (start the application with nodemon at http://localhost:3333)
    
 ## Running tests
  - create .env.test file and fill in the environment variables (hint: ctrl+C and ctrl+V from the .env.test.example file)
  - run the commands below at the end (at the root of the project):  
    ```
      yarn
      yarn test
    ```
    Description of the above commands:
      - yarn (install the application dependencies if necessary)
      - yarn test (to run the tests located within the __tests__ directory)
