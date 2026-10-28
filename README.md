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
- Verse-specific commentary shown from the verse Study action when a note exists.
- A dataset validation check that confirms the downloaded KJV contains 66 books before saving it.
- Service worker app-shell caching and installable web manifest.
- Responsive layout for phones, tablets, and computers.

## Current commentary progress

Original verse-by-verse commentary is being added incrementally. The existing verse-commentary.js contains early Genesis entries. exodus-commentary.js now contains entries for Exodus 11 and Exodus 12:1–51, plus Exodus 13:1–22, Exodus 14:1–31, Exodus 15:1–27, and Exodus 16:1–36. The verse-by-verse commentary for all 66 books is **not yet complete**; do not represent the full commentary as finished until every verse has been written and checked.

The Bible text and commentary are kept separate so readers can compare each teaching note with Scripture in context. Commentary is a study aid and should be checked against the cited passages.

## Important status note

Live website: https://ke8cyx-web.github.io/oneness-study-bible/

The app includes KJV reading, search, bookmarks, personal verse notes, a 30-day reading plan, cross-references, topical Oneness notes, and a book-by-book guide for all 66 books. The first KJV download requires internet access; after it has been successfully saved in this browser, Bible text is stored locally for offline reading. Bookmarks, notes, and reading-plan progress are stored locally in the current browser and do not automatically sync across devices.

## KJV data source

Midvash, bible-data, KJV dataset:
https://github.com/midvash/bible-data

Raw JSON URL used by the app:
https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/kjv/kjv.json

The repository identifies the KJV text as public domain and the dataset code as MIT-licensed. Check the source repository's current license and attribution notes before redistributing or modifying the data.

## Current deployment

This project is published through GitHub Pages at:
https://ke8cyx-web.github.io/oneness-study-bible/

The source of truth is the main branch of this repository. Changes committed to main are published by GitHub Pages after its deployment finishes. If a browser keeps showing an older version, reload the page and allow the service worker to update. GitHub Pages settings and deployment status are available under the repository's Settings → Pages and Actions tabs.

Official documentation: https://docs.github.com/en/pages/getting-started-with-github-pages

## Install on Android

1. Open the published HTTPS URL in Chrome.
2. Use the browser menu and select Install app or Add to Home screen.
3. Follow the prompts. The exact wording can vary by device and Chrome version.

## Install on iPhone

1. Open the published HTTPS URL in Safari.
2. Tap Share.
3. Choose Add to Home Screen and confirm.

## Test before sharing widely

- Open a few books and chapters, including Exodus 12–14, John 3, and Acts 2.
- Open a verse's Study action to see whether a commentary entry is present.
- Search for one LORD and Jesus.
- Save a bookmark and a note; reload and verify they remain.
- Load the app online once, then test reading offline.
- Keep a copy of exported bookmarks/notes. Browser storage can be cleared by the device owner.

## Commentary progress

- New Testament-first plan: detailed KJV-based, Oneness-perspective notes are being added book by book and verse by verse.
- Matthew 1–4 currently includes notes for all 90 verses, with cross-references.
- Existing Old Testament commentary remains available; the remaining New Testament books and chapters still need to be completed.

## Known limitations

- The complete KJV is downloaded as one JSON file on first use; low-memory devices or slow networks may take longer. A future version could split the text by book for more reliable offline downloads.
- Detailed verse-by-verse Oneness commentary for every verse of all 66 books is still in progress. The New Testament is now the priority; Matthew 1–4 has been added to the dedicated New Testament commentary file, alongside the existing Exodus 11–16 commentary.
- Bookmarks and personal notes are local to each device/browser; they do not automatically sync between phones.
- The PWA does not yet include audio recordings, user accounts, cloud sync, or an app-store package.
