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

    this.available = true;
  }
}

class Transaction {
  constructor(item, recipiente, dataEntrega) {
    this.item = item;
    this.receiver = recipiente;
    this.returnDate = dataEntrega;

    this.completed = false;
  }
}
