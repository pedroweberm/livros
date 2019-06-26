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
  }
}

class Coordinator extends Manager {
  RegisterLibrarian(id, nome, email, senha, cpf, telefone) {
    var librarian = new Librarian(id, nome, email, senha, cpf, telefone);

    return librarian;
  }
}

class Librarian extends Manager {}
