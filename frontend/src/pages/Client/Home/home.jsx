import React, { useEffect, useState } from 'react'
import './home.css'
import { Axios } from 'axios'
import Topbar from '../../../components/Client/topbar/topbar'
import ImageSlider from '../../../components/Client/imageSlider/imageSlider'
import FeaturedInfo from '../../../components/Client/featuredInfo/featuredInfo'
import ProductCard from '../../../components/Client/productCard/productCard'
import ContactUs from '../../../components/Client/contactUs/contactUs'
import Footer from '../../../components/Client/footer/footer'
import CategoryCard from '../../../components/Client/categoryCard/categoryCard'
import { sliderData } from '../../../components/Client/imageSlider/sliderData'
import { getFiveProducts } from '../../../redux/actions/productActions'

//import redux to use redux action and constants

import { useDispatch, useSelector } from 'react-redux';
import { getProducts, recordProductVisit } from '../../../redux/actions/productActions';
import { getCagegory } from '../../../redux/actions/categoryActions'
import { createUserLog } from '../../../redux/actions/userLogActions';
//import redux actions to call all the functions
// import { getProducts as listProducts } from '../../redux/actions/productActions'
import { useCookies } from 'react-cookie';

import { CircularProgress} from '@mui/material';

import StarsSharpIcon from '@material-ui/icons/StarsSharp';

export default function Home() {
  const [cookies, setCookie] = useCookies(['user']);

  // const componentDidMount = () => {
  //   window.addEventListener("beforeunload", function(){
  //     console.log('want to leave');
  //     setCook();
  //     return 'Are you sure you want to leave?';
  //   });
  // }
  
  // const componentWillUnmount = () => {
  //   window.removeEventListener("beforeunload", function(){
    //     setCook();
    //     return 'Are you sure you want to leave?';
  //   });
  // }

 
  
  // window.onbeforeunload = function(){
  //   console.log('want to leave');
  //     setCook();
  //   return 'Are you sure you want to leave?';
  // };

  // const setCook = () => {
  //   const user = JSON.parse(sessionStorage.getItem('user'));
  //   const date = new Date().toISOString().slice(0, 10);
    
  //   console.log('set cookies:');
  //   console.log(user);
  //   console.log(date);
  //   localStorage.setItem('user leave', JSON.stringify(user));

  //   var today = new Date();
  //   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  //   let purchased = sessionStorage.getItem('purchased');
  //   let reachCheck = sessionStorage.getItem ("reachedCheckout");
  //   let addedToCart = sessionStorage.getItem("addToCart")

  //   if(purchased === null){
  //     purchased = false;
  //   }else{
  //     purchased = true;
  //   }

  //   if(reachCheck === null){
  //     reachCheck = false;
  //   }else{
  //     reachCheck = true;
  //   }

  //   if(addedToCart === null){
  //     addedToCart = false 
  //   }else{
  //     if (addedToCart) {
  //       addedToCart = true
  //     }else{
  //       addedToCart = false
  //     }
  //   }
    
  //   if(cookies.uid){
  //     console.log('In loged user');
  //     if(user.state == undefined){
  //       dispatch(createUserLog(user.href,user.referrer,user.screenWidth,user.screenHeight,addedToCart,reachCheck,purchased,date,time, user.city, '', cookies.uid));

  //     }else{
  //       dispatch(createUserLog(user.href,user.referrer,user.screenWidth,user.screenHeight,addedToCart,reachCheck,purchased,date,time, user.city, user.state, cookies.uid));

  //     }
  //   }else{
  //     console.log('In not loged user');
  //     dispatch(createUserLog(user.href,user.referrer,user.screenWidth,user.screenHeight,addedToCart,reachCheck,purchased,date,time, user.city, user.state, ''));
  //   }

  //   // dispatch(createUserLog(user.href,user.referrer,user.screenWidth,user.screenHeight,addedToCart,reachCheck,purchased,date,time, user.city, user.state, cookies.uid));

  //   sessionStorage.removeItem('user');
  //   sessionStorage.removeItem('reachedCheckout');
  //   sessionStorage.removeItem('purchased');
  //   sessionStorage.removeItem('addToCart');
    
  //   let productVisit = JSON.parse(sessionStorage.getItem("productVisit"));
  //   productVisit.map((item) => {
  //     dispatch(recordProductVisit(Number(item)));
  //   })
  //   sessionStorage.removeItem('productVisit');
  // }

  // window.addEventListener('beforeunload', (event) => {
  //   console.log('want to leave');
  //   event.returnValue = `Are you sure you want to leave?`;
  //   // setCook();
  // });
  // const dispatch = useDispatch();
  // const getProducts = useSelector(state=>state.getProducts);

  // const {loading,products,error} = getProducts;

  const dispatch = useDispatch();

 	useEffect(() => {
 	  dispatch(getProducts());
    dispatch(getCagegory())
    dispatch(getFiveProducts())
    console.log(sessionStorage.getItem('user'));
 	}, [dispatch]);

	const products = useSelector((state) => state.getProduct.products);
	// console.log(products);
  const categories = useSelector((state)=> state.getCategory.categories)

  //getting the top five new products here
  const fiveNewProducts = useSelector((state) => state.topFiveNewProducts);
  const {topFive, loading , error} = fiveNewProducts;

  console.log(categories)


  const [productList, setProduct] = useState([]);

  return (
    <>
      <Topbar />      
      <FeaturedInfo />
          <div className="categoryListTitle">
              <h2>All Categories</h2>
          </div>
          <div className="categoryCardList">
            <div className="categoryCardListHolder">
              <div className="categoryCardListContent">
                <div className="categoryCardContentWrapper">
                  { !categories?.length ? <div></div> :
                    (
                      categories.map((val,key)=>{
                        return(
                          <CategoryCard
                            key={val.id}
                            title={val.ctgr_title}
                            rating={val.ctgr_rating}
                            image={val.ctgr_img}
                            value={val.ctgr_value}
                          
                          />
                        )
                      })
                    )

                  }                     
                                      
                </div>
              </div>                
            </div>
          </div>
          <div className="addsAndShow">
            <div className="addsAndShowContainer">
              <div className="imageSliderSide">
                <ImageSlider 
                  className="imageSliderComponent" 
                  slides={sliderData} />
              </div>
              <div className="newItemSide">
                <div className="newItemSideHolder">
                    <div className="newItemsTitle">
                        <h3>New Products     <StarsSharpIcon/></h3> 
                        <span>Top 5 newest Products for you</span>
                    </div>
                    <div className="newItemContainerContent"> 
                        <div className="newItemsContainer">
                            {
                              loading? <h2>Loading...</h2> : error? <h3>{error}</h3>:
                              !topFive?.length? <div></div>:
                              topFive.map((val, key)=>{
                                return (
                                  <ProductCard 
                                    key = {val.id}
                                    productId={val.id} // this id is not the product id should be the random generated number for the product id
                                    name={val.productName}
                                    price={val.productPrice}
                                    imageUrl={val.productImg}
                                    brand={val.productBrand} 
                                    rating={val.rating}
                                  />
                                )
                              })
                            }
                        </div> 
                      </div>
                </div>
              </div>
            </div>
          </div>

       <div className='homeScreen_products'>
        
        <h3 productCardTitle>Our Products</h3>
        {loading?<h3>Loading...</h3>:""}
        <div className="productHolder">
          {
            !products?.length ? <div></div> : (
              products.map((val, key) => {
                // console.log(val);
                return (
                  <div className='productListItems' >         
                    <ProductCard 
                      key = {val.id}
                      productId={val.id} // this id is not the product id should be the random generated number for the product id
                      name={val.productName}
                      price={val.productPrice}
                      imageUrl={val.productImg}
                      brand={val.productBrand} 
                      rating={val.rating}
                      />
                  </div>
                )
              })
            )
          }
        </div>
      </div> 
       {/* <ContactUs /> */}
      <Footer />  
    </>
  )
}
