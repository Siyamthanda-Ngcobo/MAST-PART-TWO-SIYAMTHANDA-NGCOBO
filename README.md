# MAST-PART-TWO-SIYAMTHANDA-NGCOBO
# Chef's Menu Manager

A React Native Android application for a restaurant chef to add and view menu items. This project is being developed for the **MAST5112 Portfolio of Evidence (PoE), Part 2 — Building the Mobile Application**.

## Project overview

The app provides a simple interface for capturing menu information and displaying the dishes added during the current session.

Each menu item includes:

- **Dish name**
- **Description**
- **Course:** Starter, Main Course, or Dessert
- **Price:** entered in South African rand (R)

## Part 2 features

- Add multiple menu items.
- Display all items added to the current menu.
- Validate that all required fields have been completed.
- Check that the price is a valid number greater than R0.00.
- Show an error message when input is missing or invalid.
- Show a confirmation message when an item is added successfully.
- Show an empty-state message when no menu items have been added.
- Clear the form after a menu item is successfully added.
- Display the current number of dishes on the menu.

> **Scope note:** Part 2 focuses on adding and viewing menu items. Editing, deleting, searching, filtering, and menu statistics are reserved for the Final PoE requirements and are not included in this version.

## Technologies used

- React Native
- React
- TypeScript (`App.tsx`)
- Expo (`expo-status-bar`)
- `react-native-safe-area-context`

## Requirements

Install the following before running the project:

- Node.js and npm
- Expo-compatible development environment
- Expo Go on a compatible device, or an Android emulator

## Installation and setup

1. Clone this repository:

   ```bash
   git clone <your-github-repository-url>
   ```

2. Open the project folder in VS Code or a terminal.

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Start the Expo development server:

   ```bash
   npx expo start
   ```

5. Open the app using Expo Go or run it on an Android emulator using the options provided by Expo.

> These commands assume this repository is an Expo project and contains its project configuration (for example, `package.json` and `app.json` or `app.config.js`). If your setup differs, follow the run instructions for your actual project configuration.

## How to use the app

1. Launch Chef's Menu Manager.
2. Enter the dish name.
3. Enter a description of the dish.
4. Select Starter, Main Course, or Dessert.
5. Enter a price in rand, for example `89.99`.
6. Select **Add to menu**.
7. Read the confirmation or validation message. Successfully added dishes appear in the Current menu section.
8. Repeat to add more dishes.

## Data storage

Menu items are held in React component state while the app is running. They are not saved to permanent storage, so the list resets when the app is restarted.

## Testing checklist

Before submitting, test that:

- [ ] A menu item can be added with all fields completed.
- [ ] Multiple menu items appear in the list.
- [ ] Missing required fields trigger an error message.
- [ ] A price of zero, a negative price, or invalid text is rejected.
- [ ] A successful addition displays a confirmation message and clears the form.
- [ ] The empty-state message appears before any items are added.
- [ ] The app runs on an Android emulator or device.

## Submission

- **GitHub repository:** Add your repository URL here.
- **Demonstration video:** 