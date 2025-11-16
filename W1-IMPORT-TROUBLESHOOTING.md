# Writingway 1 Import Troubleshooting Guide

## How Scene Import Works

The W1 importer looks for scene files using this naming pattern:
```
ProjectName-ActName-ChapterName-SceneName_timestamp.html
```

**Important**: The importer removes ALL spaces from act/chapter/scene names when searching for files.

### Example:
- Structure.json has: Act = "Act 1", Chapter = "The Beginning", Scene = "First Day"
- Project name is: "MyNovel"
- Importer searches for: `MyNovel-Act1-TheBeginning-FirstDay_*.html`

## Common Issues

### 1. Scenes Import But Have No Content

**Symptom**: Scenes appear in the chapter but are empty when opened.

**Cause**: Scene files couldn't be matched using the expected naming pattern.

**Solution**: Check the browser console (F12) for diagnostic messages:
```
Looking for scene files matching: MyNovel-Act1-Chapter1-Scene1
✗ No scene files found for pattern: MyNovel-Act1-Chapter1-Scene1
Available scene files in directory: [list of actual files]
```

Compare the expected pattern with the actual filenames shown. Common mismatches:
- Spaces in filenames (W1 might not have removed them)
- Different capitalization
- Different separators (underscore vs hyphen)
- Project name doesn't match folder structure

### 2. No Scenes Import At All

**Cause**: Scene files might not be in the selected directory, or structure.json is missing scene references.

**Check**:
1. Open browser console (F12) before importing
2. Look for: `Creating scene: "SceneName" (content loaded)` or `Creating scene: "SceneName" (NO CONTENT - file not found)`
3. If you don't see these messages, the structure.json file might not have scene entries

### 3. Structure.json Not Found

**Error**: "Could not find project structure file (*_structure.json)"

**Solution**: Make sure you selected the project folder that contains `ProjectName_structure.json` file.

## Import Success Message

After import completes, you'll see:
```
✓ Successfully imported "ProjectName"!

X chapters and Y scenes imported.

Check console for details if scenes have no content.
```

If scene count is 0, check the structure.json file to confirm it has scene entries.

## Debugging Steps

1. **Open Browser Console** (Press F12, go to Console tab)

2. **Start Import** - Select your W1 project folder

3. **Review Console Output**:
   - `Total files in directory: X` - Should show all files
   - `Looking for scene files matching: ...` - Shows search pattern
   - `Found matching scene file: ...` or `✗ No scene files found` - Match result
   - `✓ Using latest file: ...` - Which file was selected
   - `Creating scene: "Name" (content loaded)` or `(NO CONTENT - file not found)` - Import status

4. **Check Actual Filenames**: 
   - Look at "Available scene files in directory" in console
   - Compare with expected pattern
   - Note any naming differences

## Workaround for Non-Standard Naming

If your W1 files use a different naming convention, you have two options:

### Option A: Rename Files
Rename your scene files to match the expected pattern (remove spaces, match project name).

### Option B: Manual Import
1. Create a new project in W2
2. Create chapters manually
3. Create scenes manually
4. Copy/paste content from W1 HTML files into W2 editor

## Need More Help?

Include this information when asking for help:
1. Browser console output during import
2. Example of actual scene filename from your W1 project
3. Contents of structure.json (just the structure, not scene content)
4. Project name as shown in W1
