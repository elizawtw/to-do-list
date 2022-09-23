const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');

const app = express();

const items = ["Cook food", "Eat food"];
const workItems = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  const today = new Date();
 
const options = {
  weekday: 'long',
  month: 'long',
  day: 'numeric'
}

const day = today.toLocaleDateString('en-US', options)

  res.render("list", { listTitle: day, newItemsList: items })// this will render list.ejs in views folder, and pass that file with variable or key "whichDay" and value is "day" 
});

app.post("/", (req, res) => {
  console.log(req.body)
  const item = req.body.newItem;
  if(req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  }
  else {
    items.push(item);
    res.redirect("/");
  }
  
})

app.get('/work', (req, res) => {
  
  res.render('list', {listTitle: 'Work List', newItemsList: workItems})
})

app.get("/about", (req, res) => {
  res.render('about')
})
app.listen(port, () => {
  console.log("Server is connected on port 3000")
}) 