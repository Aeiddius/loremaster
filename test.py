import json

x = """[[Home]]
[[Story]]
- [[tboah]]
- [[eotoq]]
- [[tie]]
[[Characters]]
- [[tboah-characters | The Birth of a Hero]]
- [[tie-characters|The Irregular Entity]]
- [[eotoq-characters | Euphemia of the Ordinary Quill]]
[[Lore]]
- [[Eldra]]
- [[World]]
- [[Religion]]
- [[Creatures]]
- [[Races]]
- [[Magic]]
- [[Beings]]
- [[Items]]
[[Librarium]]
[[About]]"""


dictionary = {
  "areas": {
    "full": {
      "tabs": {
        "default": x
      }
    }
  }
}


with open("nav.json", "w", encoding="utf8") as f:
  f.write(json.dumps(dictionary, ensure_ascii=False, indent=2))