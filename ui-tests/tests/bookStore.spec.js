import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { BookStorePage } from '../pages/bookStorePage.js';
import user from '../../test-data/user.json' assert { type: 'json' };
import { writeBookDetails } from '../utils/fileHelper.js';

test('Book Store Flow UI Test', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const bookStorePage = new BookStorePage(page);

    // Navigate
    await loginPage.navigate();

    // Login
    await loginPage.login(user.username, user.password);

    // Validate login
    await bookStorePage.validateLogin(user.username);

    // Go to Bookstore
    await bookStorePage.goToBookStore();

    // Search book
    await bookStorePage.searchBook(user.bookName);

    // Validate search result
    await bookStorePage.validateBook();

    // Get & Write details
    const book = await bookStorePage.getBookDetails(user.bookName);

    const data = `Title: ${book.title}\nAuthor: ${book.author}\nPublisher: ${book.publisher}`;
    writeBookDetails(data);

    // Logout
    await bookStorePage.logout();
});