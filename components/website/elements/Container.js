function Container({children}) {
    return <div className="container">
        {children}
        <style jsx>{`
            .container{
                max-width: 1220px;
                width: 100%;
                padding: 0 20px;
                margin-left: auto;
                margin-right: auto;

            }

            @media only screen and (max-width:599px){
                
            }
        `}</style>
    </div>;
  }
  
  export default Container;
  