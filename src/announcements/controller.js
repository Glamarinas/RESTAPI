const pool = require("../../db");
const queries = require("./queries");

const getAnnouncements = (req, res) => {
    const { product, type, sortBy } = req.query;
    let query;
    let values = [];

    // Επιλογή query βάσει των φίλτρων
    if (product && type) {
        query = queries.getAnnouncementsByTypeAndProduct;
        values = [type, product];
    } else if (product) {
        query = queries.getAnnouncementsByProduct;
        values = [product];
    } else if (type) {
        query = queries.getAnnouncementsByType;
        values = [type];
    } else {
        query = queries.getAnnouncements;
    }

    // Προσθήκη της ταξινόμησης
    if (sortBy === 'descPrice') {
        query += " ORDER BY price DESC";
    } else if (sortBy === 'ascPrice') {
        query += " ORDER BY price ASC";
    }

    // Εκτέλεση του query με βάση τις παραμέτρους
    pool.query(query, values, (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Internal Server Error." });
        }
        res.status(200).json(results.rows);
    });
};


const getAnnouncementById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getAnnouncementById, [id], (error, results) => {
        if (error) {
            // Κάτι πήγε στραβά με το query
            return res.status(500).json({message:"Internal Server Error."});
        }

        if (results.rows.length === 0) {
            // Αν δεν υπάρχει announcement, επιστρέφει μήνυμα ότι δεν υπάρχει
            return res.status(400).json({message:"Announcement doesnt exist."});
        }

        res.status(200).json(results.rows);
    });
};

const getAnnouncementsByUid = (req, res) => {
    const userId = parseInt(req.params.id);
    pool.query(queries.getAnnouncementsByUserId, [userId], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Internal Server Error." });
        }
        
        if (results.rows.length === 0) {
            return res.status(404).json({ message: "No announcements found for this user." });
        }

        res.status(200).json(results.rows);
    });
};

const addAnnouncement = (req, res) => {
    const { type, product, ammount, price, sellerPhone,sellerEmail,description,user_id } = req.body;

    pool.query(queries.addAnnouncement, [type, product, ammount, price, sellerPhone,sellerEmail,description,user_id], (error, results) => {
        if (error) {
            // Κάτι πήγε στραβά με το query
            return res.status(500).json({message:"Internal Server Error."});
        }

        res.status(201).json({message:"Announcement created successfully!"});
    });
};

const updateAnnouncement = (req, res) => {
    const id = parseInt(req.params.id);

    const { type, product, ammount, price, sellerPhone,sellerEmail,description,user_id } = req.body;

    pool.query(queries.getAnnouncementById, [id], (error, results) => {
        if (error) {
            // Κάτι πήγε στραβά με το query
            return res.status(500).json({message:"Internal Server Error."});
        }

        // If no announcement found
        if (results.rows.length === 0) {
            return res.status(404).json({message:"Announcement does not exist in the database."});
        }

        pool.query(queries.updateAnnouncement, [type, product, ammount, price, sellerPhone,sellerEmail,description,user_id,id], (error, results) => {
            if (error) {
                return res.status(500).json({message:"Internal Server Error."});
            }
            
            res.status(200).json({message:"Announcement updated successfully!"});
        })

    });   
};

const deleteAnnouncement = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getAnnouncementById, [id], (error, results) => {
        if (error) {
            // Κάτι πήγε στραβά με το query
            return res.status(500).json({message:"Internal Server Error."});
        }

        // If no announcement found
        if (results.rows.length === 0) {
            return res.status(404).json({message:"Announcement does not exist in the database."});
        }

        pool.query(queries.deleteAnnouncement, [id], (error, results) => {
            if (error) {
                // Κάτι πήγε στραβά με το query
                return res.status(500).json({message:"Internal Server Error."});
            }
            res.status(200).json({message:"Announcement deleted successfully!"});
        });

    });   

};

module.exports = {
    getAnnouncements,
    getAnnouncementById,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    getAnnouncementsByUid
};