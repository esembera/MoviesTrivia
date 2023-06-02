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

  it("User enters its credentials and logs in", async () => {
    await element(by.id("emailField")).typeText("testuser_1@test.com");
    await element(by.id("passwordField")).typeText("123456");
    await element(by.id("loginBtn")).tap();
  });

  it("User goes to discover movies screen, adds first 3 movies to favourites and returns back to home screen", async () => {
    await element(by.id("discoverMoviesBtn")).tap();
    await element(by.id("0")).tap();
    await element(by.id("1")).tap();
    await element(by.id("2")).tap();
    await element(by.id("outerContainer")).swipe("right", "fast", 1, 0.0, 0.0);
  });

  it("User goes to quiz selection screen and selects to play a custom quiz", async () => {
    await element(by.id("playQuizBtn")).tap();
    await element(by.id("customQuizBtn")).tap();
  });

  it("User plays a custom quiz and after reaching the end of the quiz, goes back to home screen", async () => {
    await element(by.id("continueBtn")).tap();
  });

  it("User goes to favourite movies screen, removes first 3 movies to favourites", async () => {
    await element(by.id("favouritesBtn")).tap();
    await element(by.id("0")).tap();
    await element(by.id("1")).tap();
    await element(by.id("2")).tap();
  });

  it("User goes back to home screen and logs out", async () => {
    await element(by.id("outerContainer")).swipe("right", "fast", 1, 0.0, 0.0);
    await element(by.id("logOutBtn")).tap();
  });
});
