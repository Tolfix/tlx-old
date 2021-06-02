const express = require('express');
const router = express.Router();
const Redirect = require("../models/Redirects");

router.get("/", (req, res) => {
    let id = (Object.keys(req.query))[0];
    if(id)
    {
        Redirect.findOne({ id: id }).then(r => {
            if(!r)
                return res.render("redirect/fail-redirect");
            return res.status(301).redirect(r.redirect);

        }).catch(e => {
            return res.render("redirect/fail-redirect");
        });
    }
    else
    {
        return res.render("redirect/fail-redirect");
    }
});

module.exports = router;