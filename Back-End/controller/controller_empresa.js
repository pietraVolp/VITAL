// Import do arquivo responsavel pela interação com DB(model)
const { application } = require('express')
const empresaDAO = require('../model/DAO/empresa')
// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')
const { join } = require('@prisma/client/runtime/library.js')
const { json } = require('body-parser')


const setInserir = async function(dadosEmpresa, contentType){
    try{


       
        // validação para aplicação do contentType
        if(String(contentType).toLowerCase() == 'application/json'){
           
            // cria o objeto JSON para devolver os dados criados na requisição
            let novoJSON = {};            
       
            // validação de campos obrigatorios ou com digitação inválida
            if(dadosEmpresa.nome_empresa == ''    || dadosEmpresa.nome_empresa == undefined       ||  dadosEmpresa.nome_empresa == null               || dadosEmpresa.nome_empresa.length > 100 ||
                dadosEmpresa.nome == ''    || dadosEmpresa.nome == undefined       ||  dadosEmpresa.nome == null               || dadosEmpresa.nome.length > 100 ||
                dadosEmpresa.nome_proprietario == ''    || dadosEmpresa.nome_proprietario == undefined       ||  dadosEmpresa.nome_proprietario == null               || dadosEmpresa.nome_proprietario.length > 100 ||
               dadosEmpresa.email == ''  ||   dadosEmpresa.email == undefined  || dadosEmpresa.email == null   || dadosEmpresa.email.length > 320 ||
               dadosEmpresa.senha == '' ||  dadosEmpresa.senha == undefined || dadosEmpresa.senha == null  || dadosEmpresa.senha.length > 255 ||
               dadosEmpresa.cnpj == '' ||  dadosEmpresa.cnpj == undefined || dadosEmpresa.cnpj == null  || dadosEmpresa.cnpj.length > 18 ||
               dadosEmpresa.telefone == '' ||  dadosEmpresa.telefone == undefined || dadosEmpresa.telefone == null  || dadosEmpresa.telefone.length > 30 ||
               dadosEmpresa.telefone_clinica == '' ||  dadosEmpresa.telefone_clinica == undefined || dadosEmpresa.telefone_clinica == null  || dadosEmpresa.telefone_clinica.length > 30


            ){


               
                // return do status code 400
                return message.ERROR_REQUIRED_FIELDS
               
            } else {
       
           
                // Encaminha os dados do filme para o DAO inserir dados
                let novaEmpresa = await empresaDAO.insert(dadosEmpresa)
               
                // validação para verificar se o DAO inseriu os dados do BD
                if (novaEmpresa)
                {
       
                    let ultimoId = await empresaDAO.ID()
                    dadosEmpresa.id = ultimoId[0].id
               
                    // se inseriu cria o JSON dos dados (201)
                    novoJSON.usuario  = dadosEmpresa
                    novoJSON.status = message.SUCCESS_CREATED_ITEM.status
                    novoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    novoJSON.message = message.SUCCESS_CREATED_ITEM.message
       
                    return novoJSON; // 201
                }else{
                 
                    return message.ERROR_INTERNAL_SERVER_DB // 500
                    }
                 
              }
            } else {
                return message.ERROR_CONTENT_TYPE // 415
            }
        } catch(error){
            console.log(error);
            return message.ERROR_INTERNAL_SERVER // 500
        }
}


const setAtualizar = async function(){}


const setDeletar = async function(){}


const setListar = async function(){
    try {
        let JSON = {}


   let dadosEmpresa = await empresaDAO.listAll()
   {
    if(dadosEmpresa){


        if(dadosEmpresa.length> 0){


            // for(let usuario of dadosUsuario){
            //     let sexoUsuario = await sexoDAO.selectByIdSexo(usuario.id_sexo)
            //     usuario.sexo = sexoUsuario
            // }


            JSON.empresas = dadosEmpresa
            JSON.quantidade = dadosEmpresa.length
            JSON.status_code = 200
            return JSON
        }else{
            return message.ERROR_NOT_FOUND
        }
    }else{
        return message.ERROR_INTERNAL_SERVER_DB
    }


    }
    }
    catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
}
}


const setListarPorId = async function(){}


module.exports = {
    setInserir,
    setAtualizar,
    setDeletar,
    setListar,
    setListarPorId
}