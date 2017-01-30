<template>
    <div id="grid-template">
        <div class="row">
            <div class="col-md-8" style="padding-left:0px;">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label for="query" class="col-sm-2 control-label">PESQUISA</label>
                        <div class="col-sm-10">
                            <div class="input-group">
                                <input class="form-control" name="query" v-model="filterKey" placeholder="..." aria-describedby="basic-addon2">
                                <span class="input-group-addon" id="basic-addon2"><i class="fa fa-search" aria-hidden="true"></i></span>
                            </div>
                        </div>

                    </div>
                </form>
            </div>

            <div class="col-md-4">
                <div class="pull-right">
                    <button class="btn btn-default" @click="setItemPorPagina(5)">5</button>
                    <button class="btn btn-default" @click="setItemPorPagina(10)">10</button>
                    <button class="btn btn-default" @click="setItemPorPagina(25)">20</button>
                    <button class="btn btn-default" @click="setItemPorPagina(50)">50</button>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">

                <!--Tabela-->
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th v-for="key in columns" @click="sortBy(key.column)"
                            :class="{ active: sortKey == key.column }">
                            {{ key.header | capitalize }}
                            <span class="arrow" :class="sortOrders[key.column] > 0 ? 'asc' : 'dsc'"></span>
                        </th>
                        <th :colspan="actionCount" v-if="actionCount>0">
                            AÇÕES
                        </th>
                    </tr>
                    </thead>
                    <paginate name="grid" tag="tbody" :list="filteredData" :per="itensPorPagina">
                        <tr v-for="entry in paginated('grid')">
                            <td v-for="key in columns" :width="key.width">
                                {{entry[key.column]}}
                            </td>

                            <td v-if="actions.view" align="center">
                                <button class="btn btn-default btn-xs" @click="actionView(entry[primaryKey])"><i
                                        class="fa fa-eye" aria-hidden="true"></i></button>
                            </td>
                            <td v-if="actions.edit"  align="center">
                                <button  class="btn btn-warning btn-xs" @click="actionEdit(entry[primaryKey])"><i
                                        class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                            </td>
                            <td v-if="actions.delete" align="center">
                                <button class="btn btn-danger btn-xs" @click="actionDelete(entry[primaryKey])"><i
                                        class="fa fa-trash-o" aria-hidden="true"></i></button>
                            </td>
                        </tr>
                    </paginate>

                </table>
                <!--Fim Tabela-->
            </div>
        </div>

        <div class="">
            <div style="float:left;">
                <!--Paginação-->
                <paginate-links for="grid" :show-step-links="true"
                                :classes="{
                        'ul': 'pagination',
                        'li > a': 'next-link',
                        'li': 'link-hand'
                    }">
                </paginate-links>
                <!--Fim Paginação-->
            </div>

            <div style="float:left; margin-top:20px;margin:20px 0px;line-height:32px;padding-left:10px;color:#ccc;">
                Itens {{(paginate.grid.page*itensPorPagina)+1}}
                a     {{((paginate.grid.page+1)*itensPorPagina)-(itensPorPagina - paginated('grid').length)}}
                de    {{filteredData.length}}
            </div>

        </div>

    </div>
</template>

<script>
/* eslint-disable */
 export default {
    name:'grid-template',
    props: {
        data: Array,
        columns: Array,
        primaryKey:String,
        actions:{view:true,edit:true,delete:true}
    },
    data() {
        var sortOrders = {}
            this.columns.forEach(function (key) {
              sortOrders[key.column] = 1
        })

      return {
        sortKey: '',
        filterKey: '',
        sortOrders: sortOrders,
        paginate: ['grid'],
        itensPorPagina:5
      }
    },
    computed: {
        actionCount: function(){
            var count=0;

            if(this.actions.view){
                count++;
            }
            if(this.actions.edit){
                count++;
            }
            if(this.actions.delete){
                count++;
            }

            return count;
        },

        filteredData: function () {
          var sortKey = this.sortKey
          var filterKey = this.filterKey && this.filterKey.toLowerCase()
          var order = this.sortOrders[sortKey] || 1
          var data = this.data
          if (filterKey) {
            data = data.filter(function (row) {
              return Object.keys(row).some(function (key) {
                return String(row[key]).toLowerCase().indexOf(filterKey) > -1
              })
            })
          }
          if (sortKey) {
            data = data.slice().sort(function (a, b) {
              a = a[sortKey]
              b = b[sortKey]
              return (a === b ? 0 : a > b ? 1 : -1) * order
            })
          }
          return data
        }
      },
      filters: {
        capitalize: function (str) {
          return str.charAt(0).toUpperCase() + str.slice(1)
        }
      },
    methods: {
        actionView (id){
            this.$emit('view',id);
        },
        actionEdit (id){
            this.$emit('edit', id);
        },
        actionDelete (id){
            this.$emit('delete', id);
        },

        setItemPorPagina: function(num){
            this.itensPorPagina=num
        },

        sortBy: function (key) {
          this.sortKey = key
          this.sortOrders[key] = this.sortOrders[key] * -1
        }
      },
      components:{}
  }

</script>

<style>

#grid-template table tr th,td{
    font-size:100%;
/*    text-align: center;
    vertical-align: middle;*/
}

.link-hand{
cursor: pointer; cursor: hand;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #000;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #000;
}

</style>