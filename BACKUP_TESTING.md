# GitHub Gists Backup Testing Guide

## Overview
Writingway 2 now includes automatic cloud backup to GitHub Gists. This guide will help you test all the backup features.

## Prerequisites
- GitHub account
- GitHub Personal Access Token with `gist` permission

## Setup GitHub Token

1. **Go to GitHub Token Settings**
   - Visit: https://github.com/settings/tokens
   - Click "Developer settings" → "Personal access tokens" → "Tokens (classic)"
   - Click "Generate new token (classic)"

2. **Configure Token**
   - Note: `Writingway Backup`
   - Expiration: Choose your preference (e.g., "No expiration")
   - Permissions: Check **only** the `gist` checkbox
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)

## Testing Steps

### 1. Initial Setup

1. Start Writingway 2 using `start.bat`
2. Create a test project (or use existing one):
   - Add a few chapters
   - Add some scenes with content
   - Add some compendium entries
3. Open the main menu (☰) and click "☁️ Cloud Backup"
4. Paste your GitHub token in the "GitHub Token" field
5. Click "Save Settings"
   - **Expected**: Status shows "✓ Connected as: [your-username]"

### 2. Manual Backup

1. Click "Backup Now" button
2. **Expected**: 
   - Status shows "Backing up..."
   - Then shows "Backed up"
   - Alert: "Backup successful!"
3. Go to https://gist.github.com/
4. **Verify**: You should see a new private Gist with your project name

### 3. Auto-Backup

1. In the Cloud Backup settings, check "Enable automatic backup (every 5 minutes)"
2. Click "Save Settings"
3. Make some changes to your project:
   - Edit scene content
   - Add a new chapter
   - Modify compendium entries
4. Wait 5 minutes
5. Check the console (F12) for: `✓ Auto-backup successful`
6. Go to your Gist on GitHub
7. Click "Revisions" tab
8. **Verify**: Multiple versions should appear

### 4. Restore from Backup

1. Make significant changes to your project that you'll recognize:
   - Add a scene titled "TEST SCENE - TO BE DELETED"
   - Add some unique content
2. Click "Backup Now" to save this state
3. Make MORE changes:
   - Delete the test scene
   - Add different content
4. Click "📥 Restore from Backup"
5. **Expected**: Modal shows list of backups with timestamps
6. Select the most recent backup (top of list)
7. Click "Restore"
8. Confirm the warning dialog
9. **Verify**: 
   - Project reloads
   - "TEST SCENE - TO BE DELETED" is back
   - All content matches the backup

### 5. Multiple Projects

1. Create a second test project
2. Add some content
3. Click "Backup Now"
4. Go to GitHub Gists
5. **Verify**: Two separate Gists (one per project)
6. Switch between projects
7. Click "Backup Now" for each
8. **Verify**: Each project updates its own Gist

### 6. Error Handling

Test these scenarios:

**Invalid Token:**
1. Enter a fake token: `ghp_fake123456789`
2. Click "Save Settings"
3. **Expected**: Alert: "Invalid GitHub token: Invalid token"

**No Token:**
1. Clear the token field
2. Try "Backup Now"
3. **Expected**: Alert: "Please configure GitHub token and select a project first."

**Restore Without Backup:**
1. Create a brand new project (never backed up)
2. Try "📥 Restore from Backup"
3. **Expected**: Alert: "No backup configured for this project."

### 7. Persistence Test

1. Configure backup settings (token + auto-backup enabled)
2. Close the browser
3. Reopen Writingway 2
4. Open Cloud Backup settings
5. **Verify**: 
   - Token is still there (masked as dots)
   - Auto-backup checkbox is still checked
   - Username is shown
6. Wait 5 minutes
7. **Verify**: Auto-backup runs automatically

## Expected Backup Contents

Each backup JSON should contain:
- `version`: "2.0"
- `exportedAt`: ISO timestamp
- `project`: Project metadata
- `chapters`: Array of all chapters
- `scenes`: Array of all scenes
- `sceneContents`: Object mapping scene IDs to text content
- `compendium`: Array of compendium entries
- `prompts`: Array of custom prompts

## Troubleshooting

### Backup Not Working
1. Check browser console (F12) for errors
2. Verify token has `gist` permission
3. Check network tab for API responses

### Auto-Backup Not Running
1. Check "Enable automatic backup" is checked
2. Verify token is saved
3. Check console for timer initialization message
4. Wait the full 5 minutes (timer starts from app load)

### Restore Not Working
1. Verify the Gist exists on GitHub
2. Check that `currentProjectGistId` is set (it's automatic after first backup)
3. Look for error messages in browser console

## Success Criteria

✅ Token validation works
✅ Manual backup creates/updates Gist
✅ Auto-backup runs every 5 minutes
✅ Backup list shows all versions
✅ Restore recovers all project data
✅ Settings persist across sessions
✅ Each project has separate Gist
✅ Error messages are clear and helpful

## Notes

- Backups are **private** by default (not visible to others)
- GitHub has **no storage limits** for Gists
- Version history is kept **indefinitely** by GitHub
- You can manually edit/delete Gists from https://gist.github.com/
- Auto-backup only runs when the app is open
- Backups include everything EXCEPT workshop chat sessions

## Security

- Token is stored in `localStorage` (local to your browser)
- Token is sent only to `api.github.com` via HTTPS
- All Gists are private (unless you manually change them)
- You can revoke the token anytime from GitHub settings
