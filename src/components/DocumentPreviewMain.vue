<template>
  <div>
    <table class="table table-responsive">
      <tr>
        <th>Image ID Front</th>
        <td>
          <img
            v-if="document.imageIdFront"
            :src="`${imgPrefix}${document.imageIdFront[0].filename}`"
            class="img-fluid"
            alt=""
          />
        </td>
      </tr>

      <tr>
        <th>Image ID Back</th>
        <td>
          <img
            v-if="document.imageIdBack"
            :src="`${imgPrefix}${document.imageIdBack[0].filename}`"
            class="img-fluid"
            alt=""
          />
        </td>
      </tr>

      <tr>
        <th>Image DOT</th>
        <td>
          <img
            v-if="document.imageDOT"
            :src="`${imgPrefix}${document.imageDOT[0].filename}`"
            class="img-fluid"
            alt=""
          />
        </td>
      </tr>

      <tr>
        <th>Image Registration</th>
        <td>
          <img
            v-if="document.imageRegistration"
            :src="`${imgPrefix}${document.imageRegistration[0].filename}`"
            class="img-fluid"
            alt=""
          />
        </td>
      </tr>

      <tr>
        <th>Phone</th>
        <td>{{ document.phone }}</td>
      </tr>

      <tr>
        <th>Email</th>
        <td>{{ document.email }}</td>
      </tr>

      <tr>
        <th>Garaging Zip</th>
        <td>{{ document.garagingZip }}</td>
      </tr>

      <tr>
        <th>Cargo Type</th>
        <td>{{ document.cargoType }}</td>
      </tr>

      <tr>
        <th>Owner First Name</th>
        <td>{{ document.ownerFirstName }}</td>
      </tr>

      <tr>
        <th>Owner Last Name</th>
        <td>{{ document.ownerLastName }}</td>
      </tr>

      <tr>
        <th>Owner Country</th>
        <td>{{ document.ownerCountry }}</td>
      </tr>

      <tr>
        <th>Owner State</th>
        <td>{{ document.ownerState }}</td>
      </tr>

      <tr>
        <th>Owner City</th>
        <td>{{ document.ownerCity }}</td>
      </tr>

      <tr>
        <th>Owner Street</th>
        <td>{{ document.ownerStreet }}</td>
      </tr>

      <tr>
        <th>Owner ZIP</th>
        <td>{{ document.ownerZip }}</td>
      </tr>

      <tr>
        <th>Owner Date of Birthday</th>
        <td>{{ document.ownerDOB }}</td>
      </tr>

      <tr>
        <th>Year Business Started</th>
        <td>{{ document.yearBusinessStarted }}</td>
      </tr>

      <tr>
        <th>Electronic Device Provider</th>
        <td>{{ document.electronicDeviceProvider }}</td>
      </tr>

      <tr>
        <th>Current Insurance Provider</th>
        <td>{{ document.currentInsuranceProvider }}</td>
      </tr>

      <tr>
        <th>DOT</th>
        <td>{{ document.resultDOT }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DocumentPreviewMain',
  props: {
    document: {
      type: Object,
      required: true
    }
  },
  computed: {
    imgPrefix() {
      return `${process.env.VUE_APP_BACKEND_URL}/tmp/`;
    }
  }
};
</script>

<style lang="scss" scoped></style>
