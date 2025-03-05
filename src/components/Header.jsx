import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Table } from "react-bootstrap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import CloseIcon from '@mui/icons-material/Close';
import Images from "../utils/Images";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import { removeItem } from "../redux/actions/action";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const[price, setPrice] = useState(0);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const getCartData = useSelector((state)=> state.cartReducer.carts)

  const dispatch = useDispatch();
  const deleteItem = (id) => {
    dispatch(removeItem(id));
  }
  const total = () => {
    let price = 0;
    getCartData.map((item) => {
      price = (item.price)*(item.quantity) + price;
    })
    setPrice(price);
  }
   useEffect(()=>{
    total();
   },[getCartData])
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" style={{ height: "60px" }} className="sticky-top">
        <Container>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-white fw-semibold">
              Home
            </NavLink>
          </Nav>
          <Badge badgeContent={getCartData.length} color="secondary" id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick} style={{margin:'5px'}}>
            <ShoppingCartIcon className="shoppingCartIcon" />
          </Badge>
        </Container>
        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div className="cart-details">
            <CloseIcon className="closeIcon" onClick={handleClose}/>
            {getCartData.length> 0 ? 
            <Table>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Food Item</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {getCartData.map((item)=>
                  <tr>
                    <td>
                      <NavLink to={`/cart/${item.id}`} onClick={handleClose}><img src={Images[item.imageKey]} alt={item.foodItem} style={{width:'5rem', height:'5rem'}}/></NavLink>
                    </td>
                    <td>
                      <p><strong>{item.foodItem}</strong></p>
                      <p>Price per qty: ₹{item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </td>
                    <td>
                      <DeleteIcon className='text-danger cursor-pointer' onClick={()=>deleteItem(item.id)}/>
                    </td>
                  </tr>
                )}
              </tbody>
              <p className="text-center mt-2">Total: ₹{price}</p>
            </Table>
         : (
            <>
              <p style={{fontSize:'22px'}}>Your cart is empty</p>
              <img src={Images.cartGif} alt="cart" className="cartGif"/>
            </>
          )}
            
        </div>
      </Menu>
      </Navbar>
    </>
  );
};

export default Header;
