# Translations & Arabic RTL Guide

Valoir provides first-class support for multilingual storefronts and right-to-left (RTL) scripts, primarily Arabic (`ar.json`).

## How RTL Layout Works
- Liquid automatically checks `request.locale.iso_code == 'ar'` or `settings.force_rtl`.
- The `<html>` element is assigned `dir="rtl"`.
- Layout components utilize logical CSS positioning or dedicated `[dir="rtl"]` selectors to mirror navigation menus, drawers, product badges, and cart drawers naturally without breaking optical balance.
