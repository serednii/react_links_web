import './SubMenuLinks.scss'
import Context from '../../../../Context';
import { useContext } from 'react'
function SubMenuLinks({ dataSubmenu }) {
    // console.log(dataSubmenu.menu)
    const value = useContext(Context)
    function onGetNameSubcategoryHandler(e) {
        // console.log(e.target.innerText)
        value.getLinks([dataSubmenu.menu, e.target.innerText])
    }

    return (
        <div className='submenulinks'>
            <h3 className='submenulinks__main-menu'>{dataSubmenu.menu}</h3>
            <ul className='submenulinks__links'>
                {dataSubmenu.arraySubmenu.map((e) =>
                    <li key={Math.random()}>
                        <a href='#' className='submenulinks__link' onClick={onGetNameSubcategoryHandler}>{e}</a>
                    </li>)}
            </ul>
        </div>
    )
}
export default SubMenuLinks;