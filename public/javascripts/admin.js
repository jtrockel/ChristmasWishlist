

var app = new Vue({
  el: '#admin',
  data: {
    name: "",
    numOrdered:0,
    url:"",
    price:"",
    addItem: null,
    items: [],
    emptyList: [],
  },
  created() {
    this.getItems()
  },
  computed: {
    orderedNames: function () {
      return this.items.sort((a, b) => (a.name > b.name) ? 1 : -1)
  }
},
  methods: {
    
    async upload(){
      try {
        console.log(this.name);
        let r2 = await axios.post('/api/items', {
          
          numOrdered: 0,
          name: this.name,
          price: this.price,
          url:this.url
        });
        this.addItem = r2.data;
        this.getItems();
        this.name="";
        this.price="";
        this.url="";
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
