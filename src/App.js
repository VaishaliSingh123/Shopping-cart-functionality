import cart from './cart.png';
import './AppScss.scss';
import React,{Component} from 'react';

class App extends React.Component{
  constructor(){
    super();
    this.state={
       productList:[],
       isDialogOpen:false,
       cartList:[],
       cartMap:new Map()
    }
    this.handleAddToCart=this.handleAddToCart.bind(this);
    this.handleRemoveCart=this.handleRemoveCart.bind(this);
  }
  /**
   * function to handle the dialog open close functionality
   */
  handleDialogOpen=(event)=>{
    if(event){
      if(this.state.isDialogOpen){
        this.setState({isDialogOpen:false});
      }else{
        this.setState({isDialogOpen:true});
      }
    }
  }
  /**
   * function to add the items in the cart and remove the
   * @param {*} event 
   * @param {*} elemement 
   */
  handleAddToCart(event,elemement){
    if(event){
       let index=event.currentTarget.id;
       let quantity=this.state.productList[index].quantity;
       let newQuant=quantity-1;

       let productListCopy=JSON.parse(JSON.stringify(this.state.productList));
       productListCopy[index].quantity=newQuant;
        let cartMapcopy=this.state.cartMap;
        cartMapcopy.set(index,productListCopy[index]);
        this.setState({cartMap:cartMapcopy});
        console.log(this.state.cartMap);
       this.setState({productList:productListCopy});
       
    }
  }
  /**
   * function to render the cart
   */
  handleCartRender(){
    if(this.state.isDialogOpen){
      const self=this;
      return (
        <div className="dialogBox">
          <div className="dialog-header">
            <div> Cart Items</div>
            <div className="close" onClick={(event)=> this.handleDialogOpen(event)}>close</div>
          </div>
          <div className="dialog-items">
            <ul className="catItemList">
              {(this.state.cartMap.size>0)?this.renderCartList(this.state.cartMap,self):<div>No Items Are Added to Cart</div>}
            </ul>
          </div> 
        </div>
      );
    }
  }
  /**
   * function to handle the functionality the remove the items form the cart
   */
  handleRemoveCart(event){
    if(event){
      let index=event.currentTarget.id;
      /**
       * cart update
       */
      let cartMapcopy=this.state.cartMap;
      cartMapcopy.delete(index+""); 
      this.setState({cartMap:cartMapcopy});

      /**
       * product list update
       */
      let quantity=this.state.productList[index].quantity;
      let newQuant=quantity+1;

      let productListCopy=JSON.parse(JSON.stringify(this.state.productList));
      productListCopy[index].quantity=newQuant;
      this.setState({productList:productListCopy});
    }

  }
  /**
   * function to render the card elements
   * @param {*} maplist 
   * @param {*} self 
   */
  renderCartList(maplist,self){
   return [...maplist.keys()].map(function (key){
      var entry = maplist.get(key);
      return(
        <li className="listItem">
        <div class="card">
          <img src={entry.image} alt="Avatar"  />
          <div className="container">
            <h4>
              <b>Price: {entry.price}</b>
            </h4>
            <p>{entry.description}</p>
          </div>
          <div className="cartButton">
            <button onClick={self.handleRemoveCart} id={parseInt(key)}>Remove</button>
          </div>
        </div>
      </li>
      );
    }
    )
  }
  /**
   * life cycle method in react
   */
  componentDidMount(){
    fetch(`https://run.mocky.io/v3/aea5d98a-654d-4423-bd99-6fbb90843730`)
    .then(response=>response.json())
    .then(data=>{this.setState({productList:data.data})
        console.log(this.state.productList);
    })
    .catch(error=>console.log(error));
  }
  /**
   * function to render the product list
   */
  renderProductList=()=>{
    if(this.state.productList.length>0){
      return this.state.productList.map((item,index)=>{
        return(
        <li className="listItem">
           <div class="card">
              <img src={item.image} alt="Avatar"  />
              <div className="container">
                <h4>
                  <b>Price: {item.price}</b>
                </h4>
                <h4>
                <b>Quantity: {item.quantity}</b>
                </h4>
                <p>{item.description}</p>
              </div>
             <div className="cartButton">
             {(item.quantity>0)?
               <button onClick={(event)=>{this.handleAddToCart(event)}} id={index}>Add To Cart</button>
               : <button onClick={(event)=>{this.handleAddToCart(event)}} id={index} disabled>Add To Cart</button>}
             </div>
            </div>
         </li>
        );
      })
    }

  }
  render(){
    return (
      <div className="App">
        <div className="shoppingSite">
          <div className="headerTitle">Shopping Site</div>
          <div className="cartImage"> <img src={cart} onClick={(event)=> this.handleDialogOpen(event)} /></div>
        </div>
        <div className="productList">
          <ul className="unorderedList">
             {this.state.productList.length>0?this.renderProductList():<div>No results Foud</div>}
          </ul>
        </div>
        <div  className="footer">
            Shopping.Cart.Com
        </div>
        {(this.state.isDialogOpen)?
        <dialog open className="dialog">
             {this.handleCartRender()}
        </dialog>:""}
      </div>
    );
  }
}

export default App;
