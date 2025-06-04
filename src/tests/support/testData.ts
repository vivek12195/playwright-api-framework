export const testData = {
  validUser: {
    email: "eve.holt@reqres.in",
    password: "cityslicka"
  },
  invalidUser: {
    email: "invalid@user.com",
    password: "wrongpass"
  },
  missingPasswordUser: {
    email: "eve.holt@reqres.in",
    password: ""
  },
  missingEmailUser: {
    email: "",
    password: "cityslicka"
  },
  missingEmailAndPasswordUser: {
    email: "",
    password: ""
  },
  invalidPasswordUser: {
    email: "eve.holt@reqres.in",
    password: "wrongpass"
  },
  invalidEmailUser: {
    email: "eveholt@reqres.in",
    password: "cityslicka"
  },
  expectedUserProfile: {
  fullName: 'Janet Weaver',
  email: 'janet.weaver@reqres.in',
}
};
