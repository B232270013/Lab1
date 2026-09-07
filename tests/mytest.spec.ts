import { test, expect } from '@playwright/test';

test('амжилттай нэвтрэх', async ({ page }) => {

    await page.goto('https://www.saucedemo.com');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Products', { exact: true })).toBeVisible();

    await expect(page).toHaveURL(/inventory.html/);

    await page.getByRole('button', { name: 'Open Menu' }).click();

    await page.getByRole('link', { name: 'Logout' }).click();

    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('амжилтгүй нэвтрэх', async ({ page }) => {

    await page.goto('https://www.saucedemo.com');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_password');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(
        page.getByText(
            'Epic sadface: Username and password do not match any user in this service',
            { exact: true }
        )
    ).toBeVisible();
});

test('нэвтэрсний дараа бараа сагслах', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Products', { exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'Add to cart' }).first().click();

    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();

    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
});
