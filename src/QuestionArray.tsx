import React from "react";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { QuestionForm } from "./App";

interface Props {
  register: UseFormRegister<QuestionForm>;
  control: Control<QuestionForm>;
}

const QuestionArray = ({ register, control }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions"
  });

  const addQuestion = () => {
    append({ questionText: "" })
  }

  return (
    <div>
      {fields.map((field, index) => (
        <>
          <label key={field.id}>
            <p>{`Question ${index + 1}`}</p>
            <input type="text" {...register(`questions.${index}.questionText` as const)} />
          </label>
        </>
      ))}
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <button onClick={addQuestion}>
          質問を追加
        </button>
      </div>
    </div>
  )
}

export default QuestionArray;
