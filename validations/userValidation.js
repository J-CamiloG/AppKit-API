const Joi = require("joi")

const registerValidation = Joi.object({
  fullName: Joi.string().min(2).max(100).required().messages({
    "string.min": "El nombre completo debe tener al menos 2 caracteres",
    "string.max": "El nombre completo no puede tener más de 100 caracteres",
    "any.required": "El nombre completo es requerido",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Debe ser un email válido",
    "any.required": "El email es requerido",
  }),
  phone: Joi.string()
    .pattern(/^\+?[\d\s\-$$$$]+$/)
    .required()
    .messages({
      "string.pattern.base": "El número de teléfono no es válido",
      "any.required": "El número de teléfono es requerido",
    }),
  password: Joi.string().min(6).required().messages({
    "string.min": "La contraseña debe tener al menos 6 caracteres",
    "any.required": "La contraseña es requerida",
  }),
  countryOfOrigin: Joi.string().min(2).max(50).required().messages({
    "string.min": "El país de origen debe tener al menos 2 caracteres",
    "string.max": "El país de origen no puede tener más de 50 caracteres",
    "any.required": "El país de origen es requerido",
  }),
  preferredLanguage: Joi.string().valid("es", "en", "fr", "pt", "de", "it").required().messages({
    "any.only": "El idioma preferido debe ser uno de: es, en, fr, pt, de, it",
    "any.required": "El idioma preferido es requerido",
  }),
  travelerType: Joi.string().valid("solo", "couple", "family", "friends", "business").required().messages({
    "any.only": "El tipo de viajero debe ser uno de: solo, couple, family, friends, business",
    "any.required": "El tipo de viajero es requerido",
  }),
})

const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Debe ser un email válido",
    "any.required": "El email es requerido",
  }),
  password: Joi.string().required().messages({
    "any.required": "La contraseña es requerida",
  }),
})

module.exports = {
  registerValidation,
  loginValidation,
}
