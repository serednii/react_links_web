import './ChangeLinks.scss'
import { useContext, useState } from "react";
import Context from '../../Context';

import { svgIconClose } from '../../icon';
import { URL_SERVER } from '../../App';


function ChangeLinks() {
    const valueContext = useContext(Context);
    const { dataMenu, key } = valueContext.listLinkData;
    let data;
    const [selectAction, setSelectAction] = useState('add-link');
    const [selectActionLink, setSelectActionLink] = useState('');
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    // console.log(data)
    // console.log(selectActionLink)

    function OtherAction() {
        valueContext.setDataMain({ ...valueContext.dataMain });
        // console.log(valueContext.dataMain)
        valueContext.outDataServer(URL_SERVER, 'PUT', valueContext.dataMain);
        setName('');
        setLink('');
        // valueContext.setIsAddCategoryOther(false);
    }

    if (dataMenu && key) {
        data = dataMenu[key]
    }
    function handlerSetSelectAction(select) {
        setSelectActionLink(select)
        setName(data[+select].name)
        setLink(data[+select].link)
    }

    function addLink(e) {
        e.preventDefault(e)
        if (name.length > 2 && link.length > 5) {

            data.push({
                name,
                link
            })
            OtherAction()
        }
    }

    function changeLink(e) {
        e.preventDefault(e)
        if (name.length > 2 && link.length > 5) {
            console.log(selectActionLink)
            data[selectActionLink] = { name, link }
            OtherAction()
        }
    }

    function deleteLink(e) {
        e.preventDefault(e)
        data.splice(selectActionLink, 1)
        if (data.length === 0) {
            console.log('data = 0')
            dataMenu && key && (dataMenu[key] = null);
        }

        OtherAction()

    }

    return (
        <div>
            <button className='add-category__btn-close' onClick={() => valueContext.seIsChangeLinks(false)}>{svgIconClose}</button>

            <form className='add-other-form'>

                <label htmlFor="action">Select an action:</label>

                <select name="action" id="action" onChange={(event) => setSelectAction(event.target.value)}>
                    <option value="add-link">Add Link</option>
                    <option value="change">Change Link</option>
                    <option value="delete">Delete Link</option>
                </select>

                {selectAction !== 'add-link' && (
                    <div>
                        <label htmlFor="action">Select link:</label>
                        <select name="links" id="action" onChange={(event) => handlerSetSelectAction(event.target.value)} >
                            <option value="">Select link</option>
                            {
                                data?.map((e, i) => {
                                    return <option key={e.name} value={i}>{e.name}</option>
                                })
                            }
                        </select>
                    </div>
                )}

                <div className='action'>

                    {selectAction === 'add-link' && (

                        <div className='action-type'>
                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Add Name link" type="text" />
                            <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Add link" type="text" />
                            <button className='add-other__btn' onClick={(e) => addLink(e)}>Add New Link</button>
                        </div>
                    )}

                    {selectAction === 'change' &&
                        // !setName(data[selectActionLink].name) &&
                        // !setLink(dataMenu[key][selectActionLink]?.link) &&
                        (
                            <div className='action-type'>
                                <input disabled={selectActionLink === ''} value={name} onChange={(e) => setName(e.target.value)} placeholder="Add Name link" type="text" />
                                <input disabled={selectActionLink === ''} value={link} onChange={(e) => setLink(e.target.value)} placeholder="Add link" type="text" />
                                <button disabled={selectActionLink === ''} className='add-other__btn' onClick={(e) => changeLink(e)}>Add New Link</button>
                            </div>
                        )}

                    {selectAction === 'delete' && (
                        <div className='action-type'>
                            <p>Ви дійсно хочете видалити пункт меню {selectActionLink !== '' && data && data.length > 0 && data[selectActionLink].name}</p>
                            <button disabled={selectActionLink === ''} className='add-other__btn' onClick={(e) => deleteLink(e)}>Delete menu</button>
                        </div>
                    )}

                </div>
            </form>
        </div>
    )
}

export default ChangeLinks;