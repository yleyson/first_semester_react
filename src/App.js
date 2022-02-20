import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import ButtonAppBar from './components/AppBar';
import HomePage from './components/HomePage';
import Register from './components/Register';
import UserPage from './components/UserPage';
import NbaShop from './components/NbaShop';
import products_arr from './components/Products'
import ShopCart from './components/ShopCart';
import ProductsManger from './components/ProductsManger';
import EditProduct from './components/EditProduct';
import AddProduct from './AddProduct';
import Pay from './components/Pay';
import { useState, useEffect } from 'react';





function App() {

  if (sessionStorage.login_user === undefined)
    sessionStorage.login_user = JSON.stringify('')
  if (sessionStorage.cart === undefined)
    sessionStorage.cart = JSON.stringify([])


  let user_storage = JSON.parse(sessionStorage.login_user)
  let cart = JSON.parse(sessionStorage.cart)
  //אדמין מחובר או לא
  const [admin, setAdmin] = useState(user_storage === 'admin' ? true : false)
  //מתשמש מחובר או לא
  const [user, setUser] = useState(user_storage !== '' && user_storage !== 'admin' ? true : false)
  //כמות מוצרים בעגלה
  const [productAmount, setProductAmount] = useState()

  const AdminLog = (log) => {
    setAdmin(log)
  }

  const setUserLog = (log) => {
    setUser(log)
  }
  //פונקציית חישוב כמות מוצרים בעגלה
  const amountOfProducts = () => {
    let amount = 0
    if (cart !== [])
      JSON.parse(sessionStorage.cart).filter(product => {
        amount += product.amount
      })

    setProductAmount(amount)
  }

  useEffect(() => {
    amountOfProducts()
  }, [productAmount])

  useEffect(() => {
    if (user)
      return
    else if (!admin) {
      sessionStorage.login_user = JSON.stringify('')
    }
  }, [user])

  useEffect(() => {
    if (admin)
      sessionStorage.login_user = JSON.stringify('admin')
    else if (user)
      return
    else
      sessionStorage.login_user = JSON.stringify('')
  }, [admin])

  return (
    <div className="App">
      <ButtonAppBar user={user} setUserLog={setUserLog} productAmount={productAmount} admin={admin} setAdminLog={AdminLog} />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/ProductsManger" element={<ProductsManger admin={admin} />} />
        <Route path="/UserPage" element={<UserPage setUserLog={setUserLog} user={user} />} />
        <Route path="/ShopCart" element={<ShopCart productAmount={productAmount} amountOfProducts={amountOfProducts} />} />
        <Route path="/Shop" element={<NbaShop amountOfProducts={amountOfProducts} />} />
        <Route path="/EditProduct" element={<EditProduct admin={admin} />} />
        <Route path="/AddProduct" element={<AddProduct admin={admin} />} />
        <Route path="/Pay" element={<Pay amountOfProducts={amountOfProducts} />} />
      </Routes>
    </div>
  );
}

export default App;
