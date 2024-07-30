#!/bin/sh
# Ejecutar migraciones de Prisma
npx prisma migrate deploy
# Iniciar la aplicación
npm run start
