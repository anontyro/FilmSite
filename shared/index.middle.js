/**
 * MIDDLEWARE EXPORTS
 * this class contains custom middleware to be bundled and exported
 */
module.exports ={
    requestLogger: (req, res, next) => {
        console.log('A new request was received at: ' + Date.now());
        next();
    },
    checkSignIn: (req, res, next) => {
        if(req.session.user){
            next();
        } else {
            const err = new Error('Not logged in!');
            next(err);
        }
    }
};
