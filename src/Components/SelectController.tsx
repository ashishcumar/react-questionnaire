import { Container, SystemStyleObject } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import { QUESTION } from "../interface";

const SelectController = ({
  form,
  questionObject,
  style,
}: {
  form: UseFormReturn<FieldValues, any, undefined>;
  questionObject: QUESTION;
  style?: SystemStyleObject | undefined;
}) => {
  const { control } = form;

  return (
    <Container as="form" sx={{ ...style }}>
      <Controller
        control={control}
        name={questionObject?.code as string}
        rules={{
          required: "Please select at least one",
        }}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { error },
        }) => (
          <Select
            {...(questionObject?.multi_select ? { isMulti: true } : {})}
            name={questionObject.main_question}
            isClearable
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            options={questionObject?.options}
            placeholder="Select Option"
            closeMenuOnSelect={questionObject?.multi_select ? false : true}
          />
        )}
      />
    </Container>
  );
};

export default SelectController;
