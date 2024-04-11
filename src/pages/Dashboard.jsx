import { ResourceCategories } from "../assets/ResourceCategories"
import Category from "../components/Category";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";

const Dashboard = () => {



  return (
    <>
      <Navbar />
      {ResourceCategories.length === 0 ? <Spinner /> : (
        <div className="w-[90%] md:w-[80%] mx-auto grid gap-8 h-full  lg:grid-cols-3 md:grid-cols-2 grid-cols-1  flex-wrap mt-8">
        {/* {ResourceCategories.map((category) => (
            <Category key={category} type={category} />
          ))} */}

          {
            Object.keys(ResourceCategories).map(key => {
              return (
                <Category key={key} type={key} items={ResourceCategories[key]}/>
              )
            })
          }


      </div>
      )}

      
    </>
  );
};

export default Dashboard;
