var express = require('express');
var api = express.Router();
var b8 = require('../../data/8base.json')
var b64 = require('../../data/64base.json')
api.get('/code', 
    (req, res, next) => {
        var result = { }
        b8.forEach(b => {
            if (b.code == req.query.c1) {
                result.u = b;
            }
            if (b.code == req.query.c2) {
                result.d = b
            }
        })
        b64.forEach(b => {
            if ((b.u == result.u.num) && (b.d = result.d.num)){
                result.result = b
            }
        })
        var desc = require(`../../data/${result.result.num}.json`)
        result.desc = desc;
        return res.status(200).json({code: 200, data: result})
    }  
)
module.exports = api;
