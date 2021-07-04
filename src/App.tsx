import { createContext, useState, useEffect } from 'react';
//useEffect: Disparar info quando algo acontecer.
import { Route, BrowserRouter } from 'react-router-dom';

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import { AuthContextProvider } from './contexts/AuthContext';


export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        {/*Exact impede de colocar a home e outra página no mesmo site */}
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

