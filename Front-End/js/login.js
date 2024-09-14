'use strict'

const button = document.getElementById('entrar')
const toggleSenha = document.getElementById('toggleSenha')
const senhaInput = document.getElementById('senha')

// Função para alternar a visibilidade da senha
const alternarVisibilidadeSenha = () => {
  if (senhaInput.type === 'password') {
    senhaInput.type = 'text'
    toggleSenha.src = '/img/senha-icone.png' // Imagem do olho aberto
  } else {
    senhaInput.type = 'password'
    toggleSenha.src = '/img/senha-icone.png' // Imagem do olho fechado
  }
}

// Adicionar o evento de clique ao ícone do olho
toggleSenha.addEventListener('click', alternarVisibilidadeSenha)

const validarLogin = async () => {
  const email = document.getElementById('email').value.trim()
  const password = document.getElementById('senha').value.trim()

  if (email === '' || password === '') {
    alert('Por Favor Preencha todos os Campos !!')
  } else {
    try {
      const response = await fetch('http://localhost:8080/v1/Vital/loginUsuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha: password }),
      })

      const result = await response.json()

      if (response.ok) {
        if (result.status_code === 200) {
          localStorage.setItem('idC', result.usuario_id)
          window.location.href = '../home.html'
        } else {
          alert(result.message || 'Ocorreu um erro inesperado.')
        }
      } else {
        alert(result.message || 'Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.')
      }
    } catch (error) {
      console.log(error)
      alert('Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.')
    }
  }
}

button.addEventListener('click', validarLogin)
