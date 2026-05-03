import { expect } from '@playwright/test';

export class ProfilePage {
    constructor(page) {
        this.page = page;

        this.usernameLabel = page.locator('#userName-value');
        this.logoutBtn = page.getByRole('button', { name: 'Logout' });
        this.goToBookStoreBtn = page.getByRole('button', { name: 'Go To Book Store' });
    }

    async validateLoginSuccess(username) {
        await expect(this.usernameLabel).toBeVisible();
        await expect(this.usernameLabel).toHaveText(username);

        await expect(this.logoutBtn).toBeVisible();
        await expect(this.logoutBtn).toBeEnabled();
    }

    async goToBookStore() {
        await this.goToBookStoreBtn.click();
        await this.page.waitForURL('**/books');
    }

    async logout() {
        await this.logoutBtn.click();
    }
}