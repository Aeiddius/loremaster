const editor = {
  name: "Editor",
  data() {
    return {
      pageData: {},
      pathChoices: [],

      
      // Check to see if profile is currently edited
      isCurrentProfile: false,

      // area obj
      currentArea: "",
      currentTab: "",
      currentAreaObj: {}


    }
  },
  components: ['EditorTab'],
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
      this.currentTab = Object.keys(this.pageData[area].original)[0]
      this.currentAreaObj = copyobj(this.pageData[area])



      console.log(this.currentAreaObj)

      // Set <Tabs btn active>
      for (const ar of ['full', 'preview']) {
        if (ar == area) {
          this.getNode(`btn-${ar}`).classList.add("btn-active")
        } else {
          this.getNode(`btn-${ar}`).classList.remove("btn-active")
        }
        
      }

      const paths = [];
      for (const entryId in this.directory) {
        const entry = splitStringAtLast(this.directory[entryId].path, '/')[0]
        if (paths.includes(entry)) continue
        paths.push(entry)
      }
      this.pathChoices = paths.sort()
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

      console.log(raw)

      this.$emit('save-page', raw)
    },
    tabNew() {
      const value = this.getNode('tab-new-input').value.trim()
      if (value === "") return

      const tabs = Object.keys(this.currentAreaObj.original)

      if (tabs.includes(value)) return

      this.pageData[this.currentArea].original[value] = ""

    },
    tabRename() {
      const value = this.getNode('tab-rename-input').value.trim()
      if (value === "") return

      const curTabVal = `${this.pageData[this.currentArea].original[this.currentTab]}`

      this.pageData[this.currentArea].original[value] = curTabVal
      delete this.pageData[this.currentArea].original[this.currentTab]


      this.changeArea(this.currentArea)
      this.refreshTextArea()
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
    




    <EditorTab/>






    <div id="editor" class="flex">      
      <!-- Text Input Area -->
      <div class="textbox">
        <h1>Editor</h1>
        <!-- Path selector -->
        <div class="path-select flex width-100 flex-align">
            <label>Path: </label>
            <div class="width-100">
              <input type="text" name="example" list="path-choices" 
                     class="input width-100"
                     placeholder="/">
              <datalist id="path-choices">
                <option :value="value" v-for="(value, index) in pathChoices">
                </option>
                
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
          <select id="tab-select" @change="changeTab" v-if="currentAreaObj">
              <option :value="name" v-for="(value, name) in currentAreaObj.original">
                {{ name }}
              </option>
          </select>

          <!-- Edit -->
          <span class="flex">
            <button class="btn" @click="getNode('tab-new').classList.toggle('hide')">New</button>
            <button class="btn" @click="getNode('tab-rename').classList.toggle('hide')">Rename</button>
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


   
        <!-- Tab:New -->
        <div class="flex flex-c mt-15 boxes hide" id="tab-new">
          <label>New Tab</label>
          <input type="text" id="tab-new-input" class="input width-100"
                 placeholder="home">

          <div class="flex">
            <button class="btn" @click="tabNew">Ok</button>
            <button class="btn" @click="getNode('tab-new').classList.add('hide')">Cancel</button>
          </div>
        </div>       


        <!-- Tab:Rename -->
        <div class="flex flex-c mt-15 boxes hide" id="tab-rename">
          <label>Rename Tab</label>
          <input type="text" id="tab-rename-input" class="input width-100"
                 placeholder="home">

          <div class="flex">
            <button class="btn" @click="tabRename">Ok</button>
            <button class="btn" @click="getNode('tab-rename').classList.add('hide')">Cancel</button>
          </div>
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