module.exports = function(req,res,next){
    if(req.isAuthenticated()){
        console.log('the user is authenticated')
        return next();
        // res.json({verification:true})
    }else{
        console.log('the user is not authenticated')
        res.json({verification:false})
    }
}