# Altinsay District Specialized School Website

This project is a website for the Altinsay District Specialized School, featuring various sections about the school's mission, academics, student life, and admissions. It includes scroll animations, a typing effect for the main heading, and a chat widget.

## Chat Widget with Firebase Integration

The chat widget now includes Google Sign-in with Firebase Authentication, stores user profiles and chat messages in Firestore, and loads each user's previous chat history.

### Firebase Setup Instructions

To get the chat functionality working with Firebase, you'll need to set up a Firebase project and configure it for your web application. This guide assumes you want to use Firebase's free tier (Spark plan) for this project.

#### 1. Create a Firebase Project

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click "Add project" and follow the on-screen instructions to create a new project.
3.  Give your project a name (e.g., "AltinsaySchoolChat") and optionally enable Google Analytics (not strictly necessary for this chat feature).

#### 2. Register Your Web App

1.  Once your project is created, click the "Web" icon ( `</>` ) to add a web app to your Firebase project.
2.  Register your app. You can give it a nickname. Hosting is not required if you're deploying it yourself or just running locally.
3.  Firebase will then provide you with your `firebaseConfig` object. Copy this object.

#### 3. Configure Firebase Authentication

1.  In the Firebase Console, navigate to "Authentication" from the left-hand menu.
2.  Go to the "Sign-in method" tab.
3.  Enable "Google" as a sign-in provider. You might need to provide a project support email. Make sure to save the settings.

#### 4. Set up Cloud Firestore Database

1.  In the Firebase Console, navigate to "Firestore Database" from the left-hand menu.
2.  Click "Create database".
3.  Choose "Start in production mode". (You will set up security rules shortly).
4.  Select a Cloud Firestore location (choose one close to your users for best performance).

#### 5. Update Firestore Security Rules

To allow authenticated users to read and write their own chat messages and manage their user profiles, you'll need to update Firestore security rules.

1.  In the Firebase Console, go to "Firestore Database" -> "Rules" tab.
2.  Replace the default rules with the following:

    ```firestore
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        // Users can read/write their own profile
        match /users/{userId} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }

        // Users can read/write their own chat messages
        match /chats/{chatId} {
          allow read, write: if request.auth != null && request.auth.uid == request.resource.data.userId;
        }
      }
    }
    ```
3.  Click "Publish".

#### 6. Paste Your Firebase Configuration

1.  Open `firebase-config.js` in your project.
2.  Replace the placeholder values in `firebaseConfig` with the actual values you copied from the Firebase Console (Step 2).

    ```javascript
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT_ID.appspot.com",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
      measurementId: "YOUR_MEASUREMENT_ID"
    };
    ```

#### 7. Run Locally

Open `index.html` in your web browser. The chat widget should now prompt you to sign in with Google, and your messages will be stored and retrieved from Firestore.

### Free Tier Considerations

Firebase's Spark plan (free tier) is generally sufficient for development and small projects. It includes:
*   **Authentication:** 10,000 verifications per month.
*   **Firestore:** 1 GiB storage, 50,000 reads/day, 20,000 writes/day, 20,000 deletes/day.

For this application, these limits should be more than enough. If your usage grows significantly, Firebase will notify you before you hit paid tiers.
