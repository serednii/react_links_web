import { useContext, useState } from 'react';
import './AddCategoryMain.scss';
import Context from '../../Context';
import { svgIconClose } from '../../icon';
import { URL_SERVER } from '../../App';
function AddCategory() {
    const [text, setText] = useState('')
    const valueContext = useContext(Context)

    function handlerClosePopup() {
        valueContext.dataMain[text] = null;
        valueContext.setDataMain(prev => {
            return { ...prev };
        });
        valueContext.outDataServer(URL_SERVER, 'PUT', valueContext.dataMain);
        setText('');
        // valueContext.setIsAddCategoryMain(false);
    }

    return (
        <div className="add-category">
            <button className='add-category__btn-close' onClick={() => valueContext.setIsAddCategoryMain(false)}>{svgIconClose}</button>
            <input value={text} onChange={(e) => setText(e.target.value)} type="text" />
            <button className='add-category__btn-apply' onClick={() => handlerClosePopup()}>Add</button>
        </div>
    )
}

export default AddCategory;
