const mongoose = require('mongoose');
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers')
const Campground=require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
      
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random()*array.length)];


const seedDB = async () => {
   await Campground.deleteMany({});
   for(let i=0; i < 50; i++) {
       const random1000 = Math.floor(Math.random() * 1000);
       const price = Math.floor(Math.random()* 20)+10
       const camp= new Campground({ 
        author: '62838991d68a9f37834171ae',
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum nesciunt quisquam ex repellat, numquam ullam minus necessitatibus sint est! Dignissimos voluptate sapiente nesciunt corrupti dolorem assumenda magni officia fuga eos.',
        price,
        images: [
            {
              url: 'https://res.cloudinary.com/dzprc6uwu/image/upload/v1654167555/YelpCamp/jce6bqwinjlvq6o6z81p.jpg',
              filename: 'YelpCamp/jce6bqwinjlvq6o6z81p',
            },
            {
              url: 'https://res.cloudinary.com/dzprc6uwu/image/upload/v1654167554/YelpCamp/wm3epjb32pey7qmrfzhk.jpg',
              filename: 'YelpCamp/wm3epjb32pey7qmrfzhk',
            }
          ],
    })
    await camp.save()
   }
}

seedDB().then(() => {
    mongoose.connection.close();
})