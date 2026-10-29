# KARTHI — Birthday Surprise Website ❤️

A romantic, cinematic birthday surprise website based on the uploaded reference UI, personalized for **KARTHI**.

## Run in VS Code

1. Extract this ZIP.
2. Open the extracted `KARTHI_Birthday_Website` folder in VS Code.
3. Install Node.js (LTS) if it is not already installed.
4. Open Terminal in VS Code and run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Deploy to GitHub Pages

The `main` branch deploys automatically to GitHub Pages through the workflow in
`.github/workflows/deploy.yml`. After the first deployment completes, the site
is available at `https://kumaranprabakaran8-jpg.github.io/karthi-birthday/`.

The deployed website is public. Its front-end password screen does not restrict
access to the source code or media files.

## Personalize

Most birthday content is in `src/config/site.ts`:
- `recipientName`: recipient name (currently KARTHI)
- `birthdayDate`: birthday date used by countdown features
- `secretCode`: code for the opening screen
- `LOVE_LETTER`, `REASONS`, `TIMELINE`, `FINAL_MESSAGE`: message text
- `GALLERY_IMAGES`: gallery images imported from `cutey/`
- `MUSIC_PLAYLIST`: background music options

Replace the sample photos in `cutey/` with your own photos if you want. Keep filenames the same, or update the imports in `src/config/site.ts`.

The gift-box surprise uses `public/assets/karthi-surprise.jpeg` (served as `/assets/karthi-surprise.jpeg`). Replace that file with your own JPEG photo, keeping the same filename, to change the revealed picture.

The voice-message player uses `public/audio/voice-message.mp3`. Replace this file with your own MP3 to update the recorded message.

## Notes

- This is the editable source project; `node_modules` is not included. Run `npm install` once.
- Audio playback may require a click because browsers restrict autoplay.
