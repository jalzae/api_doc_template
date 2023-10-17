var spec = {
  "openapi": "3.0.1",
  "info": {
    "version": "1.0.0",
    "title": "API Specification"
  },
  "paths": {
    "/login": {
      "post": {
        "summary": "Create an article.",
        "operationId": "createArticle",
        "tags": [
          "App/Controller/Auth.php"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "username": "",
              "password": ""
            }
          }
        },
        "responses": {
          "200": {
            "message": "Success",
          },
        }
      },
    },
    "/register": {
      "post": {
        "summary": "Register",
        "operationId": "register",
        "tags": [
          "App/Controller/Auth.php"
        ],

        "responses": {
          "body": {
            "description": "{username:'',password:''}",
          },

        }
      },
    },

  },

}