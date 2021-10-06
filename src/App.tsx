import React from 'react';
import './App.css';
import { useForm } from 'react-hook-form';
import QuestionArray from './QuestionArray';

interface Choice {
  choiceText: string;
}
interface Question {
  questionText: string;
  choices: Choice[];
}
export interface QuestionForm {
  questions: Question[]
}

function App() {
  const { handleSubmit, register, control } = useForm<QuestionForm>({
    defaultValues: {
      questions: [{ questionText: "", choices: [] }]
    }
  });

  const _handleSubmit = (data: QuestionForm) => {
    console.log("data", data);
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(_handleSubmit)} style={{ border: "2px solid gray", padding: "20px", width: "400px" }}>
        <QuestionArray register={register} control={control} />
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button type="submit">保存</button>
        </div>
      </form>
    </div>
  );
}

export default App;
