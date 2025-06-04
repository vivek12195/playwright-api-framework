import {
  BeforeAll,
  Before,
  After,
  AfterAll,
  setDefaultTimeout,
  ITestCaseHookParameter,
} from '@cucumber/cucumber';
import { request, APIRequestContext, defineConfig, PlaywrightTestConfig } from '@playwright/test';
import { customWorld } from './world';
import playwrightConfig from '../../../playwright.config';

let apiRequestContext: APIRequestContext;

setDefaultTimeout(30 * 1000);

BeforeAll(async function () {
  console.log('⚙️  Setting up shared API context...');
  const baseURL = (playwrightConfig as PlaywrightTestConfig).use?.baseURL;

  if (!baseURL) {
    throw new Error("Base URL not defined in Playwright config");
  }
  apiRequestContext = await request.newContext({baseURL})
});

Before(async function (this: customWorld, { pickle }: ITestCaseHookParameter) {
  this.apiContext = apiRequestContext;
  console.log(`🚀 Starting scenario: ${pickle.name}`);
});

After(async function (this: customWorld, { pickle, result }: ITestCaseHookParameter) {
  if (result?.status === 'FAILED') {
    console.error(`❌ FAILED: ${pickle.name}`);
    if (this.lastResponse) {
      const body = await this.lastResponse.text();
      console.error(`📄 Response body: ${body}`);
    }
  } else {
    console.log(`✅ PASSED: ${pickle.name}`);
  }
});

AfterAll(async function () {
  console.log('🧹 Disposing API context...');
  await apiRequestContext.dispose();
});
