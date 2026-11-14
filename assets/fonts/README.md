# Fonts used outside the browser

`BigShoulders-ExtraBold.ttf` is a static instance (weight 800) of Big Shoulders
by Patric King and Xotype, licensed under the SIL Open Font License 1.1
(https://openfontlicense.org). It was downloaded from Google Fonts.

It is used only by `src/app/opengraph-image.tsx`, because the share image
renderer needs a font file and cannot use the variable font that the site
loads through `next/font`.
