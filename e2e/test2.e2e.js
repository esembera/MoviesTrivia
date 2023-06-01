import { readFile, writeFile } from "fs/promises";
const path = require("path");
const filePath = path.resolve(__dirname, "db.json");

async function getUsername() {
  const data = await readFile(filePath, "utf8");
  const jsonData = JSON.parse(data);
  const username = jsonData.lastUserUsername;
  const newUsername =
    username.split("_")[0] + "_" + (parseInt(username.split("_")[1]) + 1);
  return newUsername;
}

async function saveLastUserUsername(username) {
  const data = { lastUserUsername: username };
  await writeFile(filePath, JSON.stringify(data));
}

describe("User launches the app, signs in and then goes to favourite movies and adds a few of them to favourites", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  it("Email and password fields should be visible", async () => {
    await waitFor(element(by.id("emailField")))
      .toBeVisible()
      .withTimeout(5000);
    await expect(element(by.id("emailField"))).toBeVisible();
    await expect(element(by.id("passwordField"))).toBeVisible();
  });

  it("User goes to register screen and registers", async () => {
    username = await getUsername();
    await element(by.id("goToSignUp")).tap();
    await element(by.id("usernameField")).typeText(username);
    await element(by.id("emailField")).typeText(`${username}@test.com`);
    await element(by.id("passwordField")).typeText("123456");
    await element(by.id("registerBtn")).tap();
    await saveLastUserUsername(username);
  });

  it("User goes to quiz selection screen and selects to play a custom quiz", async () => {
    await element(by.id("playQuizBtn")).tap();
    await element(by.id("dramaQuizBtn")).tap();
  });

  it("User plays a custom quiz and after reaching the end of the quiz, goes back to home screen", async () => {
    await element(by.id("continueBtn")).tap();
  });

  it("User goes to Leaderboard screen and sees his name on the leaderboards list", async () => {
    await element(by.id("leaderboardBtn")).tap();
    await expect(element(by.id(username))).toBeVisible();
  });

  it("User goes back to home screen and logs out", async () => {
    await element(by.id("outerContainer")).swipe("right", "fast", 1, 0.0, 0.0);
    await element(by.id("logOutBtn")).tap();
  });
});
