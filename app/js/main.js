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
    pesquisar(email);

    var LoR = response.getAuthResponse().id_token;

    $("#btnEntrar").click(function(){
        loginSucess(userEmail);
    });
    $("#btnSair").click(function(){
        deslogar();
    });
};

function deslogar() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        openWin();
    });
}

function openWin() {
    var myWindow;
    myWindow = window.open("https://accounts.google.com/logout", "_blank", "width=10,height=10");
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
        $('#reunioesRequerinte').html(result);
        $('#reunioesParticipante').html(result);
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
			}else{
				if(filterBy == 'data'){
					$('#filter-responsavel, #filter-sala').hide();
					$('#filter-data').show();
				}
			}
		}
	});
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

function tokenfield(){
    $('#participantes').tokenfield();
}

$(document).ready(function () {
    filter();
	datePicker();
    tokenfield();
});