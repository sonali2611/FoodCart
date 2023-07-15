import React from 'react';
import { useSelector } from 'react-redux';

const BillCalculation = () => {
  const products = useSelector((state) => state.products);

  const calculateBill = () => {
    const productArray = Array.isArray(products) ? products : Object.values(products);

    // Calculate subtotal and total count for each product
    let subtotal = 0;
    const productCount = {};

    productArray.forEach((product) => {
      subtotal += product.price * product.count;

      if (productCount[product.id]) {
        productCount[product.id] += product.count;
      } else {
        productCount[product.id] = product.count;
      }
    });

    const specialOffers = [];
    let totalSavings = 0;
    const productDiscounts = {};

    // Scenario 1: When you buy a Cheese, you get a second Cheese free!
    const cheeseCount = productCount[3] || 0;
    if (cheeseCount >= 2) {
      const cheesePrice = productArray.find((product) => product.id === 3).price;
      const savings = cheesePrice * Math.floor(cheeseCount / 2);
      totalSavings += savings;
      productDiscounts[3] = { name: 'Cheese', discount: savings };
      specialOffers.push(`buy a Cheese, get a second Cheese free! - save $ ${Math.round(savings * 100) / 100}`);
    }

    // Scenario 2: When you buy a Soup, you get a half price Bread!
    const soupCount = productCount[1] || 0;
    const breadCount = productCount[2] || 0;
    if (soupCount >= 1 && breadCount >= 1) {
      const soupPrice = productArray.find((product) => product.id === 1).price;
      const breadPrice = productArray.find((product) => product.id === 2).price;
      const breadSavings = (breadPrice * breadCount) / 2;
      totalSavings += breadSavings;
      productDiscounts[2] = { name: 'Bread', discount: breadSavings };
      specialOffers.push(`Buy a Soup, you get a half price Bread! - save $ ${Math.round(breadSavings * 100) / 100}`);
    }

    // Scenario 3: Get a third off Butter!
    const butterCount = productCount[4] || 0;
    if (butterCount >= 1) {
      const butterPrice = productArray.find((product) => product.id === 4).price;
      const savings = (butterPrice / 3) * butterCount;
      totalSavings += savings;
      productDiscounts[4] = { name: 'Butter', discount: savings };
      specialOffers.push(`Get a third off Butter! - save $ ${Math.round(savings * 100) / 100}`);
    }

    // final total with savings applied
    const total = subtotal - totalSavings;

    return { subtotal, productCount, specialOffers, totalSavings, productDiscounts, total };
  };

  const { subtotal, productCount, specialOffers, totalSavings, productDiscounts, total } = calculateBill();

  return (
        <div style={{border:"1px solid",padding:"10px"}}>
          <h2>Bill Calculation : </h2>
          <div>
            <strong>Subtotal before special offers:</strong> $ {Math.round(subtotal * 100) / 100}
          </div>
          {specialOffers.length > 0 && (
            <div>
              <strong>Special offers applied:</strong>
              <ul>
                {specialOffers.map((offer, index) => (
                  <li key={index}>{offer}</li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <strong>Product Discounts:</strong>
            <ul>
              {Object.keys(productDiscounts).map((productId) => (
                <li key={productId}>
                  Product : {productDiscounts[productId].name} - Discount: $ {Math.round(productDiscounts[productId].discount * 100) / 100}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Total Savings:</strong> $ {Math.round(totalSavings * 100) / 100}
          </div>
          <div>
            <strong>Final total with savings:</strong> $ {Math.round(total * 100) / 100}
          </div>
        </div>
      );
    };
    
    export default BillCalculation;
