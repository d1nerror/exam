export type Category = {
  id: number;
  name: string;
};

export type Question = {
  id: number;
  question: string;
  description: string;
  answers: { [key: string]: string | null };
  category: string;
  multiple_correct_answers: boolean;
  correct_answers: { [key: string]: string };
};

export type selectedCategory ={
  selectedCategory: string;
}