const pool = require("../../db");
const queries = require("./queries");

const getAnnouncements = (req, res) => {
    pool.query(queries.getAnnouncements, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getAnnouncementById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getAnnouncementById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addAnnouncement = (req, res) => {
    const { type, product, ammount, price, sellerPhone,sellerEmail,description,user_id } = req.body;
    pool.query(queries.addAnnouncement, [type, product, ammount, price, sellerPhone,sellerEmail,description,user_id], (error, results) => {
        if (error) throw error;
        res.status(201).send("Announcement created successfully!");
    });
};

const updateAnnouncement = (req, res) => {
    const id = parseInt(req.params.id);
    const { type, product, ammount, price, sellerPhone,sellerEmail,description,user_id } = req.body;
    const date = new Date(); // Ανανεώνουμε την ημερομηνία
    pool.query(queries.updateAnnouncement, [type, product, ammount, price, sellerPhone,sellerEmail,description,user_id,id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Announcement updated successfully!");
    });
};

const deleteAnnouncement = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.deleteAnnouncement, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Announcement deleted successfully!");
    });
};

module.exports = {
    getAnnouncements,
    getAnnouncementById,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
};