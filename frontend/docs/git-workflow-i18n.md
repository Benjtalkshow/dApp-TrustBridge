# Git Workflow Guide - i18n Feature Implementation

This guide explains the Git workflow for the internationalization (i18n) feature implementation.

## Step 1: Create a New Branch

Before making any changes, create a new branch from the main branch:

```bash
# Make sure you're on the main branch and it's up to date
git checkout main
git pull origin main

# Create and switch to a new branch for the i18n feature
git checkout -b feature/i18n-support

# Alternative: Create branch with more descriptive name
git checkout -b feature/add-internationalization-en-es
```

**Branch Naming Conventions:**
- `feature/` - For new features
- `bugfix/` - For bug fixes
- `hotfix/` - For urgent fixes
- `refactor/` - For code refactoring

## Step 2: Make Your Changes

At this point, all the i18n implementation changes have been made:

- ✅ Installed i18n dependencies
- ✅ Created translation files (en.json, es.json)
- ✅ Created i18n configuration and hooks
- ✅ Added language selector component
- ✅ Updated components with translations
- ✅ Modified layout and providers

## Step 3: Stage and Commit Changes

### Check Status
```bash
# See what files have been changed
git status

# See detailed changes
git diff
```

### Stage Files
```bash
# Stage all changes
git add .

# Or stage specific files/directories
git add frontend/src/i18n/
git add frontend/src/@types/i18n.types.ts
git add frontend/src/hooks/useTranslation.ts
git add frontend/src/components/ui/language-selector.tsx
git add frontend/src/providers/i18n.provider.tsx
git add frontend/src/app/layout.tsx
git add frontend/src/components/layouts/header/Header.tsx
git add frontend/src/components/modules/dashboard/ui/pages/DashboardPage.tsx
git add frontend/src/components/modules/marketplace/ui/pages/MarketplacePage.tsx
git add frontend/package.json
git add frontend/package-lock.json
```

### Create Commit

**Option 1: Single Comprehensive Commit**
```bash
git commit -m "feat: implement i18n support with English and Spanish languages

- Add react-i18next, i18next, and i18next-browser-languagedetector dependencies
- Create i18n configuration with language detection and persistence
- Add English and Spanish translation files
- Implement custom useTranslation hook with formatting utilities
- Create LanguageSelector component with flag icons
- Add I18nProvider wrapper for the application
- Translate Header component (navigation, wallet connection)
- Translate Dashboard component (stats, positions, activity)
- Translate Marketplace component (pools, alerts, buttons, tables)
- Support number, currency, and date formatting per locale
- Prepare for RTL language support
- Add TypeScript type safety for translations

Resolves #<issue-number>"
```

**Option 2: Multiple Commits (More Granular)**
```bash
# Install dependencies
git add frontend/package.json frontend/package-lock.json
git commit -m "chore: add i18n dependencies (react-i18next, i18next)"

# Core infrastructure
git add frontend/src/i18n/ frontend/src/@types/i18n.types.ts
git commit -m "feat: create i18n configuration and translation files"

# Custom hook
git add frontend/src/hooks/useTranslation.ts
git commit -m "feat: add custom useTranslation hook with formatting utilities"

# Language selector
git add frontend/src/components/ui/language-selector.tsx
git commit -m "feat: create LanguageSelector component"

# Provider and layout
git add frontend/src/providers/i18n.provider.tsx frontend/src/app/layout.tsx
git commit -m "feat: add I18nProvider and integrate with app layout"

# Component translations
git add frontend/src/components/layouts/header/Header.tsx
git commit -m "feat: translate Header component"

git add frontend/src/components/modules/dashboard/ui/pages/DashboardPage.tsx
git commit -m "feat: translate Dashboard component"

git add frontend/src/components/modules/marketplace/ui/pages/MarketplacePage.tsx
git commit -m "feat: translate Marketplace component"
```

**Commit Message Best Practices:**
- Use conventional commit format: `type: description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Keep first line under 72 characters
- Add detailed description if needed
- Reference issue numbers with `Resolves #123` or `Closes #123`

## Step 4: Push Branch to Remote

```bash
# Push branch to remote repository
git push origin feature/i18n-support

# If this is the first push for this branch, set upstream
git push -u origin feature/i18n-support

# For subsequent pushes, you can just use
git push
```

**If you need to force push (use carefully!):**
```bash
# Only if you've rebased or amended commits
git push --force-with-lease origin feature/i18n-support
```

## Step 5: Create Pull Request

### Option A: Using GitHub Web Interface

1. **Navigate to Repository**
   - Go to `https://github.com/your-username/TB-Frontend`

2. **Create PR**
   - Click "Compare & pull request" button (appears after push)
   - Or go to "Pull requests" tab → "New pull request"

3. **Fill PR Details**
   ```markdown
   ## 🌍 Add Internationalization (i18n) Support
   
   ### Description
   This PR implements comprehensive internationalization support for the TrustBridge application with English and Spanish languages.
   
   ### Changes Made
   - ✅ Installed i18n dependencies (react-i18next, i18next, i18next-browser-languagedetector)
   - ✅ Created i18n configuration with automatic language detection
   - ✅ Added English and Spanish translation files
   - ✅ Implemented custom `useTranslation` hook with formatting utilities
   - ✅ Created LanguageSelector component with flag icons in header
   - ✅ Added I18nProvider wrapper to the application
   - ✅ Translated all components (Header, Dashboard, Marketplace)
   - ✅ Implemented locale-specific number, currency, and date formatting
   - ✅ Prepared for RTL language support
   - ✅ Added TypeScript type safety for all translations
   
   ### Features
   - 🇺🇸 English (default language)
   - 🇪🇸 Spanish
   - 💾 Persistent language preference (localStorage)
   - 🔄 Auto-detection from browser settings
   - 📱 Responsive language selector
   - 🎨 Beautiful UI with flag icons
   - ♿ Accessibility support (lang attribute, screen readers)
   - 🚀 Zero performance impact
   
   ### Testing
   1. Start the dev server: `npm run dev`
   2. Look for the language selector (flag icon) in the header
   3. Click to switch between English and Spanish
   4. Verify all text updates correctly
   5. Refresh page to confirm language persists
   6. Test number/currency formatting
   
   ### Screenshots
   [Add screenshots showing the language selector and different languages]
   
   ### Related Issues
   Closes #<issue-number>
   
   ### Checklist
   - [x] Code follows project style guidelines
   - [x] All components are properly translated
   - [x] No linter errors
   - [x] Tested in development environment
   - [x] Language preference persists across sessions
   - [x] TypeScript types are correct
   - [x] No hardcoded strings remaining
   ```

4. **Select Reviewers**
   - Add team members as reviewers

5. **Add Labels**
   - `feature`
   - `i18n`
   - `enhancement`

6. **Create PR**
   - Click "Create pull request"

### Option B: Using GitHub CLI

```bash
# Install GitHub CLI if not already installed
# macOS: brew install gh
# Login: gh auth login

# Create pull request
gh pr create --title "feat: Add internationalization (i18n) support" \
  --body "$(cat <<'EOF'
## 🌍 Add Internationalization (i18n) Support

### Description
This PR implements comprehensive internationalization support for the TrustBridge application with English and Spanish languages.

### Changes Made
- ✅ Installed i18n dependencies
- ✅ Created i18n configuration
- ✅ Added English and Spanish translation files
- ✅ Implemented custom useTranslation hook
- ✅ Created LanguageSelector component
- ✅ Translated all components

### Testing
1. Start the dev server: `npm run dev`
2. Switch between languages using the flag selector
3. Verify persistence across page reloads

Closes #<issue-number>
EOF
)" \
  --base main \
  --head feature/i18n-support \
  --label "feature,i18n,enhancement" \
  --reviewer "teammate1,teammate2"
```

## Step 6: Code Review Process

### Respond to Feedback
```bash
# Make changes based on review feedback
# ... edit files ...

# Stage and commit changes
git add .
git commit -m "refactor: address PR review comments"

# Push updates
git push
```

### Keep Branch Updated
```bash
# If main branch has new commits, update your branch
git checkout main
git pull origin main
git checkout feature/i18n-support
git merge main

# Or use rebase (cleaner history)
git checkout feature/i18n-support
git rebase main

# Push (may need force-with-lease after rebase)
git push --force-with-lease
```

## Step 7: Merge PR

Once approved, the PR can be merged:

**Merge Options:**
1. **Squash and Merge** (Recommended)
   - Combines all commits into one
   - Keeps main branch history clean
   - Use this for feature branches

2. **Merge Commit**
   - Preserves all commit history
   - Creates a merge commit

3. **Rebase and Merge**
   - Adds commits individually to main
   - Linear history

## Step 8: Cleanup

After the PR is merged:

```bash
# Switch back to main branch
git checkout main

# Pull latest changes
git pull origin main

# Delete local feature branch
git branch -d feature/i18n-support

# Delete remote feature branch (if not auto-deleted)
git push origin --delete feature/i18n-support
```

## Common Issues and Solutions

### Issue: Merge Conflicts

```bash
# If conflicts occur during merge/rebase
git status  # See conflicted files

# Edit files to resolve conflicts
# Look for <<<<<<< HEAD markers

# After resolving conflicts
git add .
git commit -m "fix: resolve merge conflicts"
git push
```

### Issue: Need to Update Commit Message

```bash
# Amend last commit message
git commit --amend -m "new commit message"

# Push (requires force)
git push --force-with-lease
```

### Issue: Need to Undo Last Commit

```bash
# Undo last commit but keep changes
git reset --soft HEAD~1

# Undo last commit and discard changes (careful!)
git reset --hard HEAD~1
```

## Git Best Practices

1. **Commit Often** - Small, focused commits
2. **Write Clear Messages** - Describe what and why
3. **Keep Branch Updated** - Regularly merge/rebase from main
4. **Test Before Pushing** - Ensure code works
5. **Review Your Own Changes** - Check diff before committing
6. **Don't Commit Secrets** - Use .gitignore
7. **Use Branches** - Never commit directly to main
8. **Pull Before Push** - Avoid conflicts

## Quick Reference

```bash
# Common Git commands
git status                  # Check current status
git log --oneline          # View commit history
git diff                   # See changes
git branch                 # List branches
git branch -a              # List all branches (including remote)
git fetch origin           # Fetch remote changes
git pull origin main       # Pull and merge
git stash                  # Temporarily save changes
git stash pop              # Restore stashed changes
git cherry-pick <hash>     # Apply specific commit
```

## Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub CLI Documentation](https://cli.github.com/manual/)

---

**Author:** TrustBridge Development Team  
**Date:** October 2025  
**Feature:** Internationalization Support (i18n)

