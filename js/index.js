$(document).ready(function(){
    
    $('#fonefixo').on('keydown', mascaraFoneFixo);
    $('#fonefixo').on('keyup', mascaraFoneFixo);
   
    $('#redeSim').append('<label class="container">'+
                               '<input type="radio" name="rede" value="sim">'+
                               '<span class="checkmark"></span></label><a class="fontResp">Sim</a>');
    $('#redeNao').append('<label class="container">'+
                               '<input type="radio" checked="checked" name="rede" value="nao">'+
                               '<span class="checkmark"></span></label><a class="fontResp">Não</a>');
    $('#facebook').append('<label class="containerCheck">'+
                               '<input id="face" type="checkbox" name="tipoRede" value="facebook">'+
                               '<span class="checkmarkTipo"></span></label><a class="fontResp">Facebook</a>');
    $('#linkedin').append('<label class="containerCheck">'+
                               '<input type="checkbox" name="tipoRede" value="linkedin">'+
                               '<span class="checkmarkTipo"></span></label><a class="fontResp">Linkedin</a>');
    $('#instagram').append('<label class="containerCheck">'+
                               '<input type="checkbox" name="tipoRede" value="instagram">'+
                               '<span class="checkmarkTipo"></span></label><a class="fontResp">Instagram</a>');                                                      
    $('.select').append('<select id="conheceu">'+
                        '<option value="tv">Tv</option>'+
                        '<option value="internet">Internet</option>'+                
                        '<option value="outros">outros</option></select>');

    $('input:radio').on('click', habilitaCheckbox);
    
    $( window ).load(function(){ habilitaCheckbox();});
});


function habilitaCheckbox() {

    var isDisabled = true;
    var checked = false;
    var temRede = document.form.rede.value;
    if(temRede == 'sim') isDisabled = false;
    
    var inputs = document.querySelectorAll("input[type='checkbox']");
    for(input of inputs) {
        input.disabled = isDisabled;
        if(isDisabled) input.checked = false;    
    }
    
}

var stop = '';
function mascaraFoneFixo() {
    
    var campo = document.getElementById("fonefixo");        
    campo.value = campo.value.replace( /^0/,'' )   
                             .replace( /^(\w\w)(\w)/, '$1-$2' );
                             
    if ( campo.value.length > 11 ) campo.value = stop;
    else stop = campo.value;    
}


function validaTelefone() {

    var fone = document.querySelector("#fonefixo").value;
    var erro = document.querySelector("#errofonefixo");
    erro.innerHTML = "";
        
    if(fone.length > 0) {
         var valor = fone.replace(/\D/g, '');
         if(valor.length == 0)  {
            erro.innerHTML = "Digite Apenas números!";
            return false;
         } 
         if(valor.length < 10)  {
            erro.innerHTML = "Formato de telefone inválido!";
            return false;
         }        
    }
    return fone;
}


function validaNome() {

    var input = document.querySelector("#nome").value;
    var erro = document.querySelector("#erronome");
    erro.innerHTML = ""; 
    if(input.length === 0) {
        erro.innerHTML = "Campo Obrigatório!"; 
        return false;
    }
    if(input.indexOf(" ") < 0) {
        erro.innerHTML = "O nome deve conter ao menos um sobrenome!"; 
        return false;
    }
    return input;
}


var botao = document.getElementById('botao');
botao.addEventListener('click', () => {
        
      var nome = validaNome();
      var fonefixo = validaTelefone();
  
      var conheceu = document.querySelector("#conheceu").value;
      var rede = document.form.rede.value;
      
      if(nome && fonefixo) {
          
            var data = {};
            data.nome = nome;
            data.fonefixo  = fonefixo;
            data.conheceu = conheceu;
            data.rede = rede;
            
            if(rede == 'sim') {
            
                var redes = [];
                var tipoRede = document.querySelectorAll("input[type='checkbox']");
                for(tipo of tipoRede) {
                    
                    if(tipo.checked) redes.push(tipo.value);    
                }
                data.redes = redes;
            } 
            
            var json = JSON.stringify(data);
            
            var request = new XMLHttpRequest();
		    request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    var myObj = JSON.parse(request.responseText);
                                                
                        document.getElementById('botao').disabled = true;
                        console.log(request.responseText);
                }                
		    }		   		
        
            var url = "http://localhost:8080";
			request.open("POST", url);
			request.setRequestHeader('Content-Type', 'application/json');
		 							
			request.send(json);            
      }
});








