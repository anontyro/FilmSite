/**
 * MIDDLEWARE EXPORTS
 * this class contains custom middleware to be bundled and exported
 */

const multer = require('multer');

const path = require('path');



module.exports ={
    /**
     * Basic test logger middleware
     */
    requestLogger: (req, res, next) => {
        console.log('A new request was received at: ' + Date.now());
        next();
    },
    /**
     * Check the user is signed in and the session exists
     * if not throw a new error and bounce the route
     */
    checkSignIn: (req, res, next) => {
        if(req.session.user){
            next();
        } else {
            const err = new Error('Not logged in!');
            next(err);
        }
    },
    /**
     * Save file middleware that is used to handle singlefile uploads currently
     * and save to a location the user decides
     */
    setFileUpload: (saveLocation, req, file, cb) =>{

        const storage = multer.diskStorage({
            destination: ( req, file, cb) =>{
                cb(null, saveLocation )
            },
            filename: (req, file, cb) =>{
                cb(null, file.originalname)
            }
        });
        const upload = multer({storage: storage});
        return upload;
    }
};
