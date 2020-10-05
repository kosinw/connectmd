import { Shell } from "components/shell";
import { NextPage } from "next";

const HomePage: NextPage = () => {
  return (
    <>
      <Shell>
        <div className="container mx-auto max-w-7xl py-6 px-8">
          <h1 className="font-extrabold text-4xl">Home</h1>
          <p>Testing 123</p>
        </div>
      </Shell>
    </>
  );
};

export default HomePage;
