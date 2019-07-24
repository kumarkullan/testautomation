const fs = require('fs');

//Delete all the HTML Reports,Screenshots and Log information before starting the test 
const del = require('del');
var filepath_HTMLReports = '../TestCafe_tests/Reports/*';
var filepath_ScreenShots = '../TestCafe_tests/Screens/*';
del(filepath_HTMLReports);
del(filepath_ScreenShots);
const createTestCafe = require('testcafe');
let testcafe = null;
let runner = null;
createTestCafe('localhost', 1335, 1336)
  .then(tc => {
    testcafe = tc;
    runner = testcafe.createRunner();

    return runner
    .src([
    // "./testCases/RegressionTests/PaymentScheduleAndHistory/tc_001_validate_DEF_PaymentHistory_Functionalities.ts",
    // "./testCases/RegressionTests/PaymentScheduleAndHistory/tc_002_validate_DEF_PaymentSchedule_Functionalities.ts",
    // "./testCases/RegressionTests/PaymentScheduleAndHistory/tc_003_validate_DEF_PaymentScheduleAndHistory_TaxPaidForLife.ts",
    //"./testCases/RegressionTests/PaymentScheduleAndHistory/tc_004_validate_DEF_PaymentScheduleAndHistory_Overall.ts",
    // "./testCases/RegressionTests/PaymentScheduleAndHistory/tc_005_validate_DEF_PaymentScheduleAndHistory_PaymentStatus.ts",
    // "./testCases/RegressionTests/\MessageCenter/tc_001_validate_MessageCenter_OnlyViewAllRecords_Permission.ts",
    // "./testCases/RegressionTests/\MessageCenter/tc_002_validate_MessageCenterAccessAndPermissions.ts",
      "./testCases/FunctionalTestCases/queryAndDEFFunctionalityCheck.ts"
     
    
    ])
      .browsers(['edge'])
      //.browsers('chrome:headless')       
      //.browsers('chrome')
      //.concurrency(2)
      .screenshots('./screens/', true)
      .reporter('html-testrail')
      .run(
        {
          selectorTimeout: 190000,
          assertionTimeout: 190000,
          pageLoadTimeout: 190000,
        }
      );
  })
  .then(numFailed => {
    console.log('finished with ', numFailed, ' errors');
    testcafe.close(); 
    if (numFailed) {
      process.exit(1);
    }
  }, err => {
    console.error(err);
    testcafe.close();
    process.exit(1);
  });
