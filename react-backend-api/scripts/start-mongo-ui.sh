#!/usr/bin/env zsh
set -euo pipefail

# Load .env from backend directory if present
SCRIPT_DIR=${0:a:h}
DOTENV="$SCRIPT_DIR/../.env"
if [ -f "$DOTENV" ]; then
  set -a
  source "$DOTENV"
  set +a
fi

# Configure mongo-express connection
export ME_CONFIG_MONGODB_URL="${MONGO_URI:-${MONGODB_URI:-mongodb://localhost:27017}}"
export ME_CONFIG_BASICAUTH=false
export ME_CONFIG_SITE_BASEURL="/"
# You can change the port by exporting PORT before running
export PORT="${PORT:-8081}"

# Start mongo-express (installed as devDependency)
exec npx --yes mongo-express
