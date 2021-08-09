const express = require('express');
const router = express.Router();
const Redirect = require("../models/Redirects");
const Redirects = require("../Cache");

router.get("/", async (req, res) => {
    let id = (Object.keys(req.query))[0];
    if(!id)
        return res.render("redirect/fail-redirect");

    const r = Redirects.get(id);

    if(r)
        return res.status(301).redirect(r.redirect);
        

    return Redirect.findOne({ id: id }).then(r =>
    {
        if(!r)
            return res.render("redirect/fail-redirect");
        
        return res.status(301).redirect(r.redirect);
    }).catch(e => {
            return res.render("redirect/fail-redirect");
    });
});

module.exports = router;