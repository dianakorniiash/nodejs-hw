import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, trim: true, required: false },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.pre('save', function (next) {
  if (!this.username) {
    this.username = this.email;
  }
  next();
});
// userSchema.pre('save', function () {
//   if (!this.username) {
//     this.username = this.email;
//   }
// });

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
export const User = model('user', userSchema);
