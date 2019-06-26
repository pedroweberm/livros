/* eslint-disable no-undef */
import "user.js";
class Controller {
  constructor() {
    this.coordinators = [];
    this.librarians = [];
    this.students = [];

    this.schools = [];
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

  AddSchool(nome, cnpj, coordenadorId, endereco, telefone) {
    var school = {
      name: nome,
      cnpj: cnpj,
      cordinatorId: coordenadorId,
      adress: endereco,
      phoneNumber: telefone
    };

    this.schools.push(school);
  }

  Login(email, senha) {
    var stu = this.students.find(user => user.email === email);

    if (this.students.indexOf(coord) != -1) {
      if (stu.password === senha) return 0;
    } else {
      var lib = this.librarians.find(user => user.email === email);

      if (this.librarians.indexOf(lib) != -1) {
        if (lib.password === senha) return 1;
      } else {
        var coord = this.coordinators.find(user => user.email === email);

        if (this.coordinators.indexOf(stu) != -1) {
          if (coord.password === senha) return 2;
        }
      }
    }
  }
}
