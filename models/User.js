const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Email inválido"],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^\+?[\d\s\-$$$$]+$/, "Número de teléfono inválido"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    countryOfOrigin: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    preferredLanguage: {
      type: String,
      required: true,
      enum: ["es", "en", "fr", "pt", "de", "it"],
      default: "es",
    },
    travelerType: {
      type: String,
      required: true,
      enum: ["solo", "couple", "family", "friends", "business"],
    },
  },
  {
    timestamps: true,
  },
)

// Hash password antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Método para comparar passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Método para obtener datos públicos del usuario
userSchema.methods.toPublicJSON = function () {
  return {
    id: this._id,
    fullName: this.fullName,
    email: this.email,
    phone: this.phone,
    countryOfOrigin: this.countryOfOrigin,
    preferredLanguage: this.preferredLanguage,
    travelerType: this.travelerType,
    createdAt: this.createdAt,
  }
}

module.exports = mongoose.model("User", userSchema)
