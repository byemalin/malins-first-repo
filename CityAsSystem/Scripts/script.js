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


    entry.addEventListener("click", respondClick);
    entry.addEventListener("mouseover", respondMouseOver);
    entry.addEventListener("mouseout", respondMouseOut);

    function respondClick(event) {
        // document.documentElement.style.setProperty("--c-size", DataForZambia[0]["TotalGDP"])
        document.documentElement.style.setProperty("--bill-size", '200px')
    }
    function respondMouseOver(event) {
        entry.style.background = "green"
        entry.style.padding = "18px"
    
    }
    
    function respondMouseOut() {
        entry.style.background = "lightgrey"
        entry.style.padding = "15px"
       
    }


})
      

    


// Adding heatmap and hover opacity function


// defining colorscale for heatmap
colorscale= d3.scaleLog().domain([737, 125000]).range(["rgb(47, 0, 0)", "red"])

//defining size scale for circles

sizescale= d3.scaleLinear().domain([4400000,23266768927430]).range([0, 500])

GDPDataFiltered.map(d => {

    let countrySVG = document.querySelector('#' + d.code2Digits)

    console.log(document.querySelector('#AR'))

    function respondMouseOver(event) {
        countrySVG.style.opacity = "50%"
    
    }
    
    function respondMouseOut() {
        countrySVG.style.opacity = "100%"

       
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
    d3.select('#svgzoom')
      .attr('transform', e.transform);
  }
  
  let zoom = d3.zoom()
    .on('zoom', handleZoom)

    .scaleExtent([1, 2])
    .translateExtent([[0,0], [8000,8000]]);

    //lookup translate extent

  
  d3.select('#theMapSVG')
    .call(zoom);


}); //Close DOM