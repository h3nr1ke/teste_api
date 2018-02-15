/**
 * Arquivo exemplo para teste de api
 * A api utilizada neste projeto é 
 * @see https://magicthegathering.io/
 *
 * Este exemplo faz parte de um post no medium
 * @see  <MEDIUM URL>
 *
 * @author Henrique Deodato
 * @see twitter.com/hdeodato
 */

/**
 * Carrega as bibliotecas que vamos utilizar
 * O mocha não é carregado aqui, pois ele que executa este arquivo
 */
var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "https://api.magicthegathering.io/v1";

// Criamos nosso primeiro caso de teste e fornecemos uma descrição utilizando describe
describe("Teste API magicthegathering.io",function(){
  // a função it é o que vamos testar realmente, neste caso o endpoint /cards, que deve retornar no máximo 100 cartas
  it("Deve receber 100 cartas",function(done){
    request.get(
      {
        url : urlBase + "/cards"
      },
      function(error, response, body){

        // precisamos converter o retorno para um objeto json
        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }

        // utilizando a funcao expect do chai, vamos verificar se o resultado da chamada foi sucesso (200)
        expect(response.statusCode).to.equal(200);

        // agora, verificamos se retornou a propriedade cards
        if( _body.should.have.property('cards') ){
          //se retornou, vamos verificar o tamanho, deve ser menor ou igual a 100 itens 
          expect(_body.cards).to.have.lengthOf.at.most(100);
        }

        done(); // avisamos o test runner que acabamos a validação e já pode proseeguir
      }
    );
  });
});