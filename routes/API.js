const express = require('express');
const router = express.Router();
const Redirect = require("../models/Redirects");
const crypto = require("crypto");
const { GFS_find, GFS_findOne, GFS_DisplayImage, GFS_Remove } = require("../lib/GFS");

router.post("/redirect", (req, res) => {
    let redirect = req.query.redirect;
    if(redirect)
    {
        //URL validation
        let expression = /^(https?):\/\/[^\s$.?#].[^\s]*$/gm;
        if(redirect.match(expression))
        {
            crypto.randomBytes(4, (err, buf) => {
                if (err) {
                    res.status(500).json({
                        status: 'error',
                        msg: `Something went wrong when making redirect`
                    });
                };
        
                const id = buf.toString('hex');
                new Redirect({
                    id: id,
                    redirect: redirect
                }).save().then(() => {
                    res.status(201).json({
                        status: 'success',
                        msg: `Succesfully created redirect`,
                        redirect: `${id}`,
                        url: `https://tlx.tf/r?${id}`
                    });
                }).catch(e => {
                    res.status(500).json({
                        status: 'error',
                        msg: `Something went wrong when making redirect`
                    });
                })
            });  
        }
        else
        {
            res.status(400).json({
                status: 'error',
                msg: `Please input an URL`
            });
        }
    }
    else
    {
        res.status(400).json({
            status: 'error',
            msg: `Please include a URL to redirect`
        });
    }
});

router.get("/file", (req, res) => {
    let file = req.query.file;
    if(file)
    {
        GFS_DisplayImage(file).then(f => {
            f.pipe(res);
        }).catch(e => {
            res.status(500).json({
                status: 'error',
                msg: `Something went wrong.. try again later.`
            });
        })
    }
    else
    {
        res.status(400).json({
            status: 'error',
            msg: `Please include a file name.`
        });
    }
});

module.exports = router;