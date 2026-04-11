const puppeteer = require('puppeteer');
const fs = require('fs');

const DIRS = [
    'screenshoot/pertemuan-1',
    'screenshoot/pertemuan-2',
    'screenshoot/pertemuan-3',
    'screenshoot/pertemuan-4',
    'screenshoot/pertemuan-5',
    'screenshoot/pertemuan-6'
];

DIRS.forEach(dir => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
});

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    try {
        // PERTEMUAN 1
        await page.goto('http://127.0.0.1:8000/', { waitUntil: 'networkidle0' });
        await page.screenshot({ path: 'screenshoot/pertemuan-1/pertemuan-1.png' });

        // PERTEMUAN 2
        await page.goto('http://127.0.0.1:8000/register', { waitUntil: 'networkidle0' });
        await page.screenshot({ path: 'screenshoot/pertemuan-2/register.png' });

        await page.goto('http://127.0.0.1:8000/login', { waitUntil: 'networkidle0' });
        await page.screenshot({ path: 'screenshoot/pertemuan-2/login.png' });

        await page.type('#email', 'admin@gmail.com');
        await page.type('#password', 'password');
        await Promise.all([
            page.waitForNavigation(),
            page.click('button[type="submit"]')
        ]);

        await page.goto('http://127.0.0.1:8000/about', { waitUntil: 'networkidle0' });
        await page.screenshot({ path: 'screenshoot/pertemuan-2/1.png' });

        // PERTEMUAN 4
        await page.goto('http://127.0.0.1:8000/product', { waitUntil: 'networkidle0' });
        await page.screenshot({ path: 'screenshoot/pertemuan-4/indexProduct.png' });
        
        await page.goto('http://127.0.0.1:8000/product/create', { waitUntil: 'networkidle0' });
        await page.screenshot({ path: 'screenshoot/pertemuan-4/CreateProduct.png' });

        // Trigger Validation Pertemuan 6
        await Promise.all([
            page.waitForNavigation(),
            page.click('form button') // Save button
        ]);
        await page.screenshot({ path: 'screenshoot/pertemuan-6/requ-validation.png' });

        // Create a product
        await page.type('input[name="name"]', 'Product A');
        await page.type('input[name="qty"]', '10');
        await page.type('input[name="price"]', '20000');
        await Promise.all([
            page.waitForNavigation(),
            page.click('form button')
        ]);
        
        // At index again
        await page.goto('http://127.0.0.1:8000/product/1/edit', { waitUntil: 'networkidle0' });
        await page.screenshot({ path: 'screenshoot/pertemuan-4/EditProduct.png' });

        await page.goto('http://127.0.0.1:8000/product/1', { waitUntil: 'networkidle0' });
        await page.screenshot({ path: 'screenshoot/pertemuan-4/ViewProduct.png' });

        // PERTEMUAN 5
        // We capture role in the dashboard showing "admin"
        await page.goto('http://127.0.0.1:8000/dashboard', { waitUntil: 'networkidle0' });
        await page.screenshot({ path: 'screenshoot/pertemuan-5/role-gate.png' });

        console.log("Screenshots captured successfully!");
    } catch (error) {
        console.error("Error capturing screenshots:", error);
    } finally {
        await browser.close();
    }
})();
