# ☁️ Cloud Backup - Quick Reference

## Setup (One-time)

1. Main Menu (☰) → **☁️ Cloud Backup**
2. Get token: https://github.com/settings/tokens
   - Generate new token (classic)
   - Check only: **gist**
3. Paste token → **Save Settings**
4. Check **Enable automatic backup**

✅ Done! Auto-backup every 5 minutes.

## Usage

### Backup Now
Main Menu → Cloud Backup → **Backup Now**

### Restore
Main Menu → Cloud Backup → **📥 Restore from Backup** → Select version → **Restore**

### View Backups
Visit: https://gist.github.com/

## Status

**Sidebar:** Shows "☁️ Auto-backup active" when enabled
**Last Backup:** Shown in settings panel

## What's Backed Up

✓ All chapters
✓ All scenes  
✓ All content (text)
✓ Compendium entries
✓ Custom prompts

## Features

- **Private** - Only you can see your backups
- **Unlimited** - No storage limits
- **Versioned** - Keep all history forever
- **Automatic** - Every 5 minutes
- **Secure** - Token stays in your browser

## Troubleshooting

**Not working?**
- Check token has `gist` permission
- Verify auto-backup is enabled
- Look for errors in browser console (F12)

**Can't restore?**
- Make sure project was backed up at least once
- Check Gist exists at https://gist.github.com/

## Security

- Token requires minimal permissions (gist only)
- All backups are private
- Revoke token anytime: https://github.com/settings/tokens

---

**Need help?** See `BACKUP_TESTING.md` for detailed testing guide.
