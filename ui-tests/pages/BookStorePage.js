import { expect } from '@playwright/test';

export class BookStorePage {
    constructor(page) {
        this.page = page;

        this.usernameLabel = page.locator('#userName-value');
        this.logoutBtn = page.locator('#submit');
        this.logoutVeriy = page.getByRole('button', { name: 'Logout' });
        this.bookStoreBtn = page.getByRole('button', { name: 'Go To Book Store' });

        this.searchBox = page.locator('#searchBox');
        this.bookTitle = page.locator('text=Learning JavaScript Design Patterns');

        this.bookRows = page.locator('.rt-tbody .rt-tr-group');
    }

    async validateLogin(username) {
        // Validate username text
        await expect(this.usernameLabel).toBeVisible();
        await expect(this.usernameLabel).toHaveText(username);

        // Validate logout button
        await expect(this.logoutVeriy).toBeVisible();
        await expect(this.logoutVeriy).toBeEnabled();
    }

    async goToBookStore() {
        await this.bookStoreBtn.click();
        await this.page.waitForURL('**/books');
    }

    async searchBook(bookName) {
        await this.searchBox.waitFor();
        await this.searchBox.fill(bookName);

        // wait for filtered result
        await this.page.locator(`text=${bookName}`).first().waitFor();
    }

    async validateBook() {
        await this.bookTitle.waitFor();
    }

    async getBookDetails(bookName) {

        // Locate the row using the book title
        const row = this.page.locator('tr', {
            has: this.page.locator(`a:has-text("${bookName}")`)
        });

        await row.waitFor();

        // Extract values based on correct DOM
        const title = await row.locator('td').nth(1).locator('a').textContent();
        const author = await row.locator('td').nth(2).textContent();
        const publisher = await row.locator('td').nth(3).textContent();

        return {
            title: title.trim(),
            author: author.trim(),
            publisher: publisher.trim()
        };
    }

    async logout() {
        await this.logoutBtn.click();
    }
}