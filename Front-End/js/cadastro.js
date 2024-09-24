'use strict'

document.addEventListener('DOMContentLoaded', () => {
  // Obtém os elementos do DOM
  const nome = document.getElementById('nome')
  const email = document.getElementById('email')
  const senha = document.getElementById('senha')
  const telefone = document.getElementById('telefone')
  const cpf = document.getElementById('cpf')
  const masculino = document.getElementById('masculino')
  const feminino = document.getElementById('feminino')
  const data_nascimento = document.getElementById('date')
  const cep = document.getElementById('cep')
  const cidade = document.getElementById('cidade')
  const estado = document.getElementById('estado')
  const logradouro = document.getElementById('logradouro')
  const numero = document.getElementById('numero')
  const complemento = document.getElementById('complemento')
  const cadastro = document.getElementById('cadastro')
  const toggleSenha = document.getElementById('toggleSenha')

  // Função para mostrar/ocultar a senha
  toggleSenha.addEventListener('click', () => {
    if (senha.type === 'password') {
      senha.type = 'text'
      toggleSenha.src = '/Front-End/img/olhoAberto.png' // Mude para o ícone de olho aberto
    } else {
      senha.type = 'password'
      toggleSenha.src = '/Front-End/img/olhoFechado.png' // Mude para o ícone de olho fechado
    }
  })

  // Verifica se o botão foi encontrado
  if (cadastro) {
    cadastro.addEventListener('click', async () => {
      const userData = {
        nome: nome.value,
        email: email.value,
        cpf: cpf.value,
        id_sexo: masculino.checked ? 1 : 2, // Usa o id para o sexo selecionado
        senha: senha.value,
        data_nascimento: data_nascimento.value,
        cep: cep.value,
        logradouro: logradouro.value,
        complemento: complemento.value,
        cidade: cidade.value,
        estado: estado.value,
        numero: numero.value
      }

      try {
        const response = await fetch('http://vital-umqy.onrender.com/v1/vital/usuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        })

        const result = await response.json()

        if (response.ok) {
          alert('Usuário cadastrado com sucesso!')
          console.log(result)
          window.location.href = './login.html'
        } else {
          alert(`Erro: ${result.message}`)
        }
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error)
        alert('Erro ao cadastrar usuário. Tente novamente.')
      }
    })
  } else {
    console.error('O botão de cadastro não foi encontrado no DOM')
  }
})
