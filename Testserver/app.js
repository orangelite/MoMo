
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();
var fs = require('fs');
var md5 = require('MD5');
var mysql = require('mysql');
var sqlconnection = mysql.createConnection({
	host : 'mydb.cwb75deezrvy.ap-northeast-1.rds.amazonaws.com',
	user : 'cheon',
	password : '1c235887',
	port : '3306'	
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/index', function(req,res){
	console.log("indexpage");
	fs.readFile('public/index.html',function(error,data){
		if(error){
			console.log(error);
		}
		else{
			res.writeHead(200,{'Content-Type':'text/html'});
			res.end(data);
		}
	});
});

var httpServer = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


/*/upgrade http server to socket.io server
var io = require('socket.io').listen(httpServer);
 
io.sockets.on('connection',function(socket){
   socket.emit('toclient',{msg:'Welcome !'});
   socket.on('test',function(data){
	   console.log('Message from client :'+data.msg);
	   
   });
   
   socket.on('fromclient',function(data){
       socket.broadcast.emit('toclient',data); // 자신을 제외하고 다른 클라이언트에게 보냄
       socket.emit('toclient',data); // 해당 클라이언트에게만 보냄. 다른 클라이언트에 보낼려면?
       console.log('Message from client :'+data.msg);
   });
});
*/
var io = require('socket.io').listen(httpServer);


io.sockets.on('connection', function (socket) {
 
    
    socket.on('signup',function(data){
    	
    	
    	var dt = new Date(data.birth);
    	var ndt = new Date();
    	var age = ndt.getFullYear() - dt.getFullYear() + 1;
    	
    	var gender = "";
    	if(data.gender == 'male')
    		gender = 1;
    	else
    		gender = 2;
    	
    	
    	var queryset = {
    			Uname : data.name,
    			Uemail : data.email,
    			Upassword : md5(data.passward),
    			Ugender : gender,
    			Ubirthday : dt,
    			Uage : age,
    			Uinterest : "ss"
    	}
    	
    	sqlconnection.query('insert into myDB.user set ?',queryset,function(err,result){
    		if(err){
    			cosole.error(err);
    			throw err;
    		}
    		console.log(queryset);
    		socket.emit(data.name);
    	});
    	
    	
    });
    
    socket.on('login', function (data) {
        console.log(data);
        
        sqlconnection.query('select * from myDB.user',function(err, result){
        	console.log(result);
        	for(var shoot in result){
        		
        		if(result[shoot].Uemail == data.username){
        			console.log("!!",md5(data.password));
        			
        			if(result[shoot].Upassword == md5(data.password)){
        				 socket.emit("login"+data.username,result[shoot].Uname);
        				 break;
        			}
        		}
        	}
        });
        
       
    });
    
    socket.on('logout', function () {
        console.log("logout");
    });
    
});