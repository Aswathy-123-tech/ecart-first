import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/slices/productSlices'

const Home = () => {

  const dispatch = useDispatch()
  const {allProducts,loading,errorMsg} = useSelector(state=>state.productReducer)
  console.log(allProducts,loading,errorMsg);
  const [currentPage,setCurentPage] = useState(1)
  const productPerPage = 8
  const totalPage = Math.ceil(allProducts?.length/productPerPage)
  const currentPageProductLastIndex = currentPage * productPerPage
  const currentPageProductFirstIndex = currentPageProductLastIndex-productPerPage

  
  

  useEffect(()=>{
    dispatch(fetchProducts())
  },[])
  const navigatToNext = ()=>{
    if(currentPage!=totalPage){
      setCurentPage(currentPage+1)
    }
  }
  const navigatToBack =()=>{
    if(currentPage!=1){
      setCurentPage(currentPage-1)
    }
  }
  return (
    <>
 <Header insideHome={true}/>
 <div style={{paddingTop:'100px'}} className='container px-4 mx-auto'>
  {loading ? (
    <div className='flex justify-content items-center text-lg'>
      <img width={"200px"} height={"200px"} src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="" />
      Loading.....
    </div>):(
    <div className='grid grid-cols-4 gap-4'>
      {
        allProducts?.length>0?(
          allProducts.map((product)=>(
        <div key={product?.id} className='rounded border p-2 shadow border-blue-500 shadow-blue-800'>
            <img width={'100%'} height={"200px"} src={product?.thumbnail} alt="" />
            <div className='text-center'>
                <h3 className='text-xl font-bold'>{product.title}</h3>
                    <Link to={`${product?.id}/view`} className='bg-blue-400 rounded p-1 mt-3 text-white inline-block'>View more</Link>
            </div>
        </div>

          ))
        )
        :
        <div className='flex justify-center items-center font-bold text-red-600 my-5 text-lg'>products not found</div>
      }
    </div>
    )}
    <div className='text-2xl text-center font-bold mt-20'>
      <span onClick={navigatToBack}   className='cursor-pointer'><i  className='fa-solid fa-backward me-5'></i></span>
      <span>{currentPage} of {totalPage}</span>
      <span onClick={navigatToNext} className='cursor-pointer'><i  className='fa-solid fa-forward me-5'></i></span>
    </div>
 </div>

    </>
  )
}

export default Home