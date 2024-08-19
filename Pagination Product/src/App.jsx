import React, { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchingData = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  const pageHandler = (selectedPage) => {
      setPage(selectedPage)
  }

  return (
    <div>
      {products.length > 0 && (
        <div className="flex flex-wrap justify-center p-4">
          {products.slice(page * 10 - 10, page * 10).map((prod) => (
            <div
              key={prod.id}
              className="h-[370px] cursor-pointer w-[300px] flex items-center justify-center flex-col gap-4 m-4 rounded-lg bg-slate-400 p-4 shadow-lg"
            >
              <img
                className="object-cover bg-white rounded-md w-full h-2/3"
                src={prod.thumbnail}
                alt={prod.title}
              />
              <span className="font-bold text-xl text-center">
                {prod.title}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-center gap-2">
        <span onClick={() => setPage(page-1)} className={`p-5 cursor-pointer ${page === 1 && "hidden"} border-[3px] border-black rounded`} >◀</span>
        <span  className="flex items-center justify-center gap-2">
          {[...Array(products.length / 10)].map((__,i) => {
            return <span key={i} onClick={() => pageHandler(i+1)} className={`p-5 ${page === i+1? "text-orange-600":"text-black"} font-semibold cursor-pointer border-[3px] text-2xl border-black rounded`}>
                  {i+1}
            </span>;
          })}
        </span>
        <span onClick={() => setPage(page+1)}  className={`p-5 cursor-pointer ${page === products.length/10 && "hidden"} border-[3px] border-black rounded`} >▶</span>
      </div>
    </div>
  );
}

export default App;
