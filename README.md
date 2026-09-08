# F.CSA313 — Лаборатори №1

## UI автомат тест — Playwright

* **Оюутан:** Б.Мөнгөншагай
* **Оюутны код:** B232270013
* **Хичээл:** F.CSA313 — Программ хангамжийн чанарын баталгаа ба туршилт

---

## 1. Лабораторийн ажлын зорилго

Энэхүү лабораторийн ажлын зорилго нь Playwright ашиглан веб application-ийн UI автомат тест боловсруулах үндсэн аргачлалыг судалж, практикт хэрэгжүүлэхэд оршино.

Лабораторийн хүрээнд SauceDemo веб application дээр хэрэглэгчийн login хийх, буруу мэдээлэл оруулах үед алдаа шалгах болон бүтээгдэхүүнийг shopping cart-д нэмэх үйлдлүүдийг автоматжуулан тестэлсэн.

Мөн Playwright-ийн locator, assertion, Codegen, Trace Viewer болон test isolation зэрэг боломжуудыг ашиглаж үзсэн.

---

## 2. Ашигласан технологи

* **Playwright**
* **TypeScript**
* **Node.js**
* **npm**
* **Chromium**
* **Git / GitHub**
* **IntelliJ IDEA**

Тест хийх веб сайт:

```text
https://www.saucedemo.com/
```

---

## 3. Тестийн орчин

Playwright төслийг TypeScript ашиглан тохируулж, тестүүдийг Chromium browser дээр ажиллуулсан.

Төслийн үндсэн бүтэц:

```text
F.CSA313/
├── tests/
│   └── mytest.spec.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md
```

Тестийн үндсэн код нь:

```text
tests/mytest.spec.ts
```

файлд байрлана.

---

## 4. Хийсэн автомат тестүүд

### 4.1 Зөв мэдээллээр login хийх

Энэ тестээр хэрэглэгч зөв username болон password ашиглан SauceDemo системд амжилттай нэвтэрч байгаа эсэхийг шалгасан.

Тестийн дараалал:

1. SauceDemo сайтыг нээх
2. Username хэсэгт `standard_user` оруулах
3. Password хэсэгт `secret_sauce` оруулах
4. Login товчийг дарах
5. `Products` гарчиг гарч ирсэн эсэхийг шалгах
6. URL нь `inventory.html` хэсэгт шилжсэн эсэхийг шалгах

Ашигласан assertion:

```typescript
await expect(page.locator('.title')).toHaveText('Products');
await expect(page).toHaveURL(/inventory\.html/);
```

Ингэснээр хэрэглэгч зөв мэдээллээр нэвтэрсний дараа бүтээгдэхүүний inventory хэсэгт амжилттай орсон эсэхийг баталгаажуулсан.

---

### 4.2 Буруу password оруулах тест

Энэ тестээр хэрэглэгч буруу нууц үг оруулсан үед систем алдааны message харуулж байгаа эсэхийг шалгасан.

Тестийн үед:

```text
Username: standard_user
Password: 123456
```

гэсэн мэдээллийг ашигласан.

Login хийсний дараа error message гарч байгаа эсэхийг:

```typescript
await expect(errorMessage).toBeVisible();
```

гэж шалгасан.

Мөн алдааны message зөв тексттэй эсэхийг:

```typescript
await expect(errorMessage).toContainText(
    'Username and password do not match'
);
```

гэж баталгаажуулсан.

Ингэснээр буруу password ашигласан үед систем хэрэглэгчид алдааны мэдээлэл зөв харуулж байгаа эсэхийг тестэлсэн.

---

### 4.3 Бүтээгдэхүүнийг сагсанд нэмэх тест

Энэ тестээр хэрэглэгч зөв мэдээллээр системд нэвтэрсний дараа бүтээгдэхүүнийг shopping cart-д нэмэх боломжтой эсэхийг шалгасан.

Тестийн үндсэн дараалал:

1. SauceDemo сайтыг нээх
2. `standard_user` хэрэглэгчээр нэвтрэх
3. Password оруулах
4. Login хийх
5. `Products` хуудас нээгдсэн эсэхийг шалгах
6. Эхний `Add to cart` товчийг дарах
7. Shopping cart дээр `1` гэсэн badge гарсан эсэхийг шалгах
8. Badge харагдаж байгаа эсэхийг баталгаажуулах

Энэ тестээр бүтээгдэхүүн сагсанд амжилттай нэмэгдсэн эсэхийг шалгасан.

---

## 5. Locator ашигласан байдал

Тестийн үед веб хуудасны элементүүдийг олохын тулд Playwright-ийн locator-уудыг ашигласан.

### `getByPlaceholder()`

Login хийх үед username болон password талбаруудыг:

```typescript
page.getByPlaceholder('Username')
page.getByPlaceholder('Password')
```

гэж сонгосон.

Энэ нь тухайн input-ийн placeholder утгаар элементийг тодорхойлж байгаа.

### `getByRole()`

Login болон Add to cart товчийг сонгохдоо:

```typescript
page.getByRole('button', { name: 'Login' })
```

болон:

```typescript
page.getByRole('button', { name: 'Add to cart' }).first()
```

гэж ашигласан.

`getByRole()` нь элементийн зориулалт болон харагдах нэр дээр үндэслэн сонголт хийдэг.

### `locator()`

Products гарчгийг:

```typescript
page.locator('.title')
```

гэж CSS class ашиглан сонгосон.

Мөн login хийх үед гарч ирэх алдааны message-ийг:

```typescript
page.locator('[data-test="error"]')
```

гэж сонгосон.

Shopping cart-ийн badge-ийг:

```typescript
page.locator('.shopping_cart_badge')
```

гэж сонгосон.

Энэ лабораторийн ажилд XPath locator ашиглаагүй.

---

## 6. Assertion ашигласан байдал

Тестийн үйлдэл зөв явагдсан эсэхийг шалгахдаа Playwright-ийн `expect()` assertion ашигласан.

### Products гарчгийг шалгах

```typescript
await expect(page.locator('.title')).toHaveText('Products');
```

Энэ assertion нь login хийсний дараа Products гэсэн гарчиг гарч ирсэн эсэхийг шалгана.

### URL шалгах

```typescript
await expect(page).toHaveURL(/inventory\.html/);
```

Энэ нь хэрэглэгч login хийсний дараа inventory хуудас руу шилжсэн эсэхийг баталгаажуулна.

### Error message шалгах

Буруу password оруулах үед:

```typescript
await expect(errorMessage).toBeVisible();
```

гэж алдааны message харагдаж байгаа эсэхийг шалгасан.

Мөн:

```typescript
await expect(errorMessage).toContainText(
    'Username and password do not match'
);
```

гэж тухайн алдааны message зөв тексттэй байгаа эсэхийг шалгасан.

### Cart шалгах

Бүтээгдэхүүн нэмсний дараа:

```typescript
await expect(cart).toHaveText('1');
```

гэж cart-д нэг бүтээгдэхүүн нэмэгдсэн эсэхийг шалгасан.

Мөн:

```typescript
await expect(cart).toBeVisible();
```

гэж cart badge дэлгэц дээр харагдаж байгаа эсэхийг баталгаажуулсан.

---

## 7. Playwright Codegen

Тест бичих явцад Playwright Codegen ашиглан веб хуудсан дээрх үйлдлүүдэд тохирох кодыг автоматаар үүсгэж туршиж болно.

Codegen ажиллуулах үндсэн команд:

```bash
npx playwright codegen https://www.saucedemo.com/
```

Үүний дараа browser нээгдэж, хийсэн үйлдлүүдэд тохирох Playwright код автоматаар үүснэ.

Жишээлбэл login хийх үед дараахтай төстэй код гаргаж болно:

```typescript
await page.getByPlaceholder('Username').fill('standard_user');
await page.getByPlaceholder('Password').fill('secret_sauce');
await page.getByRole('button', { name: 'Login' }).click();
```

Codegen нь locator сонгох болон тестийн эхний хувилбарыг хурдан боловсруулахад ашигтай.

Гэхдээ үүссэн кодыг шууд хуулж ашиглахын оронд шаардлагагүй хэсгийг цэвэрлэж, тестийн зорилгод тохируулан өөрчилж ашигласан.

---

## 8. Trace Viewer

Playwright-ийн Trace Viewer нь тест ажиллах үед browser дээр ямар үйлдлүүд хийгдсэн болон алдаа хаана гарсныг шалгахад ашиглагддаг.

Trace-тэйгээр тест ажиллуулах жишээ:

```bash
npx playwright test tests/mytest.spec.ts --project=chromium --trace on
```

Тестийн үед assertion-ийг зориудаар буруу болгож fail үүсгэн Trace Viewer ашиглан шалгаж болно.

Trace Viewer-ээр:

* Тестийн алхмууд
* Browser-ийн төлөв
* Locator-ийн үйлдлүүд
* Assertion
* Алдаа гарсан хэсэг

зэргийг дарааллаар нь шалгах боломжтой.

Ингэснээр тест амжилтгүй болсон үед алдаа ямар үйлдлийн дараа гарсныг илүү хялбар тодорхойлж болно.

---

## 9. Test Isolation

Эдгээр тестүүдийг хоорондоо хамааралгүй ажиллахаар зохион байгуулсан.

Тест бүр өөрийн:

```typescript
async ({ page })
```

page instance ашигладаг.

Жишээлбэл эхний тест login хийсэн ч хоёр дахь тест өмнөх тестийн login төлөвийг ашиглахгүй. Хоёр дахь тест өөрөө:

```typescript
await page.goto('https://www.saucedemo.com/');
```

гэж сайтыг дахин нээж, login хийх үйлдлээ эхнээс нь гүйцэтгэдэг.

Ийм байдлаар:

* Нэг тестийн үр дүн нөгөөдөө нөлөөлөхгүй
* Тестүүдийг тусад нь ажиллуулах боломжтой
* Бүх тестийг дарааллаар ажиллуулахад session-ийн хамаарал үүсэхгүй

байхаар зохион байгуулсан.

---

## 10. Playwright болон Selenium-ийн харьцуулалт

Playwright болон Selenium нь веб application-ийн UI автомат тест хийхэд өргөн ашиглагддаг хэрэгслүүд юм.

| Үзүүлэлт                | Playwright                                                 | Selenium                                                 |
| ----------------------- | ---------------------------------------------------------- | -------------------------------------------------------- |
| Browser дэмжлэг         | Chromium, Firefox, WebKit                                  | Олон төрлийн browser                                     |
| Programming language    | JavaScript/TypeScript, Python, Java, C#                    | Java, Python, C#, JavaScript гэх мэт                     |
| Auto-waiting            | Байгаа                                                     | Зарим нөхцөлд нэмэлт wait тохируулах шаардлагатай        |
| Locator                 | `getByRole()`, `getByText()`, `getByPlaceholder()` гэх мэт | CSS, XPath болон бусад locator                           |
| Trace Viewer            | Дэмждэг                                                    | Playwright шиг нэгдсэн Trace Viewer байхгүй              |
| Ашиглахад хялбар байдал | Орчин үеийн API-тай, ойлгомжтой                            | Өргөн хүрээнд ашиглагддаг боловч зарим тохиргоо шаарддаг |

Энэ лабораторийн ажлын хүрээнд Playwright-ийн locator, assertion болон auto-waiting боломжуудыг ашиглахад тест бичихэд ойлгомжтой байсан.

Ялангуяа `getByRole()` болон `getByPlaceholder()` зэрэг locator ашигласнаар тестийн кодыг уншихад хялбар болсон.

---

## 11. Тестийн үр дүн

Бичсэн нийт 3 тестийг Chromium browser дээр ажиллуулж шалгасан.

Тестүүд:

```text
Зөв мэдээллээр login хийх
Буруу password оруулах
Бүтээгдэхүүн сагсанд нэмэх
```

Тестийн үр дүн:

```text
3 passed
```

Ингэснээр зөв login, буруу password-ийн алдаа болон бүтээгдэхүүн сагсанд нэмэх үндсэн үйлдлүүдийг амжилттай автоматжуулж шалгасан.

---

## 12. Тест ажиллуулах

Playwright-ийн бүх тестийг ажиллуулах:

```bash
npx playwright test
```

Зөвхөн `mytest.spec.ts` файлыг ажиллуулах:

```bash
npx playwright test tests/mytest.spec.ts
```

Chromium дээр ажиллуулах:

```bash
npx playwright test tests/mytest.spec.ts --project=chromium
```

Тестийн дэлгэрэнгүй үр дүнг browser report хэлбэрээр харах:

```bash
npx playwright show-report
```

Codegen ажиллуулах:

```bash
npx playwright codegen https://www.saucedemo.com/
```

---

## 13. Дүгнэлт

Энэхүү лабораторийн ажлаар Playwright ашиглан веб application-ийн UI автомат тест боловсруулах үндсэн ойлголтуудыг хэрэгжүүлсэн.

SauceDemo веб application дээр зөв мэдээллээр login хийх, буруу password оруулах үед алдаа гарч байгаа эсэхийг шалгах болон бүтээгдэхүүнийг shopping cart-д нэмэх гэсэн 3 функциональ тест боловсруулсан.

Тест бичих явцад `getByPlaceholder()`, `getByRole()`, `locator()` зэрэг locator ашиглаж, `toHaveText()`, `toHaveURL()`, `toBeVisible()`, `toContainText()` зэрэг assertion-уудаар хүлээгдэж буй үр дүнг баталгаажуулсан.

Мөн Playwright Codegen болон Trace Viewer-ийн зориулалт, хэрэглээг туршиж үзсэн.

Эдгээр тестүүдийг Chromium browser дээр ажиллуулахад 3 тест бүгд амжилттай ажилласан.

Ингэснээр Playwright ашиглан вебийн үндсэн үйлдлүүдийг автоматжуулж, тестийн үр дүнг автоматаар шалгах боломжтойг практик байдлаар хэрэгжүүлсэн.
