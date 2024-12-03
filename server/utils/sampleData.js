import Product from "../models/product.js";
import { connectToDB } from "./db.js";

export const IPL_PRODUCTS = [
  {
    title: "Chennai Super Kings Jersey",
    team: "Chennai Super Kings",
    price: 1499,
    description:
      "Official 2024 Chennai Super Kings jersey with vibrant yellow and blue accents.",

    imageUrl: "https://m.media-amazon.com/images/I/61diqJXhcLL.jpg",
    stock: 25,
  },
  {
    title: "Mumbai Indians Cap",
    team: "Mumbai Indians",
    price: 799,
    description:
      "Premium quality Mumbai Indians cap with adjustable strap and embroidered logo.",

    imageUrl:
      "https://shopthearena.com/cdn/shop/products/60292080_1024x.jpg?v=1648811688",
    stock: 50,
  },
  {
    title: "Delhi Capitals Mug",
    team: "Delhi Capitals",
    price: 499,
    description:
      "Durable ceramic mug featuring the official Delhi Capitals logo.",

    imageUrl:
      "https://rukminim2.flixcart.com/image/850/1000/kge0n0w0/mug/t/n/s/delhi-capitals-perfect-for-gifting-ipl-cup-for-cricket-lovers-original-imafwmegrshq5gg2.jpeg?q=20&crop=false",
    stock: 30,
  },
  {
    title: "Royal Challengers Bangalore Keychain",
    team: "Royal Challengers Bangalore",
    price: 199,
    description:
      "Official 2024 Royal challengers bengaluru jersey with vibrant red and blue accents.",

    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjgaacNge-Efrf3ZGewwqfFjRRrIub6OZGtg&s",
    stock: 100,
  },
  {
    title: "Kolkata Knight Riders Hoodie",
    team: "Kolkata Knight Riders",
    price: 1899,
    description:
      "Comfortable and warm hoodie with KKR branding, perfect for all seasons.",

    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_QZ13-w-Y1PXudlUnSdmeahWuJQDl7NX8uQ&s",
    stock: 20,
  },
  {
    title: "Rajasthan Royals Backpack",
    team: "Rajasthan Royals",
    price: 1599,
    description:
      "Durable and spacious backpack with Rajasthan Royals logo and colors.",

    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt8bbybjimgJGbiLnJNStm2yrlBH-1mWOCcA&s",
    stock: 15,
  },
  {
    title: "Sunrisers Hyderabad Water Bottle",
    team: "Sunrisers Hyderabad",
    price: 599,
    description:
      "Leak-proof, BPA-free water bottle with Sunrisers Hyderabad logo.",

    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkl2Z8u56iFbJb_k087HNZnCPv1PblARI8-A&s",
    stock: 40,
  },
  {
    title: "Lucknow Super Giants Wristband",
    team: "Lucknow Super Giants",
    price: 149,
    description: "Official 2024 Lucknow Super Giants jersey",

    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIm3WWrKh4_zwy1hxZdLoWNy_GTYX6jZcU8A&s",
    stock: 60,
  },
  {
    title: "Gujarat Titans Phone Case",
    team: "Gujarat Titans",
    price: 699,
    description: "Official 2024 Gujarat Titans logo and design jersey.",

    imageUrl:
      "https://static.toiimg.com/thumb/msid-108566288,width-1280,height-720,resizemode-4/108566288.jpg",
    stock: 35,
  },
  {
    title: "Punjab Kings Flag",
    team: "Punjab Kings",
    price: 299,
    description: "Official 2024 Punjab Kings jersey.",

    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiH5JaMXKDkPgy7CzKgQmTLd6plg9YPxDiUg&s",
    stock: 45,
  },
];

