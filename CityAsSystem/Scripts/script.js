//DOM CONTENT LOAD
window.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM fully loaded and parsed');
    

//                                                                  DATA LOADING

let GDPData= await d3.csv("Assets/data/GDPwithCC.csv", (d)=>{
    return d
})
//Filtering out the GDP data without 2 digit codes:

GDPDataFiltered = GDPData.filter(
    d => d.code2Digits !== ""
)


async function mostrecent(){
    return await d3.json("Assets/data/ForbesbyName.json", (d)=>{
        return d})
}

let ForbesByName = await mostrecent()



var list = document.getElementById('BillList');









//                                                           DEFINING SIZE SCALE

sizescale= d3.scaleLinear().domain([0, 1000000000,200000000000, 24000000000000]).range([0, 2, 500, 2000])










//                                             WORKING ON THE FORBES DATA (CLEANED IN OBSERVABLE)

ForbesByName.map(d=> {
    var Billname = d[0]
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(Billname));
    list.appendChild(entry);

    var circle = document.getElementById('billCircle');

    circle.addEventListener("mouseover", respondMouseOverCircle)
    circle.addEventListener("mouseout", respondMouseOutCircle)
    entry.addEventListener("click", respondClick);
    entry.addEventListener("mouseover", respondMouseOver);
    entry.addEventListener("mouseout", respondMouseOut);

    async function respondClick(event) {

        var NET = d[1][0]["net_worth"] * 1000000000
        document.documentElement.style.setProperty("--bill-size", sizescale(NET) + "px")

        graphingdata = []
        graphyears=[]

         d[1].map(y => {

              graphingdata.push(
               y["net_worth"]
          )
          graphyears.push(y["year"])
         })

        console.log(d[0], graphingdata)

//I THINK THT I NEED TP FIGURE OUT A WAY TO RESET THE CANVAS EVERYTIME AS A I GET AN ERROR THAT IT IS ALREADY IN USE.


        let CHART = document.getElementById("lineChart")
        
        let lineChart = new Chart(CHART,{
        type: 'line',
        data: {
        labels: graphyears.reverse(),
        datasets: [{
        label: 'Net Worth ($ Billions)',
        data: graphingdata.reverse(),
        fill: false,
        borderColor: '#673280',
        hoverBackgroundColor: "rgba(232,105,90,0.8)",
        hoverBorderColor: "orange",
        color: "pink",
        tension: 0.1,
        backgroundColor: "rgba(75,72,192,0.4)"
        }]
        },
        options: {
            plugins: {
                legend: {
                    display: false   
                 } } } 
                 
        });

    }

    function respondMouseOver(event) {
        entry.style.background = "#673280"
        entry.style.padding = "18px"
    
    }
    
    function respondMouseOut() {
        entry.style.background = "rgba(211, 211, 211, 0.294)"
        entry.style.padding = "15px"
       
    }


    function respondMouseOverCircle(event) {
        circle.style.opacity=0.8;

        BillCircletooltip.style.top = event.clientY + 10 + 'px' ;
        BillCircletooltip.style.left = event.clientX + 10 + 'px';
        BillCircletooltip.classList.add('show');
         const billname = BillCircletooltip.querySelector('#NamePopUp');
         billname.innerText = (d[0])
         const networth = BillCircletooltip.querySelector('#NetWorth');
         networth.innerText = ("Net Worth:", d[1][0]["net_worth"] + " Billion Dollars")
    }
    function respondMouseOutCircle() {
        circle.style.opacity=1;
        BillCircletooltip.classList.remove('show');
       
    }

})








//                                                      defining colorscale for heatmap

colorscale= d3.scaleLog().domain([200, 1200, 45000, 100000]).range(["#F45866", "#301d0f", "hsl(25, 100%, 93%)", "#9d00ff"])









//                                               Mapping Out GDP Data (CLEANED IN OBSERVABLE)

GDPDataFiltered.map(d => {

    let countrySVG = document.querySelector('#' + d.code2Digits)

    function respondMouseOver(event) {
        countrySVG.style.opacity = "50%"

        tooltip.style.top = event.clientY + 10 + 'px' ;
        tooltip.style.left = event.clientX + 10 + 'px';
         tooltip.classList.add('show');
         const countryname = tooltip.querySelector('#CountryNamePopUp');
         countryname.innerText = (d.Country)
         const population = tooltip.querySelector('#CountryPopulation');
         population.innerText = ("Population:" + d.population)
         const perCapita = tooltip.querySelector('#GDPPerCapita');
         perCapita.innerText = ("GDP per Capita:" + d.Value)
    }
    
    function respondMouseOut() {
        countrySVG.style.opacity = "100%"
        tooltip.classList.remove('show');      
    }
    
    function respondClick(event) {
     
        document.documentElement.style.setProperty("--country-size", sizescale(d.TotalGDP) + 'px')

    }

    if(countrySVG){
        countrySVG.style.fill = colorscale(d.Value)

        countrySVG.addEventListener("mouseover", respondMouseOver);
        countrySVG.addEventListener("mouseout", respondMouseOut);
        countrySVG.addEventListener("click", respondClick);
    }else{
        
    }
})















//                                                                     D3 ZOOM

function handleZoom(e) {
    d3.select('#svgzoom')
      .attr('transform', e.transform);
  }
  
  let zoom = d3.zoom()
    .on('zoom', handleZoom)

    .scaleExtent([1, 5])
    .translateExtent([[0,0], [8000,8000]]);
  
  d3.select('#theMapSVG')
    .call(zoom);













//                                                          Adding the hover to the key:

const info = document.getElementById("INFO")
const key = document.getElementById("KEY")

key.addEventListener("mouseover", respondMouseOver);
key.addEventListener("mouseout", respondMouseOut);


function respondMouseOver(event) {
     info.classList.add('show');
}
function respondMouseOut(event) {
    info.classList.remove('show');
}







}); //Close DOM