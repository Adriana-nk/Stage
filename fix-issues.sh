#!/bin/bash
echo "🔄 Correction des problèmes Angular..."

# 1. Mettre à jour package.json vers Angular 17 stable
npm install @angular/{animations,common,compiler,core,forms,platform-browser,platform-browser-dynamic,router}@^17.0.0

# 2. Installer les dépendances
npm install

# 3. Nettoyer le cache
npm cache clean --force

# 4. Reconstruire le projet
ng build

echo "✅ Corrections terminées!"
