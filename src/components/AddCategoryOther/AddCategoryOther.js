import { useContext, useRef, useState } from 'react';
import './AddCategoryOther.scss';
import Context from '../../Context';
import { svgIconClose } from '../../icon';
import { isObject, isArray } from '../../functions/functions';
import { URL_SERVER } from '../../App';

function AddCategory() {

    const [text, setText] = useState('');
    const [url, setUrl] = useState('');
    const tempRef = useRef([]);

    const [selectAction, setSelectAction] = useState('');
    const valueContext = useContext(Context);

    console.log(valueContext.sluice);

    let { key } = valueContext.sluice;
    const isArr = isArray(valueContext.sluice.dataMenu[key]);
    const isObj = isObject(valueContext.sluice.dataMenu[key]);

    console.log(valueContext.sluice.dataMenu);

    function OtherAction(event) {
        event.preventDefault();
        tempRef.current.push(valueContext.dataMain)
        valueContext.setDataMain(prev => { return { ...prev } });
        setTimeout(() => {
            valueContext.setDataMain(tempRef.current.pop());
        })

        // console.log(valueContext.dataMain);
        valueContext.outDataServer(URL_SERVER, 'PUT', valueContext.dataMain);
        console.log(key);
    }

    function handlerSetSelectAction(select) {
        setSelectAction(select)
        if (select === 'rename') setText(key)
    }

    function renameMenu(event) {
        valueContext.sluice.dataMenu[text] = valueContext.sluice.dataMenu[key];
        delete valueContext.sluice.dataMenu[key];
        // valueContext.sluice = { dataMenu, key: text };
        // key = text;
        valueContext.sluice.key = text;
        // valueContext.sluice.dataMenu = dataMenu;

        OtherAction(event);
        setText(text);
    }

    function deleteMenu(event) {
        delete valueContext.sluice.dataMenu[key];
        if (Object.keys(valueContext.sluice.dataMenu).length === 0) {
            valueContext.sluice.dataMenu = null;
            console.log('delete null');
        }
        console.log(valueContext.sluice.dataMenu);
        OtherAction(event);
        valueContext.setIsAddCategoryOther(false);
    }

    function addSubMenu(event) {
        if (valueContext.sluice.dataMenu[key] === null) valueContext.sluice.dataMenu[key] = {}
        if (isObject(valueContext.sluice.dataMenu[key])) valueContext.sluice.dataMenu[key][text] = null
        console.log(valueContext.sluice.dataMenu)
        OtherAction(event)
        setText('');
    }

    function addLink(event) {
        if (valueContext.sluice.dataMenu[key] === null) valueContext.sluice.dataMenu[key] = []
        if (isArray(valueContext.sluice.dataMenu[key])) valueContext.sluice.dataMenu[key].push({
            name: text,
            link: url
        })
        console.log(valueContext.sluice.dataMenu)
        OtherAction(event)
        setText('');
    }


    return (
        <div className="add-category">
            <button className='add-category__btn-close' onClick={() => valueContext.setIsAddCategoryOther(false)}>{svgIconClose}</button>

            <form className='add-other-form'>

                <label htmlFor="action-select">Select an action:</label>

                <select name="action" id="action-select" onChange={(event) => handlerSetSelectAction(event.target.value)}>
                    <option value="">Select an action</option>
                    <option value="rename">Rename menu</option>
                    <option value="delete">Delete menu</option>
                    {!isArr && <option value="add-menu">Add sub menu</option>}
                    {!isObj && <option value="add-link">Add link</option>}
                </select>

                {/* <button className='add-other__btn' onClick={() => handlerClosePopup()}>Add</button> */}


                <div className='action'>
                    {selectAction === 'rename' && (
                        <div>
                            <input value={text} onChange={(e) => setText(e.target.value)} type="text" />
                            <button className='add-other__btn' onClick={(event => renameMenu(event))}>Rename menu</button>
                        </div>
                    )}
                    {selectAction === 'delete' && (
                        <div>
                            <p>Ви дійсно хочете видалити пункт меню {key}</p>
                            <button className='add-other__btn' onClick={(event) => deleteMenu(event)}>Delete menu</button>
                            <button className='add-other__btn' onClick={() => valueContext.setIsAddCategoryOther(false)}>No</button>
                        </div>
                    )}
                    {selectAction === 'add-menu' && (
                        <div>
                            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add sub menu" type="text" />
                            <button className='add-other__btn' onClick={(event) => addSubMenu(event)}>Add menu</button>
                        </div>
                    )}
                    {selectAction === 'add-link' && (
                        <div>
                            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add Name link" type="text" />
                            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Add link" type="text" />
                            <button className='add-other__btn' onClick={(event) => addLink(event)}>Add New Link</button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}

export default AddCategory;
