import React from 'react'
import Recipe from './Recipe.js'
import {useState,setState,useEffect} from 'react'



const App = ()=> {

   const APP_ID = '824f17ee'
   const APP_KEY = '012a1444dfad377ba47b619b6f277b9e'
    
   const [recipes, setRecipes] = useState([]);
   const [search, setSearch] = useState('');
   const [query, setQuery] = useState('chicken');
    

    useEffect(()=>{
        getRecipes()
    }, [query]);

    

    const getRecipes = async () =>{
    const  response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
     const data = await response.json();
     setRecipes(data.hits);
     console.log(data.hits);

   }
const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    
    setQuery(search);
    setSearch('');
  };

return(
    <div className="App">
        <form onSubmit={getSearch} className="search-form">
            <input className="search-bar"  onChange={updateSearch} type="text" value ={search}/>
            <button  className="search-button" type="submit">
               search
            </button>
        </form>
        {recipes.map(recipe =>(
            <Recipe
            key = {recipe.recipe.label}
            title = {recipe.recipe.label}
            calories = {recipe.recipe.calories}
            image = {recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}

            />
        ))}
      <div> </div>
    </div>
);
};

export default App;