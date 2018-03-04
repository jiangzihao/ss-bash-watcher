<template>
  <div>
    <h1>Statistic</h1>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.port }}</td>
        <td class="text-xs-right">{{ props.item.used | size }}</td>
        <td class="text-xs-right">{{ props.item.limit | size }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'statistic',
  data () {
    return {
      headers: [
        { text: 'port', value: 'port', align: 'center' },
        { text: 'used', value: 'used', align: 'right' },
        { text: 'limit', value: 'limit', align: 'right' }
      ],
      items: []
    }
  },
  async created () {
    this.items = (await this.$http.get('users')).data
  },
  filters: {
    size (value) {
      const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'ZB']
      switch (typeof(value)) {
        case 'string':
          value = Number.parseInt(value)
        case 'number':
          let base = 0
          while (value >= 1024) {
            value /= 1024
            ++base
          }
          return `${Math.floor(value * 1000) / 1000} ${units[base]}`
        default:
          return value
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
