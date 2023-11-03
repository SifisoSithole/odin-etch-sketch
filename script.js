let menuToggle = document.querySelector('.menu-toggle');
let controls = document.querySelector('.controls');
let range = document.querySelector('#grid-size');
let selectedSize = 16;

range.addEventListener('change', () => {
    let sizes = document.querySelectorAll('.size');
    selectedSize = range.value;

    sizes[0].innerHTML = selectedSize;
    sizes[1].innerHTML = selectedSize;
})

controls.style.display = 'none';

menuToggle.addEventListener('click', () => {    
    if (controls.style.display === 'none'){
        controls.style.display = 'flex';
    } else {
        controls.style.display = 'none';
    }
})