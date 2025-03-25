/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

  let token
  beforeEach(() => {
    cy.token('fulano@qa.com', 'teste').then(tkn => {
      token = tkn
    })
  });

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      return contrato.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).should((response) => {
      expect(response.status).equal(200)
      expect(response.body).to.have.property('usuarios')
    })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    let nome = 'Usuário EBAC ' + Math.floor(Math.random() * 100000000000000)
    let email = 'usuario' + Math.floor(Math.random() * 100000000) + '@qa.com.br'
    let password = 'senha' + Math.floor(Math.random() * 100000)
    let administrador = "true"
    cy.cadastrarUsuario(nome, email, password, administrador)
    .should((response) => {
      expect(response.status).equal(201);
      expect(response.body.message).equal('Cadastro realizado com sucesso');
    }); 
  });

  it('Deve validar um usuário com email inválido', () => {
    let nome = 'Fulano da Silva';
    let email = 'beltrano@qa.com.br';
    let password = 'teste' 
    let administrador = 'false';
    cy.cadastrarUsuario(nome, email, password, administrador)
    .should((response) => {
      expect(response.status).equal(400);
      expect(response.body.message).equal('Este email já está sendo usado');
    }); 
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    let usuario = 'usuario EBAC editado ' +  Math.floor(Math.random() * 100000000000000)
    let email = 'usuario' + Math.floor(Math.random() * 100000000) + '@qa.com.br'
    let password = 'senha' + Math.floor(Math.random() * 100000)
    let administrador = 'false'
        cy.cadastrarUsuario('Usuario EBAC editado', email, password, administrador)
            .then(response => {
                let id = response.body._id
                cy.request({
                    method: 'PUT',
                    url: `usuarios/${id}`,
                    body: {
                        "nome": usuario,
                        "email": email,
                        "password": password,
                        "administrador": administrador
                    }
                }).should(response => {
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
                    expect(response.status).to.equal(200)
                })
            }) 
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    let email = 'usuario' + Math.floor(Math.random() * 100000000) + '@qa.com.br'
    let password = 'senha' + Math.floor(Math.random() * 100000)
    let administrador = 'false'
    cy.cadastrarUsuario('Usuario EBAC excluido', email, password, administrador)
            .then(response => {
                let id = response.body._id
                cy.request({
                    method: 'DELETE',
                    url: `usuarios/${id}`,
                }).should(response => {
                    expect(response.body.message).to.equal('Registro excluído com sucesso')
                    expect(response.status).to.equal(200)
                })
            })
  });


});
