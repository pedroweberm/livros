class Book {
  constructor(titulo, isbn, autor, categoria) {
    this.titulo = titulo;
    this.isbn = isbn;
    this.autor = autor;
    this.categoria = categoria;
  }
}

class Item {
  constructor(livro, dono) {
    this.book = livro;
    this.owner = dono;
  }
}

class Transaction {
  constructor(item) {
    this.doador = doador;
    this.receptor = receptor;
    this.livro = livro;

    this.completed = false;
  }
}
