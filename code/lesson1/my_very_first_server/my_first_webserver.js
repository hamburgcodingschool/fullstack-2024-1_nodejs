const express=require('express');
const server=express();
const PORT=3000;
let counter = 0;
const bgcolor = ["red", "green", "blue"];

server.use(express.static('static'/* name of the folder */));

server.get('/', (req, res) => {
    counter = counter + 1;

    const date = new Date();
    res.send(`
    <html>
        <head>
            <title>My first webpage</title>
            <link rel="stylesheet" href="/main.css"/>
            <link rel="stylesheet" href="/startpage.css"/>
        </head>
        <body>
            <h1>Yeah, up and running</h1>
            <h2 style="color: ${bgcolor[counter%3]}">It is now ${date}</h2>
            <h2 class="showdate">You have hit this page ${counter} times.</h2>
            <p><a href="/sth_else">Link to second page</a></p>
        </body>
    </html>`);
});

server.get('/startpage.css', (req,res) => {
    res.send(`
        .showdate {
            background-color: ${bgcolor[counter%3]};
        }
    `);
})

server.get('/sth_else', (req, res) => {
    res.send("Yes, this is something else, indeed!!!");
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
