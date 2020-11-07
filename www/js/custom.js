var list = []

const refleshList = () => {
    var listHTML = []
    var checked = ''
    list.forEach(function (value, index) {
        listHTML.push(`<li id="${index}" class="collection-item">
        <div class="list-container">
            <b>Nome:</b> ${value.nome}<br>
            <a onclick="deleteList(${index})" class=" secondary-content">
                <i class="material-icons blue-text">clear</i>
            </a><br>
            <b>Telefone:</b> ${value.telefone}
        </div>
    </li >`)
    })
    $('#list-level').html(listHTML);
}

const addList = () => {
    if ($('#nome').val() === '' && $('#telefone').val() === '') {
        $('#error-text').html(`Você deve preencher todos os campos antes!`)
        $('#error').fadeIn('2.5s')
    }
    else if ($('#nome').val() === '') {
        $('#error-text').html(`Você deve preencher o campo "Nome" antes!`)
        $('#error').fadeIn('2.5s')
    }
    else if ($('#telefone').val() === '') {
        $('#error-text').html(`Você deve preencher o campo "Telefone" antes!`)
        $('#error').fadeIn('2.5s')
    }
    else if ($('#telefone').cleanVal().length < 10) {
        $('#error-text').html(`Preencha o campo "Telefone" corretamente!`)
        $('#error').fadeIn('2.5s')
    }
    else {
        list.push({ nome: $('#nome').val(), telefone: $('#telefone').val() })
        $('#nome').val('')
        $('#telefone').val('')
        $('label[for="nome"]').attr('class', $('label[for="nome"]').attr('class').replace(/\bactive\b/g, ''))
        $('label[for="telefone"]').attr('class', $('label[for="nome"]').attr('class').replace(/\bactive\b/g, ''))
        refleshList()
    }
}

const deleteList = (id) => {
    list.splice(id, 1)
    refleshList()
}

//A regexp /\D/g em conjunto com o replace, está anulando todo caractere não numerico
//\D representa todo caractere não numerico

var maskFunc = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 0.0000-0000' : '(00) 0000-00009';
},
    maskFuncOptions = {
        onKeyPress: function (val, e, field, options) {
            field.mask(maskFunc.apply({}, arguments), options);
        }
    };

$('#telefone').mask(maskFunc, maskFuncOptions)