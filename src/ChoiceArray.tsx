import React from "react";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { QuestionForm } from "./App";

interface Props {
  register: UseFormRegister<QuestionForm>;
  control: Control<QuestionForm>;
  questionIndex: number;
}

const ChoiceArray = ({ register, questionIndex, control }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.choices` as "questions.0.choices",
  });

  const addChoice = () => {
    append({ choiceText: "" })
  }

  const removeChoice = (index: number) => {
    remove(index);
  }

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} style={{ paddingLeft: "24px" }}>
          <label>
            <p>{`Choice ${index + 1}`}</p>
            <input type="text" {...register(`questions.${questionIndex}.choices.${index}.choiceText` as const)} />
          </label>
          <button onClick={() => removeChoice(index)} type={"button"} style={{ marginLeft: "16px" }}>
            削除
          </button>
        </div>
      ))}
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <button onClick={addChoice} type={"button"}>
          選択肢を追加
        </button>
      </div>
    </div>
  )
}

export default ChoiceArray;
