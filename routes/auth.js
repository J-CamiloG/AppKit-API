const express = require("express")
const router = express.Router()
const { register, login } = require("../controllers/authController")

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterUser:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - phone
 *         - password
 *         - countryOfOrigin
 *         - preferredLanguage
 *         - travelerType
 *       properties:
 *         fullName:
 *           type: string
 *           description: Nombre completo del usuario
 *           example: Juan Pérez
 *         email:
 *           type: string
 *           format: email
 *           description: Email del usuario
 *           example: juan@email.com
 *         phone:
 *           type: string
 *           description: Número de teléfono
 *           example: "+57 300 123 4567"
 *         password:
 *           type: string
 *           minLength: 6
 *           description: Contraseña del usuario
 *           example: password123
 *         countryOfOrigin:
 *           type: string
 *           description: País de origen
 *           example: Colombia
 *         preferredLanguage:
 *           type: string
 *           enum: [es, en, fr, pt, de, it]
 *           description: Idioma preferido
 *           example: es
 *         travelerType:
 *           type: string
 *           enum: [solo, couple, family, friends, business]
 *           description: Tipo de viajero
 *           example: couple
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: juan@email.com
 *         password:
 *           type: string
 *           example: password123
 *     UserResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Usuario registrado exitosamente
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: 507f1f77bcf86cd799439011
 *             fullName:
 *               type: string
 *               example: Juan Pérez
 *             email:
 *               type: string
 *               example: juan@email.com
 *             phone:
 *               type: string
 *               example: "+57 300 123 4567"
 *             countryOfOrigin:
 *               type: string
 *               example: Colombia
 *             preferredLanguage:
 *               type: string
 *               example: es
 *             travelerType:
 *               type: string
 *               example: couple
 *             token:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: El email ya está registrado
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *           example: ["email"]
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Datos inválidos o usuario ya existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 */
router.post("/register", register)

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/login", login)

module.exports = router
