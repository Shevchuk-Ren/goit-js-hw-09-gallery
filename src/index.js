import './sass/main.scss';
import galleryItems from "./js/fotogallery";

const galleryList = document.querySelector('.js-gallery');
const modalEl = document.querySelector('.js-lightbox');
const overlayElm = document.querySelector('.lightbox__overlay');
const modalCurrantImg = document.querySelector('.lightbox__image');
const modalCloseBtn = document.querySelector('button[data-action="close-lightbox"]');
let currentIndex = 0;

const maxlenght = galleryItems.length;
// console.log(maxlenght)


const markup = createGalleryMarkup(galleryItems);


galleryList.insertAdjacentHTML('afterbegin', markup);

function createGalleryMarkup(galleryItems) { 
  
  return galleryItems.map(({ preview, original, description }, index) => {
    return `
     <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-num="${index}"
      alt="${description}"
    />
  </a>
</li>
      `;
  }).join('');
  
}

galleryList.addEventListener('click', onClickOnImgGallery);


function onClickOnImgGallery(evt) {
  evt.preventDefault();
  
  // console.log(evt.target);
  
  
  if (!evt.target.classList.contains("gallery__image")) {
    
    return;
    
  } else {
    modalEl.classList.add('is-open');
    modalCurrantImg.src = evt.target.dataset.source;
    modalCurrantImg.alt = evt.target.alt;
    currentIndex = evt.target.dataset.num;
    // console.log(currentIndex)
    
    modalEl.addEventListener('click', onClickClosedModal);


    window.addEventListener("keydown", keyHendler)

    
  }

}

function keyHendler(evt) {
  const key = evt.code;
  // console.log(key)
    switch (key) {
        case "Escape": onPressKeyToClose();
            break;
        case "ArrowRight": onArrowRight();
            break;
        case "ArrowLeft": onArrowLeft();
            break;

    }
}


function onArrowRight() {

const arriveElementes = document.querySelectorAll('.gallery__image');

    if (Number(currentIndex) + 1 > arriveElementes.length - 1) {
      currentIndex = 0;
      
    } else {
        currentIndex++
    }
    modalCurrantImg.src = galleryItems[currentIndex].original;
    modalCurrantImg.alt = galleryItems[currentIndex].description;
}


function onArrowLeft() {
    if (currentIndex - 1 < 0) {
        currentIndex = galleryItems.length - 1;
    } else {
        currentIndex--
    }
    modalCurrantImg.src = galleryItems[currentIndex].original;
    modalCurrantImg.alt = galleryItems[currentIndex].description;
}

function onPressKeyToClose() {
   
     modalEl.classList.remove('is-open');
     modalCurrantImg.src = '';
     modalCurrantImg.alt = '';
     console.log(modalCurrantImg);
   

}

  
 function onClickClosedModal(evt) {
   if (evt.target.tagName !== 'IMG') {
   
    modalEl.classList.remove('is-open');
    modalCurrantImg.src = '';
    modalCurrantImg.alt = '';
  
}
}