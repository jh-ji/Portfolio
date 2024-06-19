// 모듈을 추출합니다.
var http = require('http')
var express = require('express')

// 웹 서버를 생성합니다.
var app = express();
var router = express.Router();

app.use(express.static('public'));
app.use(router);
// 라우트합니다.

app.get('/posts', function (request, response) { 
    response.send(items);
});


app.post('/posts', function (request, response) { 
    // 변수를 선언합니다.
    var s_name = request.param('s_name');
    var s_department = request.param('s_department');
    var s_num = request.param('s_num');

    var item = {
        s_name:s_name,
        s_department:s_department,
        s_num:s_num
    };

    // 데이터를 추가합니다.
    items.push(item);
    // 응답합니다.
    response.send({
        message: '데이터를 추가했습니다.',
        data: item
    });
});
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql' // 사용하는 데이터베이스 종류 (MySQL, PostgreSQL, SQLite 등)
  });


// 웹 서버를 실행합니다.
http.createServer(app).listen(3002, function () {
    console.log('Server Running at http://127.0.0.1:3000');
});
