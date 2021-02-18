import React, { useState } from 'react';
import { Menu, Badge } from 'antd';
import {
  HomeOutlined,
  SettingOutlined,
  UserAddOutlined,
  WifiOutlined,
  PoweroffOutlined,
  DesktopOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Search from "../forms/Search";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');
  
  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state}));
  
  let history = useHistory();

  const handleClick = (event) => {
    setCurrent(event.key)
  };

  //se déconnecter
  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push('/');
  };

  return(
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Accueil</Link>
      </Item>

      <Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Produits</Link>
      </Item>

      <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            Panier
          </Badge>
        </Link>
      </Item>

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">S'inscrire</Link>
        </Item>
      )}
      {!user && (
        <Item key="login" icon={<WifiOutlined />} className="float-right">
          <Link to="/login">Se connecter</Link>
        </Item>
      )}
     
      {user && (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          className="float-right"
          title={user.email && user.email.split('@')[0]}
        >
          {user && user.role === 'subscriber' && (
            <Item key="profile" icon={<DesktopOutlined />} className="float-right">
              <Link to="/user/history">Mon Compte</Link>
            </Item>
          )}

          {user && user.role === 'admin' && (
            <Item key="dashboard" icon={<DesktopOutlined />} className="float-right">
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}

          <Item key="setting:3" icon={<PoweroffOutlined />} onClick={logout}>
            Se déconnecter
          </Item>

        </SubMenu>
      )}

      <Item className="float-right m-1">
        <Search />
      </Item>

    </Menu>
  );
};

export default Header;