import { Footer } from "../components/page/footer";
import { Map } from "../components/page/map/map";
import { SearchBar } from "../components/page/map/search";

export default function Page() {
  return (
    <>
      <Map />
      <SearchBar />
      <Footer />
    </>
  );
}
