# vodovod-RE-MK
Vodovod app

## Managing reports

The reports editor will be available at `https://vodovod-restanj-mali-kamen.eu/admin/`.
Editors can add, update, or remove a report by entering its year and title and uploading
the PDF. Uploads are limited to 20 MiB. Saving publishes directly to `main` without a
review step; the GitHub Actions workflow then builds the site and publishes it to
GitHub Pages.

### One-time setup

1. Deploy the [Decap OAuth proxy for Cloudflare Workers](https://github.com/sterlingwes/decap-proxy)
   to a Cloudflare account. Its `workers.dev` URL is the proxy URL.
2. Create a GitHub OAuth App. Set its homepage URL to the proxy URL and its callback
   URL to the proxy URL followed by `/callback`.
3. Add the OAuth App's client ID and client secret to the Cloudflare Worker as the
   `GITHUB_OAUTH_ID` and `GITHUB_OAUTH_SECRET` secrets. Keep the secret in Cloudflare;
   do not put it in this repository.
4. Set `backend.base_url` in `public/admin/config.yml` to the proxy URL, then deploy
   the website.
5. Invite each trusted editor as a collaborator on this repository with **Write**
   access. GitHub requires repository write access for the CMS backend; editors can
   therefore change any repository file, not only reports.
6. In GitHub repository settings, ensure Actions are enabled and Pages continues to
   publish from the `gh-pages` branch.

After setup, editors sign in at the admin URL with their GitHub account. CMS changes
are committed directly to `main`, and the workflow publishes them automatically.
