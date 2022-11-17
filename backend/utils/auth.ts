import bcrypt from "bcrypt";
const saltRounds = 10;

const hashPassword = (password: string) => {
    return bcrypt.hashSync(password, saltRounds);
}

const comparePassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash); 
}

export {hashPassword, comparePassword};