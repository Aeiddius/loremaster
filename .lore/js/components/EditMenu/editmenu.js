const editmenu = {
  name: "EditMenu",
  props: {},
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
    }
  },
  template: `
    <div id="editmode" class="hide">
      <h1 class="titles">Edit Mode</h1>
      <button class="button--edit" @click="open">Edit Page</button>
      <button class="button--edit" @click="add">Add Page</button>
      <button class="button--edit button--edit-red" @click="openDelete">Delete Page</button>
    </div>
  `
}  