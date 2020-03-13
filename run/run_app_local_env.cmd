for /f %%n in (.\.env.local) do set %%n
set NODE_ENV=docker
set NODE_CONFIG_DIR=config
node %2 backend/3drepo.js
