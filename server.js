const express = require('express')
const app = express();

//declare of routes
app.get('/', (req, res) => {
    res.send('Hello World')
})
app.listen(3000, () => {
    console.log('Node server running on 3000');
})