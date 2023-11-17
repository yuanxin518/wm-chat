const Result = <T>() => {
  const success = (data?: T, msg?: string) => {
    return {
      success: true,
      data,
      msg,
    };
  };

  const error = (msg?: string) => {
    return {
      success: false,
      msg,
    };
  };

  return { success, error };
};

export default Result;
