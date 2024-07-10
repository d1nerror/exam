import { useState, useEffect } from "react";
import { Category } from "./interfaces";
import { getCategories } from "./util/api";
import Quiz from "./components/Quiz";

const App = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [quizStarted, setQuizStarted] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedCategory) {
      setQuizStarted(true);
    }
  };

  return (
    <>
      {!quizStarted ? (
        <div className="flex h-screen items-center justify-center">
          <div className="rounded-lg border-b-4 border-yellow-700 bg-yellow-300 p-6 px-12 py-10 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">Categories</h2>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="appearance-none rounded border-b-4 border-orange-700 bg-orange-500 p-2 px-4 py-2 font-bold text-orange-950 hover:bg-orange-400 focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleSubmit}
              className="ml-4 rounded border-b-4 border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:border-blue-500 hover:bg-blue-400"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <Quiz selectedCategory={selectedCategory} />
      )}
    </>
  );
};

export default App;
