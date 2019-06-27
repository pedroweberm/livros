<template>
  <div>
    <b-modal
      v-model="showModal"
      title="Entrar"
      hide-footer
      centered
      no-close-on-backdrop
      no-close-on-esc
    >
      <div class="d-block">
        <b-form @submit="onSubmit">
          <b-form-group id="input-group-1" label="Endereço de E-mail:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              required
              placeholder="Digite seu e-mail"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Senha:" label-for="input-3">
            <b-form-input
              id="input-2"
              type="password"
              v-model="form.password"
              required
              placeholder="Digite sua senha"
            ></b-form-input>
          </b-form-group>

          <b-button class="mt-3" block type="submit">Entrar</b-button>
        </b-form>
      </div>
      <b-button class="mt-3" block @click="HideModal">Cancelar</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "login-modal",
  props: {
    showModal: {
      required: true,
      default: false
    },
    controller: {
      required: true
    }
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    HideModal() {
      this.$emit("closeModal");
    },
    LogIn() {
      var user = this.controller.Login(this.form.email, this.form.password);
      var id;
      if (user == 0) {
        id = this.controller.students.find(stu => stu.email === this.form.email)
          .id;
      } else if (user == 1) {
        id = this.controller.librarians.find(
          lib => lib.email === this.form.email
        ).id;
      } else if (user == 2) {
        id = this.controller.coordinators.find(
          cord => cord.email === this.form.email
        ).id;
      }
      if (user != -1) this.$emit("sucess", user, id);
      this.HideModal();
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.LogIn();
    }
  }
};
</script>

<style>
</style>
