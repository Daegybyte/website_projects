# Website Projects

A curated collection of full-stack software engineering projects. Each project demonstrates different aspects of modern development—from systems programming and data visualization to mobile applications and web development. All projects are featured on my portfolio at [diegopisciotta.com/projects](https://diegopisciotta.com/projects).

## 🎯 Projects at a Glance

| Project | Type | Tech Stack | Status |
|---------|------|-----------|--------|
| [Lifestyle App](#-lifestyle-app) | Mobile | Kotlin, Android, REST APIs | Production |
| [Distance Arbitrage](#-distance-arbitrage) | Data Science | Python, PyQt5, Pandas | Complete |
| [MSD Script Interpreter](#-msd-script-interpreter) | Systems | C++, Parsing | Complete |
| [UFO Data Visualization](#-ufo-sighting-data-visualization) | Web/Data Viz | D3.js, JavaScript, Pandas | Complete |

---

## 🎮 Lifestyle App

**Location-based hiking recommendations for Android**

### Overview
An Android application that provides real-time hiking recommendations based on user location, weather, and terrain. Built with a focus on mobile best practices, clean architecture, and seamless API integration.

### Tech Stack
- **Language**: Kotlin
- **Platform**: Android SDK, Material Design
- **Backend**: AWS EC2
- **APIs**: Google Maps, OpenWeather REST APIs
- **Workflow**: Git, pair programming

### Key Features
- 📍 Real-time location-based hiking discovery
- 🌤️ Live weather integration for trail conditions
- 🗺️ Interactive map with route planning
- 👤 Persistent user profiles on AWS backend
- 🎨 Responsive Material Design UI

### What I Learned
- Android SDK fundamentals and lifecycle management
- RESTful API integration and async operations
- Mobile UX/UI design principles
- Collaborative development with Git workflows
- Cloud backend integration (AWS EC2)

### Repository Structure
```
Lifestyle_App/
├── app/                    # Main Android app module
├── build.gradle           # Gradle build configuration
├── AndroidManifest.xml    # App permissions & metadata
└── README.md             # Project-specific docs
```

### Getting Started
```bash
cd Lifestyle_App
# Open in Android Studio or build with Gradle
./gradlew build
./gradlew installDebug    # Deploy to emulator/device
```

---

## 💱 Distance Arbitrage

**Stock market analysis platform with intelligent symbol matching**

### Overview
An interactive desktop application for analyzing stock market data and identifying trading opportunities. The project combines algorithmic thinking with practical financial data analysis, featuring a custom web scraper and sophisticated similarity matching algorithms.

**Capstone Project**: Michigan State University, May 2020

### Tech Stack
- **Language**: Python 3
- **GUI**: PyQt5, PyQtGraph
- **Data**: Pandas, NumPy, BeautifulSoup4, yFinance
- **Environment**: Anaconda, Jupyter Notebook
- **Testing**: Unit tests with pytest

### Key Features
- 📊 Real-time stock data scraping via yFinance
- 🔍 Edit-distance algorithm for ticker symbol similarity
- ⌨️ Keyboard physical proximity analysis for typo detection
- 📈 Interactive GUI with dynamic data visualization
- 💾 Reproducible environment with Conda
- ✅ Comprehensive unit test suite

### What I Learned
- Algorithm design: edit distance, string similarity
- Financial data analysis workflows
- GUI development with PyQt5
- Web scraping best practices
- Data visualization and statistical analysis
- Packaging Python apps for distribution

### Architecture
```
distance_arbitrage/
├── app/                   # PyQt5 application code
├── data/                  # Data processing utilities
├── algorithms/            # Edit distance, proximity analysis
├── notebooks/             # Jupyter analysis notebooks
├── tests/                 # Unit test suite
└── distarb.yml           # Conda environment specification
```

### Running the Application
```bash
cd distance_arbitrage

# Option 1: Using Conda (recommended)
conda env create -f distarb.yml
conda activate distarb
python app/main.py

# Option 2: Manual setup
pip install -r requirements.txt
python app/main.py

# Run tests
pytest tests/
```

### Documentation
- 📄 [Research Paper](./paper/) - Full capstone project writeup
- 🎥 [Presentation](https://youtu.be/1874lj_r0Ko) - Project walkthrough
- 📦 [Release](./releases) - Standalone executable

---

## 🔧 MSD Script Interpreter

**Domain-specific language interpreter with custom parser**

### Overview
A from-scratch implementation of an interpreter for a custom domain-specific language. This project demonstrates compiler design fundamentals, including lexical analysis, syntactic parsing, and abstract syntax tree evaluation.

### Tech Stack
- **Language**: C++
- **Build**: Make, CMake
- **Testing**: Catch2 (C++ testing framework)
- **Design**: Recursive descent parser, AST evaluation

### Key Features
- 🔤 Lexical analyzer (tokenizer) with custom grammar
- 📝 Syntactic parser with error recovery
- 🎯 Support for:
  - Variables and assignments
  - Conditionals (if/else/elsif)
  - User-defined functions with parameters
  - Mathematical and logical expressions
  - Loops and control flow
- ✅ Comprehensive unit test suite
- 🤖 Automated build and test via Makefile

### What I Learned
- Language design and implementation
- Lexical analysis and tokenization
- Recursive descent parsing techniques
- Abstract syntax tree construction and evaluation
- Test-driven development
- Build automation with Make

### Project Structure
```
msd_script/
├── src/
│   ├── lexer.cpp         # Tokenization
│   ├── parser.cpp        # Parsing to AST
│   ├── interpreter.cpp   # AST evaluation
│   └── main.cpp
├── include/              # Header files
├── test/                 # Catch2 unit tests
├── Makefile             # Build automation
└── README.md
```

### Building & Testing
```bash
cd msd_script

# Build the interpreter
make build

# Run unit tests
make test

# Run interpreter interactively
./bin/interpreter

# Clean build artifacts
make clean
```

### Example Usage
```
> var x = 10
> var y = 20
> if x < y { print(x) }
10
> function add(a, b) { return a + b }
> print(add(5, 3))
8
```

---

## 👽 UFO Sighting Data Visualization

**Interactive geospatial and temporal exploration of UFO reports**

### Overview
An end-to-end data visualization platform that explores patterns in historical UFO sighting data. The project demonstrates the full data science pipeline: cleaning, processing, analysis, and interactive visualization.

### Tech Stack
- **Frontend**: JavaScript, D3.js v4+
- **Data Processing**: Python, Pandas, Jupyter Notebook
- **Visualization**: D3.js (interactive maps, timelines, heatmaps)
- **Deployment**: Cross-platform web interface

### Key Features
- 🗺️ Interactive geospatial visualization with dynamic map projections
- 📅 Temporal pattern analysis (timelines, heatmaps)
- 🔍 Drill-down exploration of sighting clusters
- 📊 Statistical summaries and trends
- 🎨 Responsive design for desktop and tablet
- ⚡ Smooth animations and transitions

### What I Learned
- Data wrangling and cleaning (Pandas)
- Interactive visualization design (D3.js)
- Geospatial data representation and projections
- Responsive web design principles
- Data storytelling and communication
- Deployment of interactive web interfaces

### Data Pipeline
```
Raw UFO Data
    ↓
Pandas Cleaning & Processing (Jupyter)
    ↓
JSON Export
    ↓
D3.js Visualization
    ↓
Interactive Web Interface
```

### Project Structure
```
ufo_reports/
├── data/
│   ├── raw/              # Original UFO sighting dataset
│   ├── processed/        # Cleaned data (JSON)
│   └── notebooks/        # Jupyter notebooks for EDA
├── src/
│   ├── visualization/    # D3.js code
│   ├── index.html       # Main page
│   └── style.css        # Styling
├── scripts/              # Data processing scripts
└── README.md
```

### Getting Started
```bash
cd ufo_reports

# Data processing
cd data/notebooks
jupyter notebook           # Run cleaning/EDA notebooks

# Visualization
cd ../..
npm install              # Install dependencies (if using build tools)
npm start                # Serve locally

# Or use Python's built-in server
python3 -m http.server 8000
# Visit http://localhost:8000
```

---

## 📚 Repository Structure

```
website_projects/
├── Lifestyle_App/
│   ├── app/              # Android app source
│   ├── build.gradle
│   └── README.md
├── distance_arbitrage/
│   ├── app/              # PyQt5 application
│   ├── tests/            # Unit tests
│   ├── notebooks/        # Jupyter analysis
│   ├── distarb.yml       # Conda environment
│   └── README.md
├── msd_script/
│   ├── src/              # C++ source
│   ├── include/          # Headers
│   ├── test/             # Unit tests
│   ├── Makefile
│   └── README.md
├── ufo_reports/
│   ├── data/             # Raw and processed data
│   ├── src/              # D3.js visualization
│   ├── scripts/          # Data processing
│   └── README.md
├── foundry.md            # Personal D&D notes
└── README.md             # This file
```

---

## 🛠️ Tech Stack Summary

### Languages & Platforms
- **Mobile**: Kotlin, Android SDK
- **Systems**: C++, Make
- **Data/Backend**: Python, Pandas, NumPy
- **Web/Visualization**: JavaScript, D3.js, HTML5/CSS3

### Tools & Technologies
- **Testing**: Catch2 (C++), pytest (Python), Android Test Framework
- **Build**: Make, CMake, Gradle, npm
- **Data**: Jupyter Notebook, BeautifulSoup4, yFinance
- **Cloud**: AWS EC2
- **APIs**: Google Maps, OpenWeather, yFinance
- **Version Control**: Git

### Development Practices
- ✅ Unit testing and test-driven development
- 📋 Automated builds and testing (Makefiles, Gradle)
- 🔄 Git version control with meaningful commits
- 📖 Clear documentation and comments
- 🏗️ Clean code principles and design patterns

---

## 🚀 Getting Started with Any Project

Each project is self-contained and can be explored independently:

1. **Navigate to the project directory**
   ```bash
   cd <project_name>
   ```

2. **Check the project-specific README**
   ```bash
   cat README.md
   ```

3. **Install dependencies** (varies by project)
   - C++: `make build`
   - Python: `pip install -r requirements.txt`
   - Kotlin: Open in Android Studio
   - JavaScript: `npm install`

4. **Run or build** (see each project section above)

---

## 📖 What You'll Find

### Code Quality
- Clean, readable code following language conventions
- Meaningful variable and function names
- Comments for complex logic
- No magic numbers or unexplained behavior

### Testing
- Comprehensive unit test suites
- Edge case coverage
- Automated test execution

### Documentation
- Project-specific READMEs with setup instructions
- Inline code comments for non-obvious logic
- Architecture diagrams where helpful
- Usage examples and walkthroughs

### Best Practices
- Version control with clear commit messages
- Build automation (Makefiles, Gradle, npm)
- Dependency management (requirements.txt, gradle files, Conda)
- Separation of concerns and modularity

---

## 🎓 About These Projects

These projects represent my journey as a software engineer, developed during my **Software Development Systems & Data Certificate** and **Software Development Programming Certificate** from Michigan State University. They showcase:

- **Systems thinking**: Building from first principles (the interpreter)
- **Full-stack capability**: Mobile, backend, data science, web frontend
- **Practical problem-solving**: Real algorithms and APIs integrated into working applications
- **Continuous learning**: Mastery across multiple languages and paradigms

---

## 🔗 Connect

- **Portfolio**: [diegopisciotta.com](https://diegopisciotta.com)
- **GitHub**: [@Daegybyte](https://github.com/Daegybyte)
- **LinkedIn**: [diego-pisciotta](https://linkedin.com/in/diegopisciotta)

---

## 📝 License

Each project is licensed under the MIT License unless otherwise specified. See individual project directories for details.

---

**Last Updated**: March 2026  
**Status**: All projects complete and documented
