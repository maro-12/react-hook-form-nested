import React from "react";
import { Control, useFieldArray, UseFormRegister, useWatch } from "react-hook-form";
import { QuestionForm } from "./App";
import ChoiceItem from "./ChoiceItem";

interface Props {
  register: UseFormRegister<QuestionForm>;
  control: Control<QuestionForm>;
  questionIndex: number;
  removeQuestion: (index: number) => void;
}

const QuestionItem = ({ register, control, questionIndex, removeQuestion }: Props) => {
  const type = useWatch({
    control,
    name: `questions.${questionIndex}.questionType` as const
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.choices` as "questions.0.choices",
  });

  const addChoice = () => {
    append({ choiceText: "" })
  }

  const removeChoice = (choiceIndex: number) => {
    remove(choiceIndex);
  }

  return (
    <div className={"question-item-container"}>
      <div>
        <label>
          <p>Question {questionIndex + 1}</p>
          <input type="text" {...register(`questions.${questionIndex}.questionText` as const)} />
        </label>
        <button type={"button"} onClick={() => removeQuestion(questionIndex)} style={{ marginLeft: "16px" }}>
          削除
        </button>
      </div>
      <div>
        <p>種類</p>
        <label style={{ fontSize: "14px" }}>
          フリーワード
          <input type={"radio"} value={"FREE"} {...register(`questions.${questionIndex}.questionType` as const)} />
        </label>
        <label style={{ fontSize: "14px" }}>
          選択式
          <input type={"radio"} value={"SELECT"} {...register(`questions.${questionIndex}.questionType` as const)} />
        </label>
      </div>
      {type === "SELECT" && (
        <>
          {fields.map((field, index) => (
            <ChoiceItem
              key={field.id}
              register={register}
              questionIndex={questionIndex}
              choiceIndex={index}
              removeChoice={removeChoice}
            />
          ))}
          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <button onClick={addChoice} type={"button"}>
              選択肢を追加
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default QuestionItem;
