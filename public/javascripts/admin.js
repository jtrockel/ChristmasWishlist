

var app = new Vue({
  el: '#admin',
  data: {
    name: "",
    numOrdered:0,
    url:"",
    forWhom:"",
    addItem: null,
    items: [],
    emptyList: [],
    u:1,
    d:-1
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
          forWhom: this.forWhom,
          url:this.url
        });
        this.addItem = r2.data;
        this.getItems();
        this.name="";
        this.forWhom="";
        this.url="";
      } catch (error) {
        console.log(error);
      }
    },
    async addVote(item, val){

        try {
            let response = await axios.put("/api/items/" + item._id, {
              name: item.name,
              numOrdered:item.numOrdered + val,
              forWhom: item.forWhom,
              url:item.url
          });
                
          } catch (error) {
            console.log(error);
          }
        this.getItems();
        return true;
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
