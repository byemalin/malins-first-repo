//DOM CONTENT LOAD
window.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM fully loaded and parsed');


let GDPData= await d3.csv("Assets/data/GDPwithCC.csv", (d)=>{
    return d
})

//Filtering out the GDP data without 2 digit codes:

GDPDataFiltered = GDPData.filter(
    d => d.code2Digits !== ""
)

console.log(GDPDataFiltered)




// //Creating the list of billionaires:

async function summarisenames(){
    return await d3.csv("Assets/data/ForbesByName.csv", (d)=>{
        return d})
    
}


let ForbesByName = await summarisenames()

    let people = ForbesByName.map((d) => {
        return d[0];
      })

var list = document.getElementById('BillList');

people.map(d=> {
    var Billname = d
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(Billname));
    list.appendChild(entry);
})
      

    

//Filtering to get data of one country (Zambia)

DataForZambia = GDPData.filter(
    (d) => d.Country == "Zambia"
)


//Making the size of circle = Zambia total GDP






// Adding heatmap and hover opacity function


// defining colorscale for heatmap
colorscale= d3.scaleLog().domain([737, 125000]).range(["black", "red"])

//defining size scale for circles

sizescale= d3.scaleLinear().domain([4400000,23266768927430]).range([0, 500])




GDPDataFiltered.map(d => {

  

    let countrySVG = document.querySelector('#' + d.code2Digits)

    function respondMouseOver(event) {
        countrySVG.style.opacity = "50%"

        console.log ("GDP =", d.TotalGDP)
        console.log("SIZE", sizescale(d.TotalGDP))
        document.documentElement.style.setProperty("--country-size", sizescale(d.TotalGDP) + 'px')
    
    }
    
    function respondMouseOut() {
        countrySVG.style.opacity = "100%"

        countrySVG.style.opacity
       
    }
    function respondClick(event) {
        // document.documentElement.style.setProperty("--c-size", DataForZambia[0]["TotalGDP"])
        document.documentElement.style.setProperty("--country-size", sizescale(d.TotalGDP) + 'px')
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





//Attempting d3zoom

function handleZoom(e) {
    d3.select('svg')
      .attr('transform', e.transform);
  }
  
  let zoom = d3.zoom()
    .on('zoom', handleZoom);
    // .scaleExtent([1, 5]);

  
  d3.select('#map')
    .call(zoom);


}); //Close DOM