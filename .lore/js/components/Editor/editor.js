const editor = {
  name: "Editor",
  data() {
    return {
      pageData: {}  
    }
  },
  props: {
    directory: { type: Object, required: true }
  },
  // mounted() {
  //   document.getElementById("editor-area").value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n proident, sunt in\n culpa qui officia deserunt \nmollit anim id est laborum."
  // },
  methods: {

    start(value){
      this.pageData = structuredClone(value)
      console.log(this.pageData)
      console.log(this.directory)

      // if (Object.keys(value).length == 0) return
      // this.pageData = {} 
      // this.pageData = copyObject(value);

      // document.getElementById("editor-area").value = this.pageData.full.original
      // this.getArea('full')

      
      // const tab = this.pageData['full'].original[Object.keys(this.pageData.full.original)[0]]
      // document.getElementById("editor-area").value = tab
      // console.log("Cakkedd")      
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
                <option value="Edge"/>
                <option value="Firefox"/>
                <option value="Chrome"/>
                <option value="Opera"/>
                <option value="Safari"/>
              </datalist>
            </div>
        </div>
        <!-- Textarea -->
        <textarea name="background-color: white;" id="textarea"
                  placeholder="Write here..."></textarea>      
      </div>

      <!-- Settings -->
      <div class="editor-options flex flex-c pos-relative">

        <!-- Mode buttons -->
        <span class="flex">
          <!-- <label>Mode</label> -->
          <button class="btn btn-active">Full</button>
          <button class="btn">Preview</button>
        </span>

        <button class="btn">Edit Profile</button>

        <!-- Select Tab -->
        <div class="tab-options flex flex-c mt-15">
          <label>Tabs</label>
          <!-- Dropdown -->
          <select id="tab-select">
              <option value="ActionScript">ActionScript</option>
              <option value="AppleScript">AppleScript</option>
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
          <button class="btn btn-green">Save</button>
          <button class="btn btn-red" @click="exit">Exit</button>
        </div>
      </div>
      <!-- Settings -->
    
    </div> 

  </div>
  `
} 