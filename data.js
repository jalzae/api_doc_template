var spec = {
  "openapi": "3.0.1",
  "info": {
    "version": "1.0.0",
    "title": "API Specification"
  },
  "paths": {
    "/login": {
      "get": {
        "summary": "Get Article.",
        "operationId": "get and Article",
        "tags": [
          "App/Controller/Auth.php"
        ],

        "responses": {
          "200": {
            "description": "{'status':true,'message':'berhasil'}",
          },
          "400": {
            "description": "{'status':false,'message':'data error'}",
          },
        }
      },
    },
    "/update/:id": {
      "post": {
        "summary": "Register",
        "operationId": "register",
        "tags": [
          "App/Controller/Auth.php"
        ],
        "parameters": [
          {
            "$ref": "#/components/parameters/Id"
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "Article": {
                    "type": "string",
                    "description": "The content of the article."
                  },
                  "ArticleId": {
                    "type": "integer",
                    "format": "int32",
                    "description": "The ID of the article."
                  }
                }
              }

            }
          }
        },
        "responses": {
          "200": {
            "description": "{'status':true,'message':'berhasil'}",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "Article": {
                      "type": "string",
                      "description": "The content of the article."
                    },
                    "ArticleId": {
                      "type": "integer",
                      "format": "int32",
                      "description": "The ID of the article."
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "{'status':false,'message':'Data not found'}",
            "content": {
              "application/json": {

                "schema": { "$ref": "#/components/schemas/NotFound" }
              }
            }
          }
        }
      },
    },
  },
  "components": {
    "schemas": {
      "Id": {
        "description": "Resource ID",
        "type": "integer/char",
        "format": "int64/char36",
        "readOnly": true,
      },
      "NotFound": {
        "properties": {
          "Status": {
            "type": "boolean",
            "description": "status"
          },
          "Message": {
            "type": "string",
            "description": "Tidak ditemukan data."

          }
        }
      }
    },
    "parameters": {
      "Id": {
        "name": "id",
        "in": "path",
        "description": "Resource ID",
        "required": true,
        "schema": {
          "$ref": "#/components/schemas/Id"
        }
      },
    },
    "responses": {
      "NotFound": {
        "description": "The resource is not found.",
        "content": {
          "application/json": {
            "Error": {
              "description": "<table>\n  <tr>\n    <th>Code</th>\n    <th>Description</th>\n  </tr>\n  <tr>\n    <td>illegal_input</td>\n    <td>The input is invalid.</td>\n  </tr>\n  <tr>\n    <td>not_found</td>\n    <td>The resource is not found.</td>\n  </tr>\n</table>\n",
              "required": [
                "code",
                "message"
              ],
              "properties": {
                "code": {
                  "type": "string",
                  "example": "illegal_input"
                }
              }
            }
          }
        }
      },
    }
  }
}