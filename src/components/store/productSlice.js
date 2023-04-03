import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
// import { act } from "react-dom/test-utils";

export const STATUSES = Object.freeze(
    {
        IDLE:'idle',
        ERROR:'error',
        LOADING:'loading'
    }
)


const productSlice = createSlice({
    name:'product',
    initialState:{
        data:[],
        status:STATUSES.IDLE,

    },
    reducers:{
        setProducts(state,action){
            state.data = action.payload

        },
        setStatus(state,action){
            state.status = action.payload
        }

    

    },
    // extraReducers:(builder)=>{
    //     builder
    //     .addCase(fetchProducts.pending,(state,action)=>{
    //         state.status = STATUSES.LOADING
    //     })
    //     .addCase(fetchProducts.fulfilled,(state,action)=>{
    //         state.data = action.payload

    //     })
    //     .addCase(fetchProducts.rejected,(state,action)=>{
    //         state.status = STATUSES.ERROR
    //     })

    // }
})


export const {setProducts,setStatus} = productSlice.actions
export default productSlice.reducer



// export const fetchProducts = createAsyncThunk('product/fetch',async ()=>{
//     const  res = await fetch('https://fakestoreapi.com/products')
//      const  data =  await res.json()

// })

//  we are going to use thun funtions in javascript to fatch api
export function fetchProducts(){
    return async function  fetchProductsThunk(dispatch,getState){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            const  res = await fetch('https://fakestoreapi.com/products')
            const  data =  await res.json()
            dispatch(setProducts(data))
            dispatch(setStatus(STATUSES.IDLE))
        }
        catch(error){
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))

        }


    }
        
    
}