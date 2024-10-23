const pool = require("../../db");
const queries = require("./queries"); 

const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUserById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addUser = (req,res) => {
    const {name, email, location} = req.body;
    //check if email exists.
    pool.query(queries.checkEmailExists, [email], (error,results) => {
        if(results.rows.length){
            return res.status(400).send("Email already exists.");
        }

        //add user to db
        pool.query(queries.addUser,[name,email,location], (error,result) => {
            if(error) throw error;
            res.status(201).send("User created Succesfully!");
        });
    });
}


const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    // First, check if the user exists
    pool.query(queries.getUserById, [id], (error, results) => {
        if (error) {
            return res.status(500).send("An error occurred while checking for the user.");
        }

        // If no user found
        if (results.rows.length === 0) {
            return res.status(404).send("User does not exist in the database.");
        }

        // Proceed to delete the user
        pool.query(queries.deleteUser, [id], (error, result) => {
            if (error) {
                return res.status(500).send("An error occurred while deleting the user.");
            }

            // User deletion was successful
            res.status(200).send("User deleted successfully.");
        });
    });
};

const updateUser = (req,res) => {
    const id= parseInt(req.params.id);
    const {name, email, location} = req.body;

    // First, check if the user exists
    pool.query(queries.getUserById, [id], (error, results) => {
        if (error) {
            return res.status(500).send("An error occurred while checking for the user.");
        }

        // If no user found
        if (results.rows.length === 0) {
            return res.status(404).send("User does not exist in the database.");
        }

        pool.query(queries.updateUser,[name,email,location,id], (error,result) => {
            if (error) {
                return res.status(500).send("An error occurred while updating the user.");
            }

            // User deletion was successful
            res.status(200).send("User updated successfully.");
        })


    });

}

module.exports = {
    getUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser
};