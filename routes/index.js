

var express = require('express');
var router = express.Router(); //express路由
var request = require('request'); //node request 请求

router.get('/',function(req,res){
    res.render('login',{
        title : 'login'
    })
});

router.get('/index',function(req,res){
    console.log(req.query);

    request.get('http://localhost:3000/users/'+req.query.id,function(error,response,body){
        var data = JSON.parse(body);
        console.log(data);
        res.render('index',{
            id : data.id,
            name : data.name,
            password : data.password
        })
    })
})

//删除
router.post('/delete',function(req,res){
    console.log(req.body);
    request.del('http://localhost:3000/users/'+req.body.id,function(error,response,body){
        console.log(body);
    })
});

//修改
router.post('/update',function(req,res){
    request.put('http://localhost:3000/users/'+req.body.id,{json:req.body},function(error,response,body){
        console.log(body);
    })
})



//登录
router.post('/login',function(req,res){
    console.log(req.body);
    let isLogin = false,
        id = 0;
    request.get('http://localhost:3000/users',function(err,response,body){
        if(!err && response.statusCode === 200){
            var arr = JSON.parse(body); //string转换成数组
            for(let i = 0;i < arr.length;i++){
                if(req.body.name === arr[i].name && req.body.password === arr[i].password){
                    isLogin = true;
                    id = arr[i].id;
                }
            }
            if(isLogin){
                res.send({
                    code : '20000',
                    msg : '登录成功',
                    id : id
                });
            }else{
                res.send({
                    code : '30000',
                    msg : '用户名或密码错误'
                });
            }
        }
    });
});

//注册
router.route('/register').get(function(req,res){
    res.render('register',{
        title : 'register'
    });
}).post(function(req,res){
    request.get('http://localhost:3000/users',function(err,response,body){
        var isError = 0; //1 代表有相同用户 0 没有
        if(!err && response.statusCode === 200){
            var arr = JSON.parse(body);
            for(let i = 0;i < arr.length;i++){
                console.log(req.body);
                if(req.body.name === arr[i].name){
                    //如果数组里有一个同名的就计数1,
                    isError += 1;
                }
            }
            if(isError !== 1){
                request.post(
                    'http://localhost:3000/users',
                    {json:{name:req.body.name,password:req.body.password}},
                    function (error, response,body) {
                        if(!error && response.statusCode === 201 ){
                            res.send({
                                code : '20000',
                                msg : ' 注册成功'
                            });
                        }

                    });
            }else{
                res.send({
                    code :'30000',
                    msg : '用户名已存在'
                });
            }
        }
    });
})














module.exports = router;