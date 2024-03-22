import { browser, expect } from '@wdio/globals';
import { ElementReference } from '@wdio/protocols';
import { Selector } from 'webdriverio';

const emailStr = 'toantestaka2@gmail.com';

describe('Test project creation flow', () => {

    it('should create a new project', async () => {
        await browser.url('https://test.aka247.vn/login');
    });

    it('should create a new project', async () => {
        const emailInput = await $('input[name="email"]');
        await emailInput.setValue(emailStr);
        const nextButton = await $('button[type="submit"]');
        await nextButton.click();
    });

    it('Input password and sign in', async () => {
        await $('input[name="password"]').waitForExist();
        const passwordInput = await $('input[name="password"]');
        await passwordInput.setValue('Ab@123456');
        // await passwordInput.keys('Enter');
        const passwordButton = await $('button[type="submit"]');
        await passwordButton.click();
        await browser.waitUntil(async () => (await browser.getUrl()).includes('https://test.aka247.vn/dashboard'));
    });

    it('Navigate to project creation page', async () => {
        await $('//*[@id="side-bar"]/div[4]').waitForExist();
        const ticketLink = await $('//*[@id="side-bar"]/div[4]');
        await ticketLink.click();
        const projectButton = await $('a[href="/other-config/project"]');
        await projectButton.click();
        await browser.waitUntil(async () => (await browser.getUrl()).includes('https://test.aka247.vn/other-config/project'));
    });

    it('Click on "Create new" button', async () => {
        await $('//*[contains(text(),"Tạo mới")]').waitForExist();
        await $('//*[contains(text(),"Tạo mới")]').click();
    });

    it('Fill in project creation form', async () => {
        await $('input[name="name"]').setValue('HĐ1');
        await $('input[name="code"]').setValue('01');
        await $('input[name="signing_time"]').setValue('03/13/2024');
        await $('input[name="start_time"]').setValue('03/13/2024');
        await $('input[name="end_time"]').setValue('03/13/2024');
        await handleDropdown('project_type', '//div[@id="react-select-2-option-0"]');
        await handleDropdown('react-select-3-input', '//div[contains(@id, "react-select-3-option-")]');
        await $('input[name="project_value"]').setValue('50');
        await handleDropdown('currency_unit', '//div[contains(@id, "react-select-4-option-")]');

        await $('//button[contains(@id, "headlessui-combobox-button")]').click();
        const picData = await $$('//*[contains(@id, "headlessui-combobox-option")]');
        await picData[0].click();

        await $('button[type="submit"]').click();
        // await browser.pause(1000);
    });
    it('HightlightError', async () => {
        await $('//*[contains(text(),"Dữ liệu đầu vào không hợp lệ")]').waitForExist();
        const error = (await $('//*[contains(text(),"Dữ liệu đầu vào không hợp lệ")]')).click();
        await highlightElement(error);
    })
});

export async function handleDropdown(dropdownId: string, XPath: Selector | ElementReference[] | HTMLElement[]) {
    const dropdown = await $(`#${dropdownId}`);
    await dropdown.click();
    await browser.waitUntil(async () => {
        const options = await $$(XPath);
        return options.length > 0;
    });
    const options = await $$(XPath);
    if (options.length > 0) {
        const selectedOption = options[0];
        const selectedOptionText = await selectedOption.getText();
        await selectedOption.click();
        return selectedOptionText;
    }
}

async function highlightElement(element: any) {
    await browser.execute((el) => {
        el.style.border = '2px solid red'; // Thiết lập đường viền màu đỏ
    }, element);
    await browser.pause(1000); // Tạm dừng để hiển thị hiệu ứng
}