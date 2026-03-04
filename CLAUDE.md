# Claude Code Instructions

## Core Principles

**ONLY make the changes explicitly requested. Nothing more.**

### What NOT to do:
- ❌ Don't add features that weren't asked for
- ❌ Don't refactor code unless specifically requested
- ❌ Don't add comments or documentation unless asked
- ❌ Don't "improve" or "optimize" code that's working
- ❌ Don't add error handling for edge cases that don't exist
- ❌ Don't add type annotations to code that doesn't have them
- ❌ Don't rename variables or functions for "clarity"
- ❌ Don't add validation or checks beyond what's needed
- ❌ Don't create abstractions or helpers for one-time use
- ❌ Don't add backwards compatibility code
- ❌ Don't make the code "more maintainable" unless asked

### What TO do:
- ✅ Read the request carefully and understand exactly what's needed
- ✅ Make ONLY the specific changes requested
- ✅ Test that the changes work
- ✅ Keep the same coding style as existing code
- ✅ If unclear, ask for clarification before making changes

### Example:
**User says:** "Change the node color to blue"

**WRONG approach:**
- Change node color to blue
- Add a config file for colors
- Add hover states
- Add color validation
- Add comments explaining the color choice
- Refactor the color logic into a separate function

**RIGHT approach:**
- Change the node color to blue
- Done.

## Project-Specific Rules

### This is a graph visualization project
- All nodes must be the same size (70px) - NO EXCEPTIONS
- Don't add animations unless requested
- Don't change the layout algorithm unless told to
- Don't modify the dataset structure

### When making UI changes:
- Keep it minimal and clean
- Don't add extra panels or controls
- Don't add tooltips or hints unless asked
- Mobile responsive changes should be minimal

### When debugging:
- Fix only the specific bug reported
- Don't "clean up" surrounding code
- Don't add logging unless necessary

## Summary
**If the user didn't ask for it, don't add it. Period.**
