import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Authhentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";
import ProductAddPage from "./components/productAdd";
import MainSellerDash from "./components/sellerDashboard/main";
import SettingsSeller from "./components/sellerDashboard/settings";
import SellerDashboardPrivateRoute from "./route/DashboardRoute";
import Products from "./components/sellerDashboard/products";
import ProductUpdatePage from "./components/sellerDashboard/UpdateProduct";
import ChatInterface from "./components/sellerDashboard/chat";
import ProductDetails from "./components/productDetail";
import PrivateRoute from "./route/privateRoute";
import Account from "./pages/Account";
import CartComp from "./components/Account/cartComp";
import ChatUser from "./components/Account/chatUser";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/searchPage";

import AllProductPage from "./pages/AllProductPage";
import CategoryProductsPage from "./pages/categoryProductPage";
import WishlistComp from "./components/Account/wishList";
import { Toaster } from "react-hot-toast";
import Order from "./components/Account/order";
import SellerManageOrder from "./components/sellerDashboard/sellerManageOrder";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/auth" element={<Authhentication />}></Route>
        <Route path="/categories" element={<CategoryPage />}></Route>
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Account>
                <CartComp />
              </Account>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/account/wishlist"
          element={
            <PrivateRoute>
              <Account>
                <WishlistComp />
              </Account>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/account/track"
          element={
            <PrivateRoute>
              <Account>
                <Order />
              </Account>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/account/chat"
          element={
            <PrivateRoute>
              <Account>
                <ChatUser />
              </Account>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/account/settings"
          element={
            <PrivateRoute>
              <Account>
                <SettingsSeller />
              </Account>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/product/details/:id"
          element={
            <PrivateRoute>
              <ProductDetails />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <SellerDashboardPrivateRoute>
              <Dashboard>
                <MainSellerDash />
              </Dashboard>
            </SellerDashboardPrivateRoute>
          }
        ></Route>
        <Route path="/all/products" element={<AllProductPage />}></Route>{" "}
        <Route
          path="/categories/products/:query"
          element={<CategoryProductsPage />}
        ></Route>{" "}
        <Route
          path="/all/products/search"
          element={
            <PrivateRoute>
              <SearchPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/dashboard/manage/orders"
          element={
            <SellerDashboardPrivateRoute>
              <Dashboard>
                <SellerManageOrder />
              </Dashboard>
            </SellerDashboardPrivateRoute>
          }
        ></Route>
        <Route
          path="/dashboard/product/add"
          element={
            <SellerDashboardPrivateRoute>
              <Dashboard>
                <ProductAddPage />
              </Dashboard>
            </SellerDashboardPrivateRoute>
          }
        ></Route>
        <Route
          path="/dashboard/update/product/:id"
          element={
            <SellerDashboardPrivateRoute>
              <Dashboard>
                <ProductUpdatePage />
              </Dashboard>
            </SellerDashboardPrivateRoute>
          }
        ></Route>
        <Route
          path="/dashboard/chat"
          element={
            <SellerDashboardPrivateRoute>
              <Dashboard>
                <ChatInterface />
              </Dashboard>
            </SellerDashboardPrivateRoute>
          }
        ></Route>
        <Route
          path="/dashboard/products"
          element={
            <SellerDashboardPrivateRoute>
              <Dashboard>
                <Products />
              </Dashboard>
            </SellerDashboardPrivateRoute>
          }
        ></Route>
        <Route
          path="/dashboard/settings"
          element={
            <SellerDashboardPrivateRoute>
              <Dashboard>
                <SettingsSeller />
              </Dashboard>
            </SellerDashboardPrivateRoute>
          }
        ></Route>
        <Route path="*" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
