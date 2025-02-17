import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getalldata } from "./features/gituserslice";

function App() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => {
    console.log("State:", state.app);
    return state.app;
  });

  // Fetching data when component mounts
  useEffect(() => {
    dispatch(getalldata());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        GitHub Users
      </h1>
      
      <button 
        onClick={() => dispatch(getalldata())} 
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Get the Api
      </button>

      {loading && <p className="text-yellow-600 font-semibold">Loading...</p>}
      {error && <p className="text-red-500 font-semibold">Error: {error}</p>}
      
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {user.map((ele) => (
          <li 
            key={ele.id} 
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold">{ele.login}</h2>
            <img 
              src={ele.avatar_url} 
              alt={ele.login} 
              className="w-32 h-32 rounded-full mx-auto my-4"
            />
            <a 
              href={ele.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Profile
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
