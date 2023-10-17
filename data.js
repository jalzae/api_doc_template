var spec = {
  "openapi": "3.0.1",
  "info": {
    "version": "1.0.0",
    "title": "API Specification"
  },
  "servers": [
    {
      "url": "https://jsonplaceholder.typicode.com",
      "description": "JSONPlaceholder API"
    }
  ],
  "paths": {
    "/posts": {
      "get": {
        "summary": "Get Posts",
        "operationId": "getPosts",
        "tags": ["Post"],
        "responses": {
          "200": {
            "description": "List of posts",
            "content": {
              "application/json": {
                "example": [
                  {
                    "userId": 1,
                    "id": 1,
                    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                    "body": "quia et suscipit\nsuscipit"
                  },
                  {
                    "userId": 1,
                    "id": 2,
                    "title": "qui est esse",
                    "body": "est rerum tempore quis soluta deleniti quidem"
                  }
                ]
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "application/json": {
                "example": {
                  "status": false,
                  "message": "Resource not found"
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Create Post",
        "operationId": "createPost",
        "tags": ["Post"],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "userId": {
                    "type": "integer",
                    "description": "User ID"
                  },
                  "title": {
                    "type": "string",
                    "description": "Title of the post"
                  },
                  "body": {
                    "type": "string",
                    "description": "Content of the post"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Post created successfully",
            "content": {
              "application/json": {
                "example": {
                  "userId": 1,
                  "id": 101,
                  "title": "Newly Created Post",
                  "body": "This is a new post created via the API"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
                "example": {
                  "status": false,
                  "message": "Bad request error"
                }
              }
            }
          }
        }
      }
    },
    "/posts/{id}": {
      "get": {
        "summary": "Get Post by ID",
        "operationId": "getPostById",
        "tags": ["Post"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Post ID",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Details of a post",
            "content": {
              "application/json": {
                "example": {
                  "userId": 1,
                  "id": 1,
                  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                  "body": "quia et suscipit\nsuscipit"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "application/json": {
                "example": {
                  "status": false,
                  "message": "Post not found"
                }
              }
            }
          }
        }
      }
    }
  }
}
