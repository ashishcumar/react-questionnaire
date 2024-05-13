const data = [
  {
    main_question: "Alcohol",
    question_description: null,
    response_type: "bool",
    value: "",
    question_type: "lifestyle",
    sub_ques: [
      {
        main_question: "Substance Consumed",
        question_description: null,
        response_type: "dropdown",
        value: "",
        question_type: "lifestyle",
        sub_ques: [],
        question_for: [],
        is_mandatory: 1,
        options: [
          {
            label: "Hard Liquor",
            value: "Hard Liquor",
          },
          {
            label: "Beer",
            value: "Beer",
          },
          {
            label: "Wine",
            value: "Wine",
          },
        ],
        multi_select: true,
        code: "1_0",
      },
      {
        main_question: "Exact Diagnosis",
        question_description: null,
        response_type: "text",
        value: "",
        question_type: "medical",
        sub_ques: [],
        question_for: [],
        is_mandatory: 1,
        code: "1_1",
      },
      {
        main_question: "Diagnosis Date",
        question_description: null,
        response_type: "date",
        value: "",
        question_type: "medical",
        sub_ques: [],
        question_for: [],
        is_mandatory: 1,
        code: "1_2",
      },
      {
        main_question: "Quantity(in ml)",
        question_description: "",
        response_type: "number",
        value: "",
        question_type: "lifestyle",
        sub_ques: [],
        question_for: ["self", "spouse", "son", "daughter", "mother", "father"],
        is_mandatory: 1,
        min: 1,
        max: 10,
        code: "1_3",
      },
    ],
    question_for: [],
    is_mandatory: 0,
    code: "1",
  },
  {
    main_question: "Has planned a surgery ?",
    question_description: null,
    response_type: "bool",
    value: "",
    question_type: "medical",
    sub_ques: [
      {
        main_question: "Exact Diagnosis",
        question_description: null,
        response_type: "bool",
        value: "",
        question_type: "medical",
        sub_ques: [
          {
            main_question: "Diagnosis Date",
            question_description: null,
            response_type: "bool",
            value: "",
            question_type: "medical",
            sub_ques: [
              {
                main_question: "Consultation Date",
                question_description: null,
                response_type: "date",
                value: "",
                question_type: "medical",
                sub_ques: [],
                question_for: [],
                is_mandatory: 1,
                code: "2_0_0_0",
              },
            ],
            question_for: [],
            is_mandatory: 1,
            code: "2_0_0",
          },
        ],
        question_for: [],
        is_mandatory: 1,
        code: "2_0",
      },
    ],
    question_for: [],
    is_mandatory: 0,
    code: "2",
  },
];

const res = {
  1: true,
  2: true,
  3: false,
  "Member 1-1_0": [
    {
      label: "Hard Liquor",
      value: "Hard Liquor",
    },
    {
      label: "Beer",
      value: "Beer",
    },
    {
      label: "Wine",
      value: "Wine",
    },
  ],
  "Member 1-1_1": "Exact Diagnois",
  "Member 1-1_2": "2024-05-14",
  "Member 1-1_3": "3",
  "Member 2-2_0": true,
  "Member 2-2_0_0": true,
  "Member 2-2_0_0_0": "2017-02-16",
};

const restructureObject = (res) => {
  const resKeys = Object.keys(res);
  const uniqueMemberHash = {};
  const resWithoutKeyName = [];
  resKeys.forEach((key) => {
    const keySplit = key.split("-");
    if (keySplit.length > 1) {
      uniqueMemberHash[keySplit[0]] = "";
    } else {
      resWithoutKeyName.push(key);
    }
  });
  Object.keys(uniqueMemberHash).forEach((member) => {
    resWithoutKeyName.forEach((key) => {
      const temp = `${member}-${key}`;
      if (resKeys.some((key) => key.startsWith(temp))) {
        res[temp] = res[key];
        delete res[key];
      }
    });
  });

  return { res, uniqueMemberHash };
};

const { res: response, uniqueMemberHash } = restructureObject(res);

const generateResponse = (response, membersObject) => {
  const temp = {};
  const updateValues = (obj, res, member) => {
    const tempCode = `${member}-${obj?.code}`;
    if (res[tempCode]) {
      obj.value = res[tempCode];
    }
    if (obj.sub_ques && obj.sub_ques.length > 0) {
      obj.sub_ques.forEach((sub) => updateValues(sub, res, member));
    }
    return obj;
  };
  Object.keys(membersObject).forEach((member) => {
    const tempData = structuredClone(data);
    temp[member] = tempData?.map((obj) =>
      updateValues({ ...obj }, response, member)
    );
  });

  console.log(temp);
};

generateResponse(response, uniqueMemberHash);
