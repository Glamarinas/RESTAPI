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

        if (results.rows.length === 0) {
            // Αν δεν υπάρχει ο user, επιστρέφει μήνυμα ότι το user δεν υπάρχει
            return res.status(400).send("User doesnt exists.");
        }

        res.status(200).json(results.rows);
    });
};

const addUser = (req, res) => {
    const {name, lastname, email, password, location, phone, type} = req.body;

    // Έλεγχος αν υπάρχει ήδη το email
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (error) {
            // Κάτι πήγε στραβά με το query
            return res.status(500).send("Internal Server Error");
        }

        if (results.rows.length > 0) {
            // Αν υπάρχει το email, επιστρέφει μήνυμα ότι το email υπάρχει ήδη
            return res.status(400).send("Email already exists.");
        }

        // Αν το email δεν υπάρχει, προσθέτει τον χρήστη στη βάση δεδομένων
        pool.query(queries.addUser, [name, lastname, email, password, location, phone, type], (error, result) => {
            if (error) {
                // Αν συμβεί κάποιο σφάλμα κατά την προσθήκη
                return res.status(500).send("Error inserting user.");
            }

            // Αν πετύχει η προσθήκη, επιστρέφει μήνυμα επιτυχίας
            res.status(201).send("User created successfully!");
        });
    });
};


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
    const {name, lastname, email, password, location, phone, type} = req.body;

    // First, check if the user exists
    pool.query(queries.getUserById, [id], (error, results) => {
        if (error) {
            return res.status(500).send("An error occurred while checking for the user.");
        }

        // If no user found
        if (results.rows.length === 0) {
            return res.status(404).send("User does not exist in the database.");
        }

        pool.query(queries.updateUser,[name, lastname, email, password, location, phone, type, id], (error,result) => {
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