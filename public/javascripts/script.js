var app = new Vue({
  el: '#voter',
  data: {
    name: "",
    numOrdered:0,
    price:"",
    url:"",
    addItem: null,
    selectedNames: [],
    items: [],
    displayItems:[],
  },
  created() {
    this.getItems()
  },
  computed: {
    orderedNames: function () {
      return this.items.sort((a, b) => (a.name > b.name) ? 1 : -1)
  },
},
  methods: {
    async upload(){
      try {
        console.log(this.name);
        let r2 = await axios.post('/api/items', {
          
          numOrdered: 0,
          name: this.name,
          url:this.url,
          price: this.price
        });
        this.addItem = r2.data;
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },
    
    async submitVotes(){
      this.displayItems=[]
        for (var i=0; i< this.selectedNames.length; i++){
          console.log(this.selectedNames.length);
            try {
                let response = await axios.put("/api/items/" + this.selectedNames[i]._id, {
                    name: this.selectedNames[i].name,
                    numOrdered:this.selectedNames[i].numOrdered,
                    price: this.selectedNames[i].price,
                    url:this.selectedNames[i].url
                });
                
              } catch (error) {
                console.log(error);
              }
        }
        this.displayItems = this.selectedNames
        this.selectedNames=[];
        this.getItems();
        return true;
    },
    async delEl(item){
      try {
        let response = await axios.delete("/api/items/" + item._id);
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
