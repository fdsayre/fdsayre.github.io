(() => {
  const filters = document.querySelector('[data-post-filters]');
  if (!filters) return;

  const items = [...document.querySelectorAll('.post-filters__item')];
  const year = document.getElementById('posts-year');
  const tag = document.getElementById('posts-tag');
  const type = document.getElementById('posts-type');
  const count = document.getElementById('posts-count');
  const empty = document.getElementById('posts-empty');

  // These are display-only repairs. The posts' front matter and URLs stay intact.
  const tidyTag = (value) => {
    if (typeof value !== 'string') return '';
    const label = value.trim();
    switch (label.toLowerCase()) {
      case 'ai': return 'AI';
      case 'methdology': return 'methodology';
      case 'technology': return 'technology';
      default: return label;
    }
  };

  const slug = (value) => value.toLowerCase().normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const records = items.map((element) => {
    let rawTags = [];
    try { rawTags = JSON.parse(element.dataset.tags || '[]'); } catch (_) { /* show the post without tags */ }
    return {
      element,
      year: element.dataset.year,
      type: element.dataset.type,
      tags: [...new Set(rawTags.map(tidyTag).filter(Boolean))],
      rawTags: rawTags.filter((value) => typeof value === 'string')
    };
  });

  const years = [...new Set(records.map((record) => record.year))].sort().reverse();
  years.forEach((value) => year.add(new Option(value, value)));

  const tagCounts = new Map();
  records.forEach((record) => record.tags.forEach((value) => {
    tagCounts.set(value, (tagCounts.get(value) || 0) + 1);
  }));
  [...tagCounts.keys()].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    .forEach((value) => tag.add(new Option(`${value} (${tagCounts.get(value)})`, value)));

  const params = new URLSearchParams(window.location.search);
  if (years.includes(params.get('year'))) year.value = params.get('year');
  if ([...tagCounts.keys()].includes(params.get('tag'))) tag.value = params.get('tag');
  if (['weeknotes', 'other'].includes(params.get('type'))) type.value = params.get('type');

  // Minimal Mistakes links on individual posts use /posts/#tag-name.
  const hash = decodeURIComponent(window.location.hash.slice(1));
  if (!tag.value && hash) {
    const fromPost = records.flatMap((record) => record.rawTags.map((raw) => ({ raw, label: tidyTag(raw) })))
      .find(({ raw }) => slug(raw) === hash);
    if (fromPost) tag.value = fromPost.label;
  }

  function showMatches(updateUrl = false) {
    let visible = 0;
    records.forEach((record) => {
      const matches = (!year.value || record.year === year.value) &&
        (!tag.value || record.tags.includes(tag.value)) &&
        (!type.value || record.type === type.value);
      record.element.hidden = !matches;
      if (matches) visible += 1;
    });
    count.textContent = `Showing ${visible} of ${records.length} posts`;
    empty.hidden = visible !== 0;
    if (updateUrl) {
      const url = new URL(window.location.href);
      for (const [key, value] of [['year', year.value], ['tag', tag.value], ['type', type.value]]) {
        if (value) url.searchParams.set(key, value);
        else url.searchParams.delete(key);
      }
      url.hash = '';
      window.history.replaceState(null, '', url);
    }
  }

  function clearFilters() {
    year.value = '';
    tag.value = '';
    type.value = '';
    showMatches(true);
  }

  [year, tag, type].forEach((control) => control.addEventListener('change', () => showMatches(true)));
  document.getElementById('posts-reset').addEventListener('click', clearFilters);
  document.getElementById('posts-reset-empty').addEventListener('click', clearFilters);
  filters.hidden = false;
  showMatches();
})();
