const pool = require("../../db");
const queries = require("./queries"); 
const bcrypt = require('bcrypt'); // npm install bcrypt

const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if (error) {
            // Κάτι πήγε στραβά με το query
            return res.status(500).json({message:"Internal Server Error."});
        }
        res.status(200).json(results.rows);
    });
};

//επιστρεφει λιστα και οχι εναν μεμονομενο αντικειμενο user για αυτο ειναι ετσι κ το getUserById
//στο apiConnections στο flutterAppCode
const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUserById, [id], (error, results) => {
        if (error) {
            // Κάτι πήγε στραβά με το query
            return res.status(500).json({message:"Internal Server Error."});
        }

        if (results.rows.length === 0) {
            // Αν δεν υπάρχει ο user, επιστρέφει μήνυμα ότι το user δεν υπάρχει
            return res.status(400).json({message:"User does not exist."});
        }

        res.status(200).json(results.rows);
    });
};

/*για να επιστρεψει ενα αντικειμενο user θα ηθελε κατι τετοιο
app.get('/api/users/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await getUserById(userId); // Ανάκτηση χρήστη από τη βάση δεδομένων
    if (user) {
      res.json(user); // Επιστροφή μόνο του αντικειμένου χρήστη
    } else {
      res.status(404).json({ message: 'User not found' });
    }
});*/

const addUser = (req, res) => {
    const { name, lastname, email, password, location, phone, type } = req.body;

    // Hashing του password πριν το αποθηκεύσουμε
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({message:"Error hashing password."});
        }

        // Έλεγχος αν υπάρχει ήδη το email
        pool.query(queries.checkEmailExists, [email], (error, results) => {
            if (error) {
                return res.status(500).json({message:"Internal Server Error."});
            }

            if (results.rows.length > 0) {
                return res.status(400).json({message:"Email already exists."});
            }

            // Αποθήκευση χρήστη με hashed password
            pool.query(queries.addUser, [name, lastname, email, hashedPassword, location, phone, type], (error, result) => {
                if (error) {
                    return res.status(500).json({message:"Error inserting the user."});
                }

                res.status(201).json({message:"User created successfully!"});
            });
        });
    });
};


const loginUser = (req, res) => {
    const { email, password } = req.body;

    // Έλεγχος αν υπάρχει το email στη βάση δεδομένων
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (error) {
            return res.status(500).json({message:"Internal Server Error."});
        }

        if (results.rows.length === 0) {
            // Αν δεν βρεθεί το email
            return res.status(400).json({message:"Invalid Email or Password."});
        }

        const user = results.rows[0];

        // Έλεγχος αν το password ταιριάζει με το αποθηκευμένο hash
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({message:"Internal Server Error"});
            }

            if (!isMatch) {
                // Αν το password δεν ταιριάζει
                return res.status(400).json({message:"Invalid email or password."});
            }

            // Επιστροφή επιτυχίας και μήνυμα login
            res.status(200).json({
                //message:"Login successful!",
                userId: user.id,
                name:user.name,
                lastname:user.lastname,
                email:user.email,
                location:user.location,
                phone:user.phone,
                type:user.type,
            });
        });
    });
};


const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    // First, check if the user exists
    pool.query(queries.getUserById, [id], (error, results) => {
        if (error) {
            // Κάτι πήγε στραβά με το query
            return res.status(500).json({message:"Internal Server Error"});
        }

        // If no user found
        if (results.rows.length === 0) {
            return res.status(404).json({message:"User does not exist in the database."});        
        }

        // Proceed to delete the user
        pool.query(queries.deleteUser, [id], (error, result) => {
            if (error) {
                return res.status(500).json({message:"An error occured while deleting the user."});
            }

            // User deletion was successful
            res.status(200).json({message:"User deleted successfully!"});
        });
    });
};

const updateUser = (req,res) => {
    const id= parseInt(req.params.id);
    const {name, lastname, email, location, phone, type} = req.body;

    // First, check if the user exists
    pool.query(queries.getUserById, [id], (error, results) => {
        if (error) {
            // Κάτι πήγε στραβά με το query
            return res.status(500).json({message:"Internal Server Error."});
        }

        // If no user found
        if (results.rows.length === 0) {
            return res.status(404).json({message:"User does not exist in the database."});
        }

        pool.query(queries.updateUser,[name, lastname, email, location, phone, type, id], (error,result) => {
            if (error) {
                return res.status(500).json({message:"Internal Server Error."});
            }

            // User deletion was successful
            res.status(200).json({message:"User updated successfully!"});
        })


    });

};

module.exports = {
    getUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser,
    loginUser
};