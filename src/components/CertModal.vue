<template>
	<b-modal title="Information" @ok="$emit('submitRequest')">
      <form>
        <b-form-group
          id="name"
          label="Enter a name"
          label-for="input-name"
        >
          <b-form-input id="input-name" v-model="name" @focus="onFocus('name')"  trim required></b-form-input>
        </b-form-group>
        <b-form-group
          id="addr"
          label="Enter an address"
          label-for="input-addr"
        >
          <b-form-input id="input-addr" v-model="address" @focus="onFocus('address')" trim required></b-form-input>
        </b-form-group>
        <b-form-group
          id="comments"
          label="Comments"
          label-for="input-comments"
        >
          <b-form-input id="input-comments" v-model="comments" @focus="onFocus('comments')" trim required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
</template>

<script>

export default {
  name: "CertModal",

  data() {
    return {
    }
  },

  props: {
  	name: String,
    address: String,
    comments: String,
  }