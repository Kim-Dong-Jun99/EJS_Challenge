
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
let articles = [];
let contact = [];
let about = [];
class article {
  constructor(title, body) {
    this.title = title;
    this.body = body;
  }
}

let titles = ["Home", "About", "Contact"];
let bodies = [homeStartingContent, aboutContent, contactContent];
for (let i = 0; i < 3; i++) {
  let temp = new article(titles[i], bodies[i]);
  if (i === 0) {
    articles.push(temp);
  }else if (i === 1) {
    about.push(temp);
  } else {
    contact.push(temp);
  }
}

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home",{
    articles:articles
  });
});

app.get("/about", function (req, res) {
  res.render("about",{
    articles:about
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  console.log(req.body.content);
  let tempArticle = new article(req.body.title, req.body.content);
  articles.push(tempArticle);
  res.redirect("/");
});

app.get("/contact", function (req, res) {
  res.render("contact",{
    articles:contact
  });
});

app.get("/posts/:title", function (req, res) {
  for (let article of articles) {
    if (article.title === req.params.title) {

      res.render("post",{
        article: article

      })
    }
  }
  let error = new article("Error", "post not found");
  res.render("post", {
    article:error
  })
});

app.listen(process.env.PORT || 3000, function () {
  console.log("server started")
});
