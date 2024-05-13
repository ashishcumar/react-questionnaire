import { Box, Button, Text, useClipboard } from "@chakra-ui/react";

function ExpectedJson() {
  const { hasCopied, onCopy } = useClipboard(
    `Interface QUESTION {
  main_question: string;
  question_description?: string | null;
  response_type: "bool" | "text" | "number" | "select";
  value: string | boolean | number | object | null;
  sub_ques?: QUESTION[];
  question_for?: string[] | null;
  is_mandatory: boolean | number;
  options?: { label: string; value: any }[];
  min?: number;
  max?: number;
  regex?: string;
  multi_select?: boolean;
}`
  );

  return (
    <Box padding="20px">
      <Text fontWeight="bold" fontSize="xl" marginBottom="16px">
        Expected Json Structure:
      </Text>
      <Box borderWidth="1px" borderRadius="md" p={4} bgColor="gray.50">
        <Text fontSize="xl" fontWeight="bold" marginBottom="16px">
          QUESTION Interface
        </Text>
        <Box borderWidth="1px" borderRadius="md" p={4} bgColor="white">
          <Text fontSize="sm" color="gray.600" marginBottom="2">
            Interface QUESTION{" "}
            <Button size="xs" variant="outline" onClick={onCopy}>
              {hasCopied ? "Copied" : "Copy"}
            </Button>
          </Text>
          <Text whiteSpace="pre-wrap">{`{
  main_question: string;
  question_description?: string | null;
  response_type: "bool" | "text" | "number" | "select";
  value: string | boolean | number | object | null;
  sub_ques?: QUESTION[];
  question_for?: string[] | null;
  is_mandatory: boolean | number;
  options?: { label: string; value: any }[];
  min?: number;
  max?: number;
  regex?: string;
  multi_select?: boolean;
}`}</Text>
        </Box>
        <Text fontWeight="bold" fontSize="lg" marginTop="20px">
          Notes:
        </Text>
        <Text fontSize="sm">
          Response type only accepts these values: "bool", "text", "number",
          "select".
          <br />
          For <b>"text"</b> response type, users can also share a regex pattern
          for validation.
          <br />
          For <b>"number"</b> response type, users can pass min and max values
          for validation of number.
          <br />
          For <b>"select"</b> response type, users can pass multi_select as true
          to enable multi-select.
          <br />
        </Text>
      </Box>
      <Box
        borderWidth="1px"
        borderRadius="md"
        p={4}
        bgColor="gray.50"
        marginTop="20px"
      >
        <Text fontSize="xl" fontWeight="bold" marginBottom="16px">
          Output Result JSON
        </Text>
        <Box borderWidth="1px" borderRadius="md" p={4} bgColor="white">
          <Text fontSize="sm" color="gray.600" marginBottom="2">
            Interface RESPONSE
          </Text>
          <Text whiteSpace="pre-wrap">{`{
  main_question: string;
  question_description?: string | null;
  response_type: "bool" | "text" | "number" | "select";
  value: string | boolean | number | object | null;  (FIELD GET UPDATED BY USER RESPONSE)
  sub_ques?: QUESTION[];
  question_for?: string[] | null;
  is_mandatory: boolean | number;
  options?: { label: string; value: any }[];
  min?: number;
  max?: number;
  regex?: string;
  multi_select?: boolean;
}`}</Text>
        </Box>
      </Box>
    </Box>
  );
}

export default ExpectedJson;
