import React from 'react'
import Images from '../utils/Images'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decrementItem, removeItem } from '../redux/actions/action';

const FoodItemDetails = () => {
  const {id} = useParams();
  const getCartData = useSelector((state)=> state.cartReducer.carts);
  const navigate = useNavigate();

  const item = getCartData.find((item)=> item.id == id);
  
  const dispatch = useDispatch();

  const increment = (item) => {
    dispatch(addToCart(item));
  }
  const deleteItem = (id) => {
    dispatch(removeItem(id));
    navigate('/');
  }

  const decrement = (item) => {
    dispatch(decrementItem(item));
  }
  return (
    <div className='container mt-2'>
      <h2 className='heading'>Food Item Details</h2>
      <section className='container mt-3'>
        <div className='row itemDetails'>
          <div className="col-md-3 text-center">
            <img src={Images[item.imageKey]} alt={item.foodItem} className='img-fluid' style={{height:'20rem'}}/>
          </div>
          <div className="col-md-9 d-flex flex-column justify-content-center px-4">
            <h4 className='fw-bold mt-3'>{item.restaurantName}</h4>
            <h5 className='text-muted'>{item.foodItem}</h5>
            <div className='row mt-3'>
              <div className="col-md-6">
                <p><strong>Price:</strong> {item.price}</p>
              </div>   
              <div className="col-md-6">
                <p><strong>Rating:</strong> {item.ratings} ⭐</p>
              </div>
              <div className="col-md-6">
                <p><strong>Dishes:</strong> {item.dishes}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Orders:</strong> {item.orders}</p>
              </div>           
              <div className="col-md-6">
                <p><strong>Total:</strong> ₹{item.price * item.quantity}</p>
              </div>
              <div className="col-md-6">
                <p className='d-flex align-items-center'><strong>Remove:</strong> <DeleteIcon className='text-danger cursor-pointer ms-1' onClick={() => deleteItem(item.id)}/></p>
              </div>
              <div className="col-md-6">
                <div className="counterBox">
                  <span className="fs-4 mx-3" onClick={item.quantity <=1 ? ()=>deleteItem(item.id) : ()=>decrement(item)}>-</span>
                  <span className="fs-4 mx-3">{item.quantity}</span>
                  <span className="fs-4 mx-3" onClick={() => increment(item)}>+</span>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FoodItemDetails
