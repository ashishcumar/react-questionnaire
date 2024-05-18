import { Box, Heading, UnorderedList, ListItem } from "@chakra-ui/react";

const UseCases = () => {
  return (
    <Box padding="20px">
      <Heading as="h2" size="md" mb="4">
        Use Cases:
      </Heading>
      <UnorderedList>
        <ListItem>
          <strong>Surveys</strong>: Create feedback forms to gather user
          opinions and insights on products, services, or events.
        </ListItem>
        <ListItem>
          <strong>Quizzes</strong>: Develop educational quizzes for students or
          training programs, incorporating multiple-choice, true/false, and
          open-ended questions.
        </ListItem>
        <ListItem>
          <strong>Questionnaire</strong>: Create custom questionnaires.
        </ListItem>
      </UnorderedList>
    </Box>
  );
};

export default UseCases;
