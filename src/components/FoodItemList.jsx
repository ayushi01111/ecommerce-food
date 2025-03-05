import React from "react";
import { Button, Card } from "react-bootstrap";
import foodItems from "../json/FoodData.json";
import Images from "../utils/Images";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/action";

const FoodItemList = () => {
  const dispatch = useDispatch();
  const moveToCart = (item) => {
    dispatch(addToCart(item));
  }
  return (
    <div className="container mt-3">
      <h2 className="heading">Your Favourite Food😋</h2>
      <div className="row d-flex justify-content-center mb-3">
        {foodItems.map((item, index) => (
          <div className="col-md-4 d-flex justify-content-center" key={index}>
            <Card style={{ width: "22rem" }} className="card-style mt-4">
              <Card.Img variant="top" src={Images[item.imageKey]} alt={item.foodItem} style={{height:'16rem'}}/>
              <Card.Body>
                <Card.Title className="fw-semibold">{item.restaurantName}</Card.Title>
                <h6 className="text-muted fw-medium">{item.foodItem}</h6>
                <Card.Text>Price : ₹ {item.price}</Card.Text>
                <Button variant="" className="addToCart" onClick={() => moveToCart(item)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodItemList;
