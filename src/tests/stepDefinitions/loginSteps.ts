import { Given, When, Then, Before } from '@cucumber/cucumber';
import assert from 'assert';
import { testData } from '../support/testData';
import { retry } from '../support/retry';
import { request, expect, PlaywrightTestConfig, APIRequestContext } from '@playwright/test';
import playwrightConfig from '../../../playwright.config';



Before(async function () {
  const config = playwrightConfig as PlaywrightTestConfig;

  const requestContext = await request.newContext({
    extraHTTPHeaders: {
      'x-api-key': 'reqres-free-v1'
    },
    ignoreHTTPSErrors: true,
    baseURL: config.use?.baseURL,
  });

  this.apiContext = requestContext;
});


Given('I have {string} user credentials', async function (credentials: string) {
switch(credentials) {
case 'valid':
    this.credentials = testData.validUser;
    break;
case 'invalid':
    this.credentials = testData.invalidUser;
    break;
case 'missing':
    this.credentials = testData.missingEmailAndPasswordUser;
    break;
case 'missing password':
    this.credentials = testData.missingPasswordUser;
    break;
case 'missing email':
    this.credentials = testData.missingEmailUser;
    break;
case 'invalid password':
    this.credentials = testData.invalidPasswordUser;
    break;
case 'invalid email':
    this.credentials = testData.invalidEmailUser;
    break;
}});

When('I send a login request to the Reqres public API', async function () {
  const { status, data, raw } = await performLogin(this.apiContext, this.credentials);
  // Store response in custom world
  this.loginResponse = { status, data, raw };

  // Use validator to extract token or error
  const result = validateLoginResponse(status, data, raw);
  this.token = result.token;
  this.error = result.error;
});

export async function performLogin(
  apiContext: APIRequestContext,
  credentials: { email: string; password: string }
): Promise<{ status: number; data: any; raw: string }> {
  return retry(async () => {
    const response = await apiContext.post('/api/login', { data: credentials });
    const raw = await response.text();

    // Detect HTML error page
    const isHtml = raw.trim().startsWith('<!DOCTYPE html') || raw.trim().startsWith('<html');
    if (isHtml) {
      console.error('❌ Received HTML instead of JSON:', raw);
      throw new Error('Received HTML instead of JSON');
    }

    try {
      const data = JSON.parse(raw);
      return { status: response.status(), data, raw };
    } catch (err) {
      console.error('❌ Failed to parse response:', raw);
      throw new Error('Failed to parse JSON');
    }
  }, 3, 500); // 3 retries with 500ms delay
  }

  export function validateLoginResponse(
  status: number,
  data: any,
  raw: string
): { token?: string; error?: string } {
  if (!data) {
    console.error('❌ Response body is not valid JSON:', raw);
    return { error: 'Invalid JSON response' };
  }

  if (status >= 200 && status < 300) {
    if (data.token) {
      return { token: data.token };
    } else {
      console.error('❗ Login succeeded but token is missing. Response:', raw);
      return { error: 'Token missing from successful login response' };
    }
  } else {
    const error = data.error || 'An error occurred, but no error message was returned';
    console.error(`❗ Login failed with status ${status}: ${error}`);
    return { error };
  }
}

Then('I should receive a token', async function () {
  const { status, data, raw } = this.loginResponse;
  const result = validateLoginResponse(status, data, raw);

  this.token = result.token;
  this.error = result.error;

  assert.ok(this.token, 'Expected token in response but none was received');

});

Then('I should receive an error message', function () {
  if (!this.error) {
    throw new Error('Expected an error message but none was received');
  }

   assert.ok(this.error, `Expected an error message but got: ${this.error}`);
});

When('I make an API call to retrieve the user profile from Reqres', async function () {
  const response = await this.apiContext.get('/api/users/2', {
  });
  this.profile = await response.json();
});

Then("the user's name and email should be correct", function () {
  const data = this.profile.data;
  const fullName = `${data.first_name} ${data.last_name}`;
  const email = `${data.email}`
  expect(fullName).toBe(testData.expectedUserProfile.fullName);
  expect(email).toBe(testData.expectedUserProfile.email);
});
