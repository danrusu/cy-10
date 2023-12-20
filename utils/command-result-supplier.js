const { exec } = require('child_process');

const runCommand = command => {
  return new Promise((res, rej) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        rej(new Error(`error: ${error.message}`));
      }
      if (stderr) {
        rej(new Error(`stderr: ${stderr}`));
      }
      res(stdout);
    });
  });
};

module.exports = {
  valueSupplierFn: runCommand,
  valueExpectedConditionFn: response => response?.includes('success'),
};
