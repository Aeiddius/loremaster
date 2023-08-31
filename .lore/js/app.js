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
      let pageId = this.getCurrentPageId();
      if (pageId == null || pageId == "") pageId = "home"
      if (!this.directory.hasOwnProperty(pageId)) pageId = "404"

      

      this.reload(pageId)


    },
    methods: {
      async reload(pageId) {

        // Get metadata file 
        let isError = false
        let pageMeta = this.directory[pageId];
        if (!this.directory.hasOwnProperty(pageId)) {
          pageMeta = this.directory["404"];
          isError = true;
        }

        // Update Card Content
        this.content = await (await fetch(pageMeta.path)).text() 
        this.pageName = pageMeta.title

        if (isError = true) {
          this.content = this.content + `\n\nPage <span class="error">${pageId}</span> does not exist.`}
        
        // Update App
        this.$forceUpdate();
      },
      getCurrentPageId() {
        return (new URLSearchParams(window.location.search)).get('p');
      }
    }
  })

  root = mount(app)
}