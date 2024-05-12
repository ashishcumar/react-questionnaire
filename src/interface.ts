export interface QUESTION {
  code?: string;
  main_question: string;
  question_description: string | null;
  response_type: string;
  value: string | boolean | number | null;
  question_type: string;
  sub_ques: QUESTION[];
  question_for: string[] | null;
  is_mandatory: boolean | number;
  options?: { label: string; value: any }[];
  min?: number;
  max?: number;
  regex?: string;
  multi_select?: boolean;
}
