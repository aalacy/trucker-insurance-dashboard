<template>
  <div class="document-preview">
    <document-preview-main :document="document" />

    <document-preview-dot v-if="dotData" :dot-data="dotData" />
  </div>
</template>

<script>
export default {
  name: 'DocumentPreview',
  components: {
    DocumentPreviewMain: () =>
      import(/* webpackChunkName: "DocumentPreviewMain" */
      './DocumentPreviewMain.vue'),
    DocumentPreviewDot: () =>
      import(/* webpackChunkName: "DocumentPreviewDot" */
      './DocumentPreviewDot.vue')
  },
  props: {
    document: {
      type: Object,
      required: true
    }
  },
  computed: {
    dotData() {
      return this.document.resultDOTSaferData;
    }
  }
};
</script>

<style lang="scss" scoped></style>
