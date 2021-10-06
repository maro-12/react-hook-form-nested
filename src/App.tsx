import React from 'react';
import './App.css';
import { useFieldArray, useForm } from 'react-hook-form';
import QuestionItem from './QuestionItem';

type QuestionType = "FREE" | "SELECT";

interface Choice {
  choiceText: string;
}
interface Question {
  questionText: string;
  questionType: QuestionType;
  choices: Choice[];
}

export interface QuestionForm {
  questions: Question[]
}

function App() {
  const { handleSubmit, register, control } = useForm<QuestionForm>({
    defaultValues: {
      questions: [{ questionText: "", questionType: "FREE", choices: [] }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const addQuestion = () => {
    append({ questionText: "", questionType: "FREE", choices: [] })
  }

  const removeQuestion = (index: number) => {
    remove(index);
  }

  const _handleSubmit = (data: QuestionForm) => {
    console.log("data", data);
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(_handleSubmit)} style={{ border: "2px solid gray", padding: "20px", width: "400px" }}>
        {fields.map((field, index) => (
          <QuestionItem
            key={field.id}
            register={register}
            control={control}
            questionIndex={index}
            removeQuestion={removeQuestion}
          />
        ))}
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <button onClick={addQuestion} type={"button"}>
            質問を追加
          </button>
        </div>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button type="submit">保存</button>
        </div>
      </form>
    </div>
  );
}

export default App;
