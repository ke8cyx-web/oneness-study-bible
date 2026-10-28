# One God One Faith Ministry — Digital Oneness Study Bible

An installable Progressive Web App (PWA) starter project using a green-and-gold theme.

## Included features

- Full KJV dataset loaded on first online use and saved in IndexedDB for offline reading.
- Book and chapter navigation.
- Full-text search across the locally saved KJV.
- Bookmarks and personal verse notes stored on the device.
- Export/import for bookmarks and notes.
- Oneness study topics and Scripture cross-reference buttons.
- Service worker app-shell caching and installable web manifest.
- Responsive layout for phones, tablets, and computers.

## Important status note

This project is a working starter app, not a deployed website. It is not yet live, and the first Bible download requires internet access. The complete KJV dataset is fetched from the public-domain dataset source listed below and stored on the device after successful download. The detailed verse-by-verse Oneness notes are currently a starter set of topic notes, not commentary on every verse of all 66 books; that content must be developed separately.

## KJV data source

Midvash, `bible-data`, KJV dataset:
https://github.com/midvash/bible-data
Raw JSON URL used by the app:
https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/kjv/kjv.json

The repository identifies the KJV text as public domain and the dataset code as MIT-licensed. Check the source repository's current license and attribution notes before redistributing or modifying the data.

## Deploy free with GitHub Pages

You need a free GitHub account. On a computer:

1. Download and unzip this project.
2. Sign in at https://github.com and create a new **public** repository, for example `oneness-study-bible`. Do not initialize it with a README if you will upload this project's files.
3. In the repository, choose **Add file → Upload files** and upload the contents of this folder (the files themselves, not the outer folder).
4. Commit the upload.
5. Open **Settings → Pages**.
6. Under the build/deployment section, choose **Deploy from a branch**.
7. Select branch `main` and folder `/(root)`, then save.
8. Wait for GitHub Pages to publish. The address will resemble `https://YOUR-USERNAME.github.io/oneness-study-bible/`. Use the exact URL shown by GitHub; this project is not live until that happens.
9. Open the published URL while online and wait for “KJV ready · saved for offline use.” This first download can take a little time.
10. Test by turning off internet and reloading. If the app shell and KJV have been cached, reading and searching should continue to work offline.

GitHub Pages documentation: https://docs.github.com/en/pages/getting-started-with-github-pages

## Install on Android

1. Open the published HTTPS URL in Chrome.
2. Use the browser menu and select **Install app** or **Add to Home screen**.
3. Follow the prompts. The exact wording can vary by device and Chrome version.

## Install on iPhone

1. Open the published HTTPS URL in Safari.
2. Tap **Share**.
3. Choose **Add to Home Screen** and confirm.

## Test before sharing widely

- Open a few books and chapters, including John 3 and Acts 2.
- Search for `one LORD` and `Jesus`.
- Save a bookmark and a note; reload and verify they remain.
- Load the app online once, then test reading offline.
- Keep a copy of exported bookmarks/notes. Browser storage can be cleared by the device owner.
- Study notes are theological commentary and should be checked against Scripture in context.

## Known limitations in this first version

- The complete KJV is downloaded as one JSON file on first use; low-memory devices or slow networks may take longer. A future version should split the text by book for more reliable offline downloads.
- Verse-by-verse Oneness commentary for the full Bible has not been written yet. This starter contains topical notes and cross-references.
- Bookmarks and personal notes are local to each device/browser; they do not automatically sync between phones.
- The PWA does not yet include audio, user accounts, cloud sync, or an app-store package.
