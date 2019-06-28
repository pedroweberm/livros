/* eslint-disable no-console */
/* eslint-disable no-undef */
import books from "@/assets/books.json";
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

  GetUserById(id) {
    var stu = this.students.find(user => user.id === id);

    if (this.students.indexOf(stu) != -1) {
      return stu;
    } else {
      var lib = this.librarians.find(user => user.id === id);

      if (this.librarians.indexOf(lib) != -1) {
        return lib;
      } else {
        var cord = this.coordinators.find(user => user.id === id);

        if (this.coordinators.indexOf(cord) != -1) {
          return cord;
        }
      }
    }
    return -1;
  }

  Populate() {
    this.AddCoord(
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

    this.AddCoord(
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

    this.AddCoord(
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

    this.AddLibrarian(
      this.coordinators[0],
      "_" +
        Math.random()
          .toString(36)
          .substr(2, 9),
      "Ana",
      "ana@gmail.com",
      "eusouaana",
      "9",
      5
    );

    this.AddLibrarian(
      this.coordinators[1],
      "_" +
        Math.random()
          .toString(36)
          .substr(2, 9),
      "Joao",
      "joao@gmail.com",
      "eusouojoao",
      "8",
      4
    );

    this.AddLibrarian(
      this.coordinators[2],
      "_" +
        Math.random()
          .toString(36)
          .substr(2, 9),
      "Pimenta",
      "pimenta@gmail.com",
      "eusouopimenta",
      "7",
      3
    );

    this.AddSchool(
      "Colegio mae de deus",
      "90",
      this.coordinators[2],
      "Rua mario totta",
      65,
      this.librarians[0]
    );

    this.AddSchool(
      "Colegio Joao Pualo I",
      "77",
      this.coordinators[0],
      "Pedra Redonda",
      99,
      this.librarians[1]
    );

    this.AddSchool(
      "Colegio Marista Rosario",
      87,
      this.coordinators[1],
      "Centro",
      65,
      this.librarians[2]
    );

    this.AddStudent(
      this.coordinators[0],
      "_" +
        Math.random()
          .toString(36)
          .substr(2, 9),
      "Gustavinho",
      "lalalasmurfs@gmail.com",
      "gremio",
      this.schools[0],
      "Zona sul"
    );

    this.AddStudent(
      this.coordinators[1],
      "_" +
        Math.random()
          .toString(36)
          .substr(2, 9),
      "Pedrinho",
      "peter.wm@hotmail.com",
      "inter",
      this.schools[1],
      "Zona sull"
    );

    this.AddStudent(
      this.coordinators[1],
      "_" +
        Math.random()
          .toString(36)
          .substr(2, 9),
      "Pimentinha",
      "pimenta@hotmail.com",
      "reuso",
      this.schools[2],
      "Campus do vale"
    );

    books.books.forEach(book => {
      this.AddItem(
        this.students[Math.floor(Math.random() * 3)],
        book.nome,
        book.ISBN,
        book.autor,
        book.categoria
      );
    });
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
    item.available = false;

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
