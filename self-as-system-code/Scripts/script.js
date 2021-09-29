window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');


    //PARIS

        //paris_4

    let paris_hover_1 = document.querySelector('#paris_4');
    
    console.log(paris_hover_1)
    paris_hover_1.addEventListener("mouseover",respondMouseOver);
    paris_hover_1.addEventListener("mouseout", respondMouseOut);
    
    function respondMouseOver(event) {
        
        tooltip.style.top = event.clientY + 10 + 'px' ;
        tooltip.style.left = event.clientX + 10 + 'px';

        console.log("WORK?")
        tooltip.classList.add('show');
        const tooltipPara = tooltip.querySelector('#p');
        tooltipPara.innerText = "Social Interaction"
        console.log(event.clientX, event.clientY);
    }

    
    function respondMouseOut() {
        tooltip.classList.remove('show');
      }


});

