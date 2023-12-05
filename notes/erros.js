/*

*** IN THIS ERROR, I PASSED IN FALSE INTO THE mockRejectedValue(false) function and it printed this error massage: { node:internal/process/promises:288
            triggerUncaughtException(err, true * fromPromise *);
            ^

[UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "false".] {
  code: 'ERR_UNHANDLED_REJECTION'
}
*** when i used UrlModel.findOne = jest.fn().mockResolvedValue(false), the finction was called once this time but it reponded with a 500 status code.
 when i used validUrl.isUri = jest.fn().mockResolvedValue(invalidLongUrl), the finction was called once this time but it reponded with a 500 status code.;

*** const token = authorization.split(" ")[1]; TypeError: Cannot read properties of undefined (reading 'split'): This error means that the postman need a validtoken.;

***  error: JsonWebTokenError: invalid token: This error means that the bear and token you are to input in postman should not be rapped in a string like this "Bearer tokennnnn"


*/
