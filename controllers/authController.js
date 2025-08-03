const User = require("../models/User")
const jwt = require("jsonwebtoken")
const { registerValidation, loginValidation } = require("../validations/userValidation")

// Generar JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

// Registro de usuario
const register = async (req, res) => {
  try {
    // Validar datos
    const { error } = registerValidation.validate(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        errors: error.details.map((detail) => detail.path[0]),
      })
    }

    const { fullName, email, phone, password, countryOfOrigin, preferredLanguage, travelerType } = req.body

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "El email ya está registrado",
        errors: ["email"],
      })
    }

    // Verificar si el teléfono ya existe
    const existingPhone = await User.findOne({ phone })
    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: "El número de teléfono ya está registrado",
        errors: ["phone"],
      })
    }

    // Crear nuevo usuario
    const user = new User({
      fullName,
      email,
      phone,
      password,
      countryOfOrigin,
      preferredLanguage,
      travelerType,
    })
    await user.save()

    // Generar token
    const token = generateToken(user._id)

    res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        countryOfOrigin: user.countryOfOrigin,
        preferredLanguage: user.preferredLanguage,
        travelerType: user.travelerType,
        token,
      },
    })
  } catch (error) {
    console.error("Error en registro:", error)

    // Manejar errores de duplicados de MongoDB
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]
      return res.status(400).json({
        success: false,
        message: `El ${field} ya está registrado`,
        errors: [field],
      })
    }

    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      errors: ["server"],
    })
  }
}

// Login de usuario
const login = async (req, res) => {
  try {
    // Validar datos
    const { error } = loginValidation.validate(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        errors: error.details.map((detail) => detail.path[0]),
      })
    }

    const { email, password } = req.body

    // Buscar usuario
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas",
        errors: ["email", "password"],
      })
    }

    // Verificar password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas",
        errors: ["email", "password"],
      })
    }

    // Generar token
    const token = generateToken(user._id)

    res.json({
      success: true,
      message: "Login exitoso",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        countryOfOrigin: user.countryOfOrigin,
        preferredLanguage: user.preferredLanguage,
        travelerType: user.travelerType,
        token,
      },
    })
  } catch (error) {
    console.error("Error en login:", error)
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      errors: ["server"],
    })
  }
}

module.exports = {
  register,
  login,
}
