$(() => {
    if (!window.sessionStorage.getItem('session')) {
        window.location.replace('./index.html')
    } else {
        $('#user').html(window.sessionStorage.getItem('session'));
        var data = { 'GET': 'metricas', 'user': window.sessionStorage.getItem('session') };
        fetch('https://script.google.com/macros/s/AKfycby5P-TIbNfGiNX61hTIkXIF6MUkR4cPBTHIre0vkxzoXtRmRW8/exec?data=' + encodeURI(JSON.stringify(data)))
            .then((x) => {
                x.text().then((tx) => {
                    $('#metricas').html('Casos ' + tx)
                })
            })

        var data = { 'GET': 'caso', 'user': window.sessionStorage.getItem('session') };
        fetch('https://script.google.com/macros/s/AKfycby5P-TIbNfGiNX61hTIkXIF6MUkR4cPBTHIre0vkxzoXtRmRW8/exec?data=' + encodeURI(JSON.stringify(data)))
            .then((x) => {
                x.text().then((tx) => {
                    tx = JSON.parse(tx);

                    window.sessionStorage.setItem('caso', JSON.stringify(tx))

                    $('#idcaso').html('ID ' + tx[0]);
                    $('#depto').val(tx[2]);
                    $('#loc').val(tx[3]);
                    $('#calle').val(tx[4]);
                    $('#amp').val(tx[5]);
                    $('#puer').val(tx[6]);
                    $('#apt').val(tx[7]);
                    $('#piso').val(tx[8]);
                    $('#barrio').val(tx[9]);

                    $('#carga').hide(); $('#panta').show();

                })
            })
    }
})

const logout = () => {
    window.sessionStorage.removeItem('session')
    window.location.replace('./index.html')
}

const norm = (e) => {
    e.preventDefault()
    var caso = JSON.parse(window.sessionStorage.getItem('caso'));
    if (e.target.elements.choose.value == 'ok') {

        var cc = [caso[0], caso[1], e.target.elements.depto.value, e.target.elements.loc.value, e.target.elements.calle.value, e.target.elements.amp.value, e.target.elements.puer.value, e.target.elements.apt.value, e.target.elements.piso.value, e.target.elements.barrio.value, caso[10]]
        cc = JSON.parse(JSON.stringify(cc).toUpperCase())

        var data = { 'PUT': { 'where': 'cierra' }, 'user': window.sessionStorage.getItem('session'), 'data': cc, 'caso': caso[11] };
        fetch('https://script.google.com/macros/s/AKfycby5P-TIbNfGiNX61hTIkXIF6MUkR4cPBTHIre0vkxzoXtRmRW8/exec?data=' + encodeURI(JSON.stringify(data)))
            .then((x) => {
                x.text().then((tx) => {
                    if (tx == 'okok') {
                        window.location.reload()
                    } else {
                        alert('error normalizando')
                    }
                })
            })
    } else if (e.target.elements.choose.value == 'nl') {

        var cc = [caso[0], caso[1], e.target.elements.depto.value, e.target.elements.loc.value, e.target.elements.calle.value, e.target.elements.amp.value, e.target.elements.puer.value, e.target.elements.apt.value, e.target.elements.piso.value, e.target.elements.barrio.value, caso[10]]
        cc = JSON.parse(JSON.stringify(cc).toUpperCase())

        var data = { 'PUT': { 'where': 'nl' }, 'user': window.sessionStorage.getItem('session'), 'data': cc, 'caso': caso[11] };
        fetch('https://script.google.com/macros/s/AKfycby5P-TIbNfGiNX61hTIkXIF6MUkR4cPBTHIre0vkxzoXtRmRW8/exec?data=' + encodeURI(JSON.stringify(data)))
            .then((x) => {
                x.text().then((tx) => {
                    if (tx == 'okok') {
                        window.location.reload()
                    } else {
                        alert('error normalizando')
                    }
                })
            })
    } else if (e.target.elements.choose.value == 'rep') {
        var coment = prompt('Comentario (Opcional)')

        if (!coment) {
            coment = '';
        }
        var cc = [caso[0], caso[1], e.target.elements.depto.value, e.target.elements.loc.value, e.target.elements.calle.value, e.target.elements.amp.value, e.target.elements.puer.value, e.target.elements.apt.value, e.target.elements.piso.value, e.target.elements.barrio.value, caso[10]]
        cc = JSON.parse(JSON.stringify(cc).toUpperCase())

        var data = { 'PUT': { 'where': 'reporte' }, 'user': window.sessionStorage.getItem('session'), 'data': cc, 'coment': coment, 'caso': caso[11] };
        fetch('https://script.google.com/macros/s/AKfycby5P-TIbNfGiNX61hTIkXIF6MUkR4cPBTHIre0vkxzoXtRmRW8/exec?data=' + encodeURI(JSON.stringify(data)))
            .then((x) => {
                x.text().then((tx) => {
                    if (tx == 'okok') {
                        window.location.reload()
                    } else {
                        alert('error normalizando')
                    }
                })
            })
    }


    if (e.target.elements.choose.value != 'rep') {

        var cc = [caso[0], caso[1], e.target.elements.depto.value, e.target.elements.loc.value, e.target.elements.calle.value, e.target.elements.amp.value, e.target.elements.puer.value, e.target.elements.apt.value, e.target.elements.piso.value, e.target.elements.barrio.value, caso[10], caso[11]]
        cc = JSON.parse(JSON.stringify(cc).toUpperCase())
        caso = JSON.parse(JSON.stringify(caso).toUpperCase())

        if (JSON.stringify(cc) != JSON.stringify(caso)) {
            var data = { 'PUT': { 'where': 'know' }, 'user': window.sessionStorage.getItem('session'), 'data': cc, 'antdata': caso, 'sol': e.target.elements.choose.value };
            fetch('https://script.google.com/macros/s/AKfycby5P-TIbNfGiNX61hTIkXIF6MUkR4cPBTHIre0vkxzoXtRmRW8/exec?data=' + encodeURI(JSON.stringify(data)))
        }

    }


}