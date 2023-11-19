import { useState } from "react";
import ListLinks from "./ListLinks/ListLinks";
import MenuLinks from "./MenuLinks/MenuLinks";
import './UsefulLinks.scss'
import Context from "../../Context";
const DATA_MENU = [
    { menu: 'Java', arraySubmenu: ['Переменние', 'цикли', 'Обєкти'] },
    { menu: 'Python', arraySubmenu: ['Переменние', 'цикли', 'Обєкти', 'Масиви', 'Функції'] },
    { menu: 'C++', arraySubmenu: ['Переменние', 'цикли', 'Обєкти', 'Масиви', 'Функції'] },
    { menu: 'Java', arraySubmenu: ['Переменние', 'цикли', 'Обєкти', 'Масиви', 'Функції'] },
    { menu: 'Java', arraySubmenu: ['Переменние', 'цикли', 'Обєкти', 'Масиви', 'Функції'] },
    { menu: 'Java', arraySubmenu: ['Переменние', 'цикли', 'Обєкти', 'Масиви', 'Функції'] }
]

const DATA_LINKS = {
    'Java': {
        'Переменние': [{
            link: 'https://vertex-academy.com/tutorials/ru/sozdanie-peremennyx-i-tipy-peremenny/',
            name: 'Переменные в Java'
        },
        {
            link: 'https://javarush.com/groups/posts/peremennie-v-java',
            name: 'Переменные в Java и константы'
        },
        {
            link: 'https://metanit.com/java/tutorial/2.1.php',
            name: 'Переменные и константы'
        }],
        'цикли': [{
            link: 'https://metanit.com/java/tutorial/2.6.php',
            name: 'Циклы'
        },
        {
            link: 'https://skillbox.ru/media/base/kak-ispolzovat-tsikly-v-yazyke-java-polnoe-rukovodstvo/',
            name: 'nКак использовать циклы в языке Java. Полное руководствоame'
        },
        {
            link: 'https://timeweb.cloud/tutorials/java/cikly-v-java-osnovy-raboty',
            name: 'Циклы в Java: основы работы, как использовать и примеры'
        }],
        'Обєкти': [{
            link: 'https://metanit.com/java/tutorial/3.1.php',
            name: 'Классы и объекты'
        },
        {
            link: 'https://javarush.com/quests/lectures/questsyntaxpro.level07.lecture03',
            name: 'Объекты в Java'
        },
        {
            link: 'https://javarush.com/groups/posts/1949-znakomstvo-s-klassami-napisanie-sobstvennihkh-klassov-konstruktorih',
            name: 'Знакомство с классами: написание собственных классов, конструкторы'
        },
        {
            link: 'https://skillbox.ru/media/base/klassy-i-obekty-v-java/',
            name: 'name'
        }]
    }
}

function UsefulLinks() {
    const [listLinkdata, setListLinkData] = useState([])

    function getLinks([category, subCategory]) {
        const data = (DATA_LINKS[category] && DATA_LINKS[category][subCategory]) || []
        setListLinkData(data)
    }
    const value = {
        getLinks,
    }
    return (
        <Context.Provider value={value}>

            <div className="usefull_links">
                <MenuLinks key={Math.random()} dataMenu={DATA_MENU} />
                <ListLinks data={listLinkdata} />
            </div>
        </Context.Provider>
    )
}

export default UsefulLinks;