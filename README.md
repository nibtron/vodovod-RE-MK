# vodovod-RE-MK
Vodovod app

## Managing reports

The reports editor is available at `https://vodovod-restanj-mali-kamen.eu/admin/`.
Reports are grouped by year. Open a year to add or edit its report titles and PDF
uploads, or create a new year to add another group. Uploads are limited to 20 MiB.
The editor shows only the entry form, with the generic preview pane disabled.
New years start with an empty report list; add a report to enter its title and PDF.
Saving publishes directly to `main` without a review step; the GitHub Actions workflow
then builds the site and publishes it to GitHub Pages.

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

Year groups and their reports are stored in `src/data/report-years/`. After setup,
editors sign in at the admin URL with their GitHub account. CMS changes are committed
directly to `main`, and the workflow publishes them automatically.

## Managing announcements

The **Obvestila** page is available at `https://vodovod-restanj-mali-kamen.eu/#/obvestila`,
next to **Poročila** in the navigation. In `/admin/`, select **Obvestila** and create
an **Obvestilo** with a **Naslov** (title), **Datum** (date), and **Vsebina** (content).
Content is plain text; line breaks and paragraphs are preserved. Saving publishes
through the same GitHub Actions workflow as reports. Dates order announcements
newest first; they do not schedule publication.

Entries are individual JSON files in `src/data/announcements/`, with `title`, `date`
(`YYYY-MM-DD`), and `content` fields. Until the first entry is published, the page
shows an empty state.
