<template>
  <table class="table">
    <thead class="thead">
      <tr class="tr">
        <th>No.</th>
        <th>Name</th>
        <th>Price</th>
        <th>Notes</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody class="tbody">
      <template v-if="tableData.length">
        <tr class="tr" v-for="(item, index) in tableData" :key="index">
          <td data-prop="No.">{{item.index}}</td>
          <td data-prop="Name :">{{item.name}}</td>
          <td data-prop="Price :">{{item.price}}</td>
          <td data-prop="Notes :">{{item.notes}}</td>
          <td data-prop="Actions :">
            <Button @click.native="handleClick('doModify', item.name)" type="warning">Modify</Button>
            <Button @click.native="handleClick('doDelete', item.name)" type="danger">Delete</Button>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr class="tr no-data">
          <td colspan="5">Order at Upper Right Corner！</td>
        </tr>
      </template>
      <tr></tr>
    </tbody>
  </table>
</template>

<script>
import Button from '@/components/common/Button'

export default {
  components: {
    Button
  },
  props: {
    tableData: {
      type: Array
    }
  },
  methods: {
      handleClick(action, name) {
        this.$emit(action, {action, name})
      }
  }
}
</script>

<style lang="scss" scoped>
.table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
  .thead .tr {
    background-color: #eee;
    color: #555;
  }

  .tbody .tr {
    border: 1px solid #ddd;
    padding: 10px;
  }

  th, td {
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    min-height: 20px;
    &:last-child {
      width: 220px;
    }
    &:first-child {
      font-weight: bold;
    }
  }
}

@media screen and (max-width: 600px) {
  .table {
    display: flex;
    justify-content: center;
    border: 0;
    height: calc(100% - 120px);
    overflow: auto;
    .thead {
      display: none;
    }

    .tr {
      display: flex;
      flex-direction: column;
      height: 220px;
      margin-bottom: 20px;

      td {
        position: relative;
        padding-left: 100px;
        &:first-child {
          border-bottom: 1px solid #ddd;
        }
        &::before {
          position: absolute;
          font-weight: bold;
          left: 0;
          content: attr(data-prop);
          display: inline-block;
        }
      }
      &.no-data {
        td {
          padding-left: 0;
        }
      }
    }
    
  }

}
</style>
