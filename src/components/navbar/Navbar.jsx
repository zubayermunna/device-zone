import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "./styles.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../../utils/firebase.init.js";
import { useUser } from "../../hooks/useUser";
import { useDispatch, useSelector } from "react-redux";
import { SearchQuery } from "../../global/redux/productAction";
import HamburgerMenu from "./hamburgerMenu";
import { useGetData } from "../../hooks/useFetch";
const auth = getAuth(app);

const Nav = styled.nav`
  padding: 0 20px;
  min-height: 70px;
  background: #1f1e1f;
  display: flex;
  z-index: 999999;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid gray;
`;

const Logo = styled.h1`
  font-size: 25px;
  color: white;
  z-index: 9;
  font-weight: 800;
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  li:nth-child(2) {
    margin: 0px 20px;
  }
  li:nth-child(3) {
    margin: 0px 20px;
  }
  li:nth-child(4) {
    margin: 0px 20px;
  }
  li:nth-child(5) {
    margin: 0px 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ItemLink = styled.a`
  color: white !important;
  text-decoration: none;
  font-weight: 600;
  z-index: -1;
  color: #f3f3f3;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
const SearchWrapper = styled.div`
  display: flex;
  align-item: center;
  z-index: 9;
  justify-content: center;
`;
const SearchField = styled.input`
  height: 40px;
  width: 100%;
  padding: 0 10px;
  border-radius: 5px;
  background-color: #f3f3f3;
  outline: none;
  z-index: 9;
  color: #000;
  border: none;
`;

const NavIcon = styled.button`
  background: none;
  cursor: pointer;
  z-index: 9;
  border: none;
  outline: none;

  @media (min-width: 769px) {
    display: none;
  }
`;

const Line = styled.span`
  display: block;
  border-radius: 50px;
  z-index: 9;
  width: 25px;
  height: 3px;
  margin: 5px;
  background-color: #fff;
  transition: width 0.4s ease-in-out;

  :nth-child(2) {
    width: ${(props) => (props.open ? "40%" : "70%")};
  }
`;

const Item = styled.li``;

const Navbar = () => {
  const [user] = useAuthState(auth);
  const { data } = useUser();
  const [toggle, setToggleNav] = useState(false);

  const Dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const handleSearch = (e) => {
    const query = e.target.value;
    if (query === "") {
      console.log("no data for search");
      navigate(from);
    } else {
      Dispatch(SearchQuery(query));
      navigate("/all/products/search");
    }
  };
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = () => {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    setScrollTop(currentScrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { data: cartItems } = useGetData(`/cart?email=${user?.email} `);

  return (
    <>
      <Nav>
        <Logo>
          <Link to={"/"}>Device Zone</Link>
        </Logo>
        <Menu>
          <Item>
            <ItemLink>
              <NavLink to="/">Home</NavLink>
            </ItemLink>
          </Item>
          <Item>
            <ItemLink>
              <NavLink to={"/all/products"}>All Products</NavLink>
            </ItemLink>
          </Item>
          <Item>
            <ItemLink>
              <NavLink to={"/categories"}>Categories</NavLink>
            </ItemLink>
          </Item>
          <Item>
            {!user ? (
              <ItemLink>
                <NavLink to={"/auth"}>Login</NavLink>
              </ItemLink>
            ) : (
              <ItemLink>
                {data ? (
                  <>
                    {data.isAdmin && <NavLink to={"/admin"}>Admin</NavLink>}

                    {data.isSeller && (
                      <NavLink to={"/dashboard"}>Dashboard</NavLink>
                    )}
                    {!data.isAdmin && !data.isSeller && (
                      <NavLink to={"/account"}>Account</NavLink>
                    )}
                  </>
                ) : (
                  ""
                )}
              </ItemLink>
            )}
          </Item>
          <Item>
            <Item>
              {!user ? (
                <ItemLink>
                  <NavLink to={"/account"}>Cart({cartItems?.length})</NavLink>
                </ItemLink>
              ) : (
                <ItemLink>
                  {data ? (
                    <>
                      {!data.isAdmin && !data.isSeller && (
                        <NavLink to={"/account"}>
                          Cart({cartItems?.length})
                        </NavLink>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </ItemLink>
              )}
            </Item>
          </Item>
          <Item>
            <SearchWrapper>
              <SearchField onChange={handleSearch} placeholder="Search..." />
            </SearchWrapper>
          </Item>
        </Menu>
        <NavIcon onClick={() => setToggleNav(!toggle)}>
          <Line open={toggle} />
          <Line open={toggle} />
          <Line open={toggle} />
        </NavIcon>
      </Nav>
      <HamburgerMenu
        user={user}
        data={data}
        open={toggle}
        cartItems={cartItems}
        setOpen={setToggleNav}
      />
      <div className="w-full bg-[#1f1e1f] px-5 py-1 border-b border-gray-500 md:hidden ">
        <input
          type="text"
          className="w-full cursor-pointer bg-[#3b3b3b] rounded-full  shadow-lg py-3 px-6 text-white "
          onChange={handleSearch}
          placeholder="Search Products e.g. Phone ,Tablet "
        />
      </div>
    </>
  );
};

export default Navbar;
