import { APIRequestContext } from '@playwright/test';


/**
 * The custom World object shared across step definitions in each scenario.
 * Cucumber creates a new instance of this class for each scenario.
 */
export class customWorld {
  
   // The Playwright API request context, injected from the Before hook.
   
  apiContext!: APIRequestContext;

  // The credentials used in the scenario, set from step definitions.

  credentials: { email: string; password: string } = { email: '', password: '' };

  
   // The authentication token returned from a successful login.
   
  token: string = '';

  
   // The error message returned from a failed login.
   
  error: string = '';

  
   // The last response object from the API.
   
  lastResponse: any;

  
   // The parsed user profile data after login.
   
  profile: any;

  constructor(apiContext?: APIRequestContext) {
    if (apiContext) {
      this.apiContext = apiContext;
    }
  }
}
