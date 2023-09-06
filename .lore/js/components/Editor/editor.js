const editor = {
  name: "Editor",
  data() {
    return {
      pageData: {},
      currentArea: "",
      currentTab: "",
      isCurrentProfile: false,
      currentAreaObj: {}
    }
  },
  emits: ['save-page'],
  props: {
    directory: { type: Object, required: true }
  },
  methods: {

    start(value){
      this.pageData = JSON.parse(JSON.stringify(value))  
      this.changeArea('full')
    },
    changeArea(area) {
      this.isCurrentProfile = false
      this.currentArea = area
      this.currentTab = Object.keys(this.pageData[area].tabs)[0]
      this.currentAreaObj = copyobj(this.pageData[area])

      // Set <Tabs btn active>
      for (const ar of ['full', 'preview']) {
        if (ar == area) {
          this.getNode(`btn-${ar}`).classList.add("btn-active")
        } else {
          this.getNode(`btn-${ar}`).classList.remove("btn-active")
        }
        
      }

      // Set <textarea>
      this.refreshTextArea()
    },
    changeTab(event) {
      // Save the last area
      this.isCurrentProfile = false
      const newTab = event.currentTarget.value
      this.currentTab = newTab

      this.refreshTextArea()
    },
    refreshTextArea(){
      this.getNode("textarea").value = `${this.currentAreaObj.original[this.currentTab]}`
    },
    editProfile() {
      if (this.isCurrentProfile == false) {
        this.isCurrentProfile = true
        this.getNode("textarea").value = `${this.currentAreaObj.profileOriginal}`
      } else {
        this.isCurrentProfile = false 
        this.refreshTextArea()
      }

    },
    saveTextArea(event) {
      if (this.isCurrentProfile == false) {
        this.pageData[this.currentArea].original[this.currentTab] = event.currentTarget.value
        this.currentAreaObj.original[this.currentTab] = event.currentTarget.value
      } else {
        this.pageData[this.currentArea].profileOriginal = event.currentTarget.value
        this.currentAreaObj.profileOriginal = event.currentTarget.value
      }




    },
    save() {
      let raw = ""

      // Check if preview is empty
      let noPreview = false 
      const previewKeys = Object.keys(this.pageData['preview'].original)
      if (previewKeys.length == 1 && previewKeys[0] == 'default' && this.pageData['preview'].original['default'].trim() == "") {
          noPreview = true
      }

      

      for (const area of ['full', 'preview']) {
        const profile = this.pageData[area].profileOriginal
        if (profile.trim() != "") {
          raw += `=============================\n${profile}\n=============================\n`
        }
        
        const tabCount = Object.keys(this.pageData[area].original).length
        for (const tabname in this.pageData[area].original) {
          const tab = this.pageData[area].original[tabname]
          
          if (tabCount === 1) {
            raw += `${tab}\n` 
            continue
          } 
          raw += `===${tabname}===\n${tab}\n\n`

        }
        if (area == 'full' && noPreview == false) {
          raw += '\n----------------------------------------------------------------------\n'
        }
      } 

      this.$emit('save-page', raw)

    },
    exit() {
      this.getNode("editor-box").classList.add("hide")
    },
    getNode(id) {
      return document.getElementById(id)
    }
  },
  template: `
  <div id="editor-box" class="editor-container">
    
    <div id="editor" class="flex">      
      <!-- Text Input Area -->
      <div class="textbox">
        <h1>Editor</h1>
        <!-- Path selector -->
        <div class="path-select flex width-100 flex-align">
            <label>Path: </label>
            <div class="width-100">
              <input type="text" name="example" list="exampleList" 
                     class="input width-100"
                     placeholder="/">
              <datalist id="exampleList">
                <!-- <option value="Edge" v-for="(value, name) in pageData"/> -->
                <option value="Firefox"/>
                <option value="Chrome"/>
                <option value="Opera"/>
                <option value="Safari"/>
              </datalist>
            </div>
        </div>
        <!-- Textarea -->
        <textarea name="background-color: white;" id="textarea"
                  placeholder="Write here..."
                  @change="saveTextArea"></textarea>      
      </div>

      <!-- Settings -->
      <div class="editor-options flex flex-c pos-relative">

        <!-- Mode buttons -->
        <span class="flex">
          <!-- <label>Mode</label> -->
          <button class="btn btn-active" id="btn-full" @click="changeArea('full')">Full</button>
          <button class="btn" id="btn-preview" @click="changeArea('preview')">Preview</button>
        </span>

        <button class="btn" @click="editProfile">Edit Profile</button>

        <!-- Select Tab -->
        <div class="tab-options flex flex-c mt-15">
          <label>Tabs</label>
          <!-- Dropdown -->
          <select id="tab-select" @change="changeTab">
              <option :value="name" v-for="(value, name) in currentAreaObj.tabs">
                {{ name }}
              </option>
          </select>

          <!-- Edit -->
          <span class="flex">
            <button class="btn">New</button>
            <button class="btn">Rename</button>
          </span>
          <button class="btn">Delete</button>
        </div>

        <!-- Tags -->
        <div class="flex flex-c mt-15">
          <label>Tags</label>
          <input type="text" id="tags-input" class="input width-100"
                 placeholder="tagA tagB tagC">
        </div>

        <!-- Parent -->
        <div class="flex flex-c mt-15">
          <label>Parent</label>
          <input type="text" id="parent-input" class="input width-100"
                 placeholder="home">
        </div>


        <div class="flex float-bottom width-100">
          <button class="btn btn-green" @click="save">Save</button>
          <button class="btn btn-red" @click="exit">Exit</button>
        </div>
      </div>
      <!-- Settings -->
    
    </div> 

  </div>
  `
} 