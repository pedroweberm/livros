/* eslint-disable no-console */
/* eslint-disable no-undef */
export class Controller {
  constructor() {
    this.coordinators = [];
    this.librarians = [];
    this.students = [];

    this.schools = [];
    this.items = [];
    this.transactions = [];
  }

  AddCoord(id, nome, email, senha, cpf, telefone) {
    var coord = new Coordinator(id, nome, email, senha, cpf, telefone);

    this.coordinators.push(coord);
  }

  AddLibrarian(coord, id, nome, email, senha, cpf, telefone) {
    var lib = coord.RegisterLibrarian(id, nome, email, senha, cpf, telefone);

    this.librarians.push(lib);
  }

  AddStudent(manager, id, nome, email, senha, escola, endereco) {
    var stu = manager.RegisterStudent(id, nome, email, senha, escola, endereco);

    this.students.push(stu);
  }

  AddSchool(nome, cnpj, coordenador, endereco, telefone, bibliotecario) {
    var school = new School(
      nome,
      cnpj,
      coordenador,
      endereco,
      telefone,
      bibliotecario
    );

    this.schools.push(school);
  }

  AddTransaction(item, recipiente, dataEntrega) {
    var trans = recipiente.WithdrawBook(item, dataEntrega);

    this.transactions.push(trans);
  }

  AddItem(student, titulo, isbn, autor, categoria) {
    var item = student.ProvideBook(titulo, isbn, autor, categoria);

    this.items.push(item);
  }

  RemoveItem(student, isbn) {
    student.RemoveBook(isbn);

    this.items.splice(
      this.items.indexOf(this.items.find(item => item.book.isbn === isbn)),
      1
    );
  }

  Login(email, senha) {
    var stu = this.students.find(user => user.email === email);

    if (this.students.indexOf(stu) != -1) {
      if (stu.password === senha) return 0;
    } else {
      var lib = this.librarians.find(user => user.email === email);

      if (this.librarians.indexOf(lib) != -1) {
        if (lib.password === senha) return 1;
      } else {
        var coord = this.coordinators.find(user => user.email === email);

        if (this.coordinators.indexOf(coord) != -1) {
          if (coord.password === senha) {
            console.log("Login coordenador bem sucedido");
            return 2;
          }
        }
      }
    }
    return -1;
  }

  Populate() {
    var cord = new Coordinator(
      "_" +
        Math.random()
          .toString(36)
          .substr(2, 9),
      "Clara Schmidt",
      "clarabschmidt@hotmail.com",
      "jacelindo",
      "86031120020",
      991043374
    );

    this.coordinators.push(cord);

    cord = new Coordinator(
      "_" +
        Math.random()
          .toString(36)
          .substr(2, 9),
      "Pedro Weber Mendonca",
      "pedroweberm@gmail.com",
      "mElancia2",
      "04690691082",
      985459166
    );

    this.coordinators.push(cord);

    cord = new Coordinator(
      "_" +
        Math.random()
          .toString(36)
          .substr(2, 9),
      "Gustavo Acauan Lorentz",
      "gus.aca.lo@gmail.com",
      "gremiomortal",
      "69696969669",
      999999999
    );

    this.coordinators.push(cord);
  }
}

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
