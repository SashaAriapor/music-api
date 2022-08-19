class UserController {
    getProfile(req, res, next){
        try {
            const user = req.user;
            return res.status(200).json({
                status: 200,
                succsess: true,
                user
            })
        } catch (error) {
            next(error)
        }
    }
    editProfile(){

    }
}

module.exports = {
    UserController : new UserController()
}