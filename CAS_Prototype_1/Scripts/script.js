//DOM CONTENT LOAD
window.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM fully loaded and parsed');

    console.log("look")

//Experimenting with making hover change color

let zambia = document.querySelector('#ZM')

zambia.addEventListener("mouseover", respondMouseOver);
zambia.addEventListener("mouseout", respondMouseOut);
zambia.addEventListener("click", respondClick);

function respondMouseOver(event) {
    ZM.classList.add("OJ")

}

function respondMouseOut() {
    ZM.classList.remove("OJ")
}

//Loading Data
let GDPData= await d3.csv("Assets/data/PopulationandGDP.csv", (d)=>{
    return d
})

let ForbesByName = await d3.csv("Assets/data/ForbesByName.csv", (d)=>{
    return d
})


console.log('Forbes', ForbesByName)



//Creating the list of billionaires:
async function getpeople(
people = ForbesbyName.map((d) => {
    return d[0];
  })
)




//Filtering to get data of one country (Zambia)

DataForZambia = GDPData.filter(
    (d) => d.Country == "Zambia"
)
//Making the size of circle = Zambia total GDP


function respondClick(event) {
    // document.documentElement.style.setProperty("--c-size", DataForZambia[0]["TotalGDP"])
    document.documentElement.style.setProperty("--c-size", '300px')
}



// Adding heatmap 

// colorscale= d3.scaleLog().domain([0, 28643892530.221188, 23266768927425.203]).range(["black", "grey", "red"])


// GDPData.map(d => {

//     CountryCode = d.Code

//     var ShortCode = CountryCode.substring(0, 2); 

    


//     let countrySVG = document.querySelector('#' + ShortCode)


//     if(countrySVG){
//         countrySVG.style.fill = colorscale(d.TotalGDP)
//     }else{
//         console.log('Hi')
//     }
// })





}); //Close DOM