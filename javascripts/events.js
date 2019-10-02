$(document).ready(function(){

  var larguraDocumento = $( window ).outerWidth();

  //CONTROLE CARTAS

  //Indicador de cartas restantes no monte
  var monteCartas = 10;

  //PARA TESTE
  // var monteCartas = 2;

  $(".coluna1 h5").text("Restam " + monteCartas + " cartas");
  function atualizaMonte(){
    if (monteCartas > 1){
    $(".coluna1 h5").text("Restam " + monteCartas + " cartas");
  } else if (monteCartas == 1){
    $(".coluna1 h5").text("Resta " + monteCartas + " carta");
  }  else {
    $(".coluna1 h5").text("Você está na última carta");
  }
}

  //Função que recebe um array e devolve ele embaralhado.
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  // Determinação de ordem das cartas sem randomizar
  // var sequenciaCartas = ["1","2","3","4","5","6","7","8","9","10"]
  // console.log("sequencia original - " + sequenciaCartas);
  // novasequenciaCartas = sequenciaCartas;
  // console.log("sequencia embaralhada - " + novasequenciaCartas);

  // Determinação de ordem das cartas com randomização
  var sequenciaCartas = ["1","2","3","4","5","6","7","8","9","10"]
  // console.log("sequencia original - " + sequenciaCartas);
  novasequenciaCartas = shuffle(sequenciaCartas);
  // console.log("sequencia embaralhada - " + novasequenciaCartas);

  i = 0
  var cartaAtual = 0
  var proximaCarta = "#card" + novasequenciaCartas[i]

  // Ações para clique no deck
  function sacaCarta(){
    if (monteCartas == 10) {
      $(".carta").show();
      $(".respostas>div").fadeIn();
    };
    $(proximaCarta).show();
    $(cartaAtual).addClass("animated fadeOut");
    $(proximaCarta).addClass("animated fadeInUp");
    monteCartas--;
    atualizaMonte();
    i++;
    cartaAtual = proximaCarta;
    proximaCarta = "#card" + novasequenciaCartas[i]
    $(".coluna1 h5 span").addClass("pulsante");
    $(".cliqueCarta").fadeOut();
    dicasAbertas = 0;
    resetaRespostas();
    $("#botao-responder").addClass("desligado");
  };

  //saque de carta
  $(".deck").click(function() {

    if ($(this).hasClass("desbloq")){
      $(".proxima-carta").prev().addClass("proxima-carta");
      $(".mobile .deck img:first-of-type").addClass("animated pulse");
      $(".proxima-carta.liberado").addClass("animated fadeOutUp");
      $(".proxima-carta.liberado").removeClass("proxima-carta liberado")
      $(this).removeClass("desbloq")
      sacaCarta();
    }
  });

  // Ações para mostrar resultado final
  function resultadoFinal(){
    if (larguraDocumento > 767.98){
    setTimeout(function(){
      $(".resultado").collapse();
      $("html, body").animate({ scrollTop: $(".resultado").offset().top - ( $(window).height() ) / 2  }, 800);
    }, 1000);
    printaResultado();
    }
  }

  // Devolve o feedback com base no cálculo de pontos
  function printaResultado(){
    $(".resultado .container span").append(pontos);
    if (pontos>139) {
      $(".resultado .container").append(
        '<p>Muito bem! Você compreendeu bem as premissas de cada abordagem teórica sobre ensino e aprendizagem. Se quiser salvar um documento com as principais características de cada corrente abordada, <a href="assets/que-teoria-sou-eu.pdf" target="_blank">clique aqui</a>.</p>')
    } else if (pontos>109){
      $(".resultado .container").append(
        '<p>Você está no caminho certo! Para esclarecer ainda mais a relação entre as abordagens teóricas e suas características, salve um documento com as principais informações de cada uma <a href="assets/que-teoria-sou-eu.pdf" target="_blank">clicando aqui</a>.</p>')
    } else if (pontos>79){
      $(".resultado .container").append(
        '<p>Parece que você ainda tem dúvidas quanto às diversas abordagens teóricas sobre ensino e aprendizagem… Que tal jogar novamente?</p><p>Para ajudá-lo a estudar, salve um documento com as principais características de cada corrente teórica <a href="assets/que-teoria-sou-eu.pdf" target="_blank">clicando aqui</a>.</p>')
    } else {
      $(".resultado .container").append(
        '<p>Você apresenta algumas dificuldades quanto às diversas abordagens teóricas sobre ensino e aprendizagem… Que tal jogar novamente?</p><p>Para ajudá-lo a estudar, salve um documento com as principais características de cada corrente teórica <a href="assets/que-teoria-sou-eu.pdf" target="_blank">clicando aqui</a>.</p>')
    }
  }

  //libera próxima carta
  function liberaProxima(){
    if (monteCartas>0) {
    $(".deck").addClass("desbloq");
    $(".proxima-carta").addClass("liberado");
    $(".cliqueCarta").fadeIn();
    $(".mobile .deck img:first-of-type").removeClass("animated pulse");
  } else {
    resultadoFinal();
  }
  }
  //resolve carta atual
  function resolveCarta(){
    $(cartaAtual).addClass("resolvida");
    var dicasAtuais = cartaAtual + " .collapse";
    $(dicasAtuais).addClass("show");
    $(cartaAtual + " .instrucoes-carta").hide();
    var botoesAtuais = cartaAtual + " .dica div:first-of-type";
    $(botoesAtuais).off();
    // Detecta clique na carta para virá-la
    $(".card-container.resolvida").click(function() {
      gira_carta($(this));
    });
    gira_carta($(cartaAtual));
  }


  //ROTATING CARDS

  // Ações para girar cartas
  function gira_carta(estacarta) {
    //Rotaciona carta
    if (estacarta.hasClass('hover')) {
      estacarta.removeClass('hover');
    } else {
      estacarta.addClass('hover');
    }
  };

  //CÁLCULO PONTUAÇÃO
  var pontos = 160

  //ABRE DICA
  //Esconde instrução das dicas após aberta a última
  var dicasAbertas = 0;

  //Abre dica
  $(".dica div:first-child").click(function(){
    resetaRespostas();
    $("#botao-responder").removeClass("desligado");
    $(this).addClass("dicaaberta");
    $(this).off();
    $(this).next().collapse();
    pontos--;
    dicasAbertas++;
    if (dicasAbertas>6){
      $(cartaAtual + " .instrucoes-carta").hide();
    };
  })

  // Volta as respostas ao estado original
  function resetaRespostas(){
    $(".feedback-imediato").hide();
    $(".feedback-esgotado").hide();
    $(".feedback-correto").hide();
    $(".alternativas").addClass("recolhido");
    $(".alternativas div").removeClass("bloqueado");
    $(".alternativas div").removeClass("resp-certa");
    $(".alternativas div").removeClass("resp-errada");
    $("#botao-responder").removeClass("bloqueado");
    $("#botao-responder").removeClass("acionado");
  }

  //ABRE RESPOSTAS
  $("#botao-responder").on("click",function(){
    $(".alternativas").toggleClass("recolhido");
    $("#botao-responder").toggleClass("acionado");
  })

  //CONFERE RESPOSTAS
  // Tradicional
  $(".alternativas div:first-of-type").click(function(){
    var este = $(this);
    travaTudo();
    if (cartaAtual=="#card1" || cartaAtual=="#card2"){
      respostaCerta(este)
    } else {
      respostaErrada(este)
    }
  })
  // Comportamentalista
  $(".alternativas div:nth-of-type(2)").click(function(){
    var este = $(this);
    travaTudo();
    if (cartaAtual=="#card3" || cartaAtual=="#card4"){
      respostaCerta(este)
    } else {
      respostaErrada(este)
    }
  })
  // Humanista
  $(".alternativas div:nth-of-type(3)").click(function(){
    var este = $(this);
    travaTudo();
    if (cartaAtual=="#card5" || cartaAtual=="#card6"){
      respostaCerta(este)
    } else {
      respostaErrada(este)
    }
  })
  // Cognitivista
  $(".alternativas div:nth-of-type(4)").click(function(){
    var este = $(this);
    travaTudo();
    if (cartaAtual=="#card7" || cartaAtual=="#card8"){
      respostaCerta(este)
    } else {
      respostaErrada(este)
    }
  })
  // Sociocultural
  $(".alternativas div:nth-of-type(5)").click(function(){
    var este = $(this);
    travaTudo();
    if (cartaAtual=="#card9" || cartaAtual=="#card10"){
      respostaCerta(este)
    } else {
      respostaErrada(este)
    }
  })

  //AÇÕES PARA RESPOSTAS
  function travaTudo(){
    $(".alternativas div").addClass("bloqueado");
    $("#botao-responder").addClass("bloqueado");
  }
  function respostaCerta(este){
    liberaProxima();
    resolveCarta();
    este.addClass("resp-certa");
    if (monteCartas > 0){
      $(".feedback-correto").show();
    } else {
      $(".feedback-correto-final").show();
    };
    scrollmeiodaResposta();
  }
  function respostaErrada(este){
    este.addClass("resp-errada");
    pontos--;
    if (dicasAbertas>7) {
      resolveCarta();
      if (monteCartas > 0) {
        $(".feedback-esgotado").show();
      } else {
        $(".feedback-esgotado-final").show();
      }
      liberaProxima();
    } else {
      $(".feedback-imediato").show();
    };
    scrollmeiodaResposta();
  }

  /////////////////////////////////
  // FUNÇÕES EXCLUSIVAS MOBILE/////
  /////////////////////////////////

  function scrolltopodaCarta(){
    $("html, body").animate({ scrollTop: $(".mobile .deck").offset().top - 26}, 800);
  }

  function scrollmeiodaResposta(){
    if ($('.respostas>div').hasClass("estatico")){
      $("html, body").animate({ scrollTop: $(".respostas").offset().top - 50  }, 500);
    }
  }

  // Ações para clique nos botões dos feedbacks
  $(".fecha-feedback").click(function(){
    // resetaRespostas();
    $(".alternativas").addClass("recolhido");
    $("#botao-responder").addClass("desligado");
    $(".feedback-imediato").hide();
    $(".feedback-esgotado").hide();
    $(".feedback-correto").hide();
  });

  $(".feedback-correto .fecha-feedback").click(function(){
    scrolltopodaCarta();
  });

  $(".feedback-correto-final .fecha-feedback").click(function(){
    resultadoFinalMobile();
    $(".respostas").fadeOut();
  });

  $(".feedback-esgotado .fecha-feedback").click(function(){
    scrolltopodaCarta();
  });

  $(".feedback-esgotado-final .fecha-feedback").click(function(){
    resultadoFinalMobile();
    $(".respostas").fadeOut();
  });


  // RESULTADO FINAL SOMENTE APÓS OK
  function resultadoFinalMobile(){
    if (larguraDocumento < 767.98){
      setTimeout(function(){
        $(".resultado").collapse();
        $("html, body").animate({ scrollTop: $(".resultado").offset().top - 60}, 800);
      }, 450);
      printaResultado()
  }
}

//EXECUTA FUNÇÃO BASEADO NA VISIBILIDADE DE UM ELEMENTO NA VIEWPORT
$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top + 110;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  // detecta visibilidade do elemento antes e depois
  // return elementBottom > viewportTop && elementTop < viewportBottom;

  // detecta visibilidade do elemento antes
  // return elementTop < viewportBottom;
  return elementTop < viewportBottom;
};

// Fixa o botão de resposta na parte inferior dependendo do scroll da tela
$(window).on('resize scroll', function() {
  if (larguraDocumento < 767.98){
    $('.respostas').each(function() {
        var activeColor = $(this).attr('id');
      if ($(this).isInViewport()) {
        $('.respostas>div').addClass("estatico")
        $('.respostas>div').css("box-shadow", "none");
        $('.respostas>div').css("position", "static");
        $('.respostas .alternativas>div').css("border-left", "1px solid #808080")
        $('.respostas .alternativas>div').css("border-right", "1px solid #808080")
        $('.respostas .alternativas>div:last-of-type').css("border-bottom", "1px solid #808080")
      } else {
        $('.respostas>div').removeClass("estatico")
        $('.respostas>div').css("box-shadow", "0 -1px 2px rgba(0,2,0,0.24)")
        $('.respostas>div').css("position", "fixed");
        $('.respostas .alternativas>div').css("border-left", "none")
        $('.respostas .alternativas>div').css("border-right", "none")
        $('.respostas .alternativas>div:last-of-type').css("border-bottom", "none")
      }
    });
  }
});


}); //fim document ready

$( window ).on( "load", function() {
  //DEFINE ALTURA DAS CARTAS PELA MAIOR CARTA
  var alturaCarta = $(".maior-carta .card").height();
  var larguraJanela = $( window ).outerWidth();
  if (larguraJanela > 767.98){
    $(".card-container").height(alturaCarta);
    $(".carta").height(alturaCarta);
    $(".carta").css('min-height', alturaCarta);
  }
  $(".maior-carta").removeClass("maior-carta");
  $(".collapse.show").removeClass("show");
  $("#card3").hide();
  if (larguraJanela < 1250){
    $(".carta").hide();
  }
});
