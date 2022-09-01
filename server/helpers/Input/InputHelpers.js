
import bcrypt from 'bcryptjs';


export const IsInputsValid = (name,email) => {
    return name && email;
}

export const comparePassword = (password,hashedPassword) => {
    return bcrypt.compareSync(password,hashedPassword);
}

