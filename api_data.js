define({ "api": [
  {
    "type": "get",
    "url": "/version",
    "title": "Application version",
    "name": "printVersion",
    "group": "3D_Repo",
    "description": "<p>Show current application version.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "VERSION",
            "description": "<p>API service version</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "unity",
            "description": "<p>Unity viewer version</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "navis",
            "description": "<p>Autodesk Navisworks version</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "unitydll",
            "description": "<p>Unity viewer version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"VERSION\": \"2.20.1\",\n\t\"unity\": {\n\t\t\"current\": \"2.20.0\",\n\t\t\"supported\": []\n\t},\n\t\"navis\": {\n\t\t\"current\": \"2.16.0\",\n\t\t\"supported\": [\n\t\t\t\"2.8.0\"\n\t\t]\n\t},\n\t\"unitydll\": {\n\t\t\"current\": \"2.8.0\",\n\t\t\"supported\": []\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "3D_Repo"
  },
  {
    "type": "post",
    "url": "/:teamspace/permissions",
    "title": "Assign permissions",
    "name": "createPermission",
    "group": "Account_Permission",
    "description": "<p>Assign account level permission to a user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User to assign permissions to</p>"
          },
          {
            "group": "Request body",
            "type": "String[]",
            "optional": false,
            "field": "permissions",
            "description": "<p>List of account level permissions</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User</p>"
          },
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "permissions",
            "description": "<p>Account Level Permission types</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n\t{\n\t\t\"user\": \"bob\",\n\t\t\"permissions\": [\n\t\t\t\"create_project\"\n\t\t]\n\t}\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /acme/permissions HTTP/1.1\n{\n\t\"user\": \"bob\",\n\t\"permissions\": [\n\t\t\"create_project\"\n\t]\n}",
        "type": "post"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/accountPermission.js",
    "groupTitle": "Account_Permission"
  },
  {
    "type": "delete",
    "url": "/:teamspace/permissions/:user",
    "title": "Revoke permissions",
    "name": "deletePermission",
    "group": "Account_Permission",
    "description": "<p>Revoke all permissions from a user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User to delete</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "DELETE /acme/permissions/alice HTTP/1.1",
        "type": "delete"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/accountPermission.js",
    "groupTitle": "Account_Permission"
  },
  {
    "type": "get",
    "url": "/:teamspace/permissions",
    "title": "List all permissions",
    "name": "listPermissions",
    "group": "Account_Permission",
    "description": "<p>Get a list of all account permission objects for a teamspace</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User</p>"
          },
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "permissions",
            "description": "<p>Account level permissions</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n\t{\n\t\t\"user\": \"alice\",\n\t\t\"permissions\": [\n\t\t\t\"teamspace_admin\"\n\t\t]\n\t},\n\t{\n\t\t\"user\": \"bob\",\n\t\t\"permissions\": [\n\t\t\t\"create_project\"\n\t\t]\n\t}\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/permissions HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/accountPermission.js",
    "groupTitle": "Account_Permission"
  },
  {
    "type": "put",
    "url": "/:teamspace/permissions/:user",
    "title": "Update permissions",
    "name": "updatePermission",
    "group": "Account_Permission",
    "description": "<p>Update permissions assignment for a user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User to update</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String[]",
            "optional": false,
            "field": "permissions",
            "description": "<p>List of account level permissions</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "permissions",
            "description": "<p>List of account level permissions</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"permissions\": [\n\t\t\"teamspace_admin\"\n\t]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "PUT /acme/permissions/alice HTTP/1.1\n{\n\t\"permissions\": [\n\t\t\"teamspace_admin\"\n\t]\n}",
        "type": "put"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/accountPermission.js",
    "groupTitle": "Account_Permission"
  },
  {
    "type": "post",
    "url": "/forgot-password",
    "title": "Forgot password",
    "name": "forgotPassword",
    "group": "Account",
    "description": "<p>Send a password reset link to account's e-mail.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Account username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail address registered with account</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage (with username):",
        "content": "POST /forgot-password HTTP/1.1\n{\n\t\"username: \"alice\"\n}",
        "type": "get"
      },
      {
        "title": "Example usage (with e-mail):",
        "content": "POST /forgot-password HTTP/1.1\n{\n\t\"email: \"alice@acme.co.uk\"\n}",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Account"
  },
  {
    "type": "get",
    "url": "/:user/avatar",
    "title": "Get avatar",
    "name": "getAvatar",
    "group": "Account",
    "description": "<p>Get user avatar.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "avatar",
            "description": "<p>User Avatar Image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<binary image>",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "USER_DOES_NOT_HAVE_AVATAR",
            "description": "<p>User does not have an avatar</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 404 Not Found\n{\n\t\"message\": \"User does not have an avatar\",\n\t\"status\": 404,\n\t\"code\": \"USER_DOES_NOT_HAVE_AVATAR\",\n\t\"place\": \"GET /alice/avatar\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /alice/avatar HTTP/1.1",
        "type": "put"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Account"
  },
  {
    "type": "get",
    "url": "/:user.json",
    "title": "List account information",
    "name": "listInfo",
    "group": "Account",
    "description": "<p>Account information and list of projects grouped by teamspace that the user has access to.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "accounts",
            "description": "<p>User account</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "billingInfo",
            "description": "<p>Billing information</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User e-mail address</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Surname</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "hasAvatar",
            "description": "<p>True if user account has an avatar</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"accounts\": [\n\t\t{\n\t\t\t\"account\": \"repoman\",\n\t\t\t\"models\": [\n\t\t\t\t{\n\t\t\t\t\t\"permissions\": [\n\t\t\t\t\t\t\"change_model_settings\",\n\t\t\t\t\t\t\"upload_files\",\n\t\t\t\t\t\t\"create_issue\",\n\t\t\t\t\t\t\"comment_issue\",\n\t\t\t\t\t\t\"view_issue\",\n\t\t\t\t\t\t\"view_model\",\n\t\t\t\t\t\t\"download_model\",\n\t\t\t\t\t\t\"edit_federation\",\n\t\t\t\t\t\t\"delete_federation\",\n\t\t\t\t\t\t\"delete_model\",\n\t\t\t\t\t\t\"manage_model_permission\"\n\t\t\t\t\t],\n\t\t\t\t\t\"model\": \"00000000-0000-0000-0000-000000000000\",\n\t\t\t\t\t\"name\": \"ufo\",\n\t\t\t\t\t\"status\": \"ok\",\n\t\t\t\t\t\"timestamp\": \"2016-07-26T15:52:11.000Z\"\n\t\t\t\t}\n\t\t\t],\n\t\t\t\"fedModels\": [],\n\t\t\t\"isAdmin\": true,\n\t\t\t\"permissions\": [\n\t\t\t\t\"teamspace_admin\"\n\t\t\t],\n\t\t\t\"quota\": {\n\t\t\t\t\"spaceLimit\": 10485760,\n\t\t\t\t\"collaboratorLimit\": 5,\n\t\t\t\t\"spaceUsed\": 12478764\n\t\t\t},\n\t\t\t\"projects\": []\n\t\t},\n\t\t{\n\t\t\t\"account\": \"breakingbad\",\n\t\t\t\"models\": [\n\t\t\t\t{\n\t\t\t\t\t\"permissions\": [\n\t\t\t\t\t\t\"view_issue\",\n\t\t\t\t\t\t\"view_model\",\n\t\t\t\t\t\t\"upload_files\",\n\t\t\t\t\t\t\"create_issue\"\n\t\t\t\t\t],\n\t\t\t\t\t\"model\": \"00000000-0000-0000-0000-000000000001\",\n\t\t\t\t\t\"name\": \"homelab\",\n\t\t\t\t\t\"status\": \"ok\",\n\t\t\t\t\t\"timestamp\": null\n\t\t\t\t}\n\t\t\t],\n\t\t\t\"fedModels\": [\n\t\t\t\t{\n\t\t\t\t\t\"federate\": true,\n\t\t\t\t\t\"permissions\": [\n\t\t\t\t\t\t\"change_model_settings\",\n\t\t\t\t\t\t\"upload_files\",\n\t\t\t\t\t\t\"create_issue\",\n\t\t\t\t\t\t\"comment_issue\",\n\t\t\t\t\t\t\"view_issue\",\n\t\t\t\t\t\t\"view_model\",\n\t\t\t\t\t\t\"download_model\",\n\t\t\t\t\t\t\"edit_federation\",\n\t\t\t\t\t\t\"delete_federation\",\n\t\t\t\t\t\t\"delete_model\",\n\t\t\t\t\t\t\"manage_model_permission\"\n\t\t\t\t\t],\n\t\t\t\t\t\"model\": \"00000000-0000-0000-0000-000000000003\",\n\t\t\t\t\t\"name\": \"fed1\",\n\t\t\t\t\t\"status\": \"ok\",\n\t\t\t\t\t\"timestamp\": \"2017-05-11T12:49:59.000Z\",\n\t\t\t\t\t\"subModels\": [\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\"database\": \"breakingbad\",\n\t\t\t\t\t\t\t\"model\": \"00000000-0000-0000-0000-000000000001\",\n\t\t\t\t\t\t\t\"name\": \"homelab\"\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\"database\": \"breakingbad\",\n\t\t\t\t\t\t\t\"model\": \"00000000-0000-0000-0000-000000000002\",\n\t\t\t\t\t\t\t\"name\": \"laundrylab\"\n\t\t\t\t\t\t}\n\t\t\t\t\t]\n\t\t\t\t}\n\t\t\t],\n\t\t\t\"projects\": [\n\t\t\t\t{\n\t\t\t\t\t\"_id\": \"58f78c8ededbb13a982114ee\",\n\t\t\t\t\t\"name\": \"folder1\",\n\t\t\t\t\t\"permission\": [],\n\t\t\t\t\t\"models\": [\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\"permissions\": [\n\t\t\t\t\t\t\t\t\"view_issue\",\n\t\t\t\t\t\t\t\t\"view_model\",\n\t\t\t\t\t\t\t\t\"upload_files\",\n\t\t\t\t\t\t\t\t\"create_issue\"\n\t\t\t\t\t\t\t],\n\t\t\t\t\t\t\t\"model\": \"00000000-0000-0000-0000-000000000004\",\n\t\t\t\t\t\t\t\"name\": \"laundrylab\",\n\t\t\t\t\t\t\t\"status\": \"ok\",\n\t\t\t\t\t\t\t\"timestamp\": null\n\t\t\t\t\t\t}\n\t\t\t\t\t]\n\t\t\t\t}\n\t\t\t]\n\t\t}\n\t],\n\t\"billingInfo\": {\n\t\t\"countryCode\": \"US\",\n\t\t\"postalCode\": \"0\",\n\t\t\"line2\": \"123\",\n\t\t\"city\": \"123\",\n\t\t\"line1\": \"123\",\n\t\t\"vat\": \"000\",\n\t\t\"company\": \"Universal Pictures\",\n\t\t\"_id\": \"59145aedf4f613668fba0f98\"\n\t},\n\t\"email\":\"alice@acme.co.uk\",\n\t\"firstName\":\"Alice\",\n\t\"lastName\":\"Allen\",\n\t\"hasAvatar\": true,\n\t\"jobs\": [\n\t\t{\n\t\t\t\"_id\": \"Director\"\n\t\t},\n\t\t{\n\t\t\t\"_id\": \"Actor\"\n\t\t},\n\t\t{\n\t\t\t\"_id\": \"Producer\n\t\t}\n\t]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /alice.json HTTP/1.1",
        "type": "delete"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Account"
  },
  {
    "type": "put",
    "url": "/:user/password",
    "title": "Reset password",
    "name": "resetPassword",
    "group": "Account",
    "description": "<p>Reset user account password. New password must be different.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User account</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>Old password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>New password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Password reset token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "account",
            "description": "<p>Account username</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"account\":\"alice\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TOKEN_INVALID",
            "description": "<p>Token is invalid or has expired</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"message\":\"Token is invalid or expired\",\n\t\"status\":400,\n\t\"code\":\"TOKEN_INVALID\",\n\t\"value\":59,\n\t\"place\": \"PUT /alice/password\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage (with old password):",
        "content": "PUT /alice/password HTTP/1.1\n{\n\t\"oldPassword\":\"AW96B6\",\n\t\"newPassword\":\"TrustNo1\"\n}",
        "type": "post"
      },
      {
        "title": "Example usage (with token):",
        "content": "PUT /alice/password HTTP/1.1\n{\n\t\"token\":\"1234567890\",\n\t\"newPassword\":\"TrustNo1\"\n}",
        "type": "post"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Account"
  },
  {
    "type": "post",
    "url": "/:user",
    "title": "Sign up",
    "name": "signUp",
    "group": "Account",
    "description": "<p>Sign up for a new user account.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>New account username to register</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Valid e-mail address</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Surname</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "company",
            "description": "<p>Company</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "jobTitle",
            "description": "<p>Job title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "countryCode",
            "description": "<p>ISO 3166-1 alpha-2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "captcha",
            "description": "<p>Google reCAPTCHA response token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "account",
            "description": "<p>New Account username</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"account\":\"alice\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SIGN_UP_PASSWORD_MISSING",
            "description": "<p>Password is missing</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "\nHTTP/1.1 400 Bad Request\n{\n\t\"message\": \"Password is missing\",\n\t\"status\": 400,\n\t\"code\": \"SIGN_UP_PASSWORD_MISSING\",\n\t\"value\": 57,\n\t\"place\": \"POST /nabile\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /alice HTTP/1.1\n{\n\t\"email\":\"alice@acme.co.uk\",\n\t\"password\":\"AW96B6\",\n\t\"firstName\":\"Alice\",\n\t\"lastName\":\"Allen\",\n\t\"company\":\"Acme Corporation\",\n\t\"countryCode\":\"GB\",\n\t\"jobTitle\":\"CEO\",\n\t\"captcha\":\"1234567890qwertyuiop\"\n}",
        "type": "post"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Account"
  },
  {
    "type": "put",
    "url": "/:user",
    "title": "Update user account",
    "name": "updateUser",
    "group": "Account",
    "description": "<p>Update account information.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>Account username</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Valid e-mail address</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Surname</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "account",
            "description": "<p>Account username</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"account\":\"alice\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "PUT /alice HTTP/1.1\n{\n\t\"email\":\"alice@3drepo.org\",\n\t\"firstName\":\"Alice\",\n\t\"lastName\":\"Anderson\"\n}",
        "type": "post"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Account"
  },
  {
    "type": "post",
    "url": "/:user/avatar",
    "title": "Upload avatar",
    "name": "uploadAvatar",
    "group": "Account",
    "description": "<p>Upload a new avatar image. Only multipart form data content type will be accepted.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>Image to upload</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /alice/avatar HTTP/1.1\nContent-Type: multipart/form-data; boundary=----WebKitFormBoundaryN8dwXAkcO1frCHLf\n\n------WebKitFormBoundaryN8dwXAkcO1frCHLf\nContent-Disposition: form-data; name=\"file\"; filename=\"avatar.png\"\nContent-Type: image/png\n\n<binary content>\n------WebKitFormBoundaryN8dwXAkcO1frCHLf--",
        "type": "put"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "status",
            "description": "<p>Status of Avatar upload.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"status\":\"success\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Account"
  },
  {
    "type": "post",
    "url": "/:user/verify",
    "title": "Verify",
    "name": "verify",
    "group": "Account",
    "description": "<p>Verify an account after signing up.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>Account username</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Account verification token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "account",
            "description": "<p>Account username</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"account\":\"alice\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ALREADY_VERIFIED",
            "description": "<p>User already verified</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"message\": \"Already verified\",\n\t\"status\": 400,\n\t\"code\": \"ALREADY_VERIFIED\",\n\t\"value\": 60,\n\t\"place\": \"POST /alice/verify\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /alice/verify HTTP/1.1\n{\n\t\"token\":\"1234567890\"\n}",
        "type": "post"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Account"
  },
  {
    "type": "get",
    "url": "/login",
    "title": "Get current username",
    "name": "checkLogin",
    "group": "Authentication",
    "description": "<p>Get the username of the logged in user.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Account username</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"username\": \"alice\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /login HTTP/1.1\n{}",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login",
    "name": "login",
    "group": "Authentication",
    "description": "<p>3D Repo account login. Logging in generates a token that can be used for cookie-based authentication. To authentication subsequent API calls using cookie-based authentication, simply put the following into the HTTP header: <code>Cookie: connect.sid=:sessionId</code></p> <p>NOTE: If you use a modern browser’s XMLHttpRequest object to make API calls, you don’t need to take care of the authentication process after calling /login.</p>",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Account username</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Account password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Account username</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\nset-cookie:connect.sid=12345678901234567890;\n{\n\t\"username\": \"alice\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /login HTTP/1.1\n{\n\t\"username\": \"alice\",\n\t\"password\": \"AW96B6\"\n}",
        "type": "post"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/logout",
    "title": "Logout",
    "name": "logout",
    "group": "Authentication",
    "description": "<p>Invalidate the authenticated session.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Account username</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"username\": \"alice\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /logout HTTP/1.1\n{}",
        "type": "post"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/:teamspace/:model/revision(/master/head|/:revId)/groups",
    "title": "Create group",
    "name": "createGroup",
    "group": "Groups",
    "description": "<p>Add a group to the model.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "revId",
            "description": "<p>Revision ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Username of group creator</p>"
          },
          {
            "group": "Request body",
            "type": "Number[]",
            "optional": false,
            "field": "color",
            "description": "<p>RGB colour values</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Group description</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Group name</p>"
          },
          {
            "group": "Request body",
            "type": "Object[]",
            "optional": false,
            "field": "objects",
            "description": "<p>List of objects in group</p>"
          },
          {
            "group": "Request body",
            "type": "Object[]",
            "optional": true,
            "field": "rules",
            "description": "<p>List of rules in group</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage (/master/head)",
        "content": "POST /acme/00000000-0000-0000-0000-000000000000/revision/master/head/groups HTTP/1.1\n{\n\t\"name\":\"Group 1\",\n\t\"description\":\"This is the description text for the first group.\",\n\t\"author\":\"alice\",\n\t\"color\":[255,0,0],\n\t\"objects\":[\n\t\t{\n\t\t\t\"account\":\"acme\",\n\t\t\t\"model\":\"00000000-0000-0000-0000-000000000000\",\n\t\t\t\"shared_ids\":[\n\t\t\t\t\"24fdcf2d-b9eb-4fa2-a614-dfe2532493b3\",\n\t\t\t\t\"db18ef69-6d6e-49a0-846e-907346abb39d\",\n\t\t\t\t\"c532ff34-6669-4807-b7f3-6a0ffb17b027\",\n\t\t\t\t\"fec16ea6-bb7b-4f12-b39b-f06fe6bf041d\",\n\t\t\t\t\"3f881fa8-2b7b-443e-920f-396c1c85e903\"\n\t\t\t]\n\t\t}\n\t]\n}",
        "type": "post"
      },
      {
        "title": "Example usage (/:revId)",
        "content": "POST /acme/00000000-0000-0000-0000-000000000000/revision/00000000-0000-0000-0000-000000000001/groups HTTP/1.1\n{\n\t\"name\":\"Group 1\",\n\t\"description\":\"This is the description text for the first group.\",\n\t\"author\":\"alice\",\n\t\"color\":[255,0,0],\n\t\"objects\":[\n\t\t{\n\t\t\t\"account\":\"acme\",\n\t\t\t\"model\":\"00000000-0000-0000-0000-000000000000\",\n\t\t\t\"shared_ids\":[\n\t\t\t\t\"24fdcf2d-b9eb-4fa2-a614-dfe2532493b3\",\n\t\t\t\t\"db18ef69-6d6e-49a0-846e-907346abb39d\",\n\t\t\t\t\"c532ff34-6669-4807-b7f3-6a0ffb17b027\",\n\t\t\t\t\"fec16ea6-bb7b-4f12-b39b-f06fe6bf041d\",\n\t\t\t\t\"3f881fa8-2b7b-443e-920f-396c1c85e903\"\n\t\t\t]\n\t\t}\n\t]\n}",
        "type": "post"
      },
      {
        "title": "Example usage (smart group)",
        "content": "POST /acme/00000000-0000-0000-0000-000000000000/revision/master/head/groups HTTP/1.1\n{\n\t\"name\":\"Smart 1\",\n\t\"description\":\"This is a smart group of objects with type IfcWall or IfcDoor with area > 5.\",\n\t\"author\":\"alice\",\n\t\"color\":[255,0,0],\n\t\"objects\":[],\n\t\"rules\":[\n\t\t{\n\t\t\t\"field\":\"Area\",\n\t\t\t\"operator\":\"GT\",\n\t\t\t\"values\":[5]\n\t\t},\n\t\t{\n\t\t\t\"field\":\"IFC Type\",\n\t\t\t\"operator\":\"IS\",\n\t\t\t\"values\":[\n\t\t\t\t\"IfcWall\",\n\t\t\t\t\"IfcDoor\"\n\t\t\t]\n\t\t}\n\t]\n}",
        "type": "post"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response (normal group)",
          "content": "HTTP/1.1 200 OK\n{\n\t\"_id\":\"00000000-0000-0000-0000-000000000002\",\n\t\"name\":\"Group 1\",\n\t\"description\":\"This is the description text for the first group.\",\n\t\"author\":\"alice\",\n\t\"createdAt\":\"2018-03-09T10:45:00.000Z\",\n\t\"color\":[255,0,0],\n\t\"objects\":[\n\t\t{\n\t\t\t\"account\":\"acme\",\n\t\t\t\"model\":\"00000000-0000-0000-0000-000000000000\",\n\t\t\t\"ifc_guids\":[],\n\t\t\t\"shared_ids\":[\n\t\t\t\t\"24fdcf2d-b9eb-4fa2-a614-dfe2532493b3\",\n\t\t\t\t\"db18ef69-6d6e-49a0-846e-907346abb39d\",\n\t\t\t\t\"c532ff34-6669-4807-b7f3-6a0ffb17b027\",\n\t\t\t\t\"fec16ea6-bb7b-4f12-b39b-f06fe6bf041d\",\n\t\t\t\t\"3f881fa8-2b7b-443e-920f-396c1c85e903\"\n\t\t\t]\n\t\t}\n\t],\n\t\"rules\":[]\n}",
          "type": "json"
        },
        {
          "title": "Success-Response (smart group)",
          "content": "HTTP/1.1 200 OK\n{\n\t\"_id\":\"00000000-0000-0000-0000-000000000004\",\n\t\"name\":\"Smart 1\",\n\t\"description\":\"This is a smart group of objects with type IfcWall or IfcDoor with area > 5.\",\n\t\"author\":\"alice\",\n\t\"createdAt\":\"2018-03-09T10:45:00.000Z\",\n\t\"color\":[255,0,0],\n\t\"objects\":[\n\t\t{\n\t\t\t\"account\":\"acme\",\n\t\t\t\"model\":\"00000000-0000-0000-0000-000000000000\",\n\t\t\t\"ifc_guids\":[],\n\t\t\t\"shared_ids\":[\n\t\t\t\t\"db18ef69-6d6e-49a0-846e-907346abb39d\",\n\t\t\t\t\"fec16ea6-bb7b-4f12-b39b-f06fe6bf041d\",\n\t\t\t\t\"3f881fa8-2b7b-443e-920f-396c1c85e903\"\n\t\t\t]\n\t\t}\n\t],\n\t\"rules\":[\n\t\t{\n\t\t\t\"field\":\"Area\",\n\t\t\t\"operator\":\"GT\",\n\t\t\t\"values\":[5]\n\t\t},\n\t\t{\n\t\t\t\"field\":\"IFC Type\",\n\t\t\t\"operator\":\"IS\",\n\t\t\t\"values\":[\n\t\t\t\t\"IfcWall\",\n\t\t\t\t\"IfcDoor\"\n\t\t\t]\n\t\t}\n\t]\n}",
          "type": "json"
        }
      ],
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Username of group creator</p>"
          },
          {
            "group": "200",
            "type": "Number[]",
            "optional": false,
            "field": "color",
            "description": "<p>RGB colour values</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Group creation timestamp in milliseconds</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Group description</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Group name</p>"
          },
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "objects",
            "description": "<p>List of objects in group</p>"
          },
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "rules",
            "description": "<p>List of rules in group</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Group update timestamp in milliseconds</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "updatedBy",
            "description": "<p>Username of last user to amend group</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique ID of group</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/group.js",
    "groupTitle": "Groups",
    "groupDescription": "<p>A grouping of model elements. Groups can either comprise of a set of manually defined elements or rules (smart group) that define the criteria for its elements.</p>"
  },
  {
    "type": "delete",
    "url": "/:teamspace/:model/groups?ids=[GROUPS]",
    "title": "Delete groups",
    "name": "deleteGroups",
    "group": "Groups",
    "description": "<p>Delete groups.</p>",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "String",
            "optional": false,
            "field": "GROUPS",
            "description": "<p>Comma separated list of group IDs</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Group deletion result (success|ERROR CODE)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"status\":\"success\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage",
        "content": "DELETE /acme/00000000-0000-0000-0000-000000000000/groups?ids=00000000-0000-0000-0000-000000000002,00000000-0000-0000-0000-000000000003 HTTP/1.1",
        "type": "delete"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/group.js",
    "groupTitle": "Groups",
    "groupDescription": "<p>A grouping of model elements. Groups can either comprise of a set of manually defined elements or rules (smart group) that define the criteria for its elements.</p>"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision(/master/head|/:revId)/groups/:groupId?[query]",
    "title": "Find group",
    "name": "findGroup",
    "group": "Groups",
    "description": "<p>Find a group.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "revId",
            "description": "<p>Revision ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupId",
            "description": "<p>Group ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "Boolean",
            "optional": true,
            "field": "ifcguids",
            "description": "<p>Flag that returns IFC GUIDs for group elements</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage (/master/head)",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/revision/master/head/groups/00000000-0000-0000-0000-000000000002 HTTP/1.1",
        "type": "get"
      },
      {
        "title": "Example usage (/:revId)",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/revision/00000000-0000-0000-0000-000000000001/groups/00000000-0000-0000-0000-000000000002 HTTP/1.1",
        "type": "get"
      },
      {
        "title": "Example usage (with IFC GUIDs)",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/revision/master/head/groups/00000000-0000-0000-0000-000000000004?ifcguids=true HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"author\":\"alice\",\n\t\"color\":[255,0,0],\n\t\"createdAt\":1520592300000,\n\t\"description\":\"This is the description text for the first group.\",\n\t\"name\":\"Group 1\",\n\t\"objects\":[\n\t\t{\n\t\t\t\"account\": \"acme\",\n\t\t\t\"model\": \"00000000-0000-0000-0000-000000000000\",\n\t\t\t\"ifc_guids\": [],\n\t\t\t\"shared_ids\": [\n\t\t\t\t\"24fdcf2d-b9eb-4fa2-a614-dfe2532493b3\",\n\t\t\t\t\"db18ef69-6d6e-49a0-846e-907346abb39d\",\n\t\t\t\t\"c532ff34-6669-4807-b7f3-6a0ffb17b027\",\n\t\t\t\t\"fec16ea6-bb7b-4f12-b39b-f06fe6bf041d\",\n\t\t\t\t\"3f881fa8-2b7b-443e-920f-396c1c85e903\"\n\t\t\t]\n\t\t}\n\t],\n\t\"updatedAt\":1552128300000,\n\t\"updatedBy\":\"alice\",\n\t\"_id\":\"00000000-0000-0000-0000-000000000002\"\n}",
          "type": "json"
        },
        {
          "title": "Success-Response (with IFC GUIDs)",
          "content": "HTTP/1.1 200 OK\n{\n\t\"author\":\"alice\",\n\t\"color\":[255,0,0],\n\t\"createdAt\":1520592300000,\n\t\"description\":\"This is a smart group of objects with type IfcWall or IfcDoor with area > 5.\",\n\t\"name\":\"Smart 1\",\n\t\"objects\":[\n\t\t{\n\t\t\t\"account\": \"acme\",\n\t\t\t\"model\": \"00000000-0000-0000-0000-000000000000\",\n\t\t\t\"ifc_guids\": [\n\t\t\t\t\"2cx1GdQ9fAgRIWgfhfBb84\",\n\t\t\t\t\"13NEEUJ8DEE8fEH0aHgm2z\",\n\t\t\t\t\"3OLNF2_DL6hfPgh8Bw7fI7\"\n\t\t\t],\n\t\t\t\"shared_ids\": [\n\t\t\t\t\"24fdcf2d-b9eb-4fa2-a614-dfe2532493b3\",\n\t\t\t\t\"db18ef69-6d6e-49a0-846e-907346abb39d\",\n\t\t\t\t\"c532ff34-6669-4807-b7f3-6a0ffb17b027\",\n\t\t\t\t\"fec16ea6-bb7b-4f12-b39b-f06fe6bf041d\",\n\t\t\t\t\"3f881fa8-2b7b-443e-920f-396c1c85e903\"\n\t\t\t]\n\t\t}\n\t],\n\t\"rules\":[\n\t\t{\n\t\t\t\"field\":\"Area\",\n\t\t\t\"operator\":\"GT\",\n\t\t\t\"values\":[5]\n\t\t},\n\t\t{\n\t\t\t\"field\":\"IFC Type\",\n\t\t\t\"operator\":\"IS\",\n\t\t\t\"values\":[\n\t\t\t\t\"IfcWall\",\n\t\t\t\t\"IfcDoor\"\n\t\t\t]\n\t\t}\n\t],\n\t\"updatedAt\":1552128300000,\n\t\"updatedBy\":\"alice\",\n\t\"_id\":\"00000000-0000-0000-0000-000000000004\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Username of group creator</p>"
          },
          {
            "group": "200",
            "type": "Number[]",
            "optional": false,
            "field": "color",
            "description": "<p>RGB colour values</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Group creation timestamp in milliseconds</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Group description</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Group name</p>"
          },
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "objects",
            "description": "<p>List of objects in group</p>"
          },
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "rules",
            "description": "<p>List of rules in group</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Group update timestamp in milliseconds</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "updatedBy",
            "description": "<p>Username of last user to amend group</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique ID of group</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/group.js",
    "groupTitle": "Groups",
    "groupDescription": "<p>A grouping of model elements. Groups can either comprise of a set of manually defined elements or rules (smart group) that define the criteria for its elements.</p>"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision(/master/head/|/:revId)/groups?[query]",
    "title": "List all groups",
    "name": "listGroups",
    "group": "Groups",
    "description": "<p>List all groups associated with the model.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "revId",
            "description": "<p>Revision unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "Boolean",
            "optional": true,
            "field": "ifcguids",
            "description": "<p>Flag that returns IFC GUIDs for group elements</p>"
          },
          {
            "group": "Query",
            "type": "Boolean",
            "optional": true,
            "field": "noIssues",
            "description": "<p>Flag that hides groups for issues</p>"
          },
          {
            "group": "Query",
            "type": "Boolean",
            "optional": true,
            "field": "noRisks",
            "description": "<p>Flag that hides groups for risks</p>"
          },
          {
            "group": "Query",
            "type": "Boolean",
            "optional": true,
            "field": "noViews",
            "description": "<p>Flag that hides groups for risks</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": true,
            "field": "updatedSince",
            "description": "<p>Only return issues that has been updated since this value (in epoch value)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "objects",
            "description": "<p>List of group objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n[\n\t{\n\t\t\"author\":\"alice\",\n\t\t\"color\":[255,0,0],\n\t\t\"createdAt\":1520592300000,\n\t\t\"description\":\"This is the description text for the first group.\",\n\t\t\"name\":\"Group 1\",\n\t\t\"objects\":[\n\t\t\t{\n\t\t\t\t\"account\": \"acme\",\n\t\t\t\t\"model\": \"00000000-0000-0000-0000-000000000000\",\n\t\t\t\t\"ifc_guids\": [],\n\t\t\t\t\"shared_ids\": [\n\t\t\t\t\t\"24fdcf2d-b9eb-4fa2-a614-dfe2532493b3\",\n\t\t\t\t\t\"db18ef69-6d6e-49a0-846e-907346abb39d\",\n\t\t\t\t\t\"c532ff34-6669-4807-b7f3-6a0ffb17b027\",\n\t\t\t\t\t\"fec16ea6-bb7b-4f12-b39b-f06fe6bf041d\",\n\t\t\t\t\t\"3f881fa8-2b7b-443e-920f-396c1c85e903\"\n\t\t\t\t]\n\t\t\t}\n\t\t],\n\t\t\"updatedAt\":1552128300000,\n\t\t\"updatedBy\":\"alice\",\n\t\t\"_id\":\"00000000-0000-0000-0000-000000000002\"\n\t},\n\t{\n\t\t\"author\":\"alice\",\n\t\t\"color\":[0,255,0],\n\t\t\"createdAt\":1520592300000,\n\t\t\"description\":\"(No description)\",\n\t\t\"name\":\"Group 2\",\n\t\t\"objects\":[\n\t\t\t{\n\t\t\t\t\"account\": \"acme\",\n\t\t\t\t\"model\": \"00000000-0000-0000-0000-000000000000\",\n\t\t\t\t\"ifc_guids\": [],\n\t\t\t\t\"shared_ids\": [\n\t\t\t\t\t\"c532ff34-6669-4807-b7f3-6a0ffb17b027\",\n\t\t\t\t\t\"fec16ea6-bb7b-4f12-b39b-f06fe6bf041d\"\n\t\t\t\t]\n\t\t\t}\n\t\t],\n\t\t\"rules\":[],\n\t\t\"updatedAt\":1552128300000,\n\t\t\"updatedBy\":\"alice\",\n\t\t\"_id\":\"00000000-0000-0000-0000-000000000003\"\n\t}\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage (/master/head)",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/revision/master/head/groups HTTP/1.1",
        "type": "get"
      },
      {
        "title": "Example usage (/:revId)",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/revision/00000000-0000-0000-0000-000000000001/groups HTTP/1.1",
        "type": "get"
      },
      {
        "title": "Example usage (no issue/risk groups)",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/revision/master/head/groups?noIssues=true&noRisks=true HTTP/1.1",
        "type": "get"
      },
      {
        "title": "Example usage (with IFC GUIDs)",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/revision/master/head/groups?ifcguids=true HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/group.js",
    "groupTitle": "Groups",
    "groupDescription": "<p>A grouping of model elements. Groups can either comprise of a set of manually defined elements or rules (smart group) that define the criteria for its elements.</p>"
  },
  {
    "type": "put",
    "url": "/:teamspace/:model/revision(/master/head|/:revId)/groups/:groupId/",
    "title": "Update group",
    "name": "updateGroup",
    "group": "Groups",
    "description": "<p>Update a group.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "revId",
            "description": "<p>Revision ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupId",
            "description": "<p>Group ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Username of group creator</p>"
          },
          {
            "group": "Request body",
            "type": "Number[]",
            "optional": false,
            "field": "color",
            "description": "<p>RGB colour values</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Group description</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Group name</p>"
          },
          {
            "group": "Request body",
            "type": "Object[]",
            "optional": false,
            "field": "objects",
            "description": "<p>List of objects in group</p>"
          },
          {
            "group": "Request body",
            "type": "Object[]",
            "optional": true,
            "field": "rules",
            "description": "<p>List of rules in group</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage (/master/head)",
        "content": "PUT /acme/00000000-0000-0000-0000-000000000000/revision/master/head/groups/00000000-0000-0000-0000-000000000002 HTTP/1.1",
        "type": "put"
      },
      {
        "title": "Example usage (/:revId)",
        "content": "PUT /acme/00000000-0000-0000-0000-000000000000/revision/00000000-0000-0000-0000-000000000001/groups/00000000-0000-0000-0000-000000000002 HTTP/1.1",
        "type": "put"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"author\":\"alice\",\n\t\"color\":[255,0,0],\n\t\"createdAt\":1520592300000,\n\t\"description\":\"Updated description text.\",\n\t\"name\":\"Group 1\",\n\t\"objects\":[\n\t\t{\n\t\t\t\"account\": \"acme\",\n\t\t\t\"model\": \"00000000-0000-0000-0000-000000000000\",\n\t\t\t\"ifc_guids\": [],\n\t\t\t\"shared_ids\": [\n\t\t\t\t\"db18ef69-6d6e-49a0-846e-907346abb39d\",\n\t\t\t\t\"c532ff34-6669-4807-b7f3-6a0ffb17b027\",\n\t\t\t\t\"fec16ea6-bb7b-4f12-b39b-f06fe6bf041d\",\n\t\t\t\t\"3f881fa8-2b7b-443e-920f-396c1c85e903\"\n\t\t\t]\n\t\t}\n\t],\n\t\"updatedAt\":1552128300000,\n\t\"updatedBy\":\"alice\",\n\t\"_id\":\"00000000-0000-0000-0000-000000000002\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Username of group creator</p>"
          },
          {
            "group": "200",
            "type": "Number[]",
            "optional": false,
            "field": "color",
            "description": "<p>RGB colour values</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Group creation timestamp in milliseconds</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Group description</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Group name</p>"
          },
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "objects",
            "description": "<p>List of objects in group</p>"
          },
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "rules",
            "description": "<p>List of rules in group</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Group update timestamp in milliseconds</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "updatedBy",
            "description": "<p>Username of last user to amend group</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique ID of group</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/group.js",
    "groupTitle": "Groups",
    "groupDescription": "<p>A grouping of model elements. Groups can either comprise of a set of manually defined elements or rules (smart group) that define the criteria for its elements.</p>"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revisions.json",
    "title": "List all revisions",
    "name": "listRevisions",
    "group": "History",
    "description": "<p>List all revisions for a model.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "Revisions",
            "description": "<p>object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n[\n\t{\n\t\t\"_id\":\"00000000-0000-0000-0000-000000000001\",\n\t\t\"author\":\"alice\",\n\t\t\"timestamp\":\"2009-06-06T00:00:00.000Z\",\n\t\t\"name\":\"00000000-0000-0000-0000-000000000001\",\n\t\t\"branch\":\"master\"\n\t}\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/revisions.json HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/history.js",
    "groupTitle": "History"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revisions/:branch.json",
    "title": "List all revisions by branch",
    "name": "listRevisionsByBranch",
    "group": "History",
    "description": "<p>List all model revisions from a branch.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "branch",
            "description": "<p>Name of revision branch</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "Revisions",
            "description": "<p>object for a branch</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n[\n\t{\n\t\t\"_id\":\"00000000-0000-0000-0000-000000000004\",\n\t\t\"author\": \"alice\",\n\t\t\"desc\": \"For coordination\",\n\t\t\"timestamp\": \"2015-10-21T07:28:00.000Z\",\n\t\t\"name\":\"00000000-0000-0000-0000-000000000004\",\n\t\t\"branch\": \"staging\"\n\t},\n\t{\n\t\t\"_id\":\"00000000-0000-0000-0000-000000000003\",\n\t\t\"author\": \"alice\",\n\t\t\"desc\": \"Roof access added\",\n\t\t\"timestamp\": \"1985-10-26T09:00:00.000Z\",\n\t\t\"name\":\"00000000-0000-0000-0000-000000000003\",\n\t\t\"branch\": \"staging\"\n\t},\n\t{\n\t\t\"_id\":\"00000000-0000-0000-0000-000000000002\",\n\t\t\"author\": \"alice\",\n\t\t\"desc\": \"Initial design\",\n\t\t\"timestamp\": \"1955-11-12T06:38:00.000Z\",\n\t\t\"name\":\"00000000-0000-0000-0000-000000000002\",\n\t\t\"branch\": \"staging\"\n\t}\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/revisions/staging.json HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/history.js",
    "groupTitle": "History"
  },
  {
    "type": "patch",
    "url": "/:teamspace/:model/revisions/:id",
    "title": "Update revision status",
    "name": "updateRevisionStatus",
    "group": "History",
    "description": "<p>Update the status of revision, setting it to void/active</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique Revision ID or tag</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n   \"void\": true\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/history.js",
    "groupTitle": "History"
  },
  {
    "type": "put",
    "url": "/:teamspace/:model/revisions/:id/tag",
    "title": "Update revision tag",
    "name": "updateRevisionTag",
    "group": "History",
    "description": "<p>Update revision tag</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique Revision ID or tag</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tag",
            "description": "<p>Tag to update</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/history.js",
    "groupTitle": "History"
  },
  {
    "type": "post",
    "url": "/:teamspace/invitations",
    "title": "Create/Update invitation",
    "name": "createInvitation",
    "group": "Invitations",
    "description": "<p>It creates or updates an invitation with the permissions  and a job assigned to the invited email</p>",
    "permission": [
      {
        "name": "teamSpaceAdmin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The email to which the invitation will be sent</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "job",
            "description": "<p>An existing job for the teamspace</p>"
          },
          {
            "group": "Request body",
            "type": "Permissions",
            "optional": false,
            "field": "permissions",
            "description": "<p>Valid permissions for the invited. If there is a teamspace_admin: true the rest of the permissions for that teamspace are ignored.</p>"
          }
        ],
        "Request body: Permisssions": [
          {
            "group": "Request body: Permisssions",
            "type": "Boolean",
            "optional": true,
            "field": "teamspace_admin",
            "description": "<p>Flag indicating if the invited user will become a teamspace administrator. If this flag is true the rest of the permissions are ignored.</p>"
          },
          {
            "group": "Request body: Permisssions",
            "type": "ProjectPermissions[]",
            "optional": true,
            "field": "projects",
            "description": "<p>Permissions for projects and their models.</p>"
          }
        ],
        "Request body: ProjectPermissions": [
          {
            "group": "Request body: ProjectPermissions",
            "type": "String",
            "optional": false,
            "field": "project",
            "description": "<p>The id of the project in which the project permissions will be applied for the invited user.</p>"
          },
          {
            "group": "Request body: ProjectPermissions",
            "type": "Boolean",
            "optional": true,
            "field": "project_admin",
            "description": "<p>Flag indicating if the invited user will become a teamspace administrator. If this flag is true the rest of the permissions are ignored.</p>"
          },
          {
            "group": "Request body: ProjectPermissions",
            "type": "ModelPermissions[]",
            "optional": true,
            "field": "models",
            "description": "<p>An array indicating the permissions for the models.</p>"
          }
        ],
        "Request body: ModelPermissions": [
          {
            "group": "Request body: ModelPermissions",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>The id of the model that will have the permission applied for the invited user.</p>"
          },
          {
            "group": "Request body: ModelPermissions",
            "type": "String",
            "optional": false,
            "field": "permission",
            "description": "<p>The type of permission applied for the invited user. Valid values are 'viewer', 'commenter' or 'collaborator'</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage (with projects and models, permissions):",
        "content": "POST /teamSpace1/invitations HTTP/1.1\n\t{\n\t\temail:'invited@enterprise.com'\n\t\tjob: 'jobA',\n\t\tpermissions:{\n\t\t\tprojects:[\n\t\t\t\t{\n\t\t\t\t\tproject: '5bf7df65-f3a8-4337-8016-a63f00000000',\n\t\t\t\t\tmodels: [\n\t\t\t\t\t\t{ model: '5bfc11fa-50ac-b7e7-4328-83aa11fa50ac', permission:'viewer'},\n\t\t\t\t\t\t{ model: '00b1fb4d-091d-4f11-8dd6-9deaf71f5ca5', permission:'commenter'},\n\t\t\t\t\t]\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\tproject: 'Bim Logo',\n\t\t\t\t\tproject_admin: true\n\t\t\t\t}\n\t\t\t]\n\t\t}\n\t}",
        "type": "post"
      },
      {
        "title": "Example usage (with teamspace admin):",
        "content": "POST /teamSpace1/invitations HTTP/1.1\n\t{\n\t\temail:'anotherinvited@enterprise.com'\n\t\tjob: 'jobA',\n\t\tpermissions: {\n\t\t\tteamspace_admin: true\n\t\t}\n\t}",
        "type": "post"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success (with projects and models, permissions)",
          "content": "HTTP/1.1 200 OK\n\t{\n\t\temail:'invited@enterprise.com'\n\t\tjob: 'jobA',\n\t\tpermissions:{\n\t\t\tprojects:[\n\t\t\t\t{\n\t\t\t\t\tproject: '5bf7df65-f3a8-4337-8016-a63f00000000',\n\t\t\t\t\tmodels: [\n\t\t\t\t\t\t{ model: '5bfc11fa-50ac-b7e7-4328-83aa11fa50ac', permission:'viewer'},\n\t\t\t\t\t\t{ model: '00b1fb4d-091d-4f11-8dd6-9deaf71f5ca5', permission:'commenter'},\n\t\t\t\t\t]\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\tproject: 'Bim Logo',\n\t\t\t\t\tproject_admin: true\n\t\t\t\t}\n\t\t\t]\n\t\t}\n\t}",
          "type": "json"
        },
        {
          "title": "Success (with teamspace admin)",
          "content": "HTTP/1.1 200 OK\n\t{\n\t\temail:'anotherinvited@enterprise.com'\n\t\tjob: 'jobA',\n\t\tpermissions: {\n\t\t\tteamspace_admin: true\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/invitations.js",
    "groupTitle": "Invitations"
  },
  {
    "type": "get",
    "url": "/:teamspace/invitations",
    "title": "Get invitations list",
    "name": "getInvitations",
    "group": "Invitations",
    "description": "<p>It returns a list of invitations with their permissions and their jobs.</p>",
    "permission": [
      {
        "name": "teamSpaceAdmin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/invitations HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"email\": \"7e634bae01db4f@mail.com\",\n    \"job\": \"jobA\",\n    \"permissions\": {\n      \"teamspace_admin\": true\n    }\n  },\n  {\n    \"email\": \"93393d28f953@mail.com\",\n    \"job\": \"jobA\",\n    \"permissions\": {\n      \"projects\": [\n        {\n          \"project\": \"Bim Logo\",\n          \"project_admin\": true\n        }\n      ]\n    }\n  },\n  {\n    \"email\": \"48bc8da2f3bc@mail.com\",\n    \"job\": \"jobA\",\n    \"permissions\": {\n      \"projects\": [\n        {\n          \"project\": \"Bim Logo\",\n          \"models\": [\n            {\n              \"model\": \"2710bd65-37d3-4e7f-b2e0-ffe743ce943f\",\n              \"permission\": \"collaborator\"\n            }\n          ]\n        }\n      ]\n    }\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/invitations.js",
    "groupTitle": "Invitations"
  },
  {
    "type": "delete",
    "url": "/:teamspace/invitations/:email",
    "title": "Revokes an invitation",
    "name": "removeInvitation",
    "group": "Invitations",
    "description": "<p>It revokes an invitation for a teamspace</p>",
    "permission": [
      {
        "name": "teamSpaceAdmin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user invitation that you wish to revoke</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "DELETE /teamSpace1/invitations/invited@enterprise.com HTTP/1.1",
        "type": "delete"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/invitations.js",
    "groupTitle": "Invitations"
  },
  {
    "type": "get",
    "url": "/:teamspace/invoices",
    "title": "List all invoices",
    "name": "listInvoices",
    "group": "Invoice",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ]
      }
    },
    "description": "<p>List all invoices if available, to current logged in user.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "Invoice",
            "description": "<p>Object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n[\n\t{\n\t\"_id\":\"invoice_ID\",\n\t\"invoiceNo\":\"AA-111\",\n\t\"nextPaymentAmount\":00,\n\t\"taxAmount\":0,\n\t\"amount\":00,\n\t\"currency\":\"GBP\",\n\t\"transactionId\":\"transaction_ID\",\n\t\"gateway\":\"GATEWAY_PROVIDER\",\n\t\"billingAgreementId\":\"billing_agreement_ID\",\n\t\"periodEnd\":\"2018-06-03\",\n\t\"periodStart\":\"2018-05-04\",\n\t  \"info\":\n\t\t{\n\t\t  \"vat\":\"\",\n\t\t  \"countryCode\":\"AO\",\n\t\t  \"postalCode\":\"SW11 1BQ\",\n\t\t  \"city\":\"London\",\n\t\t  \"line2\":\"1 Street Road\",\n\t\t  \"line1\":\"London\",\n\t\t  \"company\":\"Comapny\",\n\t\t  \"lastName\":\"User Lastname\",\n\t\t  \"firstName\":\"User Firstname\",\n\t\t  \"_id\":\"invoice_ID\",\n\t\t  \"countryName\":\"United Kingdom\"\n\t\t},\n\t \"nextPaymentDate\":\"2018-06-04\",\n\t \"createdAt\":\"04-05-2018 15:59\",\n\t \"__v\":0,\"state\":\"complete\",\n\t \"items\":\n\t\t[{\n\t\t\t \"name\":\"pricingPlanName\",\n\t\t\t\"currency\":\"GBP\",\n\t\t\t\"amount\":00,\n\t\t\t\"taxAmount\":0,\n\t\t\t\"_id\":\"invoice_ID\",\n\t\t\t\"description\":\"Advance License (from 2018)\",\n\t\t\t\"id\":\"invoice_ID\"},\n\t\t\t  {\n\t\t\t\t\"name\":\"pricingPlanName\",\n\t\t\t\t\"currency\":\"GBP\",\n\t\t\t\t\"amount\":29,\n\t\t\t\t\"taxAmount\":0,\n\t\t\t\t\"_id\":\"invoice_ID\",\n\t\t\t\t\"description\":\"This is a dummy invoice for use with API Documentation\",\n\t\t\t\t\"id\":\"invoice_ID\"\n\t\t}],\n\t\t\t\t\"type\":\"invoice\",\n\t\t\t\t\"proRata\":false,\n\t\t\t\t\"pending\":false,\n\t\t\t\t\"unitPrice\":\"29.00\",\n\t\t\t\t\"B2B_EU\":false,\n\t\t\t\t\"taxPercentage\":0,\n\t\t\t\t\"createdAtDate\":\"2018-05-04\",\n\t\t\t\t\"netAmount\":00\n\t}\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "NOT_AUTHORIZED",
            "description": "<p>Not Authorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "\nHTTP/1.1 401 Not Authorized\n{\n\t\"message\":\"Not Authorized\",\n\t\"status\":401,\"code\":\n\t\"NOT_AUTHORIZED\",\n\t\"value\":9,\n\t\"place\":\"GET /nabile/subscriptions\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/invoice.js",
    "groupTitle": "Invoice"
  },
  {
    "type": "get",
    "url": "/:teamspace/invoices/:invoiceNo.html",
    "title": "Render invoices as HTML",
    "name": "renderInvoice",
    "group": "Invoice",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "invoiceNo",
            "description": "<p>Invoice number to render.</p>"
          }
        ]
      }
    },
    "description": "<p>Render a HTML web page of the requested invoice.</p>",
    "version": "0.0.0",
    "filename": "routes/invoice.js",
    "groupTitle": "Invoice"
  },
  {
    "type": "get",
    "url": "/:teamspace/invoices/:invoiceNo.pdf",
    "title": "Render invoices as PDF",
    "name": "renderInvoicePDF",
    "group": "Invoice",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "invoiceNo.pdf",
            "description": "<p>Invoice to render.</p>"
          }
        ]
      }
    },
    "description": "<p>Render out a PDF version of the requested invocie.</p>",
    "version": "0.0.0",
    "filename": "routes/invoice.js",
    "groupTitle": "Invoice"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/issues/analytics.:format",
    "title": "Get Issue Analytics",
    "name": "getIssueAnalytics",
    "group": "Issues_Analytics",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "analytics.:format",
            "description": "<p>Analytics file to create</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/issueAnalytic.js",
    "groupTitle": "Issues_Analytics"
  },
  {
    "type": "post",
    "url": "/:teamspace/:model/issues/:issueId/resources",
    "title": "Attach resources to an issue",
    "name": "attachResource",
    "group": "Issues",
    "description": "<p>Attaches file or url resources to an issue. If the type of the resource is file it should be send as multipart/form-data. Both types at the same time cant be sent. So in order to attach files and urls it should be done with two different requests.</p> <p>This method triggers a chat event</p>",
    "parameter": {
      "fields": {
        "Request body file resource (multipart/form-data)": [
          {
            "group": "Request body file resource (multipart/form-data)",
            "type": "File[]",
            "optional": false,
            "field": "files",
            "description": "<p>The array of files to be attached</p>"
          },
          {
            "group": "Request body file resource (multipart/form-data)",
            "type": "String[]",
            "optional": false,
            "field": "names",
            "description": "<p>The names of the files; it should have the same length as the files field and should include the file extension</p>"
          }
        ],
        "Request body url resource": [
          {
            "group": "Request body url resource",
            "type": "String[]",
            "optional": false,
            "field": "urls",
            "description": "<p>The array of urls to be attached</p>"
          },
          {
            "group": "Request body url resource",
            "type": "String[]",
            "optional": false,
            "field": "names",
            "description": "<p>The names of the urls; it should have the same length as the url field</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success example result after two files has been uploaded",
          "content": "\n[\n   {\n      \"_id\":\"7617f775-9eb7-4877-8ec3-98ea3457e519\",\n      \"size\":1422,\n      \"issueIds\":[\n         \"3e8a11e0-9812-11e9-9c4d-ebde5888e062\"\n      ],\n      \"name\":\"todo.txt\",\n      \"user\":\"teamSpace1\",\n      \"createdAt\":1561973996461\n   },\n   {\n      \"_id\":\"e25e42d5-c4f0-4fbc-a8f4-bc9899e6662a\",\n      \"size\":2509356,\n      \"issueIds\":[\n         \"3e8a11e0-9812-11e9-9c4d-ebde5888e062\"\n      ],\n      \"name\":\"football.gif\",\n      \"user\":\"teamSpace1\",\n      \"createdAt\":1561973996462\n   }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/issue.js",
    "groupTitle": "Issues"
  },
  {
    "type": "post",
    "url": "/:teamspace/:model/issues/:issueId/comments",
    "title": "Add comment to issue",
    "name": "commentIssue",
    "group": "Issues",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>Comment text</p>"
          },
          {
            "group": "Request body",
            "type": "Viewpoint",
            "optional": true,
            "field": "viewpoint",
            "description": "<p>The viewpoint associated with the comment</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue ID</p>"
          }
        ],
        "Type: Viewpoint": [
          {
            "group": "Type: Viewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "right",
            "description": "<p>Right vector of viewpoint indicating the direction of right in relative coordinates</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "up",
            "description": "<p>Up vector of viewpoint indicating the direction of up in relative coordinates</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "position",
            "description": "<p>Position vector indicates where in the world the viewpoint is positioned</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "look_at",
            "description": "<p>Vector indicating where in the world the viewpoint is looking at</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "view_dir",
            "description": "<p>Vector indicating the direction the viewpoint is looking at in relative coordinates</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number",
            "optional": false,
            "field": "near",
            "description": "<p>Vector indicating the near plane</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number",
            "optional": false,
            "field": "far",
            "description": "<p>Vector indicating the far plane</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number",
            "optional": false,
            "field": "fov",
            "description": "<p>Angle of the field of view</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number",
            "optional": false,
            "field": "aspect_ratio",
            "description": "<p>Aspect ratio of the fustrum</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "ClippingPlane[]",
            "optional": true,
            "field": "clippingPlanes",
            "description": "<p>Clipping planes associated with the viewpoint</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "String",
            "optional": true,
            "field": "highlighted_group_id",
            "description": "<p>If the viewpoint is associated with one or more highlighted objects from the model this field has the value of a group ID generated to hold those objects</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "String",
            "optional": true,
            "field": "hidden_group_id",
            "description": "<p>If the viewpoint is associated with one or more hidden objects from the model this field has the value of a group id generated to hold those objects</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "String",
            "optional": true,
            "field": "shown_group_id",
            "description": "<p>If the viewpoint is associated with one or more shown objects from the model this field has the value of a group id generated to hold those objects</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Group",
            "optional": true,
            "field": "highlighted_group",
            "description": "<p>If the viewpoint is associated with one or more highlighted objects from the model this field has the value of a group definition for those objects (this shouldnt be use simultaneously with highlighted_group_id)</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Group",
            "optional": true,
            "field": "hidden_group",
            "description": "<p>If the viewpoint is associated with one or more hidden objects from the model this field has the value of a group id generated to hold those objects (this shouldnt be use simultaneously with hidden_group_id)</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Group",
            "optional": true,
            "field": "shown_group",
            "description": "<p>If the viewpoint is associated with one or more shown objects from the model this field has the definition of the group to hold those objects (this shouldnt be use simultaneously with shown_group_id)</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Group[]",
            "optional": true,
            "field": "override_groups",
            "description": "<p>If the viewpoint has one or more objects with colour override this field has an array of groups with one group for each colour</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Boolean",
            "optional": false,
            "field": "hide_IFC",
            "description": "<p>A flag to hide the IFC</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "String",
            "optional": false,
            "field": "screenshot",
            "description": "<p>Base64 string representing the screenshot associated with the viewpoint</p>"
          }
        ],
        "Type: Group": [
          {
            "group": "Type: Group",
            "type": "Number[3]",
            "optional": false,
            "field": "color",
            "description": "<p>RGB colour values</p>"
          },
          {
            "group": "Type: Group",
            "type": "ModelObjects",
            "optional": false,
            "field": "objects",
            "description": "<p>List of objects in group</p>"
          }
        ],
        "Type: ModelObjects": [
          {
            "group": "Type: ModelObjects",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>The account that has the model which contains the objects</p>"
          },
          {
            "group": "Type: ModelObjects",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>The model id that contains the objects</p>"
          },
          {
            "group": "Type: ModelObjects",
            "type": "String[]",
            "optional": false,
            "field": "shared_ids",
            "description": "<p>The shared ids of objects to be selected</p>"
          }
        ],
        "Type: ClippingPlane": [
          {
            "group": "Type: ClippingPlane",
            "type": "Number[3]",
            "optional": false,
            "field": "normal",
            "description": "<p>The normal of the plane defined for the clipping plane</p>"
          },
          {
            "group": "Type: ClippingPlane",
            "type": "Number",
            "optional": false,
            "field": "distance",
            "description": "<p>The distance for the clipping plane to the origin</p>"
          },
          {
            "group": "Type: ClippingPlane",
            "type": "Number",
            "optional": false,
            "field": "clipDirection",
            "description": "<p>The direction to the clipping plane will cut the model; above or below the plane. Possible values: 1 , -1.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "PAYLOAD",
          "content": "{\n  \"comment\": \"This is a commment\",\n  \"viewpoint\": {right: [-0.0374530553817749, -7.450580596923828e-9, -0.9992983341217041],…}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": " HTTP/1.1 200 OK\n{\n    guid: \"096de7ed-e3bb-4d5b-ae68-17a5cf7a5e5e\",\n    comment: \"This is a commment\",\n    created: 1558534690327,\n    guid: \"096de7ed-e3bb-4d5b-ae68-17a5cf7a5e5e\",\n    owner: \"username\",\n    viewpoint: {right: [-0.0374530553817749, -7.450580596923828e-9, -0.9992983341217041],…}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Issue not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Comment with no text</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/issue.js",
    "groupTitle": "Issues"
  },
  {
    "type": "delete",
    "url": "/:teamspace/:model/issues/:issueId/comments",
    "title": "Deletes an comment from an issue",
    "name": "commentIssue",
    "group": "Issues",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Json",
            "optional": false,
            "field": "PAYLOAD",
            "description": "<p>The data with the comment guid to be deleted.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "PAYLOAD",
          "content": "{\n   guid: \"096de7ed-e3bb-4d5b-ae68-17a5cf7a5e5e\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": " HTTP/1.1 200 OK\n{\n    guid: \"096de7ed-e3bb-4d5b-ae68-17a5cf7a5e5e\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Issue not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Not authorized, when the user is not the owner</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Issue comment sealed, when the user is trying to delete a comment that is sealed</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/issue.js",
    "groupTitle": "Issues"
  },
  {
    "type": "delete",
    "url": "/:teamspace/:model/issues/:issueId/resources",
    "title": "Detach a resource from an issue",
    "name": "detachResource",
    "group": "Issues",
    "description": "<p>Detachs a resource from an issue. If the issue is the last entity the resources has been attached to it also deletes the resource from the system. This method triggers a chat event .</p>",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>The resource id to be detached</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n   \"_id\":\"e25e42d5-c4f0-4fbc-a8f4-bc9899e6662a\",\n   \"size\":2509356,\n   \"issueIds\":[\n   ],\n   \"name\":\"football.gif\",\n   \"user\":\"teamSpace1\",\n   \"createdAt\":1561973996462\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/issue.js",
    "groupTitle": "Issues"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/issues/:issueId",
    "title": "Get issue",
    "name": "findIssue",
    "group": "Issues",
    "description": "<p>Find an issue with the requested Issue ID.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "issue",
            "description": "<p>The Issue matching the Issue ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response.",
          "content": "HTTP/1.1 200 OK\n{\n\t\taccount: \"username\"\n\t\tassigned_roles: []\n\t\tcommentCount: 0\n\t\tcreated: 1542723030489\n\t\tcreator_role: \"3D Repo\"\n\t\tdesc: \"(No Description)\"\n\t\tmodel: \"model_ID\"\n\t\tmodelCode: \"\"\n\t\tname: \"Issue one\"\n\t\tnumber: 1\n\t\towner: \"username\"\n\t\tposition: []\n\t\tpriority: \"none\"\n\t\trev_id: \"revision_ID\"\n\t\tscale: 1\n\t\tstatus: \"open\"\n\t\tthumbnail: \"USERNAME/MODEL_ID/issues/ISSUE_ID/thumbnail.png\"\n\t\ttopic_type: \"for_information\"\n\t\ttypePrefix: \"Architectural\"\n\t\tviewCount: 1\n\t\tviewpoint: {near: 24.057758331298828, far: 12028.87890625, fov: 1.0471975803375244,…}\n\t\t__v: 0\n\t\t_id: \"ISSUE_ID\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ISSUE_NOT_FOUND",
            "description": "<p>Issue not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 404 Not Found",
          "content": "HTTP/1.1 404 Not Found\n{\n\t \"place\": \"GET /issues/:issueId\",\n\t \"status\": 500,\n\t \"message\": \"Issue not found\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/issue.js",
    "groupTitle": "Issues",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue ID</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/issues.bcfzip",
    "title": "Download issues BCF file",
    "name": "getIssuesBCF",
    "group": "Issues",
    "description": "<p>Download issues as a BCF file.</p>",
    "version": "0.0.0",
    "filename": "routes/issue.js",
    "groupTitle": "Issues",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/:revId/issues.bcfzip",
    "title": "Get Issues BCF zip file by revision ID",
    "name": "getIssuesBCFTRid",
    "group": "Issues",
    "description": "<p>Get Issues BCF export based on revision ID.</p>",
    "version": "0.0.0",
    "filename": "routes/issue.js",
    "groupTitle": "Issues",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "revId",
            "description": "<p>Revision ID</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/issues/:issueId/viewpoints/:viewpointId/screenshot.png",
    "title": "Get issue viewpoint screenshot",
    "name": "getScreenshot",
    "group": "Issues",
    "description": "<p>Get an issue viewpoint screenshot.</p>",
    "version": "0.0.0",
    "filename": "routes/issue.js",
    "groupTitle": "Issues",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "viewpointId",
            "description": "<p>Viewpoint ID</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/issues/:issueId/viewpoints/:viewpointId/screenshotSmall.png",
    "title": "Get smaller version of Issue screenshot",
    "name": "getScreenshotSmall",
    "group": "Issues",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "Issue",
            "description": "<p>Screenshot.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/issue.js",
    "groupTitle": "Issues",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "viewpointId",
            "description": "<p>Viewpoint ID</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/issues/:issueId/thumbnail.png",
    "title": "Get issue thumbnail",
    "name": "getThumbnail",
    "group": "Issues",
    "description": "<p>Retrieve screenshot thumbnail image for requested issue.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "thumbnail",
            "description": "<p>Thumbnail image</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/issue.js",
    "groupTitle": "Issues",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue ID</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/:teamspace/:model/issues.bcfzip",
    "title": "Import BCF file",
    "name": "importBCF",
    "group": "Issues",
    "description": "<p>Upload issues BCF file.</p>",
    "version": "0.0.0",
    "filename": "routes/issue.js",
    "groupTitle": "Issues",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/:revId/issues",
    "title": "Get all Issues by revision ID",
    "name": "listIssues",
    "group": "Issues",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "convertCoords",
            "description": "<p>Convert coordinates to user space</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": true,
            "field": "updatedSince",
            "description": "<p>Only return issues that has been updated since this value (in epoch value)</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "revId",
            "description": "<p>Revision ID</p>"
          }
        ]
      }
    },
    "description": "<p>Get all issues related to specific revision ID.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "Issues",
            "description": "<p>Object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "\n[\n\t{\n\t\t\"_id\":\"issue_ID\",\n\t\t\"creator_role\":\"Client\",\n\t\t\"scale\":1,\n\t\t\"due_date\":1547424000000,\n\t\t\"priority\":\"low\",\n\t\t\"desc\":\"This is a description\",\n\t\t\"topic_type\":\"for_information\",\n\t\t\"status\":\"open\",\"owner\":\"username\",\n\t\t\"created\":1546626949432,\n\t\t\"name\":\"An Issue for API\",\n\t\t\"number\":3,\n\t\t\"rev_id\":\"9cf31c6e-37cc-4625-8cee-270cf731059e\",\n\t\t\"__v\":0,\n\t\t\"assigned_roles\":[\"Architect\"],\n\t\t\"viewCount\":1,\"commentCount\":0,\n\t\t\"thumbnail\":\"ACCOUNT/MODEL_ID/issues/ISSUE_ID/thumbnail.png\",\n\t\t\"position\":[],\n\t\t\"typePrefix\":\"sample\",\n\t\t\"modelCode\":\"\",\n\t\t\"account\":\"username\",\n\t\t\"model\":\"MODEL_ID\",\n\t\t\"viewpoint\":\n\t\t\t{\n\t\t\t\t\"near\":54.739341735839844,\n\t\t\t\t\"far\":27369.669921875,\n\t\t\t\t\"fov\":1.0471975803375244,\n\t\t\t\t\"aspect_ratio\":2.522167444229126,\n\t\t\t\t\"hideIfc\":true,\n\t\t\t\t\"guid\":\"5afbe23f-8307-42d0-ba77-f031922281ce\",\n\t\t\t\t\"_id\":\"5c2fa785b4af3c45f8f83c60\",\n\t\t\t\t\"type\":\"perspective\",\n\t\t\t\t\"screenshot\":\"username/MODEL_ID/issues/ISSUE_ID/viewpoints/5afbe23f-8307-42d0-ba77-f031922281ce/screenshot.png\",\n\t\t\t\t\"clippingPlanes\":[],\"right\":[0.7270411252975464,1.862645149230957e-8,0.6865938901901245],\n\t\t\t\t\t\"view_dir\":[0.6777805089950562,-0.15971262753009796,-0.7177084684371948],\n\t\t\t\t\t\"look_at\":[8400.001953125,2339.99951171875,-9599.9990234375],\n\t\t\t\t\t\"position\":[-3360.6259765625,5111.28125,2853.4453125],\n\t\t\t\t\t\"up\":[0.10965770483016968,0.9871635437011719,-0.11611767113208771],\n\t\t\t\t\t\"screenshotSmall\"username/MODEL_ID/issues/ISSUE_ID/viewpoints/5afbe23f-8307-42d0-ba77-f031922281ce/screenshot.png\"}\n\t}\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/issue.js",
    "groupTitle": "Issues"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/issues?[query]",
    "title": "Get all Issues",
    "name": "listIssues",
    "group": "Issues",
    "description": "<p>List all issues for model.</p>",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "convertCoords",
            "description": "<p>Convert coordinates to user space</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": true,
            "field": "updatedSince",
            "description": "<p>Only return issues updated since this value (in epoch value)</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": true,
            "field": "numbers",
            "description": "<p>Array of issue numbers to filter for</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "ids",
            "description": "<p>Array of issue IDs to filter for</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response.",
          "content": "HTTP/1.1 200 OK\n[\n\t{\n\t\t\"_id\":\"ISSUE_ID\",\n\t\t\"creator_role\":\"Client\",\"scale\":1,\n\t\t\"due_date\":1543881600000,\n\t\t\"priority\":\"low\",\n\t\t\"desc\":\"reverse\",\n\t\t\"topic_type\":\"for_information\",\n\t\t\"status\":\"for approval\",\n\t\t\"owner\":\"username\",\n\t\t\"created\":1546217360002,\n\t\t\"name\":\"Without reverse\",\n\t\t\"number\":2,\n\t\t\"rev_id\":\"REVISION_ID\",\n\t\t\"__v\":0,\n\t\t\"assigned_roles\":[\"Architect\"],\n\t\t\"viewCount\":1,\n\t\t\"commentCount\":0,\n\t\t\"thumbnail\":\"nabile/MODEL_ID/issues/ISSUE_ID/thumbnail.png\",\n\t\t\"position\":[8341.8056640625,1279.962158203125,-3050.34521484375],\n\t\t\"typePrefix\":\"sample\",\n\t\t\"modelCode\":\"\",\n\t\t\"account\":\"username\",\n\t\t\"model\":\"MODEL_ID\",\n\t\t\"viewpoint\":\n\t\t\t{\n\t\t\t\t\"near\":54.739341735839844,\n\t\t\t\t\"far\":27369.669921875,\n\t\t\t\t\"fov\":1.0471975803375244,\n\t\t\t\t\"aspect_ratio\":1.451704502105713,\n\t\t\t\t\"hideIfc\":true,\n\t\t\t\t\"guid\":\"9279d95e-3aee-49c2-ba45-9d2302044597\",\n\t\t\t\t\"_id\":\"5c296790e5f57704580ca00a\",\n\t\t\t\t\"type\":\"perspective\",\n\t\t\t\t\"screenshot\":\"ACCOUNT/MODEL_ID/issues/ISSUE_ID/viewpoints/MODEL_ID/screenshot.png\",\n\t\t\t\t\"clippingPlanes\":[],\"right\":[0.7270411252975464,1.862645149230957e-8,0.6865938901901245],\n\t\t\t\t\"view_dir\":[0.6777805089950562,-0.15971262753009796,-0.7177084684371948],\n\t\t\t\t\"look_at\":[8400.001953125,2339.99951171875,-9599.9990234375],\n\t\t\t\t\"position\":[-3360.6259765625,5111.28125,2853.4453125],\n\t\t\t\t\"up\":[0.10965770483016968,0.9871635437011719,-0.11611767113208771],\n\t\t\t\t\"screenshotSmall\":\"nabile/MODEL_ID/issues/ISSUE_ID/viewpoints/MODEL_ID/screenshotSmall.png\"\n\t\t\t}\n\t}\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/issue.js",
    "groupTitle": "Issues"
  },
  {
    "type": "post",
    "url": "/:teamspace/:model/issues",
    "title": "Create issue",
    "name": "newIssue",
    "group": "Issues",
    "description": "<p>Creates a new issue.</p>",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the issue</p>"
          },
          {
            "group": "Request body",
            "type": "String[]",
            "optional": false,
            "field": "assigned_roles",
            "description": "<p>The roles assigned to the issue. Even though its an array (this is for future support of multiple assigned jobs), currently it has one or none elements correspoing to the available jobs in the teamaspace.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>The status of the issue. It can have a value of &quot;open&quot;,&quot;in progress&quot;,&quot;for approval&quot;, &quot;void&quot; or &quot;closed&quot;.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "priority",
            "description": "<p>The priority of the issue. It can have a value of &quot;none&quot;, String&quot;low&quot;, &quot;medium&quot; or &quot;high&quot;.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "topic_type",
            "description": "<p>Type of the issue. It's value has to be one of the defined topic_types for the model. See <a href='#api-Model-createModel'>here</a> for more details.</p>"
          },
          {
            "group": "Request body",
            "type": "Viewpoint",
            "optional": false,
            "field": "viewpoint",
            "description": "<p>The viewpoint of the issue, defining the position of the camera and the screenshot for that position.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "desc",
            "description": "<p>The description of the created issue</p>"
          },
          {
            "group": "Request body",
            "type": "Number[3]",
            "optional": false,
            "field": "position",
            "description": "<p>The vector defining the pin of the issue. If the pin doesnt has an issue its an empty array.</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ],
        "Type: Viewpoint": [
          {
            "group": "Type: Viewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "right",
            "description": "<p>Right vector of viewpoint indicating the direction of right in relative coordinates</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "up",
            "description": "<p>Up vector of viewpoint indicating the direction of up in relative coordinates</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "position",
            "description": "<p>Position vector indicates where in the world the viewpoint is positioned</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "look_at",
            "description": "<p>Vector indicating where in the world the viewpoint is looking at</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "view_dir",
            "description": "<p>Vector indicating the direction the viewpoint is looking at in relative coordinates</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number",
            "optional": false,
            "field": "near",
            "description": "<p>Vector indicating the near plane</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number",
            "optional": false,
            "field": "far",
            "description": "<p>Vector indicating the far plane</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number",
            "optional": false,
            "field": "fov",
            "description": "<p>Angle of the field of view</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number",
            "optional": false,
            "field": "aspect_ratio",
            "description": "<p>Aspect ratio of the fustrum</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "ClippingPlane[]",
            "optional": true,
            "field": "clippingPlanes",
            "description": "<p>Clipping planes associated with the viewpoint</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "String",
            "optional": true,
            "field": "highlighted_group_id",
            "description": "<p>If the viewpoint is associated with one or more highlighted objects from the model this field has the value of a group ID generated to hold those objects</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "String",
            "optional": true,
            "field": "hidden_group_id",
            "description": "<p>If the viewpoint is associated with one or more hidden objects from the model this field has the value of a group id generated to hold those objects</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "String",
            "optional": true,
            "field": "shown_group_id",
            "description": "<p>If the viewpoint is associated with one or more shown objects from the model this field has the value of a group id generated to hold those objects</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Group",
            "optional": true,
            "field": "highlighted_group",
            "description": "<p>If the viewpoint is associated with one or more highlighted objects from the model this field has the value of a group definition for those objects (this shouldnt be use simultaneously with highlighted_group_id)</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Group",
            "optional": true,
            "field": "hidden_group",
            "description": "<p>If the viewpoint is associated with one or more hidden objects from the model this field has the value of a group id generated to hold those objects (this shouldnt be use simultaneously with hidden_group_id)</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Group",
            "optional": true,
            "field": "shown_group",
            "description": "<p>If the viewpoint is associated with one or more shown objects from the model this field has the definition of the group to hold those objects (this shouldnt be use simultaneously with shown_group_id)</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Group[]",
            "optional": true,
            "field": "override_groups",
            "description": "<p>If the viewpoint has one or more objects with colour override this field has an array of groups with one group for each colour</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Boolean",
            "optional": false,
            "field": "hide_IFC",
            "description": "<p>A flag to hide the IFC</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "String",
            "optional": false,
            "field": "screenshot",
            "description": "<p>Base64 string representing the screenshot associated with the viewpoint</p>"
          }
        ],
        "Type: Group": [
          {
            "group": "Type: Group",
            "type": "Number[3]",
            "optional": false,
            "field": "color",
            "description": "<p>RGB colour values</p>"
          },
          {
            "group": "Type: Group",
            "type": "ModelObjects",
            "optional": false,
            "field": "objects",
            "description": "<p>List of objects in group</p>"
          }
        ],
        "Type: ModelObjects": [
          {
            "group": "Type: ModelObjects",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>The account that has the model which contains the objects</p>"
          },
          {
            "group": "Type: ModelObjects",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>The model id that contains the objects</p>"
          },
          {
            "group": "Type: ModelObjects",
            "type": "String[]",
            "optional": false,
            "field": "shared_ids",
            "description": "<p>The shared ids of objects to be selected</p>"
          }
        ],
        "Type: ClippingPlane": [
          {
            "group": "Type: ClippingPlane",
            "type": "Number[3]",
            "optional": false,
            "field": "normal",
            "description": "<p>The normal of the plane defined for the clipping plane</p>"
          },
          {
            "group": "Type: ClippingPlane",
            "type": "Number",
            "optional": false,
            "field": "distance",
            "description": "<p>The distance for the clipping plane to the origin</p>"
          },
          {
            "group": "Type: ClippingPlane",
            "type": "Number",
            "optional": false,
            "field": "clipDirection",
            "description": "<p>The direction to the clipping plane will cut the model; above or below the plane. Possible values: 1 , -1.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/issues HTTP/1.1\n{\n   \"name\": \"Amazing issue\",\n   \"assigned_roles\": [\n      \"jobA\"\n   ],\n   \"status\": \"open\",\n   \"priority\": \"none\",\n   \"topic_type\": \"for_information\",\n   \"viewpoint\": {\n      \"right\": [\n         0.8471935391426086,\n         -2.2351741790771484e-8,\n         0.5312844514846802\n      ],\n      \"up\": [\n         0.14098820090293884,\n         0.9641460180282593,\n         -0.22482173144817352\n      ],\n      \"position\": [\n         -5828.818359375,\n         5268.15625,\n         7829.76171875\n      ],\n      \"look_at\": [\n         -2445.6826171875,\n         3515.4658203125,\n         2434.966552734375\n      ],\n      \"view_dir\": [\n         0.5122357606887817,\n         -0.2653723657131195,\n         -0.8168182373046875\n      ],\n      \"near\": 20.835742950439453,\n      \"far\": 10417.87109375,\n      \"fov\": 1.0471975803375244,\n      \"aspect_ratio\": 4.031496047973633,\n      \"clippingPlanes\": [],\n      \"override_groups\": [\n         {\n         \t   \"color\": [\n         \t       0,\n         \t       106,\n         \t       255,\n         \t       52\n         \t   ],\n         \t   \"objects\": [\n         \t   \t{\n         \t   \t   \"shared_ids\": [\n         \t   \t      \"ffd49cfd-57fb-4c31-84f7-02b41352b54f\"\n         \t   \t   ],\n         \t   \t   \"account\": \"teamSpace1\",\n         \t   \t   \"model\": \"2710bd65-37d3-4e7f-b2e0-ffe743ce943f\"\n         \t   \t}\n         \t   ],\n         \t   \"totalSavedMeshes\": 1\n         }   ,\n         {\n            \"color\": [\n                 96,\n                 237,\n                 61\n            ],\n         \t   \"objects\": [\n         \t   \t{\n         \t   \t   \"shared_ids\": [\n         \t   \t   \"a4a14ee6-aa44-4f36-96bd-f80dbabf8ead\"\n         \t   \t   ],\n         \t   \t   \"account\": \"teamSpace1\",\n         \t   \t   \"model\": \"2710bd65-37d3-4e7f-b2e0-ffe743ce943f\"\n         \t   \t}\n         \t   ],\n         \t   \"totalSavedMeshes\": 1\n         }\n      ],\n      \"highlighted_group\": {\n      \t\"objects\": [\n      \t\t{\n      \t\t\t\"shared_ids\": [\n      \t\t\t\t\"60286d41-d897-4de6-a0ed-0929fa68be96\"\n      \t\t\t],\n      \t\t\t\"account\": \"teamSpace1\",\n      \t\t\t\"model\": \"7cf61b4f-acdf-4295-b2d0-9b45f9f27418\"\n      \t\t}\n      \t],\n      \t\"color\": [\n      \t\t255,\n      \t\t255,\n      \t\t0\n      \t]\n      },\n      \"hidden_group\": {\n      \t\"objects\": [\n      \t\t{\n      \t\t\t\"shared_ids\": [\n      \t\t\t\t\"57b0969f-6009-4e32-9153-2b17d3a3628b\"\n      \t\t\t],\n      \t\t\t\"account\": \"teamSpace1\",\n      \t\t\t\"model\": \"b1fceab8-b0e9-4e45-850b-b9888efd6521\"\n      \t\t}\n      \t]\n      }\n      \"hideIfc\": true,\n      \"screenshot\": \"iVBORw0KGgoAAAANSUhEUgAACAAAA...ggg==\"\n   },\n   \"desc\": \"This is the most awesome issue ever\",\n   \"position\": [\n      -3960.10205078125,\n      4487.1552734375,\n      3326.732177734375\n   ]\n}",
        "type": "post"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "{\n   \"name\": \"Amazing issue\",\n   \"assigned_roles\": [\n      \"jobA\"\n   ],\n   \"status\": \"open\",\n   \"priority\": \"none\",\n   \"topic_type\": \"for_information\",\n   \"owner\": \"teamSpace1\",\n   \"desc\": \"This is the most awesome issue ever\",\n   \"rev_id\": \"330f909b-9279-41aa-a87c-1c46f53a8e93\",\n   \"creator_role\": \"jobA\",\n   \"scale\": 1,\n   \"position\": [\n      -3960.10205078125,\n      4487.1552734375,\n      3326.732177734375\n   ],\n   \"_id\": \"9ba5fb10-c8db-11e9-8f2a-ada77612c97e\",\n   \"created\": 1566918114625,\n   \"number\": 1,\n   \"thumbnail\": \"teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/issues/9ba5fb10-c8db-11e9-8f2a-ada77612c97e/thumbnail.png\",\n   \"typePrefix\": \"Structural\",\n   \"modelCode\": \"\",\n   \"account\": \"teamSpace1\",\n   \"model\": \"3549ddf6-885d-4977-87f1-eeac43a0e818\",\n   \"viewpoint\": {\n      \"right\": [\n         0.8471935391426086,\n         -2.2351741790771484e-8,\n         0.5312844514846802\n      ],\n      \"up\": [\n         0.14098820090293884,\n         0.9641460180282593,\n         -0.22482173144817352\n      ],\n      \"position\": [\n         -5828.818359375,\n         5268.15625,\n         7829.76171875\n      ],\n      \"look_at\": [\n         -2445.6826171875,\n         3515.4658203125,\n         2434.966552734375\n      ],\n      \"view_dir\": [\n         0.5122357606887817,\n         -0.2653723657131195,\n         -0.8168182373046875\n      ],\n      \"near\": 20.835742950439453,\n      \"far\": 10417.87109375,\n      \"fov\": 1.0471975803375244,\n      \"aspect_ratio\": 4.031496047973633,\n      \"clippingPlanes\": [],\n      \"hidden_group_id\": \"119d5dc0-e223-11ea-8549-49012d4e4956\",\n      \"highlighted_group_id\" : \"80c5a270-e223-11ea-8549-49012d4e4956\",\n      \"override_group_ids\": [\n         \"11952060-e223-11ea-8549-49012d4e4956\",\n         \"bc5ca80-e6c7-11ea-bd51-ddd919e6418e\"\n      ],\n      \"hideIfc\": true,\n      \"screenshot\": \"teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/issues/9ba5fb10-c8db-11e9-8f2a-ada77612c97e/viewpoints/125ce196-852c-49ed-9a2f-f9a77aa03390/screenshot.png\",\n      \"guid\": \"125ce196-852c-49ed-9a2f-f9a77aa03390\",\n      \"screenshotSmall\": \"teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/issues/9ba5fb10-c8db-11e9-8f2a-ada77612c97e/viewpoints/125ce196-852c-49ed-9a2f-f9a77aa03390/screenshotSmall.png\"\n   },\n   \"comments\": [],\n   \"extras\": {\n   }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/issue.js",
    "groupTitle": "Issues"
  },
  {
    "type": "post",
    "url": "/:teamspace/:model/revision/:revId/issues",
    "title": "Create issue on revision",
    "name": "newIssueRev",
    "group": "Issues",
    "description": "<p>Creates a new issue for a particular revision. See <a href=\"#api-Issues-newIssue\">here</a> for more details.</p>",
    "version": "0.0.0",
    "filename": "routes/issue.js",
    "groupTitle": "Issues",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "revId",
            "description": "<p>Revision ID</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/:teamspace/:model/revision/:revId/issues.bcfzip",
    "title": "Post Issues BCF zip file by revision ID",
    "name": "postIssuesBCF",
    "group": "Issues",
    "description": "<p>Upload Issues BCF file using current revision ID.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>&quot;ok&quot; on success</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP\n{\n\t\"status\":\"ok\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/issue.js",
    "groupTitle": "Issues",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "revId",
            "description": "<p>Revision ID</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/issues.html",
    "title": "Issues response into as HTML",
    "name": "renderIssuesHTML",
    "group": "Issues",
    "description": "<p>Render all Issues into a HTML webpage, response is rendered HTML.</p>",
    "version": "0.0.0",
    "filename": "routes/issue.js",
    "groupTitle": "Issues",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/:revId/issues.html",
    "title": "Issues response into as HTML by revision ID",
    "name": "renderIssuesHTMLRid",
    "group": "Issues",
    "description": "<p>Render all Issues into a HTML webpage based on current revision ID.</p>",
    "version": "0.0.0",
    "filename": "routes/issue.js",
    "groupTitle": "Issues",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "revId",
            "description": "<p>Revision ID</p>"
          }
        ]
      }
    }
  },
  {
    "type": "patch",
    "url": "/:teamspace/:model/issues/:issueId",
    "title": "Update issue",
    "name": "updateIssue",
    "group": "Issues",
    "description": "<p>Updates an issue. It takes the part of the issue that can be updated. The system will create a system comment within the issue describing which values were changed. The user needs to be the teamspace administrator, the project administrator, has the same job as the creator of the issue, or has the issue assigned. In the case that the issue has been assigned to the user, the user cannot change it to the &quot;closed&quot; status.</p> <p>If the issue is being updated to assigned to a job and the status of the issue has the value &quot;for_approval&quot;, then the status of the issue is automatically changed to &quot;in_progress&quot;.</p> <p>If the user is changing the issue to the &quot;for_approval&quot; status, the issue will be assigned to the job that the creator of the issue.</p>",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "[]String",
            "optional": true,
            "field": "assigned_roles",
            "description": "<p>Job roles assigned to the issue</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "desc",
            "description": "<p>Description of issue</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>The status of issue (values: &quot;open&quot;, &quot;in progress&quot;, &quot;for approval&quot;, &quot;closed&quot;)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "topic_type",
            "description": "<p>Topic type of issue (see <a href='#api-Model-createModel'>here</a> for available types)</p>"
          },
          {
            "group": "Request body",
            "type": "[3]Number",
            "optional": true,
            "field": "position",
            "description": "<p>Vector defining the pin position of the issue; empty if the issue has no pin</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "due_date",
            "description": "<p>Due date timestamp for the issue</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "priority",
            "description": "<p>The priority of the issue (values: &quot;none&quot;, &quot;low&quot;, &quot;medium&quot;, &quot;high&quot;)</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "scale",
            "description": "<p>The scale factor of the issue</p>"
          },
          {
            "group": "Request body",
            "type": "Viewpoint",
            "optional": true,
            "field": "viewpoint",
            "description": "<p>The viewpoint and screenshot of the issue</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "viewCount",
            "description": "<p>The viewcount of the issue</p>"
          },
          {
            "group": "Request body",
            "type": "Object",
            "optional": true,
            "field": "extras",
            "description": "<p>A field containing any extras that wanted to be saved in the issue (typically used by BCF)</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue ID</p>"
          }
        ],
        "Type: Viewpoint": [
          {
            "group": "Type: Viewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "right",
            "description": "<p>Right vector of viewpoint indicating the direction of right in relative coordinates</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "up",
            "description": "<p>Up vector of viewpoint indicating the direction of up in relative coordinates</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "position",
            "description": "<p>Position vector indicates where in the world the viewpoint is positioned</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "look_at",
            "description": "<p>Vector indicating where in the world the viewpoint is looking at</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "view_dir",
            "description": "<p>Vector indicating the direction the viewpoint is looking at in relative coordinates</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number",
            "optional": false,
            "field": "near",
            "description": "<p>Vector indicating the near plane</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number",
            "optional": false,
            "field": "far",
            "description": "<p>Vector indicating the far plane</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number",
            "optional": false,
            "field": "fov",
            "description": "<p>Angle of the field of view</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number",
            "optional": false,
            "field": "aspect_ratio",
            "description": "<p>Aspect ratio of the fustrum</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "ClippingPlane[]",
            "optional": true,
            "field": "clippingPlanes",
            "description": "<p>Clipping planes associated with the viewpoint</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "String",
            "optional": true,
            "field": "highlighted_group_id",
            "description": "<p>If the viewpoint is associated with one or more highlighted objects from the model this field has the value of a group ID generated to hold those objects</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "String",
            "optional": true,
            "field": "hidden_group_id",
            "description": "<p>If the viewpoint is associated with one or more hidden objects from the model this field has the value of a group id generated to hold those objects</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "String",
            "optional": true,
            "field": "shown_group_id",
            "description": "<p>If the viewpoint is associated with one or more shown objects from the model this field has the value of a group id generated to hold those objects</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Group",
            "optional": true,
            "field": "highlighted_group",
            "description": "<p>If the viewpoint is associated with one or more highlighted objects from the model this field has the value of a group definition for those objects (this shouldnt be use simultaneously with highlighted_group_id)</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Group",
            "optional": true,
            "field": "hidden_group",
            "description": "<p>If the viewpoint is associated with one or more hidden objects from the model this field has the value of a group id generated to hold those objects (this shouldnt be use simultaneously with hidden_group_id)</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Group",
            "optional": true,
            "field": "shown_group",
            "description": "<p>If the viewpoint is associated with one or more shown objects from the model this field has the definition of the group to hold those objects (this shouldnt be use simultaneously with shown_group_id)</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Group[]",
            "optional": true,
            "field": "override_groups",
            "description": "<p>If the viewpoint has one or more objects with colour override this field has an array of groups with one group for each colour</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Boolean",
            "optional": false,
            "field": "hide_IFC",
            "description": "<p>A flag to hide the IFC</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "String",
            "optional": false,
            "field": "screenshot",
            "description": "<p>Base64 string representing the screenshot associated with the viewpoint</p>"
          }
        ],
        "Type: Group": [
          {
            "group": "Type: Group",
            "type": "Number[3]",
            "optional": false,
            "field": "color",
            "description": "<p>RGB colour values</p>"
          },
          {
            "group": "Type: Group",
            "type": "ModelObjects",
            "optional": false,
            "field": "objects",
            "description": "<p>List of objects in group</p>"
          }
        ],
        "Type: ModelObjects": [
          {
            "group": "Type: ModelObjects",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>The account that has the model which contains the objects</p>"
          },
          {
            "group": "Type: ModelObjects",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>The model id that contains the objects</p>"
          },
          {
            "group": "Type: ModelObjects",
            "type": "String[]",
            "optional": false,
            "field": "shared_ids",
            "description": "<p>The shared ids of objects to be selected</p>"
          }
        ],
        "Type: ClippingPlane": [
          {
            "group": "Type: ClippingPlane",
            "type": "Number[3]",
            "optional": false,
            "field": "normal",
            "description": "<p>The normal of the plane defined for the clipping plane</p>"
          },
          {
            "group": "Type: ClippingPlane",
            "type": "Number",
            "optional": false,
            "field": "distance",
            "description": "<p>The distance for the clipping plane to the origin</p>"
          },
          {
            "group": "Type: ClippingPlane",
            "type": "Number",
            "optional": false,
            "field": "clipDirection",
            "description": "<p>The direction to the clipping plane will cut the model; above or below the plane. Possible values: 1 , -1.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "PATCH /teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/issues/98c39770-c8e2-11e9-8f2a-ada77612c97e HTTP/1.1\n{\"status\":\"in progress\"}",
        "type": "patch"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "{\n   \"_id\": \"98c39770-c8e2-11e9-8f2a-ada77612c97e\",\n   \"name\": \"issue 2\",\n   \"assigned_roles\": [\n      \"jobC\"\n   ],\n   \"status\": \"in progress\",\n   \"priority\": \"none\",\n   \"topic_type\": \"for_information\",\n   \"owner\": \"teamSpace1\",\n   \"rev_id\": \"330f909b-9279-41aa-a87c-1c46f53a8e93\",\n   \"creator_role\": \"jobA\",\n   \"scale\": 1,\n   \"created\": 1566921116263,\n   \"desc\": \"(No Description)\",\n   \"number\": 2,\n   \"thumbnail\": \"teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/issues/98c39770-c8e2-11e9-8f2a-ada77612c97e/thumbnail.png\",\n   \"comments\": [\n      {\n         \"guid\": \"febbe083-5a98-4711-8d60-d2ac06721f83\",\n         \"created\": 1566924049774,\n         \"owner\": \"teamSpace1\",\n         \"action\": {\n            \"property\": \"assigned_roles\",\n            \"from\": \"\",\n            \"to\": \"jobB\"\n         },\n         \"sealed\": true\n      },\n      {\n         \"guid\": \"e8ba32b2-d58e-4c33-90f7-c6e0404ef1ee\",\n         \"created\": 1566924062287,\n         \"owner\": \"teamSpace1\",\n         \"action\": {\n            \"property\": \"assigned_roles\",\n            \"from\": \"jobB\",\n            \"to\": \"jobC\"\n         },\n         \"sealed\": true\n      },\n      {\n         \"guid\": \"83117273-2698-4d2d-bd47-7cd31e6a7b14\",\n         \"created\": 1566924080277,\n         \"owner\": \"teamSpace1\",\n         \"action\": {\n            \"property\": \"status\",\n            \"from\": \"open\",\n            \"to\": \"in progress\"\n         }\n      }\n   ],\n   \"status_last_changed\": 1566924080277,\n   \"account\": \"teamSpace1\",\n   \"model\": \"3549ddf6-885d-4977-87f1-eeac43a0e818\",\n   \"viewpoint\": {\n      \"right\": [\n         0.9953137040138245,\n         -4.656612873077393e-10,\n         0.09669896215200424\n      ],\n      \"up\": [\n         0.005437099374830723,\n         0.9984180331230164,\n         -0.05596357211470604\n      ],\n      \"position\": [\n         -3083.33251953125,\n         3886.8251953125,\n         8998.2783203125\n      ],\n      \"look_at\": [\n         -2445.680419921875,\n         3515.46533203125,\n         2434.984130859375\n      ],\n      \"view_dir\": [\n         0.0965459868311882,\n         -0.05622706934809685,\n         -0.9937390685081482\n      ],\n      \"near\": 20.835796356201172,\n      \"far\": 10417.8984375,\n      \"fov\": 1.0471975803375244,\n      \"aspect_ratio\": 3.1459293365478516,\n      \"clippingPlanes\": [],\n      \"highlighted_group_id\": \"98b9d370-c8e2-11e9-8f2a-ada77612c97e\",\n      \"hideIfc\": true,\n      \"screenshot\": \"teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/issues/98c39770-c8e2-11e9-8f2a-ada77612c97e/viewpoints/a1167d5f-2434-4a50-a158-d6a6745e7d6a/screenshot.png\",\n      \"guid\": \"a1167d5f-2434-4a50-a158-d6a6745e7d6a\",\n      \"screenshotSmall\": \"teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/issues/98c39770-c8e2-11e9-8f2a-ada77612c97e/viewpoints/a1167d5f-2434-4a50-a158-d6a6745e7d6a/screenshotSmall.png\"\n   },\n   \"position\": [],\n   \"extras\": {\n   }\n}",
          "type": "json"
        }
      ],
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "Updated",
            "description": "<p>Issue Object.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/issue.js",
    "groupTitle": "Issues"
  },
  {
    "type": "patch",
    "url": "/:teamspace/:model/revision/:revId/issues/:issueId",
    "title": "Update issue on revision",
    "name": "updateIssueRev",
    "group": "Issues",
    "description": "<p>Updates an issue for a particular revision. See <a href=\"#api-Issues-updateIssue\">here</a> for more details.</p>",
    "version": "0.0.0",
    "filename": "routes/issue.js",
    "groupTitle": "Issues",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "revId",
            "description": "<p>Revision ID</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/:teamspace/jobs/:jobId/:user",
    "title": "Assign a job",
    "name": "addUserToJob",
    "group": "Jobs",
    "description": "<p>Assign a job to a user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "jobId",
            "description": "<p>Job ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /acme/jobs/Job1/alice HTTP/1.1",
        "type": "post"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/job.js",
    "groupTitle": "Jobs"
  },
  {
    "type": "post",
    "url": "/:teamspace/jobs",
    "title": "Create a new job",
    "name": "createJob",
    "group": "Jobs",
    "description": "<p>Create a new job on teamspace.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Name of job</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>Colour of job</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Job object": [
          {
            "group": "Job object",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Name of job</p>"
          },
          {
            "group": "Job object",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>Colour of job</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t_id:\"Job4\",\n\tcolor:\"#ffff00\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /acme/jobs HTTP/1.1\n{\n\t_id:\"Job4\",\n\tcolor:\"#ffff00\"\n}",
        "type": "post"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/job.js",
    "groupTitle": "Jobs"
  },
  {
    "type": "delete",
    "url": "/:teamspace/jobs/:jobId",
    "title": "Delete a job",
    "name": "deleteJob",
    "group": "Jobs",
    "description": "<p>Delete a job from teamspace.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "jobId",
            "description": "<p>Job ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "DELETE /acme/jobs/Job 1 HTTP/1.1",
        "type": "delete"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/job.js",
    "groupTitle": "Jobs"
  },
  {
    "type": "get",
    "url": "/:teamspace/myJob",
    "title": "Get user job",
    "name": "getUserJob",
    "group": "Jobs",
    "description": "<p>Get job assigned to current user.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/myJob HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t_id\":\"Job1\",\n\t\"color\":\"ff00000\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/job.js",
    "groupTitle": "Jobs",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/jobs/colors",
    "title": "List colours",
    "name": "listColors",
    "group": "Jobs",
    "description": "<p>List job colours.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "colors",
            "description": "<p>List of job colours</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n[\n\t\"#ff0000\",\n\t\"#00ff00\",\n\t\"#0000ff\"\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/jobs/colors HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/job.js",
    "groupTitle": "Jobs",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/jobs",
    "title": "List all jobs",
    "name": "listJobs",
    "group": "Jobs",
    "description": "<p>List of all jobs defined in teamspace.</p>",
    "success": {
      "fields": {
        "Job object": [
          {
            "group": "Job object",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Name of job</p>"
          },
          {
            "group": "Job object",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>Colour of job</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n[\n\t{\n\t\t\"_id\":\"Job1\",\n\t\t\"color\":\"#ff0000\"\n\t},\n\t{\n\t\t\"_id\":\"Job2\",\n\t\t\"color\":\"#00ff00\"\n\t},\n\t{\n\t\t\"_id\":\"Job3\",\n\t\t\"color\":\"#0000ff\"\n\t}\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/jobs HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/job.js",
    "groupTitle": "Jobs",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/:teamspace/jobs/:jobId",
    "title": "Update job",
    "name": "updateJob",
    "group": "Jobs",
    "description": "<p>Update job.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "jobId",
            "description": "<p>Job ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Name of job</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>Colour of job</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "PUT /acme/jobs/Job1 HTTP/1.1\n{\n\t_id:\"Renamed Job\",\n\tcolor:\"#00ffff\"\n}",
        "type": "put"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/job.js",
    "groupTitle": "Jobs"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/maps/hereadminlabeloverlay/:zoomLevel/:gridx/:gridy.png?[query]",
    "title": "Here admin layer",
    "name": "getHereAdminOverlayTile",
    "group": "Maps",
    "description": "<p>Retrieve a Here Maps administrative labels overlay tile image.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/maps/hereadminlabeloverlay/17/65485/43574.png HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/maps.js",
    "groupTitle": "Maps",
    "groupDescription": "<p>Geographic information system (GIS) resources from Open Street Maps (OSM) and Here are supported. Please note that an app_id and app_code from Here are required to access Here resources.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zoomLevel",
            "description": "<p>Zoom level</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridx",
            "description": "<p>Longitudinal (X) grid reference</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridy",
            "description": "<p>Latitudinal (Y) grid reference</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "Boolean",
            "optional": true,
            "field": "congestion",
            "description": "<p>Flag that enables congestion and environmental zone display</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg",
            "description": "<p>MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg2",
            "description": "<p>Secondary MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pois",
            "description": "<p>Mask for Here Maps POIs categories</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": true,
            "field": "ppi",
            "description": "<p>Tile resolution in pixels per inch (72, 250, 320, 500)</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pview",
            "description": "<p>Render map boundaries based on internal or local views</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "style",
            "description": "<p>Select style used to render map tile</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "png",
            "optional": false,
            "field": "image",
            "description": "<p>Map tile image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<binary image>",
          "type": "png"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/maps/hereaerial/:zoomLevel/:gridx/:gridy.png?[query]",
    "title": "Here aerial tile",
    "name": "getHereAerialMapsTile",
    "group": "Maps",
    "description": "<p>Retrieve a Here Maps aerial map tile image.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/maps/hereaerial/17/65485/43574.png HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/maps.js",
    "groupTitle": "Maps",
    "groupDescription": "<p>Geographic information system (GIS) resources from Open Street Maps (OSM) and Here are supported. Please note that an app_id and app_code from Here are required to access Here resources.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zoomLevel",
            "description": "<p>Zoom level</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridx",
            "description": "<p>Longitudinal (X) grid reference</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridy",
            "description": "<p>Latitudinal (Y) grid reference</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "Boolean",
            "optional": true,
            "field": "congestion",
            "description": "<p>Flag that enables congestion and environmental zone display</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg",
            "description": "<p>MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg2",
            "description": "<p>Secondary MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pois",
            "description": "<p>Mask for Here Maps POIs categories</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": true,
            "field": "ppi",
            "description": "<p>Tile resolution in pixels per inch (72, 250, 320, 500)</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pview",
            "description": "<p>Render map boundaries based on internal or local views</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "style",
            "description": "<p>Select style used to render map tile</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "png",
            "optional": false,
            "field": "image",
            "description": "<p>Map tile image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<binary image>",
          "type": "png"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/maps/hereinfo",
    "title": "Here Maps options",
    "name": "getHereBaseInfo",
    "group": "Maps",
    "description": "<p>Get Here Maps service options.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/maps/ HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<response>\n\t<maps>\n\t\t<map region=\"all\" id=\"newest\" />\n\t</maps>\n\t<resolutions>\n\t\t<resolution id=\"512\" height=\"512\" width=\"512\" />\n\t</resolutions>\n\t<formats>\n\t\t<format encoding=\"png\" bbp=\"24\" id=\"png\" />\n\t</formats>\n\t<schemes>\n\t\t<scheme id=\"normal.day\" />\n\t\t<scheme id=\"normal.night\" />\n\t</schemes>\n\t<style id=\"alps\">\n\t\t<scheme id=\"normal.day\" />\n\t\t<scheme id=\"normal.night\" />\n\t</style>\n\t<style id=\"minis\">\n\t\t<scheme id=\"normal.day\" />\n\t\t<scheme id=\"carnav.day.grey\" />\n\t</style>\n\t<tiletypes>\n\t\t<tiletype id=\"maptile\" />\n\t\t<tiletype id=\"basetile\" />\n\t</tiletypes>\n\t<languages>\n\t\t<language id=\"ARA\" />\n\t\t<language id=\"CHI\" />\n\t\t<language id=\"ENG\" />\n\t\t<language id=\"GER\" />\n\t\t<language id=\"SPA\" />\n\t</languages>\n\t<zoomLevels min=\"0\" max=\"20\" />\n</response>",
          "type": "xml"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/maps.js",
    "groupTitle": "Maps",
    "groupDescription": "<p>Geographic information system (GIS) resources from Open Street Maps (OSM) and Here are supported. Please note that an app_id and app_code from Here are required to access Here resources.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/maps/herebuildings/:lat/:long/tile.json",
    "title": "Here building elevation",
    "name": "getHereBuildingsFromLongLat",
    "group": "Maps",
    "description": "<p>Retrieve building elevation information from Here Maps.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lat",
            "description": "<p>Latitude</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "long",
            "description": "<p>Longitude</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/maps/herebuildings/51.524575/-0.139088/tile.json HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"Rows\":[\n\t\t{\n\t\t\t\"BUILDING_ID\":\"700567270\",\n\t\t\t\"FACE_ID\":\"700567270\",\n\t\t\t\"FEATURE_TYPE\":\"2005700\",\n\t\t\t\"HEIGHT\":\"22\",\n\t\t\t\"GROUND_CLEARANCE\":null,\n\t\t\t\"CF_ID\":\"1400645341\",\n\t\t\t\"HAS_3DLM\":\"N\",\n\t\t\t\"NAME\":null,\n\t\t\t\"LAT\":\"5150745,9,-12,-4,10,-5,2\",\n\t\t\t\"LON\":\"-14284,18,14,-9,-12,-9,-2\",\n\t\t\t\"INNER_LAT\":null,\n\t\t\t\"INNER_LON\":null\n\t\t},\n\t\t{\n\t\t\t\"BUILDING_ID\":\"700567273\",\n\t\t\t\"FACE_ID\":\"700567273\",\n\t\t\t\"FEATURE_TYPE\":\"2005700\",\n\t\t\t\"HEIGHT\":\"11\",\n\t\t\t\"GROUND_CLEARANCE\":null,\n\t\t\t\"CF_ID\":\"1400645344\",\n\t\t\t\"HAS_3DLM\":\"N\",\n\t\t\t\"NAME\":null,\n\t\t\t\"LAT\":\"5150742,-12,-4,-4,11,5,4\",\n\t\t\t\"LON\":\"-14252,14,-9,-8,-14,8,9\",\n\t\t\t\"INNER_LAT\":null,\n\t\t\t\"INNER_LON\":null\n\t\t}\n\t]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/maps.js",
    "groupTitle": "Maps",
    "groupDescription": "<p>Geographic information system (GIS) resources from Open Street Maps (OSM) and Here are supported. Please note that an app_id and app_code from Here are required to access Here resources.</p>"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/maps/heregrey/:zoomLevel/:gridx/:gridy.png?[query]",
    "title": "Here grey tile",
    "name": "getHereGreyTile",
    "group": "Maps",
    "description": "<p>Retrieve a Here Maps grey map tile image.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/maps/heregrey/17/65485/43574.png HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/maps.js",
    "groupTitle": "Maps",
    "groupDescription": "<p>Geographic information system (GIS) resources from Open Street Maps (OSM) and Here are supported. Please note that an app_id and app_code from Here are required to access Here resources.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zoomLevel",
            "description": "<p>Zoom level</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridx",
            "description": "<p>Longitudinal (X) grid reference</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridy",
            "description": "<p>Latitudinal (Y) grid reference</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "Boolean",
            "optional": true,
            "field": "congestion",
            "description": "<p>Flag that enables congestion and environmental zone display</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg",
            "description": "<p>MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg2",
            "description": "<p>Secondary MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pois",
            "description": "<p>Mask for Here Maps POIs categories</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": true,
            "field": "ppi",
            "description": "<p>Tile resolution in pixels per inch (72, 250, 320, 500)</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pview",
            "description": "<p>Render map boundaries based on internal or local views</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "style",
            "description": "<p>Select style used to render map tile</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "png",
            "optional": false,
            "field": "image",
            "description": "<p>Map tile image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<binary image>",
          "type": "png"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/maps/heregreytransit/:zoomLevel/:gridx/:gridy.png?[query]",
    "title": "Here transit (grey) tile",
    "name": "getHereGreyTransitTile",
    "group": "Maps",
    "description": "<p>Retrieve a Here Maps grey transit map tile image.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/maps/heregreytransit/17/65485/43574.png HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/maps.js",
    "groupTitle": "Maps",
    "groupDescription": "<p>Geographic information system (GIS) resources from Open Street Maps (OSM) and Here are supported. Please note that an app_id and app_code from Here are required to access Here resources.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zoomLevel",
            "description": "<p>Zoom level</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridx",
            "description": "<p>Longitudinal (X) grid reference</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridy",
            "description": "<p>Latitudinal (Y) grid reference</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "Boolean",
            "optional": true,
            "field": "congestion",
            "description": "<p>Flag that enables congestion and environmental zone display</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg",
            "description": "<p>MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg2",
            "description": "<p>Secondary MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pois",
            "description": "<p>Mask for Here Maps POIs categories</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": true,
            "field": "ppi",
            "description": "<p>Tile resolution in pixels per inch (72, 250, 320, 500)</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pview",
            "description": "<p>Render map boundaries based on internal or local views</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "style",
            "description": "<p>Select style used to render map tile</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "png",
            "optional": false,
            "field": "image",
            "description": "<p>Map tile image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<binary image>",
          "type": "png"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/maps/herehybrid/:zoomLevel/:gridx/:gridy.png?[query]",
    "title": "Here hybrid tile",
    "name": "getHereHybridTile",
    "group": "Maps",
    "description": "<p>Retrieve a Here Maps hybrid map tile image.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/maps/herehybrid/17/65485/43574.png HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/maps.js",
    "groupTitle": "Maps",
    "groupDescription": "<p>Geographic information system (GIS) resources from Open Street Maps (OSM) and Here are supported. Please note that an app_id and app_code from Here are required to access Here resources.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zoomLevel",
            "description": "<p>Zoom level</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridx",
            "description": "<p>Longitudinal (X) grid reference</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridy",
            "description": "<p>Latitudinal (Y) grid reference</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "Boolean",
            "optional": true,
            "field": "congestion",
            "description": "<p>Flag that enables congestion and environmental zone display</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg",
            "description": "<p>MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg2",
            "description": "<p>Secondary MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pois",
            "description": "<p>Mask for Here Maps POIs categories</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": true,
            "field": "ppi",
            "description": "<p>Tile resolution in pixels per inch (72, 250, 320, 500)</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pview",
            "description": "<p>Render map boundaries based on internal or local views</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "style",
            "description": "<p>Select style used to render map tile</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "png",
            "optional": false,
            "field": "image",
            "description": "<p>Map tile image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<binary image>",
          "type": "png"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/maps/herelabeloverlay/:zoomLevel/:gridx/:gridy.png?[query]",
    "title": "Here label layer",
    "name": "getHereLabelOverlayTile",
    "group": "Maps",
    "description": "<p>Retrieve a Here Maps label overlay tile image.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/maps/herelabeloverlay/17/65485/43574.png HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/maps.js",
    "groupTitle": "Maps",
    "groupDescription": "<p>Geographic information system (GIS) resources from Open Street Maps (OSM) and Here are supported. Please note that an app_id and app_code from Here are required to access Here resources.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zoomLevel",
            "description": "<p>Zoom level</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridx",
            "description": "<p>Longitudinal (X) grid reference</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridy",
            "description": "<p>Latitudinal (Y) grid reference</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "Boolean",
            "optional": true,
            "field": "congestion",
            "description": "<p>Flag that enables congestion and environmental zone display</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg",
            "description": "<p>MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg2",
            "description": "<p>Secondary MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pois",
            "description": "<p>Mask for Here Maps POIs categories</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": true,
            "field": "ppi",
            "description": "<p>Tile resolution in pixels per inch (72, 250, 320, 500)</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pview",
            "description": "<p>Render map boundaries based on internal or local views</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "style",
            "description": "<p>Select style used to render map tile</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "png",
            "optional": false,
            "field": "image",
            "description": "<p>Map tile image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<binary image>",
          "type": "png"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/maps/herelinelabeloverlay/:zoomLevel/:gridx/:gridy.png?[query]",
    "title": "Here line & label layer",
    "name": "getHereLineLabelOverlayTile",
    "group": "Maps",
    "description": "<p>Retrieve a Here Maps line and label overlay tile image of street lines, city centre labels, and item labels.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/maps/herelinelabeloverlay/17/65485/43574.png HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/maps.js",
    "groupTitle": "Maps",
    "groupDescription": "<p>Geographic information system (GIS) resources from Open Street Maps (OSM) and Here are supported. Please note that an app_id and app_code from Here are required to access Here resources.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zoomLevel",
            "description": "<p>Zoom level</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridx",
            "description": "<p>Longitudinal (X) grid reference</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridy",
            "description": "<p>Latitudinal (Y) grid reference</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "Boolean",
            "optional": true,
            "field": "congestion",
            "description": "<p>Flag that enables congestion and environmental zone display</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg",
            "description": "<p>MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg2",
            "description": "<p>Secondary MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pois",
            "description": "<p>Mask for Here Maps POIs categories</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": true,
            "field": "ppi",
            "description": "<p>Tile resolution in pixels per inch (72, 250, 320, 500)</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pview",
            "description": "<p>Render map boundaries based on internal or local views</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "style",
            "description": "<p>Select style used to render map tile</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "png",
            "optional": false,
            "field": "image",
            "description": "<p>Map tile image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<binary image>",
          "type": "png"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/maps/here/:zoomLevel/:gridx/:gridy.png?[query]",
    "title": "Here map tile",
    "name": "getHereMapsTile",
    "group": "Maps",
    "description": "<p>Retrieve a Here Maps map tile image.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/maps/here/17/65485/43574.png HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/maps.js",
    "groupTitle": "Maps",
    "groupDescription": "<p>Geographic information system (GIS) resources from Open Street Maps (OSM) and Here are supported. Please note that an app_id and app_code from Here are required to access Here resources.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zoomLevel",
            "description": "<p>Zoom level</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridx",
            "description": "<p>Longitudinal (X) grid reference</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridy",
            "description": "<p>Latitudinal (Y) grid reference</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "Boolean",
            "optional": true,
            "field": "congestion",
            "description": "<p>Flag that enables congestion and environmental zone display</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg",
            "description": "<p>MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg2",
            "description": "<p>Secondary MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pois",
            "description": "<p>Mask for Here Maps POIs categories</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": true,
            "field": "ppi",
            "description": "<p>Tile resolution in pixels per inch (72, 250, 320, 500)</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pview",
            "description": "<p>Render map boundaries based on internal or local views</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "style",
            "description": "<p>Select style used to render map tile</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "png",
            "optional": false,
            "field": "image",
            "description": "<p>Map tile image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<binary image>",
          "type": "png"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/maps/herepoi/:zoomLevel/:gridx/:gridy.png?[query]",
    "title": "Here POI tile",
    "name": "getHerePOITile",
    "group": "Maps",
    "description": "<p>Retrieve a Here Maps point-of-interest (POI) map tile image.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/maps/herepoi/17/65485/43574.png HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/maps.js",
    "groupTitle": "Maps",
    "groupDescription": "<p>Geographic information system (GIS) resources from Open Street Maps (OSM) and Here are supported. Please note that an app_id and app_code from Here are required to access Here resources.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zoomLevel",
            "description": "<p>Zoom level</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridx",
            "description": "<p>Longitudinal (X) grid reference</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridy",
            "description": "<p>Latitudinal (Y) grid reference</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "Boolean",
            "optional": true,
            "field": "congestion",
            "description": "<p>Flag that enables congestion and environmental zone display</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg",
            "description": "<p>MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg2",
            "description": "<p>Secondary MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pois",
            "description": "<p>Mask for Here Maps POIs categories</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": true,
            "field": "ppi",
            "description": "<p>Tile resolution in pixels per inch (72, 250, 320, 500)</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pview",
            "description": "<p>Render map boundaries based on internal or local views</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "style",
            "description": "<p>Select style used to render map tile</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "png",
            "optional": false,
            "field": "image",
            "description": "<p>Map tile image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<binary image>",
          "type": "png"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/maps/hereterrain/:zoomLevel/:gridx/:gridy.png?[query]",
    "title": "Here terrain tile",
    "name": "getHereTerrainTile",
    "group": "Maps",
    "description": "<p>Retrieve a Here Maps terrain map tile image.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/maps/hereterrain/17/65485/43574.png HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/maps.js",
    "groupTitle": "Maps",
    "groupDescription": "<p>Geographic information system (GIS) resources from Open Street Maps (OSM) and Here are supported. Please note that an app_id and app_code from Here are required to access Here resources.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zoomLevel",
            "description": "<p>Zoom level</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridx",
            "description": "<p>Longitudinal (X) grid reference</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridy",
            "description": "<p>Latitudinal (Y) grid reference</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "Boolean",
            "optional": true,
            "field": "congestion",
            "description": "<p>Flag that enables congestion and environmental zone display</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg",
            "description": "<p>MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg2",
            "description": "<p>Secondary MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pois",
            "description": "<p>Mask for Here Maps POIs categories</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": true,
            "field": "ppi",
            "description": "<p>Tile resolution in pixels per inch (72, 250, 320, 500)</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pview",
            "description": "<p>Render map boundaries based on internal or local views</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "style",
            "description": "<p>Select style used to render map tile</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "png",
            "optional": false,
            "field": "image",
            "description": "<p>Map tile image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<binary image>",
          "type": "png"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/maps/heretollzone/:zoomLevel/:gridx/:gridy.png?[query]",
    "title": "Here toll zone tile",
    "name": "getHereTollZoneTile",
    "group": "Maps",
    "description": "<p>Retrieve a Here Maps toll zone map tile image.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/maps/heretollzone/17/65485/43574.png HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/maps.js",
    "groupTitle": "Maps",
    "groupDescription": "<p>Geographic information system (GIS) resources from Open Street Maps (OSM) and Here are supported. Please note that an app_id and app_code from Here are required to access Here resources.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zoomLevel",
            "description": "<p>Zoom level</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridx",
            "description": "<p>Longitudinal (X) grid reference</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridy",
            "description": "<p>Latitudinal (Y) grid reference</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "Boolean",
            "optional": true,
            "field": "congestion",
            "description": "<p>Flag that enables congestion and environmental zone display</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg",
            "description": "<p>MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg2",
            "description": "<p>Secondary MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pois",
            "description": "<p>Mask for Here Maps POIs categories</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": true,
            "field": "ppi",
            "description": "<p>Tile resolution in pixels per inch (72, 250, 320, 500)</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pview",
            "description": "<p>Render map boundaries based on internal or local views</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "style",
            "description": "<p>Select style used to render map tile</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "png",
            "optional": false,
            "field": "image",
            "description": "<p>Map tile image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<binary image>",
          "type": "png"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/maps/heretrafficflow/:zoomLevel/:gridx/:gridy.png?[query]",
    "title": "Here traffic layer",
    "name": "getHereTrafficFlowTile",
    "group": "Maps",
    "description": "<p>Retrieve a Here Maps traffic flow overlay tile image.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/maps/heretrafficflow/17/65485/43574.png HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/maps.js",
    "groupTitle": "Maps",
    "groupDescription": "<p>Geographic information system (GIS) resources from Open Street Maps (OSM) and Here are supported. Please note that an app_id and app_code from Here are required to access Here resources.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zoomLevel",
            "description": "<p>Zoom level</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridx",
            "description": "<p>Longitudinal (X) grid reference</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridy",
            "description": "<p>Latitudinal (Y) grid reference</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "Boolean",
            "optional": true,
            "field": "congestion",
            "description": "<p>Flag that enables congestion and environmental zone display</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg",
            "description": "<p>MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg2",
            "description": "<p>Secondary MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pois",
            "description": "<p>Mask for Here Maps POIs categories</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": true,
            "field": "ppi",
            "description": "<p>Tile resolution in pixels per inch (72, 250, 320, 500)</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pview",
            "description": "<p>Render map boundaries based on internal or local views</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "style",
            "description": "<p>Select style used to render map tile</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "min_traffic_congestion",
            "description": "<p>Specifies the minimum traffic congestion level to use for rendering traffic flow (free, heavy, queuing, blocked)</p>"
          },
          {
            "group": "Query",
            "type": "DateTime",
            "optional": true,
            "field": "time",
            "description": "<p>Date and time for showing historical traffic patterns</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "png",
            "optional": false,
            "field": "image",
            "description": "<p>Map tile image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<binary image>",
          "type": "png"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/maps/heretraffic/:zoomLevel/:gridx/:gridy.png?[query]",
    "title": "Here traffic tile",
    "name": "getHereTrafficTile",
    "group": "Maps",
    "description": "<p>Retrieve a Here Maps traffic map tile image.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/maps/heretraffic/17/65485/43574.png HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/maps.js",
    "groupTitle": "Maps",
    "groupDescription": "<p>Geographic information system (GIS) resources from Open Street Maps (OSM) and Here are supported. Please note that an app_id and app_code from Here are required to access Here resources.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zoomLevel",
            "description": "<p>Zoom level</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridx",
            "description": "<p>Longitudinal (X) grid reference</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridy",
            "description": "<p>Latitudinal (Y) grid reference</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "Boolean",
            "optional": true,
            "field": "congestion",
            "description": "<p>Flag that enables congestion and environmental zone display</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg",
            "description": "<p>MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg2",
            "description": "<p>Secondary MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pois",
            "description": "<p>Mask for Here Maps POIs categories</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": true,
            "field": "ppi",
            "description": "<p>Tile resolution in pixels per inch (72, 250, 320, 500)</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pview",
            "description": "<p>Render map boundaries based on internal or local views</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "style",
            "description": "<p>Select style used to render map tile</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "min_traffic_congestion",
            "description": "<p>Specifies the minimum traffic congestion level to use for rendering traffic flow (free, heavy, queuing, blocked)</p>"
          },
          {
            "group": "Query",
            "type": "DateTime",
            "optional": true,
            "field": "time",
            "description": "<p>Date and time for showing historical traffic patterns</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "png",
            "optional": false,
            "field": "image",
            "description": "<p>Map tile image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<binary image>",
          "type": "png"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/maps/heretruckoverlay/:zoomLevel/:gridx/:gridy.png?[query]",
    "title": "Here truck restrictions layer",
    "name": "getHereTruckRestrictionsOverlayTile",
    "group": "Maps",
    "description": "<p>Retrieve a Here Maps truck restrictions overlay tile image.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/maps/heretruckoverlay/17/65485/43574.png HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/maps.js",
    "groupTitle": "Maps",
    "groupDescription": "<p>Geographic information system (GIS) resources from Open Street Maps (OSM) and Here are supported. Please note that an app_id and app_code from Here are required to access Here resources.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zoomLevel",
            "description": "<p>Zoom level</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridx",
            "description": "<p>Longitudinal (X) grid reference</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridy",
            "description": "<p>Latitudinal (Y) grid reference</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "Boolean",
            "optional": true,
            "field": "congestion",
            "description": "<p>Flag that enables congestion and environmental zone display</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg",
            "description": "<p>MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg2",
            "description": "<p>Secondary MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pois",
            "description": "<p>Mask for Here Maps POIs categories</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": true,
            "field": "ppi",
            "description": "<p>Tile resolution in pixels per inch (72, 250, 320, 500)</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pview",
            "description": "<p>Render map boundaries based on internal or local views</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "style",
            "description": "<p>Select style used to render map tile</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "png",
            "optional": false,
            "field": "image",
            "description": "<p>Map tile image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<binary image>",
          "type": "png"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/maps/heretruck/:zoomLevel/:gridx/:gridy.png?[query]",
    "title": "Here truck restrictions tile",
    "name": "getHereTruckRestrictionsTile",
    "group": "Maps",
    "description": "<p>Retrieve a Here Maps truck restrictions map tile image.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/maps/heretruck/17/65485/43574.png HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/maps.js",
    "groupTitle": "Maps",
    "groupDescription": "<p>Geographic information system (GIS) resources from Open Street Maps (OSM) and Here are supported. Please note that an app_id and app_code from Here are required to access Here resources.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zoomLevel",
            "description": "<p>Zoom level</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridx",
            "description": "<p>Longitudinal (X) grid reference</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridy",
            "description": "<p>Latitudinal (Y) grid reference</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "Boolean",
            "optional": true,
            "field": "congestion",
            "description": "<p>Flag that enables congestion and environmental zone display</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg",
            "description": "<p>MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "lg2",
            "description": "<p>Secondary MARC three-letter language code for labels</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pois",
            "description": "<p>Mask for Here Maps POIs categories</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": true,
            "field": "ppi",
            "description": "<p>Tile resolution in pixels per inch (72, 250, 320, 500)</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "pview",
            "description": "<p>Render map boundaries based on internal or local views</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "style",
            "description": "<p>Select style used to render map tile</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "png",
            "optional": false,
            "field": "image",
            "description": "<p>Map tile image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<binary image>",
          "type": "png"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/maps/osm/:zoomLevel/:gridx/:gridy.png",
    "title": "OSM map tile",
    "name": "getOSMTile",
    "group": "Maps",
    "description": "<p>Retrieve an Open Street Map (OSM) map tile image.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/maps/osm/17/65485/43574.png HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/maps.js",
    "groupTitle": "Maps",
    "groupDescription": "<p>Geographic information system (GIS) resources from Open Street Maps (OSM) and Here are supported. Please note that an app_id and app_code from Here are required to access Here resources.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zoomLevel",
            "description": "<p>Zoom level</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridx",
            "description": "<p>Longitudinal (X) grid reference</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gridy",
            "description": "<p>Latitudinal (Y) grid reference</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "png",
            "optional": false,
            "field": "image",
            "description": "<p>Map tile image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<binary image>",
          "type": "png"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/maps",
    "title": "List maps",
    "name": "listMaps",
    "group": "Maps",
    "description": "<p>List the available geographic information system (GIS) sources and map layers.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "maps",
            "description": "<p>List of available map objects</p>"
          }
        ],
        "Map object": [
          {
            "group": "Map object",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of map provider</p>"
          },
          {
            "group": "Map object",
            "type": "Object[]",
            "optional": false,
            "field": "layers",
            "description": "<p>List of available map layer objects</p>"
          }
        ],
        "Layer object": [
          {
            "group": "Layer object",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of map layer</p>"
          },
          {
            "group": "Layer object",
            "type": "String",
            "optional": false,
            "field": "source",
            "description": "<p>Map source identifier</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"maps\":[\n\t\t{\n\t\t\t\"name\":\"Open Street Map\",\n\t\t\t\"layers\":[\n\t\t\t\t{\n\t\t\t\t\t\"name\":\"Map Tiles\",\n\t\t\t\t\t\"source\":\"OSM\"\n\t\t\t\t}\n\t\t\t]\n\t\t},\n\t\t{\n\t\t\t\"name\":\"Here\",\n\t\t\t\"layers\":[\n\t\t\t\t{\n\t\t\t\t\t\"name\":\"Map Tiles\",\n\t\t\t\t\t\"source\":\"HERE\"\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"name\":\"Traffic Flow\",\n\t\t\t\t\t\"source\":\"HERE_TRAFFIC_FLOW\"\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"name\":\"Truck Restrictions\",\n\t\t\t\t\t\"source\":\"HERE_TRUCK_OVERLAY\"\n\t\t\t\t}\n\t\t\t]\n\t\t}\n\t]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/maps HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/maps.js",
    "groupTitle": "Maps",
    "groupDescription": "<p>Geographic information system (GIS) resources from Open Street Maps (OSM) and Here are supported. Please note that an app_id and app_code from Here are required to access Here resources.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/master/head/meta/4DTaskSequence.json",
    "title": "Get All meta data for 4D Sequence Tags",
    "name": "getAllIdsWith4DSequenceTag",
    "group": "Meta",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/meta.js",
    "groupTitle": "Meta"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/:rev/meta/4DTaskSequence.json",
    "title": "Get All meta data with 4D Sequence Tags by revision",
    "name": "getAllIdsWith4DSequenceTagRev",
    "group": "Meta",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rev",
            "description": "<p>Revision</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/meta.js",
    "groupTitle": "Meta"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/master/head/meta/all.json",
    "title": "Get all meta data",
    "name": "getAllMetadata",
    "group": "Meta",
    "description": "<p>Get all objects in the tree with their metadata.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/revision/master/head/meta/all.json HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "{\n   \"data\": [\n      {\n         \"_id\": \"2f461edf-4544-412a-bb84-ffdb3bbe563b\",\n         \"metadata\": {\n            \"IFC Type\": \"IfcBuilding\",\n            \"IFC GUID\": \"00tMo7QcxqWdIGvc4sMN2A\",\n            \"BuildingID\": \"n/a\",\n            \"IsPermanentID\": \"True\",\n            \"OccupancyType\": \"Private dwelling\",\n            \"IsLandmarked\": \"True\",\n            \"NumberOfStoreys\": 2\n         },\n         \"parents\": [\n            \"9eeddbe2-750d-46fb-988f-bcf9ec2ecf51\"\n         ]\n      },\n      {\n         \"_id\": \"85ad29bd-cd99-4472-a92f-86266b07e57d\",\n         \"metadata\": {\n            \"IFC Type\": \"IfcSite\",\n            \"IFC GUID\": \"20FpTZCqJy2vhVJYtjuIce\"\n         },\n         \"parents\": [\n            \"48359ad0-9b6d-44ed-ae93-47e2ec69ea88\"\n         ]\n      },\n      {\n         \"_id\": \"b5fe5dcf-ce8c-4b1e-a96b-bdc5aa001963\",\n         \"metadata\": {\n            \"IFC Type\": \"IfcBuildingElementProxy\",\n            \"IFC GUID\": \"3VkTAO0fr0XQHS3DxQzfxm\",\n            \"Reference\": \"LegoRoundTree\"\n         },\n         \"parents\": [\n            \"2bf2a864-5cb0-41ba-85a8-c2cffc3da06d\"\n         ]\n      },\n      {\n         \"_id\": \"c4682cf2-7b2a-41c7-8fe2-c0c39512dd99\",\n         \"metadata\": {\n            \"IFC Type\": \"IfcBuildingStorey\",\n            \"IFC GUID\": \"1oZ0wPs_PE8ANCPg3bIs4j\",\n            \"AboveGround\": \"False\"\n         },\n         \"parents\": [\n            \"323a9900-ece1-4857-8980-ec96ffc7f681\"\n         ]\n      }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/meta.js",
    "groupTitle": "Meta"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/:rev/meta/all.json",
    "title": "Get all meta data by revision",
    "name": "getAllMetadataByRev",
    "group": "Meta",
    "description": "<p>Get all tree objects with their metadata tags by revision. See more details <a href='#api-Meta-getAllMetadata'>here</a>.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rev",
            "description": "<p>Revision to get meta data from</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/meta.js",
    "groupTitle": "Meta"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/master/head/meta/findObjsWith/:metaKey.json",
    "title": "Get ids by metadata",
    "name": "getIdsWithMetadataField",
    "group": "Meta",
    "description": "<p>Get ids of tree objects which has a particular metadata key (in the latest revision). It also returns the metadata value for that key.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "metaKey",
            "description": "<p>Unique metadata key</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/revision/master/head/meta/findObjsWith/IsLandmarked.json HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "{\n   \"data\": [\n      {\n         \"_id\": \"2f461edf-4544-412a-bb84-ffdb3bbe563b\",\n         \"metadata\": {\n            \"value\": \"True\"\n         },\n         \"parents\": [\n            \"9eeddbe2-750d-46fb-988f-bcf9ec2ecf51\"\n         ]\n      }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/meta.js",
    "groupTitle": "Meta"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/:rev/meta/findObjsWith/:metaKey.json",
    "title": "Get ids by metadata",
    "name": "getIdsWithMetadataFieldByRev",
    "group": "Meta",
    "description": "<p>Get ids of tree objects which has a particular metadata key from a particular revision. See more details <a href='#api-Meta-getIdsWithMetadataField'>here</a>.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rev",
            "description": "<p>Revision to get meta data from</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "metaKey",
            "description": "<p>Unique meta key</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/meta.js",
    "groupTitle": "Meta"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/meta/:id.json",
    "title": "Get meta data",
    "name": "getMetadata",
    "group": "Meta",
    "description": "<p>Get all metadata tags by revision. See more details <a href='#api-Meta-getAllMetadata'>here</a>.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Meta Unique ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/meta/b5fe5dcf-ce8c-4b1e-a96b-bdc5aa001963.json HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "{\n   \"meta\": [\n      {\n         \"_id\": \"b5fe5dcf-ce8c-4b1e-a96b-bdc5aa001963\",\n         \"name\": \"LegoRoundTree:LegoRoundTree:302403\",\n         \"metadata\": {\n            \"IFC Type\": \"IfcBuildingElementProxy\",\n            \"IFC GUID\": \"3VkTAO0fr0XQHS3DxQzfxm\",\n            \"Reference\": \"LegoRoundTree\"\n         }\n      }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/meta.js",
    "groupTitle": "Meta"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/meta/keys",
    "title": "Get array of metadata fields",
    "name": "getMetadataFields",
    "group": "Meta",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/meta/keys HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "[\n   \"AboveGround\",\n   \"BuildingID\",\n   \"IFC GUID\",\n   \"IFC Type\",\n   \"IsLandmarked\",\n   \"IsPermanentID\",\n   \"NumberOfStoreys\",\n   \"OccupancyType\",\n   \"Reference\"\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/meta.js",
    "groupTitle": "Meta"
  },
  {
    "type": "post",
    "url": "/:teamspace/model",
    "title": "Create a model",
    "name": "createModel",
    "group": "Model",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "project",
            "description": "<p>Name of project in which the model will be created</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "modelName",
            "description": "<p>Name of the model to be created</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "unit",
            "description": "<p>The unit in which the model is specified</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "desc",
            "description": "<p>A description of the model</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "code",
            "description": "<p>A code to be associated with the model; it can be of maximum 5 letters (a-z) and numbers</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>The type of the model</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /teamSpace1/model HTTP/1.1\n{\n   project: \"classic project\",\n   modelName: \"awesomeModel\",\n   unit: \"ft\",\n   desc: \"This is an awesome model!\",\n   code: \"awe12\",\n   type: \"Mechanical\"\n}",
        "type": "post"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "{\n   account: \"teamSpace1\",\n   model: \"17d09947-368e-4748-877f-d105842c6681\",\n   name: \"awesomeModel\",\n   permissions: [\n      \"change_model_settings\",\n      \"upload_files\",\n      \"create_issue\",\n      \"comment_issue\",\n      \"view_issue\",\n      \"view_model\",\n      \"download_model\",\n      \"edit_federation\",\n      \"delete_federation\",\n      \"delete_model\",\n      \"manage_model_permission\"\n   ],\n   setting: {\n      type: \"Mechanical\",\n      desc: \"\",\n      name: \"awesomeModel\",\n      _id: \"17d09947-368e-4748-877f-d105842c6681\",\n      subModels: [],\n      surveyPoints: [],\n      properties: {\n         unit: \"ft\"\n      },\n      permissions: [],\n      status: \"ok\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "delete",
    "url": "/:teamspace/:model",
    "title": "Delete Model.",
    "name": "deleteModel",
    "group": "Model",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model to delete.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "DELETE /teamSpace1/17d09947-368e-4748-877f-d105842c6681 HTTP/1.1",
        "type": "delete"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "{\n   \"account\": \"teamSpace1\",\n   \"model\": \"17d09947-368e-4748-877f-d105842c6681\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/download/latest",
    "title": "Download model",
    "name": "downloadModel",
    "group": "Model",
    "description": "<p>It returns the model file using the latest revision.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model to download.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/b1fceab8-b0e9-4e45-850b-b9888efd6521/download/latest HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success (with headers):",
          "content": "\nHTTP/1.1 200 OK\nX-Powered-By: Express\nVary: Origin\nAccess-Control-Allow-Credentials: true\nContent-Length: 11964\nContent-Disposition: attachment;filename=3DrepoBIM_blocks.obj\nset-cookie: connect.sid=s%3Ax4mDfLE-NqmPUO5tSSxPAyMjgov6YRge.bVSUoML3obJNp1XuObpbtXY44RjgEhJtsTz%2FwhwIckE; Domain=local.3drepo.io; Path=/; Expires=Tue, 27 Aug 2019 12:18:34 GMT; HttpOnly\nDate: Tue, 27 Aug 2019 11:18:34 GMT\nConnection: keep-alive\n\n/***** FILE CONTENTS ******\\",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/settings/heliSpeed",
    "title": "Get model heli speed",
    "name": "getHeliSpeed",
    "group": "Model",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>The modelId to get Heli speed for.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/settings/heliSpeed HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "{\"heliSpeed\":1}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/master/head/idMap.json",
    "title": "Get ID map",
    "name": "getIdMap",
    "group": "Model",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model id to Get ID Map for.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage (federation):",
        "content": "GET /teamSpace1/5ce7dd19-1252-4548-a9c9-4a5414f2e0c5/revision/master/head/idMap.json HTTP/1.1",
        "type": "get"
      },
      {
        "title": "Example usage (model):",
        "content": "GET /teamSpace1/b1fceab8-b0e9-4e45-850b-b9888efd6521/revision/master/head/idMap.json HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success (federation):",
          "content": "{\n   mainTree: {\n      idMap: {\n         261bf9df-64d7-4642-8bb2-0a79abd370ec: \"d86573c9-beec-4f06-b194-18b6983a3d71\",\n         528c62e6-5cf8-4868-b5ff-733c128b4b4e: \"6047f788-8317-45ff-b692-29e03071ec63\",\n         7d5ce878-6ec9-4c11-a96d-12b68c9e9c7c: \"7d9eefe0-2b8a-4de3-9acb-c216c9b48c9f\",\n         95744e20-4b4d-4fc1-8ba7-1f31ebf772b6: \"d2c0e845-b392-429e-86bd-6c7453b78654\",\n         71634e9c-da2c-4ea7-bd04-44971d3fd8dc: \"6e40ecbc-bb2f-4504-8f00-80b12fb04443\",\n         a70dd58c-c09e-4ed4-ac7e-914dbd145302: \"f1a14ded-6528-4937-b31d-ce4b3ca813d8\",\n         d68cf5e7-4d0f-4702-8a92-c81b72928c54: \"d012d6ba-01d2-4460-921e-72539a1ac197\"\n      }\n   },\n   subModels: [\n      {\n         account: \"teamSpace1\",\n         model: \"b1fceab8-b0e9-4e45-850b-b9888efd6521\",\n         idMap: {\n            a82a3b7f-bcd9-4487-8f94-370fa1f2ea4e: \"57b0969f-6009-4e32-9153-2b17d3a3628b\",\n            33c36fee-622d-46a5-8be1-a1bd295aa7d1: \"1e47d53e-cad8-489b-89ea-7c6c7b8d0e6c\"\n         }\n      },\n      {\n         account: \"teamSpace1\",\n         model: \"7cf61b4f-acdf-4295-b2d0-9b45f9f27418\",\n         idMap: {\n            8a1f9cad-18d8-47ce-9cbd-08ba53858ced: \"60286d41-d897-4de6-a0ed-0929fa68be96\",\n            ea37c2ed-39d4-4236-843c-332d52876c96: \"9c4be293-0d8f-4e37-b115-d2c752824bfe\"\n         }\n      },\n      {\n         account: \"teamSpace1\",\n         model: \"2710bd65-37d3-4e7f-b2e0-ffe743ce943f\",\n         idMap: {\n            8ef1c52e-8838-46dc-9825-efe46aa10041: \"a4a14ee6-aa44-4f36-96bd-f80dbabf8ead\",\n            ecc25d63-87e0-4600-ae60-f38f766bc9e4: \"ffd49cfd-57fb-4c31-84f7-02b41352b54f\",\n            3abc5450-5db8-459b-80ea-cb9fca9ccedd: \"a6947de3-25f4-4c2c-a150-22f0ed9ce4dd\"\n         }\n      }\n   ]\n}",
          "type": "json"
        },
        {
          "title": "Success (model):",
          "content": "{\n   mainTree: {\n      idMap: {\n         a82a3b7f-bcd9-4487-8f94-370fa1f2ea4e: \"57b0969f-6009-4e32-9153-2b17d3a3628b\",\n         33c36fee-622d-46a5-8be1-a1bd295aa7d1: \"1e47d53e-cad8-489b-89ea-7c6c7b8d0e6c\"\n      }\n   },\n   subModels: []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/master/head/idToMeshes.json",
    "title": "Get ID to meshes",
    "name": "getIdToMeshes",
    "group": "Model",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model to get ID Meshes for.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/b1fceab8-b0e9-4e45-850b-b9888efd6521/revision/master/head/idToMeshes.json HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "{\n   mainTree: {\n      a82a3b7f-bcd9-4487-8f94-370fa1f2ea4e: [\n         \"a82a3b7f-bcd9-4487-8f94-370fa1f2ea4e\"\n      ],\n      33c36fee-622d-46a5-8be1-a1bd295aa7d1: [\n         \"a82a3b7f-bcd9-4487-8f94-370fa1f2ea4e\"\n      ]\n   },\n   subModels: []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/:uid.json.mpc",
    "title": "Get JSON Mpc",
    "name": "getJsonMpc",
    "group": "Model",
    "description": "<p>Get the unity bundle mpc json file. The path for this api is provided in the data retrieved by either one of the endpoints /:teamspace/:model/revision/master/head/unityAssets.json or /:teamspace/:model/revision/:rev/unityAssets.json</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>id of the model to get JSON Mpc for.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uid",
            "description": "<p>id of the json.mpc file</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/92fc213b-1bab-49a4-b10e-f4368a52d500_unity.json.mpc HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "{\n   numberOfIDs: 1,\n   maxGeoCount: 1,\n   mapping: [\n      {\n         name: \"ce413e99-8469-4ed0-86e3-ff50bf4fed89\",\n         sharedID: \"a876e59a-8cda-4d61-b438-c74ce7b8855d\",\n         min: [\n            -3515.19556,\n            -5790.91504,\n            0\n         ],\n         max: [\n            0,\n            0,\n            3502.927\n         ],\n         usage: [\n            \"92fc213b-1bab-49a4-b10e-f4368a52d500_0\"\n         ]\n      }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/master/head/modelProperties.json",
    "title": "Get model properties",
    "name": "getModelProperties",
    "group": "Model",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model to get properties for.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/b1fceab8-b0e9-4e45-850b-b9888efd6521/revision/master/head/modelProperties.json HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "{\n   properties: {\n      hiddenNodes: []\n   },\n   subModels: []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model.json",
    "title": "Get model settings",
    "name": "getModelSetting",
    "group": "Model",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "model",
            "description": "<p>The modelId to get settings for.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818.json HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "{\n   _id: \"3549ddf6-885d-4977-87f1-eeac43a0e818\",\n   timestamp: \"2019-05-13T16:54:44.000Z\",\n   type: \"Structural\",\n   desc: \"\",\n   name: \"Lego Tree\",\n   subModels: [],\n   surveyPoints: [],\n   properties: {\n      unit: \"mm\"\n   },\n   permissions: [\n      \"change_model_settings\",\n      \"upload_files\",\n      \"create_issue\",\n      \"comment_issue\",\n      \"view_issue\",\n      \"view_model\",\n      \"download_model\",\n      \"edit_federation\",\n      \"delete_federation\",\n      \"delete_model\",\n      \"manage_model_permission\"\n   ],\n   status: \"ok\",\n   id: \"3549ddf6-885d-4977-87f1-eeac43a0e818\",\n   model: \"3549ddf6-885d-4977-87f1-eeac43a0e818\",\n   account: \"teamSpace1\",\n   headRevisions: {\n   }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/master/head/fulltree.json",
    "title": "Get tree",
    "name": "getModelTree",
    "group": "Model",
    "description": "<p>Returns the full tree for the model</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/revision/master/head/fulltree.json HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "{\n   mainTree: {\n      nodes: {\n         account: \"teamSpace1\",\n         project: \"3549ddf6-885d-4977-87f1-eeac43a0e818\",\n         type: \"transformation\",\n         name: \"RootNode\",\n         path: \"73a41cea-4c6b-47ed-936b-3f5641aecb52\",\n         _id: \"73a41cea-4c6b-47ed-936b-3f5641aecb52\",\n         shared_id: \"4dd46b6f-099e-42cd-b045-6460200e7995\",\n         children: [\n            {\n               account: \"teamSpace1\",\n               project: \"3549ddf6-885d-4977-87f1-eeac43a0e818\",\n               type: \"transformation\",\n               name: \"Fouliiferous Tree H64_2\",\n               path: \"73a41cea-4c6b-47ed-936b-3f5641aecb52__33fe7c13-17a4-43d6-af03-ceae6880322f\",\n               _id: \"33fe7c13-17a4-43d6-af03-ceae6880322f\",\n               shared_id: \"b69a8384-c29d-4954-9efa-4c7bc14f1d3d\",\n               children: [\n                  {\n                     account: \"teamSpace1\",\n                     project: \"3549ddf6-885d-4977-87f1-eeac43a0e818\",\n                     type: \"mesh\",\n                     name: \"Fouliiferous Tree H64\",\n                     path: \"73a41cea-4c6b-47ed-936b-3f5641aecb52__33fe7c13-17a4-43d6-af03-ceae6880322f__ce413e99-8469-4ed0-86e3-ff50bf4fed89\",\n                     _id: \"ce413e99-8469-4ed0-86e3-ff50bf4fed89\",\n                     shared_id: \"a876e59a-8cda-4d61-b438-c74ce7b8855d\",\n                     toggleState: \"visible\"\n                  }\n               ],\n               toggleState: \"visible\"\n            }\n         ],\n         toggleState: \"visible\"\n      },\n      idToName: {\n         ce413e99-8469-4ed0-86e3-ff50bf4fed89: \"Fouliiferous Tree H64\",\n         33fe7c13-17a4-43d6-af03-ceae6880322f: \"Fouliiferous Tree H64_2\",\n         73a41cea-4c6b-47ed-936b-3f5641aecb52: \"RootNode\"\n      }\n   },\n   subTrees: []\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model to use.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "get",
    "url": "/:teamspace/model/permissions?models=[MODELS]",
    "title": "Get multiple models permissions",
    "name": "getMultipleModelsPermissions",
    "group": "Model",
    "description": "<p>Gets the permissions of a list of models</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace.</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "String[]",
            "optional": false,
            "field": "MODELS",
            "description": "<p>An array of model ids.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/models/permissions?models=5ce7dd19-1252-4548-a9c9-4a5414f2e0c5,3549ddf6-885d-4977-87f1-eeac43a0e818 HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "[\n   {\n      model: \"3549ddf6-885d-4977-87f1-eeac43a0e818\",\n      name: \"Lego Tree\",\n      permissions: [\n         {\n            user: \"collaboratorTeamspace1Model1JobA\",\n            permission: \"collaborator\"\n         },\n         {\n            user: \"commenterTeamspace1Model1JobA\",\n            permission: \"commenter\"\n         },\n         {\n            user: \"projectshared\"\n         },\n         {\n            user: \"fed\"\n         },\n         {\n            user: \"teamSpace1\"\n         },\n         {\n            user: \"unassignedTeamspace1UserJobA\"\n         },\n         {\n            user: \"viewerTeamspace1Model1JobA\"\n         },\n         {\n            user: \"viewerTeamspace1Model1JobB\"\n         },\n         {\n            user: \"commenterTeamspace1Model1JobB\"\n         },\n         {\n            user: \"collaboratorTeamspace1Model1JobB\"\n         },\n         {\n            user: \"adminTeamspace1JobA\"\n         },\n         {\n            user: \"adminTeamspace1JobB\"\n         },\n         {\n            user: \"weirdTeamspace\"\n         }\n      ],\n      subModels: []\n   },\n   {\n      model: \"5ce7dd19-1252-4548-a9c9-4a5414f2e0c5\",\n      federate: {\n      },\n      name: \"Full Logo \",\n      permissions: [\n         {\n            user: \"viewerTeamspace1Model1JobA\",\n            permission: \"viewer\"\n         },\n         {\n            user: \"commenterTeamspace1Model1JobA\",\n            permission: \"viewer\"\n         },\n         {\n            user: \"collaboratorTeamspace1Model1JobA\",\n            permission: \"commenter\"\n         },\n         {\n            user: \"commenterTeamspace1Model1JobB\",\n            permission: \"commenter\"\n         },\n         {\n            user: \"collaboratorTeamspace1Model1JobB\",\n            permission: \"collaborator\"\n         },\n         {\n            user: \"projectshared\",\n            permission: \"collaborator\"\n         },\n         {\n            user: \"fed\"\n         },\n         {\n            user: \"teamSpace1\"\n         },\n         {\n            user: \"unassignedTeamspace1UserJobA\"\n         },\n         {\n            user: \"viewerTeamspace1Model1JobB\"\n         },\n         {\n            user: \"adminTeamspace1JobA\"\n         },\n         {\n            user: \"adminTeamspace1JobB\"\n         },\n         {\n            user: \"weirdTeamspace\"\n         }\n      ],\n      subModels: [\n         {\n            database: \"teamSpace1\",\n            model: \"7cf61b4f-acdf-4295-b2d0-9b45f9f27418\"\n         },\n         {\n            database: \"teamSpace1\",\n            model: \"b1fceab8-b0e9-4e45-850b-b9888efd6521\"\n         }\n      ]\n   }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/:rev/idMap.json",
    "title": "Get tree path by revision",
    "name": "getRevIdMap",
    "group": "Model",
    "description": "<p>Get tree path by revision. See more details <a href='#api-Model-getTreePath'>here</a>.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model to ID map for.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rev",
            "description": "<p>Revision to use.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/:rev/idToMeshes.json",
    "title": "Get ID Meshes by revision",
    "name": "getRevIdToMeshes",
    "group": "Model",
    "description": "<p>Get ID Meshes by revision. See more details <a href='#api-Model-getTreePath'>here</a>.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model to use.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rev",
            "description": "<p>Revision to use.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/:rev/modelProperties.json",
    "title": "Get model properties by revision",
    "name": "getRevModelProperties",
    "group": "Model",
    "description": "<p>Get model properties by revision. See more details <a href='#api-Model-getModelProperties'>here</a>.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model to use.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rev",
            "description": "<p>Revision to use.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/:rev/fulltree.json",
    "title": "Get tree by revision",
    "name": "getRevModelTree",
    "group": "Model",
    "description": "<p>Get full tree by revision. See more details <a href='#api-Model-getModelTree'>here</a>.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model to get Tree for.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rev",
            "description": "<p>Revision to use.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/:rev/unityAssets.json",
    "title": "Get revision's unity assets",
    "name": "getRevUnityAssets",
    "group": "Model",
    "description": "<p>Get the model's assets but of a particular revision</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>The model Id to get unity assets for.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rev",
            "description": "<p>The revision of the model to get unity assets for</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/revision/master/head/unityAssets.json HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "{\n   models: [\n      {\n         _id: \"Mw+Qm5J5QaqofBxG9TqOkw==\",\n         assets: [\n            \"/teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/92fc213b-1bab-49a4-b10e-f4368a52d500.unity3d\"\n         ],\n         database: \"teamSpace1\",\n         model: \"3549ddf6-885d-4977-87f1-eeac43a0e818\",\n         offset: [\n            -688.095458984375,\n            6410.9140625,\n            683.460205078125\n         ],\n         jsonFiles: [\n            \"/teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/92fc213b-1bab-49a4-b10e-f4368a52d500_unity.json.mpc\"\n         ]\n      }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/permissions",
    "title": "Get model permissions",
    "name": "getSingleModelPermissions",
    "group": "Model",
    "description": "<p>Gets the permissions of a model</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model to get Permission for.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/permissions HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "[\n   {\n      user: \"viewerTeamspace1Model1JobA\",\n      permission: \"viewer\"\n   },\n   {\n      user: \"commenterTeamspace1Model1JobA\",\n      permission: \"viewer\"\n   },\n   {\n      user: \"collaboratorTeamspace1Model1JobA\",\n      permission: \"commenter\"\n   },\n   {\n      user: \"commenterTeamspace1Model1JobB\",\n      permission: \"commenter\"\n   },\n   {\n      user: \"collaboratorTeamspace1Model1JobB\",\n      permission: \"collaborator\"\n   },\n   {\n      user: \"projectshared\",\n      permission: \"collaborator\"\n   },\n   {\n      user: \"fed\"\n   },\n   {\n      user: \"teamSpace1\"\n   },\n   {\n      user: \"unassignedTeamspace1UserJobA\"\n   },\n   {\n      user: \"viewerTeamspace1Model1JobB\"\n   },\n   {\n      user: \"adminTeamspace1JobA\"\n   },\n   {\n      user: \"adminTeamspace1JobB\"\n   },\n   {\n      user: \"weirdTeamspace\"\n   }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/master/head/subModelRevisions",
    "title": "Get submodel revisions by rev",
    "name": "getSubModelRevisionsByRev",
    "group": "Model",
    "description": "<p>In a federation it returns the submodels revisions of a particular federation revision. See more details <a href='#api-Model-getSubRevisionModels'>here</a></p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model to get properties for.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rev",
            "description": "<p>Revision to use.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/master/head/subModelRevisions",
    "title": "Get submodels revisions",
    "name": "getSubRevisionModels",
    "group": "Model",
    "description": "<p>In a federation it returns the submodels revisions of the latest federation revision.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model to get properties for.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/5ce7dd19-1252-4548-a9c9-4a5414f2e0c5/revision/master/head/subModelRevisions HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "{\n   \"b1fceab8-b0e9-4e45-850b-b9888efd6521\": {\n      \"name\": \"block\",\n      \"revisions\": [\n         {\n            \"_id\": \"ddcc3213-af61-4d30-921f-e502d1c2199c\",\n            \"author\": \"teamSpace1\",\n            \"tag\": \"block\",\n            \"timestamp\": \"2019-05-02T16:16:49.000Z\",\n            \"name\": \"ddcc3213-af61-4d30-921f-e502d1c2199c\",\n            \"branch\": \"master\"\n         }\n      ]\n   },\n   \"7cf61b4f-acdf-4295-b2d0-9b45f9f27418\": {\n      \"name\": \"letters\",\n      \"revisions\": [\n         {\n            \"_id\": \"a1bcfa72-ff37-41ac-95ab-66e450a37896\",\n            \"author\": \"teamSpace1\",\n            \"tag\": \"letters\",\n            \"timestamp\": \"2019-05-02T16:16:32.000Z\",\n            \"name\": \"a1bcfa72-ff37-41ac-95ab-66e450a37896\",\n            \"branch\": \"master\"\n         }\n      ]\n   },\n   \"2710bd65-37d3-4e7f-b2e0-ffe743ce943f\": {\n      \"name\": \"pipes\",\n      \"revisions\": [\n         {\n            \"_id\": \"9ee1190b-cd25-4467-8d38-5af7c77cab5a\",\n            \"author\": \"teamSpace1\",\n            \"tag\": \"pipes\",\n            \"timestamp\": \"2019-05-02T16:17:04.000Z\",\n            \"name\": \"9ee1190b-cd25-4467-8d38-5af7c77cab5a\",\n            \"branch\": \"master\"\n         }\n      ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/master/head/tree_path.json",
    "title": "Get tree paths",
    "name": "getTreePath",
    "group": "Model",
    "description": "<p>Returns the full tree path for the model and if the model is a federation of it submodels. These tree paths have the path to get to every object in the model.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model to get tree path for.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/5ce7dd19-1252-4548-a9c9-4a5414f2e0c5/revision/master/head/tree_path.json HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "{\n   mainTree: {\n      idToPath: {\n         d68cf5e7-4d0f-4702-8a92-c81b72928c54: \"d68cf5e7-4d0f-4702-8a92-c81b72928c54\",\n         261bf9df-64d7-4642-8bb2-0a79abd370ec: \"d68cf5e7-4d0f-4702-8a92-c81b72928c54__528c62e6-5cf8-4868-b5ff-733c128b4b4e__261bf9df-64d7-4642-8bb2-0a79abd370ec\",\n         528c62e6-5cf8-4868-b5ff-733c128b4b4e: \"d68cf5e7-4d0f-4702-8a92-c81b72928c54__528c62e6-5cf8-4868-b5ff-733c128b4b4e\",\n         7d5ce878-6ec9-4c11-a96d-12b68c9e9c7c: \"d68cf5e7-4d0f-4702-8a92-c81b72928c54__95744e20-4b4d-4fc1-8ba7-1f31ebf772b6__7d5ce878-6ec9-4c11-a96d-12b68c9e9c7c\",\n         71634e9c-da2c-4ea7-bd04-44971d3fd8dc: \"d68cf5e7-4d0f-4702-8a92-c81b72928c54__a70dd58c-c09e-4ed4-ac7e-914dbd145302__71634e9c-da2c-4ea7-bd04-44971d3fd8dc\",\n         95744e20-4b4d-4fc1-8ba7-1f31ebf772b6: \"d68cf5e7-4d0f-4702-8a92-c81b72928c54__95744e20-4b4d-4fc1-8ba7-1f31ebf772b6\",\n         a70dd58c-c09e-4ed4-ac7e-914dbd145302: \"d68cf5e7-4d0f-4702-8a92-c81b72928c54__a70dd58c-c09e-4ed4-ac7e-914dbd145302\"\n      }\n   },\n   subModels: [\n      {\n         account: \"teamSpace1\",\n         model: \"b1fceab8-b0e9-4e45-850b-b9888efd6521\",\n         idToPath: {\n            a82a3b7f-bcd9-4487-8f94-370fa1f2ea4e: \"33c36fee-622d-46a5-8be1-a1bd295aa7d1__a82a3b7f-bcd9-4487-8f94-370fa1f2ea4e\",\n            33c36fee-622d-46a5-8be1-a1bd295aa7d1: \"33c36fee-622d-46a5-8be1-a1bd295aa7d1\"\n         }\n      },\n      {\n         account: \"teamSpace1\",\n         model: \"7cf61b4f-acdf-4295-b2d0-9b45f9f27418\",\n         idToPath: {\n            8a1f9cad-18d8-47ce-9cbd-08ba53858ced: \"ea37c2ed-39d4-4236-843c-332d52876c96__8a1f9cad-18d8-47ce-9cbd-08ba53858ced\",\n            ea37c2ed-39d4-4236-843c-332d52876c96: \"ea37c2ed-39d4-4236-843c-332d52876c96\"\n         }\n      },\n      {\n         account: \"teamSpace1\",\n         model: \"2710bd65-37d3-4e7f-b2e0-ffe743ce943f\",\n         idToPath: {\n            8ef1c52e-8838-46dc-9825-efe46aa10041: \"3abc5450-5db8-459b-80ea-cb9fca9ccedd__8ef1c52e-8838-46dc-9825-efe46aa10041\",\n            ecc25d63-87e0-4600-ae60-f38f766bc9e4: \"3abc5450-5db8-459b-80ea-cb9fca9ccedd__ecc25d63-87e0-4600-ae60-f38f766bc9e4\",\n            3abc5450-5db8-459b-80ea-cb9fca9ccedd: \"3abc5450-5db8-459b-80ea-cb9fca9ccedd\"\n         }\n      }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/:rev/tree_path.json",
    "title": "Get tree path by revision",
    "name": "getTreePathByRevision",
    "group": "Model",
    "description": "<p>Get tree path by revision. See more details <a href='#api-Model-getTreePath'>here</a>.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model to get tree path for.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rev",
            "description": "<p>Revision to use.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/master/head/unityAssets.json",
    "title": "Get unity assets",
    "name": "getUnityAssets",
    "group": "Model",
    "description": "<p>Get the lastest model's version unity assets</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>The model Id to get unity assets for.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/revision/master/head/unityAssets.json HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "{\n   models: [\n      {\n         _id: \"Mw+Qm5J5QaqofBxG9TqOkw==\",\n         assets: [\n            \"/teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/92fc213b-1bab-49a4-b10e-f4368a52d500.unity3d\"\n         ],\n         database: \"teamSpace1\",\n         model: \"3549ddf6-885d-4977-87f1-eeac43a0e818\",\n         offset: [\n            -688.095458984375,\n            6410.9140625,\n            683.460205078125\n         ],\n         jsonFiles: [\n            \"/teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/92fc213b-1bab-49a4-b10e-f4368a52d500_unity.json.mpc\"\n         ]\n      }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/:uid.unity3d",
    "title": "Get Unity Bundle",
    "name": "getUnityBundle",
    "group": "Model",
    "description": "<p>Gets an actual unity bundle file. The path for this api is provided in the data retrieved by either one of the endpoints /:teamspace/:model/revision/master/head/unityAssets.json or /:teamspace/:model/revision/:rev/unityAssets.json</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>id of the model to get JSON Mpc for.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uid",
            "description": "<p>id of the unity bundle</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/master/head/searchtree.json?searchString=[searchString]",
    "title": "Search model tree",
    "name": "searchModelTree",
    "group": "Model",
    "description": "<p>Searches the model (or models if it is a federation) tree and returns the objects matching their names with the searchString param.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model to use.</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "String",
            "optional": false,
            "field": "searchString",
            "description": "<p>The string to use for search tree objects</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/revision/master/head/searchtree.json?searchString=fou HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "[\n   {\n      \"_id\": \"33fe7c13-17a4-43d6-af03-ceae6880322f\",\n      \"name\": \"Fouliiferous Tree H64_2\",\n      \"account\": \"teamSpace1\",\n      \"model\": \"3549ddf6-885d-4977-87f1-eeac43a0e818\"\n   },\n   {\n      \"_id\": \"ce413e99-8469-4ed0-86e3-ff50bf4fed89\",\n      \"name\": \"Fouliiferous Tree H64\",\n      \"account\": \"teamSpace1\",\n      \"model\": \"3549ddf6-885d-4977-87f1-eeac43a0e818\"\n   }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision/:rev/searchtree.json?searchString=[searchString]",
    "title": "Search model tree by revision",
    "name": "searchModelTreeRev",
    "group": "Model",
    "description": "<p>Searches the model (or models if it is a federation) tree and returns the objects matching their names with the searchString param. See more details <a href='#api-Model-searchModelTree'>here</a></p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model to use.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rev",
            "description": "<p>Revision to use.</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "String",
            "optional": false,
            "field": "searchString",
            "description": "<p>The string to use for search tree objects</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "put",
    "url": "/:teamspace/:model/settings/heliSpeed",
    "title": "Update model heli speed",
    "name": "updateHeliSpeed",
    "group": "Model",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model to Update Heli speed.</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "heliSpeed",
            "description": "<p>The value of the speed that will replace the heli speed.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "PUT /teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/settings/heliSpeed HTTP/1.1\n{\"heliSpeed\":3}",
        "type": "put"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "put",
    "url": "/:teamspace/:model",
    "title": "Update Federated Model",
    "name": "updateModel",
    "group": "Model",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Federated Model ID to update</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "[]Submodel",
            "optional": false,
            "field": "subModels",
            "description": "<p>Information on the models that are going to get federated</p>"
          }
        ],
        "Request body: SubModel": [
          {
            "group": "Request body: SubModel",
            "type": "String",
            "optional": false,
            "field": "database",
            "description": "<p>The teamspace name which the model belongs to</p>"
          },
          {
            "group": "Request body: SubModel",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>The model id to be federated</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "PUT /teamSpace1/5ce7dd19-1252-4548-a9c9-4a5414f2e0c5 HTTP/1.1\n{\n   subModels: [\n      {\n         database: \"teamSpace1\",\n         model: \"2710bd65-37d3-4e7f-b2e0-ffe743ce943f\",\n      },\n      {\n         database: \"teamSpace1\",\n         model: \"7cf61b4f-acdf-4295-b2d0-9b45f9f27418\",\n      }\n   ]\n}",
        "type": "put"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "{\n   account: \"teamSpace1\",\n   model: \"5ce7dd19-1252-4548-a9c9-4a5414f2e0c5\",\n   setting: {\n      _id: \"5ce7dd19-1252-4548-a9c9-4a5414f2e0c5\",\n      federate: {\n      },\n      desc: \"\",\n      name: \"Full Logo test\",\n      timestamp: \"2019-08-22T10:42:05.242Z\",\n      type: \"Federation\",\n      subModels: [\n         {\n            database: \"teamSpace1\",\n            model: \"2710bd65-37d3-4e7f-b2e0-ffe743ce943f\"\n         },\n         {\n            database: \"teamSpace1\",\n            model: \"7cf61b4f-acdf-4295-b2d0-9b45f9f27418\"\n         }\n      ],\n      surveyPoints: [\n         {\n            position: [\n               0,\n               0,\n               0\n            ],\n            latLong: [\n               0,\n               0\n            ]\n         }\n      ],\n      properties: {\n         unit: \"mm\"\n      },\n      permissions: [\n         {\n            user: \"viewerTeamspace1Model1JobA\",\n            permission: \"viewer\"\n         },\n         {\n            user: \"commenterTeamspace1Model1JobA\",\n            permission: \"commenter\"\n         },\n         {\n            user: \"collaboratorTeamspace1Model1JobA\",\n            permission: \"collaborator\"\n         },\n         {\n            user: \"commenterTeamspace1Model1JobB\",\n            permission: \"commenter\"\n         },\n         {\n            user: \"collaboratorTeamspace1Model1JobB\",\n            permission: \"collaborator\"\n         }\n      ],\n      status: \"ok\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "post",
    "url": "/:teamspace/models/permissions",
    "title": "Update multiple models permissions",
    "name": "updateMultiplePermissions",
    "group": "Model",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace.</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "[]ModelPermissions",
            "optional": false,
            "field": "BODY",
            "description": "<p>Its an array with a list of model ids and their permissions.</p>"
          }
        ],
        "Request body: ModelPermissions": [
          {
            "group": "Request body: ModelPermissions",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>The model id of the model that will have their permission changed. If it's a federation the entry in the response corresponding with the model will have the 'federated' field set to true.</p>"
          },
          {
            "group": "Request body: ModelPermissions",
            "type": "[]Permission",
            "optional": false,
            "field": "permissions",
            "description": "<p>An array indicating the new permissions.</p>"
          }
        ],
        "Request body: Permission": [
          {
            "group": "Request body: Permission",
            "type": "string",
            "optional": false,
            "field": "user",
            "description": "<p>The user id associated with this permission.</p>"
          },
          {
            "group": "Request body: Permission",
            "type": "string",
            "optional": false,
            "field": "permission",
            "description": "<p>The type of permission. This can has the value of 'viewer', 'commenter' or 'collaborator'.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /teamSpace1/models/permissions HTTP/1.1\n[\n   {\n      model: \"5ce7dd19-1252-4548-a9c9-4a5414f2e0c5\",\n      permissions: [\n         {\n            user: \"viewerTeamspace1Model1JobA\",\n            permission: \"viewer\"\n         },\n         {\n            user: \"commenterTeamspace1Model1JobA\",\n            permission: \"viewer\"\n         },\n         {\n            user: \"collaboratorTeamspace1Model1JobA\",\n            permission: \"collaborator\"\n         },\n         {\n            user: \"commenterTeamspace1Model1JobB\",\n            permission: \"commenter\"\n         },\n         {\n            user: \"collaboratorTeamspace1Model1JobB\",\n            permission: \"collaborator\"\n         }\n      ]\n   }\n]",
        "type": "post"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "[\n   {\n      name: \"Full Logo \",\n      federate: true,\n      model: \"5ce7dd19-1252-4548-a9c9-4a5414f2e0c5\",\n      permissions: [\n         {\n            user: \"viewerTeamspace1Model1JobA\",\n            permission: \"viewer\"\n         },\n         {\n            user: \"commenterTeamspace1Model1JobA\",\n            permission: \"viewer\"\n         },\n         {\n            user: \"collaboratorTeamspace1Model1JobA\",\n            permission: \"collaborator\"\n         },\n         {\n            user: \"commenterTeamspace1Model1JobB\",\n            permission: \"commenter\"\n         },\n         {\n            user: \"collaboratorTeamspace1Model1JobB\",\n            permission: \"collaborator\"\n         },\n         {\n            user: \"projectshared\"\n         },\n         {\n            user: \"fed\"\n         },\n         {\n            user: \"teamSpace1\"\n         },\n         {\n            user: \"unassignedTeamspace1UserJobA\"\n         },\n         {\n            user: \"viewerTeamspace1Model1JobB\"\n         },\n         {\n            user: \"adminTeamspace1JobA\"\n         },\n         {\n            user: \"adminTeamspace1JobB\"\n         },\n         {\n            user: \"weirdTeamspace\"\n         }\n      ],\n      subModels: [\n         {\n            database: \"teamSpace1\",\n            model: \"7cf61b4f-acdf-4295-b2d0-9b45f9f27418\"\n         },\n         {\n            database: \"teamSpace1\",\n            model: \"b1fceab8-b0e9-4e45-850b-b9888efd6521\"\n         }\n      ]\n   }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "post",
    "url": "/:teamspace/:model/permissions",
    "title": "Update model permissions",
    "name": "updatePermissions",
    "group": "Model",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>The model id of the model to be updated</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "[]Permissions",
            "optional": false,
            "field": "BODY",
            "description": "<p>Its an array with a list of users and their permission type.</p>"
          }
        ],
        "Request body: Permission": [
          {
            "group": "Request body: Permission",
            "type": "string",
            "optional": false,
            "field": "user",
            "description": "<p>The user id associated with this permission.</p>"
          },
          {
            "group": "Request body: Permission",
            "type": "string",
            "optional": false,
            "field": "permission",
            "description": "<p>The type of permission. This can has the value of 'viewer', 'commenter' or 'collaborator'.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /teamSpace1/5ce7dd19-1252-4548-a9c9-4a5414f2e0c5/permissions HTTP/1.1\n[\n   {\n      user: \"viewerTeamspace1Model1JobA\",\n      permission: \"collaborator\"\n   },\n   {\n      user: \"commenterTeamspace1Model1JobA\",\n      permission: \"viewer\"\n   },\n   {\n      user: \"collaboratorTeamspace1Model1JobA\",\n      permission: \"collaborator\"\n   },\n   {\n      user: \"commenterTeamspace1Model1JobB\",\n      permission: \"commenter\"\n   },\n   {\n      user: \"collaboratorTeamspace1Model1JobB\",\n      permission: \"collaborator\"\n   }\n]",
        "type": "post"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "{\n   _id: \"2710bd65-37d3-4e7f-b2e0-ffe743ce943f\",\n   timestamp: \"2019-05-02T16:17:14.000Z\",\n   type: \"Architectural\",\n   desc: \"\",\n   name: \"pipes\",\n   subModels: [],\n   surveyPoints: [\n      {\n         position: [\n            0,\n            0,\n            0\n         ],\n         latLong: [\n            0,\n            0\n         ]\n      }\n   ],\n   properties: {\n      unit: \"mm\"\n   },\n   permissions: [\n      {\n         user: \"viewerTeamspace1Model1JobA\",\n         permission: \"collaborator\"\n      },\n      {\n         user: \"commenterTeamspace1Model1JobA\",\n         permission: \"viewer\"\n      },\n      {\n         user: \"collaboratorTeamspace1Model1JobA\",\n         permission: \"collaborator\"\n      },\n      {\n         user: \"commenterTeamspace1Model1JobB\",\n         permission: \"commenter\"\n      },\n      {\n         user: \"collaboratorTeamspace1Model1JobB\",\n         permission: \"collaborator\"\n      }\n   ],\n   status: \"ok\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "put",
    "url": "/:teamspace/:model/settings/",
    "title": "Update Model Settings",
    "name": "updateSettings",
    "group": "Model",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model to update Settings.</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the model to be created</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "unit",
            "description": "<p>The unit in which the model is specified</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>A code to be associated with the model; it can be of maximum 5 letters (a-z) and numbers</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>The type of the model</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "angleFromNorth",
            "description": "<p>GIS bearing angle</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "elevation",
            "description": "<p>GIS elevation</p>"
          },
          {
            "group": "Request body",
            "type": "[]SurveyPoint",
            "optional": false,
            "field": "surveyPoints",
            "description": "<p>an array containing GIS surveypoints</p>"
          }
        ],
        "Request body: SurveyPoint": [
          {
            "group": "Request body: SurveyPoint",
            "type": "Number[]",
            "optional": false,
            "field": "position",
            "description": "<p>an array representing a three dimensional coordinate</p>"
          },
          {
            "group": "Request body: SurveyPoint",
            "type": "Number[]",
            "optional": false,
            "field": "latLong",
            "description": "<p>an array representing a two dimensional coordinate for latitude and logitude</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "PUT /teamSpace1/3549ddf6-885d-4977-87f1-eeac43a0e818/settings HTTP/1.1\n{\n   name: \"Medieval\",\n   unit: \"cm\",\n   code: \"1233\",\n   type: \"Architectural\",\n   angleFromNorth: 3,\n   elevation: 0,\n   surveyPoints: [\n      {\n         position: [\n            4,\n            -7,\n            -1\n         ],\n         latLong: [\n            1,\n            2,\n         ]\n      }\n   ]\n}",
        "type": "put"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "{\n   code: \"stage\",\n   unit: \"cm\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "post",
    "url": "/:teamspace/:model/upload",
    "title": "Upload Model.",
    "name": "uploadModel",
    "group": "Model",
    "description": "<p>It uploads a model file and creates a new revision for that model.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model id to upload.</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "tag",
            "description": "<p>the tag name for the new revision</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "desc",
            "description": "<p>the description for the new revision</p>"
          }
        ],
        "Request body: Attachment": [
          {
            "group": "Request body: Attachment",
            "type": "binary",
            "optional": false,
            "field": "FILE",
            "description": "<p>the file to be uploaded</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /teamSpace1/b1fceab8-b0e9-4e45-850b-b9888efd6521/upload HTTP/1.1\nContent-Type: multipart/form-data; boundary=----WebKitFormBoundarySos0xligf1T8Sy8I\n\n------WebKitFormBoundarySos0xligf1T8Sy8I\nContent-Disposition: form-data; name=\"file\"; filename=\"3DrepoBIM.obj\"\nContent-Type: application/octet-stream\n\n<binary content>\n------WebKitFormBoundarySos0xligf1T8Sy8I\nContent-Disposition: form-data; name=\"tag\"\n\nrev1\n------WebKitFormBoundarySos0xligf1T8Sy8I\nContent-Disposition: form-data; name=\"desc\"\n\nel paso\n------WebKitFormBoundarySos0xligf1T8Sy8I-- *",
        "type": "post"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/model.js",
    "groupTitle": "Model"
  },
  {
    "type": "delete",
    "url": "/notifications",
    "title": "Delete All notification",
    "name": "deleteAllNotifications",
    "group": "Notification",
    "version": "0.0.0",
    "filename": "routes/notification.js",
    "groupTitle": "Notification"
  },
  {
    "type": "delete",
    "url": "/notifications/:id",
    "title": "Delete a notification",
    "name": "deleteNotification",
    "group": "Notification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Unique Notification ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/notification.js",
    "groupTitle": "Notification"
  },
  {
    "type": "get",
    "url": "/notifications/:id",
    "title": "Get a notification",
    "name": "getNotification",
    "group": "Notification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique Notification ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/notification.js",
    "groupTitle": "Notification"
  },
  {
    "type": "get",
    "url": "/notifications",
    "title": "Get all notifications",
    "name": "getNotifications",
    "group": "Notification",
    "version": "0.0.0",
    "filename": "routes/notification.js",
    "groupTitle": "Notification"
  },
  {
    "type": "patch",
    "url": "/notifications",
    "title": "Patch all the user notifications",
    "name": "patchNotification",
    "group": "Notification",
    "version": "0.0.0",
    "filename": "routes/notification.js",
    "groupTitle": "Notification"
  },
  {
    "type": "patch",
    "url": "/notifications/:id",
    "title": "Patch a notification",
    "name": "patchNotification",
    "group": "Notification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique Notification ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/notification.js",
    "groupTitle": "Notification"
  },
  {
    "type": "post",
    "url": "/:teamspace/permission-templates",
    "title": "Create a template",
    "name": "createTemplate",
    "group": "PermissionTemplate",
    "description": "<p>Create a permission template.</p>",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Template name</p>"
          },
          {
            "group": "Request body",
            "type": "String[]",
            "optional": false,
            "field": "permissions",
            "description": "<p>List of model level permissions</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Template name</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "permissions",
            "description": "<p>List of model level permissions</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"_id\":\"Template1\",\n\t\"permissions\":[\n\t\t\"view_model\"\n\t]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /acme/permission-templates HTTP/1.1\n{\n\t\"_id\":\"Template1\",\n\t\"permissions\":[\n\t\t\"view_model\"\n\t]\n}",
        "type": "post"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/permissionTemplate.js",
    "groupTitle": "Permission Template",
    "groupDescription": "<p>Permission template is a grouping of model level permissions. An ID is assigned to it as well. They are viewer, commenter, and collaborator.</p> <p>Three default permission templates are created by default. They are viewer, commenter, and collaborator.</p>"
  },
  {
    "type": "delete",
    "url": "/:teamspace/permission-templates/:permissionId",
    "title": "Delete a template",
    "name": "deleteTemplate",
    "group": "PermissionTemplate",
    "description": "<p>Delete a permission template.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "permissionId",
            "description": "<p>Permission ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "DELETE /acme/permission-templates/Template1 HTTP/1.1",
        "type": "delete"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/permissionTemplate.js",
    "groupTitle": "Permission Template",
    "groupDescription": "<p>Permission template is a grouping of model level permissions. An ID is assigned to it as well. They are viewer, commenter, and collaborator.</p> <p>Three default permission templates are created by default. They are viewer, commenter, and collaborator.</p>"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/permission-templates",
    "title": "List all model templates",
    "name": "listModelTemplates",
    "group": "PermissionTemplate",
    "description": "<p>Get a list of model permission templates. Intended for users that have <code>manage_model_permission</code> privileges.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/permission-templates HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/permissionTemplate.js",
    "groupTitle": "Permission Template",
    "groupDescription": "<p>Permission template is a grouping of model level permissions. An ID is assigned to it as well. They are viewer, commenter, and collaborator.</p> <p>Three default permission templates are created by default. They are viewer, commenter, and collaborator.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n[\n\t{\n\t\t\"_id\":\"Template1\",\n\t\t\"permissions\":[\n\t\t\t\"view_model\"\n\t\t]\n\t},\n\t{\n\t\t\"_id\":\"Template2\",\n\t\t\"permissions\":[\n\t\t\t\"view_model\",\n\t\t\t\"view_issue\"\n\t\t]\n\t}\n]",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/permission-templates",
    "title": "Get all templates",
    "name": "listTemplates",
    "group": "PermissionTemplate",
    "description": "<p>Get a list of teamspace permission templates.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/permission-templates HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/permissionTemplate.js",
    "groupTitle": "Permission Template",
    "groupDescription": "<p>Permission template is a grouping of model level permissions. An ID is assigned to it as well. They are viewer, commenter, and collaborator.</p> <p>Three default permission templates are created by default. They are viewer, commenter, and collaborator.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n[\n\t{\n\t\t\"_id\":\"Template1\",\n\t\t\"permissions\":[\n\t\t\t\"view_model\"\n\t\t]\n\t},\n\t{\n\t\t\"_id\":\"Template2\",\n\t\t\"permissions\":[\n\t\t\t\"view_model\",\n\t\t\t\"view_issue\"\n\t\t]\n\t}\n]",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/plans",
    "title": "List all Plans",
    "name": "listPlans",
    "group": "Plan",
    "version": "0.0.0",
    "filename": "routes/plan.js",
    "groupTitle": "Plan"
  },
  {
    "type": "post",
    "url": "/:teamspace/projects",
    "title": "Create project",
    "name": "createProject",
    "group": "Project",
    "description": "<p>It creates a project. The name of the project is required.</p>",
    "permission": [
      {
        "name": "canCreateProject"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of the teamspace</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the project to be created</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /teamSpace1/projects HTTP/1.1\n{name: \"Classic project\"}",
        "type": "post"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n   name: \"Classic project\",\n   _id: \"5d5bec491c15383184eb7521\",\n   permissions: [\n      \"create_model\",\n      \"create_federation\",\n      \"admin_project\",\n      \"edit_project\",\n      \"delete_project\",\n      \"upload_files_all_models\",\n      \"edit_federation_all_models\",\n      \"create_issue_all_models\",\n      \"comment_issue_all_models\",\n      \"view_issue_all_models\",\n      \"view_model_all_models\",\n      \"download_model_all_models\",\n      \"change_model_settings_all_models\"\n   ],\n   models: []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/project.js",
    "groupTitle": "Project"
  },
  {
    "type": "delete",
    "url": "/:teamspace/projects/:project",
    "title": "Delete project",
    "name": "deleteProject",
    "group": "Project",
    "description": "<p>Deletes a project, including all the models and federations inside of it.</p>",
    "permission": [
      {
        "name": "canDeleteProject"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of the teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "project",
            "description": "<p>Project to delete</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "DELETE /teamSpace1/projects/Classic%20project%20renamed HTTP/1.1",
        "type": "delete"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "{\n   _id: \"5d5bec491c15383184eb7521\",\n   name: \"Classic project renamed\",\n   permissions: [\n      {\n         user: \"projectshared\",\n         permissions: [\n            \"admin_project\"\n         ]\n      }\n   ],\n   models: []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/project.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/:teamspace/projects/:project",
    "title": "Get project",
    "name": "listProject",
    "group": "Project",
    "description": "<p>Get the details of a project; name, user permissions, modelids.</p>",
    "permission": [
      {
        "name": "canViewProject"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of the teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "project",
            "description": "<p>Project name to be queried</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/projects/Classic%20project%20renamed HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "{\n   _id: \"5d5bec491c15383184eb7521\",\n   name: \"Classic project renamed\",\n   permissions: [\n      {\n         user: \"projectshared\",\n         permissions: [\n            \"admin_project\"\n         ]\n      },\n      {\n         user: \"viewerTeamspace1Model1JobA\",\n         permissions: []\n      },\n      {\n         user: \"commenterTeamspace1Model1JobB\",\n         permissions: []\n      },\n      {\n         user: \"collaboratorTeamspace1Model1JobA\",\n         permissions: []\n      }\n   ],\n   models: []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/project.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/:teamspace/projects",
    "title": "List projects",
    "name": "listProjects",
    "group": "Project",
    "description": "<p>It returns a list of projects with their permissions and model ids.</p>",
    "permission": [
      {
        "name": "canListProjects"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of the teamspace</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/projects HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success:",
          "content": "[\n   {\n      _id: \"5ccb1490b4626d30c05c9401\",\n      name: \"Medieval\",\n      permissions: [\n         {\n            user: \"projectshared\",\n            permissions: []\n         },\n         {\n            user: \"fed\",\n            permissions: []\n         },\n         {\n            user: \"teamSpace1\",\n            permissions: []\n         },\n         {\n            user: \"weirdTeamspace\",\n            permissions: []\n         }\n      ],\n      models: [\n         \"50926a1f-1525-44ac-b6a1-d016949a13bb\"\n      ]\n   },\n   {\n      _id: \"5ccb1702b4626d30c05c9830\",\n      name: \"Bim Logo\",\n      permissions: [\n         {\n            user: \"projectshared\",\n            permissions: []\n         },\n         {\n            user: \"commenterTeamspace1Model1JobA\",\n            permissions: []\n         },\n         {\n            user: \"commenterTeamspace1Model1JobB\",\n            permissions: []\n         },\n         {\n            user: \"collaboratorTeamspace1Model1JobA\",\n            permissions: []\n         },\n         {\n            user: \"collaboratorTeamspace1Model1JobB\",\n            permissions: []\n         },\n         {\n            user: \"adminTeamspace1JobA\",\n            permissions: []\n         },\n         {\n            user: \"adminTeamspace1JobB\",\n            permissions: []\n         },\n         {\n            user: \"weirdTeamspace\",\n            permissions: []\n         }\n      ],\n      models: [\n         \"2710bd65-37d3-4e7f-b2e0-ffe743ce943f\",\n         \"b1fceab8-b0e9-4e45-850b-b9888efd6521\",\n         \"7cf61b4f-acdf-4295-b2d0-9b45f9f27418\",\n         \"5ce7dd19-1252-4548-a9c9-4a5414f2e0c5\"\n      ]\n   },\n   {\n      _id: \"5d5bec491c15383184eb7521\",\n      name: \"Classic project renamed\",\n      permissions: [\n      {\n         user: \"projectshared\",\n         permissions: [\n            \"admin_project\"\n         ]\n      },\n      {\n         user: \"viewerTeamspace1Model1JobA\",\n         permissions: []\n      },\n      {\n         user: \"commenterTeamspace1Model1JobB\",\n         permissions: []\n      },\n      {\n         user: \"collaboratorTeamspace1Model1JobA\",\n         permissions: []\n      }\n   ],\n      models: []\n   }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/project.js",
    "groupTitle": "Project"
  },
  {
    "type": "put",
    "url": "/:teamspace/projects/:project",
    "title": "Update project",
    "name": "updateProject",
    "group": "Project",
    "description": "<p>It updates a project. The name can be changed and the permissions as well as the permissions of users</p>",
    "permission": [
      {
        "name": "canUpdateProject"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of the teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "project",
            "description": "<p>The name of the project to update</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the project to be created</p>"
          },
          {
            "group": "Request body",
            "type": "[]Permission",
            "optional": false,
            "field": "permissions",
            "description": "<p>The permissions for each user from the project</p>"
          }
        ],
        "Request body: Permissions": [
          {
            "group": "Request body: Permissions",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>The username of the user to have it permission changed</p>"
          },
          {
            "group": "Request body: Permissions",
            "type": "String[]",
            "optional": false,
            "field": "permissions",
            "description": "<p>An array of permissions for the user to be assigned</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage update permissions:",
        "content": "PUT /teamSpace1/Classic%20project HTTP/1.1\n{\n   name: \"Classic project\",\n   permissions: [\n      {\n         user: \"projectshared\",\n         permissions: [\n            \"admin_project\"\n         ]\n      },\n      {\n         user: \"viewerTeamspace1Model1JobA\",\n         permissions: []\n      },\n      {\n         user: \"commenterTeamspace1Model1JobB\",\n         permissions: []\n      },\n      {\n         user: \"collaboratorTeamspace1Model1JobA\",\n         permissions: []\n      }\n   ]\n}",
        "type": "put"
      },
      {
        "title": "Example usage rename project:",
        "content": "PUT /teamSpace1/Classic%20project HTTP/1.1\n{name: \"Classic project renamed\"}",
        "type": "put"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success update permissions:",
          "content": "{\n   _id: \"5d5bec491c15383184eb7521\",\n   name: \"Classic project\",\n   permissions: [\n      {\n         user: \"projectshared\",\n         permissions: [\n            \"admin_project\"\n         ]\n      }\n   ],\n   models: []\n}",
          "type": "json"
        },
        {
          "title": "Success rename project:",
          "content": "{\n   _id: \"5d5bec491c15383184eb7521\",\n   name: \"Classic project renamed\",\n   permissions: [\n      {\n         user: \"projectshared\",\n         permissions: [\n            \"admin_project\"\n         ]\n      }\n   ],\n   models: []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/project.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/resources/:resourceId",
    "title": "Get resource file",
    "name": "getResource",
    "group": "Resources",
    "description": "<p>Is the URL for downloading the resource file identified by the resourceId.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "resourceId",
            "description": "<p>The Id of the resource</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/resources.js",
    "groupTitle": "Resources"
  },
  {
    "type": "post",
    "url": "/:teamspace/:model/risks/:riskId/resources",
    "title": "Attach resources to a risk",
    "name": "attachResourceRisk",
    "group": "Risks",
    "description": "<p>Attaches file or URL resources to a risk. If the type of the resource is file it should be sent as multipart/form-data. Both types at the same time cannot be sent. So in order to attach files and URLs it should be done with two different requests.</p> <p>This method triggers a chat event</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "riskId",
            "description": "<p>Risk ID</p>"
          }
        ],
        "Request body file resource (multipart/form-data)": [
          {
            "group": "Request body file resource (multipart/form-data)",
            "type": "File[]",
            "optional": false,
            "field": "files",
            "description": "<p>The array of files to be attached</p>"
          },
          {
            "group": "Request body file resource (multipart/form-data)",
            "type": "String[]",
            "optional": false,
            "field": "names",
            "description": "<p>The names of the files; it should have the same length as the files field and should include the file extension</p>"
          }
        ],
        "Request body URL resource": [
          {
            "group": "Request body URL resource",
            "type": "String[]",
            "optional": false,
            "field": "urls",
            "description": "<p>The array of URLs to be attached</p>"
          },
          {
            "group": "Request body URL resource",
            "type": "String[]",
            "optional": false,
            "field": "names",
            "description": "<p>The names of the URLs; it should have the same length as the URL field</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success example result after two files has been uploaded",
          "content": "\n[\n   {\n      \"_id\":\"7617f775-9eb7-4877-8ec3-98ea3457e519\",\n      \"size\":1422,\n      \"riskIds\":[\n         \"3e8a11e0-9812-11e9-9c4d-ebde5888e062\"\n      ],\n      \"name\":\"todo.txt\",\n      \"user\":\"teamSpace1\",\n      \"createdAt\":1561973996461\n   },\n   {\n      \"_id\":\"e25e42d5-c4f0-4fbc-a8f4-bc9899e6662a\",\n      \"size\":2509356,\n      \"riskIds\":[\n         \"3e8a11e0-9812-11e9-9c4d-ebde5888e062\"\n      ],\n      \"name\":\"football.gif\",\n      \"user\":\"teamSpace1\",\n      \"createdAt\":1561973996462\n   }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/risk.js",
    "groupTitle": "SafetiBase Risks"
  },
  {
    "type": "post",
    "url": "/:teamspace/:model/risks/:riskId/comments",
    "title": "Add a comment",
    "name": "commentRisk",
    "group": "Risks",
    "description": "<p>Create a comment in a risk.</p>",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Risk ID</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "rev_id",
            "description": "<p>Revision ID</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>Comment text</p>"
          },
          {
            "group": "Request body",
            "type": "Viewpoint",
            "optional": false,
            "field": "viewpoint",
            "description": "<p>Viewpoint object</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "riskId",
            "description": "<p>Risk ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "guid",
            "description": "<p>Comment ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "created",
            "description": "<p>Comment creation timestamp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "owner",
            "description": "<p>Comment owner</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>Comment text</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "viewpoint",
            "description": "<p>Viewpoint object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response.",
          "content": "HTTP/1.1 200 OK\n{\n\t\"guid\":\"00000000-0000-0000-0000-000000000007\",\n\t\"created\":1567172228143,\n\t\"owner\":\"alice\",\n\t\"comment\":\"Comment 1\",\n\t\"viewpoint\":{\n\t\t\"right\":[0.5,-0.1,0.5],\n\t\t\"up\":[0.3,0.9,-0.3],\n\t\t\"position\":[-50000.0,100000.0,150000.0],\n\t\t\"look_at\":[35000.0,50000.0,9000.0],\n\t\t\"view_dir\":[0.5,-0.5,-1.0],\n\t\t\"near\":500.0,\n\t\t\"far\":300000,\n\t\t\"fov\":1.05,\n\t\t\"aspect_ratio\":1.5,\n\t\t\"clippingPlanes\":[],\n\t\t\"screenshot\":\"acme/00000000-0000-0000-0000-000000000000/risks/00000000-0000-0000-0000-000000000002/viewpoints/00000000-0000-0000-0000-000000000005/screenshot.png\",\n\t\t\"guid\":\"00000000-0000-0000-0000-000000000006\",\n\t\t\"screenshotSmall\":\"acme/00000000-0000-0000-0000-000000000000/risks/00000000-0000-0000-0000-000000000002/viewpoints/00000000-0000-0000-0000-000000000005/screenshotSmall.png\"\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /acme/00000000-0000-0000-0000-000000000000/risks/00000000-0000-0000-0000-000000000002/comments HTTP/1.1\n{\n\t\"_id\":\"00000000-0000-0000-0000-000000000002\",\n\t\"rev_id\":\"00000000-0000-0000-0000-000000000001\",\n\t\"comment\":\"Comment 1\",\n\t\"viewpoint\":{\n\t\t\"right\":[0.5,-0.1,0.5],\n\t\t\"up\":[0.3,0.9,-0.3],\n\t\t\"position\":[-50000.0,100000.0,150000.0],\n\t\t\"look_at\":[35000.0,50000.0,9000.0],\n\t\t\"view_dir\":[0.5,-0.5,-1.0],\n\t\t\"near\":500.0,\n\t\t\"far\":300000,\n\t\t\"fov\":1.05,\n\t\t\"aspect_ratio\":1.5,\n\t\t\"clippingPlanes\":[],\n\t\t\"highlighted_group_id\":\"\",\n\t\t\"screenshot\":<base64 image>\n\t}\n}",
        "type": "post"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/risk.js",
    "groupTitle": "SafetiBase Risks"
  },
  {
    "type": "delete",
    "url": "/:teamspace/:model/risks/:riskId/comments",
    "title": "Delete a comment",
    "name": "deleteComment",
    "group": "Risks",
    "description": "<p>Delete a risk comment.</p>",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "guid",
            "description": "<p>Comment ID</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "riskId",
            "description": "<p>Risk ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "DELETE /acme/00000000-0000-0000-0000-000000000000/risks/00000000-0000-0000-0000-000000000002/comments HTTP/1.1\n{\n\t\"guid\":\"00000000-0000-0000-0000-000000000007\",\n}",
        "type": "delete"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response.",
          "content": "HTTP/1.1 200 OK\n{\n\t\"guid\":\"00000000-0000-0000-0000-000000000007\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/risk.js",
    "groupTitle": "SafetiBase Risks"
  },
  {
    "type": "delete",
    "url": "/:teamspace/:model/issues/:issueId/resources",
    "title": "Detach a resource from a risk",
    "name": "detachResourceRisk",
    "group": "Risks",
    "description": "<p>Detachs a resource from a risk. If the risk is the last entity the resources has been attached to it also deletes the resource from the system. This method triggers a chat event .</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "riskId",
            "description": "<p>Risk ID</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>The resource id to be detached</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "{",
          "content": "\n{\n   \"_id\":\"e25e42d5-c4f0-4fbc-a8f4-bc9899e6662a\",\n   \"size\":2509356,\n   \"riskIds\":[\n   ],\n   \"name\":\"football.gif\",\n   \"user\":\"teamSpace1\",\n   \"createdAt\":1561973996462\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/risk.js",
    "groupTitle": "SafetiBase Risks"
  },
  {
    "type": "get",
    "url": "/:teamspace/mitigations/criteria",
    "title": "Get mitigation criteria",
    "name": "findMitigationCriteria",
    "group": "Risks",
    "description": "<p>Returns all mitigations criteria from mitigation suggestions.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/mitigations/criteria HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response.",
          "content": "HTTP/1.1 200 OK\n{\n\t\"associated_activity\":[\n\t\t\"All construction\",\n\t\t\"Site tests\",\n\t\t\"Logistics\"\n\t],\n\t\"category\":[\n\t\t\"safety_electricity\"\n\t],\n\t\"element\":[\n\t\t\"Doors\",\n\t\t\"Floors\",\n\t\t\"Pipes\",\n\t\t\"Vents\",\n\t\t\"Walls\"\n\t],\n\t\"location_desc\":[\n\t\t\"Tower 1 - Level 0\",\n\t\t\"Tower 1 - Level 1\",\n\t\t\"Tower 1 - Level 2\",\n\t\t\"Tower 2 - Level 0\",\n\t\t\"Tower 2 - Level 1\",\n\t\t\"Tower 3 - Level 0\",\n\t\t\"Tower 3 - Level 1\",\n\t\t\"Tower 3 - Level 2\"\n\t],\n\t\"mitigation_stage\":[\n\t\t\"Preliminary Design\",\n\t\t\"Detail Design\",\n\t\t\"Preconstruction\",\n\t\t\"Site work and Change Control\"\n\t],\n\t\"mitigation_type\":[\n\t\t\"Eliminate\",\n\t\t\"Reduce\",\n\t\t\"Control\",\n\t\t\"Inform\"\n\t],\n\t\"risk_factor\":[\n\t\t\"Factor 2\",\n\t\t\"Factor 5\",\n\t\t\"Factor 8\"\n\t],\n\t\"scope\":[\n\t\t\"General concrete\",\n\t\t\"In situ concrete\"\n\t]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/mitigation.js",
    "groupTitle": "SafetiBase Risks"
  },
  {
    "type": "post",
    "url": "/:teamspace/mitigations",
    "title": "Find mitigation suggestions",
    "name": "findMitigationSuggestions",
    "group": "Risks",
    "description": "<p>Returns a list of suggestions for risk mitigation based on given criteria.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "associated_activity",
            "description": "<p>Risk associated activity</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "category",
            "description": "<p>Risk category</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "element",
            "description": "<p>Risk element type</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "location_desc",
            "description": "<p>Risk location description</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "risk_factor",
            "description": "<p>Risk factor</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "scope",
            "description": "<p>Risk construction scope</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /acme/mitigations HTTP/1.1\n{\n\t\"associated_activity\":\"\",\n\t\"category\":\"safety_fall\",\n\t\"element\":\"Doors\",\n\t\"location_desc\":\"Tower 3 - Level 2\",\n\t\"risk_factor\":\"Factor 9\",\n\t\"scope\":\"Tower 3\"\n}",
        "type": "post"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response.",
          "content": "HTTP/1.1 200 OK\n[\n\t{\n\t\t\"mitigation_desc\":\"Replace all openings required in floor slabs with precast service openings.\",\n\t\t\"mitigation_detail\":\"Replace openings larger than a standard anvil required in floor slabs with precast service openings from A/W 2020 catalogue.\",\n\t\t\"mitigation_stage\":\"Preliminary Design\",\n\t\t\"mitigation_type\":\"Eliminate\"\n\t},\n\t{\n\t\t\"mitigation_desc\":\"Provide safe walking surface joint covers. Any covering should be: strong enough to support any loads likely to be placed on it ; and fixed in position to prevent accidental dislodgement.\",\n\t\t\"mitigation_detail\":\"Safe walking surface joint covers for all joins and gaps. Covers should be strong enough to support any loads likely to be placed on it and fixed in position with bolts to prevent accidental dislodgement.\",\n\t\t\"mitigation_stage\":\"Detail Design\",\n\t\t\"mitigation_type\":\"Reduce\"\n\t},\n\t{\n\t\t\"mitigation_desc\":\"Provide warning markings and/or colour change.\",\n\t\t\"mitigation_detail\":\"Provide warning markings from approved list of markings and/or colour change using chart from Document XYZ.\",\n\t\t\"mitigation_stage\":\"Preconstruction\",\n\t\t\"mitigation_type\":\"Control\"\n\t}\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/mitigation.js",
    "groupTitle": "SafetiBase Risks"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/risks/:riskId",
    "title": "Get a risk",
    "name": "findRiskById",
    "group": "Risks",
    "description": "<p>Retrieve a risk. The response includes all comments and screenshot URLs.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "risk",
            "description": "<p>The Issue matching the Issue ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response.",
          "content": "HTTP/1.1 200 OK\n{\n\t\"_id\":\"00000000-0000-0000-0000-000000000002\",\n\t\"account\":\"acme\",\n\t\"assigned_roles\":[\n\t\t\"Job1\"\n\t],\n\t\"associated_activity\":\"Column casting\",\n\t\"category\":\"safety_fall\",\n\t\"comments\":[],\n\t\"consequence\":0,\n\t\"created\":1567156228976,\n\t\"creator_role\":\"Job4\",\n\t\"desc\":\"Risk description that describes the risk\",\n\t\"element\":\"Doors\",\n\t\"level_of_risk\":0,\n\t\"likelihood\":0,\n\t\"location_desc\":\"Tower 3 - Level 2\",\n\t\"mitigation_desc\":\"Erect temporary barrier\",\n\t\"mitigation_detail\":\"Erect a temporary 1.5m metal barrier along edge\",\n\t\"mitigation_stage\":\"Construction stage 5\",\n\t\"mitigation_status\":\"proposed\",\n\t\"mitigation_type\":\"Eliminate\",\n\t\"model\":\"00000000-0000-0000-0000-000000000000\",\n\t\"name\":\"Risk 1\",\n\t\"overall_level_of_risk\":0,\n\t\"owner\":\"alice\",\n\t\"position\":[55000.0,80000.0,-10000.0],\n\t\"residual_consequence\":-1,\n\t\"residual_level_of_risk\":-1,\n\t\"residual_likelihood\":-1,\n\t\"residual_risk\":\"\",\n\t\"rev_id\":\"00000000-0000-0000-0000-000000000001\",\n\t\"risk_factor\":\"Factor 9\",\n\t\"safetibase_id\":\"\",\n\t\"scope\":\"Tower 3\",\n\t\"thumbnail\":\"acme/00000000-0000-0000-0000-000000000000/risks/00000000-0000-0000-0000-000000000002/thumbnail.png\",\n\t\"viewpoint\":{\n\t\t\"aspect_ratio\":1.4,\n\t\t\"clippingPlanes\":[],\n\t\t\"far\":300000,\n\t\t\"fov\":1.05,\n\t\t\"guid\":\"00000000-0000-0000-0000-000000000004\",\n\t\t\"hideIfc\":true,\n\t\t\"look_at\":[35000.0,40000.0,8000.0],\n\t\t\"near\":600.0,\n\t\t\"position\":[-70000.0,120000.0,150000.0],\n\t\t\"right\":[0.8,-0.3,0.6],\n\t\t\"screenshot\":\"acme/00000000-0000-0000-0000-000000000000/risks/00000000-0000-0000-0000-000000000002/viewpoints/00000000-0000-0000-0000-000000000003/screenshot.png\",\n\t\t\"screenshotSmall\":\"acme/00000000-0000-0000-0000-000000000000/risks/00000000-0000-0000-0000-000000000002/viewpoints/00000000-0000-0000-0000-000000000003/screenshotSmall.png\",\n\t\t\"up\":[0.3,0.9,-0.3],\n\t\t\"view_dir\":[0.5,-0.4,-0.7]\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/risks/00000000-0000-0000-0000-000000000002 HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/risk.js",
    "groupTitle": "SafetiBase Risks",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "riskId",
            "description": "<p>Risk ID</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/risks/:riskId/screenshot.png",
    "title": "Get risk screenshot",
    "name": "getScreenshot",
    "group": "Risks",
    "description": "<p>Retrieve a risk screenshot image.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "png",
            "optional": false,
            "field": "image",
            "description": "<p>Screenshot image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<binary image>",
          "type": "png"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/risks/00000000-0000-0000-0000-000000000002/screenshot.png HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/risk.js",
    "groupTitle": "SafetiBase Risks",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "riskId",
            "description": "<p>Risk ID</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/risks/:riskId/screenshotSmall.png",
    "title": "Get low-res screenshot",
    "name": "getScreenshotSmall",
    "group": "Risks",
    "description": "<p>Retrieve a low-resolution risk screenshot image.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "png",
            "optional": false,
            "field": "image",
            "description": "<p>Small screenshot image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<binary image>",
          "type": "png"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/risks/00000000-0000-0000-0000-000000000002/screenshotSmall.png HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/risk.js",
    "groupTitle": "SafetiBase Risks",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "riskId",
            "description": "<p>Risk ID</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/risks/:riskId/thumbnail.png",
    "title": "Get risk thumbnail",
    "name": "getThumbnail",
    "group": "Risks",
    "description": "<p>Retrieve a risk thumbnail image.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "png",
            "optional": false,
            "field": "image",
            "description": "<p>Thumbnail image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<binary image>",
          "type": "png"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/risks/00000000-0000-0000-0000-000000000002/thumbnail.png HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/risk.js",
    "groupTitle": "SafetiBase Risks",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "riskId",
            "description": "<p>Risk ID</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/:model[/revision/:revId]/risks",
    "title": "List all risks",
    "name": "listRisks",
    "group": "Risks",
    "description": "<p>Retrieve all model risks.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "revId",
            "description": "<p>Revision ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "Number",
            "optional": true,
            "field": "updatedSince",
            "description": "<p>Only return issues that has been updated since this value (in epoch value)</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": true,
            "field": "numbers",
            "description": "<p>Array of issue numbers to filter for</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "ids",
            "description": "<p>Array of issue ids to filter for</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "risks",
            "description": "<p>Risk objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n[\n\t{\n\t\t\"_id\":\"00000000-0000-0000-0000-000000000002\",\n\t\t\"account\":\"acme\",\n\t\t\"assigned_roles\":[\n\t\t\t\"Job1\"\n\t\t],\n\t\t\"associated_activity\":\"Column casting\",\n\t\t\"category\":\"safety_fall\",\n\t\t\"comments\":[],\n\t\t\"consequence\":0,\n\t\t\"created\":1567156228976,\n\t\t\"creator_role\":\"Job4\",\n\t\t\"desc\":\"Risk description that describes the risk\",\n\t\t\"element\":\"Doors\",\n\t\t\"level_of_risk\":0,\n\t\t\"likelihood\":0,\n\t\t\"location_desc\":\"Tower 3 - Level 2\",\n\t\t\"mitigation_desc\":\"Erect temporary barrier\",\n\t\t\"mitigation_detail\":\"Erect a temporary 1.5m metal barrier along edge\",\n\t\t\"mitigation_stage\":\"Construction stage 5\",\n\t\t\"mitigation_status\":\"proposed\",\n\t\t\"mitigation_type\":\"Eliminate\",\n\t\t\"model\":\"00000000-0000-0000-0000-000000000000\",\n\t\t\"name\":\"Risk 1\",\n\t\t\"overall_level_of_risk\":0,\n\t\t\"owner\":\"alice\",\n\t\t\"position\":[55000.0,80000.0,-10000.0],\n\t\t\"residual_consequence\":-1,\n\t\t\"residual_level_of_risk\":-1,\n\t\t\"residual_likelihood\":-1,\n\t\t\"residual_risk\":\"\",\n\t\t\"rev_id\":\"00000000-0000-0000-0000-000000000001\",\n\t\t\"risk_factor\":\"Factor 9\",\n\t\t\"safetibase_id\":\"\",\n\t\t\"scope\":\"Tower 3\",\n\t\t\"thumbnail\":\"acme/00000000-0000-0000-0000-000000000000/risks/00000000-0000-0000-0000-000000000002/thumbnail.png\",\n\t\t\"viewpoint\":{\n\t\t\t\"aspect_ratio\":1.4,\n\t\t\t\"clippingPlanes\":[],\n\t\t\t\"far\":300000,\n\t\t\t\"fov\":1.05,\n\t\t\t\"guid\":\"00000000-0000-0000-0000-000000000004\",\n\t\t\t\"hideIfc\":true,\n\t\t\t\"look_at\":[35000.0,40000.0,8000.0],\n\t\t\t\"near\":600.0,\n\t\t\t\"position\":[-70000.0,120000.0,150000.0],\n\t\t\t\"right\":[0.8,-0.3,0.6],\n\t\t\t\"screenshot\":\"acme/00000000-0000-0000-0000-000000000000/risks/00000000-0000-0000-0000-000000000002/viewpoints/00000000-0000-0000-0000-000000000003/screenshot.png\",\n\t\t\t\"screenshotSmall\":\"acme/00000000-0000-0000-0000-000000000000/risks/00000000-0000-0000-0000-000000000002/viewpoints/00000000-0000-0000-0000-000000000003/screenshotSmall.png\",\n\t\t\t\"up\":[0.3,0.9,-0.3],\n\t\t\t\"view_dir\":[0.5,-0.4,-0.7]\n\t\t}\n\t}\n]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/risks HTTP/1.1",
        "type": "get"
      },
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/revision/00000000-0000-0000-0000-000000000001/risks HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/risk.js",
    "groupTitle": "SafetiBase Risks"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model[/revision/:revId]/risks.html",
    "title": "Render risks as HTML",
    "name": "renderRisksHTML",
    "group": "Risks",
    "description": "<p>Retrieve HTML page of all risks.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "revId",
            "description": "<p>Revision ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "String",
            "optional": false,
            "field": "ids",
            "description": "<p>Risk IDs to show</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "risks",
            "description": "<p>Risk objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<html page>",
          "type": "html"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/risks.html?[query] HTTP/1.1",
        "type": "get"
      },
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/revision/00000000-0000-0000-0000-000000000001/risks.html?[query] HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/risk.js",
    "groupTitle": "SafetiBase Risks"
  },
  {
    "type": "post",
    "url": "/:teamspace/:model[/revision/:revId]/risks",
    "title": "Create a risk",
    "name": "storeRisk",
    "group": "Risks",
    "description": "<p>Create a model risk.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "revId",
            "description": "<p>Revision ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Risk name</p>"
          },
          {
            "group": "Request body",
            "type": "String[]",
            "optional": false,
            "field": "assigned_roles",
            "description": "<p>Risk owner</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "associated_activity",
            "description": "<p>Associated activity</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Category</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "consequence",
            "description": "<p>Risk consequence (0: very low, 1: low, 2: moderate, 3: high, 4: very high)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "desc",
            "description": "<p>Risk description</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "element",
            "description": "<p>Element type</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "likelihood",
            "description": "<p>Risk likelihood (0: very low, 1: low, 2: moderate, 3: high, 4: very high)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "location_desc",
            "description": "<p>Location description</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "mitigation_status",
            "description": "<p>Treatment status</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "mitigation_desc",
            "description": "<p>Treatment summary</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "mitigation_detail",
            "description": "<p>Treatment detailed description</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "mitigation_stage",
            "description": "<p>Treatment stage</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "mitigation_type",
            "description": "<p>Treatment type</p>"
          },
          {
            "group": "Request body",
            "type": "Number[3]",
            "optional": false,
            "field": "position",
            "description": "<p>Risk pin coordinates</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "residual_consequence",
            "description": "<p>Treated risk consequence (-1: unset, 0: very low, 1: low, 2: moderate, 3: high, 4: very high)</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "residual_likelihood",
            "description": "<p>Treated risk likelihood (-1: unset, 0: very low, 1: low, 2: moderate, 3: high, 4: very high)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "residual_risk",
            "description": "<p>Residual risk</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "risk_factor",
            "description": "<p>Risk factor</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "scope",
            "description": "<p>Construction scope</p>"
          },
          {
            "group": "Request body",
            "type": "Viewpoint",
            "optional": false,
            "field": "viewpoint",
            "description": "<p>Viewpoint</p>"
          }
        ],
        "Type: Viewpoint": [
          {
            "group": "Type: Viewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "right",
            "description": "<p>Right vector of viewpoint indicating the direction of right in relative coordinates</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "up",
            "description": "<p>Up vector of viewpoint indicating the direction of up in relative coordinates</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "position",
            "description": "<p>Position vector indicates where in the world the viewpoint is positioned</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "look_at",
            "description": "<p>Vector indicating where in the world the viewpoint is looking at</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "view_dir",
            "description": "<p>Vector indicating the direction the viewpoint is looking at in relative coordinates</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number",
            "optional": false,
            "field": "near",
            "description": "<p>Vector indicating the near plane</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number",
            "optional": false,
            "field": "far",
            "description": "<p>Vector indicating the far plane</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number",
            "optional": false,
            "field": "fov",
            "description": "<p>Angle of the field of view</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Number",
            "optional": false,
            "field": "aspect_ratio",
            "description": "<p>Aspect ratio of the fustrum</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "ClippingPlane[]",
            "optional": true,
            "field": "clippingPlanes",
            "description": "<p>Clipping planes associated with the viewpoint</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "String",
            "optional": true,
            "field": "highlighted_group_id",
            "description": "<p>If the viewpoint is associated with one or more highlighted objects from the model this field has the value of a group ID generated to hold those objects</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "String",
            "optional": true,
            "field": "hidden_group_id",
            "description": "<p>If the viewpoint is associated with one or more hidden objects from the model this field has the value of a group id generated to hold those objects</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "String",
            "optional": true,
            "field": "shown_group_id",
            "description": "<p>If the viewpoint is associated with one or more shown objects from the model this field has the value of a group id generated to hold those objects</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Group",
            "optional": true,
            "field": "highlighted_group",
            "description": "<p>If the viewpoint is associated with one or more highlighted objects from the model this field has the value of a group definition for those objects (this shouldnt be use simultaneously with highlighted_group_id)</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Group",
            "optional": true,
            "field": "hidden_group",
            "description": "<p>If the viewpoint is associated with one or more hidden objects from the model this field has the value of a group id generated to hold those objects (this shouldnt be use simultaneously with hidden_group_id)</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Group",
            "optional": true,
            "field": "shown_group",
            "description": "<p>If the viewpoint is associated with one or more shown objects from the model this field has the definition of the group to hold those objects (this shouldnt be use simultaneously with shown_group_id)</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Group[]",
            "optional": true,
            "field": "override_groups",
            "description": "<p>If the viewpoint has one or more objects with colour override this field has an array of groups with one group for each colour</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "Boolean",
            "optional": false,
            "field": "hide_IFC",
            "description": "<p>A flag to hide the IFC</p>"
          },
          {
            "group": "Type: Viewpoint",
            "type": "String",
            "optional": false,
            "field": "screenshot",
            "description": "<p>Base64 string representing the screenshot associated with the viewpoint</p>"
          }
        ],
        "Type: Group": [
          {
            "group": "Type: Group",
            "type": "Number[3]",
            "optional": false,
            "field": "color",
            "description": "<p>RGB colour values</p>"
          },
          {
            "group": "Type: Group",
            "type": "ModelObjects",
            "optional": false,
            "field": "objects",
            "description": "<p>List of objects in group</p>"
          }
        ],
        "Type: ModelObjects": [
          {
            "group": "Type: ModelObjects",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>The account that has the model which contains the objects</p>"
          },
          {
            "group": "Type: ModelObjects",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>The model id that contains the objects</p>"
          },
          {
            "group": "Type: ModelObjects",
            "type": "String[]",
            "optional": false,
            "field": "shared_ids",
            "description": "<p>The shared ids of objects to be selected</p>"
          }
        ],
        "Type: ClippingPlane": [
          {
            "group": "Type: ClippingPlane",
            "type": "Number[3]",
            "optional": false,
            "field": "normal",
            "description": "<p>The normal of the plane defined for the clipping plane</p>"
          },
          {
            "group": "Type: ClippingPlane",
            "type": "Number",
            "optional": false,
            "field": "distance",
            "description": "<p>The distance for the clipping plane to the origin</p>"
          },
          {
            "group": "Type: ClippingPlane",
            "type": "Number",
            "optional": false,
            "field": "clipDirection",
            "description": "<p>The direction to the clipping plane will cut the model; above or below the plane. Possible values: 1 , -1.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /acme/00000000-0000-0000-0000-000000000000/risks HTTP/1.1\n{\n\t\"assigned_roles\":[\n\t\t\"Job1\"\n\t],\n\t\"associated_activity\":\"\",\n\t\"category\":\"safety_fall\",\n\t\"comments\":[],\n\t\"consequence\":0,\n\t\"creator_role\":\"Job4\",\n\t\"desc\":\"Risk description that describes the risk\",\n\t\"element\":\"Doors\",\n\t\"level_of_risk\":0,\n\t\"likelihood\":0,\n\t\"location_desc\":\"Tower 3 - Level 2\",\n\t\"mitigation_desc\":\"Erect temporary barrier\",\n\t\"mitigation_detail\":\"Erect a temporary 1.5m metal barrier along edge\",\n\t\"mitigation_stage\":\"Construction stage 5\",\n\t\"mitigation_status\":\"proposed\",\n\t\"mitigation_type\":\"Eliminate\",\n\t\"name\":\"Risk 1\",\n\t\"overall_level_of_risk\":0,\n\t\"position\":[55000.0,80000.0,-10000.0],\n\t\"residual_consequence\":-1,\n\t\"residual_level_of_risk\":-1,\n\t\"residual_likelihood\":-1,\n\t\"residual_risk\":\"\",\n\t\"risk_factor\":\"Factor 9\",\n\t\"safetibase_id\":\"\",\n\t\"scope\":\"Tower 3\",\n\t\"viewpoint\":{\n\t\t\"aspect_ratio\":1.4,\n\t\t\"clippingPlanes\":[],\n\t\t\"far\":300000,\n\t\t\"fov\":1.05,\n\t\t\"hideIfc\":true,\n\t\t\"highlighted_group_id\":\"\",\n\t\t\"look_at\":[35000.0,40000.0,8000.0],\n\t\t\"near\":600.0,\n\t\t\"position\":[-70000.0,120000.0,150000.0],\n\t\t\"right\":[0.8,-0.3,0.6],\n\t\t\"up\":[0.3,0.9,-0.3],\n\t\t\"view_dir\":[0.5,-0.4,-0.7],\n\t\t\"screenshot\":<base64 image>\n\t}\n}",
        "type": "post"
      },
      {
        "title": "Example usage:",
        "content": "POST /acme/00000000-0000-0000-0000-000000000000/revision/00000000-0000-0000-0000-000000000001/risks HTTP/1.1\n{\n\t\"assigned_roles\":[\n\t\t\"Job1\"\n\t],\n\t\"associated_activity\":\"\",\n\t\"category\":\"safety_fall\",\n\t\"comments\":[],\n\t\"consequence\":0,\n\t\"creator_role\":\"Job4\",\n\t\"desc\":\"Risk description that describes the risk\",\n\t\"element\":\"Doors\",\n\t\"level_of_risk\":0,\n\t\"likelihood\":0,\n\t\"location_desc\":\"Tower 3 - Level 2\",\n\t\"mitigation_desc\":\"Erect temporary barrier\",\n\t\"mitigation_detail\":\"Erect a temporary 1.5m metal barrier along edge\",\n\t\"mitigation_stage\":\"Construction stage 5\",\n\t\"mitigation_status\":\"proposed\",\n\t\"mitigation_type\":\"Eliminate\",\n\t\"name\":\"Risk 1\",\n\t\"overall_level_of_risk\":0,\n\t\"position\":[55000.0,80000.0,-10000.0],\n\t\"residual_consequence\":-1,\n\t\"residual_level_of_risk\":-1,\n\t\"residual_likelihood\":-1,\n\t\"residual_risk\":\"\",\n\t\"risk_factor\":\"Factor 9\",\n\t\"safetibase_id\":\"\",\n\t\"scope\":\"Tower 3\",\n\t\"viewpoint\":{\n\t\t\"aspect_ratio\":1.4,\n\t\t\"clippingPlanes\":[],\n\t\t\"far\":300000,\n\t\t\"fov\":1.05,\n\t\t\"hideIfc\":true,\n\t\t\"highlighted_group_id\":\"\",\n\t\t\"look_at\":[35000.0,40000.0,8000.0],\n\t\t\"near\":600.0,\n\t\t\"position\":[-70000.0,120000.0,150000.0],\n\t\t\"right\":[0.8,-0.3,0.6],\n\t\t\"up\":[0.3,0.9,-0.3],\n\t\t\"view_dir\":[0.5,-0.4,-0.7],\n\t\t\"screenshot\":<base64 image>\n\t}\n}",
        "type": "post"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"_id\":\"00000000-0000-0000-0000-000000000002\",\n\t\"account\":\"acme\",\n\t\"assigned_roles\":[\n\t\t\"Job1\"\n\t],\n\t\"associated_activity\":\"\",\n\t\"category\":\"safety_fall\",\n\t\"comments\":[],\n\t\"consequence\":0,\n\t\"created\":1567156228976,\n\t\"creator_role\":\"Job4\",\n\t\"desc\":\"Risk description that describes the risk\",\n\t\"element\":\"Doors\",\n\t\"level_of_risk\":0,\n\t\"likelihood\":0,\n\t\"location_desc\":\"Tower 3 - Level 2\",\n\t\"mitigation_desc\":\"Erect temporary barrier\",\n\t\"mitigation_detail\":\"Erect a temporary 1.5m metal barrier along edge\",\n\t\"mitigation_stage\":\"Construction stage 5\",\n\t\"mitigation_status\":\"proposed\",\n\t\"mitigation_type\":\"Eliminate\",\n\t\"model\":\"00000000-0000-0000-0000-000000000000\",\n\t\"name\":\"Risk 1\",\n\t\"overall_level_of_risk\":0,\n\t\"owner\":\"alice\",\n\t\"position\":[55000.0,80000.0,-10000.0],\n\t\"residual_consequence\":-1,\n\t\"residual_level_of_risk\":-1,\n\t\"residual_likelihood\":-1,\n\t\"residual_risk\":\"\",\n\t\"rev_id\":\"00000000-0000-0000-0000-000000000001\",\n\t\"risk_factor\":\"Factor 9\",\n\t\"safetibase_id\":\"\",\n\t\"scope\":\"Tower 3\",\n\t\"thumbnail\":\"acme/00000000-0000-0000-0000-000000000000/risks/00000000-0000-0000-0000-000000000002/thumbnail.png\",\n\t\"viewpoint\":{\n\t\t\"aspect_ratio\":1.4,\n\t\t\"clippingPlanes\":[],\n\t\t\"far\":300000,\n\t\t\"fov\":1.05,\n\t\t\"guid\":\"00000000-0000-0000-0000-000000000004\",\n\t\t\"hideIfc\":true,\n\t\t\"look_at\":[35000.0,40000.0,8000.0],\n\t\t\"near\":600.0,\n\t\t\"position\":[-70000.0,120000.0,150000.0],\n\t\t\"right\":[0.8,-0.3,0.6],\n\t\t\"screenshot\":\"acme/00000000-0000-0000-0000-000000000000/risks/00000000-0000-0000-0000-000000000002/viewpoints/00000000-0000-0000-0000-000000000003/screenshot.png\",\n\t\t\"screenshotSmall\":\"acme/00000000-0000-0000-0000-000000000000/risks/00000000-0000-0000-0000-000000000002/viewpoints/00000000-0000-0000-0000-000000000003/screenshotSmall.png\",\n\t\t\"up\":[0.3,0.9,-0.3],\n\t\t\"view_dir\":[0.5,-0.4,-0.7]\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/risk.js",
    "groupTitle": "SafetiBase Risks"
  },
  {
    "type": "patch",
    "url": "/:teamspace/:model[/revision/:revId]/risks/:riskId",
    "title": "Update risk",
    "name": "updateRisk",
    "group": "Risks",
    "description": "<p>Update model risk.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "revId",
            "description": "<p>Revision ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "riskId",
            "description": "<p>Risk ID</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Risk name</p>"
          },
          {
            "group": "Request body",
            "type": "String[]",
            "optional": false,
            "field": "assigned_roles",
            "description": "<p>Risk owner</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "associated_activity",
            "description": "<p>Associated activity</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Category</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "consequence",
            "description": "<p>Risk consequence (0: very low, 1: low, 2: moderate, 3: high, 4: very high)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "desc",
            "description": "<p>Risk description</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "element",
            "description": "<p>Element type</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "likelihood",
            "description": "<p>Risk likelihood (0: very low, 1: low, 2: moderate, 3: high, 4: very high)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "location_desc",
            "description": "<p>Location description</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "mitigation_status",
            "description": "<p>Treatment status</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "mitigation_desc",
            "description": "<p>Treatment summary</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "mitigation_detail",
            "description": "<p>Treatment detailed description</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "mitigation_stage",
            "description": "<p>Treatment stage</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "mitigation_type",
            "description": "<p>Treatment type</p>"
          },
          {
            "group": "Request body",
            "type": "Number[3]",
            "optional": false,
            "field": "position",
            "description": "<p>Risk pin coordinates</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "residual_consequence",
            "description": "<p>Treated risk consequence (-1: unset, 0: very low, 1: low, 2: moderate, 3: high, 4: very high)</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "residual_likelihood",
            "description": "<p>Treated risk likelihood (-1: unset, 0: very low, 1: low, 2: moderate, 3: high, 4: very high)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "residual_risk",
            "description": "<p>Residual risk</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "risk_factor",
            "description": "<p>Risk factor</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "scope",
            "description": "<p>Construction scope</p>"
          },
          {
            "group": "Request body",
            "type": "Viewpoint",
            "optional": false,
            "field": "viewpoint",
            "description": "<p>Viewpoint</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "PATCH /acme/00000000-0000-0000-0000-000000000000/risks/00000000-0000-0000-0000-000000000002 HTTP/1.1\n{\n\t\"residual_likelihood\":1\n}",
        "type": "patch"
      },
      {
        "title": "Example usage:",
        "content": "PATCH /acme/00000000-0000-0000-0000-000000000000/revision/00000000-0000-0000-0000-000000000001/risks/00000000-0000-0000-0000-000000000002 HTTP/1.1\n{\n\t\"residual_likelihood\":1\n}",
        "type": "patch"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"_id\":\"00000000-0000-0000-0000-000000000002\",\n\t\"account\":\"acme\",\n\t\"assigned_roles\":[\n\t\t\"Job1\"\n\t],\n\t\"associated_activity\":\"\",\n\t\"category\":\"safety_fall\",\n\t\"comments\":[],\n\t\"consequence\":0,\n\t\"created\":1567156228976,\n\t\"creator_role\":\"Job4\",\n\t\"desc\":\"Risk description that describes the risk\",\n\t\"element\":\"Doors\",\n\t\"level_of_risk\":0,\n\t\"likelihood\":0,\n\t\"location_desc\":\"Tower 3 - Level 2\",\n\t\"mitigation_desc\":\"Erect temporary barrier\",\n\t\"mitigation_detail\":\"Erect a temporary 1.5m metal barrier along edge\",\n\t\"mitigation_stage\":\"Construction stage 5\",\n\t\"mitigation_status\":\"proposed\",\n\t\"mitigation_type\":\"Eliminate\",\n\t\"model\":\"00000000-0000-0000-0000-000000000000\",\n\t\"name\":\"Risk 1\",\n\t\"owner\":\"alice\",\n\t\"overall_level_of_risk\":0,\n\t\"position\":[55000.0,80000.0,-10000.0],\n\t\"residual_consequence\":-1,\n\t\"residual_level_of_risk\":-1,\n\t\"residual_likelihood\":1,\n\t\"residual_risk\":\"\",\n\t\"rev_id\":\"00000000-0000-0000-0000-000000000001\",\n\t\"risk_factor\":\"Factor 9\",\n\t\"safetibase_id\":\"\",\n\t\"scope\":\"Tower 3\",\n\t\"thumbnail\":\"acme/00000000-0000-0000-0000-000000000000/risks/00000000-0000-0000-0000-000000000002/thumbnail.png\",\n\t\"viewpoint\":{\n\t\t\"aspect_ratio\":1.4,\n\t\t\"clippingPlanes\":[],\n\t\t\"far\":300000,\n\t\t\"fov\":1.05,\n\t\t\"guid\":\"00000000-0000-0000-0000-000000000004\",\n\t\t\"hideIfc\":true,\n\t\t\"look_at\":[35000.0,40000.0,8000.0],\n\t\t\"near\":600.0,\n\t\t\"position\":[-70000.0,120000.0,150000.0],\n\t\t\"right\":[0.8,-0.3,0.6],\n\t\t\"screenshot\":\"acme/00000000-0000-0000-0000-000000000000/risks/00000000-0000-0000-0000-000000000002/viewpoints/00000000-0000-0000-0000-000000000003/screenshot.png\",\n\t\t\"screenshotSmall\":\"acme/00000000-0000-0000-0000-000000000000/risks/00000000-0000-0000-0000-000000000002/viewpoints/00000000-0000-0000-0000-000000000003/screenshotSmall.png\",\n\t\t\"up\":[0.3,0.9,-0.3],\n\t\t\"view_dir\":[0.5,-0.4,-0.7]\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/risk.js",
    "groupTitle": "SafetiBase Risks"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision(/master/head/|/:revId)/sequences/:sequenceId/state/:stateId",
    "title": "Get state",
    "name": "getSequenceState",
    "group": "Sequences",
    "description": "<p>Get state of model in sequence.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sequenceId",
            "description": "<p>Sequence unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "stateId",
            "description": "<p>State unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "revId",
            "description": "<p>Revision unique ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage (/master/head)",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/revision/master/head/sequences/00000000-0000-0000-0000-000000000002/state/00000000-0000-0000-0001-000000000002 HTTP/1.1",
        "type": "get"
      },
      {
        "title": "Example usage (/:revId)",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/revision/00000000-0000-0000-0000-000000000001/sequences/00000000-0000-0000-0000-000000000002/state/00000000-0000-0000-0001-000000000002 HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"transparency\":[\n\t\t{\n\t\t\t\"value\":1,\n\t\t\t\"shared_ids\":[\n\t\t\t\t11111111-1111-1111-1111-111111111111,\n\t\t\t\t22222222-2222-2222-2222-222222222222,\n\t\t\t\t33333333-3333-3333-3333-333333333333\n\t\t\t]\n\t\t}\n\t],\n\t\"color\":[\n\t\t{\n\t\t\t\"value\":[\n\t\t\t\t0,\n\t\t\t\t1,\n\t\t\t\t0\n\t\t\t],\n\t\t\t\"shared_ids\":[\n\t\t\t\t44444444-4444-4444-4444-444444444444,\n\t\t\t\t55555555-5555-5555-5555-555555555555,\n\t\t\t\t66666666-6666-6666-6666-666666666666\n\t\t\t]\n\t\t}\n\t],\n\t\"transform\":[\n\t\t{\n\t\t\t\"value\":[\n\t\t\t\t1, 0, 0, -0.0036411285400390625,\n\t\t\t\t0, 1, 0, 0.0012891292572021484,\n\t\t\t\t0, 0, 1, 0,\n\t\t\t\t0, 0, 0, 1\n\t\t\t],\n\t\t\t\"shared_ids\":[\n\t\t\t\t77777777-7777-7777-7777-777777777777,\n\t\t\t\t88888888-8888-8888-8888-888888888888,\n\t\t\t\t99999999-9999-9999-9999-999999999999\n\t\t\t]\n\t\t},\n\t\t{\n\t\t\t\"value\":[\n\t\t\t\t1, 0, 0, -0.0036411285400390625,\n\t\t\t\t0, 1, 0, 0.0012891292572021484,\n\t\t\t\t0, 0, 1, 0,\n\t\t\t\t0, 0, 0, 1\n\t\t\t],\n\t\t\t\"shared_ids\":[\n\t\t\t\t66666666-6666-6666-6666-666666666666\n\t\t\t]\n\t\t},\n\t\t{\n\t\t\t\"value\":[\n\t\t\t\t1, 0, 0, -0.0036411285400390625,\n\t\t\t\t0, 1, 0, 0.0012891292572021484,\n\t\t\t\t0, 0, 1, 0,\n\t\t\t\t0, 0, 0, 1\n\t\t\t],\n\t\t\t\"shared_ids\":[\n\t\t\t\t44444444-4444-4444-4444-444444444444,\n\t\t\t\taaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa,\n\t\t\t\tbbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb,\n\t\t\t\tcccccccc-cccc-cccc-cccc-cccccccccccc\n\t\t\t]\n\t\t}\n\t]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/sequence.js",
    "groupTitle": "Sequences"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/revision(/master/head/|/:revId)/sequences",
    "title": "List all sequences",
    "name": "listSequences",
    "group": "Sequences",
    "description": "<p>List all sequences associated with the model.</p>",
    "examples": [
      {
        "title": "Example usage (/master/head)",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/revision/master/head/sequences HTTP/1.1",
        "type": "get"
      },
      {
        "title": "Example usage (/:revId)",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/revision/00000000-0000-0000-0000-000000000001/sequences HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n[\n\t{\n\t\t\"teamspace\":\"alice\",\n\t\t\"model\":\"00000000-0000-0000-0000-000000000000\",\n\t\t\"rev_id\":\"00000000-0000-0000-0000-000000000001\",\n\t\t\"name\":\"Sequence 1\",\n\t\t\"frames\":[\n\t\t\t{\n\t\t\t\t\"dateTime\":1244246400000,\n\t\t\t\t\"state\":\"00000000-0000-0000-0001-000000000002\",\n\t\t\t\t\"tasks\":[\n\t\t\t\t\t{\n\t\t\t\t\t\t\"name\":\"Task 1\",\n\t\t\t\t\t\t\"startDate\":1244246400000,\n\t\t\t\t\t\t\"endDate\":1244246410000,\n\t\t\t\t\t\t\"_id\":\"00000000-0000-0001-0001-000000000002\"\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\t\"name\":\"Task 2\",\n\t\t\t\t\t\t\"startDate\":1244246410000,\n\t\t\t\t\t\t\"endDate\":1244246420000,\n\t\t\t\t\t\t\"_id\":\"00000000-0000-0002-0001-000000000002\"\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\t\"name\":\"Task 3\",\n\t\t\t\t\t\t\"startDate\":1244246420000,\n\t\t\t\t\t\t\"endDate\":1244246430000,\n\t\t\t\t\t\t\"_id\":\"00000000-0000-0003-0001-000000000002\"\n\t\t\t\t\t}\n\t\t\t\t]\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"dateTime\":1244419200000,\n\t\t\t\t\"state\":\"00000000-0000-0000-0002-000000000002\"\n\t\t\t\t\"tasks\":[\n\t\t\t\t\t{\n\t\t\t\t\t\t\"name\":\"Task 2\",\n\t\t\t\t\t\t\"startDate\":1244419200000,\n\t\t\t\t\t\t\"endDate\":1245369600000,\n\t\t\t\t\t\t\"_id\":\"00000000-0000-0001-0002-000000000002\"\n\t\t\t\t\t}\n\t\t\t\t]\n\t\t\t}\n\t\t],\n\t\t\"_id\":\"00000000-0000-0000-0000-000000000002\"\n\t}\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/sequence.js",
    "groupTitle": "Sequences",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "revId",
            "description": "<p>Revision unique ID</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/subscriptions",
    "title": "List subscriptions",
    "name": "listSubscriptions",
    "group": "Subscription",
    "description": "<p>List all subscriptions for current user if applicable.</p>",
    "permission": [
      {
        "name": "teamSpaceAdmin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/subscriptions HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n   basic: {\n      collaborators: 0,\n      data: 200\n   },\n   discretionary: {\n      collaborators: \"unlimited\",\n      data: 10240,\n      expiryDate: null\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "NOT_AUTHORIZED",
            "description": "<p>Not Authorized</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 401 Not Authorized\n{\n\t\"message\":\"Not Authorized\",\n\t\"status\":401,\"code\":\n\t\"NOT_AUTHORIZED\",\n\t\"value\":9,\n\t\"place\":\"GET /teamSpace1/subscriptions\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/subscriptions.js",
    "groupTitle": "Subscription"
  },
  {
    "type": "post",
    "url": "/:teamspace/members",
    "title": "Add a team member",
    "name": "addTeamMember",
    "group": "Teamspace",
    "description": "<p>Adds a user to a teamspace and assign it a job.</p>",
    "permission": [
      {
        "name": "teamSpaceAdmin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "job",
            "description": "<p>The job that the users going to have assigned</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>The username of the user to become a member</p>"
          },
          {
            "group": "Request body",
            "type": "String[]",
            "optional": false,
            "field": "permissions",
            "description": "<p>The permisions to be assigned to the member it can be an empty array or have a &quot;teamspace_admin&quot; value.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /teamSpace1/members HTTP/1.1\n{\n   job: \"jobA\",\n   user: \"projectshared\",\n   permissions: []\n}",
        "type": "post"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n   job: \"jobA\",\n   permissions: [],\n   user: \"projectshared\",\n   firstName: \"Drink\",\n   lastName: \"Coffee\",\n   company: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/teamspace.js",
    "groupTitle": "Teamspace"
  },
  {
    "type": "get",
    "url": "/:teamspace/members/search/:searchString",
    "title": "Search for non-members",
    "name": "findUsersWithoutMembership",
    "group": "Teamspace",
    "description": "<p>It returns a list of users that dont belong to the teamspace and that their usernames matches partially with the string and if entered an email it only matches if the string is the entire email address.</p> <p>In the result it's included their username, first name, last name, company and roles in other teamspaces.</p>",
    "permission": [
      {
        "name": "teamSpaceAdmin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": "<p>Search string provided to find member</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/members/search/project HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n\n[\n   {\n      user: \"projectowner\",\n      roles: [\n         {\n            role: \"team_member\",\n            db: \"projectowner\"\n         }\n      ],\n      firstName: \"Project\",\n      lastName: \"Owner\",\n      company: null\n   },\n   {\n      user: \"projectshared\",\n      roles: [\n         {\n            role: \"team_member\",\n            db: \"projectshared\"\n         }\n      ],\n      firstName: \"Drink\",\n      lastName: \"Coffee\",\n      company: null\n   },\n   {\n      user: \"project_username\",\n      roles: [\n         {\n            role: \"team_member\",\n            db: \"project_username\"\n         }\n      ],\n      firstName: \"George\",\n      lastName: \"Crown\",\n       company: null\n   },\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/teamspace.js",
    "groupTitle": "Teamspace"
  },
  {
    "type": "get",
    "url": "/:teamspace/billingInfo",
    "title": "Get billing info",
    "name": "getBillingInfo",
    "group": "Teamspace",
    "description": "<p>It returns the teamspace billing info.</p>",
    "permission": [
      {
        "name": "teamSpaceAdmin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/billingInfo HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   vat: \"GB 365684514\",\n   line1: \"10 Downing Street\",\n   postalCode: \"SW1A 2AA\",\n   city: \"London\",\n   company: \"Teamspace one\",\n   countryCode: \"GB\",\n   lastName: \"Voorhees\",\n   firstName: \"Jason\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/teamspace.js",
    "groupTitle": "Teamspace"
  },
  {
    "type": "get",
    "url": "/:teamspace/members/:user",
    "title": "Get member's info",
    "name": "getMemberInfo",
    "group": "Teamspace",
    "description": "<p>It returns the teamspace's member small info .</p>",
    "permission": [
      {
        "name": "teamSpaceMember"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>The username of the user you wish to query</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/members/viewerTeamspace1Model1JobB HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   user: \"viewerTeamspace1Model1JobB\",\n   firstName: \"Alice\",\n   lastName: \"Stratford\",\n   company: \"Teamspace one\",\n   job: {\"_id\": \"Job1\", color: \"#FFFFFF\"}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/teamspace.js",
    "groupTitle": "Teamspace"
  },
  {
    "type": "get",
    "url": "/:teamspace/members",
    "title": "Get members list",
    "name": "getMemberList",
    "group": "Teamspace",
    "description": "<p>It returns a list of members identifying which of them are teamspace administrators, and their jobs.</p>",
    "permission": [
      {
        "name": "teamSpaceMember"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/members HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   members: [\n      {\n         user: \"teamSpace1\",\n         firstName: \"Teamspace\",\n         lastName: \"One\",\n         company: \"Teamspace one\",\n         permissions: [\n            \"teamspace_admin\"\n         ],\n         job: \"jobA\",\n         isCurrentUser: true\n      },\n      {\n         user: \"unassignedTeamspace1UserJobA\",\n         firstName: \"John\",\n         lastName: \"Williams\",\n         company: \"Teamspace One\",\n         permissions: [],\n         job: \"jobA\",\n         isCurrentUser: false\n      },\n      {\n         user: \"viewerTeamspace1Model1JobB\",\n         firstName: \"Alice\",\n         lastName: \"Stratford\",\n         company: \"Teamspace one\",\n         permissions: [],\n         job: \"jobB\",\n         isCurrentUser: false\n      }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/teamspace.js",
    "groupTitle": "Teamspace"
  },
  {
    "type": "get",
    "url": "/:teamspace/settings/mitigations.csv",
    "title": "Download mitigations file",
    "name": "getMitigationsFile",
    "group": "Teamspace",
    "description": "<p>Returns a CSV file containing all defined suggested risk mitigations.</p>",
    "examples": [
      {
        "title": "Example usage",
        "content": "GET /acme/settings/mitigations.csv HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<Risk mitigations CSV file>",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/teamspace.js",
    "groupTitle": "Teamspace",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/:teamspace/quota",
    "title": "Get Quota Information",
    "name": "getQuotaInfo",
    "group": "Teamspace",
    "description": "<p>It returns the quota information. Each teamspace has a space limit and a limit of collaborators. The values returned are  space used (both these values are in bytes) and the collaborator limit. If spaceLimit or collaboratorLimit are nulled it means that there are no space limit/member limit.</p>",
    "permission": [
      {
        "name": "teamSpaceAdmin"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /teamSpace1/quota HTTP/1.1",
        "type": "get"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n    spaceLimit: 1048576,\n\t   collaboratorLimit: 12,\n    spaceUsed: 2048\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/teamspace.js",
    "groupTitle": "Teamspace"
  },
  {
    "type": "get",
    "url": "/:teamspace/settings",
    "title": "Get teamspace settings",
    "name": "getTeamspaceSettings",
    "group": "Teamspace",
    "description": "<p>Returns all teamspace settings.</p>",
    "examples": [
      {
        "title": "Example usage",
        "content": "GET /acme/settings HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"riskCategories\":[\n\t\t\"Commercial Issue\",\n\t\t\"Environmental Issue\",\n\t\t\"Health - Material effect\",\n\t\t\"Health - Mechanical effect\",\n\t\t\"Safety Issue - Fall\",\n\t\t\"Safety Issue - Trapped\",\n\t\t\"Safety Issue - Event\",\n\t\t\"Safety Issue - Handling\",\n\t\t\"Safety Issue - Struck\",\n\t\t\"Safety Issue - Public\",\n\t\t\"Social Issue\",\n\t\t\"Other Issue\",\n\t\t\"UNKNOWN\"\n\t],\n\t\"topicTypes\":[\n\t\t\"For information\",\n\t\t\"VR\",\n\t\t\"Clash\",\n\t\t\"Diff\",\n\t\t\"RFI\",\n\t\t\"Risk\",\n\t\t\"H&S\",\n\t\t\"Design\",\n\t\t\"Constructibility\",\n\t\t\"GIS\"\n\t],\n\t\"mitigationsUpdatedAt\":1567156228976,\n\t\"_id\":\"acme\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/teamspace.js",
    "groupTitle": "Teamspace",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/:teamspace/members/:user",
    "title": "Remove from the teamspace",
    "name": "removeTeamMember",
    "group": "Teamspace",
    "description": "<p>Removes a user from the teampspace.</p>",
    "permission": [
      {
        "name": "teamSpaceAdmin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>Username of the member to remove</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "DELETE /teamSpace1/members/viewerTeamspace1Model1JobB HTTP/1.1",
        "type": "delete"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   user: \"viewerTeamspace1Model1JobB\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/teamspace.js",
    "groupTitle": "Teamspace"
  },
  {
    "type": "patch",
    "url": "/:teamspace/settings",
    "title": "Update teamspace settings",
    "name": "updateTeamspaceSettings",
    "group": "Teamspace",
    "description": "<p>Update teamspace settings.</p>",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String[]",
            "optional": true,
            "field": "riskCategories",
            "description": "<p>List of risk categories</p>"
          },
          {
            "group": "Request body",
            "type": "String[]",
            "optional": true,
            "field": "topicTypes",
            "description": "<p>List of issue topic types</p>"
          }
        ],
        "Risk category": [
          {
            "group": "Risk category",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>Value of risk category</p>"
          },
          {
            "group": "Risk category",
            "type": "String",
            "optional": false,
            "field": "label",
            "description": "<p>Label for risk category</p>"
          }
        ],
        "Topic type": [
          {
            "group": "Topic type",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>Value of topic type</p>"
          },
          {
            "group": "Topic type",
            "type": "String",
            "optional": false,
            "field": "label",
            "description": "<p>Label for topic type</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage",
        "content": "PUT /acme/settings HTTP/1.1\n{\n\t\"topicTypes\":[\n\t\t\"New Topic 1\",\n\t\t\"New Topic 2\"\n\t],\n\t\"riskCategories\":[\n\t\t\"New Category 1\",\n\t\t\"NEW CATEGORY 2\"\n\t]\n}",
        "type": "put"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"riskCategories\":[\n\t\t\"New Category 1\",\n\t\t\"NEW CATEGORY 2\"\n\t],\n\t\"topicTypes\":[\n\t\t\"New Topic 1\",\n\t\t\"New Topic 2\"\n\t],\n\t\"mitigationsUpdatedAt\":1567156228976,\n\t\"_id\":\"acme\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/teamspace.js",
    "groupTitle": "Teamspace"
  },
  {
    "type": "post",
    "url": "/:teamspace/settings/mitigations.csv",
    "title": "Upload mitigations file",
    "name": "upload__MitigationsFile",
    "group": "Teamspace",
    "description": "<p>Upload a risk mitigations CSV file to a teamspace.</p>",
    "examples": [
      {
        "title": "Example usage",
        "content": "POST /acme/settings/mitigations.csv HTTP/1.1\n<Risk mitigations CSV file>",
        "type": "post"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"status\":\"ok\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/teamspace.js",
    "groupTitle": "Teamspace",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/starredMeta",
    "title": "Gets the starred metadata tags for the logged user",
    "description": "<p>This endpoint returns the starred metadata tags. You can manage the starred metadata in the frontend from BIM (i) icon in the viewer.</p>",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[\n   \"material\",\n   \"color\",\n   \"base offset\"\n]",
          "type": "json"
        }
      ]
    },
    "name": "GetStarredMetadataTags",
    "group": "User",
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/starredModels",
    "title": "Gets the starred models for the logged user",
    "name": "GetStarredModels",
    "group": "User",
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/starredMeta",
    "title": "Replaces the whole starred metadata tags array for the logged user",
    "name": "SetMetadataTags",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": true,
            "field": "String",
            "description": "<p>(Request body) An array of tags to be starred</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "   [\n   \t\"material\",\n\t  \t\"color\"\n\t  ]",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n\t  {}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>BadRequest The request was malformed</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/starredModels",
    "title": "Sets the whole starred models for the logged user",
    "name": "SetStarredModels",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": true,
            "field": "String",
            "description": "<p>An array of models to be starred, belong to the teamspace</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "   {\n    \t\"user1\": [\"c7d9184a-83d3-4ef0-975c-ba2ced888e79\"],\n    \t\"user2\": [\"4d17e126-8238-432d-a421-93819373e21a\", \"0411e74a-0661-48f9-bf4f-8eabe4a673a0\"]\n\t  }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n\t  {}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>BadRequest The request was malformed</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/starredMeta",
    "title": "Adds a starred metadata tag for the logged user",
    "name": "StarMetadataTags",
    "group": "User",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "tag",
            "description": "<p>The tag to be starred</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"tag\": \"material\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n\t  {}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>BadRequest The request was malformed</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/starredModels",
    "title": "Adds a starred models for the logged user",
    "name": "StarModels",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>teamspace where model resides</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>model ID  to add</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"teamspace\": \"user1\",\n  \"model\": \"c7d9184a-83d3-4ef0-975c-ba2ced888e79\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n\t  {}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>BadRequest The request was malformed</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/starredMeta",
    "title": "removes a starred metadata tag for the logged user if the tag exists",
    "name": "UnstarMetadataTags",
    "group": "User",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "tag",
            "description": "<p>The tag to be starred</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"tag\": \"material\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n\t  {}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>BadRequest The request was malformed</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/starredModels",
    "title": "removes a starred models for the logged user if the tag exists",
    "name": "UnstarModels",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>teamspace where model resides</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>model ID  to remove</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"teamspace\": \"user1\",\n  \"model\": \"c7d9184a-83d3-4ef0-975c-ba2ced888e79\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n\t  {}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>BadRequest The request was malformed</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/apikey",
    "title": "Deletes the current apikey for the logged user",
    "name": "deleteApiKey_HTTP_1_1_200_OK___",
    "group": "User",
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/apikey",
    "title": "Generates an apikey for the logged user",
    "name": "generateApiKey",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   apiKey:\"20f947a673dce5419ce187ca7998a68f\"\n}",
          "type": "json"
        }
      ]
    },
    "group": "User",
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/me",
    "title": "Gets the profile for the logged user",
    "name": "getProfile",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   username: \"jasonv\",\n   firstName: \"Jason\",\n   lastName: \"Voorhees\",\n   email: \"jason@vorhees.com\",\n   hasAvatar: true\n}",
          "type": "json"
        }
      ]
    },
    "group": "User",
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/:teamspace/:model/viewpoints/",
    "title": "Create view",
    "name": "createView",
    "group": "Views",
    "description": "<p>Create a new view.</p>",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of view</p>"
          },
          {
            "group": "Request body",
            "type": "Viewpoint",
            "optional": false,
            "field": "viewpoint",
            "description": "<p>Viewpoint</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "screenshot",
            "description": "<p>Screenshot</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "clippingPlanes",
            "description": "<p>List of clipping planes</p>"
          }
        ],
        "Request body: screenshot": [
          {
            "group": "Request body: screenshot",
            "type": "String",
            "optional": false,
            "field": "base64",
            "description": "<p>Screenshot image in base64</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /acme/00000000-0000-0000-0000-000000000000/viewpoints HTTP/1.1\n{\n\t\"clippingPlanes\":[],\n\t\"name\":\"View 3\",\n\t\"screenshot\":{\n\t\t\"base64\":<base64 image>\n\t}\n\t\"viewpoint\":{\n\t\t\"aspect_ratio\":1.1715909242630005,\n\t\t\"far\":233419.5625,\n\t\t\"fov\":1.0471975803375244,\n\t\t\"highlighted_group_id\":\"\",\n\t\t\"look_at\":[34448.78125, 2989.078125, 17619.7265625],\n\t\t\"near\":466.839111328125,\n\t\t\"position\":[34448.78125, 163958.484375, 17620.015625],\n\t\t\"right\":[0.9999919533729553, -7.683411240577698e-9, 0.00400533527135849],\n\t\t\"up\":[0.00400533527135849, 0.0000017881393432617188, -0.9999920129776001],\n\t\t\"view_dir\":[-6.984919309616089e-10, -1, -0.0000017881393432617188]\n\t}\n}",
        "type": "post"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"_id\":\"00000000-0000-0000-0000-000000000001\"\n}",
          "type": "png"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/view.js",
    "groupTitle": "Views"
  },
  {
    "type": "delete",
    "url": "/:teamspace/:model/viewpoints/:viewId",
    "title": "Delete view",
    "name": "deleteView",
    "group": "Views",
    "description": "<p>Delete a view.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "viewId",
            "description": "<p>View ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "DELETE /acme/00000000-0000-0000-0000-000000000000/viewpoints/00000000-0000-0000-0000-000000000000 HTTP/1.1",
        "type": "delete"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"status\":\"success\"\n}",
          "type": "png"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/view.js",
    "groupTitle": "Views"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/viewpoints/:viewId",
    "title": "Get view",
    "name": "findView",
    "group": "Views",
    "description": "<p>Retrieve a view.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "viewId",
            "description": "<p>View ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ],
        "Type: ResultViewpoint": [
          {
            "group": "Type: ResultViewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "right",
            "description": "<p>The right vector of the viewpoint indicating the direction of right in relative coordinates.</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "up",
            "description": "<p>The up vector of the viewpoint indicating the direction of up in relative coordinates.</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "position",
            "description": "<p>The position vector indicates where in the world the viewpoint is positioned.</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "look_at",
            "description": "<p>The vector indicating where in the world the viewpoint is looking at.</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "view_dir",
            "description": "<p>The vector indicating where is the viewpoint is looking at in relative coordinates.</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "Number",
            "optional": false,
            "field": "near",
            "description": "<p>The vector indicating the near plane.</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "Number",
            "optional": false,
            "field": "far",
            "description": "<p>The vector indicating the far plane.</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "Number",
            "optional": false,
            "field": "fov",
            "description": "<p>The angle of the field of view.</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "Number",
            "optional": false,
            "field": "aspect_ratio",
            "description": "<p>The aspect ratio of the fustrum.</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "ClippingPlane[]",
            "optional": true,
            "field": "clippingPlanes",
            "description": "<p>the clipping planes associated with the viewpoint</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "String",
            "optional": true,
            "field": "highlighted_group_id",
            "description": "<p>If the viewpoint is associated with one or more highlighted objects from the model this field has the value of a group id generated to hold those objects</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "String",
            "optional": true,
            "field": "hidden_group_id",
            "description": "<p>If the viewpoint is associated with one or more hidden objects from the model this field has the value of a group id generated to hold those objects</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "String",
            "optional": true,
            "field": "shown_group_id",
            "description": "<p>If the viewpoint is associated with one or more shown objects from the model this field has the value of a group id generated to hold those objects</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "String[]",
            "optional": true,
            "field": "override_group_ids",
            "description": "<p>If the viewpoint has one or more objects with colour override this field has an array of groups ids with one group for each colour</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "Boolean",
            "optional": false,
            "field": "hide_IFC",
            "description": "<p>A flag to hide the IFC</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "String",
            "optional": false,
            "field": "screenshot",
            "description": "<p>A string in base64 representing the screenshot associated with the viewpoint</p>"
          }
        ],
        "Type: ClippingPlane": [
          {
            "group": "Type: ClippingPlane",
            "type": "Number[3]",
            "optional": false,
            "field": "normal",
            "description": "<p>The normal of the plane defined for the clipping plane</p>"
          },
          {
            "group": "Type: ClippingPlane",
            "type": "Number",
            "optional": false,
            "field": "distance",
            "description": "<p>The distance for the clipping plane to the origin</p>"
          },
          {
            "group": "Type: ClippingPlane",
            "type": "Number",
            "optional": false,
            "field": "clipDirection",
            "description": "<p>The direction to the clipping plane will cut the model; above or below the plane. Possible values: 1 , -1.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/viewpoints/00000000-0000-0000-0000-000000000001 HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"_id\":\"00000000-0000-0000-0000-000000000001\",\n\t\"thumbnail\":\"charence/00000000-0000-0000-0000-000000000000/viewpoints/00000000-0000-0000-0000-000000000001/thumbnail.png\",\n\t\"viewpoint\":{\n\t\t\"right\":[1.0,-0.0,0.0],\n\t\t\"up\":[0.0,0.0,-1.0],\n\t\t\"position\":[35000.0,150000.0,20000.0],\n\t\t\"look_at\":[35000.0,3000.0,20000.0],\n\t\t\"view_dir\":[-0.0,-1,-0.0],\n\t\t\"near\":100.0,\n\t\t\"far\":100000.0,\n\t\t\"fov\":1.0,\n\t\t\"aspect_ratio\":1.185,\n\t\t\"clippingPlanes\":[],\n\t\t\"highlighted_group_id\":\"\"\n\t},\n\t\"clippingPlanes\":[],\n\t\"screenshot\":{\n\t\t\"thumbnailUrl\":<binary image>,\n\t\t\"thumbnail\":\"charence/00000000-0000-0000-0000-000000000000/viewpoints/00000000-0000-0000-0000-000000000001/thumbnail.png\"\n\t},\n\t\"name\":\"View1\"\n}",
          "type": "png"
        }
      ],
      "fields": {
        "View object": [
          {
            "group": "View object",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>View ID</p>"
          },
          {
            "group": "View object",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of view</p>"
          },
          {
            "group": "View object",
            "type": "String",
            "optional": false,
            "field": "thumbnail",
            "description": "<p>Thumbnail image</p>"
          },
          {
            "group": "View object",
            "type": "ResultViewpoint",
            "optional": false,
            "field": "viewpoint",
            "description": "<p>Viewpoint properties</p>"
          },
          {
            "group": "View object",
            "type": "Number[]",
            "optional": false,
            "field": "clippingPlanes",
            "description": "<p>[DEPRECATED] Array of clipping planes</p>"
          },
          {
            "group": "View object",
            "type": "Object",
            "optional": false,
            "field": "screenshot",
            "description": "<p>[DEPRECATED] Screenshot object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/view.js",
    "groupTitle": "Views"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/viewpoints/:viewId/thumbnail.png",
    "title": "Get view thumbnail",
    "name": "getThumbnail",
    "group": "Views",
    "description": "<p>Retrieve a view's thumbnail image.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "viewId",
            "description": "<p>View ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/viewpoints/00000000-0000-0000-0000-000000000000/thumbnail.png HTTP/1.1",
        "type": "get"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n<binary image>",
          "type": "png"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/view.js",
    "groupTitle": "Views"
  },
  {
    "type": "get",
    "url": "/:teamspace/:model/viewpoints",
    "title": "List all views",
    "name": "listViews",
    "group": "Views",
    "description": "<p>List all model views.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "views",
            "description": "<p>List of view objects</p>"
          }
        ],
        "View object": [
          {
            "group": "View object",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>View ID</p>"
          },
          {
            "group": "View object",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of view</p>"
          },
          {
            "group": "View object",
            "type": "String",
            "optional": false,
            "field": "thumbnail",
            "description": "<p>Thumbnail image</p>"
          },
          {
            "group": "View object",
            "type": "ResultViewpoint",
            "optional": false,
            "field": "viewpoint",
            "description": "<p>Viewpoint properties</p>"
          },
          {
            "group": "View object",
            "type": "Number[]",
            "optional": false,
            "field": "clippingPlanes",
            "description": "<p>[DEPRECATED] Array of clipping planes</p>"
          },
          {
            "group": "View object",
            "type": "Object",
            "optional": false,
            "field": "screenshot",
            "description": "<p>[DEPRECATED] Screenshot object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n[\n\t{\n\t\t\"_id\":\"00000000-0000-0000-0000-000000000001\",\n\t\t\"thumbnail\":\"charence/00000000-0000-0000-0000-000000000000/viewpoints/00000000-0000-0000-0000-000000000001/thumbnail.png\",\n\t\t\"viewpoint\":{\n\t\t\t\"right\":[1.0,-0.0,0.0],\n\t\t\t\"up\":[0.0,0.0,-1.0],\n\t\t\t\"position\":[35000.0,150000.0,20000.0],\n\t\t\t\"look_at\":[35000.0,3000.0,20000.0],\n\t\t\t\"view_dir\":[-0.0,-1,-0.0],\n\t\t\t\"near\":100.0,\n\t\t\t\"far\":100000.0,\n\t\t\t\"fov\":1.0,\n\t\t\t\"aspect_ratio\":1.185,\n\t\t\t\"clippingPlanes\":[],\n\t\t\t\"highlighted_group_id\":\"\"\n\t\t},\n\t\t\"clippingPlanes\":[],\n\t\t\"screenshot\":{\n\t\t\t\"thumbnailUrl\":<binary image>,\n\t\t\t\"thumbnail\":\"charence/00000000-0000-0000-0000-000000000000/viewpoints/00000000-0000-0000-0000-000000000001/thumbnail.png\"\n\t\t},\n\t\t\"name\":\"View1\"\n\t},\n\t{\n\t\t\"_id\":\"00000000-0000-0000-0000-000000000002\",\n\t\t\"thumbnail\":\"charence/00000000-0000-0000-0000-000000000000/viewpoints/00000000-0000-0000-0000-000000000002/thumbnail.png\",\n\t\t\"viewpoint\":{\n\t\t\t\"right\":[1.0,-0.0,0.5],\n\t\t\t\"up\":[0.0,0.0,-1.0],\n\t\t\t\"position\":[20000.0,-50000.0,10000.0],\n\t\t\t\"look_at\":[20000.0,5000.0,10000.0],\n\t\t\t\"view_dir\":[0.0,-1,0.0],\n\t\t\t\"near\":100.0,\n\t\t\t\"far\":100000.0,\n\t\t\t\"fov\":1.0,\n\t\t\t\"aspect_ratio\":1.185,\n\t\t\t\"clippingPlanes\":[],\n\t\t\t\"highlighted_group_id\":\"\"\n\t\t},\n\t\t\"clippingPlanes\":[],\n\t\t\"screenshot\":{\n\t\t\t\"thumbnailUrl\":<binary image>,\n\t\t\t\"thumbnail\":\"charence/00000000-0000-0000-0000-000000000000/viewpoints/00000000-0000-0000-0000-000000000002/thumbnail.png\"\n\t\t},\n\t\t\"name\":\"View2\"\n\t}\n]",
          "type": "png"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /acme/00000000-0000-0000-0000-000000000000/viewpoints HTTP/1.1",
        "type": "get"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/view.js",
    "groupTitle": "Views",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ],
        "Type: ResultViewpoint": [
          {
            "group": "Type: ResultViewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "right",
            "description": "<p>The right vector of the viewpoint indicating the direction of right in relative coordinates.</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "up",
            "description": "<p>The up vector of the viewpoint indicating the direction of up in relative coordinates.</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "position",
            "description": "<p>The position vector indicates where in the world the viewpoint is positioned.</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "look_at",
            "description": "<p>The vector indicating where in the world the viewpoint is looking at.</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "Number[3]",
            "optional": false,
            "field": "view_dir",
            "description": "<p>The vector indicating where is the viewpoint is looking at in relative coordinates.</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "Number",
            "optional": false,
            "field": "near",
            "description": "<p>The vector indicating the near plane.</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "Number",
            "optional": false,
            "field": "far",
            "description": "<p>The vector indicating the far plane.</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "Number",
            "optional": false,
            "field": "fov",
            "description": "<p>The angle of the field of view.</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "Number",
            "optional": false,
            "field": "aspect_ratio",
            "description": "<p>The aspect ratio of the fustrum.</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "ClippingPlane[]",
            "optional": true,
            "field": "clippingPlanes",
            "description": "<p>the clipping planes associated with the viewpoint</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "String",
            "optional": true,
            "field": "highlighted_group_id",
            "description": "<p>If the viewpoint is associated with one or more highlighted objects from the model this field has the value of a group id generated to hold those objects</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "String",
            "optional": true,
            "field": "hidden_group_id",
            "description": "<p>If the viewpoint is associated with one or more hidden objects from the model this field has the value of a group id generated to hold those objects</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "String",
            "optional": true,
            "field": "shown_group_id",
            "description": "<p>If the viewpoint is associated with one or more shown objects from the model this field has the value of a group id generated to hold those objects</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "String[]",
            "optional": true,
            "field": "override_group_ids",
            "description": "<p>If the viewpoint has one or more objects with colour override this field has an array of groups ids with one group for each colour</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "Boolean",
            "optional": false,
            "field": "hide_IFC",
            "description": "<p>A flag to hide the IFC</p>"
          },
          {
            "group": "Type: ResultViewpoint",
            "type": "String",
            "optional": false,
            "field": "screenshot",
            "description": "<p>A string in base64 representing the screenshot associated with the viewpoint</p>"
          }
        ],
        "Type: ClippingPlane": [
          {
            "group": "Type: ClippingPlane",
            "type": "Number[3]",
            "optional": false,
            "field": "normal",
            "description": "<p>The normal of the plane defined for the clipping plane</p>"
          },
          {
            "group": "Type: ClippingPlane",
            "type": "Number",
            "optional": false,
            "field": "distance",
            "description": "<p>The distance for the clipping plane to the origin</p>"
          },
          {
            "group": "Type: ClippingPlane",
            "type": "Number",
            "optional": false,
            "field": "clipDirection",
            "description": "<p>The direction to the clipping plane will cut the model; above or below the plane. Possible values: 1 , -1.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/:teamspace/:model/viewpoints/:viewId",
    "title": "Update view",
    "name": "updateView",
    "group": "Views",
    "description": "<p>Update a view.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "viewId",
            "description": "<p>View ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "teamspace",
            "description": "<p>Name of teamspace</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Model ID</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of view</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "PUT /acme/00000000-0000-0000-0000-000000000000/viewpoints/00000000-0000-0000-0000-000000000001 HTTP/1.1\n{\n\t\"name\":\"NewName\"\n}",
        "type": "put"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n\t\"_id\":\"00000000-0000-0000-0000-000000000001\"\n}",
          "type": "png"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/view.js",
    "groupTitle": "Views"
  }
] });