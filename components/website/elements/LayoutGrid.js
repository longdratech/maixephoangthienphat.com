
export default function LayoutGrid({
    children,
    gridColumn = false,
    gridRow =  true,

}){

    return <div className="layoutGrid">

        {children}

        <style jsx>{`
            .layoutGrid{
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-gap: 10px;
                /* grid-auto-rows: minmax(100px, auto); */
            }
        `
        }</style>

    </div>

    

}