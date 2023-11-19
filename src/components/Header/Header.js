import ButtonsAdd from './ButtonsAdd/ButtonsAdd'
import './Header.scss'
function Header() {
    return (
        <div className='header'>
            <ButtonsAdd></ButtonsAdd>
            <h1 className='header__title'>Корисні ссилки</h1>

        </div>
    )
}
export default Header