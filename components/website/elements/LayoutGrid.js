
export default function LayoutGrid({
    children,
    column=3,
    itemBig = false
}){

    return <div className={`${itemBig === true ? "layoutGridBig" : "layoutGrid"}`}>

        {children}

        <style jsx>{`
            .layoutGrid{
                display: grid;
                grid-template-columns: repeat(${column}, 1fr);
                grid-gap: 20px;
                /* grid-auto-rows: minmax(100px, auto); */
                padding-bottom: 20px;
            }
            .layoutGridBig{
                display: grid;
                grid-template-columns: repeat(1, 1fr) repeat(1, 2fr);
                grid-gap: 20px;
                padding-bottom: 20px;
                /* grid-auto-rows: minmax(100px, auto); */
            }
        `
        }</style>

    </div>

    

}