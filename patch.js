const request = require("request");
const cheerio = require("cheerio");
const fs = require('fs');
const b64 = require('./data/64base.json')
const Crawler = (name) => {
    return new Promise((resolve, reject) => { 
        request({
            url: encodeURI("https://zh.wikisource.org/wiki/周易/" + name),
            method: "GET"
        }, (error, res, body) => {
            // 如果有錯誤訊息，或沒有 body(內容)，就 return
            if (error || !body) {
                return reject(error);
            }
            const $ = cheerio.load(body);
            const content = $("#mw-content-text")
            const list = content.text().split("\n");
            var data = [];
            var state = false;
            for (let i = 0; i < list.length; i++) {
                if (list[i] == "易經：") state = true;
                if (state && (list[i].length > 0) && (!list[i].includes('wikisource') )) {
                    data.push(list[i])
                }
            }
            return resolve(data)
        });
    })
   
};

const save = (name, data) => {
    fs.writeFileSync(`./data/${name}.json`, JSON.stringify(data))
}

const analusis = (data) => {
    var d1 = []
    var d2 = []
    var d3 = []
    var s_d1 = false;
    var s_d2 = false;
    var s_d3 = false;
    data.forEach(d => {
        if (s_d1) {
            d1.push(d)
        } else if (s_d2) {
            d2.push(d)
        } else if (s_d3){
            d3.push(d)
        }
        if (d == "易經：")  {
            s_d1 = true;
            s_d2 = false;
            s_d3 = false;
        }else if (d == "彖曰：")  {
            s_d1 = false;
            s_d2 = true;
            s_d3 = false;
        } else if (d == "象曰："){
            s_d1 = false;
            s_d2 = false;
            s_d3 = true;
        }
    })
    return {
        "易經": d1,
        "彖曰": d2,
        "象曰": d3
    }
}

b64.forEach(b => {
    Crawler(b.name)
        .then(result => {
            const data = analusis(result)
            save(b.num, data)
        })
        .catch(err => console.log(err))
})