const express = require("express")
const cors = require("cors")
const swaggerUi = require("swagger-ui-express")
const swaggerSpecs = require("./config/swagger")
const connectDB = require("./config/database")
require("dotenv").config()

const app = express()

// Conectar a la base de datos
connectDB()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Documentación Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "AppKit API Documentation",
  }),
)

// Rutas
app.use("/api", require("./routes/auth"))

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenido a AppKit API",
    documentation: "/api-docs",
    version: "1.0.0",
  })
})

// Manejo de rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  })
})

// Manejo de errores global
app.use((error, req, res, next) => {
  console.error("Error:", error)
  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
  console.log(`Documentación disponible en: http://localhost:${PORT}/api-docs`)
})
