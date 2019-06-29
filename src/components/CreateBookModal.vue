<template>
  <div>
    <b-modal
      v-model="showModal"
      title="Disponibilizar livro"
      hide-footer
      centered
      no-close-on-backdrop
      no-close-on-esc
    >
      <div class="d-block">
        <b-form @submit="onSubmit">
          <b-form-group id="input-group-1" label="Título:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.titulo"
              required
              placeholder="Digite o nome do livro"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Autor:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="form.autor"
              required
              placeholder="Digite o autor do livro"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-4" label="Categoria:" label-for="input-4">
            <b-form-input
              id="input-4"
              v-model="form.categoria"
              required
              placeholder="Digite a categoria do livro"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="ISBN:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.isbn"
              required
              placeholder="Digite o ISBN do livro"
            ></b-form-input>
          </b-form-group>

          <b-button class="mt-3" block type="submit">Disponibilizar</b-button>
        </b-form>
      </div>
      <b-button class="mt-3" block @click="HideModal">Cancelar</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "create-book-modal",
  props: {
    showModal: {
      required: true,
      default: false
    }
  },
  data() {
    return {
      form: {
        titulo: "",
        isbn: "",
        autor: "",
        categoria: ""
      }
    };
  },
  methods: {
    HideModal() {
      this.$emit("closeModal");
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$emit("bookCreated", this.form);
      this.HideModal();
    }
  }
};
</script>

<style>
</style>
