#!/bin/bash

set +e

PROJECT_DIR="/Users/maedan/Documents/Japan X Trip/01_Website/japan-x-trip"
TIMESTAMP="$(date '+%Y%m%d-%H%M%S')"
REPORT_DIR="$PROJECT_DIR/reports/overnight-audit-$TIMESTAMP"
MAIN_LOG="$REPORT_DIR/overnight-audit.log"
SERVER_LOG="$REPORT_DIR/local-server.log"
PORT=3210
SERVER_PID=""

mkdir -p "$REPORT_DIR"
cd "$PROJECT_DIR" || exit 1

exec > >(tee -a "$MAIN_LOG") 2>&1

echo "=================================================="
echo "Japan X Trip Overnight Full Audit"
echo "Started: $(date)"
echo "Project: $PROJECT_DIR"
echo "Report:  $REPORT_DIR"
echo "=================================================="

cleanup() {
  echo ""
  echo "=== Cleanup ==="

  if [ -n "$SERVER_PID" ] && kill -0 "$SERVER_PID" 2>/dev/null; then
    echo "Stopping local server PID: $SERVER_PID"
    kill "$SERVER_PID" 2>/dev/null
    wait "$SERVER_PID" 2>/dev/null
  fi

  EXISTING_PID="$(lsof -tiTCP:$PORT -sTCP:LISTEN 2>/dev/null)"
  if [ -n "$EXISTING_PID" ]; then
    echo "Stopping remaining process on port $PORT: $EXISTING_PID"
    kill "$EXISTING_PID" 2>/dev/null
  fi

  echo "Finished: $(date)"
}

trap cleanup EXIT INT TERM

run_step() {
  STEP_NAME="$1"
  shift

  echo ""
  echo "=================================================="
  echo "STEP: $STEP_NAME"
  echo "TIME: $(date)"
  echo "COMMAND: $*"
  echo "=================================================="

  "$@"
  STATUS=$?

  echo ""
  echo "RESULT: $STEP_NAME"
  echo "EXIT CODE: $STATUS"

  return $STATUS
}

script_exists() {
  node -e "
    const p = require('./package.json');
    process.exit(p.scripts && p.scripts['$1'] ? 0 : 1);
  " 2>/dev/null
}

echo ""
echo "=== Initial Repository State ==="

git branch --show-current > "$REPORT_DIR/current-branch.txt" 2>&1
git status --short > "$REPORT_DIR/git-status-before.txt" 2>&1
git diff --stat > "$REPORT_DIR/git-diff-stat-before.txt" 2>&1
git diff > "$REPORT_DIR/git-diff-before.patch" 2>&1

cat "$REPORT_DIR/current-branch.txt"
cat "$REPORT_DIR/git-status-before.txt"

echo ""
echo "=== Environment ==="

{
  echo "Date: $(date)"
  echo "macOS: $(sw_vers -productVersion 2>/dev/null)"
  echo "Node: $(node --version 2>/dev/null)"
  echo "npm: $(npm --version 2>/dev/null)"
  echo "Git: $(git --version 2>/dev/null)"
} | tee "$REPORT_DIR/environment.txt"

cp package.json "$REPORT_DIR/package.json.snapshot" 2>/dev/null

if [ -f package-lock.json ]; then
  cp package-lock.json "$REPORT_DIR/package-lock.json.snapshot"
fi

echo ""
echo "=== Package Scripts ==="

node -e "
  const p = require('./package.json');
  console.log(JSON.stringify(p.scripts || {}, null, 2));
" | tee "$REPORT_DIR/package-scripts.json"

echo ""
echo "=== Static Inventory ==="

find app -type f -name "page.tsx" | sort > "$REPORT_DIR/pages.txt"
find app components data lib -type f \
  \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) \
  2>/dev/null | sort > "$REPORT_DIR/source-files.txt"

find app components data lib public -type f -size +300k \
  2>/dev/null | sort > "$REPORT_DIR/large-files-over-300kb.txt"

wc -l "$REPORT_DIR/pages.txt" "$REPORT_DIR/source-files.txt" \
  > "$REPORT_DIR/inventory-counts.txt"

echo ""
echo "=== Affiliate Link Audit ==="

rg -n -i \
  "airalo|ubigi|sakura.mobile|affiliate|impact|referral|tracking|sponsored" \
  app components data lib \
  --glob '!*.map' \
  > "$REPORT_DIR/affiliate-references.txt" 2>&1

rg -n \
  "https?://" \
  app components data lib \
  --glob '*.ts' \
  --glob '*.tsx' \
  > "$REPORT_DIR/all-hardcoded-urls.txt" 2>&1

rg -n \
  "affiliateLinks|getGeneralAffiliateLink|affiliateUrl" \
  app components data lib \
  > "$REPORT_DIR/affiliate-usage.txt" 2>&1

echo ""
echo "=== SEO and Content Audit ==="

rg -n \
  "generateMetadata|metadata|title:|description:|canonical|openGraph|twitter:" \
  app \
  > "$REPORT_DIR/metadata-references.txt" 2>&1

rg -n \
  "<h1|<h2|<h3" \
  app components \
  > "$REPORT_DIR/headings.txt" 2>&1

rg -n \
  "application/ld\+json|schema.org|JSON-LD|structuredData" \
  app components lib \
  > "$REPORT_DIR/structured-data.txt" 2>&1

rg -n \
  "<img|<Image|alt=" \
  app components \
  > "$REPORT_DIR/image-alt-references.txt" 2>&1

rg -n \
  "TODO|FIXME|HACK|XXX|TEMP|temporary|placeholder" \
  app components data lib \
  > "$REPORT_DIR/todos-and-placeholders.txt" 2>&1

rg -n \
  "target=\"_blank\"" \
  app components \
  > "$REPORT_DIR/external-target-blank.txt" 2>&1

rg -n \
  "rel=\"[^\"]*sponsored|noopener|noreferrer" \
  app components \
  > "$REPORT_DIR/external-rel-attributes.txt" 2>&1

echo ""
echo "=== TypeScript ==="

if script_exists "typecheck"; then
  run_step "npm run typecheck" npm run typecheck \
    2>&1 | tee "$REPORT_DIR/typecheck.log"
else
  run_step "npx tsc --noEmit" npx tsc --noEmit \
    2>&1 | tee "$REPORT_DIR/typecheck.log"
fi

echo ""
echo "=== ESLint ==="

if script_exists "lint"; then
  run_step "npm run lint" npm run lint \
    2>&1 | tee "$REPORT_DIR/lint.log"
else
  echo "No lint script found." | tee "$REPORT_DIR/lint.log"
fi

echo ""
echo "=== Unit or Project Tests ==="

if script_exists "test"; then
  run_step "npm test" npm test -- --runInBand \
    2>&1 | tee "$REPORT_DIR/test.log"
elif script_exists "test:unit"; then
  run_step "npm run test:unit" npm run test:unit \
    2>&1 | tee "$REPORT_DIR/test.log"
else
  echo "No standard test script found." | tee "$REPORT_DIR/test.log"
fi

echo ""
echo "=== Production Build ==="

BUILD_OK=0

if script_exists "build"; then
  npm run build 2>&1 | tee "$REPORT_DIR/build.log"
  BUILD_STATUS=${PIPESTATUS[0]}

  if [ "$BUILD_STATUS" -eq 0 ]; then
    BUILD_OK=1
  fi
else
  echo "No build script found." | tee "$REPORT_DIR/build.log"
fi

echo "Build success flag: $BUILD_OK"

echo ""
echo "=== Playwright ==="

if [ -f "playwright.config.ts" ] || \
   [ -f "playwright.config.js" ] || \
   [ -f "playwright.config.mjs" ]; then

  if [ -d "node_modules/@playwright/test" ]; then
    npx playwright test \
      --workers=2 \
      --reporter=line \
      2>&1 | tee "$REPORT_DIR/playwright.log"
  else
    echo "Playwright config found, but @playwright/test is not installed locally." \
      | tee "$REPORT_DIR/playwright.log"
  fi
else
  echo "No Playwright config found." | tee "$REPORT_DIR/playwright.log"
fi

echo ""
echo "=== Local Production HTTP Audit ==="

if [ "$BUILD_OK" -eq 1 ]; then

  EXISTING_PID="$(lsof -tiTCP:$PORT -sTCP:LISTEN 2>/dev/null)"

  if [ -n "$EXISTING_PID" ]; then
    echo "Port $PORT is already in use by PID $EXISTING_PID."
    echo "Skipping local production server start." \
      | tee "$REPORT_DIR/http-audit-skipped.txt"
  else
    npx next start \
      -H 127.0.0.1 \
      -p "$PORT" \
      > "$SERVER_LOG" 2>&1 &

    SERVER_PID=$!

    echo "Started local server PID: $SERVER_PID"

    READY=0

    for i in $(seq 1 30); do
      HTTP_CODE="$(curl -s -o /dev/null -w "%{http_code}" \
        "http://127.0.0.1:$PORT/" 2>/dev/null)"

      if [ "$HTTP_CODE" = "200" ] || \
         [ "$HTTP_CODE" = "301" ] || \
         [ "$HTTP_CODE" = "302" ] || \
         [ "$HTTP_CODE" = "307" ] || \
         [ "$HTTP_CODE" = "308" ]; then
        READY=1
        break
      fi

      sleep 2
    done

    if [ "$READY" -eq 1 ]; then

      {
        echo "/"
        echo "/compare"
        echo "/best-esim-japan"
        echo "/reviews/sakura-mobile"
        echo "/reviews/ubigi"
        echo "/sakura-mobile-review"
      } > "$REPORT_DIR/routes-to-check.txt"

      while IFS= read -r ROUTE; do
        [ -z "$ROUTE" ] && continue

        RESULT="$(curl -L -s \
          -o /dev/null \
          -w "%{http_code}\t%{time_total}\t%{size_download}\t%{url_effective}" \
          "http://127.0.0.1:$PORT$ROUTE")"

        printf "%s\t%s\n" "$ROUTE" "$RESULT" \
          | tee -a "$REPORT_DIR/http-results.tsv"
      done < "$REPORT_DIR/routes-to-check.txt"

      curl -L -s "http://127.0.0.1:$PORT/" \
        > "$REPORT_DIR/homepage.html"

      curl -L -s "http://127.0.0.1:$PORT/compare" \
        > "$REPORT_DIR/compare.html"

      curl -L -s "http://127.0.0.1:$PORT/sakura-mobile-review" \
        > "$REPORT_DIR/sakura-mobile-review.html"

      rg -n -i \
        "airalo|ubigi|sakura|affiliate|sponsored|impact" \
        "$REPORT_DIR"/*.html \
        > "$REPORT_DIR/rendered-affiliate-check.txt" 2>&1

    else
      echo "Local server did not become ready within 60 seconds." \
        | tee "$REPORT_DIR/http-audit-failed.txt"
    fi
  fi
else
  echo "HTTP audit skipped because production build failed." \
    | tee "$REPORT_DIR/http-audit-skipped.txt"
fi

echo ""
echo "=== Build Output Inspection ==="

if [ -d ".next" ]; then
  du -sh .next > "$REPORT_DIR/next-build-size.txt" 2>&1

  find .next -type f -size +500k \
    2>/dev/null | sort \
    > "$REPORT_DIR/large-next-files-over-500kb.txt"

  rg -n -i \
    "airalo|ubigi|sakura|impact|affiliate" \
    .next/server .next/static \
    --glob '!*.map' \
    > "$REPORT_DIR/build-affiliate-references.txt" 2>&1
fi

echo ""
echo "=== Final Repository State ==="

git status --short > "$REPORT_DIR/git-status-after.txt" 2>&1
git diff --stat > "$REPORT_DIR/git-diff-stat-after.txt" 2>&1
git diff > "$REPORT_DIR/git-diff-after.patch" 2>&1

if cmp -s \
  "$REPORT_DIR/git-status-before.txt" \
  "$REPORT_DIR/git-status-after.txt"; then
  echo "Git status unchanged by audit." \
    | tee "$REPORT_DIR/git-status-comparison.txt"
else
  echo "WARNING: Git status changed during audit." \
    | tee "$REPORT_DIR/git-status-comparison.txt"

  diff -u \
    "$REPORT_DIR/git-status-before.txt" \
    "$REPORT_DIR/git-status-after.txt" \
    >> "$REPORT_DIR/git-status-comparison.txt" 2>&1
fi

echo ""
echo "=== Final Summary ==="

{
  echo "# Japan X Trip Overnight Audit Summary"
  echo ""
  echo "Started: $TIMESTAMP"
  echo "Finished: $(date)"
  echo ""
  echo "## Branch"
  cat "$REPORT_DIR/current-branch.txt"
  echo ""
  echo "## Git Status Before"
  cat "$REPORT_DIR/git-status-before.txt"
  echo ""
  echo "## Git Status After"
  cat "$REPORT_DIR/git-status-after.txt"
  echo ""
  echo "## Build"
  if [ "$BUILD_OK" -eq 1 ]; then
    echo "PASS"
  else
    echo "FAIL OR NOT RUN"
  fi
  echo ""
  echo "## Reports"
  echo "- TypeScript: typecheck.log"
  echo "- ESLint: lint.log"
  echo "- Tests: test.log"
  echo "- Build: build.log"
  echo "- Playwright: playwright.log"
  echo "- HTTP: http-results.tsv"
  echo "- Affiliate audit: affiliate-references.txt"
  echo "- SEO metadata: metadata-references.txt"
  echo "- TODOs: todos-and-placeholders.txt"
  echo "- Final diff: git-diff-after.patch"
  echo ""
  echo "## Safety"
  echo "- No commit performed"
  echo "- No push performed"
  echo "- No deploy performed"
  echo "- No source file intentionally edited"
} > "$REPORT_DIR/SUMMARY.md"

cat "$REPORT_DIR/SUMMARY.md"

echo ""
echo "=================================================="
echo "AUDIT COMPLETE"
echo "Report directory:"
echo "$REPORT_DIR"
echo "=================================================="

open "$REPORT_DIR"
