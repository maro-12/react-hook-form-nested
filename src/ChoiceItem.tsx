import React from "react";
import { UseFormRegister } from "react-hook-form";
import { QuestionForm } from "./App";

interface Props {
  register: UseFormRegister<QuestionForm>;
  questionIndex: number;
  choiceIndex: number;
  removeChoice: (index: number) => void;
}

const ChoiceItem = ({ register, questionIndex, removeChoice, choiceIndex }: Props) => {
  return (
    <div style={{ paddingLeft: "24px" }}>
      <label>
        <p>Choice {choiceIndex + 1}</p>
        <input type="text" {...register(`questions.${questionIndex}.choices.${choiceIndex}.choiceText` as const)} />
      </label>
      <button onClick={() => removeChoice(choiceIndex)} type={"button"} style={{ marginLeft: "16px" }}>
        削除
      </button>
    </div>
  )
}

export default ChoiceItem;
