const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

//Map global promise - get rid of warning
//mongoose.Promise = global.Promise;

//connect to mongoose
mongoose.connect('mongodb://localhost/brainstorm', {
        useMongoClient: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//Handle Idea Model
require('./models/Ideas');
const Idea = mongoose.model('ideas');


//handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');



//Routing

//Index Route
app.get('/', (req, res) => {
    const title = 'Welcome One';
    res.render('index', {
        title: title
    });
});

//About Route
app.get('/about', (req, res) => {
    res.render('about');
})

//Add Idea Form Route
app.get('/idea/add', (req, res) => {
    res.render('ideas/add');
})

const port = 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});