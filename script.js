//selecionando elementos necessários para as funcionalidades!

let buttonAdd = document.querySelector('#add')
let buttonView = document.querySelector('#divView')
let buttonInsertTask = document.querySelector('#insertTask')
let buttonOcultarTask = document.querySelector('#ocultarTask')
let viewTask = document.querySelector('#viewTask div')
let listTask = document.querySelector('#listTask');

// lista para guarda as tarefas
let task = JSON.parse(localStorage.getItem("task")) || []
posicaoTask = "";

//
function Task(nome,dataRealizacao,descricao,satisfacao){
  this.nome = nome;
  this.dataRealizacao = dataRealizacao;
  this.descricao = descricao;
  this.satisfacao = satisfacao;
  
}

// função que adciona os inputs para inserir as tarefas a lista!

function adicionarInputTarefa(posicaoTask){
  document.getElementById('inputs').style.display = 'block'
  document.getElementById('nome').style.display = 'inline';
  document.getElementById('data').style.display = 'inline';
  document.getElementById('descricao').style.display = 'inline';
  document.getElementById('satisfacao').style.display = 'inline';
  let satisfacao = document.getElementById('satisfacao');
  let mostrarSatisfacao = document.getElementById('mostrarSatisfacao')
  satisfacao.addEventListener('input', (event) =>{
    mostrarSatisfacao.innerHTML = `valor: ${satisfacao.value}`
  })
  
  
  document.getElementById('labelNome').style.display = 'inline';
  document.getElementById('labelData').style.display = 'inline';
  document.getElementById('labelDescricao').style.display = 'inline';
  document.getElementById('labelSatisfacao').style.display = 'inline';
  document.getElementById('insertTask').style.display = 'inline';
  let insertTask = document.querySelector('#insertTask button');
  
  posicaoTask = posicaoTask;
  
  if(insertTask.value == "false"){
    insertTask.innerHTML = 'inserir task';
  }else {
    insertTask.innerHTML = 'editar task';
  }
}


// função de inserir os dados na lista de tarefas!

function insertTask(){
  let nome = document.getElementById('nome').value;  
  let dataRealizacao = document.getElementById('data').value;
  let descricao = document.getElementById('descricao'). value;
  let satisfacao = document.getElementById('satisfacao').value;
 
  let addTask = new Task(nome,dataRealizacao,descricao,satisfacao);
  
  let insertTask = document.querySelector('#insertTask button');
  
  if(insertTask.innerHTML == "inserir task"){
    task.push(addTask)
  }else {
    task.splice(posicaoTask, 1)
    task.splice(posicaoTask, 0, addTask)
  }
 salvarDadosTask()
 
   document.getElementById('nome').style.display = 'none';
  document.getElementById('data').style.display = 'none';
  document.getElementById('descricao').style.display = 'none';
  document.getElementById('satisfacao').style.display = 'none';
  
  
  document.getElementById('labelNome').style.display = 'none';
  document.getElementById('labelData').style.display = 'none';
  document.getElementById('labelDescricao').style.display = 'none';
  document.getElementById('labelSatisfacao').style.display = 'none';
  document.getElementById('inputs').style.display = 'none';
  
  document.getElementById('insertTask').style.display = 'none';
  
  if(listTask.style.display == "inline"){
    verTarefa()
  }
  
}

// função de visualizar as tarefas!

function verTarefa(){
  viewTask.innerHTML = "";
  listTask.style.display = "inline";
  
  
  if(task == ""){
    let styleView = document.querySelector('#viewTask').style.display = 'block';
    listTask.innerHTML = `Nenhuma lista registrada!`
  }else{
    let styleView = document.querySelector('#viewTask').style.display = 'block';
    
    task.map((todo) => {
      //button editar
      let buttonEditarTask = document.createElement('button');
      buttonEditarTask.class = "editarTask";
      posicaoTask = task.indexOf(todo);
      buttonEditarTask.value = `${posicaoTask}`;
      buttonEditarTask.innerHTML = "Editar";
      buttonEditarTask.setAttribute('onclick', `editarTask(${posicaoTask})`);
      
      // button Exlucir
      let buttonExcluirTask = document.createElement('button');
      buttonExcluirTask.class = "excluirTask";
      buttonExcluirTask.innerHTML = "Excluir";
      buttonExcluirTask.setAttribute('onclick', `excluirTask(${posicaoTask})`)
      
      // criando elementos necessários para a parte de visualização das tarefas
      
      let taskAddView = document.createElement('li');
      let br = document.createElement('br');
      let hr = document.createElement('hr');
      let textTask = document.createElement('p');
      
      // criando e inserido o texto de visualização nas tarefas na variável que armazena o texto
      
      textTask.innerHTML = `nome da atividade: <p class="dados">${todo.nome}<p>data de realização: <p class="dados">${todo.dataRealizacao}</p>descrição: <p class="dados">${todo.descricao}</p>satisfação: <p class="dados">${todo.satisfacao}</p>`;
     
     // inserindo o texto, botões e linhas na variável geral para a visualização, variável essa chamada de viewTask
     
      viewTask.appendChild(textTask)
      viewTask.appendChild(buttonEditarTask)
      viewTask.appendChild(buttonExcluirTask)
      viewTask.appendChild(hr)
      viewTask.appendChild(br)
      })
    }[]
}

function ocultarTask(){
  let viewTask = document.querySelector('#viewTask div').style.display = "none";
  let styleView = document.querySelector('#viewTask').style.display = 'none';
}

function excluirTask(posicaoTask){
  task.splice(posicaoTask, 1);
  salvarDadosTask()
  verTarefa();
}

function editarTask(posicaoTask){
  let nome = document.getElementById('nome')
  nome.value = `${task[posicaoTask].nome}`;
  this.posicaoTask = posicaoTask
  
  let dataRealizacao = document.getElementById('data')
  data.value = `${task[posicaoTask].dataRealizacao}`;
  
  let descricao = document.getElementById('descricao')
  descricao.value = `${task[posicaoTask].descricao}`;
  
  let satisfacao = document.getElementById('satisfacao')
  satisfacao.value = `${task[posicaoTask].satisfacao}`;
  
  let insertTask = document.querySelector('#insertTask button');
  insertTask.value = 'true';
  adicionarInputTarefa(posicaoTask)
  insertTask.value = 'false';
  
}

function salvarDadosTask(){
    localStorage.setItem('task', JSON.stringify(task) )
}

buttonAdd.onclick = adicionarInputTarefa;
buttonView.onclick = verTarefa;
buttonInsertTask.onclick = insertTask;
buttonOcultarTask.onclick = ocultarTask;

