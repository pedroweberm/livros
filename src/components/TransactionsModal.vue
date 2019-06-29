<template>
  <div>
    <b-modal
      v-model="showModal"
      title="Transações"
      hide-footer
      centered
      no-close-on-backdrop
      no-close-on-esc
    >
      <div class="d-block">
        <ul>
          <li v-for="trans in transactions" :key="trans.item.book.isbn">
            {{ trans.item.book.titulo }}
            <b-row>
              <b-col sm="6">Dono: {{ trans.item.owner.name }}</b-col>
              <b-col sm="6">Recipiente: {{ trans.receiver.name }}</b-col>
            </b-row>
            Data de devolução: {{ trans.returnDate }}
            <br>
            <br>
          </li>
        </ul>
      </div>
      <b-button class="mt-3" block @click="HideModal">Fechar</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "transactions-modal",
  props: {
    showModal: {
      required: true,
      default: false
    },
    transactions: {
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
