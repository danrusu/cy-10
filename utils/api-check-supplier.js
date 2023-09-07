function getApiResponse(...args) {
  return fetch(...args).then(res => res.json());
}

module.exports = {
  valueSupplierFn: getApiResponse,
  valueExpectedConditionFn: response => response?.length > 0,
};
