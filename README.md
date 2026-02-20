# 🔗 Programming Language Lineage Graph

An interactive visualization exploring the implementation relationships and bootstrapping chains of programming languages, compilers, and runtimes.

## 🌐 Live Demo

**[View Live Visualization](#)** _(Update with your GitHub Pages URL after deployment)_

## ✨ Features

### Interactive Exploration
- **Dual Layouts**: Toggle between hierarchical DAG and organic force-directed layouts
- **Smart Filtering**: Filter by relationship type, confidence threshold, and search
- **Rich Tooltips**: Hover over nodes and edges to see detailed information including evidence sources
- **Cluster Visualization**: Color-coded by language families (C-family, JVM/.NET, JS engines, functional, systems, scripting)

### Visual Encoding
- **Node Size** = Degree (number of connections)
- **Node Color** = Language cluster/family
- **Edge Color** = Relationship type (compiler, runtime, bootstrap, rewrite)
- **Edge Opacity** = Confidence level (0.0-1.0)

### Data Export
- 📄 **SVG Export**: Vector graphics for publications
- 🖼️ **PNG Export**: High-resolution raster images
- 📊 **Validation Report**: JSON report with data quality metrics

### Validation & Quality
- Automatic validation on page load
- Detects missing nodes, duplicates, dangling edges
- Flags low-confidence edges (< 0.8)
- View full report in browser console or download as JSON

## 🚀 Quick Start

### Option 1: Open Locally

Simply open `index.html` in your web browser. No build process, no dependencies to install!

```bash
# Clone the repository
git clone https://github.com/yourusername/ProgrammingLanguageGraph.git
cd ProgrammingLanguageGraph

# Open in browser (macOS)
open index.html

# Or on Linux
xdg-open index.html

# Or on Windows
start index.html
```

### Option 2: Host on GitHub Pages

1. Go to your repository settings
2. Navigate to **Pages** section
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Your site will be published at: `https://yourusername.github.io/ProgrammingLanguageGraph/`

That's it! No build process required.

## 📊 Data Source

The visualization is powered by the **Programming Language Lineage Dataset** located in `research/Programming Language Lineage Dataset.pdf`.

### Dataset Schema

The dataset contains three main entity types:

**Languages** (~28 languages/tools)
- Machine code, Assembly, BCPL, B, C, C++
- Go, Rust, Python, Ruby, OCaml, Haskell
- Java, JavaScript, C#, Kotlin, Swift
- GCC, LLVM, Clang, V8, SpiderMonkey, JavaScriptCore, HotSpot, .NET Runtime, Roslyn, GHC, mrustc

**Edges** (~50+ relationships)
- `compiler_written_in`: Language X's compiler is written in language Y
- `runtime_written_in`: Language X's runtime is written in language Y
- `bootstrap_written_in`: Bootstrap binary seed relationship
- `rewritten_in`: Language X was rewritten in language Y

Each edge includes:
- Time range (start_year, end_year)
- Confidence score (0.0-1.0)
- Evidence sources (URLs to official documentation, repos, papers)

### Notable Relationships Visualized

- **Go 1.5 Bootstrap**: C → Go compiler transition (2009-2014 → 2015-present)
- **Rust Bootstrap**: OCaml/C → Rust + staged bootstrapping (stage0/stage1/stage2)
- **Swift Bootstrap**: C++/Swift mix with SwiftCompilerSources
- **Self-Hosting**: C++, Go, Rust, OCaml, Haskell, Java all compile themselves

## 🎨 Using the Visualization

### Controls Panel

**Layout**
- **DAG**: Hierarchical top-down layout (deterministic, good for lineage)
- **Force**: Organic clustering layout (shows communities)

**Search**
- Type language name or ID to filter nodes
- Example: "rust", "java", "tool:gcc"

**Confidence Threshold**
- Slider: 0.00 - 1.00
- Filters edges below the selected confidence level
- Edges < 0.8 indicate historical uncertainty

**Relationship Types**
- ✅ Compiler Written In (red edges)
- ✅ Runtime Written In (blue edges)
- ✅ Bootstrap Written In (green edges)
- ✅ Rewritten In (orange edges)

**Display Options**
- **Show Self-Loops**: Display self-referencing edges (e.g., Rust→Rust)
- **Cluster Coloring**: Color nodes by language family
- **Show All Labels**: Display labels for all nodes (default: only high-degree nodes)

### Tooltips

**Hover over nodes** to see:
- Language name and ID
- First release year
- Current implementation language
- Degree (number of connections)
- Notes (historical context, caveats)

**Hover over edges** to see:
- Relationship type
- Time range (start year - end year)
- Confidence score
- Evidence source (clickable link)

### Keyboard & Mouse

- **Click + Drag**: Pan the graph
- **Scroll**: Zoom in/out
- **Click Node**: Select and highlight
- **Hover**: Show tooltip

## 🔧 Technical Stack

### Zero Build Pipeline
- **No Node.js required**
- **No npm install**
- **No build step**
- **No transpilation**

Just pure HTML/CSS/JavaScript with CDN libraries!

### Libraries (CDN)
- **Cytoscape.js 3.28.1**: Graph visualization
- **cose-bilkent 4.1.0**: Force-directed layout

### Why This Approach?
- ✅ **Instant**: Open HTML file → it works
- ✅ **Portable**: Works offline after first load
- ✅ **Simple**: View source to see everything
- ✅ **GitHub Pages Ready**: Upload and go
- ✅ **Future-Proof**: No build system to break

## 📝 Updating the Data

### Manual Process (Current)

The dataset is embedded directly in `index.html` at line ~450.

To update:

1. Extract updated JSON from `research/` PDF
2. Open `index.html` in a text editor
3. Find the `const DATASET = {` section
4. Replace with new JSON
5. Save and refresh browser

### Why Manual?

The dataset is relatively stable (historical facts). Manual embedding ensures:
- Zero external dependencies
- Works offline forever
- No API rate limits
- Complete transparency

## 🧪 Validation Report

On page load, the visualization automatically validates the data:

**Checks performed:**
- ✅ Missing nodes referenced by edges (dangling edges)
- ✅ Duplicate IDs in languages/implementations
- ✅ Edges with missing required fields
- ✅ Nodes with missing required fields
- ✅ Edges with confidence < 0.8

**View report:**
1. Open browser console (F12)
2. Look for "Validation Report" log
3. Or click "Download Validation Report" button

**Example output:**
```json
{
  "missing_nodes_referenced_by_edges": [],
  "duplicate_ids": [],
  "edges_with_missing_fields": [],
  "nodes_with_missing_fields": [],
  "edges_confidence_lt_0_8": [
    {
      "from_language": "lang:b",
      "to_language": "lang:c",
      "confidence": 0.75
    }
  ],
  "summary": {
    "total_languages": 28,
    "total_edges": 48,
    "valid_edges": 48,
    "warnings": 1
  }
}
```

## 🎓 Understanding the Data

### Confidence Scores

- **1.0**: Directly documented in official sources
- **0.9-0.95**: Well-documented in primary sources (GitHub, official docs)
- **0.8-0.85**: Documented but with some interpretation
- **< 0.8**: Relies on secondary sources or historical ambiguity

**Examples:**
- Go 1.5 C→Go transition: 0.95 (explicit in Go FAQ and release notes)
- B→C lineage: 0.75 (historical, varies by source)
- Haskell/GHC: 0.7 (implementation language mix not clearly stated in primary docs)

### Self-Hosting & Bootstrapping

**Self-Hosting**: A language's compiler is written in itself
- Examples: C++, Go, Rust, OCaml, Haskell, Java

**Bootstrapping Problem**: How do you compile a compiler written in itself?
- **Solution 1**: Use another language first (C → Go in 2009, then Go → Go in 2015)
- **Solution 2**: Use staged bootstrapping (Rust: stage0 → stage1 → stage2)
- **Solution 3**: Use an alternative implementation (mrustc for Rust)

**Visualization tip**: Toggle "Show Self-Loops" off to see the underlying dependency DAG

### Time Ranges

- `start_year`: When this relationship began
- `end_year`: When it ended (or `null` for ongoing)

**Examples:**
- C → Go compiler: 2009-2014 (historical)
- Go → Go compiler: 2015-present (current)

## 🌟 Interesting Discoveries

Explore the graph to find:

1. **The C→Go Bootstrap**: How Go eliminated C from its toolchain in Go 1.5
2. **Rust's Triple Bootstrap**: OCaml/C prehistory → Rust → staged builds
3. **JavaScript Engine Diversity**: V8 (C++), SpiderMonkey (C++/Rust/JS), JavaScriptCore (C++/C)
4. **JVM Self-Hosting**: Java compiler (javac) is in Java, but JVM (HotSpot) is in C++
5. **Functional Lineages**: OCaml and Haskell both self-hosted with C runtimes

## 📚 Evidence & Sources

All edges include `evidence_source` fields with URLs to:
- Official documentation (Go FAQ, Rust Dev Guide, LLVM docs)
- GitHub repositories (rust-lang/rust, llvm/llvm-project)
- Academic papers (Stroustrup's HOPL-II, Thompson's "Trusting Trust")
- Release announcements (Go 1.5 blog post, Rust 1.0 announcement)

**Hover over any edge to see sources and click through!**

## 🐛 Known Limitations

1. **Historical Languages**: BCPL, B, and early C have approximate dates due to sparse primary sources
2. **Java 1.0**: Implementation language before OpenJDK is marked "unspecified"
3. **Implementations Array**: Currently empty in the dataset (future expansion)
4. **Mobile Layout**: Best experienced on desktop (responsive but dense)

## 🤝 Contributing

Want to add more languages or fix data?

1. Update the dataset in `research/Programming Language Lineage Dataset.pdf`
2. Re-extract the JSON
3. Update the embedded data in `index.html`
4. Submit a pull request with evidence sources!

**Data requirements:**
- Primary sources strongly preferred
- Include confidence score
- Add evidence URLs
- Follow existing schema

## 📜 License

MIT License - See [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- **Data Sources**: Go team, Rust team, LLVM project, OpenJDK, Mozilla, Apple, Microsoft, JetBrains
- **Visualization**: Cytoscape.js community
- **Inspiration**: "Trusting Trust" by Ken Thompson, bootstrapping research, programming language history

---

**Built with ❤️ for programming language enthusiasts, compiler engineers, and history nerds**

*No build process was harmed in the making of this visualization* ✨
