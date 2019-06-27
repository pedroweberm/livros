<template>
  <div>
    <log-in-modal
      :showModal="logInModal"
      :controller="controller"
      @closeModal="logInModal = false"
      @sucess="LoginSucess"
    ></log-in-modal>
    <b-navbar variant="dark" type="dark">
      <b-navbar-brand href="#">
        <img
          src="@/assets/logo.png"
          class="d-inline-block align-top"
          alt="Kitten"
          width="30"
          height="30"
        >
        BookaBook
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <em>Usuário</em>
          </template>
          <b-dropdown-item v-if="loggedIn" @click="ShowItems">Ver Livros</b-dropdown-item>
          <b-dropdown-item v-if="loggedIn" @click="Profile">Perfil</b-dropdown-item>
          <b-dropdown-item v-if="loggedIn" @click="Signout">Sair</b-dropdown-item>
          <b-dropdown-item v-if="!loggedIn" @click="Signin">Entrar</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <h1 v-if="loginType == 0">Login Aluno</h1>
    <h1 v-if="loginType == 1">Login Bibliotecario</h1>
    <h1 v-if="loginType == 2">Login Coordenador</h1>
    <book-views v-if="loggedIn"/>
  </div>
</template>

<script>
import { Controller } from "@/assets/classes/controller.js";
import LogInModal from "@/components/LogInModal.vue";
import BookViews from "@/components/BookViews.vue";

export default {
  components: {
    LogInModal,
    BookViews
  },
  data() {
    return {
      controller: null,
      loggedIn: false,
      activeUser: null,
      logInModal: false,
      loginType: null
    };
  },
  methods: {
    ShowItems() {},
    Signout() {
      this.loggedIn = false;
      this.activeUser = null;
    },
    Signin() {
      this.logInModal = true;
    },
    LoginSucess(type, id) {
      this.loggedIn = true;
      this.loginType = type;
      this.activeUser = id;
    },
    Profile() {
      this.controller.find;
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
