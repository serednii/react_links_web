import './ButtonsAdd.scss'
// import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Context from '../../../Context';
import { useContext } from 'react';

function ButtonsAdd() {
    const valueContext = useContext(Context)
    function handlerOpenPopup() {
        valueContext.setIsButtonPlus(!valueContext.isButtonPlus);
        valueContext.seIsChangeLinks(false);

    }



    return (
        <div className='buttonsAdd'>
            <Button variant="primary" onClick={handlerOpenPopup}>Add new category</Button>
        </div>
    )
}
export default ButtonsAdd