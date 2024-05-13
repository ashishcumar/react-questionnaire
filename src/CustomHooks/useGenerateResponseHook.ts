import { QUESTION } from "../interface";

const useGenerateResponseHook = () => {
  const generateResponse = (
    response: { [key: string]: any },
    questionState: QUESTION[]
  ) => {
    const updateValues = (obj: QUESTION, res: { [key: string]: any }) => {
      if (res[obj?.code as string]) {
        obj.value = res[obj?.code as string];
      }
      if (obj.sub_ques && obj.sub_ques.length > 0) {
        obj.sub_ques.forEach((sub) => updateValues(sub, res));
      }
      return obj;
    };
    const res = questionState?.map((obj) => updateValues({ ...obj }, response));
    return res;
  };

  const restructureObject = (res: { [key: string]: any }) => {
    const resKeys = Object.keys(res);
    const uniqueMemberHash: { [key: string]: string } = {};
    const resWithoutKeyName: string[] = [];
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

  const generateResponseForMember = (
    response: { [key: string]: any },
    data: QUESTION[]
  ) => {
    const { res, uniqueMemberHash } = restructureObject(response);
    const temp: { [key: string]: QUESTION[] } = {};
    const updateValues = (
      obj: QUESTION,
      res: { [key: string]: any },
      member: string
    ) => {
      const tempCode = `${member}-${obj?.code}`;
      if (res[tempCode]) {
        obj.value = res[tempCode];
      }
      if (obj.sub_ques && obj.sub_ques.length > 0) {
        obj.sub_ques.forEach((sub) => updateValues(sub, res, member));
      }
      return obj;
    };
    Object.keys(uniqueMemberHash).forEach((member) => {
      const tempData = structuredClone(data);
      temp[member] = tempData?.map((obj) =>
        updateValues({ ...obj }, res, member)
      );
    });

    return temp;
  };

  return { generateResponse, generateResponseForMember };
};

export default useGenerateResponseHook;
