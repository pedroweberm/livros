<template>
  <div>
    <b-modal
      v-model="showModal"
      title="Meus Livros"
      hide-footer
      centered
      no-close-on-backdrop
      no-close-on-esc
    >
      <div class="d-block">
        <ul>
          <li v-for="book in books" :key="book.isbn">{{ book.titulo }}</li>
        </ul>
      </div>
      <b-button class="mt-3" block @click="HideModal">Fechar</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "user-book-modal",
  props: {
    showModal: {
      required: true,
      default: false
    },
    books: {
      required: true,
      default: null
    }
  },
  methods: {
    HideModal() {
      this.$emit("closeModal");
    }
  },
  mounted() {}
};
</script>

<style>
</style>
