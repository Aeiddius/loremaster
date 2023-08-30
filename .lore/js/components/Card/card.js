
const card = {
  name: `Card`,
  data() {
    return {
      tabs: {},
      profile: {},
      rerender: true,

      divisor: "========================================================"
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
        // Return if value is empty
        if (value == '') return  

        // Content to be modified
        let content = value

        // Extracts profile box content
        if (this.hasData(value)) {
          const rawsplit = value.split(this.divisor)
          this.profile = jsyaml.load(autoLink(rawsplit[1], this.directory), 'utf8');

          // Sets into content the half without any profile box content
          content = rawsplit[2].trim()

          console.log(this.profile)
        }

        // Get tabs
        this.tabs = this.getTabs(content, this.directory)

        await this.refresh()
      }
    }
  },
  methods: {
    getTabs(value, directory) {

      const results = {};
      if (value.includes("===")) {
        // Split text by "===", remove empty sections
        const sections = value.split("===").filter(section => section.trim() !== ""); 
      
        // Loop through sections by index, incrementing by  2 to pair headers and content
        for (let i = 0; i < sections.length; i += 2) {
          // Get the section header and convert to lowercase
          const key = sections[i].trim(); 
          // Get the section content
          const value = sections[i + 1].trim(); 
          // Assign the section header as a key and content as the corresponding value in the object
          results[key] = value; 
        }
        
        // Parse data
        for (const name in results) {
          // Convert md into html
          results[name] = marked.parse(results[name]);
          // convert custom components into html
          results[name] = autoLink(results[name], directory)
        }
      } else {
        // if there is no tabs
        results["default"] = marked.parse(value);
        results["default"] = autoLink(results["default"], directory)
      }
      return results;
    },
    hasData(value) {
      const equalsIndex1 = value.indexOf(this.divisor);
      const equalsIndex2 = value.lastIndexOf(this.divisor);
      
      if (equalsIndex1 !== -1 && equalsIndex2 !== -1 && equalsIndex1 < equalsIndex2) {
          const textBetweenEquals = value.substring(equalsIndex1 + 1, equalsIndex2);
          return textBetweenEquals.length > 0;
      }
      
      return false;
    },
    
    
    async refresh() {
      this.rerender = false;
      await Vue.nextTick()
      this.rerender = true;
    }
  },
  template: `
    <div class="card-container">
      <h1 id="title">
        {{ title }}
      </h1>
      
      <div class="card">
        <BreadCrumbs/>
        <ProfileBox :profile="profile"/>

        <div id="card-content" v-if="rerender">
            <Tab :tabs="tabs"/>
        </div>

      </div>
    </div>
  ` 

}