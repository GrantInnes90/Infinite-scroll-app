
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

//let as data will change throughout process
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray =[];
// const count = 10;
// const apiKey = '27M1zmW-Ep9OxyNIpxKlkPWwmyIXoMmuGS8vlSoPfJY'
//jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek
const apiUrl = 'https://api.unsplash.com/photos/random?client_id=27M1zmW-Ep9OxyNIpxKlkPWwmyIXoMmuGS8vlSoPfJY&count=15';
/// check if all images loaded
function imageLoaded(){
    //increases images loaded count by 1
    imagesLoaded ++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true
        console.log('ready =', ready)
    }
};
// helper function for set atttributes on DOM elements
function setAttributes(element, atttributes){
    for (const key in atttributes){
        element.setAttribute(key, atttributes[key]);
    }
}
//create elements for add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    //sets total images value
    totalImages = photosArray.length;
    //console.log('total images', totalImages);
    //run function for each object in photo array
    photosArray.forEach((photo)=> {
        //create <a> to link to unsplash
        const item = document.createElement('a');

        setAttributes(item,{
            href: photo.links.html,
            target: '_blank'
        });
        //create img for photo
        const img = document.createElement('img');

        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        img.addEventListener('load', imageLoaded);

        //put img inside <a> then inside <img> container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
// Get photos
async function getPhotos(){
    {
        const response = await fetch(apiUrl);
        photosArray  = await response.json();
        //console.log(photosArray)
        displayPhotos();
    } 
}
// check to see if near bottom of the page & load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});
// on load
getPhotos();