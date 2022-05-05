const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '626f8d03a7fc50c97d804663',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores magnam rerum sunt! Libero consequuntur minima minus tempore adipisci! Iusto odio et nulla quisquam aliquid adipisci dolore excepturi distinctio quo aspernatur.',
            price: Math.floor(Math.random() * 100) + 10,
            geometry: {
                 type: "Point", 
                 coordinates: [
                     cities[random1000].longitude,
                     cities[random1000].latitude
                 ]
                },
            images: [
                {
                    url: 'https://res.cloudinary.com/dx81jzgye/image/upload/v1651616699/YelpCamp/1425800_N88-1_tgrnfj.jpg',
                    filename: 'YelpCamp/1425800_N88-1_tgrnfj.jpg'
                },
                {
                    url: 'https://res.cloudinary.com/dx81jzgye/image/upload/v1651616699/YelpCamp/ucsd-mesa-nueva-student-housing-16x9-1_pxlxgh.jpg',
                    filename: 'YelpCamp/ucsd-mesa-nueva-student-housing-16x9-1_pxlxgh.jpg'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})