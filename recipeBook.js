


//local Storage
let storageArray = [];
let storageObject;
let storageChecked = [];
let ingredientArray = [];
let ingredientArrayChecked = [];




//general
let i = 0;
//open new page class
class NewPage{
    createback(){
        let back = document.getElementById('back');
        back.innerHTML = `
        <button type="button" class="btn m-2 btn-danger fw-bold ">Back</button>
        `;
        back.parentElement.classList.add('pt-5');
    }
    createSubNav(){
        let subNavbar = document.getElementById('subNavbar');
        subNavbar.innerHTML = `
        <div class='container'>
        <div class="fs-2 py-1 fw-bolder text-light">Add Recipe</div>
        <button type="button" class="btn m-2 btn-danger fw-bold invisible" onclick='deleteRecipeFun()' id='deetRecipeButton'>Delete Recipe</button>
        </div>
        `;
    }
    createMenu(){
        let newMenu = document.getElementById('newMenu');
        newMenu.classList.remove('invisible');
        let oldMenu = document.getElementById('oldMenu');
        oldMenu.classList.add('invisible');
    }
}



//open old page class
class OldPage{
    createMainback(){
        let back = document.getElementById('back');
        back.innerHTML = ``;
        back.parentElement.classList.remove('pt-5');
    }
    createMainSubNav(){
        let subNavbar = document.getElementById('subNavbar');
        subNavbar.innerHTML = `
        <div class="container pt-1 pb-3">
          <form class="d-flex">
            <input class="form-control me-2 jsearch" type="search" placeholder="Search" aria-label="Search">
          </form>
        </div>
        `;
    }
    createMainMenu(){
        let newMenu = document.getElementById('newMenu');
        newMenu.classList.add('invisible');
        let oldMenu = document.getElementById('oldMenu');
        oldMenu.classList.remove('invisible');
    }
}


// save and display saved thingd class
class Display{
    constructor(displayDish,displayProcess,displayIngredient,displayChecked){
        this.displayDish = displayDish;
        this.displayProcess = displayProcess;
        this.displayIngredient = displayIngredient;
        this.displayChecked = displayChecked
    }

    displayOnMain(index){

        let condition;
        condition = 0;
        this.displayChecked.forEach(function(element){
            condition += element;
        });
        let conditionResult;
        if(condition == this.displayChecked.length){
            conditionResult = 'All';
        }
        else if(condition == 0){
            conditionResult = 'None';
        }
        else{
            conditionResult = 'Some';
        }
        conditionResult = conditionResult.fontcolor('white');
        let newContent = document.getElementById('newContent');
        let html = `<div id='${index}box'>
        <div class="jsearchcontainer w-75 my-1 mt-4 border-2  border-secondary" onclick='displayNewFun(${index})'>
            <button type="button" id='createdMainButton${index}' class=" btn btn-secondary btn-lg fw-bolder bg-transparent jsearch border-0">${this.displayDish}</button>
        </div>
        <div class="fs-4 pb-2 fw-bolder mb-2 violetText">You have ${conditionResult} of the Ingredients</div>
        </div>
        `
        newContent.innerHTML += html;
        let oldMenuHeading = document.getElementById('oldMenuHeading');
        oldMenuHeading.classList.add('invisible');

    }

    displayOnNew(updateIndex){
        addRecipeFun();
        let dishName = document.getElementById('dishName');
        let dishProcess = document.getElementById('dishProcess');
        dishName.value = this.displayDish;
        dishProcess.value = this.displayProcess;

        
        this.displayIngredient.forEach(function(element){
            addIngredientInput.value = element;
            addIngredientFun();
        });
        
        let x;
        x = [];
        this.displayChecked.forEach(function(element){
            if(element == 1){
                x.push(1);
            }
            else{
                x.push(0);
            }
        });

        
        ingredientChecked = document.getElementsByClassName('ingredientContainerClass');
        Array.from(ingredientChecked).forEach(function(element,index){
            
            if(x[index] == 1){
                element.children[0].setAttribute('checked','');
            }
            else{
                element.children[0].removeAttribute('checked');
            }
        });

        let addNewRecipe = document.getElementById('addNewRecipe');
        addNewRecipe.classList.add('invisible');
        let updateNewRecipe = document.getElementById('updateNewRecipe');
        updateNewRecipe.classList.remove('invisible');
        updateNewRecipe.setAttribute('onclick',`updateNewRecipeFun(${updateIndex})`)

    }

    updateOnNew(i){
        
    let dishName = document.getElementById('dishName');
    let dishProcess = document.getElementById('dishProcess');
    ingredientChecked = document.getElementsByClassName('ingredientContainerClass');
    ingredientArrayChecked = [];

    if(dishName.value.length > 0 && ingredientChecked.length > 0){

        Array.from(ingredientChecked).forEach(function(element){
            if(element.children[0].checked){
                ingredientArrayChecked.push(1);
            }
            else{
                ingredientArrayChecked.push(0);
            }
        });
        ingredientChecked = '';
        storageObject = {
            storageDish : dishName.value,
            storageProcess: dishProcess.value,
            storageIngredient: ingredientArray,
            storageChecked: ingredientArrayChecked
        }
        storageArray[i] = storageObject;
        localStorage.setItem('recipe',JSON.stringify(storageArray));
        newMenu.reset();
        ingredientArray = [];
        backToMainFun();
    }
    else{
        let alertDisplay = new Display();
        alertDisplay.alert('it is mandatory to fill the Recipe Name and Add minimum one Ingredient!')
    }
    }

    alert(message){
        let alertHTML = `<div class="alert alert-danger" role="alert">
        ${message};
      </div>`;
      let msg = document.getElementById('msg');
      msg.innerHTML = alertHTML;
      setTimeout(function(){
          msg.innerHTML = '';
      },3000);
    }
}

// open new page
function addRecipeFun(){ 
    let newpage = new NewPage();
    newpage.createback();
    newpage.createSubNav();
    newpage.createMenu();
}


// add ingredient
let ingredientChecked;

let addIngredient = document.getElementById('addIngredient');
addIngredient.addEventListener('click',addIngredientFun);
let addIngredientInput = document.getElementById('addIngredientInput');

function addIngredientFun(){
    let html = `
    <div class="input-group mb-2 border-0 ">
              <div class="input-group-text bg-transparent border-0 ingredientContainerClass">
                <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <div class="fs-4 mx-4 text-light">${addIngredientInput.value}</div>
                <button type="button" id='${i}' class="btn btn-danger" onclick='deletIngredientFun(this.id)'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg></button>
              </div>
    </div>
          `;
    if(addIngredientInput.value.length > 0){ 

        ingredientChecked = document.getElementsByClassName('ingredientContainerClass');

        Array.from(ingredientChecked).forEach(function(element){

            if(element.children[0].checked){
                element.children[0].setAttribute('checked','');
            }
            else{
                element.children[0].removeAttribute('checked');
            }
        });

            let addedIngredientContainer = document.getElementById('addedIngredientContainer');
            addedIngredientContainer.innerHTML += html;
            ingredientArray.push(addIngredientInput.value);
            addIngredientInput.value = '';
        
    }
    else{
        let alertDisplay = new Display();
        alertDisplay.alert('it is mandatory to fill the Ingredient name in the box before adding it!')
    }
}


// delete Ingredient
function deletIngredientFun(id){
    document.getElementById(id).parentNode.parentNode.innerHTML = '';
    ingredientArray.splice(id,1);
}



// add new reciep
let newMenu = document.getElementById('newMenu');
newMenu.addEventListener('submit',addNewRecipeFun);

function addNewRecipeFun(x){

    let dishName = document.getElementById('dishName');
    let dishProcess = document.getElementById('dishProcess');
    ingredientChecked = document.getElementsByClassName('ingredientContainerClass');
    ingredientArrayChecked = [];

    if(dishName.value.length > 0 && ingredientChecked.length > 0){

        Array.from(ingredientChecked).forEach(function(element){
            if(element.children[0].checked){
                ingredientArrayChecked.push(1);
            }
            else{
                ingredientArrayChecked.push(0);
            }
        });
        ingredientChecked = '';
        storageObject = {
            storageDish : dishName.value,
            storageProcess: dishProcess.value,
            storageIngredient: ingredientArray,
            storageChecked: ingredientArrayChecked
        }
        storageArray.push(storageObject);
        localStorage.setItem('recipe',JSON.stringify(storageArray));
        newMenu.reset();
        ingredientArray = [];
        backToMainFun();
    }
    else{
        let alertDisplay = new Display();
        alertDisplay.alert('it is mandatory to fill the Recipe Name and Add minimum one Ingredient!')
    }

    x.preventDefault();
}


// open old page
let back = document.getElementById('back');
back.addEventListener('click',backToMainFun);

function backToMainFun(){

    addedIngredientContainer.innerHTML = '';
    ingredientArray = [];

    
    let deetRecipeButton = document.getElementById('deetRecipeButton');
    deetRecipeButton.classList.add('invisible');
    
    let addNewRecipe = document.getElementById('addNewRecipe');
    addNewRecipe.classList.remove('invisible');
    let updateNewRecipe = document.getElementById('updateNewRecipe');
    updateNewRecipe.classList.add('invisible');

    let oldpage = new OldPage();
    oldpage.createMainback();
    oldpage.createMainSubNav();
    oldpage.createMainMenu()
    newMenu.reset();
    displayFun();

}



// display old age stored content
function displayFun(){
    let newContent = document.getElementById('newContent');
    let storedArray = JSON.parse(localStorage.getItem('recipe'));
    if(storedArray != null){
    storageArray = storedArray;
        newContent.innerHTML = '';
        storedArray.forEach(function(element,index){
            let display = new Display(element.storageDish,element.storageProcess,element.storageIngredient,element.storageChecked);
            display.displayOnMain(index);
        });
    }
    else{
        newContent.innerHTML = '';
        storageArray = [];
        
        let oldMenuHeading = document.getElementById('oldMenuHeading');
        oldMenuHeading.classList.remove('invisible');
    }
}


// display selected dish
function displayNewFun(index){
    let getLocalItem = storageArray[index];
    let newDisplay = new Display(getLocalItem.storageDish,getLocalItem.storageProcess,getLocalItem.storageIngredient,getLocalItem.storageChecked);
    newDisplay.displayOnNew(index);
    deleteRecipVar = index;
    
    let deetRecipeButton = document.getElementById('deetRecipeButton');
    deetRecipeButton.classList.remove('invisible');
}


//update Recipe

function updateNewRecipeFun(index){
    let getLocalItem = storageArray[index];
    let newDisplay = new Display(getLocalItem.storageDish,getLocalItem.storageProcess,getLocalItem.storageIngredient,getLocalItem.storageChecked);
    newDisplay.updateOnNew(index);
}

// delete Recipe
let deleteRecipVar = 0;
function deleteRecipeFun(){
    storageArray.splice(deleteRecipVar,1);
    localStorage.setItem('recipe',JSON.stringify(storageArray));
    backToMainFun();
    let storedArray = localStorage.getItem('recipe');
    if(storedArray == '[]'){
        let oldMenuHeading = document.getElementById('oldMenuHeading');
        oldMenuHeading.classList.remove('invisible');
    }
}


// search recipe
let searchRecipe = document.getElementById('searchRecipe');
searchRecipe.addEventListener('input',function(){
    
    storageArray.forEach(function(element,index){
        if(element.storageDish.toLowerCase().includes(searchRecipe.value.toLowerCase())){
            document.getElementById(index+'box').style.display = 'block';
        }
        else{
            document.getElementById(index+'box').style.display = 'none';
        }
    });
});

// default
displayFun();
