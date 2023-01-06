function getPokemon(){
  let searchInput = document.getElementById('searchInput');

  fetch('https://pokeapi.co/api/v2/pokemon/' + searchInput.value.toLowerCase())
  .then(response => {
    if (response.status === 404){
      alert('Qual é este Pokemon? \n"O' + searchInput.value.toLowerCase() + '" não existe.\nTenta Novamente!')
    }

    return response.json().then(data => ({
      status: response.status,
      data
    }))
  })
  .then(function(result) {
    document.getElementById('pokebola').hidden = true;
    document.getElementById('pokeCard').hidden = false;

    document.getElementById('imgPoke').src = result.data.sprites.front_default;

    const firstLetter = result.data.name.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = result.data.name.slice(1)
    document.getElementById('nomeIdPoke').innerText = "#" + result.data.id + " " + firstLetterCap + remainingLetters;

    preencherTipo(result);

    preencherHabilidade(result);

    document.getElementById('alturaPoke').innerText = (parseInt(result.data.height) / 10) + "m";
    document.getElementById('pesoPoke').innerText = (parseInt(result.data.weight) / 10) + "kg";
    document.getElementById('sizeDiv').removeAttribute('hidden');

    preencherStats(result);
  });
}

function getPokemonById(direcao){
  let idPoke = document.getElementById('nomeIdPoke').innerText;
  var tst = idPoke.split(' ');

  let id = tst[0].slice(1);

  if (direcao === "anter")
    id = parseInt(id) - 1;
  else if (direcao === "prox")
    id = parseInt(id) + 1;

  if (id === 0)
    id = 898;

  fetch('https://pokeapi.co/api/v2/pokemon/' + id)
  .then(response => {
    if (response.status === 404){
      alert('Qual é este Pokemon? \n"O' + searchInput.value.toLowerCase() + '" não existe.\nTenta Novamente!')
    }

    return response.json().then(data => ({
      status: response.status,
      data
    }))
  })
  .then(function(result) {
    document.getElementById('pokebola').hidden = true;
    document.getElementById('pokeCard').hidden = false;

    document.getElementById('imgPoke').src = result.data.sprites.front_default;

    const firstLetter = result.data.name.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = result.data.name.slice(1)
    document.getElementById('nomeIdPoke').innerText = "#" + result.data.id + " " + firstLetterCap + remainingLetters;

    preencherTipo(result);

    preencherHabilidade(result);

    document.getElementById('alturaPoke').innerText = (parseInt(result.data.height) / 10) + "m";
    document.getElementById('pesoPoke').innerText = (parseInt(result.data.weight) / 10) + "kg";
    document.getElementById('sizeDiv').removeAttribute('hidden');

    preencherStats(result);
  });
}

function imagensTipo(tipo, elemento){
  elemento.src = "./tipoImgs/" + tipo + ".gif";
}

function preencherTipo(result){
  result.data.types.forEach(function(objeto, indice){
    if(indice == 0)
      imagensTipo(objeto.type.name, document.getElementById('imgTipo1'));
    else
      imagensTipo(objeto.type.name, document.getElementById('imgTipo2'));
  })

  if (result.data.types.length < 2 && result.data.types.length > 0)
    document.getElementById('imgTipo2').hidden = true;
  else
    document.getElementById('imgTipo2').hidden = false;
}

function preencherHabilidade(result){
  let strHabil = "";
  result.data.abilities.forEach(function(objeto, indice){
    if(!objeto.is_hidden){
      strHabil += objeto.ability.name + " ";
    }
    else{
      document.getElementById('hidden').innerText = objeto.ability.name;
    }
  })
  document.getElementById('nonHidden').innerText = strHabil;
  document.getElementById('habilidadesDiv').hidden = false;

  if (!result.data.abilities.some(x => x.is_hidden === true)){
    document.getElementById('hiddenTitle').hidden = true;
    document.getElementById('hidden').hidden = true;
  }
  else{
    document.getElementById('hiddenTitle').hidden = false;
    document.getElementById('hidden').hidden = false;
  }
}

function preencherStats(result){
  result.data.stats.forEach(function(objeto, indice){
    document.getElementById('stat'+indice).innerText = objeto.stat.name + ": ";
    document.getElementById('val'+indice).innerText = objeto.base_stat;
  })

  document.getElementById('statsDiv').hidden = false;
}
