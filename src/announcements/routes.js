const { Router } = require("express");
const controller = require("./controller");  

const router = Router();

router.get("/", controller.getAnnouncements);
router.get("/:id", controller.getAnnouncementById);
router.get("/uid/:id", controller.getAnnouncementsByUid);
router.post("/add/:id", controller.addAnnouncement);
router.put("/:id", controller.updateAnnouncement);
router.delete("/:id", controller.deleteAnnouncement);

module.exports = router;