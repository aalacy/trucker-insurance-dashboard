<template>
 	<b-modal v-model="show" id="modal-pdf" centered  size="xl" :title="title" hide-footer>
      <span v-html="curPDF.content">
      </span>
  	</b-modal>
</template>

<script>

export default {
	name: "PDFViewer",

	props: {
      pdf: {
        type: Object,
        default: {}
      },
      showModal: {
      	type: Boolean,
      	default: false
      },
      title: {
      	type: String,
      	default: 'COI.pdf'
      }
    },

    watch: {
    	showModal (newProps, oldProps) {
    		if (newProps != oldProps) {
	    		this.show = newProps
    		}
    	},

    	show () {
    		if (!this.show) {
	    		this.$emit('close-modal', false)
    		}
    	}
    },

    data () {
	    return {
	    	curPDF: {
	        title: "",
	        content: "",
	        base64: ""
      	},
      	show: this.showModal
	    }
	},

  mounted () {
 	},

 	updated () {
  	this.diaplayPDF(this.pdf)
 	},

 	methods: {
    diaplayPDF (pdf) {
      let objbuilder = '';
      objbuilder += (`<html><body><object width="100%" height="400px" data="data:application/pdf;base64,`);
      objbuilder += (pdf.content);
      objbuilder += ('#toolbar=0" type="application/pdf" class="internal">');
      objbuilder += ('<embed src="data:application/pdf;base64,');
      objbuilder += (pdf.content);
      objbuilder += ('" type="application/pdf" />');
      objbuilder += ('</object></body></html>');
      this.curPDF.content = objbuilder;
      this.curPDF.base64 = `data:application/pdf;base64, ${pdf.content}`
      this.curPDF.title = pdf.name;
    },
	}
}
</script>