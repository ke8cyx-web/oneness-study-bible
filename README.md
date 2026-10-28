# One God One Faith Ministry — Digital Oneness Study Bible

An installable Progressive Web App (PWA) using a green-and-gold theme, built for One God One Faith Ministry.

## Included features

- Full KJV dataset loaded on first online use and saved in IndexedDB for offline reading.
- Book and chapter navigation.
- Full-text search across the locally saved KJV.
- Bookmarks and personal verse notes stored on the device.
- Persistent verse highlighting/marking stored locally.
- Browser text-to-speech to read a chapter aloud, with a stop button.
- Copy a verse with its reference, and print the current chapter.
- Export/import for bookmarks, notes, and verse marks.
- Oneness study topics and Scripture cross-reference buttons.
- Book-by-book study guides for all 66 books, with key passages, a study focus, and review questions.
- A dataset validation check that confirms the downloaded KJV contains 66 books before saving it.
- Service worker app-shell caching and installable web manifest.
- Responsive layout for phones, tablets, and computers.

## Important status note

Live website: https://ke8cyx-web.github.io/oneness-study-bible/

The app includes KJV reading, search, bookmarks, personal verse notes, a 30-day reading plan, cross-references, topical Oneness notes, and a book-by-book guide for all 66 books. The first KJV download requires internet access; after it is successfully saved in this browser, Bible text is stored locally for offline reading. Bookmarks, notes, and reading-plan progress are stored locally in the current browser and do not automatically sync across devices.

Important scope note: the book-by-book guides and topical notes are study aids, not a completed verse-by-verse commentary on every verse. The Bible text and commentary are kept separate so readers can compare every teaching note with Scripture in context.

## KJV data source

Midvash, `bible-data`, KJV dataset:
https://github.com/midvash/bible-data
Raw JSON URL used by the app:
https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/kjv/kjv.json

The repository identifies the KJV text as public domain and the dataset code as MIT-licensed. Check the source repository's current license and attribution notes before redistributing or modifying the data.

## Current deployment

This project is already published through GitHub Pages at:
https://ke8cyx-web.github.io/oneness-study-bible/

The source of truth is the `main` branch of this repository. Changes committed to `main` are published by GitHub Pages after its deployment finishes. If a browser keeps showing an older version, reload the page and allow the service worker to update. GitHub Pages settings and deployment status are available under the repository's **Settings → Pages** and **Actions** tabs.

Official documentation: https://docs.github.com/en/pages/getting-started-with-github-pages

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

- The complete KJV is downloaded as one JSON file on first use; low-memory devices or slow networks may take longer. A future version could split the text by book for more reliable offline downloads.
- Detailed verse-by-verse Oneness commentary for every verse has not been completed. The app currently has topical notes, cross-references, and book-by-book study guides. A full commentary requires careful passage-by-passage writing and verification; it should not be represented as finished until that work is completed.
- Bookmarks and personal notes are local to each device/browser; they do not automatically sync between phones.
- The PWA does not yet include audio, user accounts, cloud sync, or an app-store package.
