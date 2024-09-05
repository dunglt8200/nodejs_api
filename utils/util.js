const bcrypt = require('bcryptjs');

const generateRandomNumber = () => {
    return Math.floor(1000 + Math.random() * 9000);
}

const convertFilePathToURL = (filePath) => {
    const baseUrl = `http://localhost:3000/`;
    const urlPath = filePath.replace(/\\/g, '/');
    const cleanedPath = urlPath.replace(/^public\//, '');
    return `${baseUrl}${cleanedPath}`;
};

const hashPassword = async (password) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (err) {
      throw new Error('Error in hashing password');
    }
  }

module.exports = {
    generateRandomNumber,
    convertFilePathToURL,
    hashPassword
}