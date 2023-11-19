import './ListLinks.scss'
function ListLinks({ data }) {
    let dataArrayElements = data.map((obj) => {
        return (
            <li key={Math.random()}>
                <a target="blank" href={obj.link}>{obj.name}</a>
            </li>
        )
    }
    )

    dataArrayElements.length === 0 && (dataArrayElements = <p>Немає даних</p>)

    return (
        <div className="list_links">
            <ul>
                {dataArrayElements}
            </ul>
        </div>
    )
}
export default ListLinks;