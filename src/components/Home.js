import Fooditems from '../veg/Fooditems';
import Header from './Header';



function Home()
{
    return (<>
      <div>
        <Header />
      </div>
      <div>
        <Fooditems />
      </div>
    
    </>
       
    );
}
export default Home;