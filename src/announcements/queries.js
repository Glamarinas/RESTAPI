const getAnnouncements = "SELECT * FROM announcements";
const getAnnouncementsByProduct = "SELECT * FROM announcements WHERE product = $1";
const getAnnouncementsByType = "SELECT * FROM announcements WHERE type = $1";
const getAnnouncementsByTypeAndProduct = "SELECT * FROM announcements WHERE type = $1 AND product = $2";

const getAnnouncementById = "SELECT * FROM announcements WHERE id = $1";
const addAnnouncement = "INSERT INTO announcements (type, product, ammount, price, sellerPhone,sellerEmail,description,user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
const deleteAnnouncement = "DELETE FROM announcements WHERE id = $1";
const updateAnnouncement = "UPDATE announcements SET type=$1, product = $2, ammount = $3, price = $4, sellerPhone = $5, sellerEmail = $6, description = $7, user_id = $8 WHERE id = $9";
const getAnnouncementsByUserId = "SELECT * FROM announcements WHERE user_id = $1";

module.exports = {
    getAnnouncements,
    getAnnouncementById,
    addAnnouncement,
    deleteAnnouncement,
    updateAnnouncement,
    getAnnouncementsByUserId,
    getAnnouncementsByProduct,
    getAnnouncementsByType,
    getAnnouncementsByTypeAndProduct,
};



