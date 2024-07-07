import { getQuestions } from '../util/api';
import { Question } from '../interfaces';
import { useState, useEffect } from 'react';

export default function FetchQuestions () {
const [questions, setQuestions] = useState<Question[]>([])

useEffect(()=> {
    const FetchQuestions = async ()=> {
        const data = await getQuestions();
        
        setQuestions(data);
    }; 

    FetchQuestions();
},[])

console.log("Question:",questions)
return (
    <div>
            <h2>Categories</h2>
                {questions.map((question) => (
                    <option key={question.id}>{question.question}</option>
                ))}
  
        </div>

);

};
