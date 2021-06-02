if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const log = require("./lib/Loggers");
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

mongoose.connect(process.env.MONGODB_NAV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
let db = mongoose.connection;

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());

app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.video = req.flash('video');

    res.setHeader('X-Powered-By', 'Tolfix');
    next();
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

//Override
app.use(methodOverride('_method'));

// Express body parser
app.use(express.urlencoded({ extended: true }));

//Routers goes here
app.use("/r", require("./routes/Redirect"));
app.use("/api", require("./routes/API"));

app.get("/", (req, res) => {
    res.render("main");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, log.verbos(`Server started on port ${PORT}`));

app.get('*', (req, res) => {
    res.status(404).render('partials/notFound');
});

require("./events/MongooseEvents")(db);
require("./events/NodeEvents")()