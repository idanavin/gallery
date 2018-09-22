//var images = ["https://scontent.fsdv3-1.fna.fbcdn.net/v/t1.0-9/1001233_222390834578427_319555050_n.jpg?_nc_cat=104&oh=88c349afa73876ad20cfd34c6b6fc6b8&oe=5C2DB41B", "https://scontent.fsdv3-1.fna.fbcdn.net/v/t1.0-9/1170845_222390877911756_1583226258_n.jpg?_nc_cat=107&oh=97e12f18f8636bc7c932d66781e4095e&oe=5C304A47",
//    "https://scontent.fsdv3-1.fna.fbcdn.net/v/t1.0-9/1005473_222390457911798_1227791846_n.jpg?_nc_cat=101&oh=093c379d5c5c5451ea022e5743300d84&oe=5C15E4C0", "https://scontent.fsdv3-1.fna.fbcdn.net/v/t1.0-9/1150992_222390417911802_1716521138_n.jpg?_nc_cat=104&oh=4d3858864dbb1ae09d63f1b6de38f078&oe=5C264095"];
var images = [];
//var extraImages = [];
var allImages = [];
var orderIndex = 0;
var mainImage;
var nextPic = 0;
var prevPic;


// NodeJS:
// var fs = require("fs");
// var text = fs.readFileSync("./txtImg.txt").toString('utf-8');
// var imgByLine = text.split("\n");


function change(sign) {
    switch (sign) {
        case 1:
            nextPic = (nextPic + 1) % images.length;
            prevPic = (prevPic + 1) % images.length;
            break;
        case -1:
            prevPic = (((prevPic - 1) % images.length) + images.length) % images.length;
            nextPic = (((nextPic - 1) % images.length) + images.length) % images.length;
        default:
            break;
    }
}

function add() {
    var imageUrl = document.getElementById('addUrl');
    if (!imageUrl.checkValidity()) {
        document.getElementById("addUrlCont").innerHTML = imageUrl.validationMessage;
    }
    else {
        images.push(imageUrl.value);
        var newBar = document.getElementById('images');
        var newImg = document.createElement('img');
        newImg.src = images[images.length - 1];
        newImg.classList.add('bar');
        newImg.style.height = '100px';
        newImg.style.width = 'auto';
        newImg.style.margin = '10px';
        newBar.appendChild(newImg);
        // newBar.addEventListener('click', function () { 
        //     var currentImage = this.src;
        //     var newPos = images.findIndex(function (src) { return currentImage === src; });
        //     if (newPos >= 0) {          
        //         var main = document.getElementById('middleIMG');
        //         main.src = this.src;
        //         nextPic = (newPos) % images.length;
        //         prevPic = (newPos - 1) % images.length;
        //     }
        //     else {
        //         console.log(newPos + ' error');
        //     }
        // });
    }
}

function disMainImg() {  
    var main = document.getElementById("main-img");
    var mainImage = document.createElement('img');
    mainImage.classList.add('main-img');
    mainImage.id = ('middleIMG');
    mainImage.src = images[0];
    main.appendChild(mainImage);
}

function disImg(index) {  //general function to load images bar
    var bar = document.getElementById('images');
    var barImage = document.createElement('img');
    barImage.src = images[(index + orderIndex) % images.length];
    barImage.classList.add('bar');
    barImage.style.height = '100px';
    barImage.style.width = 'auto';
    barImage.style.margin = '10px';
    bar.appendChild(barImage);
    barImage.addEventListener('click', function () { 
        var currentImage = barImage.src;
        var newPos = images.findIndex(function (src) { return currentImage === src; });
        if (newPos >= 0) {
            var main = document.getElementById('middleIMG');
            main.src = this.src;
            nextPic = (newPos) % images.length;
            prevPic = (newPos - 1) % images.length;
        }
        else {
            console.log(newPos + ' error');

        }
    });
}

window.onload = function () {

    // $(document).ready(function () {
    //     $('.bar').hover(function () { //hover not working
    //         $(this).animate({ height: '150px' }, 'slow');
    //         $('.bar').css('filter', 'blur(5px)');
    //         $(this).css('filter', 'blur(0px)');
    //         $(this).css('position', 'relative');
    //     }, function () {
    //         $('.bar').stop();
    //         $(this).animate({ height: '100px' }, 'slow');
    //         $('.bar').css('filter', 'blur(0px)');
    //         $(this).css('position', '');
    //     });
    //     $('.item5').mouseleave(function () { //perfect reset (no bugs)
    //         $('.bar').stop();
    //         $('.bar').animate({ height: '100px' }, 'slow');
    //         $('.bar').css('filter', 'blur(0px)');
    //     });
    // });

    $.get('assets/txtImg.txt', function (data) {
        var extraImages = data.split("\n");
        for (var index = 0; index < extraImages.length; index++) {
            images.push(extraImages[index]);
        }
        prevPic = images.length;
        disMainImg();
        for (var i = 0; i < images.length; i++) {
            disImg(i);
        }
    });

    var prev = document.getElementById('prev');
    var prevImg = document.createElement('img')
    prevImg.src = 'https://image.flaticon.com/icons/svg/60/60775.svg';
    prevImg.classList.add('prev');
    prevImg.style.width = '100px';
    prev.appendChild(prevImg);
    prev.addEventListener('click', function () {
        var main = document.getElementById('middleIMG');
        main.src = images[prevPic];
        change();
    })

    var next = document.getElementById('next');
    var nextImg = document.createElement('img');
    nextImg.src = 'https://image.flaticon.com/icons/svg/60/60775.svg';
    nextImg.classList.add('next');
    nextImg.style.width = '100px';
    next.appendChild(nextImg);
    next.addEventListener('click', function () {
        var main = document.getElementById('middleIMG');
        main.src = images[nextPic];
        change();
    });
}