const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1";
const addUser = "INSERT INTO users (name, lastname, email, password, location, phone, type) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const deleteUser = "DELETE FROM users WHERE id = $1";
const updateUser = "UPDATE users SET name=$1, lastname = $2, email = $3, password = $4, location = $5, phone = $6, type = $7 WHERE id = $8";


module.exports = {
    getUsers,
    getUserById,
    checkEmailExists,
    addUser,
    deleteUser,
    updateUser,
};