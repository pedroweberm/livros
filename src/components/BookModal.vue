<template>
  <div>
    <b-modal
      v-model="showModal"
      :title="book.nome"
      hide-footer
      centered
      no-close-on-backdrop
      no-close-on-esc
    >
      <div class="d-block">
        <ul>
          <li>Título: {{ book.nome }}</li>
          <li>ISBN: {{ book.ISBN }}</li>
          <li>Autor: {{ book.autor }}</li>
          <li>Categoria: {{ book.categoria }}</li>
        </ul>
      </div>
      <b-button class="mt-3" block @click="Select">Solicitar</b-button>
      <b-button class="mt-3" block @click="HideModal">Fechar</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "book-modal",
  props: {
    showModal: {
      required: true,
      default: false
    },
    book: {
      required: true,
      default: null
    }
  },
  methods: {
    HideModal() {
      this.$emit("closeModal");
    },
    Select() {
      this.$emit("livroSolicitado");
      this.HideModal();
    }
  }
};
</script>

<style>
</style>
