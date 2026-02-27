# License Requirements for VibeMiner Distribution

This document describes the licenses you need to comply with to legally distribute VibeMiner.

## Your Application

VibeMiner (the app code, UI, and logic) is licensed under whatever license you choose for your project. Ensure you have a `LICENSE` file in the repository root and that it’s included in the distributed app (e.g. in an About screen or installer).

## Bundled Third-Party Software

### XMRig (GPLv3)

VibeMiner bundles **XMRig** for CPU mining. XMRig is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.

#### GPLv3 requirements when distributing

1. **Provide the license text**  
   VibeMiner includes the full GPL-3.0 text at `resources/licenses/GPL-3.0.txt` in the install. This is enough to satisfy the requirement to convey the license.

2. **Offer source code**  
   Recipients must be able to obtain the source code for XMRig. Because we distribute the unmodified upstream binary, you can satisfy this by either:
   - Including a written offer to provide source (e.g. in `resources/licenses/THIRD_PARTY.md`), or  
   - Pointing users to the official XMRig source: https://github.com/xmrig/xmrig

3. **State modifications (if any)**  
   VibeMiner does not modify XMRig; we distribute the upstream binaries. If you ever modify XMRig, you must make those modifications available under GPLv3 and note that they were changed.

4. **Copyleft does not “infect” your app**  
   Running XMRig as a separate process (spawning it from your app) does not make your app a derivative work. Your app’s license can remain independent (e.g. MIT, proprietary) as long as you comply with the above when distributing XMRig.

#### Checklist for distribution

- [x] Include GPL-3.0.txt in the app (`resources/licenses/`)
- [x] Include THIRD_PARTY.md with source URL and license reference
- [ ] Add an “About” or “Licenses” screen that links to or displays these files
- [ ] Ensure your own app has a clear LICENSE file

## Summary

| Component | License | Action |
|-----------|---------|--------|
| VibeMiner app | Your choice (MIT, proprietary, etc.) | Add LICENSE file, show in About |
| XMRig | GPL-3.0 | Bundled with GPL-3.0.txt + source link (already in `resources/licenses/`) |

## Further Reading

- [GPLv3 full text](https://www.gnu.org/licenses/gpl-3.0.html)
- [XMRig repository](https://github.com/xmrig/xmrig)
- [FSF on distributing GPL software](https://www.gnu.org/licenses/gpl-faq.html)
