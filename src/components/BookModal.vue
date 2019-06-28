<template>
  <div>
    <b-modal
      v-model="showModal"
      :title="book.book.titulo"
      hide-footer
      centered
      no-close-on-backdrop
      no-close-on-esc
    >
      <div class="d-block">
        <ul>
          <li>Título: {{ book.book.titulo }}</li>
          <li>ISBN: {{ book.book.isbn }}</li>
          <li>Autor: {{ book.book.autor }}</li>
          <li>Categoria: {{ book.book.categoria }}</li>
          <li>Dono: {{ book.owner.name }}</li>
          <li v-if="book.available">Disponível: Sim</li>
          <li v-if="!book.available">Disponível: Não</li>
        </ul>
      </div>
      <b-button v-if="userType === 0" class="mt-3" block @click="Select">Solicitar</b-button>
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
    },
    userType: {
      type: Number,
      required: true,
      default: -1
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
  },
  mounted() {}
};
</script>

<style>
</style>
