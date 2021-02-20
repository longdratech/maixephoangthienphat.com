// import CONFIG from "web.config";
import MasterPageBasic from "components/website/master/MasterPageBasic";
// import BasicLayout from "components/diginext/layout/BasicLayout";
// import { useRouter } from "next/router";
// import Header from "components/website/elements/Header";
import Header from "components/website/header/Header";
import Container from "components/website/elements/Container";
// import DashkitButton from "components/dashkit/Buttons";
// import { BS } from "components/diginext/elements/Splitters";

export default function Home(props) {
  // const router = useRouter();

  return (
    <MasterPageBasic hidePrevButton header="Home Page">
      <Header active="lien-he"></Header>
      <main id="pContact">
        <Container>
          <h2>Hello world!</h2>
        </Container>
      </main>
     
      
    </MasterPageBasic>
  );
}
