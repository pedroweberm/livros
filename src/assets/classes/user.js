//import "book.js";
class User {
  constructor(id, nome, email, senha) {
    this.id = id;
    this.name = nome;
    this.email = email;
    this.password = senha;
  }
}

class Manager extends User {
  constructor(id, nome, email, senha, cpf, telefone) {
    super(id, nome, email, senha);

    this.cpf = cpf;
    this.phoneNumber = telefone;
  }

  RegisterStudent(id, nome, email, senha, escola, endereco) {
    var student = new Student(id, nome, email, senha, escola, endereco);

    return student;
  }
}

class Student extends User {
  constructor(id, nome, email, senha, escola, endereco) {
    super(id, nome, email, senha);

    this.school = escola;
    this.adress = endereco;
    this.providedBooks = [];
  }

  RegisterBook(titulo, isbn, autor, categoria) {
    var book = new Book(titulo, isbn, autor, categoria);

    return book;
  }

  ProvideBook(titulo, isbn, autor, categoria) {
    var book = this.RegisterBook(titulo, isbn, autor, categoria);

    this.providedBooks.push(book);

    var item = new Item(book, this);

    return item;
  }

  RemoveBook(isbn) {
    this.providedBooks.splice(
      this.providedBooks.indexOf(
        this.providedBooks.find(book => book.isbn === isbn)
      )
    );
  }

  WithdrawBook(item, data) {
    var trans = this.school.librarian.RegisterTransaction(item, this, data);

    return trans;
  }
}

class Coordinator extends Manager {
  RegisterLibrarian(id, nome, email, senha, cpf, telefone) {
    var librarian = new Librarian(id, nome, email, senha, cpf, telefone);

    return librarian;
  }
}

class Librarian extends Manager {
  RegisterTransaction(item, recipiente, dataEntrega) {
    var trans = new Transaction(item, recipiente, dataEntrega);

    return trans;
  }
}

class School {
  constructor(nome, cnpj, coordenador, endereco, telefone, librarian) {
    this.name = nome;
    this.cnpj = cnpj;
    this.coordinator = coordenador;
    this.librarian = librarian;
    this.adress = endereco;
    this.phoneNumber = telefone;
  }
}
