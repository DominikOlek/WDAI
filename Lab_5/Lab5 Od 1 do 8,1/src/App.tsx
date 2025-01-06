import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NKoszyk from './Components/Koszyk/NowyKoszyk';
import Licznik from './Components/Liczniki/Liczik';
import NLicznik from './Components/Liczniki/NowyLicznik';
import Formularz from './Components/Formularze/Formularz'
import Haslo from './Components/Formularze/Haslo'
import Logowanie from './Components/Formularze/Logowanie'
import Ternary from './Components/inne/Ternary'
import Aktualizacja from './Components/inne/Aktualizacja'
import Studenci from './Components/studenci/Studenci'
import StudentMng from './Components/studenci/StudentManager'
import Odliczanie from './Components/efekty/Odliczanie'
import Tytul from './Components/efekty/Tytul'
import LicznikEfekt from './Components/efekty/Liczik'
import Komentarze from './Components/produkty/Komentarze'
import Licznik81 from './Components/Licznik81';


function App() {
  document.title = "Lab 5 Zad 1-8.1"
  return (
      <>
            <h1>Zad1. Koszyk</h1>
          <NKoszyk />
            <h1>Zad2. Licznik</h1>
          <NLicznik />
          <h1>Zad3. Formularz</h1>
          <Formularz />
          <h3>Zad3.2. Hasło</h3>
          <Haslo />
          <h3>Zad3.3. Logowanie</h3>
          <Logowanie />
          <h1>Zad4. Ternary</h1>
          <Ternary />
          <h3>Zad4.2. Aktualizacja</h3>
          <Aktualizacja />
          <h1>Zad5. Studenci</h1>
          <Studenci />
          <br />
          <h3>Zad5.2. Manager</h3>
          <StudentMng />
          <h1>Zad6. Efekty</h1>
          <LicznikEfekt />
          <h3>Zad6.2. Tytuł</h3>
          <Tytul />
          <h3>Zad6.2. Odliczanie</h3>
          <Odliczanie />
          <h1>Zad7. Komenatarze</h1>
          <Komentarze />
          <h1>Zad8.1. Licznik</h1>
          <Licznik81 />
    </>
  )
}

export default App
