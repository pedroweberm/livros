export class User {
  constructor(id, nome) {
    this.id = id;
    this.nome = nome;

    this.livrosDisp = [];
    this.Requests = [];
  }
  addLivroDisp(livro) {
    this.livrosDisp.push(livro);
  }
  delLivroDisp(isbn) {
    var index = this.livrosDisp.indexOf(
      this.livrosDisp.find(livro => livro.isbn === isbn)
    );
    this.livrosDisp.splice(index, 1);
  }
  goodTransaction(trans) {
    trans.Good(this.id);
  }
  badTransaction(trans) {
    trans.Bad(this.id);
  }
  acceptRequest(req) {
    this.livrosDisp.delLivroDisp(req.livro.isbn);
  }
}
