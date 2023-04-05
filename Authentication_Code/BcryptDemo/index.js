const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt)
    console.log(salt);
    console.log(hash);
}

const login = async (password, hashedPassword) => {
    const result = await bcrypt.compare(password, hashedPassword);
    console.log(result);
}

// hashPassword('qwer1234');
login('qwer1234', '$2b$12$1tgf3PM.HJC74R1jXSIzHuZzxb6pJHQ/DqLdWySJU5X2nAJ1duhi');