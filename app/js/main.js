var url;

function onSignIn(response) {
    var perfil = response.getBasicProfile();
    var userID = perfil.getId();
    var userName = perfil.getName();
    var userEmail = perfil.getEmail();
    var userPicture = perfil.getImageUrl();
    $('#responsavel').val(userName);
    $('#imagemPerfil').html("<img id='circle' src=" + userPicture + ">");
    $('#nomeUsuario').html(userName);
    $('#email').html(userEmail);
    var dominio = userEmail.indexOf("@");
    var email = userEmail.substring(0, dominio);
    var espaco = userName.indexOf(" ");   
    userName = userName.replace(/[ìíî]/,"i");
    var nome = userName.substring(0, espaco);
    pesquisar(email);
    var LoR = response.getAuthResponse().id_token;

    $("#btnEntrar").click(function(){
        loginSucess(userEmail);
    });
    $("#btnSair").click(function(){
        deslogar();
    });

    $("#btnRequisicao").click(function(){
        popularSelect();
    });
};

function popularSelect(){
  url = "http://localhost:9000/sala/";
  var salas = ajax(url, "GET");
  url = "http://localhost:9000/sala/hora";
  var horarios = ajax(url, "GET");
  $('#sala').html('');
  var NumSala = 1;
  for(var i=0; i<salas.length; i++){
    $('#sala').append('<option value='+NumSala+'>'+salas[i].nomeSala+'</option>');
    NumSala++;
  }

  var NumHorario = 1;
  $('#horario').html('');
  for(var i=0; i<horarios.length; i++){
    $('#horario').append('<option value='+NumHorario+'>'+horarios[i].hora+'</option>');
    NumHorario++;
  }
}

function deslogar() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        openWin();
    });
}

function openWin() {
    var myWindow = window.open("https://accounts.google.com/logout", "_blank", "width=10,height=10");
    setTimeout(function(){
        myWindow.close();
    }, 500);
    setTimeout(function(){
        window.location.assign("http://localhost:9000/login");
    }, 1000);
}

 function loginSucess(userEmail){
     var tamanhoTotal = userEmail.length;
    var dominio = userEmail.indexOf("@");
    var email = userEmail.substring(0, dominio);
    var posicao = userEmail.substring(dominio+1,tamanhoTotal);

    if (posicao == "digitaldesk.com.br"){
        window.location = "http://localhost:9000/reunioes";
    }
    else {
        alert("Este e-mail não tem acesso ao site!");
    }
 }

function pesquisar(email){
 url = "http://localhost:9000/busca/"+email;
 var result = '';
 $.ajax({
     type: "GET",
     url: url,
     async: false,
     datatype: "text/html",
     success: function(data) {
        result += data;
        $('#reunioesRequerente').html(result);
     }
 });
 return result;
}

function filter(){
    $('#filter').on('change', function(){
        var filterBy = $(this).val();
        
        if(filterBy == 'responsavel'){
            $('#filter-data, #filter-sala').hide();
            $('#filter-responsavel').show();
        }else{
            if(filterBy == 'sala'){
                $('#filter-data, #filter-responsavel').hide();
                $('#filter-sala').show();
                url = "http://localhost:9000/sala/";
                var result = ajax(url, "GET"); 
                var NumSala = 1;
                for(var i=0; i<result.length; i++){
                    $('#filter-sala').append('<option value='+NumSala+'>'+result[i].nomeSala+'</option>');
                    NumSala++;
                }
            }else{
                if(filterBy == 'data'){
                    $('#filter-responsavel, #filter-sala').hide();
                    $('#filter-data').show();
                }
            }
        }
    });
}

function ajax(url, type){
 var result = '';
 $.ajax({
     type: type,
     url: url,
     async: false,
     //datatype: "json",
     success: function(data) {
        result = data;
     }
 });
 return result;
}


function datePicker(){
	$('#form-reservar #data, #filter-data').datepicker({
	    format: "dd/mm/yyyy",
	    weekStart: 0,
	    maxViewMode: 3,
	    todayBtn: "linked",
	    clearBtn: true,
	    language: "pt-BR",
	    orientation: "bottom right",
	    multidate: false,
	    daysOfWeekDisabled: "0",
	    daysOfWeekHighlighted: "0",
	    autoclose: true,
	    todayHighlight: true,
	    toggleActive: true
	});
}

function pesquisaSala(){
    var entrada = $("#filter-sala").val();
    url = "http://localhost:9000/sala/"+entrada;
    var result = ajax(url, "GET"); 
    if (result.length == 0) alert ("Nenhuma reunião encontrada");
    var consultaSala ='';
    for(var i=0; i < result.length; i++){
        consultaSala += '<tr  data-id="' + result[i].id + '"><td>' + result[i].dia + '</td>';
        consultaSala += '<td>' + result[i].hora + '</td>';
        consultaSala += '<td>' + result[i].nomeSala + '</td>';
        consultaSala += '<td>' + result[i].nome + '</td>';
        consultaSala += '<td>' + result[i].integranteId + '</td><td><span class="fa fa-pencil" data-type="editReuniao"></span></td><td><span class="fa fa-trash" data-type="deleteReuiniao"  data-toggle="modal" data-target="#modalDelete"></span></td></tr>';
    }
    $('#tabelaReservas').html(consultaSala);
}

function pesquisaData(){
    var data = $("#filter-data").val();
    var entrada = validacao(data);
    url = "http://localhost:9000/data/"+entrada;
    var result = ajax(url, "GET");
    if (result.length == 0) alert ("Nenhuma reunião encontrada");
    var consultaData = '';
    for(var i=0; i < result.length; i++){
    consultaData += '<tr data-id="' + result[i].id + '"><td>' + result[i].dia + '</td>';
    consultaData += '<td>' + result[i].hora + '</td>';
    consultaData += '<td>' + result[i].nomeSala + '</td>';
    consultaData += '<td>' + result[i].nome + '</td>';
    consultaData += '<td>' + result[i].integranteId + '</td><td><span class="fa fa-pencil" data-type="editReuniao"></span></td><td><span class="fa fa-trash" data-type="deleteReuiniao"  data-toggle="modal" data-target="#modalDelete"></span></td></tr>';
    }
    $('#tabelaReservas').html(consultaData);
}

function pesquisaResponsavel(){
    var entrada = $("#filter-responsavel").val();
    url = "http://localhost:9000/responsavel/"+entrada;
    var result = ajax(url, "GET");
    if (result.length == 0) alert ("Nenhuma reunião encontrada");
    var consultaResponsavel = '';
    for(var i=0; i < result.length; i++){
        consultaResponsavel += '<tr data-id="' + result[i].id + '"><td>' + result[i].dia + '</td>';
        consultaResponsavel += '<td>' + result[i].hora + '</td>';
        consultaResponsavel += '<td>' + result[i].nomeSala + '</td>';
        consultaResponsavel += '<td>' + result[i].nome + '</td>';
        consultaResponsavel += '<td>' + result[i].integranteId + '</td>';
        consultaResponsavel += '<td><span class="fa fa-pencil" data-type="editReuniao"></span></td><td><span class="fa fa-trash" data-type="deleteReuniao"  data-toggle="modal" data-target="#modalDelete"></span></td></tr>';
    }
    $('#tabelaReservas').html(consultaResponsavel);
}

function encaminharRequisicao(selectValue){
    var selectValue = $("#filter").val();
    if (selectValue == "sala") pesquisaSala();
    else if (selectValue == "data") pesquisaData();
    else if (selectValue == "responsavel") pesquisaResponsavel();
    $('#filter-responsavel').val('');
    $('#filter-data').val('');
}

function validacao(data){
    data = data.replace(/[:/]/g, '-');
    return data;
}

function validacaoNomes(data){
    data = data.replace(/[:/]/g, '-');
    return data;
}

function inserirDados(){
    var sala = $("#sala").val();
    var data = $("#data").val();
    var horario = $("#horario").val();
    var responsavel = $("#responsavel").val();
    var pauta = $("#pauta").val();
    var participantes = $("#participantes").val();

    data = validacao(data);
    url = 'http://localhost:9000/inserir/'+data+'/'+pauta+'/'+participantes+'/'+responsavel+'/'+sala+'/'+horario;
    ajax(url, "POST");
}

function testeApagar(id){
  $("#botaoApagar").click(function(){
        url ='http://localhost:9000/deletar/'+id;
        ajax(url, "DELETE");
        location.reload();
    });
}

function tokenfield(){
    $('#participantes').tokenfield();
}

$(document).ready(function () {
    filter();
	datePicker();
    tokenfield();

    $("#botao").click(function(){
      encaminharRequisicao();
    });

    $("#reservar").click(function(){
      inserirDados();
    });

    $('#tabelaReservas').on('click', '.fa-trash, .fa-pencil', function(){
        var id = $(this).closest('tr').data('id');
        testeApagar(id);
    });
});

$(document).keypress(function(e) {
    if (e.which == 13) {encaminharRequisicao();}
});