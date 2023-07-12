const router = require("express").Router();

router.get('/', (req, res) => {
    res.send('On /api!');
})

//mounted on /api/
router.use("/stories", require("./stories"));

router.use("/users", require("./users"));

//404 handling
router.use((req, res, next) => {
    const error = new Error("404 Not Found");
    error.status = 404;
    next(error);
  });
  
module.exports = router;