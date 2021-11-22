
import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import QuestionItem from './QuestionItem';

const choiceScheme = yup.object().shape({
  choiceText: yup.string().required()
});

const questionScheme = yup.object().shape({
  questionText: yup.string().required(),
  questionType: yup.string().required(),
  choices: yup.array().of(choiceScheme),
});

const scheme = yup.object().shape({
  questions: yup.array().of(questionScheme).min(1)
});

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

const Survey = () => {
  const { handleSubmit, register, control, formState: { errors } } = useForm<QuestionForm>({
    defaultValues: {
      questions: [{ questionText: "", questionType: "FREE", choices: [] }]
    },
    resolver: yupResolver(scheme)
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

  const doSubmit = (data: QuestionForm) => {
    console.log("data", data);
  }

  console.log("errors", errors);

  return (
    <div className={"container"}>
      <form onSubmit={handleSubmit(doSubmit)} className={"form-container"}>
        {fields.map((field, index) => (
          <QuestionItem
            key={field.id}
            register={register}
            control={control}
            questionIndex={index}
            removeQuestion={removeQuestion}
          />
        ))}
        <div className={"question-add-action-wrapper"}>
          <button onClick={addQuestion} type={"button"}>
            質問を追加
          </button>
        </div>
        <div className={"form-action-wrapper"}>
          <button type="submit">保存</button>
        </div>
      </form>
    </div>
  );
}

export default Survey;
