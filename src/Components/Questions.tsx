import { useState } from "react";
import { QUESTION } from "../interface";
import { FieldValues, UseFormReturn } from "react-hook-form";
import {
  Box,
  Button,
  Flex,
  Grid,
  SystemStyleObject,
  Text,
} from "@chakra-ui/react";
import ResponseField from "./ResponseField";

function Questions({
  qutestionObject,
  form,
  isSingle,
  memberArray,
  inputSelectStyle,
}: Readonly<{
  qutestionObject: QUESTION;
  form: UseFormReturn<FieldValues, any, undefined>;
  isSingle: boolean;
  memberArray?: string[];
  inputSelectStyle?: SystemStyleObject | undefined;
}>) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<string[]>([]);

  const handleMemberSelection = (member: string) => {
    if (selectedMember.includes(member)) {
      setSelectedMember(selectedMember.filter((m) => m !== member));
      const keyToUnregisterAgain = Object.keys(form.getValues()).filter(
        (quesCode) => quesCode.startsWith(member) || quesCode === member
      );
      keyToUnregisterAgain.forEach((key) => {
        form.unregister(key);
      });
    } else {
      setSelectedMember([...selectedMember, member]);
    }
  };
  

  if (!isSingle && memberArray?.length === 0) {
    throw new Error("Member array is empty");
  }
  return (
    <Grid
      sx={{
        border: "1px dashed grey",
        margin: "12px 0",
        padding: "12px 12px 12px 24px",
        background: "white",
        borderRadius: "8px",
      }}
    >
      <Flex
        sx={{
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ width: "60%" }}>
          <Text fontSize={"medium"}>
           {qutestionObject.main_question}
          </Text>
          <Text fontSize={"small"}>
            {qutestionObject.question_description
              ? qutestionObject.question_description
              : `Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.  `}
          </Text>
        </Box>
        <Flex sx={{ justifyContent: "end", alignItems: "center" }}>
          <ResponseField
            qutestionObject={qutestionObject}
            form={form}
            setIsCollapsed={setIsCollapsed}
            inputSelectStyle={inputSelectStyle}
          />
        </Flex>
      </Flex>
      {isSingle ? (
        <>
          {isCollapsed && qutestionObject?.sub_ques?.length > 0
            ? qutestionObject?.sub_ques?.map((subQuestion) => {
                return (
                  <Questions
                    form={form}
                    qutestionObject={subQuestion}
                    key={subQuestion.code}
                    isSingle={isSingle}
                    memberArray={memberArray}
                    inputSelectStyle={inputSelectStyle}
                  />
                );
              })
            : null}
        </>
      ) : null}

      {!isSingle && isCollapsed ? (
        <Grid sx={{ margin: "12px 0", padding: "12px" }}>
          <Flex sx={{ gap: "8px" }}>
            {qutestionObject?.sub_ques.length
              ? memberArray?.map((mem) => {
                  return (
                    <Button
                      key={mem}
                      onClick={() => handleMemberSelection(mem)}
                      width={"fit-content"}
                      sx={{
                        margin: "12px 0",
                        background: selectedMember.includes(mem)
                          ? "#edf2f7"
                          : "white",
                        border: `1px solid #edf2f7`,
                      }}
                    >
                      {mem}
                    </Button>
                  );
                })
              : null}
          </Flex>
          {selectedMember.length
            ? selectedMember.map((mem) => {
                return (
                  <>
                    <Text
                      fontSize={"medium"}
                      fontWeight={"bold"}
                      paddingLeft={"24px"}
                    >
                      {mem}
                    </Text>
                    {qutestionObject?.sub_ques?.length > 0
                      ? qutestionObject?.sub_ques?.map((subQuestion) => {
                          return (
                            <Questions
                              form={form}
                              qutestionObject={{
                                ...subQuestion,
                                code: `${mem}-${subQuestion.code}`,
                              }}
                              key={subQuestion.code}
                              isSingle={isSingle}
                              memberArray={memberArray}
                              inputSelectStyle={inputSelectStyle}
                            />
                          );
                        })
                      : null}
                  </>
                );
              })
            : null}
        </Grid>
      ) : null}
    </Grid>
  );
}

export default Questions;
