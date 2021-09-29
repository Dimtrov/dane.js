const BaseController = require("../../system/controllers/BaseController")

module.exports = class HomeController extends BaseController {
    
    async about(id, req, res) {
        return res.send("id" + id)
    }
}