# Fix Insight Heading Readability

## Scope
Adjust only League Gothic headings in the shared individual Insight article renderer. The Insights listing, body typography, content, SEO, images, routing, colors, and other pages remain unchanged.

## Diagnosis
The shared renderer currently gives article headings increased line-height, and the live page confirms those values are applied. However, the same headings also use `font-bold` / `font-semibold` and `tracking-tight`. League Gothic is loaded as its regular display face, so synthetic weight plus negative letter spacing keeps the headings looking crowded even after line-height increases.

## Implementation
- Remove synthetic bold/semibold styling from the article title and Markdown H1/H2 headings; explicitly use League Gothic at its native regular weight.
- Replace negative tracking with neutral or slightly open tracking, scoped only to article headings.
- Preserve the current font sizes.
- Set explicit responsive line-height and block spacing for the article title and Markdown headings so wrapped lines and adjacent paragraphs remain clearly separated.
- Apply the rules through the shared `/insights/$slug` renderer so current and future generated articles inherit the correction.

## Verification
- Test an Insight with a wrapped article title and multiple H2 headings.
- Confirm computed styles use League Gothic, native weight, non-negative tracking, and the intended line-height.
- Visually verify desktop and mobile screenshots, including no clipping, overlap, or page-level overflow.
