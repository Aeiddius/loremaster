const card = {
  name: `Card`,
  data() {
    return {
      tabs: {},
      rerender: true,
    }
  },
  props: {
    title: { type: String, default: "Ethan Morales" },
    content: { type: String },
    directory: { type: Object, required: true }
  },
  components: ['BreadCrumbs'],
  watch: {
    content: {
      immediate: true,
      async handler(value) {      
        if (value == '') return  
        
        
        // Gettabs
        this.tabs = this.getTabs(value, this.directory)
        
        this.rerender = false;

        await Vue.nextTick()
        
        this.rerender = true;
      }
    }
  },
  methods: {
    getTabs(value, directory) {

      const results = {}; // Initialize an empty object to store parsed data
      if (value.includes("===")) {
        const sections = value.split("===").filter(section => section.trim() !== ""); // Split text by "===", remove empty sections
      
        // Loop through sections by index, incrementing by  2 to pair headers and content
        for (let i = 0; i < sections.length; i += 2) {
          const key = sections[i].trim(); // Get the section header and convert to lowercase
          const value = sections[i + 1].trim(); // Get the section content
          results[key] = value; // Assign the section header as a key and content as the corresponding value in the object
        }
        
        for (const name in results) {
          results[name] = marked.parse(results[name]);
          results[name] = autoLink(results[name], directory)
        }
      } else {
        results["default"] = marked.parse(value);
        results["default"] = autoLink(results["default"], directory)
      }

      console.log(results)

      return results;
    }
  },
  template: `
    <div class="card-container">
      <h1 id="title">
        {{ title }}
      </h1>
      
      <div class="card">
        <BreadCrumbs/>

        <div id="card-content" v-if="rerender">
          <template v-for="(value, name, index) in tabs">
            <TabButton v-if="Object.keys(tabs).length != 1" :name="name" :id="name + '-card-button'" group="card-content" :class="[index == 0 ? 'button--active' : '']"/>
          </template>
        
          <template v-for="(value, name, index) in tabs">
            <div :id="name + '-card-content'" :class="['card-content', index == 0 ? '' : 'hide']" v-html="value"></div>
          </template>
        </div>

      </div>
    </div>
  ` 

}