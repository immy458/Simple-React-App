import React from 'react';
import './App.css';

//class component
class App extends React.Component {     //the app class extends Component, 
  //so React understands that this class is a component, and it renders (returns) a React Element.
  //


 state={            //state is an object
      products:[],
      product:{
        id:'',
        name:'',
        price:''
      },
      searchval:"",
      searchedprod:[],
      classtry:"",
  }
 
 //we fetch the data in componentDidMOunt 
  componentDidMount(){
  this.getProducts(); //componentDidMount() method is the perfect place, where we can 
  //call the setState() method to change the 
  //state of our application and render() the updated data loaded in JSX. 
  }
  getProducts =()=> {
    fetch('http://localhost:4000/')
    .then(response=>response.json())    //returns json data in response variable
   .then( response =>{
      console.log(response);
         this.setState({ products:response.products});
    })  
 //   .then(response=>this.setState({products:response.data}))
    .catch(err=>console.error(err))
  }

  /*----------------------------add product------------------------------------*/

    addProduct=()=>{
      const {products,product}=this.state;
      var flag=0;
      if(product.id=="")
      {
        alert("Product Id required!!");
      }
      else if(product.name=="")
      {
        alert("Product name required!!");
      }
      else if(product.price=="")
      {
        alert("Product Price required!!");
      }
      else
      {
          console.log("prouct.id: " +product.id);
          products.some(function(item) //with foreach we cannot break the loop so using some() loop,
          //The some() method will test all elements of an array (only one element must pass the test).
          {
            console.log(item.pid);
            if(product.id==item.pid)
            {
              flag=1;
              return false;
            }
          }
          );
          console.log("flaggg: "+flag);
        if(flag==0)
        {
          fetch(`http://localhost:4000/products/add?pid=${product.id}&pname=${product.name}&price=${product.price}`)
          .then(this.getProducts)
          .catch(err=>console.error(err))
          alert('Added Successfully');
        }
        else
        {
          alert('Please Enter unique pid');
        }
      }
    }
  /*----------------------------------search--------------------------------->*/
  searchProduct=()=>{
    const {products,searchval,searchedprod,classtry}=this.state;
    if(searchval=="")
    {
      alert("TextBox Empty!!");
    }
    else
    { 
      //---------------reset previous text color----------------------------
      products.forEach(function(item){
        document.getElementById(item.pid).style.color='black';
      });

      //-------------------------------------------------------------------
      fetch(`http://localhost:4000/products/search?pid=${searchval}`)
      .then(response=>response.json())    //returns json data in response variable
    .then(response =>{
        console.log(response);
          this.setState({ searchedprod:response.searchedproducts});
           if(response.searchedproducts.length==0){
             alert("No results Found");
           }
           else{
            document.getElementById(searchval).style.color='orange';
            }
          })
      .catch(err=>console.error(err))
    }

  }

  /*--------------------------------------------------------------*/
  //render( ) method which returns a React element (JSX), or null
  
  render()
  {
    const{ products,product,searchval,searchedprod,classtry }=this.state;
 
    return (
      <div className="App">
        <h1>Products</h1>
        <table className="table">
        <th>Id</th>
        <th>Name</th>
        <th>Price</th>
        </table>
        {
          products.map(function(items){     //to iterate through the data in products we use map function where item is actually the data
          return(
            <div>
              <table className="table">
              <tr id={items.pid} >
              <td>{items.pid}</td>
              <td>{items.pname}</td>
              <td>{items.price}</td>
              </tr>
            </table>
          </div>
          );
        })}

        <div>
        <br/> <br/> 
        <input type="text" placeholder="Product Id"
          required
          onChange={e=>this.setState({product:{ ...product,id:e.target.value}})}
          />
          <br/> <br/> 
          <input type="text" placeholder="Product Name"
          required
          value={product.name}
          onChange={e=>this.setState({product:{ ...product,name:e.target.value}})}
          />
<br/> <br/> 
          <input type="text" placeholder="Product Price"
          required
          onChange={e=>this.setState({product:{ ...product,price:e.target.value}})}
          />
          <br/> <br/> 
          <button onClick={this.addProduct}>Add Product</button>
          </div>
          <div>
          <br/> <br/>



          <h1>Search Product</h1>
          <input type="text" placeholder="Enter Pid"
          required
          onChange={e=>this.setState({searchval:e.target.value})}
          />
          <button onClick={this.searchProduct}>Search Product</button>
          <table className="table">
          <th>Id</th>
          <th>Name</th>
          <th>Price</th>
          </table>
          {
            searchedprod.map(function(items){     //to iterate through the data in products we use map function where item is actually the data
            return(
              <div>
                <table className="table">
                <tr>
                <td>{items.pid}</td>
                <td>{items.pname}</td>
                <td>{items.price}</td>
                </tr>
              </table>
            </div>
            );
          })}
          </div>
      </div>

      
    );
  }
}

export default App;
