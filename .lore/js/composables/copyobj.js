const copyObject = (obj) => {
  let result = {};
  Object.entries(obj).forEach(([key, value]) => {
    result[key] = value;
  });
  return result;
};
