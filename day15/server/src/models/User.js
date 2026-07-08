const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  googleId: {
    type: String,
    select: false
  },
  phone_num: {
    type: String,
    trim: true,
    match: [/^[0-9]{10}$/, 'Phone number must be 10 digits']
  },
  address: {
    type: String,
    trim: true,
    maxlength: [200, 'Address cannot exceed 200 characters']
  },
  faculty: {
    type: String,
    enum: ['BE Computer', 'Architecture', 'Civil', 'BIT'],
    required: [true, 'Faculty is required']
  },
  studentStatus: {
    type: String,
    enum: ['current', 'passed_out'],
    default: 'current'
  },
  semester: {
    type: Number,
    min: 1,
    max: 8
  },
  graduationYear: {
    type: Number,
    min: 2000,
    max: 2100
  },
  profileImage: {
    type: String,
    default: 'https://res.cloudinary.com/demo/image/upload/v1/default-avatar.png'
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  skills: [{
    type: String,
    trim: true
  }],
  interests: [{
    type: String,
    trim: true
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String,
    select: false
  },
  verificationTokenExpires: {
    type: Date,
    select: false
  },
  resetPasswordToken: {
    type: String,
    select: false
  },
  resetPasswordExpires: {
    type: Date,
    select: false
  },
  refreshToken: {
    type: String,
    select: false
  },
  lastLogin: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  reputation: {
    type: Number,
    default: 0
  },
  totalBorrows: {
    type: Number,
    default: 0
  },
  totalLends: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual fields
userSchema.virtual('isCurrentStudent').get(function() {
  return this.studentStatus === 'current';
});

userSchema.virtual('fullName').get(function() {
  return this.name;
});

// Pre-save middleware
userSchema.pre('save', async function(next) {
  // Hash password only if modified
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }

  // Validate student fields
  if (this.studentStatus === 'current' && !this.semester) {
    next(new Error('Semester is required for current students'));
  }
  if (this.studentStatus === 'passed_out' && !this.graduationYear) {
    next(new Error('Graduation year is required for passed out students'));
  }

  next();
});

// Instance methods
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.isEmailVerified = function() {
  return this.isVerified;
};

// Static methods
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

userSchema.statics.isCollegeEmail = function(email) {
  const domain = email.split('@')[1];
  return domain === process.env.COLLEGE_EMAIL_DOMAIN;
};

const User = mongoose.model('User', userSchema);

module.exports = User;