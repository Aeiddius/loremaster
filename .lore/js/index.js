
var root;

function start() {
  const app = Vue.createApp({
    data() {
      return {
        directory: {},

        // Card
        content: "",
        pageName: ""

      }
    },
    async mounted() {
      // Get Metadata
      const metadata = await (await fetch(".lore/metadata.json")).json()
      
      // Get Directory
      this.directory = metadata.directory
      
      // Get query id
      let pageId = (new URLSearchParams(window.location.search)).get('p');
      if (pageId == null || pageId == "") pageId = "home"
      if (!this.directory.hasOwnProperty(pageId)) pageId = "404"

      const pageMeta = this.directory[pageId];

      this.reload(pageMeta.path, pageId, pageMeta.title)


    },
    methods: {
      async reload(path, id, name) {
        const pageFile = await (await fetch(path)).text()

        this.content = pageFile 
        this.pageName = name

        if (id == "404") {
          const pageId = (new URLSearchParams(window.location.search)).get('p');
          this.content = this.content + `\n\nPage <span class="error">${pageId}</span> does not exist.`
        }

        this.$forceUpdate();
      }
    }
  })

  root = mount(app)
}

function mount(app) {
  // Mount Components
  const components = [
    breadcrumbs,
    card,
    profilebox,
    tabbutton,
    toggle,
  ]

  // Register Components
  for (const component of components) {
    app.component(component.name, component);
  }

  return app.mount('#app');
}

// ==================
//     Composables 
// ==================
const autoLinkExclude = [
  "spoiler",
  "spoiler/",
  "toc"
]

const autoLinkBtn = (name, id, path) => {
  if (path.includes("404")) {
    return `<button class="button button--error" onclick="changePage('${name}', '${id}', '${path}')">${name}</button>`
  }
  return `<button class="button button--autolink" onclick="changePage('${name}', '${id}', '${path}')">${name}</button>`
}


function autoLink(value, directory) { 
  const regex = /\[\[(.*?)\]\]/g;
  const matches = [];
  let match;
  
  while ((match = regex.exec(value)) !== null) {
    if (autoLinkExclude.includes(match[1])) continue;
    if (match[1].includes("|")) {
      let [name_real, name_fale] = match[1].split("|")
      matches.push([name_real.trim(), name_fale.trim(), match[1].trim()])
      continue
    }
    matches.push([match[1].trim()]);
  }

  // First check
  for (let index = matches.length - 1; index >= 0; index--) { 
    const item = matches[index]
    const name_real = item[0]
    let name_low;

    if (item.length != 3) {
      name_low = name_real.toLowerCase()
    } else {
      name_low = item[0].toLowerCase()
    }

    if (directory.hasOwnProperty(name_low)) {
      const title = directory[name_low].title
      const path = directory[name_low].path
      
      
      // Has a fake name
      if (item.length == 3) {
        value = value.replace(`[[${item[2]}]]`, autoLinkBtn(item[1], item[0], path))
      } else {
        value = value.replace(`[[${name_real}]]`, autoLinkBtn(title, name_real, path))
      }

      matches.splice(index, 1);
    }
  }

  
  // Second Check
  for (const entry in directory) {
    const title = directory[entry].title
    const loweredTitle = title.toLowerCase()


    for (let index = matches.length - 1; index >= 0; index--) { 
      const item = matches[index]

      if (loweredTitle == item[0].toLowerCase()) {
        const path = directory[entry].path
        
        if (item.length == 3) {
          console.log(item)
          value = value.replace(`[[${item[2]}]]`, autoLinkBtn(item[1], entry, path))
        } else {
          value = value.replace(`[[${item[0]}]]`, autoLinkBtn(title, entry, path))
        }
        
        matches.splice(index, 1);
      }
    }
  }


  matches.map((item, index, array)=>{

    if (item.length == 3) {
      value = value.replace(`[[${item[2]}]]`, autoLinkBtn(item[1], item[0], "assets/404.md"))
    } else {
      value = value.replace(`[[${item[0]}]]`, autoLinkBtn(item[0], item[0], "assets/404.md"))
    }
    
  })
  
  return value
}

function changePage(name, id, path) {
  const url = new URL(window.location);
  
  url.searchParams.set("p", id.replace(" ", "-").toLowerCase());
  history.pushState({}, "", url);

  console.log(name, path)

  // Reload vue page
  root.reload(path, "404", name)
}



// ==================
//     Components 
// ==================
const breadcrumbs = {
  name: "BreadCrumbs",
  template: `
  <div class="breadcrumbs">
    Story > The Birth of a Hero > Characters > Ethan Morales
  </div>
  `
}

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

const profilebox = {
  name: `ProfileBox`,
}

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

const toggle = {
  name: "Toggle",
  template: ``
}


