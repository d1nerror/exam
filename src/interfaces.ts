export type Category = {
  id: number;
  name: string;
};

export type Question = {
  id: number;
  question: string;
  answers: string;
  category: string;
  multiple_correct_answers:boolean;
};