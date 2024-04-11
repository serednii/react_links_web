import './MenuLinks.scss';
import Context from '../../../Context';
import { useContext } from "react";
import { isObject, isArray } from '../../../functions/functions';
import { svgIconPlus } from '../../../icon';

function MenuLinks({ dataMenu, firstMenu }) {
    const valueContext = useContext(Context);

    function printLinks(obj) {
        console.log(obj)
        valueContext.setListLinkData(obj)
    }

    function plusMain() {
        // console.log(data)
        valueContext.setIsAddCategoryMain(true)
        valueContext.setIsAddCategoryOther(false);
    }

    function plusOther(data) {
        console.log(data)
        valueContext.setIsAddCategoryOther(true)
        valueContext.setIsAddCategoryMain(false);
        valueContext.setSluice(data);//передаємо ссилку на бєкт який будемо міняти
    }

    return (
        <div className={!firstMenu ? "submenu-links__links" : "submenu-links__parent"}>
            {firstMenu && valueContext.isButtonPlus && (<span className="parent-plus" onClick={plusMain} >{svgIconPlus}</span>)}
            <ul className="submenu-list" key={Math.random()}>
                {Object.keys(dataMenu).map(key => {
                    return (<li key={Math.random()} className="submenu-links">
                        {valueContext.isButtonPlus && (<span className="link-plus" onClick={() => plusOther({ dataMenu, key })} >{svgIconPlus}</span>)}
                        <button
                            className='submenu-links__menu'
                            onClick={() => { isArray(dataMenu[key]) && printLinks({ dataMenu, key }) }} >
                            {key}
                        </button>
                        {isObject(dataMenu[key]) &&
                            <MenuLinks key={Math.random()} dataMenu={dataMenu[key]} firstMenu={false} />
                        }
                    </li>)
                })}
            </ul>
        </div>
    )
}

export default MenuLinks
