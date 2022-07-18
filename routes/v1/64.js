var express = require('express');
var api = express.Router();
var b8 = require('../../data/8base.json')
var b64 = require('../../data/64base.json')
var descs = {};
for (var i = 1; i <= 64; i++) {
    descs[i] = require(`../../data/${i}.json`);
}
console.log('010x'.match(/[0-1][0-1][0-1]/))
api.get('/code', 
    (req, res, next) => {
        if(!(req.query.hasOwnProperty('c1') && req.query.hasOwnProperty('c2'))) 
            return res.status(400).json({code: 400, message: 'query must contain c1 and c2'});
        let c1 = req.query.c1.match(/[0-1][0-1][0-1]/);
        let c2 = req.query.c2.match(/[0-1][0-1][0-1]/);
        if (!(c1 && c2)) return res.status(400).json({code: 400, message: 'c1 and c2 must be 3 digital 0 or 1'});
        return next();
    }, 
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
            if ((b.u == result.u.num) && (b.d == result.d.num)){
                console.log(b)
                result.result = b
            }
        })
        result.desc = descs[result.result.num];
        return res.status(200).json({code: 200, data: result})
    }  
)


module.exports = api;
