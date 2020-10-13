$(() => {
if(window.sessionStorage.getItem('session')){
    window.location.replace('./moderacion.html')
}

    var data = { 'GET': 'users' };
    fetch('https://script.google.com/macros/s/AKfycby5P-TIbNfGiNX61hTIkXIF6MUkR4cPBTHIre0vkxzoXtRmRW8/exec?data=' + encodeURI(JSON.stringify(data)))
        .then((x) => {
            x.text().then((tx) => {
                tx = JSON.parse(tx)

                for (let i = 0; i < tx.length; i++) {
                    $('#namechoose').append('<option value="' + tx[i] + '">' + tx[i] + '</option>');
                }
                $('#namechoose').append('<option value="oto">OTRO</option>');
            })
        })
    //CONECTAR CON EL SERVIDOR
    //VER SI NO ESTABA LOGUEADO ANTES
})

const comenzar = (e) => {
    e.preventDefault()
    if (e.target[0].value == 'oto') {
        var otroname = $('#ott').val()
        if (!otroname) {
            alert('COLOCAR NOMBRE DEL ANALISTA')
        } else {
            var data = { 'PUT': { 'where': 'users', 'data': otroname } };
            fetch('https://script.google.com/macros/s/AKfycby5P-TIbNfGiNX61hTIkXIF6MUkR4cPBTHIre0vkxzoXtRmRW8/exec?data=' + encodeURI(JSON.stringify(data)))
                .then((x) => {
                    x.text().then((tx) => {
                        if (tx == 'okok') {
                            alert('Se añadió el analista')
                            window.sessionStorage.setItem('session', otroname);
                            window.location.replace('./moderacion.html')
                        } else {
                            alert('error añadiendo analista')
                        }
                    })
                })
        }
    } else if(e.target[0].value) {
        window.sessionStorage.setItem('session', e.target[0].value)
        window.location.replace('./moderacion.html');
    }else{
        alert('debes elegir un analista')
    }
}

const choosed = (e) => {
    if (e.target.value == 'oto') {
        $('#ott').val('')
        $('#otro').show()
    } else {
        $('#otro').hide()
    }
}

