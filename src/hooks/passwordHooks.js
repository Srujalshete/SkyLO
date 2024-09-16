import bcrypt from 'bcrypt';

// Function to hash the password before saving it
export const hashPassword = async function (next) {  // Callback function to move to the next step
    // `this` refers to the current user object we are saving
    const deliveryPartner = this;

    // Only hash the password if it has been changed or is a new user
    if (!deliveryPartner.isModified('password')) return next(); // Move to the next step if no change

    try {
        // Generate a salt (random value) to make the hash more secure
        const salt = await bcrypt.genSalt(10); // `await` waits for the salt to be generated

        // Hash the password using the salt
        const hashedPassword = await bcrypt.hash(deliveryPartner.password, salt); // `await` waits for the hash to be created

        // Replace the plain password with the hashed password
        deliveryPartner.password = hashedPassword;

        // Continue to save the user object
        next(); // `next` is a callback that tells Mongoose to proceed
    } catch (error) {
        // If there's an error during hashing, handle it here
        next(error); // Pass the error to Mongoose's error handling
    }
};

// Function to check if a provided password matches the stored hashed password
export const comparePassword = async function (enteredPassword) {
    // Compare the entered password with the stored hashed password
    return await bcrypt.compare(enteredPassword, this.password); // `await` waits for the comparison result
};
