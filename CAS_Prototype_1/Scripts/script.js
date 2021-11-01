//DOM CONTENT LOAD
window.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM fully loaded and parsed');

//Experimenting with making hover change color

let zambia = document.querySelector('#ZM')

console.log(zambia)
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


//Filtering to get data of one country (Zambia)

DataForZambia = GDPData.filter(
    (d) => d.Country == "Zambia"
  )
  console.log(DataForZambia)

  console.log(DataForZambia[0]["TotalGDP"])

});

//Making the size of circle = Zambia total GDP


function respondClick(event) {
    // document.documentElement.style.setProperty("--c-size", DataForZambia[0]["TotalGDP"])
    document.documentElement.style.setProperty("--c-size", '300px')
}