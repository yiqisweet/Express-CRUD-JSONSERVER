

module.exports = {
    shouye : function(req,res){
        res.render('login',{
            title : 'login'
        })
    },
    shanchu : function(req,res){
        res.render('register',{
            title : 'register'
        });
    }
}