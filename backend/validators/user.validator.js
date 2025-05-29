const {z} = require('zod');

const UserValidationSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

module.exports = UserValidationSchema;