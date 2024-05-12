import "./App.css";
import { data } from "./Data";
import { useForm } from "react-hook-form";
import Questions from "./Components/Questions";
import {
  Button,
  Grid,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { QUESTION } from "./interface";
/*
questionnaire = Array of object
config = Object = {
  isSingle: boolean,
  memberArray: Array,
  setResponse:React.Dispatch<React.SetStateAction<QUESTION[] | undefined>>,
  globalStyle:Object = {
    toggleButtonContainer: Object
    toggleButton: Object
    Question:Object
    subQuestion: Object
    description:Object
    responseFieldStyle
  }
}
*/
function App() {
  const questionnairForm = useForm({ mode: "onChange" });
  const [questionState, setQuestionState] = useState<QUESTION[]>();
  const isSingle = true;
  const memberArray = ["Member 1", "Member 2"];

  const config = {
    isSingle: true,
    memberArray: ["Member 1", "Member 2"],
    setResponse: () => {},
    globalStyle: {
      question: {},
      subQuestion: {},
      description: {},
      toggleButton: {},
      inputSelectStyle: {},
      toggleButtonContainer: {},
    },
  };

  const updateDataWithCode = (data: QUESTION[], parentCode = "") => {
    return data.map((obj, index) => {
      const code = parentCode ? `${parentCode}_${index}` : `${index + 1}`;
      const updatedObj = { ...obj, code };
      if (obj.sub_ques.length > 0) {
        updatedObj.sub_ques = updateDataWithCode(obj.sub_ques, code);
      }
      return updatedObj;
    });
  };

  useEffect(() => {
    setQuestionState(updateDataWithCode(data));
  }, [data]);

  const generateResponse = (response: { [key: string]: unknown }) => {
    console.log("generateResponse --->", response);
  };

  return (
    <Grid
      style={{ background: "#EDF2F7", padding: "24px", minHeight: "100vh" }}
    >
      <Text
        fontSize={"x-large"}
        fontWeight={"bold"}
        textAlign={"center"}
        margin={"36px 0"}
        textDecoration={"underline"}
      >
        React - Questionnaire
      </Text>
      <form onSubmit={questionnairForm.handleSubmit(generateResponse)}>
        {questionState?.length
          ? questionState?.map((questionObject) => {
              return (
                <Questions
                  key={questionObject.code}
                  qutestionObject={questionObject}
                  form={questionnairForm}
                  isSingle={isSingle}
                  memberArray={memberArray}
                  // responseFieldStyle={}
                />
              );
            })
          : null}
        <Button type="submit" variant="solid">
          Submit
        </Button>
      </form>
    </Grid>
  );
}

export default App;
