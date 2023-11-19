import SubMenuLinks from "./SubMenuLinks/SubMenuLinks"

function MenuLinks({ dataMenu }) {
    // console.log(dataMenu)
    return (
        <div>
            {dataMenu.map((subMenu) => {
                // console.log(subMenu)
                return (
                    <SubMenuLinks key={Math.random()} dataSubmenu={subMenu} />
                )
            })

            }

        </div>
    )
}
export default MenuLinks