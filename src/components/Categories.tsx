import { getCategories } from '../util/api';
import { Category } from '../interfaces';
import { useState, useEffect } from 'react';

export default function FetchCategories () {
const [categories, setCategories] = useState<Category[]>([])
const [selectedCategory, setSelectedCategory] = useState<string>('');

useEffect(()=> {
    const FetchCategories = async ()=> {
        const data = await getCategories();
        setCategories(data);
    }; 

    FetchCategories();
},[])
//button
const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
};

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

};
//button
console.log('Selected Category:', selectedCategory);

return (
    <div>
            <h2>Categories</h2>
            <form onSubmit={handleSubmit}>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                {categories.map((category) => (
                    <option key={category.id}>{category.name}</option>
                ))}
            </select>
            <button type="submit">Submit</button>
            </form>
        </div>

);

};
