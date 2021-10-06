import React from "react";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { QuestionForm } from "./App";
import ChoiceArray from "./ChoiceArray";

interface Props {
  register: UseFormRegister<QuestionForm>;
  control: Control<QuestionForm>;
}

const QuestionArray = ({ register, control }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const addQuestion = () => {
    append({ questionText: "" })
  }

  const removeQuestion = (index: number) => {
    remove(index);
  }

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} style={{ borderBottom: "1px solid lightGray", paddingBottom: "24px" }}>
          <div>
            <label>
              <p>{`Question ${index + 1}`}</p>
              <input type="text" {...register(`questions.${index}.questionText` as const)} />
            </label>
            <button type={"button"} onClick={() => removeQuestion(index)} style={{ marginLeft: "16px" }}>
              削除
            </button>
          </div>
          <ChoiceArray control={control} register={register} questionIndex={index} />
        </div>
      ))}
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <button onClick={addQuestion} type={"button"}>
          質問を追加
        </button>
      </div>
    </div>
  )
}

export default QuestionArray;
