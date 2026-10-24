
#!/bin/sh
set -eu

PACKAGE_NAME="scoring-entities"

if [ -z "${1:-}" ]; then
  COMMIT_MESSAGE="Update ${PACKAGE_NAME}"
else
  COMMIT_MESSAGE="$1"
fi

echo "Building ${PACKAGE_NAME}..."
npm run build

printf '\n⚠️  WARNING: This will publish to npm!\n'
printf 'Continue? (y/n): '
read -r confirm

if [ "$confirm" != "y" ]; then
  echo "Cancelled."
  exit 0
fi

echo "Incrementing patch version..."
npm version patch --no-git-tag-version

VERSION=$(node -p "require('./package.json').version")

echo "Committing version ${VERSION}..."
git add .
git commit -m "$COMMIT_MESSAGE"

echo "Pushing to Git..."
git push

echo "Publishing ${PACKAGE_NAME}@${VERSION}..."
npm publish --access public

echo "${PACKAGE_NAME}@${VERSION} published successfully ✅"
