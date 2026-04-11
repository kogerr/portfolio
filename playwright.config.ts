import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './e2e/tests',
    timeout: 30000,
    expect: { timeout: 5000 },
    fullyParallel: false,
    workers: 1,
    retries: 0,
    use: {
        baseURL: 'http://localhost:3000',
        headless: true,
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
    ],
});
