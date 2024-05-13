import "./App.css";
import { data } from "./Data";
import { useForm } from "react-hook-form";
import Questions from "./Components/Questions";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { QUESTION } from "./interface";
import useGenerateResponseHook from "./CustomHooks/useGenerateResponseHook";
import ExpectedJson from "./Components/ExpectedJson";
import Introduction from "./Components/Introduction";

function App() {
  const questionnairForm = useForm({ mode: "onChange" });
  const [questionState, setQuestionState] = useState<QUESTION[]>();
  const { generateResponse, generateResponseForMember } =
    useGenerateResponseHook();

  const config = {
    isSingle: false,
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
      if (Number(obj?.sub_ques?.length) > 0) {
        updatedObj.sub_ques = updateDataWithCode(
          obj?.sub_ques as QUESTION[],
          code
        );
      }
      return updatedObj;
    });
  };

  useEffect(() => {
    setQuestionState(updateDataWithCode(data));
  }, [data]);

  return (
    <Box style={{ padding: "24px", minHeight: "100vh" }}>
      <Introduction />
      <ExpectedJson />
      <Box
        sx={{
          height: "fit-content",
          padding: "20px",
        }}
      >
        <Text fontWeight="bold" fontSize="xl" marginBottom="16px">
          Form Usage:
        </Text>
        <Accordion
          sx={{ background: "white"}}
          allowMultiple
          defaultIndex={[0, 1]}
        >
          <AccordionItem
            sx={{
              padding: "12px 0",
              border: "none",
              boxShadow: "2px 5px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
              background: "gray.50",
            }}
          >
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontWeight={"bold"}>
                  Single Member (Questionnaire for a single member):
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <form
                onSubmit={questionnairForm.handleSubmit((e) => {
                  if (config.isSingle) {
                    console.log(
                      generateResponse(e, questionState as QUESTION[])
                    );
                  } else {
                    console.log(
                      generateResponseForMember(e, questionState as QUESTION[])
                    );
                  }
                })}
              >
                {questionState?.length
                  ? questionState?.map((questionObject, i) => {
                      return (
                        <Questions
                          key={questionObject.code}
                          qutestionObject={questionObject}
                          form={questionnairForm}
                          isSingle={true}
                          memberArray={config?.memberArray}
                          questionId={(i + 1).toString()}
                        />
                      );
                    })
                  : null}
                <Flex
                  sx={{
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="submit"
                    variant="solid"
                    sx={{
                      margin: "auto",
                      background: "#319795",
                      color: "white",
                      "&:hover": { background: "#2c7a7b" },
                    }}
                  >
                    Submit
                  </Button>
                </Flex>
              </form>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem
            sx={{
              padding: "12px 0",
              border: "none",
              boxShadow: "2px 5px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
              marginTop: "24px",
              background: "gray.50",
            }}
          >
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontWeight={"bold"}>
                  Multiple Member (Questionnaire for multiple members):
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <form
                onSubmit={questionnairForm.handleSubmit((e) => {
                  if (config.isSingle) {
                    console.log(
                      generateResponse(e, questionState as QUESTION[])
                    );
                  } else {
                    console.log(
                      generateResponseForMember(e, questionState as QUESTION[])
                    );
                  }
                })}
              >
                {questionState?.length
                  ? questionState?.map((questionObject, i) => {
                      return (
                        <Questions
                          key={questionObject.code}
                          qutestionObject={questionObject}
                          form={questionnairForm}
                          isSingle={false}
                          memberArray={config?.memberArray}
                          questionId={(i + 1).toString()}
                        />
                      );
                    })
                  : null}
                <Flex
                  sx={{
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="submit"
                    variant="solid"
                    sx={{
                      margin: "auto",
                      background: "#319795",
                      color: "white",
                      "&:hover": { background: "#2c7a7b" },
                    }}
                  >
                    Submit
                  </Button>
                </Flex>
              </form>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
}

export default App;
