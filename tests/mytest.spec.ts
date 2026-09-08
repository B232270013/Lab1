import { test, expect } from '@playwright/test';

// Зөв мэдээллээр нэвтэрч, бүтээгдэхүүний хэсэгт орсныг шалгах
test('Зөв мэдээллээр login хийх', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    // Нэвтрэх мэдээллийг оруулна
    const username = page.getByPlaceholder('Username');
    const password = page.getByPlaceholder('Password');

    await username.fill('standard_user');
    await password.fill('secret_sauce');

    // Login хийх
    await page.getByRole('button', { name: 'Login' }).click();

    // Нэвтэрсний дараа Products гарч ирэхийг шалгана
    const productsTitle = page.locator('.title');
    await expect(productsTitle).toHaveText('Products');

    // Хэрэглэгч inventory хэсэгт орсон эсэхийг шалгана
    await expect(page).toHaveURL(/inventory\.html/);
});


// Буруу нууц үгээр нэвтрэхэд алдаа гарсныг шалгах
test('Буруу password оруулах', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('123456');

    await page.getByRole('button', { name: 'Login' }).click();

    // Алдааны хэсэг гарч ирсэн эсэхийг шалгана
    const errorMessage = page.locator('[data-test="error"]');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
        'Username and password do not match'
    );
});


// Нэвтэрсний дараа бүтээгдэхүүнийг сагсанд нэмэх
test('Бүтээгдэхүүн сагсанд нэмэх', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    // Login хийх
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Products хуудас нээгдсэнийг шалгана
    await expect(page.locator('.title')).toHaveText('Products');

    // Эхний бүтээгдэхүүнийг сонгож сагсанд нэмнэ
    const addButton = page.getByRole('button', { name: 'Add to cart' }).first();
    await addButton.click();

    // Сагсанд 1 бүтээгдэхүүн байгааг шалгана
    const cart = page.locator('.shopping_cart_badge');
    await expect(cart).toHaveText('1');

    // Сагсны badge харагдаж байгаа эсэхийг шалгана
    await expect(cart).toBeVisible();
});

