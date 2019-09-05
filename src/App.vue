<template>
  <div id="app">
    <div class="container">
      <h1 class="title">Daily Drinks</h1>
      <div class="text-right m-b">
        <Button @click.native="doAdd({action: 'doAdd'})" type="primary">Order</Button>
      </div>
      <DrinksList @doDelete="doDelete" @doModify="doModify" @doAdd="doAdd" :tableData="list"></DrinksList>
    </div>
    <Dialog v-if="dialogVisible" title="Your Order" :visible.sync="dialogVisible">
      <div class="form text-left" slot="body">
        <div class="form-item m-b">
          <p class="label" required>Name :</p>
          <input :class="['input', {'is-warning': validateMsgMap.name}]" v-model="form.name"/>
          <span class="tip">{{validateMsgMap.name}}</span>
        </div>
        <div class="form-item m-b">
          <p class="label" required>Price :</p>
          <AmountInput :onlyInteger="true"
            :class="['input', {'is-warning': validateMsgMap.price}]"
            :warning="validateMsgMap.price"
            v-model="form.price"/>
          <span class="tip">{{validateMsgMap.price}}</span>
        </div>
        <div class="form-item">
          <p class="label">Notes :</p>
          <textarea class="input textarea" v-model="form.notes"/>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <Button type="normal" @click.native="cancel()">Cancel</Button>
        <Button type="primary" @click.native="confirm()">Confirm</Button>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Dialog from '@/components/common/Dialog'
import Button from '@/components/common/Button'
import AmountInput from '@/components/common/AmountInput'
import DrinksList from './components/DrinksList'

export default {
  name: 'app',
  components: {
    DrinksList,
    Dialog,
    Button,
    AmountInput
  },
  data() {
    return {
      dialogVisible: false,
      activeItem: '',
      form: {
          name: '',
          price: '',
          notes: ''
      },
      list: [],
      validateMsgMap: {
        name: '',
        price: ''
      }
    }
  },
  methods: {
    confirm() {
        if (!this.form.name) {
          this.validateMsgMap.name = 'Please fill in the Name field first'
          setTimeout(()=> {
            this.validateMsgMap.name = ''
          }, 2000)
          return 
        }

        if (!this.form.price) {
          this.validateMsgMap.price = 'Please fill in the Price field'
          setTimeout(()=> {
            this.validateMsgMap.price = ''
          }, 2000)
          return 
        }

        const item = this.list.find(m => m.name === this.activeItem)
        if (item) {
          item.name = this.form.name
          item.price = this.form.price
          item.notes = this.form.notes
          this.$message('Updated Successfully！')
        } else {
          this.form.index = this.list.length + 1
          this.list.push(this.form)

          this.$message('This Order is In Drinks List Now！')
        }
        this.cancel()
    },
    cancel() {
      this.dialogVisible = false
    },
    doAdd() {
      this.form = {
          name: '',
          price: '',
          notes: ''
        }
      this.dialogVisible = true
    },
    doDelete({name}) {
      const index = this.list.findIndex(m => m.name === name)
      this.list.splice(index, 1)
      this.$message('Deleted！')
    },
    doModify({name}) {
      const member = this.list.find(m => m.name === name)
      this.activeItem = member.name
      this.form.notes = member.notes
      this.form.price = member.price
      this.form.name = member.name
      
      this.dialogVisible = true
    }
  },
  created() {
    if (!this.list.length) {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss">
@import './style/base.scss';
</style>

<style lang="scss" scoped>
.container {
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
}

.title {
  height: 60px;
  line-height: 60px;
  padding-top: 10px;
  margin: 0;
}

.form-item {
  position: relative;
  padding-bottom: 15px;
  .label {
    margin-bottom: 5px;
    &[required]::before {
      content: '*';
      display: inline-block;
      color: red;
      margin-right: 5px;
    }
  }

  .tip {
    position: absolute;
    left: 0;
    bottom: -5px;
    transition: .3s display ease;
    color: red
  }
}
</style>