<template>
  <div>
    <BookModal
      v-if="selectedBook != null"
      :showModal="bookModal"
      :book="selectedBook"
      :userType="userType"
      @closeModal="CloseBookModal"
      @livroSolicitado="SolicitaLivro"
    ></BookModal>
    <b-button v-if="userType === 0" variant="success">+ Adicionar Livro</b-button>
    <div v-for="book in books" :key="book.book.isbn" class="text-center my-3">
      <b-button
        v-b-popover.hover="book.book.autor"
        :title="book.book.titulo"
        @click="OpenBookModal(book)"
      >{{ book.book.titulo }}</b-button>
    </div>
  </div>
</template>

<script>
import BookModal from "@/components/BookModal.vue";

export default {
  name: "BookViews",
  props: {
    books: {
      default: null
    },
    userType: {
      type: Number,
      required: true,
      default: -1
    }
  },
  components: {
    BookModal
  },
  data() {
    return {
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
  },
  mounted() {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
</style>
