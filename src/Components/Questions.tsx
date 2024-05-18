import { useEffect, useState } from "react";
import { CONFIG, QUESTION } from "../interface";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import ResponseField from "./ResponseField";
import { useMediaQuery } from "@chakra-ui/react";

function Questions({
  qutestionObject,
  form,
  isSingle,
  memberArray,
  globalStyle,
  currMember,
  questionId,
}: Readonly<{
  qutestionObject: QUESTION;
  form: UseFormReturn<FieldValues, any, undefined>;
  isSingle: boolean;
  memberArray?: string[];
  globalStyle?: CONFIG["globalStyle"];
  currMember?: string;
  questionId?: string;
}>) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<string[]>([]);
  const [isMobile] = useMediaQuery("(max-width: 400px)");

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

  useEffect(() => {
    if (!isCollapsed) {
      setSelectedMember([]);
    }
  }, [isCollapsed]);

  if (!isSingle && memberArray?.length === 0) {
    throw new Error("Member array is empty");
  }

  return (
    <Grid
      sx={
        globalStyle?.questionContainer
          ? globalStyle?.questionContainer
          : {
              margin: isMobile ? "8px 0" : "12px 0",
              padding: "12px",
              background: "white",
              borderRadius: "8px",
              boxShadow: "inset 0px 0px 6px rgba(0, 0, 0, 0.1)",
            }
      }
    >
      <Flex
        sx={{
          justifyContent: "space-between",
          alignItems: isMobile ? "" : "flex-start",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <Box sx={{ width: isMobile ? "100%" : "60%" }}>
          <Text
            sx={
              globalStyle?.question
                ? globalStyle?.question
                : { fontSize: "medium", fontWeight: "bold" }
            }
          >
            {questionId ? `${questionId}. ` : ""}
            {qutestionObject.main_question}
          </Text>
          <Text
            sx={
              globalStyle?.description
                ? globalStyle?.description
                : { fontSize: "sm", color: "gray.600" }
            }
          >
            {qutestionObject.question_description
              ? qutestionObject.question_description
              : ``}
          </Text>
        </Box>
        <Flex
          sx={{
            justifyContent: "end",
            alignItems: "center",
            margin: isMobile ? "8px" : 0,
            width: isMobile ? "100%" : "40%",
          }}
        >
          <ResponseField
            qutestionObject={qutestionObject}
            form={form}
            setIsCollapsed={setIsCollapsed}
            inputSelectStyle={globalStyle?.inputSelectStyle}
            toggleButtonContainer={globalStyle?.toggleButtonContainer}
            toggleButton={globalStyle?.toggleButton}
            toggleBtnTheme={globalStyle?.toggleBtnTheme}
          />
        </Flex>
      </Flex>
      {isSingle ? (
        <>
          {isCollapsed &&
          qutestionObject?.sub_ques?.length &&
          Number(qutestionObject?.sub_ques?.length) > 0
            ? qutestionObject?.sub_ques?.map((subQuestion, i) => {
                return (
                  <Questions
                    form={form}
                    qutestionObject={{
                      ...subQuestion,
                      code: currMember
                        ? `${currMember}-${subQuestion.code}`
                        : subQuestion.code,
                    }}
                    key={subQuestion.code}
                    isSingle={isSingle}
                    memberArray={memberArray}
                    globalStyle={globalStyle}
                    currMember={currMember ? currMember : ""}
                    questionId={questionId ? `${questionId}.${i + 1}` : "1"}
                  />
                );
              })
            : null}
        </>
      ) : null}

      {!isSingle && isCollapsed ? (
        <Grid sx={{ margin: "12px 0", padding: isMobile ? 0 : "12px" }}>
          <Text sx={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}>
            Select Member
          </Text>
          <Flex sx={{ gap: "8px" }}>
            {qutestionObject?.sub_ques?.length
              ? memberArray?.map((mem) => {
                  return (
                    <Button
                      key={mem}
                      onClick={() => handleMemberSelection(mem)}
                      width={"fit-content"}
                      sx={{
                        margin: isMobile ? "8px 0" : "12px 0",
                        background: selectedMember.includes(mem)
                          ? globalStyle?.toggleBtnTheme?.primary || "#319795"
                          : globalStyle?.toggleBtnTheme?.secondary || "white",
                        border: `1px solid #edf2f7`,
                        color: selectedMember.includes(mem)
                          ? globalStyle?.toggleBtnTheme?.secondary || "white"
                          : globalStyle?.toggleBtnTheme?.primary || "black",
                        "&:hover": {
                          background:
                            globalStyle?.toggleBtnTheme?.primary || "#319795",
                          color:
                            globalStyle?.toggleBtnTheme?.secondary || "white",
                        },
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
                      fontSize={"large"}
                      fontWeight={"bold"}
                      paddingLeft={"12px"}
                    >
                      {mem}
                    </Text>
                    {qutestionObject?.sub_ques?.length &&
                    Number(qutestionObject?.sub_ques?.length) > 0
                      ? qutestionObject?.sub_ques?.map((subQuestion, i) => {
                          return (
                            <Questions
                              form={form}
                              qutestionObject={{
                                ...subQuestion,
                                code: `${mem}-${subQuestion.code}`,
                              }}
                              key={subQuestion.code}
                              isSingle={true}
                              memberArray={memberArray}
                              globalStyle={globalStyle}
                              currMember={mem}
                              questionId={
                                questionId ? `${questionId}.${i + 1}` : "1"
                              }
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
