import Header from "./components/Header/Header";
import UsefulLinks from "./components/UsefulLinks/UsefulLinks";
import AddCategoryMain from "./components/AddCategoryMain/AddCategoryMain";
import AddCategoryOther from "./components/AddCategoryOther/AddCategoryOther";
import ChangeLinks from "./components/ChangeLinks/ChangeLinks";
import { useEffect, useRef, useState } from "react";
import Context from "./Context";

import { DATA_MENU, DATA_LINKS } from './State';
export const URL_SERVER = 'http://smm.zzz.com.ua/api/api.php';

async function getData(url, setIsLoading) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    setIsLoading(false);
  }
}

function outDataServer(url, method, newData) {
  const requestOptions = {
    method: method,
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      // Дополнительные заголовки, если необходимо
    },
    body: JSON.stringify(newData),
  };

  fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data updated successfully:', data);
      // Обработка успешного обновления данных
    })
    .catch(error => {
      console.error('There was an error updating data:', error);
      // Обработка ошибки
    });
}


function App() {

  const [dataMain, setDataMain] = useState({});
  const [listLinkData, setListLinkData] = useState([]);
  const [isAddCategoryMain, setIsAddCategoryMain] = useState(false);
  const [isAddCategoryOther, setIsAddCategoryOther] = useState(false);
  const [isButtonPlus, setIsButtonPlus] = useState(false);
  const [sluice, setSluice] = useState({});
  const sluiceLinks = useRef({});
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isChangeLink, setIsChangeLink] = useState(false);
  const [isChangeLinks, seIsChangeLinks] = useState(false);
  const tempDataRef = useRef();

  console.log('render app');

  useEffect(() => {
    console.log('render')
    getData(URL_SERVER, setIsLoading)
      .then(data => {
        setDataMain(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  function handlerGetDate() {
    getData(URL_SERVER, setIsLoading)
      .then(data => {
        tempDataRef.current = data;
        console.log(tempDataRef.current);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  function handlerPostDate() {
    outDataServer(URL_SERVER, 'PUT', tempDataRef.current);
  }

  const value = {
    DATA_LINKS,
    dataMain,
    setDataMain,
    dataMenu: DATA_MENU,
    listLinkData,
    openAddCategory,
    setOpenAddCategory,
    setListLinkData,
    isAddCategoryMain,
    setIsAddCategoryMain,
    isAddCategoryOther,
    setIsAddCategoryOther,
    isButtonPlus,
    setIsButtonPlus,
    sluice,
    setSluice,
    outDataServer,
    isChangeLink,
    setIsChangeLink,
    isChangeLinks,
    seIsChangeLinks,
    sluiceLinks,
  }

  return (
    <Context.Provider value={value} >
      <div className="App">
        {isLoading && <h1>Loading...</h1>}
        <Header />
        <UsefulLinks />
        {isAddCategoryMain && <AddCategoryMain />}
        {isAddCategoryOther && <AddCategoryOther />}
        {isChangeLinks && <ChangeLinks />}

        <button onClick={handlerGetDate}>Get Data</button>
        <button onClick={handlerPostDate}>Put Data</button>
      </div>
    </Context.Provider>
  );

}

export default App;
