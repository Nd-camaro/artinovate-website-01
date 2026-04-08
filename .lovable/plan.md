

## Add 301 Redirects to netlify.toml

### Change

Append all 9 redirect blocks to the existing `netlify.toml` after the current `[[edge_functions]]` block. The existing `[build]` and `[[edge_functions]]` sections remain untouched.

### File: `netlify.toml`

Add the following after line 7:

- 4 redirects consolidating autonomous AI website duplicates to their canonical URLs
- 5 redirects pointing off-ICP interpretability posts to the strongest on-ICP post

Each redirect uses `status = 301` and `force = true` as specified.

No other files are modified.

