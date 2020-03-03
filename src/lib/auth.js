module.exports = {

    isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        return res.redirect('/signin');
    },
    isNotLoggedIn(req,res,next) {
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/profile');
    },
    ensureToken(req,res,next){
        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            req.token = bearerToken;
            return next();
        }else{
            return res.sendStatus(403);
        }
    }

};