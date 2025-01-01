import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListUsersComponent from './components/user/listUsersComponent'
import LoginAdmin from './components/login/login'
import ListFoodsComponent from './components/food/listFoodsComponent'
import ListCategoriesComponent from './components/category/listCategoriesComponent'
import HomePage from './components/home/home'
import ListArticlesComponent from './components/article/listArticlesComponent'
import ListNutrientsComponent from './components/nutrient/listNutrientsComponent'
import DetailsFoodComponent from './components/food/detailsFoodComponent'
import FoodComponent from './components/food/foodComponent'
import ArticleComponent from './components/article/articleComponent'
import DetailsArticleComponent from './components/article/detailsArticleComponent'
import DetailsNutrientComponent from './components/nutrient/detailsNutrientComponent'
import NutrientComponent from './components/nutrient/nutrientComponent'
import CategoryComponent from './components/category/categoryComponent'
import ProfileAdmin from './components/admin/profile'
import ListExerciseComponent from './components/exercise/listExerciseComponent'
import ExerciseComponent from './components/exercise/exerciseComponent'

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element = { <LoginAdmin /> } />
            
            <Route path='/home' element = { <HomePage /> } />

            <Route path='/profile' element = { <ProfileAdmin /> } />

            <Route path='/users' element = { <ListUsersComponent /> } />

            <Route path='/foods' element = { <ListFoodsComponent /> } />

            <Route path='/foods/:foodId' element = { <DetailsFoodComponent /> } />

            <Route path='/food/:foodId' element = { <FoodComponent /> } />

            <Route path='/food' element = { <FoodComponent /> } />

            <Route path='/nutrients' element = { <ListNutrientsComponent /> } />

            <Route path='/nutrients/:nutrientId' element = { <DetailsNutrientComponent /> } />

            <Route path='/nutrient/:nutrientId' element = { <NutrientComponent /> } />

            <Route path='/nutrient' element = { <NutrientComponent /> } />

            <Route path='/categories' element = { <ListCategoriesComponent /> } />

            <Route path='/category/:categoryId' element = { <CategoryComponent /> } />

            <Route path='/category' element = { <CategoryComponent /> } />

            <Route path='/exercises' element = { <ListExerciseComponent /> } />

            <Route path='/exercise/:exerciseId' element = { <ExerciseComponent /> } />

            <Route path='/exercise' element = { <ExerciseComponent /> } />

            <Route path='/articles' element = { <ListArticlesComponent /> } />

            <Route path='/articles/:articleId' element = { <DetailsArticleComponent /> } />

            <Route path='/article/:articleId' element = { <ArticleComponent /> } />

            <Route path='/article' element = { <ArticleComponent /> } />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
