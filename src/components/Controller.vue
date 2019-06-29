/* eslint-disable no-console */
<template>
  <div>
    <login-nav
      v-if="controller != null"
      :controller="controller"
      @login="Login"
      @logout="logged = false"
      @showBooks="userBooks = true"
      @showTransactions="ShowTransactionsModal"
    />
    <book-views
      :userType="loginType"
      :books="controller.items"
      @solicitaLivro="SolicitaLivro"
      @createBook="CreateBook"
      v-if="logged"
    />
    <h1 v-else>Faça login para visualizar os livros</h1>
    <user-books-modal
      v-if="logged === true"
      :showModal="userBooks"
      @closeModal="userBooks = false"
      :books="this.controller.GetUserById(this.activeUser).providedBooks"
      @removeBook="RemoveBook"
    />
    <transactions-modal
      v-if="logged === true && loginType != 0"
      :showModal="transModal"
      :transactions="this.transactionsToShow"
      @closeModal="CloseTransModal"
    />

    <create-book-modal
      :showModal="createBookModal"
      @closeModal="createBookModal = false"
      @bookCreated="BookCreated"
    />
  </div>
</template>

<script>
import LoginNav from "@/components/LoginNav.vue";
import BookViews from "@/components/BookViews.vue";
import UserBooksModal from "@/components/UserBooksModal.vue";
import TransactionsModal from "@/components/TransactionsModal.vue";
import CreateBookModal from "@/components/CreateBookModal.vue";
import { Controller } from "@/assets/classes/controller.js";

export default {
  name: "Controller",
  components: {
    LoginNav,
    BookViews,
    UserBooksModal,
    TransactionsModal,
    CreateBookModal
  },
  data() {
    return {
      controller: null,
      logged: false,
      loginType: -1,
      activeUser: null,
      userBooks: false,
      transModal: false,
      transactionsToShow: [],
      createBookModal: false
    };
  },
  methods: {
    SolicitaLivro(book) {
      var receptor = this.controller.GetUserById(this.activeUser);
      var date = new Date();

      var day = date.getDate() + 7;
      var month = date.getMonth();
      var year = date.getFullYear();

      if (day % 31 != day) {
        day = day % 31;
        month = month + 1;
      }
      if (month % 12 != month) {
        month = month % 13;
        year += 1;
      }

      var dateStr =
        day.toString() + "/" + month.toString() + "/" + year.toString();

      this.controller.AddTransaction(book, receptor, dateStr);
    },
    Login(type, id) {
      this.loginType = type;
      this.activeUser = id;
      this.logged = true;
    },
    Logout() {
      this.loginType = -1;
      this.activeUser = null;
      this.logged = false;
    },
    RemoveBook(isbn) {
      this.controller.RemoveItem(
        this.controller.GetUserById(this.activeUser),
        isbn
      );
    },
    ShowTransactionsModal() {
      if (this.loginType === 1) {
        this.transactionsToShow = this.controller.GetUserById(
          this.activeUser
        ).transactions;
      } else if (this.loginType === 2) {
        this.transactionsToShow = this.controller.transactions;
      }
      this.transModal = true;
    },
    CloseTransModal() {
      this.transModal = false;
      this.transactionsToShow = [];
    },
    CreateBook() {
      this.createBookModal = true;
    },
    BookCreated(form) {
      this.controller.AddItem(
        this.controller.GetUserById(this.activeUser),
        form.titulo,
        form.isbn,
        form.autor,
        form.categoria
      );
    }
  },
  mounted() {
    this.controller = new Controller();
    this.controller.Populate();
  }
};
</script>

<style>
</style>
