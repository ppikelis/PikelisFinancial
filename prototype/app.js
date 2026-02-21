const appRoot = document.getElementById("app");
const blueprintSelect = document.getElementById("blueprint-select");
const brandNameEl = document.getElementById("brand-name");
const brandTagEl = document.getElementById("brand-tag");
const brandIconEl = document.getElementById("brand-icon");
const DEFAULT_BLUEPRINT_ID = "b1";

if (typeof USE_MOCK_DATA === "undefined" || USE_MOCK_DATA !== true) {
  appRoot.innerHTML = `
    <div class="page-title">Mock data disabled</div>
    <div class="card">
      Enable <strong>USE_MOCK_DATA=true</strong> in <code>config.js</code>.
    </div>
  `;
}

const getStoredBlueprintId = () => {
  try {
    return localStorage.getItem("finadvisor-blueprint");
  } catch (error) {
    return null;
  }
};

const setStoredBlueprintId = (id) => {
  try {
    localStorage.setItem("finadvisor-blueprint", id);
  } catch (error) {
    return;
  }
};

const getActiveBlueprintId = () =>
  getStoredBlueprintId() ||
  (blueprintSelect ? blueprintSelect.value : null) ||
  DEFAULT_BLUEPRINT_ID;

const getActiveBlueprint = () => {
  const id = getActiveBlueprintId();
  return mockData.blueprints[id] || mockData.blueprints[DEFAULT_BLUEPRINT_ID];
};

const applyTheme = () => {
  const data = getActiveBlueprint();
  document.body.setAttribute("data-theme", data.id);
  if (brandNameEl) {
    brandNameEl.textContent = "FinAdvisor";
  }
  if (brandTagEl) {
    brandTagEl.textContent = data.name;
  }
  if (brandIconEl) {
    const iconMap = {
      b1: "SA",
      b2: "MF",
      b3: "ZK",
      b4: "QQ",
      b5: "TR"
    };
    brandIconEl.textContent = iconMap[data.id] || "FA";
  }
};

const getTickerBadge = (data, ticker) => {
  if (data.id === "b1") {
    return ticker.quantRating || "Quant";
  }
  if (data.id === "b2") {
    return ticker.newsletterPick || "Pick";
  }
  if (data.id === "b3") {
    return ticker.zacksRank || "Rank";
  }
  if (data.id === "b4") {
    return ticker.altSignal || "Signal";
  }
  if (data.id === "b5") {
    return ticker.analystConsensus || "Consensus";
  }
  return "Signal";
};

const getRankingTable = (data, label) => {
  const rows = data.tickers
    .map(
      (ticker, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${ticker.symbol}</td>
          <td>${label}</td>
        </tr>
      `
    )
    .join("");

  return `
    <table class="table">
      <tr><th>Rank</th><th>Ticker</th><th>${label}</th></tr>
      ${rows}
    </table>
  `;
};

const getAnalystAccuracyWidget = () => `
  <div class="chart-placeholder">Analyst accuracy chart placeholder</div>
  <div class="disclosure">Accuracy based on 12-month track record.</div>
`;

const getRatingBreakdownTable = () => `
  <table class="table">
    <tr><th>Rating</th><th>Count</th><th>Share</th></tr>
    <tr><td>Strong Buy</td><td>12</td><td>48%</td></tr>
    <tr><td>Buy</td><td>8</td><td>32%</td></tr>
    <tr><td>Hold</td><td>4</td><td>16%</td></tr>
    <tr><td>Sell</td><td>1</td><td>4%</td></tr>
  </table>
`;

const getInsiderTable = () => `
  <table class="table">
    <tr><th>Insider</th><th>Action</th><th>Shares</th><th>Date</th></tr>
    <tr><td>CFO</td><td>Buy</td><td>12,500</td><td>Feb 10</td></tr>
    <tr><td>Director</td><td>Sell</td><td>8,000</td><td>Feb 09</td></tr>
    <tr><td>VP Ops</td><td>Buy</td><td>4,200</td><td>Feb 05</td></tr>
  </table>
`;

const getTranscriptWidget = () => `
  <div class="widget">CEO: "Services demand remains resilient across geos."</div>
  <div class="widget" style="margin-top: 10px;">
    CFO: "We are prioritizing margin durability in FY26."
  </div>
  <div class="widget" style="margin-top: 10px;">
    Q&amp;A: "Demand signals are stable in the enterprise segment."
  </div>
`;

const renderSubNav = (data, active) => {
  const navItems = {
    b1: ["News", "Stocks", "Quant", "Transcripts", "Alerts"],
    b2: ["Picks", "Portfolios", "Best Buys", "Stocks", "Learn"],
    b3: ["Ranks", "Earnings", "Estimates", "Screeners", "Research"],
    b4: ["Alt Data", "Congress", "Insiders", "Gov Contracts", "Signals"],
    b5: ["Analysts", "Insiders", "Sentiment", "Stocks", "News"]
  };
  const items = navItems[data.id] || ["Home", "Stocks", "Activity"];
  return `
    <div class="sub-nav">
      ${items
        .map(
          (item) => `
            <a href="javascript:void(0)" class="${item === active ? "active" : ""}">
              ${item}
            </a>
          `
        )
        .join("")}
    </div>
  `;
};

const getPricingWidget = (data) => {
  if (data.id === "b1") {
    return `
      <div class="card cta-card accent-card">
        <div class="cta-title">Premium: Quant + Transcripts</div>
        <div>Unlock factor grades, earnings call transcripts, and alerts.</div>
        <div class="cta-button">Start 14-day trial</div>
      </div>
    `;
  }
  if (data.id === "b2") {
    return `
      <div class="card cta-card accent-card">
        <div class="cta-title">Join Stock Picks</div>
        <div>Get weekly picks and model portfolio updates.</div>
        <div class="cta-button">Subscribe $19/mo</div>
      </div>
    `;
  }
  if (data.id === "b3") {
    return `
      <div class="card cta-card accent-card">
        <div class="cta-title">Pro Rankings</div>
        <div>Real-time rank changes and estimate revisions.</div>
        <div class="cta-button">Upgrade $29/mo</div>
      </div>
    `;
  }
  if (data.id === "b4") {
    return `
      <div class="card cta-card accent-card">
        <div class="cta-title">Alt Data Pro</div>
        <div>Congress trades, insider clusters, and contract alerts.</div>
        <div class="cta-button">Unlock $39/mo</div>
      </div>
    `;
  }
  if (data.id === "b5") {
    return `
      <div class="card cta-card accent-card">
        <div class="cta-title">Analyst Pro</div>
        <div>Top analyst ratings, accuracy history, and alerts.</div>
        <div class="cta-button">Go Pro $25/mo</div>
      </div>
    `;
  }
  return "";
};

const getSignalsFromActivity = (data) => {
  const signals = [];
  const mapItem = (item, source) => ({
    source,
    ticker: item.ticker,
    summary: item.action
      ? `${source}: ${item.action} ${item.ticker}`
      : `${source}: ${item.ticker}`,
    timestamp: item.date || "Recent",
    impactScore: Math.min(95, 60 + signals.length * 7)
  });

  (data.activities.congressTrades || []).forEach((item) =>
    signals.push(mapItem(item, "Congress"))
  );
  (data.activities.analystRatings || []).forEach((item) =>
    signals.push(mapItem(item, "Analyst"))
  );
  (data.activities.institutionalChanges || []).forEach((item) =>
    signals.push(mapItem(item, "Institutional"))
  );

  return signals.slice(0, 6);
};

const getNewsFlashCards = (data) => {
  const items = [
    {
      title: "Flash: Earnings call sentiment improves",
      tickers: [data.tickers[0]?.symbol || "AAPL"],
      timestamp: "10:12 AM",
      source: "Company webcast"
    },
    {
      title: "Flash: Insider buy filed pre-market",
      tickers: [data.tickers[1]?.symbol || "NVDA"],
      timestamp: "9:42 AM",
      source: "SEC Form 4"
    },
    {
      title: "Flash: Analyst upgrade hits the tape",
      tickers: [data.tickers[2]?.symbol || "MSFT"],
      timestamp: "9:05 AM",
      source: "Broker note"
    }
  ];

  return items
    .map(
      (item) => `
        <div class="card accent-card" style="margin-bottom: 12px;">
          <div class="section-title">News flash</div>
          <div>${item.title}</div>
          <div style="margin-top: 8px;">
            ${item.tickers.map((ticker) => `<span class="badge primary">${ticker}</span>`).join("")}
          </div>
          <div class="disclosure">Source: ${item.source} · ${item.timestamp}</div>
        </div>
      `
    )
    .join("");
};

const getCredibilityPanel = () => `
  <div class="card">
    <div class="section-title">Credibility</div>
    <div class="ticker-row"><div>Source links</div><span class="badge">3 sources</span></div>
    <div class="ticker-row"><div>Timestamp</div><span class="badge">Updated today</span></div>
    <div class="ticker-row"><div>Confidence</div><span class="badge success">High</span></div>
    <div class="ticker-row"><div>Analyst track record</div><span class="badge">68% hit rate</span></div>
    <div class="ticker-row"><div>Author performance</div><span class="badge">+12% vs benchmark</span></div>
  </div>
`;

const getRatingsSystem = () => `
  <div class="card">
    <div class="section-title">Ratings system</div>
    <div class="rating-score">82</div>
    <div class="ticker-row"><div>AI rating</div><span class="badge success">Bullish</span></div>
    <div class="ticker-row"><div>Analyst consensus</div><span class="badge primary">Buy</span></div>
    <div class="ticker-row"><div>Author sentiment</div><span class="badge">Positive</span></div>
    <div class="ticker-row"><div>Crowd sentiment</div><span class="badge">65% Bull</span></div>
  </div>
`;

const getAnalystRatingsTable = () => `
  <table class="table">
    <tr><th>Firm</th><th>Action</th><th>Rating</th><th>Target</th></tr>
    <tr><td>UBS</td><td>Upgrade</td><td>Buy</td><td>$210</td></tr>
    <tr><td>Goldman</td><td>Reiterate</td><td>Buy</td><td>$205</td></tr>
    <tr><td>Barclays</td><td>Raise</td><td>Overweight</td><td>$198</td></tr>
  </table>
`;

const getBuybackDividendWidget = () => `
  <div class="card">
    <div class="section-title">Buybacks & dividends</div>
    <div class="metric-grid">
      <div class="metric-tile">Buyback: $90B authorized</div>
      <div class="metric-tile">Dividend: $0.24/qtr</div>
      <div class="metric-tile">Yield: 0.5%</div>
      <div class="metric-tile">Next ex-date: Mar 12</div>
    </div>
  </div>
`;

const getCommunityBlock = () => `
  <div class="card">
    <div class="section-title">Community debate</div>
    <div class="comment"><strong>Bull case:</strong> Services mix drives margin stability.</div>
    <div class="comment"><strong>Bear case:</strong> Hardware cycles remain choppy.</div>
    <div class="comment"><strong>Neutral:</strong> Valuation fair vs growth.</div>
    <div class="disclosure">Follow authors · Join discussion</div>
  </div>
`;

const getScreenerFilters = () => `
  <div class="card">
    <div class="section-title">Filters</div>
    <div>
      <span class="chip">Recent insider buying</span>
      <span class="chip">Congress buy + analyst upgrade</span>
      <span class="chip">High dividend growth</span>
      <span class="chip">Strong earnings revisions</span>
    </div>
  </div>
`;

const getScreenerResults = (data) => `
  <div class="card">
    <div class="section-title">Results</div>
    <table class="table">
      <tr><th>Ticker</th><th>Signal</th><th>Rating</th><th>Action</th></tr>
      ${data.tickers
        .map(
          (ticker) => `
            <tr>
              <td>${ticker.symbol}</td>
              <td>${getTickerBadge(data, ticker)}</td>
              <td>82</td>
              <td><a href="#/stock/${ticker.symbol}">Open</a></td>
            </tr>
          `
        )
        .join("")}
    </table>
  </div>
`;

const renderWatchlist = () => {
  const data = getActiveBlueprint();
  appRoot.innerHTML = `
    ${renderSubNav(data, "Alerts")}
    <div class="page-title">Watchlists & Alerts</div>
    <div class="layout-activity">
      <div class="card">
        <div class="section-title">Following</div>
        <div class="ticker-row"><div>Stocks</div><span class="badge">AAPL, NVDA, MSFT</span></div>
        <div class="ticker-row"><div>Investors</div><span class="badge">Nancy P., Ackman</span></div>
        <div class="ticker-row"><div>Analysts</div><span class="badge">UBS, Goldman</span></div>
        <div class="ticker-row"><div>Sectors</div><span class="badge">AI, Semis</span></div>
      </div>
      <div class="card">
        <div class="section-title">Alert rules</div>
        <div class="ticker-row"><div>Rating change</div><span class="badge">On</span></div>
        <div class="ticker-row"><div>Large trade</div><span class="badge">On</span></div>
        <div class="ticker-row"><div>Earnings</div><span class="badge">On</span></div>
        <div class="ticker-row"><div>Article published</div><span class="badge">On</span></div>
      </div>
    </div>
  `;
};

const renderScreener = () => {
  const data = getActiveBlueprint();
  appRoot.innerHTML = `
    ${renderSubNav(data, "Screeners")}
    <div class="page-title">Search & Screener</div>
    <div class="card" style="margin-bottom: 16px;">
      <div class="section-title">Search</div>
      <div class="search-bar">
        <input class="search-input" placeholder="Search tickers, investors, analysts..." />
        <span class="pill">Search</span>
      </div>
    </div>
    <div class="layout-activity">
      ${getScreenerFilters()}
      ${getScreenerResults(data)}
    </div>
  `;
};
const getWhyNowCards = (data) => {
  const signals = getSignalsFromActivity(data);
  return signals
    .map(
      (signal) => `
        <div class="card accent-card" style="margin-bottom: 12px;">
          <div class="section-title">
            ${signal.ticker} · Impact ${signal.impactScore}
          </div>
          <div>${signal.summary}</div>
          <div class="disclosure">Why now: signal moved within 72 hours.</div>
        </div>
      `
    )
    .join("");
};

const getSignalStack = (data, ticker) => `
  <div class="card">
    <div class="section-title">Signal stack</div>
    <div class="ticker-row"><div>Quant / Rank</div><span class="badge primary">${getTickerBadge(data, ticker)}</span></div>
    <div class="ticker-row"><div>Analyst consensus</div><span class="badge">Positive</span></div>
    <div class="ticker-row"><div>Insider/Congress</div><span class="badge">Net buy</span></div>
    <div class="ticker-row"><div>Estimate revisions</div><span class="badge success">Upward</span></div>
  </div>
`;

const getWhatChangedTimeline = () => `
  <div class="card">
    <div class="section-title">What changed</div>
    <div class="ticker-row"><div>Feb 15</div><span class="badge">Analyst upgrade</span></div>
    <div class="ticker-row"><div>Feb 13</div><span class="badge">Insider buy</span></div>
    <div class="ticker-row"><div>Feb 10</div><span class="badge">Estimate revision</span></div>
  </div>
`;

const renderStockHighlights = (data, ticker) => {
  if (data.id === "b1") {
    return `
      <section class="card">
        <div class="section-title">Quant + community snapshot</div>
        <div class="ticker-row">
          <div>Quant rating</div>
          <span class="badge primary">${ticker.quantRating || "Buy"}</span>
        </div>
        <div class="ticker-row">
          <div>Author sentiment</div>
          <span class="badge success">Bullish</span>
        </div>
        <div class="ticker-row">
          <div>Coverage</div>
          <span class="badge">High</span>
        </div>
      </section>
    `;
  }
  if (data.id === "b2") {
    return `
      <section class="card">
        <div class="section-title">Newsletter conviction</div>
        <div class="ticker-row">
          <div>Pick status</div>
          <span class="badge primary">${ticker.newsletterPick || "Pick"}</span>
        </div>
        <div class="ticker-row">
          <div>Holding horizon</div>
          <span class="badge">3-5 years</span>
        </div>
        <div class="ticker-row">
          <div>Portfolio role</div>
          <span class="badge">Core</span>
        </div>
      </section>
    `;
  }
  if (data.id === "b3") {
    return `
      <section class="card">
        <div class="section-title">Earnings + rank summary</div>
        <div class="ticker-row">
          <div>Zacks rank</div>
          <span class="badge primary">${ticker.zacksRank || "2 - Buy"}</span>
        </div>
        <div class="ticker-row">
          <div>Estimate revisions</div>
          <span class="badge success">Upward</span>
        </div>
        <div class="ticker-row">
          <div>Surprise history</div>
          <span class="badge">2/4 beats</span>
        </div>
      </section>
    `;
  }
  if (data.id === "b4") {
    return `
      <section class="card">
        <div class="section-title">Alternative data signals</div>
        <div class="ticker-row">
          <div>Signal</div>
          <span class="badge primary">${ticker.altSignal || "Cluster"}</span>
        </div>
        <div class="ticker-row">
          <div>Congress activity</div>
          <span class="badge">Net buy</span>
        </div>
        <div class="ticker-row">
          <div>Insider activity</div>
          <span class="badge">Neutral</span>
        </div>
      </section>
    `;
  }
  if (data.id === "b5") {
    return `
      <section class="card">
        <div class="section-title">Analyst + insider pulse</div>
        <div class="ticker-row">
          <div>Consensus</div>
          <span class="badge primary">${ticker.analystConsensus || "Buy"}</span>
        </div>
        <div class="ticker-row">
          <div>Price target</div>
          <span class="badge">+12% upside</span>
        </div>
        <div class="ticker-row">
          <div>Insider sentiment</div>
          <span class="badge">Neutral</span>
        </div>
      </section>
    `;
  }
  return "";
};

const syncBlueprintSelect = () => {
  if (!blueprintSelect) {
    return;
  }
  const id = getActiveBlueprintId();
  const validId = mockData.blueprints[id] ? id : DEFAULT_BLUEPRINT_ID;
  blueprintSelect.value = validId;
  if (validId !== id) {
    setStoredBlueprintId(validId);
  }
};

const getTicker = (symbol, data) =>
  data.tickers.find((ticker) => ticker.symbol === symbol);

const getArticle = (id, data) =>
  data.articles.find((article) => article.id === id);

const renderHome = () => {
  const data = getActiveBlueprint();
  const articlesMarkup = data.articles
    .map(
      (article) => `
        <article class="card">
          <h3>${article.title}</h3>
          <p>${article.summary}</p>
          <div>
            ${article.tickers
              .map((ticker) => `<span class="badge primary">${ticker}</span>`)
              .join("")}
          </div>
          <div class="section-title">Read more</div>
          <a href="#/article/${article.id}" class="pill">Open article</a>
        </article>
      `
    )
    .join("");

  const trendingMarkup = [...data.tickers]
    .sort((a, b) => b.trendingScore - a.trendingScore)
    .map(
      (ticker) => `
        <div class="ticker-row">
          <div>
            <strong>${ticker.symbol}</strong> ${ticker.name}
            <span class="badge primary">${getTickerBadge(data, ticker)}</span>
          </div>
          <div>${ticker.price} (${ticker.change}%)</div>
        </div>
      `
    )
    .join("");

  if (data.id === "b2") {
    appRoot.innerHTML = `
      ${renderSubNav(data, "Picks")}
      <div class="card theme-hero accent-card">
        <div>
          <div class="hero-title">${data.name}</div>
          <div class="hero-subtitle">${data.tagline}</div>
        </div>
        <div class="hero-badges">
          <span class="badge primary">5-min briefing</span>
          <span class="badge">Signals</span>
          <span class="badge">Watchlist</span>
        </div>
      </div>
      <div class="layout-home" style="margin-top: 16px;">
        <div class="card">
          <div class="section-title">Why now</div>
          ${getWhyNowCards(data)}
        </div>
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Trending tickers</div>
            ${trendingMarkup}
            <div class="disclosure">Newsletter cadence: weekly.</div>
          </section>
          ${getNewsFlashCards(data)}
          ${getPricingWidget(data)}
        </div>
      </div>
      <section class="card" style="margin-top: 16px;">
        <div class="section-title">Latest newsletter picks</div>
        ${articlesMarkup}
      </section>
    `;
    return;
  }

  if (data.id === "b3") {
    appRoot.innerHTML = `
      ${renderSubNav(data, "Ranks")}
      <div class="card theme-hero accent-card">
        <div>
          <div class="hero-title">${data.name}</div>
          <div class="hero-subtitle">${data.tagline}</div>
        </div>
        <div class="hero-badges">
          <span class="badge primary">Zacks Rank</span>
          <span class="badge">Estimate revisions</span>
        </div>
      </div>
      <div class="layout-home" style="margin-top: 16px;">
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Why now</div>
            ${getWhyNowCards(data)}
          </section>
          <section class="card">
            <div class="section-title">Research highlights</div>
            ${articlesMarkup}
          </section>
        </div>
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Ranked tickers</div>
            ${trendingMarkup}
          </section>
          ${getNewsFlashCards(data)}
          ${getPricingWidget(data)}
        </div>
      </div>
    `;
    return;
  }

  if (data.id === "b4") {
    appRoot.innerHTML = `
      ${renderSubNav(data, "Alt Data")}
      <div class="card theme-hero accent-card">
        <div>
          <div class="hero-title">${data.name}</div>
          <div class="hero-subtitle">${data.tagline}</div>
        </div>
        <div class="hero-badges">
          <span class="badge primary">Alt data</span>
          <span class="badge">Public filings</span>
        </div>
      </div>
      <div class="layout-home" style="margin-top: 16px;">
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Why now</div>
            ${getWhyNowCards(data)}
          </section>
          <section class="card">
            <div class="section-title">Congress trades</div>
            ${articlesMarkup}
          </section>
        </div>
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Trending signals</div>
            ${trendingMarkup}
          </section>
          ${getNewsFlashCards(data)}
          ${getPricingWidget(data)}
        </div>
      </div>
    `;
    return;
  }

  if (data.id === "b5") {
    appRoot.innerHTML = `
      ${renderSubNav(data, "News")}
      <div class="card theme-hero accent-card">
        <div>
          <div class="hero-title">${data.name}</div>
          <div class="hero-subtitle">${data.tagline}</div>
        </div>
        <div class="hero-badges">
          <span class="badge primary">Analyst rank</span>
          <span class="badge">Insider sentiment</span>
        </div>
      </div>
      <div class="layout-home" style="margin-top: 16px;">
        <div class="card">
          <div class="section-title">Why now</div>
          ${getWhyNowCards(data)}
        </div>
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Consensus watchlist</div>
            ${trendingMarkup}
            <div class="disclosure">Consensus refreshes daily.</div>
          </section>
          ${getNewsFlashCards(data)}
          ${getPricingWidget(data)}
        </div>
      </div>
      <section class="card" style="margin-top: 16px;">
        <div class="section-title">Top analyst notes</div>
        ${articlesMarkup}
      </section>
    `;
    return;
  }

  appRoot.innerHTML = `
    ${renderSubNav(data, "News")}
    <div class="page-title">${data.name}</div>
    <div class="card accent-card" style="margin-bottom: 16px;">
      <div class="section-title">Blueprint overview</div>
      <div>${data.tagline}</div>
    </div>
    <div class="layout-home">
      <div>
        <section class="card" style="margin-bottom: 16px;">
          <div class="section-title">Why now</div>
          ${getWhyNowCards(data)}
        </section>
        <section class="card">
          <div class="section-title">Trending tickers</div>
          ${trendingMarkup}
          <div class="disclosure">Signals update throughout the day.</div>
        </section>
      </div>
      <div>
        ${getPricingWidget(data)}
        <section class="card" style="margin-top: 16px;">
          <div class="section-title">News flash</div>
          ${getNewsFlashCards(data)}
        </section>
        <section class="card" style="margin-top: 16px;">
          <div class="section-title">Latest articles</div>
          ${articlesMarkup}
        </section>
      </div>
    </div>
  `;
};

const renderStock = (symbol) => {
  const data = getActiveBlueprint();
  const ticker = getTicker(symbol, data);
  if (!ticker) {
    appRoot.innerHTML = `<div class="page-title">Ticker not found</div>`;
    return;
  }

  const relatedArticles = data.articles
    .filter((article) => article.tickers.includes(symbol))
    .map(
      (article) => `
        <div class="ticker-row">
          <div>${article.title}</div>
          <a href="#/article/${article.id}">Open</a>
        </div>
      `
    )
    .join("");

  const activityItems = [
    ...data.activities.congressTrades,
    ...data.activities.analystRatings,
    ...data.activities.institutionalChanges
  ].filter((item) => item.ticker === symbol);

  const activityMarkup = activityItems
    .map(
      (item) => `
        <div class="activity-item">
          <div>
            <strong>${item.actor || item.firm}</strong> ${item.action}
            <span class="badge">${item.ticker}</span>
          </div>
          <div>${item.date}</div>
        </div>
      `
    )
    .join("");

  const baseMetrics = `
    <table class="table">
      <tr><th>Market cap</th><td>${ticker.metrics.marketCap}</td></tr>
      <tr><th>P/E</th><td>${ticker.metrics.pe}</td></tr>
      <tr><th>Revenue growth</th><td>${ticker.metrics.revenueGrowth}</td></tr>
      <tr><th>Gross margin</th><td>${ticker.metrics.grossMargin}</td></tr>
      <tr><th>Dividend yield</th><td>${ticker.metrics.dividendYield}</td></tr>
    </table>
  `;

  let stockLayout = `
    ${renderSubNav(data, "Stocks")}
    <div class="page-title">${ticker.symbol} — ${ticker.name}</div>
    <div class="layout-stock">
      <div>
        <section class="card" style="margin-bottom: 16px;">
          <div class="section-title">Price chart</div>
          <div class="chart-placeholder">Price chart placeholder</div>
          <div style="margin-top: 12px;">
            <span class="badge success">Trend: ${ticker.trend}</span>
            <span class="badge primary">Price: ${ticker.price}</span>
            <span class="badge ${ticker.change >= 0 ? "success" : "warn"}">
              ${ticker.change}%
            </span>
          </div>
        </section>
        ${renderStockHighlights(data, ticker)}
        ${getSignalStack(data, ticker)}
        <section class="card" style="margin-top: 16px;">
          <div class="section-title">Recent activity</div>
          ${activityMarkup || "<div>No activity yet.</div>"}
        </section>
      </div>
      <div>
        <section class="card" style="margin-bottom: 16px;">
          <div class="section-title">Key metrics</div>
          ${baseMetrics}
        </section>
        ${getRatingsSystem()}
        ${getWhatChangedTimeline()}
        ${getBuybackDividendWidget()}
        <section class="card" style="margin-bottom: 16px;">
          <div class="section-title">Related articles</div>
          ${relatedArticles || "<div>No related articles yet.</div>"}
        </section>
        ${getPricingWidget(data)}
      </div>
    </div>
  `;

  if (data.id === "b1") {
    stockLayout = `
      ${renderSubNav(data, "Stocks")}
      <div class="page-title">${ticker.symbol} — ${ticker.name}</div>
      <div class="layout-stock">
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Price + momentum</div>
            <div class="chart-placeholder">Price chart placeholder</div>
            <div style="margin-top: 12px;">
              <span class="badge success">Trend: ${ticker.trend}</span>
              <span class="badge primary">${ticker.quantRating || "Quant"}</span>
            </div>
          </section>
          ${renderStockHighlights(data, ticker)}
          <section class="card" style="margin-top: 16px;">
            <div class="section-title">Factor grades</div>
            <div class="ticker-row"><div>Valuation</div><span class="badge">B+</span></div>
            <div class="ticker-row"><div>Growth</div><span class="badge success">A</span></div>
            <div class="ticker-row"><div>Momentum</div><span class="badge">B</span></div>
            <div class="ticker-row"><div>Profitability</div><span class="badge success">A-</span></div>
          </section>
          ${getSignalStack(data, ticker)}
        </div>
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Key metrics</div>
            ${baseMetrics}
          </section>
          ${getRatingsSystem()}
          ${getWhatChangedTimeline()}
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Earnings call transcript</div>
            ${getTranscriptWidget()}
          </section>
          ${getBuybackDividendWidget()}
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Analyst ratings</div>
            ${getAnalystRatingsTable()}
          </section>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Contributor coverage</div>
            ${relatedArticles || "<div>No related articles yet.</div>"}
          </section>
          ${getPricingWidget(data)}
        </div>
      </div>
      <section class="card" style="margin-top: 16px;">
        <div class="section-title">Recent activity</div>
        ${activityMarkup || "<div>No activity yet.</div>"}
      </section>
    `;
  }

  if (data.id === "b2") {
    stockLayout = `
      ${renderSubNav(data, "Stocks")}
      <div class="page-title">${ticker.symbol} — ${ticker.name}</div>
      <div class="layout-stock">
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Pick thesis</div>
            <p>Long-term compounding play with durable customer demand.</p>
            <div class="ticker-row"><div>Conviction</div><span class="badge primary">${ticker.newsletterPick || "Pick"}</span></div>
            <div class="ticker-row"><div>Horizon</div><span class="badge">3-5 years</span></div>
          </section>
          <section class="card">
            <div class="section-title">Portfolio role</div>
            <div class="ticker-row"><div>Allocation</div><span class="badge">Core</span></div>
            <div class="ticker-row"><div>Volatility</div><span class="badge">Medium</span></div>
            <div class="ticker-row"><div>Update cadence</div><span class="badge">Weekly</span></div>
          </section>
          ${getSignalStack(data, ticker)}
        </div>
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Price chart</div>
            <div class="chart-placeholder">Price chart placeholder</div>
          </section>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Key metrics</div>
            ${baseMetrics}
          </section>
          ${getRatingsSystem()}
          ${getWhatChangedTimeline()}
          ${getPricingWidget(data)}
        </div>
      </div>
      <div class="layout-home" style="margin-top: 16px;">
        <section class="card">
          <div class="section-title">Newsletter updates</div>
          ${relatedArticles || "<div>No related articles yet.</div>"}
        </section>
        <section class="card">
          <div class="section-title">Portfolio activity</div>
          ${activityMarkup || "<div>No activity yet.</div>"}
        </section>
      </div>
    `;
  }

  if (data.id === "b3") {
    stockLayout = `
      ${renderSubNav(data, "Stocks")}
      <div class="page-title">${ticker.symbol} — ${ticker.name}</div>
      <div class="layout-stock">
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Zacks Rank</div>
            <div class="widget">Current rank: ${ticker.zacksRank || "2 - Buy"}</div>
            ${getRankingTable(data, "Score")}
          </section>
          <section class="card">
            <div class="section-title">Earnings estimate trend</div>
            <div class="chart-placeholder">Estimate revision chart</div>
            <div class="disclosure">Revision momentum over 30 days.</div>
          </section>
          ${getSignalStack(data, ticker)}
        </div>
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Key metrics</div>
            ${baseMetrics}
          </section>
          ${getRatingsSystem()}
          ${getWhatChangedTimeline()}
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Ranked coverage</div>
            ${relatedArticles || "<div>No related articles yet.</div>"}
          </section>
          ${getPricingWidget(data)}
        </div>
      </div>
    `;
  }

  if (data.id === "b4") {
    stockLayout = `
      ${renderSubNav(data, "Stocks")}
      <div class="page-title">${ticker.symbol} — ${ticker.name}</div>
      <div class="layout-stock">
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Alt data signal</div>
            <div class="widget">${ticker.altSignal || "Signal cluster detected"}</div>
            <div class="chart-placeholder" style="height: 140px;">Signal intensity</div>
          </section>
          <section class="card">
            <div class="section-title">Congress + insider trades</div>
            ${activityMarkup || "<div>No activity yet.</div>"}
          </section>
          ${getSignalStack(data, ticker)}
        </div>
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Key metrics</div>
            ${baseMetrics}
          </section>
          ${getRatingsSystem()}
          ${getWhatChangedTimeline()}
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Insider trades</div>
            ${getInsiderTable()}
          </section>
          ${getPricingWidget(data)}
        </div>
      </div>
      <section class="card" style="margin-top: 16px;">
        <div class="section-title">Related coverage</div>
        ${relatedArticles || "<div>No related articles yet.</div>"}
      </section>
    `;
  }

  if (data.id === "b5") {
    stockLayout = `
      ${renderSubNav(data, "Stocks")}
      <div class="page-title">${ticker.symbol} — ${ticker.name}</div>
      <div class="layout-stock">
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Analyst consensus</div>
            <div class="widget">Consensus: ${ticker.analystConsensus || "Buy"}</div>
            ${getAnalystAccuracyWidget()}
          </section>
          <section class="card">
            <div class="section-title">Rating breakdown</div>
            ${getRatingBreakdownTable()}
          </section>
          ${getSignalStack(data, ticker)}
        </div>
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Insider activity</div>
            ${getInsiderTable()}
          </section>
          ${getRatingsSystem()}
          ${getWhatChangedTimeline()}
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Related analysis</div>
            ${relatedArticles || "<div>No related articles yet.</div>"}
          </section>
          ${getPricingWidget(data)}
        </div>
      </div>
    `;
  }

  appRoot.innerHTML = `
    ${stockLayout}
    <div class="disclosure">
      Disclosures: Metrics are placeholders. See data source policy.
    </div>
  `;
};

const renderArticle = (id) => {
  const data = getActiveBlueprint();
  const article = getArticle(id, data);
  if (!article) {
    appRoot.innerHTML = `<div class="page-title">Article not found</div>`;
    return;
  }

  const tickersMarkup = article.tickers
    .map((ticker) => `<span class="badge primary">${ticker}</span>`)
    .join("");

  let articleLayout = `
    ${renderSubNav(data, "News")}
    <div class="page-title">${article.title}</div>
    <div class="card">
      <div>${tickersMarkup}</div>
      <div class="section-title" style="margin-top: 8px;">
        ${article.author} · ${article.date}
      </div>
      <p>${article.summary}</p>
      ${article.content.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      <div class="section-title" style="margin-top: 12px;">Key thesis</div>
      <ul>
        <li>Signal momentum aligns with earnings revisions.</li>
        <li>Consensus supports upside with low dispersion.</li>
        <li>Insider activity remains net positive.</li>
      </ul>
      <div class="section-title" style="margin-top: 12px;">
        ${data.name} context
      </div>
      <div class="ticker-row">
        <div>Editorial lens</div>
        <span class="badge primary">
          ${getTickerBadge(data, getTicker(article.tickers[0], data) || {})}
        </span>
      </div>
      ${getCredibilityPanel()}
      <div class="disclosure">Disclosure: ${article.disclosures}</div>
    </div>
  `;

  if (data.id === "b1") {
    articleLayout = `
      ${renderSubNav(data, "News")}
      <div class="page-title">${article.title}</div>
      <div class="layout-article">
        <section class="card">
          <div>${tickersMarkup}</div>
          <div class="section-title" style="margin-top: 8px;">
            ${article.author} · ${article.date}
          </div>
          <p>${article.summary}</p>
          ${article.content.map((paragraph) => `<p>${paragraph}</p>`).join("")}
          <div class="section-title" style="margin-top: 12px;">Key thesis</div>
          <ul>
            <li>Quant momentum supports near-term upside.</li>
            <li>Transcript suggests margin stability.</li>
            <li>Revisions remain net positive.</li>
          </ul>
        </section>
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Quant + transcript</div>
            <div class="widget">Quant rating: Strong Buy · Factor grades A/B+</div>
            <div style="margin-top: 12px;">${getTranscriptWidget()}</div>
            <div class="disclosure">Contributor articles are opinion-based.</div>
          </section>
          ${getSignalStack(data, getTicker(article.tickers[0], data) || {})}
          ${getCredibilityPanel()}
          ${getPricingWidget(data)}
        </div>
      </div>
      <div class="disclosure">Disclosure: ${article.disclosures}</div>
    `;
  }

  if (data.id === "b2") {
    articleLayout = `
      ${renderSubNav(data, "Picks")}
      <div class="page-title">${article.title}</div>
      <div class="layout-article">
        <section class="card">
          <div>${tickersMarkup}</div>
          <div class="section-title" style="margin-top: 8px;">
            ${article.author} · ${article.date}
          </div>
          <p>${article.summary}</p>
          ${article.content.map((paragraph) => `<p>${paragraph}</p>`).join("")}
          <div class="section-title" style="margin-top: 12px;">Key thesis</div>
          <ul>
            <li>Long-term moat supports compounding.</li>
            <li>Portfolio fit remains strong.</li>
            <li>Short-term volatility acceptable.</li>
          </ul>
        </section>
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Newsletter snapshot</div>
            <div class="ticker-row"><div>Pick status</div><span class="badge primary">Top Pick</span></div>
            <div class="ticker-row"><div>Horizon</div><span class="badge">3-5 years</span></div>
            <div class="ticker-row"><div>Risk rating</div><span class="badge">Medium</span></div>
            <div class="widget" style="margin-top: 12px;">CTA: Join premium picks</div>
          </section>
          ${getSignalStack(data, getTicker(article.tickers[0], data) || {})}
          ${getCredibilityPanel()}
          ${getPricingWidget(data)}
        </div>
      </div>
      <div class="disclosure">Disclosure: ${article.disclosures}</div>
    `;
  }

  if (data.id === "b3") {
    articleLayout = `
      ${renderSubNav(data, "Research")}
      <div class="page-title">${article.title}</div>
      <div class="layout-article">
        <section class="card">
          <div>${tickersMarkup}</div>
          <div class="section-title" style="margin-top: 8px;">
            ${article.author} · ${article.date}
          </div>
          <p>${article.summary}</p>
          ${article.content.map((paragraph) => `<p>${paragraph}</p>`).join("")}
          <div class="section-title" style="margin-top: 12px;">Key thesis</div>
          <ul>
            <li>Estimate revisions support rank upgrade.</li>
            <li>Surprise history improves confidence.</li>
            <li>Valuation remains in-range.</li>
          </ul>
        </section>
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Earnings estimate table</div>
            ${getRankingTable(data, "Rank")}
            <div class="disclosure">Ranks update on estimate revisions.</div>
          </section>
          ${getSignalStack(data, getTicker(article.tickers[0], data) || {})}
          ${getCredibilityPanel()}
          ${getPricingWidget(data)}
        </div>
      </div>
      <div class="disclosure">Disclosure: ${article.disclosures}</div>
    `;
  }

  if (data.id === "b4") {
    articleLayout = `
      ${renderSubNav(data, "Alt Data")}
      <div class="page-title">${article.title}</div>
      <div class="layout-article">
        <section class="card">
          <div>${tickersMarkup}</div>
          <div class="section-title" style="margin-top: 8px;">
            ${article.author} · ${article.date}
          </div>
          <p>${article.summary}</p>
          ${article.content.map((paragraph) => `<p>${paragraph}</p>`).join("")}
          <div class="section-title" style="margin-top: 12px;">Key thesis</div>
          <ul>
            <li>Alt data cluster indicates renewed interest.</li>
            <li>Congressional buys align with price trend.</li>
            <li>Insider activity remains neutral.</li>
          </ul>
        </section>
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Alternative data signals</div>
            <div class="chart-placeholder">Signal timeline</div>
            <div class="widget" style="margin-top: 12px;">Congress: Net buys up 3%.</div>
          </section>
          ${getSignalStack(data, getTicker(article.tickers[0], data) || {})}
          ${getCredibilityPanel()}
          ${getPricingWidget(data)}
        </div>
      </div>
      <div class="disclosure">Disclosure: ${article.disclosures}</div>
    `;
  }

  if (data.id === "b5") {
    articleLayout = `
      ${renderSubNav(data, "News")}
      <div class="page-title">${article.title}</div>
      <div class="layout-article">
        <section class="card">
          <div>${tickersMarkup}</div>
          <div class="section-title" style="margin-top: 8px;">
            ${article.author} · ${article.date}
          </div>
          <p>${article.summary}</p>
          ${article.content.map((paragraph) => `<p>${paragraph}</p>`).join("")}
          <div class="section-title" style="margin-top: 12px;">Key thesis</div>
          <ul>
            <li>Analyst consensus remains strong.</li>
            <li>Target dispersion stays tight.</li>
            <li>Insider table shows limited selling.</li>
          </ul>
        </section>
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Analyst accuracy</div>
            ${getAnalystAccuracyWidget()}
            <div class="section-title" style="margin-top: 12px;">Rating breakdown</div>
            ${getRatingBreakdownTable()}
            <div class="section-title" style="margin-top: 12px;">Insider table</div>
            ${getInsiderTable()}
          </section>
          ${getSignalStack(data, getTicker(article.tickers[0], data) || {})}
          ${getCredibilityPanel()}
          ${getPricingWidget(data)}
        </div>
      </div>
      <div class="disclosure">Disclosure: ${article.disclosures}</div>
    `;
  }

  appRoot.innerHTML = articleLayout;
};

const renderActivity = () => {
  const data = getActiveBlueprint();
  const tabConfig = [
    { key: "congressTrades", label: "Congress trades" },
    { key: "analystRatings", label: "Analyst ratings" },
    { key: "institutionalChanges", label: "Institutional changes" }
  ];

  const currentTab = new URLSearchParams(location.hash.split("?")[1] || "")
    .get("tab") || "congressTrades";

  const activeItems = data.activities[currentTab] || [];

  const tabButtons = tabConfig
    .map(
      (tab) => `
        <button class="tab-button ${tab.key === currentTab ? "active" : ""}"
          data-tab="${tab.key}">
          ${tab.label}
        </button>
      `
    )
    .join("");

  const rows = activeItems
    .map((item) => {
      if (currentTab === "analystRatings") {
        return `
          <div class="activity-item">
            <div>
              <strong>${item.firm}</strong> ${item.action}
              <span class="badge primary">${item.ticker}</span>
              <span class="badge">${item.rating}</span>
            </div>
            <div>Target ${item.target} · ${item.date}</div>
          </div>
        `;
      }
      if (currentTab === "institutionalChanges") {
        return `
          <div class="activity-item">
            <div>
              <strong>${item.firm}</strong> ${item.action}
              <span class="badge primary">${item.ticker}</span>
            </div>
            <div>${item.stake} · ${item.date}</div>
          </div>
        `;
      }
      return `
        <div class="activity-item">
          <div>
            <strong>${item.actor}</strong> ${item.action}
            <span class="badge primary">${item.ticker}</span>
          </div>
          <div>${item.size} · ${item.date}</div>
        </div>
      `;
    })
    .join("");

  let activityLayout = `
    ${renderSubNav(data, "Signals")}
    <div class="page-title">Activity</div>
    <div class="tabs">${tabButtons}</div>
    <div class="layout-activity">
      <div class="card">
        <div class="section-title">Signal feed</div>
        <div class="disclosure">Filters: Impact, Source, Time</div>
        ${rows || "<div>No activity yet.</div>"}
      </div>
      <div>
        <section class="card" style="margin-bottom: 16px;">
          <div class="section-title">Impact scoring</div>
          <div class="chart-placeholder">Impact distribution</div>
        </section>
        ${getPricingWidget(data)}
      </div>
    </div>
    <div class="disclosure">
      Disclosures: Activity data is illustrative only.
    </div>
  `;

  if (data.id === "b1") {
    activityLayout = `
      ${renderSubNav(data, "Transcripts")}
      <div class="page-title">Activity</div>
      <div class="tabs">${tabButtons}</div>
      <div class="layout-activity">
        <div class="card">${rows || "<div>No activity yet.</div>"}</div>
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Earnings transcript highlights</div>
            ${getTranscriptWidget()}
          </section>
          ${getPricingWidget(data)}
        </div>
      </div>
      <div class="disclosure">Disclosures: Activity data is illustrative only.</div>
    `;
  }

  if (data.id === "b2") {
    activityLayout = `
      ${renderSubNav(data, "Portfolios")}
      <div class="page-title">Newsletter updates</div>
      <div class="tabs">${tabButtons}</div>
      <div class="layout-activity">
        <div class="card">${rows || "<div>No activity yet.</div>"}</div>
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Model portfolio changes</div>
            <div class="ticker-row"><div>Add</div><span class="badge primary">META</span></div>
            <div class="ticker-row"><div>Hold</div><span class="badge">AAPL</span></div>
            <div class="ticker-row"><div>Trim</div><span class="badge warn">TSLA</span></div>
          </section>
          ${getPricingWidget(data)}
        </div>
      </div>
      <div class="disclosure">Disclosures: Newsletter updates are illustrative only.</div>
    `;
  }

  if (data.id === "b3") {
    activityLayout = `
      ${renderSubNav(data, "Earnings")}
      <div class="page-title">Rank activity</div>
      <div class="tabs">${tabButtons}</div>
      <div class="layout-activity">
        <div class="card">${rows || "<div>No activity yet.</div>"}</div>
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Zacks Rank table</div>
            ${getRankingTable(data, "Rank")}
          </section>
          ${getPricingWidget(data)}
        </div>
      </div>
      <div class="disclosure">Disclosures: Rankings are illustrative only.</div>
    `;
  }

  if (data.id === "b4") {
    activityLayout = `
      ${renderSubNav(data, "Congress")}
      <div class="page-title">Alternative data feed</div>
      <div class="tabs">${tabButtons}</div>
      <div class="layout-activity">
        <div class="card">${rows || "<div>No activity yet.</div>"}</div>
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Signal heatmap</div>
            <div class="chart-placeholder">Alt data heatmap</div>
            <div class="disclosure">Signals sourced from public filings.</div>
            <div class="section-title" style="margin-top: 12px;">Insider table</div>
            ${getInsiderTable()}
          </section>
          ${getPricingWidget(data)}
        </div>
      </div>
      <div class="disclosure">Disclosures: Activity data is illustrative only.</div>
    `;
  }

  if (data.id === "b5") {
    activityLayout = `
      ${renderSubNav(data, "Analysts")}
      <div class="page-title">Analyst + insider activity</div>
      <div class="tabs">${tabButtons}</div>
      <div class="layout-activity">
        <div class="card">${rows || "<div>No activity yet.</div>"}</div>
        <div>
          <section class="card" style="margin-bottom: 16px;">
            <div class="section-title">Analyst accuracy</div>
            ${getAnalystAccuracyWidget()}
            <div class="section-title" style="margin-top: 12px;">Top analysts</div>
            <div class="ticker-row"><div>Rank #1</div><span class="badge primary">UBS</span></div>
            <div class="ticker-row"><div>Rank #2</div><span class="badge">Goldman</span></div>
            <div class="section-title" style="margin-top: 12px;">Rating breakdown</div>
            ${getRatingBreakdownTable()}
          </section>
          ${getPricingWidget(data)}
        </div>
      </div>
      <div class="disclosure">Disclosures: Rankings are illustrative only.</div>
    `;
  }

  appRoot.innerHTML = activityLayout;

  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      location.hash = `#/activity?tab=${button.dataset.tab}`;
    });
  });
};

const renderRoute = () => {
  if (typeof USE_MOCK_DATA === "undefined" || USE_MOCK_DATA !== true) {
    return;
  }
  applyTheme();
  syncBlueprintSelect();
  const hash = window.location.hash || "#/home";
  const [path, param] = hash.replace("#/", "").split("/");
  document.body.setAttribute("data-page", path || "home");

  if (path === "home" || path === "") {
    renderHome();
    return;
  }

  if (path === "stock") {
    renderStock(param || "AAPL");
    return;
  }

  if (path === "article") {
    renderArticle(param || "1");
    return;
  }

  if (path === "activity") {
    renderActivity();
    return;
  }

  if (path === "watchlist") {
    renderWatchlist();
    return;
  }

  if (path === "screener") {
    renderScreener();
    return;
  }

  appRoot.innerHTML = `<div class="page-title">Page not found</div>`;
};

window.addEventListener("hashchange", renderRoute);
window.addEventListener("load", renderRoute);

if (blueprintSelect) {
  syncBlueprintSelect();
  blueprintSelect.addEventListener("change", () => {
    setStoredBlueprintId(blueprintSelect.value);
    renderRoute();
  });
}
