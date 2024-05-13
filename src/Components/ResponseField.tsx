import {
  Box,
  Button,
  Grid,
  Input,
  SystemStyleObject,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { QUESTION } from "../interface";
import SelectController from "./SelectController";
import { reactHookFormErrMsg } from "../ErrorMessages";

function ResponseField({
  qutestionObject,
  form,
  setIsCollapsed,
  inputSelectStyle,
}: Readonly<{
  qutestionObject: QUESTION;
  form: UseFormReturn<FieldValues, any, undefined>;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  inputSelectStyle?: SystemStyleObject | undefined;
}>) {
  const { code, response_type, is_mandatory, regex, min, max } =
    qutestionObject;
  const errroType = form.formState.errors[code as string]?.type;

  const [toggle, setToggle] = useState<boolean>(false);
  const handleButtonClick = (value: boolean) => {
    form.setValue(code as string, value);
    setIsCollapsed(value);
    setToggle(value);
    if (form.formState.errors[code as string]) {
      form.clearErrors(code as string);
    }
    if (!value) {
      let keyToUnregisterAgain = Object.keys(form.getValues()).filter(
        (quesCode) =>
          quesCode.startsWith(code as string) ||
          quesCode === code ||
          (quesCode.includes("-") &&
            quesCode.split("-")[1].startsWith(code as string))
      );
      keyToUnregisterAgain.forEach((key) => {
        form.unregister(key);
      });
    }
  };

  if (!["bool", "text", "number", "date", "dropdown"].includes(response_type))
    throw new Error("Invalid response type");

  if (response_type === "bool") {
    return (
      <Grid>
        <Grid
          sx={{
            width: "200px",
            gridTemplateColumns: "1fr 1fr",
            border: `1px solid #EDF2F7`,
            borderRadius: "8px",
            overflow: "hidden",
          }}
          {...form.register(code as string, {
            required: !!is_mandatory,
          })}
        >
          <Button
            variant={"solid"}
            onClick={() => handleButtonClick(true)}
            sx={{
              borderRadius: "8px 0 0 8px",
              padding: "0 24px",
              color: toggle ? "white" : "black",
              background: toggle ? "#319795" : "White",
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => handleButtonClick(false)}
            sx={{
              borderRadius: "0 8px 8px 0",
              padding: "0 24px",
              color: toggle ? "black" : "white",
              background: toggle ? "white" : "#319795",
            }}
          >
            No
          </Button>
        </Grid>
        {form.formState.errors[code as string] && (
          <Text fontSize={"small"} color={"red"}>
            {reactHookFormErrMsg[errroType as keyof typeof reactHookFormErrMsg]}
          </Text>
        )}
      </Grid>
    );
  }

  if (response_type === "text") {
    return (
      <Box>
        <Input
          type="text"
          placeholder="Your answer here..."
          sx={{
            ...(inputSelectStyle
              ? inputSelectStyle
              : {
                  width: "200px",
                  border: `1px solid #EDF2F7`,
                }),
          }}
          {...form.register(code as string, {
            required: !!is_mandatory,
            ...(regex ? { pattern: new RegExp(regex) } : {}),
          })}
        />
        {form.formState.errors[code as string] && (
          <Text fontSize={"small"} color={"red"}>
            {reactHookFormErrMsg[errroType as keyof typeof reactHookFormErrMsg]}
          </Text>
        )}
      </Box>
    );
  }
  if (response_type === "number") {
    return (
      <Box>
        <Input
          type="number"
          placeholder="Your answer here..."
          sx={{
            ...(inputSelectStyle
              ? inputSelectStyle
              : {
                  width: "200px",
                  border: `1px solid #EDF2F7`,
                }),
          }}
          {...form.register(code as string, {
            required: !!is_mandatory,
            min: min ? min : 0,
            ...(max ? { max } : {}),
          })}
        />
        {form.formState.errors[code as string] && (
          <Text fontSize={"small"} color={"red"}>
            {reactHookFormErrMsg[errroType as keyof typeof reactHookFormErrMsg]}
          </Text>
        )}
      </Box>
    );
  }
  if (response_type === "date") {
    return (
      <Box>
        <Input
          type="date"
          sx={{
            ...(inputSelectStyle
              ? inputSelectStyle
              : {
                  width: "200px",
                  border: `1px solid #EDF2F7`,
                }),
          }}
          {...form.register(code as string, {
            required: !!is_mandatory,
            ...(min ? { min } : {}),
            ...(max ? { max } : {}),
          })}
        />
        {form.formState.errors[code as string] && (
          <Text fontSize={"small"} color={"red"} paddingLeft={"4px"}>
            {reactHookFormErrMsg[errroType as keyof typeof reactHookFormErrMsg]}
          </Text>
        )}
      </Box>
    );
  }

  if (
    response_type === "dropdown" &&
    Number(qutestionObject?.options?.length) > 0
  ) {
    return (
      <Box>
        <SelectController
          form={form}
          questionObject={qutestionObject}
          key={qutestionObject.code}
          style={inputSelectStyle}
        />
        {form.formState.errors[code as string] && (
          <Text fontSize={"small"} color={"red"}>
            {reactHookFormErrMsg[errroType as keyof typeof reactHookFormErrMsg]}
          </Text>
        )}
      </Box>
    );
  }
}

export default ResponseField;
