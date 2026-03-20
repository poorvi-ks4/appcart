const applications=[];
for(let i=1; i<=25; i++){
    applications.push({
        name: `Application ${i}`,
        description: `Description for application ${i}`,
        image: "https://via.placeholder.com/150"
    });
}

function displayApplications(){
    const container=document.getElementById("application-container");
    container.innerHTML = ""; 
    applications.forEach(app=>{
        const card=document.createElement("div");
        card.className="application-card";
        card.innerHTML=`
            <img src="${app.image}" alt="${app.name}">
            <h3>${app.name}</h3>
            <p>${app.description}</p>
            <button class="add-to-cart-btn" onclick="addToCart('${app.name}')">Add to Cart</button>
        `;
        container.appendChild(card);
    });
}