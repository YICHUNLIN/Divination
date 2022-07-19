$().ready(() => {

    function getDiv(u, d){
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `https://divination.kmn.tw/api/v1/64/code?c1=${u}&c2=${d}`,
                cache: false,
                type: 'get',
                contentType: 'application/json; charset=utf-8',
            })
            .done(function(data) {
                resolve(data)
            })
            .catch(function(err) {
                reject(err)
            });
        })
    }

    function showResult(data) {
        const d = data.data;
        $('#result').empty()
        $('#result').append($('<p>').text(`上${d.u.name}(${d.u.alias}),下${d.d.name}(${d.d.alias}),  第${d.result.num}卦 - ${d.result.name}`));
        Object.keys(d.desc)
            .forEach( key => {
                // $('#result').append($('<p>').text(`${key}:`));
                d.desc[key]
                    .forEach(value => {
                        $('#result').append($('<p>').text(`${value}:`));
                    })
                
            })
    }

    $('#do_query').click(() =>  {
        const u = $('#ubgInput').val();
        const d = $('#dbgInput').val();
        getDiv(u, d)
            .then(data => showResult(data))
            .catch(err => {
                console.log(err)
            })
    });
})