import bcrypt from "bcrypt"

export async function hashPassword(password){
    const hash = await bcrypt.hash(password,11);
    return hash
}

export async function validatePassword(password,hash){
    const isValid = await bcrypt.compare(password,hash);
    return isValid
}

