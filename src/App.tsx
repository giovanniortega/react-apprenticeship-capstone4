import React from "react";
import Header from "./UI/Header/Header";
import Footer from "./UI/Footer/Footer";
import Router from "./components/Router/Router.component";
import { User } from "./types/types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const users: User[] = [
    {
      id: 1,
      print: false,
      name: "Nombre 1",
      url: "https://images.prismic.io/wizeline-academy/edaf28da-2e46-4f75-8a69-a972119f40ed_banner-3-2.jpeg?auto=compress,format&rect=0,0,1429,700&w=1440&h=705",
    },
    {
      id: 2,
      print: true,
      name: "Nombre 2",
      url: "https://images.prismic.io/wizeline-academy/edaf28da-2e46-4f75-8a69-a972119f40ed_banner-3-2.jpeg?auto=compress,format&rect=0,0,1429,700&w=1440&h=705",
    },
    {
      id: 3,
      print: true,
      name: "Nombre 3",
      url: "https://images.prismic.io/wizeline-academy/edaf28da-2e46-4f75-8a69-a972119f40ed_banner-3-2.jpeg?auto=compress,format&rect=0,0,1429,700&w=1440&h=705",
    },
  ];

  return (
    <>
      <Header users={users} />
      <Router />
      <Footer />
    </>
  );
}

export default App;
