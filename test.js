x = `===sssss===

text twoo
===Overview===

text lorem impsum
===Relationships===
===References===

`
function decodeTabs(text) {
    let raw = text.split(/===(.+?)===/gm)
    raw.shift()
    for (let i=0; i < raw.length; i+=2) {
      const tabname = raw[i]
      const content = raw[i+1]

      console.log(`${name}: [${value}]`)
    }
    
   
}

decodeTabs(x)

