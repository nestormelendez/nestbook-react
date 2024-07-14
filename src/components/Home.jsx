import { HeaderHome } from "./HeaderHome";
import { Posts } from "./Posts";

export function Home() {
  return (
    <main className="home">
      <HeaderHome />
      <Posts />
    </main>
  );
}
