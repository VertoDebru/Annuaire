const urlApi = "http://127.0.0.1:8080/api/contacts";
const mainTag = document.getElementsByTagName('main')[0];

initPage();

// Initialisation de la page.
function initPage() {
    // Insertion du champs recherche.
    let myInputSearch = document.createElement("input");
    myInputSearch.setAttribute("type", "text");
    myInputSearch.setAttribute("id", "Search");
    myInputSearch.setAttribute("name", "search");
    myInputSearch.setAttribute("aria-label", "search");
    myInputSearch.setAttribute("placeholder", "Nom / N° de téléphone");
    myInputSearch.setAttribute("onkeyup", "onChange(this)");
    mainTag.appendChild(myInputSearch);

    // Inserion du Div du resultat.
    let myResult = document.createElement("div");
    myResult.setAttribute("id", "Result");
    mainTag.appendChild(myResult);
    
    // Inserion du bouton pour ajouter un contact.
    let myAdd = document.createElement("button");
    myAdd.addEventListener("click", function() {
        setAddContact();
    })
    myAdd.innerHTML = "Ajouter un contact";
    mainTag.appendChild(myAdd);
}

// Affichage du résultat de la recherche.
function onChange(event) {
    let mySearch = checkSearch(event.value);
    let myResult = document.getElementById("Result");
    myResult.removeAttribute("style");

    if(mySearch) {
        fetch(urlApi+'?search='+mySearch)
        .then((res) => {
            if (res.ok && res.status === 200) return res.json();
            else return;
        }).then((data) => {
            // Affichage des résultats.
            myResult.setAttribute("style", "display:block");
            myResult.innerHTML = "Recherche en cours...";
            if (data) {
                data.forEach((contact, index) => {
                    if(index === 0) myResult.innerHTML = `<button onclick='viewCard("${contact._id}")'>${contact.name}</button>`;
                    else  myResult.innerHTML += `<button onclick='viewCard("${contact._id}")'>${contact.name}</button>`;
                });
            }
            // Aucun résultat
            else myResult.innerHTML = "Aucun résultat!";
        })
        .catch((err) => { console.error(err) });
    }
    else event.value = "";
}

// Insertion du nouveau contact.
function addContact() {
    let data = {
        "name": `${document.getElementById("name").value}`,
        "phone": `${document.getElementById("phone").value}`
    };
    // Post request.
    fetch(urlApi, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res) => {
        if(res.status === 201) return console.log('OK');
        else return console.error('Error Add Job!');
    });
}

// Affiche la carte de visite.
function viewCard(id) {
    let myCard = document.createElement("div");
    myCard.setAttribute("id", "Card");

    fetch(urlApi+'?id='+id)
    .then((res) => {
        if (res.ok && res.status === 200) return res.json();
    }).then((data) => {
        // Affichage des résultats.
        myCard.innerHTML = `<h2>${data.name}</h2><p><i class='bx bxs-phone'></i> ${data.phone}</p>`;
        myCard.addEventListener("click", function() {
            myCard.remove();
        })
        mainTag.appendChild(myCard);
    })
    .catch((err) => { console.error(err) });
}

// Affiche le formulaire d'ajout de contact.
function setAddContact() {
    // Formulaire
    let myForm = document.createElement("form");
    myForm.id = "AddContact";
    myForm.setAttribute("onSubmit", "addContact()");

    // Label Name
    let myLabelName = document.createElement("label");
    myLabelName.setAttribute("htmlFor", "name");
    myLabelName.innerText = "Nom";
    // Input Name
    let myInputName = document.createElement("input");
    myInputName.setAttribute("id", "name");
    myInputName.setAttribute("aria-label", "name");
    myInputName.setAttribute("placeholder", "Nom");

    // Label Phone
    let myLabelPhone = document.createElement("label");
    myLabelPhone.setAttribute("htmlFor", "phone");
    myLabelPhone.innerText = "N° de téléphone";
    // Input Phone
    let myInputPhone = document.createElement("input");
    myInputPhone.setAttribute("id", "phone");
    myInputPhone.setAttribute("aria-label", "phone");
    myInputPhone.setAttribute("placeholder", "N° de téléphone");

    // Button Add
    let myAddButton = document.createElement("button");
    myAddButton.setAttribute("aria-label", "addContact");
    myAddButton.setAttribute("type", "submit");
    myAddButton.innerText = "Ajouter le contact";
    // Button Cancel
    let myCancelButton = document.createElement("button");
    myCancelButton.setAttribute("aria-label", "cancel");
    myCancelButton.setAttribute("type", "cancel");
    myCancelButton.innerText = "Annuler";
    myCancelButton.addEventListener("click", function() {
        myForm.remove();
    });

    myForm.appendChild(myLabelName);
    myForm.appendChild(myInputName);
    myForm.appendChild(myLabelPhone);
    myForm.appendChild(myInputPhone);
    myForm.appendChild(myAddButton);
    myForm.appendChild(myCancelButton);
    mainTag.appendChild(myForm);
}

// Verifie la valeur de la recherche.
function checkSearch(value) {
    let test = value.match(/[a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ]/g);

    //console.warn(value.substring(0, value.length-1));
    if(test) return value;
    else return null;
}
