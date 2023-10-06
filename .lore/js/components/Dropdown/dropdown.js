const dropdown = {
  name: "Dropdown",
  props: {
    label: { type:String, required: true },
    sid: { type:String }, // Select id
    change: { type: Function },
    optionList: { type: Object, required: true }       
  },
  template: `
    <label>{{ label }}</label>
    <!-- Dropdown -->
    <select :id="sid" @change="change" class="dropdown">
        <option :value="name" v-for="(value, name) in optionList">
          {{ name }}
        </option>
    </select>
  `
}