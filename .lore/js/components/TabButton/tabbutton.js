const tabbutton = {
  name: "TabButton",
  props: {
    name: { type: String, default: "default" },
    group: { type: String, required: true }
  },
  methods: {
    toggleTab() {
      // Make target tab appear
      const tabs = document.getElementsByClassName(this.group)
      const targetTab = `${this.name}-card-content`
      for (const tab of tabs) {
        if (targetTab == tab.id) {
          tab.classList.remove("hide")
          continue;
        } 
        tab.classList.add("hide");
      }

      // Highlight target button
      const targetBtn = `${this.name}-card-button`
      const buttons = document.getElementsByClassName(this.group+'-button')
      for (const btn of buttons) {
        if (targetBtn == btn.id) {
          btn.classList.add("button--active")
          continue
        }
        btn.classList.remove("button--active")
      }
    }
  },
  template: `
    <button :class="['button', group+'-button']" @click="toggleTab">
      {{ name }}
    </button>
  `
}