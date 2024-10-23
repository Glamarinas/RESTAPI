const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1";
const addUser = "INSERT INTO users (name,email,location) VALUES ($1,$2,$3)";
const deleteUser = "DELETE FROM users WHERE id = $1";
const updateUser = "UPDATE users SET name=$1, email=$2, location=$3 WHERE id = $4";


module.exports = {
    getUsers,
    getUserById,
    checkEmailExists,
    addUser,
    deleteUser,
    updateUser,
};