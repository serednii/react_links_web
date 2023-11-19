import './ButtonsAdd.scss'
// import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
function ButtonsAdd() {
    return (
        <div className='buttonsadd'>
            <Button variant="primary">Add new category</Button>
            <Button variant="success">Add new sub category</Button>
            <Button variant="info">Add new links</Button>
        </div>
    )
}
export default ButtonsAdd