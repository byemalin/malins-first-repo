//DOM CONTENT LOAD
window.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM fully loaded and parsed');

//GDP Data loading
let GDPData= await d3.csv("Assets/data/GDPwithCC.csv", (d)=>{
    return d
})

//Filtering out the GDP data without 2 digit codes:

GDPDataFiltered = GDPData.filter(
    d => d.code2Digits !== ""
)


// //Creating the list of billionaires add adding interactivity to list of names:

    //Forbes NAMES Dataloading

    // Taking only the most recent value for each person


async function mostrecent(){
    return await d3.json("Assets/data/ForbesbyName.json", (d)=>{
        return d})
}

let ForbesByName = await mostrecent()



    let people = ForbesByName.map((d) => {
        return d[0];
      })


var list = document.getElementById('BillList');

// sizescale= d3.scaleLinear().domain([4400000,23266768927430]).range([0, 500])
sizescale= d3.scaleLinear().domain([0, 1000000000,200000000000, 24000000000000]).range([0, 2, 500, 2000])

// 1 billion to 20 trillion = 20000000000000






ForbesByName.map(d=> {
    var Billname = d[0]
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(Billname));
    list.appendChild(entry);


    entry.addEventListener("click", respondClick);
    entry.addEventListener("mouseover", respondMouseOver);
    entry.addEventListener("mouseout", respondMouseOut);

    async function respondClick(event) {
        // document.documentElement.style.setProperty("--c-size", DataForZambia[0]["TotalGDP"])
        var NET = d[1][0]["net_worth"] * 1000000000
        document.documentElement.style.setProperty("--bill-size", sizescale(NET) + "px")

        graphingdata = []
        graphyears=[]

         d[1].map(y => {
              // console.log("y", y["net_worth"])
              graphingdata.push(
               y["net_worth"]
          )
          graphyears.push(y["year"])
         })

        console.log(d[0], graphingdata)

        

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

})





        

// const CHART = document.getElementById("lineChart")

// let lineChart = new Chart(CHART,{
//     type: 'line',
//     data: {
//         labels: ["2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"],
//         datasets: [{
//           label: 'Net Worth ($)',
//           data: [0, 10, 5, 2, 20, 30, 45],
//           fill: false,
//           borderColor: 'red',
//           tension: 0.1,
//           backgroundColor: "rgba(75,72,192,0.4)"
//         }]
//       }
// });
    


// Adding heatmap and hover opacity function


// defining colorscale for heatmap

colorscale= d3.scaleLog().domain([200, 1200, 45000, 100000]).range(["#F45866", "#301d0f", "hsl(25, 100%, 93%)", "#9d00ff"])

//defining size scale for circles






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
        // document.documentElement.style.setProperty("--c-size", DataForZambia[0]["TotalGDP"])
        


        document.documentElement.style.setProperty("--country-size", sizescale(d.TotalGDP) + 'px')


        //Experimenting with adding another circle
        // document.documentElement.style.setProperty("--pc-size", sizescale(d.TotalGDP*0.7) + 'px')
    }

    if(countrySVG){
        countrySVG.style.fill = colorscale(d.Value)

        //adding hover

        countrySVG.addEventListener("mouseover", respondMouseOver);
        countrySVG.addEventListener("mouseout", respondMouseOut);
        countrySVG.addEventListener("click", respondClick);
    }else{
        
    }
})









//  




//Attempting d3zoom

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






//Workin on the graph with chart js

//Also adding forbes data


console.log("F", ForbesByName)


ForbesByName.map(d=> {
    
// console.log("d", d)
// ledayta = []

//     d[1].map(y => {
//         // console.log("y", y["net_worth"])
//         ledayta.push(
//             y["net_worth"]
//         )
//     })

//     console.log(d[0], ledayta)

})
















//Adding the hover to the key:

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