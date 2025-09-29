const swaggerJsdoc = require("swagger-jsdoc")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AppKit API",
      version: "1.0.0",
      description: "API para la aplicación AppKit con autenticación de usuarios",
      contact: {
        name: "API Support",
        email: "support@appkit.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de desarrollo",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"], 
}

const specs = swaggerJsdoc(options)

module.exports = specs
