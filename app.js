const express = require('express');

const app = express();
const port = 3000;
// 전역변수
app.set('port', process.env.PORT || port);

app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.listen(port, () => {
    console.log(`익스프레스 실행 포트: ${port}`);
});
