window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');


    let loc_1 = document.querySelector('#location-1');
    
    console.log(loc_1)
    loc_1.addEventListener("mouseover",respondMouseOver);
    loc_1.addEventListener("mouseout", respondMouseOut);
    
    function respondMouseOver(event) {
        
        tooltip.style.top = event.clientY + 10 + 'px' ;
        tooltip.style.left = event.clientX + 10 + 'px';

        console.log("WORK?")
        tooltip.classList.add('show');
        const tooltipPara = tooltip.querySelector('p');
        tooltipPara.innerText = "cycle to meet antonio"
        console.log(event.clientX, event.clientY);

    
    }
    function respondMouseOut() {
        tooltip.classList.remove('show');
      }
      
});

