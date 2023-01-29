import Link from "next/link";
import { ReactElement } from "react";

const Home = (): ReactElement => {
  return (
    <>
      <main>
        <div>
          <h1>Next.js and postgres sample</h1>
          <div>
            <ul>
              <li>
                <Link href="/register">register</Link>
              </li>
              <li>
                <Link href="/member-list">member list</Link>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
