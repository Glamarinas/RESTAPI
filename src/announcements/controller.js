const pool = require("../../db");
const queries = require("./queries");

const getAnnouncements = (req, res) => {
    pool.query(queries.getAnnouncements, (error, results) => {
        if (error) {
            // Κάτι πήγε στραβά με το query
            return res.status(500).send("Internal Server Error");
        }
        res.status(200).json(results.rows);
    });
};

const getAnnouncementById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getAnnouncementById, [id], (error, results) => {
        if (error) {
            // Κάτι πήγε στραβά με το query
            return res.status(500).send("Internal Server Error");
        }

        if (results.rows.length === 0) {
            // Αν δεν υπάρχει announcement, επιστρέφει μήνυμα ότι δεν υπάρχει
            return res.status(400).send("Announcement doesnt exists.");
        }

        res.status(200).json(results.rows);
    });
};

const addAnnouncement = (req, res) => {
    const { type, product, ammount, price, sellerPhone,sellerEmail,description,user_id } = req.body;

    pool.query(queries.addAnnouncement, [type, product, ammount, price, sellerPhone,sellerEmail,description,user_id], (error, results) => {
        if (error) {
            // Κάτι πήγε στραβά με το query
            return res.status(500).send("Internal Server Error");
        }

        res.status(201).send("Announcement created successfully!");
    });
};

const updateAnnouncement = (req, res) => {
    const id = parseInt(req.params.id);

    const { type, product, ammount, price, sellerPhone,sellerEmail,description,user_id } = req.body;

    pool.query(queries.getAnnouncementById, [id], (error, results) => {
        if (error) {
            // Κάτι πήγε στραβά με το query
            return res.status(500).send("Internal Server Error");
        }

        // If no announcement found
        if (results.rows.length === 0) {
            return res.status(404).send("Announcement does not exist in the database.");
        }

        pool.query(queries.updateAnnouncement, [type, product, ammount, price, sellerPhone,sellerEmail,description,user_id,id], (error, results) => {
            if (error) {
                return res.status(500).send("Internal Server Error");
            }
            
            res.status(200).send("Announcement updated successfully!");
        })

    });   
};

const deleteAnnouncement = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getAnnouncementById, [id], (error, results) => {
        if (error) {
            // Κάτι πήγε στραβά με το query
            return res.status(500).send("Internal Server Error");
        }

        // If no announcement found
        if (results.rows.length === 0) {
            return res.status(404).send("Announcement does not exist in the database.");
        }

        pool.query(queries.deleteAnnouncement, [id], (error, results) => {
            if (error) {
                // Κάτι πήγε στραβά με το query
                return res.status(500).send("Internal Server Error");
            }
            res.status(200).send("Announcement deleted successfully!");
        });

    });   

};

module.exports = {
    getAnnouncements,
    getAnnouncementById,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
};