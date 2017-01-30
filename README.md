# A basic and easy-to-use Grid component with useful features.

> This is the first version, which I developed based on [vue examples grid component](http://vuejs.org/v2/examples/grid-component.html). I want to add more features. As soon as possible. *I hope it is useful*

**By Mardone Dias**

## Features:

* Zero Configuration;
* Filter;
* Pagination;
* Predefined events for performing View, Edit, and Delete actions;

## Requires

 * [vue2](http://vuejs.org/). The Progressive JavaScript Framework.
 * [vue-paginate](https://github.com/TahaSh/vue-paginate). You must include ```vue-paginate: "^3.4.0"``` dependencies in  ```package.json```
 * [Bootstrap3](http://getbootstrap.com). Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.

## Instalation

 > Component page in npm [NPM](https://www.npmjs.com/package/ibut-vue2-grid#example).
 * ```npm install ibut-vue2-grid --save```

## Usage

> In main.js import:

```
import Vue from 'vue'
import IbutVue2Grid from 'ibut-vue2-grid'

Vue.use(IbutVue2Grid)

new Vue({
    router,
	IbutVue2Grid, //Add in vue instance
    ...
});

```

Using the component:

> In template

```
<template>

  <div id="nome-template">

      <ibut-vue2-grid
         :data="gridData"
         :primaryKey="gridPrimaryKey"
         :columns="gridColumns"
         :actions="gridActions"
          v-on:view="btnView($event)"
          v-on:edit="btnEdit($event)"
          v-on:delete="btnDelete($event)">
      </ibut-vue2-grid>

  </div>

</template>

```

> In script

```
<sript>
	export default{
	  name:'nome-template',
      data(){
          return{
            gridData:[],
            gridPrimaryKey:'column1',  //Enter the primary key field
            gridColumns: [
               {header:'HEADER 1.',column:'column1',width:'33%'},
               {header:'HEADER 2', column:'column2', width:'33%'},
               {header:'HEADER 3', column:'column3', width:'33%'}
            ],
            gridActions:{view:true,edit:false,delete:true}
          }
      },
      methods : {
        btnView (evt) {
            console.info(evt);
        },
        btnEdit (evt) {
            console.info(evt);
        },
        btnDelete (evt) {
            console.info(evt);
        }
        ...
  };
</sript>
```

## License

[MIT](https://opensource.org/licenses/MIT)

