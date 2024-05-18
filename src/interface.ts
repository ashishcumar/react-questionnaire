export interface QUESTION {
  code?: string;
  main_question: string;
  question_description?: string | null;
  response_type:
    | "bool"
    | "text"
    | "number"
    | "dropdown"
    | "textArea"
    | "date"
    | string;
  value: string | boolean | number | object | null;
  sub_ques?: QUESTION[];
  question_for?: string[] | null;
  is_mandatory: boolean | number;
  options?: { label: string; value: any }[];
  min?: number;
  max?: number;
  regex?: string;
  multi_select?: boolean;
}

export interface CONFIG {
  isSingle: boolean;
  setResponse: React.Dispatch<
    React.SetStateAction<QUESTION[] | { [key: string]: QUESTION[] } | undefined>
  >;
  memberArray?: string[];
  globalStyle?: {
    question?: React.CSSProperties;
    subQuestion?: React.CSSProperties;
    description?: React.CSSProperties;
    toggleButton?: React.CSSProperties;
    inputSelectStyle?: React.CSSProperties;
    toggleButtonContainer?: React.CSSProperties;
    questionContainer?: React.CSSProperties;
    toggleBtnTheme?: {
      primary: string;
      secondary?: string;
    };
  };
}
