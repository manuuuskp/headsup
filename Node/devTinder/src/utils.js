const bcrypt = require("bcrypt");

const saltRounds = 10;

const hashPassword = async (password) => {
   const hashedPassword = await bcrypt.hash(password, saltRounds);

   return hashedPassword;
}

const comparePassword = async (userPwd, dbPwd) => {
    const isValid = await bcrypt.compare(userPwd, dbPwd);

    return isValid;
}

module.exports = {
    hashPassword,
    comparePassword
}