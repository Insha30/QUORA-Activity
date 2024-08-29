const express = require("express");
const app = express();
const port = 8080 ;
const path = require("path");

app.use(express.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.set("Views",path.join(__dirname, "Views"));
app.use(express.static(path.join(__dirname, "Public")));

let posts = [
    {
        id : "1a",
        username : "Insha Iqbal",
        content : "I love coding"
    },

    {
        id : "2b",
        username : "Alex",
        content : " Hard work is the key to success"
    },

    {
        id : "3c",
        username : "Steven",
        content : "Men kill people, Women kill society"
    },
];

app.get("/posts", ( req , res ) => {
    res.render("index.ejs",{posts} );
});

app.get("/posts/new", ( req , res) => {
    res.render("new.ejs");
} );

app.post("/posts", ( req , res) =>{
    let { username , content } = req.body ;
    posts.push( { username , content });
    res.redirect("/posts");
});

app.get("/posts/:id" , ( req , res ) => {
    let { id} = req.params ;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

app.listen(port, () => {
    console.log("listening to port :8080");
});