import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";

function Introduction() {
  return (
    <>
      <Text
        fontSize="36px"
        fontWeight="bold"
        textAlign="center"
        textDecoration="underline"
        width="100%"
        marginTop="50px"
        marginBottom="30px"
      >
        React - Questionnaire
      </Text>
      <Box padding="20px">
        <Box marginBottom="24px">
          <Text fontWeight="bold" fontSize="xl" margin="16px 0">
            Introduction:
          </Text>
          <Text fontSize="lg" marginBottom="8px">
            Welcome to the React Questionnaire Package! 🚀
          </Text>
          <Text fontSize="md">
            The React Questionnaire Package is your all-in-one solution for
            building dynamic and interactive surveys, quizzes, feedback forms,
            and more within your React applications. 📊✨. It reduces developer
            time by simplifying the implementation of complex logic and handling
            error cases effectively. ⏱️🛠️
          </Text>
        </Box>

        <Box>
          <Text fontWeight="bold" fontSize="xl" marginBottom="16px">
            Features:
          </Text>
          <UnorderedList>
            <ListItem>
              <b>Dynamic Forms:</b> Easily create dynamic and interactive forms
              with nested questions.
            </ListItem>
            <ListItem>
              <b>Survey Component:</b> Build engaging surveys and questionnaires
              for your users.
            </ListItem>
            <ListItem>
              <b>React Hook Form Integration:</b> Seamlessly integrate with
              React Hook Form for efficient state management and validation.
            </ListItem>
            <ListItem>
              <b>Custom Styling:</b> Customize the appearance of your forms to
              match your application's design.
            </ListItem>
            <ListItem>
              <b>Accessible UX:</b> Prioritize accessibility with an accessible
              user experience out-of-the-box.
            </ListItem>
            <ListItem>
              <b>Responsive Design:</b> Ensure a seamless experience across
              devices with responsive design.
            </ListItem>
            <ListItem>
              <b>Efficient State Management:</b> Manage form state efficiently
              for optimal performance.
            </ListItem>
            <ListItem>
              <b>Form Validation:</b> Validate form data to ensure accuracy and
              data integrity.
            </ListItem>
            <ListItem>
              <b>User Engagement:</b> Engage users with interactive forms and
              surveys.
            </ListItem>
            <ListItem>
              <b>Scalable Solution:</b> Scalable and suitable for projects of
              all sizes.
            </ListItem>
            <ListItem>
              <b>Extensible Components:</b> Extend and customize components to
              suit your specific needs.
            </ListItem>
            <ListItem>
              <b>Feedback Forms:</b> Gather valuable user feedback with
              customizable feedback forms.
            </ListItem>
            <ListItem>
              <b>Quiz Component:</b> Create quizzes for assessments or
              educational purposes.
            </ListItem>
            <ListItem>
              <b>Mobile-friendly Forms:</b> Ensure a smooth experience on mobile
              devices.
            </ListItem>
            <ListItem>
              <b>Error Handling:</b> Handle errors gracefully to enhance the
              user experience.
            </ListItem>
          </UnorderedList>
        </Box>
      </Box>
    </>
  );
}

export default Introduction;
