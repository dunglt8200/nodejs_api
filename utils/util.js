const generateRandomNumber = () => {
    return Math.floor(1000 + Math.random() * 9000);
}

const convertFilePathToURL = (filePath) => {
    const baseUrl = `http://localhost:3000/`;
    const urlPath = filePath.replace(/\\/g, '/');
    const cleanedPath = urlPath.replace(/^public\//, '');
    return `${baseUrl}${cleanedPath}`;
};

module.exports = {
    generateRandomNumber,
    convertFilePathToURL
}