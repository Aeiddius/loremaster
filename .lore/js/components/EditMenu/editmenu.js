const editmenu = {
  name: "EditMenu",
  props: {
    templates: { type: Object, required: true, default: {}},
  },
  methods: {
    open() {
      document.getElementById("editor-box").classList.remove("hide")
    },
    add() {
      changePage('add-page')
      this.open()
    },
    openDelete() {
      document.getElementById("delete-confirm").classList.remove("hide")
      console.log(document.getElementById("delete-confirm"))
    },
    openTemplate() {
      const val = document.getElementById("template-list").value
      console.log(val)
    }
  },
  template: `
    <div id="editmode" class="hide">
      <h1 class="titles">Edit Mode</h1>
      <button class="button--edit" @click="open">Edit Page</button>
      <button class="button--edit" @click="add">Add Page</button>
      <button class="button--edit button--edit-red" @click="openDelete">Delete Page</button>


      <div class="template-list">
        <h2>Templates</h2>
        <select name="Cars"  size="6" @change="openTemplate" id="template-list">
          <template v-for="(value, index) in templates">
            <option :value="index" v-if="index != 'n/a'">{{index}}</option>  
          </template>
        </select>  
      </div>
    </div>
  `
}  