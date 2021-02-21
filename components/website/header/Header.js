
import MenuList from "components/website/menu/MenuList";
import Container from "components/website/elements/Container";
import MenuCustom from "components/website/menu/CustomMenu";
import { useState, useEffect, useRef } from "react";
import useScroll from "components/website/hooks-custom/useScroll";

export default function Header({active}){

    const { scrollX, scrollY, scrollDirection } = useScroll();
    const [fixed, setFixed] = useState(false);

    useEffect(() => {
        // console.log("scrollY", scrollY);
        // console.log("scrollDirection", scrollDirection);
        if (scrollY && scrollY >= 250) {
          setFixed(true);
        } else {
          setFixed(false);
        }
      }, [scrollY, scrollDirection]);
    return<>
    <header className={fixed === true ? "fixed" : ""}>
        <Container>
          <MenuList classActive={active}></MenuList>
          <MenuCustom></MenuCustom>
        </Container>
      </header>
    
    </>
}