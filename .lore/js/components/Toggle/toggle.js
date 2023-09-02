const toggle = {
  name: "Toggle",
  props: {},
  methods: {
    toggleArea() {
      console.log(true)
      document.getElementById('spoiler-area').classList.toggle("hide")
      document.getElementById('preview-area').classList.toggle("hide")
    }
  },
  template: `
    <span class="toggle">
      <input type="checkbox" id="switch" @click="toggleArea"/>
      <label for="switch">Toggle</label>
    </span>
  `
}