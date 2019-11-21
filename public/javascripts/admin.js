var app = new Vue({
  el: '#admin',
  data: {
    name: "",
    numVotes:0,
    addItem: null,
    items: [],
  },
  created() {
    this.getItems()
  },
  computed: {
  },
  methods: {
    async upload(){
      try {
        console.log(this.name);
        let r2 = await axios.post('/api/items', {
          
          numVotes: 0,
          name: this.name
        });
        this.addItem = r2.data;
        this.getItems();
        this.name="";
      } catch (error) {
        console.log(error);
      }
    },
    async delEl(item){
      try {
        let response = axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
  try {
    let response = await axios.get("/api/items");

    this.items = response.data;
    console.log(response.data)
    return true;
  } catch (error) {
    console.log(error);
  }
    }
  }
});
