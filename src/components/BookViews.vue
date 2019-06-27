<template>
  <div>
    <BookModal
      :showModal="bookModal"
      :book="selectedBook"
      @closeModal="CloseBookModal"
      @livroSolicitado="SolicitaLivro"
    ></BookModal>
    <div v-for="book in books" :key="book.ISBN" class="text-center my-3">
      <b-button
        v-b-popover.hover="book.autor"
        :title="book.nome"
        @click="OpenBookModal(book)"
      >{{ book.nome }}</b-button>
    </div>
  </div>
</template>

<script>
import books from "@/assets/books.json";
import BookModal from "@/components/BookModal.vue";

export default {
  name: "BookViews",
  components: {
    BookModal
  },
  props: {},
  data() {
    return {
      books: books.books,
      users: [],
      selectedBook: null,
      bookModal: false
    };
  },
  methods: {
    OpenBookModal(book) {
      this.selectedBook = book;
      this.bookModal = true;
    },
    CloseBookModal() {
      this.bookModal = false;
    },
    SolicitaLivro() {
      this.$emit("solicitaLivro", this.selectedBook);
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
</style>
