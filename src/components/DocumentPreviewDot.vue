<template>
  <div>
    <table class="table table-responsive">
      <tr>
        <th>Cargo Carried</th>
        <td>{{ dotData['Cargo Carried'].join(', ') }}</td>
      </tr>

      <tr>
        <th>Carrier Operation</th>
        <td>{{ dotData['Carrier Operation'].join(', ') }}</td>
      </tr>

      <tr>
        <th>Crashes</th>
        <td>
          <table
            v-for="(countryVal, country) in dotData.Crashes"
            :key="country"
            class="table table-responsive"
          >
            <tr>
              <th colspan="4">{{ country }}</th>
            </tr>

            <tr>
              <th v-for="(value, key) in countryVal.Crashes" :key="key">
                {{ key }}
              </th>
            </tr>

            <tr>
              <td v-for="(value, key) in countryVal.Crashes" :key="key">
                {{ value }}
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <th>DBA Name</th>
        <td>{{ dotData['DBA Name'] }}</td>
      </tr>

      <tr>
        <th>DUNS Number</th>
        <td>{{ dotData['DUNS Number'] }}</td>
      </tr>

      <tr>
        <th>Drivers</th>
        <td>{{ dotData['Drivers'] }}</td>
      </tr>

      <tr>
        <th>Entity Type</th>
        <td>{{ dotData['Entity Type'] }}</td>
      </tr>

      <tr>
        <th>Inspections</th>
        <td>
          <table
            v-for="(countryVal, country) in dotData.Inspections"
            :key="country"
            class="table table-responsive"
          >
            <tr>
              <th :colspan="Object.keys(countryVal).length + 1">
                {{ country }}
              </th>
            </tr>

            <template v-for="(inspectionVal, inspectionName) in countryVal">
              <tr :key="`${inspectionName}_row1`">
                <th>{{ inspectionName }}</th>
                <th v-for="(value, title) in inspectionVal" :key="title">
                  {{ title }}
                </th>
              </tr>
              <tr :key="`${inspectionName}_row2`">
                <td></td>
                <td v-for="(value, title) in inspectionVal" :key="title">
                  {{ value }}
                </td>
              </tr>
            </template>
          </table>
        </td>
      </tr>

      <tr>
        <th>Legal Name</th>
        <td>{{ dotData['Legal Name'] }}</td>
      </tr>

      <tr>
        <th>MC/MX/FF Number(s)</th>
        <td>{{ dotData['MC/MX/FF Number(s)'] }}</td>
      </tr>

      <tr>
        <th>MCS-150 Form Date</th>
        <td>{{ dotData['MCS-150 Form Date'] }}</td>
      </tr>

      <tr>
        <th>MCS-150 Mileage (Year)</th>
        <td>{{ dotData['MCS-150 Mileage (Year)'] }}</td>
      </tr>

      <tr>
        <th>Mailing Address</th>
        <td>{{ dotData['Mailing Address'] }}</td>
      </tr>

      <tr>
        <th>Operating Status</th>
        <td>{{ dotData['Operating Status'] }}</td>
      </tr>

      <tr>
        <th>Operation Classification</th>
        <td>{{ dotData['Operation Classification'].join(', ') }}</td>
      </tr>

      <tr>
        <th>Out of Service Date</th>
        <td>{{ dotData['Out of Service Date'] }}</td>
      </tr>

      <tr>
        <th>Phone</th>
        <td>{{ dotData['Phone'] }}</td>
      </tr>

      <tr>
        <th>Physical Address</th>
        <td>{{ dotData['Physical Address'] }}</td>
      </tr>

      <tr>
        <th>Power Units</th>
        <td>{{ dotData['Power Units'] }}</td>
      </tr>

      <tr>
        <th>Review Information</th>
        <td>
          <table class="table table-responsive">
            <tr
              v-for="(value, key) in dotData['Review Information']"
              :key="key"
            >
              <th>{{ key }}</th>
              <td>{{ value }}</td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <th>State Carrier ID Number</th>
        <td>{{ dotData['State Carrier ID Number'] }}</td>
      </tr>

      <tr>
        <th>USDOT Number</th>
        <td>{{ dotData['USDOT Number'] }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DocumentPreviewDot',
  props: {
    dotData: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
