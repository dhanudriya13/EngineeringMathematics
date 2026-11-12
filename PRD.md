# PRODUCT REQUIREMENTS DOCUMENT
# VECTOR LAB
## Interactive Engineering Mathematics Learning Platform

**Version:** 1.0  
**Date:** November 2026  
**Status:** Ready for Development  
**Product Category:** Educational Technology / Interactive Learning Platform  
**Target Audience:** Undergraduate Information Systems Students  
**Language:** Bahasa Indonesia

---

# 1. PRODUCT OVERVIEW

## 1.1 Product Description

Vector Lab is a web-based interactive learning platform designed to help undergraduate Information Systems students understand vector concepts in Engineering Mathematics.

The platform provides comprehensive learning materials, mathematical explanations, interactive 2D and 3D visualizations, worked examples, adaptive exercises, quizzes, and mathematical simulations.

The primary pedagogical approach is:

**Concept First → Mathematics Second → Application Third.**

Students should first understand a mathematical concept intuitively, explore its geometric representation, learn the formal mathematical notation, practice calculations, and finally understand its practical applications in computing and engineering.

The platform must function as a self-contained digital learning resource without requiring user registration, authentication, or backend infrastructure.

## 1.2 Product Vision

To create an accessible, comprehensive, and interactive mathematics learning environment that transforms abstract vector concepts into understandable visual and computational experiences.

## 1.3 Problem Statement

Students beginning Engineering Mathematics may encounter several difficulties:

- Difficulty understanding abstract vector concepts.
- Limited ability to visualize vectors in two-dimensional and three-dimensional spaces.
- Dependence on memorizing mathematical formulas without understanding their meaning.
- Difficulty connecting mathematical concepts with computing applications.
- Limited opportunities to experiment with mathematical operations independently.
- Lack of structured learning materials containing explanations, examples, and exercises.

Vector Lab addresses these problems through structured educational content and interactive mathematical exploration.

## 1.4 Product Objectives

1. Provide comprehensive vector learning materials.
2. Explain mathematical concepts progressively for beginner students.
3. Visualize vector operations in interactive 2D and 3D environments.
4. Provide detailed, step-by-step mathematical examples.
5. Allow students to experiment with vector operations.
6. Provide exercises with immediate feedback and explanations.
7. Provide topic-based quizzes.
8. Connect mathematical concepts with Information Systems and computing applications.
9. Support independent learning without requiring an account.
10. Maintain excellent performance through static deployment.

## 1.5 Success Criteria

The product is considered successful when:

- All planned learning modules are available.
- Mathematical formulas render correctly.
- All implemented vector operations produce mathematically correct results.
- Students can interact with the Vector Playground.
- Exercises provide meaningful feedback and explanations.
- Quizzes can be completed without registration.
- Learning progress persists locally.
- The website works on supported desktop browsers.
- The website can be deployed without a backend server.

---

# 2. TARGET USERS

## 2.1 Primary Persona: Undergraduate Student

**Profile**
- Undergraduate Information Systems student.
- Beginner in vector mathematics.
- Has basic arithmetic and introductory algebra knowledge.
- Uses a laptop or desktop computer for learning.

**Needs**
- Simple explanations.
- Visual representations of abstract concepts.
- Step-by-step examples.
- Immediate feedback.
- Opportunities to practice independently.

**Pain Points**
- Confusion about vector notation.
- Difficulty understanding mathematical formulas.
- Difficulty visualizing geometric relationships.
- Difficulty applying formulas to exercises.

## 2.2 Secondary Persona: Lecturer

**Profile**
- Lecturer teaching Engineering Mathematics.
- Uses Vector Lab as supplementary learning material.

**Needs**
- Well-structured learning content.
- Accurate mathematical explanations.
- Consistent notation.
- Reusable examples and exercises.
- Easy content maintenance.

---

# 3. PRODUCT SCOPE

## 3.1 Included in MVP

- Public access without authentication.
- Comprehensive vector learning modules.
- Mathematical formula rendering.
- Interactive 2D vector visualization.
- Interactive 3D vector visualization.
- Vector Playground.
- Step-by-step worked examples.
- Adaptive exercises.
- Topic-based quizzes.
- Formula reference.
- Mathematical glossary.
- Local learning progress.
- Responsive desktop-first interface.
- Static deployment.

## 3.2 Explicitly Excluded

The initial version will not include:

- Student registration and login.
- Lecturer administration dashboard.
- Backend database.
- Centralized student assessment reports.
- Cloud synchronization.
- Learning Management System integration.
- Online submission of assignments.
- Server-side grading.
- AI chatbot.
- Payment functionality.

These features may be considered for future versions.

---

# 4. INFORMATION ARCHITECTURE

## 4.1 Main Navigation

1. Home
2. Learning Materials
3. Vector Playground
4. Exercises
5. Quizzes
6. Formula Reference
7. Glossary
8. Learning Progress

## 4.2 Sitemap

/
├── Home
├── Materials
│   ├── Introduction to Vectors
│   ├── Scalar and Vector Quantities
│   ├── Vector Representation
│   ├── Magnitude and Direction
│   ├── Vector Operations
│   ├── Unit Vectors
│   ├── Position Vectors
│   ├── 2D and 3D Coordinates
│   ├── Dot Product
│   ├── Angle Between Vectors
│   ├── Vector Projection
│   ├── Cross Product
│   ├── Linear Combinations
│   ├── Vector Spaces
│   ├── Basis and Dimension
│   └── Vector Transformations
├── Playground
│   ├── Addition
│   ├── Subtraction
│   ├── Scalar Multiplication
│   ├── Components
│   ├── Dot Product
│   ├── Angle Explorer
│   ├── Projection
│   └── Cross Product
├── Exercises
├── Quizzes
├── Formula Reference
├── Glossary
└── Progress

---

# 5. CURRICULUM AND LEARNING CONTENT

## 5.1 Content Development Principles

Every learning module must follow a consistent educational structure.

Required sections:

1. Learning objectives.
2. Prerequisites.
3. Estimated learning duration.
4. Concept introduction.
5. Intuitive explanation.
6. Mathematical definition.
7. Mathematical notation.
8. Formula explanation.
9. Visual illustration.
10. Step-by-step worked examples.
11. Computing or engineering applications.
12. Common mistakes.
13. Practice exercises.
14. Topic quiz.
15. Summary.
16. Formula reference.

Content must be written in clear Bahasa Indonesia.

Mathematical terminology may include its English equivalent in parentheses.

Every mathematical formula must be explained, including the meaning of its symbols and variables.

Avoid presenting formulas without explaining their mathematical interpretation.

## 5.2 Curriculum Modules

### MODULE 01 — Introduction to Vectors

Topics:
- What is mathematics?
- Introduction to vectors.
- Historical and practical context.
- Why vectors are important.
- Applications in engineering and computing.
- Difference between quantities and mathematical representations.

Learning outcome:
Students understand the fundamental purpose of vectors.

### MODULE 02 — Scalar and Vector Quantities

Topics:
- Definition of scalar quantities.
- Definition of vector quantities.
- Differences between scalar and vector.
- Magnitude and direction.
- Real-world examples.
- Position, displacement, velocity, and force.

Learning outcome:
Students can distinguish scalar and vector quantities.

### MODULE 03 — Vector Representation and Notation

Topics:
- Geometric representation.
- Vector arrows.
- Initial and terminal points.
- Coordinate representation.
- Column vector notation.
- Component notation.
- Vector equality.
- Zero vector.
- Negative vectors.

Learning outcome:
Students can represent vectors using geometric and algebraic notation.

### MODULE 04 — Magnitude and Direction

Topics:
- Vector magnitude.
- Euclidean distance.
- Direction and orientation.
- Vector normalization.
- Unit vectors.
- Magnitude in 2D.
- Magnitude in 3D.

Important formulas:

| Concept | Formula |
|---|---|
| 2D magnitude | √(x² + y²) |
| 3D magnitude | √(x² + y² + z²) |
| Unit vector | v / ||v|| |

Learning outcome:
Students can calculate vector magnitude and determine normalized vectors.

### MODULE 05 — Vector Addition and Subtraction

Topics:
- Geometric addition.
- Head-to-tail method.
- Parallelogram method.
- Component-wise addition.
- Geometric subtraction.
- Negative vector.
- Properties of vector addition.

Formulas:

a + b = (a₁ + b₁, a₂ + b₂)

a - b = (a₁ - b₁, a₂ - b₂)

Learning outcome:
Students can calculate and visualize vector addition and subtraction.

### MODULE 06 — Scalar Multiplication

Topics:
- Definition of scalar multiplication.
- Scaling vectors.
- Positive scalar multiplication.
- Negative scalar multiplication.
- Zero scalar.
- Geometric interpretation.
- Vector direction and magnitude changes.

Formula:

k(a₁, a₂, a₃) = (ka₁, ka₂, ka₃)

Learning outcome:
Students understand how scalar multiplication affects vector magnitude and direction.

### MODULE 07 — Vector Components and Position Vectors

Topics:
- Horizontal and vertical components.
- Component decomposition.
- Trigonometric representation.
- Position vectors.
- Initial and terminal points.
- Displacement vectors.
- Component calculations.

Formulas:

x = r cos θ

y = r sin θ

Learning outcome:
Students can decompose vectors into their components and calculate position vectors.

### MODULE 08 — Two-Dimensional and Three-Dimensional Coordinate Systems

Topics:
- Cartesian coordinate systems.
- X, Y, and Z axes.
- Origin.
- Coordinate planes.
- Spatial representation.
- Points in 2D and 3D.
- Vector positioning in space.

Learning outcome:
Students understand vector positioning in two-dimensional and three-dimensional coordinate systems.

### MODULE 09 — Dot Product

Topics:
- Introduction to dot product.
- Algebraic definition.
- Geometric definition.
- Component multiplication.
- Relationship with vector magnitude.
- Orthogonal vectors.
- Applications in computing.

Formulas:

a · b = a₁b₁ + a₂b₂ + a₃b₃

a · b = ||a|| ||b|| cos θ

Learning outcome:
Students can calculate dot products and interpret their geometric meaning.

### MODULE 10 — Angle Between Two Vectors

Topics:
- Angle between vectors.
- Cosine relationship.
- Dot product and angles.
- Acute, right, and obtuse angles.
- Orthogonality.
- Practical applications.

Formula:

cos θ = (a · b) / (||a|| ||b||)

Learning outcome:
Students can calculate and interpret angles between vectors.

### MODULE 11 — Vector Projection

Topics:
- Introduction to projection.
- Scalar projection.
- Vector projection.
- Projection onto another vector.
- Geometric interpretation.
- Applications in engineering.

Formula:

proj_b(a) = ((a · b) / ||b||²)b

Learning outcome:
Students can calculate scalar and vector projections.

### MODULE 12 — Cross Product

Topics:
- Introduction to cross product.
- Geometric interpretation.
- Determinant representation.
- Right-hand rule.
- Magnitude of cross product.
- Orthogonal output vector.
- Applications in 3D computing and engineering.

Formula:

a × b = (a₂b₃ - a₃b₂,
         a₃b₁ - a₁b₃,
         a₁b₂ - a₂b₁)

Learning outcome:
Students understand cross product calculations and spatial interpretation.

Important:
Cross product is fundamentally defined for 3D vectors in this curriculum. Any 2D visualization must clearly explain that a 2D vector can be embedded in 3D with a zero Z component.

### MODULE 13 — Linear Combinations

Topics:
- Linear combinations.
- Vector coefficients.
- Spanning sets.
- Geometric interpretation.
- Linear dependence.
- Linear independence.
- Applications in computational mathematics.

Learning outcome:
Students can understand and calculate linear combinations.

### MODULE 14 — Vector Spaces

Topics:
- Introduction to vector spaces.
- Vector space definition.
- Basic vector space properties.
- Closure.
- Addition and scalar multiplication.
- Subspaces.
- Examples of vector spaces.

Learning outcome:
Students understand the fundamental abstraction of vector spaces.

### MODULE 15 — Basis and Dimension

Topics:
- Basis vectors.
- Linear independence.
- Spanning.
- Dimension.
- Standard basis.
- Coordinate representation.
- Applications in data representation.

Learning outcome:
Students understand basis and dimension and their relationship with vector representation.

### MODULE 16 — Vector Transformations and Applications

Topics:
- Translation.
- Scaling.
- Rotation.
- Transformation matrices.
- Coordinate transformations.
- Computer graphics.
- UI coordinate systems.
- Game development.
- Engineering simulations.
- Data Science and Machine Learning applications.

Learning outcome:
Students can connect vector mathematics with real-world computational applications.

## 5.3 Computing Application Examples

Include contextual examples throughout the curriculum.

| Application | Vector concept |
|---|---|
| Computer Graphics | Position, direction, transformations |
| Game Development | Movement, velocity, collision direction |
| UI/UX | Coordinates, displacement, scaling |
| Data Science | Feature vectors, similarity |
| Machine Learning | Vector representation, feature spaces |
| Engineering | Force, projection, spatial geometry |

Applications must be mathematically meaningful and not merely decorative references.

---

# 6. FUNCTIONAL REQUIREMENTS

## FR-01: Public Learning Access

- All learning materials must be accessible without login.
- No registration is required.
- Users can navigate freely between modules.
- Content must be readable without JavaScript where technically feasible.

## FR-02: Learning Material Viewer

Each module must include:
- Module title.
- Learning objectives.
- Prerequisites.
- Estimated duration.
- Table of contents.
- Explanations.
- Mathematical formulas.
- Diagrams.
- Worked examples.
- Computing applications.
- Common mistakes.
- Summary.
- Exercises.
- Quiz.

Navigation must include previous and next module controls.

## FR-03: Mathematical Formula Rendering

Use KaTeX for mathematical formula rendering.

Requirements:
- Inline mathematical notation.
- Display mathematical equations.
- Aligned equations.
- Fractions.
- Square roots.
- Summations.
- Matrices.
- Vectors.
- Subscripts and superscripts.
- Determinants.
- Greek symbols.

Formulas must be readable and properly formatted.

Provide textual explanations alongside important formulas.

## FR-04: Interactive Vector Playground

The Playground is one of the platform's core features.

Users must be able to:
- Change vector coordinates.
- Adjust vector values through input fields or sliders.
- Drag vector endpoints where supported.
- Switch between 2D and 3D where mathematically applicable.
- Reset simulations.
- View real-time calculations.
- See the geometric result.
- View the mathematical formula used.
- Read contextual explanations.

Required tools:

### A. Vector Addition
- Two adjustable vectors.
- Resultant vector.
- Parallelogram or head-to-tail visualization.
- Component calculation.

### B. Vector Subtraction
- Two adjustable vectors.
- Resultant vector.
- Geometric interpretation.
- Component calculation.

### C. Scalar Multiplication
- Adjustable vector.
- Adjustable scalar.
- Positive, negative, and zero values.
- Real-time magnitude and direction updates.

### D. Dot Product
- Two adjustable vectors.
- Numeric dot product.
- Angle between vectors.
- Geometric interpretation.
- Orthogonality indicator.

### E. Vector Projection
- Adjustable source and target vectors.
- Projection visualization.
- Scalar projection.
- Vector projection.
- Formula explanation.

### F. Cross Product
- Two adjustable 3D vectors.
- Resultant vector.
- Right-hand rule visualization.
- Magnitude calculation.
- Perpendicularity explanation.

### G. Vector Components
- Adjustable vector.
- X, Y, and Z components.
- Component decomposition visualization.
- Magnitude and direction.

### H. Angle Explorer
- Two adjustable vectors.
- Dynamic angle measurement.
- Dot product relationship.
- Acute, right, and obtuse angle interpretation.

### Playground Technical Requirements
- Numerical input validation.
- Support negative coordinates.
- Support decimal values.
- Prevent invalid operations.
- Display clear mathematical errors.
- Provide reset functionality.
- Provide predefined examples.
- Display formulas and numerical results simultaneously.

Special mathematical handling:
- Do not divide by zero when normalizing vectors.
- Do not calculate angles involving zero-magnitude vectors.
- Clamp inverse cosine input to [-1, 1] to avoid floating-point errors.
- Handle parallel and zero vectors appropriately.
- Clearly distinguish 2D and 3D operations.

## FR-05: Adaptive Exercises

Exercises must be categorized into:

- Easy.
- Medium.
- Difficult.

Each exercise includes:
- Question.
- Topic.
- Difficulty.
- Input or answer choices.
- Submit action.
- Correctness feedback.
- Explanation.
- Correct answer.

Adaptive behavior:
- Start students with easy questions.
- Increase difficulty after consistent correct answers.
- Offer additional foundational questions after repeated incorrect answers.
- Provide hints when students struggle.
- Allow retrying questions.
- Do not punish students for experimentation.

The adaptive engine must be deterministic and rule-based. No AI or external API is required.

## FR-06: Topic-Based Quizzes

Every topic must have a quiz.

Requirements:
- Multiple-choice questions.
- Numerical-answer questions where appropriate.
- Immediate feedback.
- Explanation of correct answers.
- Final score.
- Retry option.
- Topic completion indicator.

Quiz behavior:
- Questions must be associated with their respective modules.
- Correct answers must not be exposed in the initial question interface.
- Answer validation must use mathematically correct values.
- Numerical answers must support configurable tolerances where necessary.
- Quiz attempts must be recorded locally.

Initial content target:
- Minimum 5 questions per topic.
- Minimum 80 questions across the platform.
- Increase question coverage as content develops.

## FR-07: Formula Reference

Create a searchable formula reference containing:
- Formula name.
- Mathematical expression.
- Explanation.
- Variable definitions.
- Related module.
- Example application.

Organize formulas by topic.

## FR-08: Glossary

Provide searchable mathematical terminology.

Each entry includes:
- Indonesian term.
- English equivalent.
- Definition.
- Formula if relevant.
- Related topic.

Examples:
- Vektor / Vector.
- Skalar / Scalar.
- Magnitude.
- Direction.
- Unit Vector.
- Dot Product.
- Cross Product.
- Projection.
- Linear Independence.
- Basis.
- Dimension.

## FR-09: Local Learning Progress

Use browser Local Storage.

Store:
- Completed modules.
- Completed exercises.
- Quiz attempts.
- Best quiz scores.
- Last visited module.
- Overall completion percentage.

Requirements:
- No account required.
- Progress persists after browser refresh.
- Display a learning progress overview.
- Provide a reset progress option with confirmation.
- Handle unavailable or disabled Local Storage gracefully.

Clearly inform users that progress is device/browser-specific and is not synchronized across devices.

---

# 7. USER EXPERIENCE AND USER FLOWS

## 7.1 Main Learning Flow

Home
→ Select Learning Module
→ Read Learning Objectives
→ Explore Concept
→ View Mathematical Explanation
→ Explore Visualization
→ Study Worked Example
→ Complete Practice Exercises
→ Take Topic Quiz
→ View Results
→ Continue to Next Module

## 7.2 Playground Flow

Open Playground
→ Select Operation
→ Choose 2D or 3D where applicable
→ Adjust Vector Coordinates
→ Observe Visualization
→ View Mathematical Calculation
→ Explore Different Values
→ Reset or Continue

## 7.3 Exercise Flow

Open Exercise
→ Select Difficulty
→ Read Question
→ Submit Answer
→ Receive Feedback
→ Read Explanation
→ Retry or Continue

## 7.4 Navigation Principles

- Keep primary navigation visible.
- Make module navigation predictable.
- Provide breadcrumbs on learning pages.
- Highlight current module.
- Use clear visual hierarchy.
- Avoid unnecessary dashboard complexity.
- Keep mathematical content as the primary focus.

---

# 8. UI/UX DESIGN SYSTEM

## 8.1 Design Direction

**Academic Modern**

The interface should resemble a modern digital mathematics textbook combined with an interactive scientific learning environment.

Design characteristics:
- Editorial academic layout.
- Generous whitespace.
- Clear typography.
- Structured mathematical explanations.
- Consistent mathematical notation.
- Restrained accent colors.
- High-quality diagrams.
- Minimal decorative elements.

Avoid:
- Excessive gamification.
- Unnecessary gradients.
- Dashboard-heavy layouts.
- Overly playful illustrations.
- Distracting animations.

## 8.2 Suggested Color Palette

| Token | Value | Purpose |
|---|---|---|
| Primary | #233B63 | Primary navigation and emphasis |
| Accent | #3B82F6 | Interactive controls |
| Background | #FAFAF8 | Main background |
| Surface | #FFFFFF | Content cards |
| Text Primary | #20252D | Main typography |
| Text Secondary | #667085 | Supporting text |
| Border | #E5E7EB | Dividers and borders |
| Success | #15803D | Correct answers |
| Error | #DC2626 | Incorrect answers |

Use semantic color tokens rather than hardcoded colors throughout components.

For vector diagrams, use consistent colors to distinguish:
- Vector A.
- Vector B.
- Resultant vector.
- Projection vector.
- Coordinate axes.

Never rely on color alone to communicate vector identity. Include labels, arrows, and line styles.

## 8.3 Typography

Recommended:
- Headings: Inter or equivalent modern sans-serif.
- Body: Inter or equivalent.
- Mathematical formulas: KaTeX default mathematical fonts.
- Code and coordinates: JetBrains Mono or equivalent.

Typography requirements:
- Comfortable reading width.
- Clear heading hierarchy.
- Readable mathematical notation.
- Adequate spacing around formulas.

## 8.4 Layout

Desktop-first layout:
- Maximum content width: approximately 1280px.
- Sidebar navigation for learning materials.
- Main content column.
- Optional contextual navigation.
- Dedicated visualization area.
- Responsive behavior for smaller screens.

Recommended layout:
- Header: 64–72px.
- Sidebar: 240–260px.
- Main content: flexible.
- Reading width: approximately 720–820px.

## 8.5 Accessibility

Target: General web accessibility best practices.

Requirements:
- Semantic HTML.
- Keyboard-accessible controls.
- Visible focus indicators.
- Sufficient text contrast.
- Descriptive labels.
- Accessible form validation.
- Text explanations for mathematical diagrams.
- Avoid color-only indicators.
- Respect reduced-motion preferences.

---

# 9. TECHNICAL ARCHITECTURE

## 9.1 Recommended Technology Stack

Use a static-first architecture.

| Layer | Technology |
|---|---|
| Framework | Astro |
| Language | TypeScript |
| UI Components | React |
| Styling | CSS Modules or scoped CSS |
| Mathematical Rendering | KaTeX |
| 2D Visualization | SVG |
| 3D Visualization | Three.js with React Three Fiber |
| Charts/Graphs | Custom SVG where practical |
| Content | MDX |
| Local Persistence | Browser Local Storage |
| Icons | Lucide |
| Testing | Vitest and Playwright |
| Deployment | Cloudflare Pages or Netlify |

## 9.2 Architecture Principles

- Prefer static rendering.
- Use React only for interactive components.
- Avoid unnecessary client-side JavaScript.
- Separate mathematical calculations from UI components.
- Use reusable components.
- Keep content independent from presentation.
- Avoid backend dependencies.
- Use deterministic mathematical functions.
- Maintain type safety.

## 9.3 Rendering Strategy

Astro should render:
- Home page.
- Navigation.
- Learning materials.
- Formula reference.
- Glossary.
- Static explanations.

React islands should handle:
- Vector Playground.
- Interactive simulations.
- Adaptive exercises.
- Quiz interactions.
- Local progress interface.

## 9.4 Mathematical Logic Layer

Create an independent mathematical utility layer.

Suggested functions:

- vectorAdd()
- vectorSubtract()
- scalarMultiply()
- magnitude()
- normalize()
- dotProduct()
- crossProduct()
- angleBetween()
- projectVector()
- vectorComponents()
- linearCombination()

Functions must be pure where possible.

All mathematical calculations must be independent of rendering logic.

Use appropriate floating-point tolerances.

## 9.5 Data Architecture

Learning content should be maintained in MDX files.

Question banks and glossary data should be stored as structured TypeScript or JSON data.

Example module structure:

{
  "id": "dot-product",
  "title": "Dot Product",
  "difficulty": "intermediate",
  "estimatedDuration": 30,
  "prerequisites": ["vector-magnitude", "vector-components"],
  "objectives": [],
  "sections": [],
  "formulas": [],
  "examples": [],
  "exercises": [],
  "quizId": "quiz-dot-product"
}

This is a conceptual schema. The implementation may adapt it to Astro content collections.

## 9.6 Suggested Project Structure

vector-lab/
├── public/
│   ├── images/
│   ├── icons/
│   └── diagrams/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── learning/
│   │   ├── mathematics/
│   │   ├── playground/
│   │   ├── exercises/
│   │   └── quizzes/
│   ├── content/
│   │   └── modules/
│   ├── data/
│   │   ├── exercises/
│   │   ├── quizzes/
│   │   ├── glossary/
│   │   └── formulas/
│   ├── layouts/
│   ├── pages/
│   ├── lib/
│   │   ├── math/
│   │   ├── progress/
│   │   ├── quiz/
│   │   └── validation/
│   ├── styles/
│   └── types/
├── tests/
│   ├── unit/
│   └── e2e/
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md

---

# 10. NON-FUNCTIONAL REQUIREMENTS

## NFR-01: Performance

- Static pages should load quickly.
- Avoid shipping large JavaScript bundles unnecessarily.
- Lazy-load 3D visualization components.
- Avoid rendering inactive simulations.
- Optimize diagrams and images.
- Target Lighthouse Performance score of 90 or higher on representative desktop tests.

## NFR-02: Reliability

- Mathematical calculations must produce correct results.
- Invalid inputs must be handled gracefully.
- Local progress must not crash the application.
- Interactive components must have reset functionality.

## NFR-03: Maintainability

- Modular architecture.
- Reusable UI components.
- TypeScript strict mode.
- Clear content conventions.
- Documented mathematical functions.
- Consistent naming conventions.

## NFR-04: Compatibility

Prioritize:
- Chrome.
- Firefox.
- Edge.
- Safari.

Desktop and laptop browsers are the primary targets.

The interface should remain usable on narrower screens, even though desktop is the priority.

## NFR-05: Privacy

- No personal account information.
- No required student identity data.
- No backend collection of quiz results.
- Progress stays in local browser storage.
- Do not include unnecessary tracking scripts.

---

# 11. CONTENT QUALITY ASSURANCE

Mathematical correctness is a critical product requirement.

Every module must be reviewed for:

1. Correct mathematical definitions.
2. Correct formulas.
3. Correct notation.
4. Correct worked-example calculations.
5. Consistent vector dimensions.
6. Appropriate prerequisites.
7. Accurate computational applications.
8. Clear explanations.
9. Correct quiz answers.
10. Appropriate difficulty progression.

All numerical worked examples and answer keys should be verified independently.

Do not fabricate mathematical properties or present simplified explanations as universal rules.

Special attention:
- Cross product is dimension-specific.
- Division by zero must be handled.
- Normalization of zero vectors is undefined.
- Angle calculations require nonzero vector magnitudes.
- Numerical tolerances must be used where floating-point precision matters.

---

# 12. ACCEPTANCE CRITERIA

## AC-01: Public Access
- [ ] Homepage loads without authentication.
- [ ] All modules can be opened without login.
- [ ] No backend server is required.

## AC-02: Learning Content
- [ ] All 16 modules are available.
- [ ] Every module follows the standard content template.
- [ ] All formulas render correctly.
- [ ] Examples contain step-by-step solutions.
- [ ] Each module includes a summary and formula reference.

## AC-03: Playground
- [ ] All eight requested vector operations are implemented.
- [ ] Vector values can be modified interactively.
- [ ] Numerical results update immediately.
- [ ] 2D and 3D visualizations work where applicable.
- [ ] Invalid mathematical operations are handled.

## AC-04: Exercises
- [ ] Exercises support three difficulty levels.
- [ ] Feedback is provided after submission.
- [ ] Explanations are available.
- [ ] Adaptive difficulty rules work.

## AC-05: Quizzes
- [ ] Every topic has a quiz.
- [ ] At least five questions exist per topic.
- [ ] Score calculation is correct.
- [ ] Students can retry quizzes.
- [ ] Attempts persist locally.

## AC-06: Learning Progress
- [ ] Module completion can be recorded.
- [ ] Progress persists after refresh.
- [ ] Quiz results are stored locally.
- [ ] Reset functionality works.

## AC-07: Technical Quality
- [ ] Production build succeeds.
- [ ] No critical console errors.
- [ ] TypeScript checks pass.
- [ ] Mathematical unit tests pass.
- [ ] Main user flows pass end-to-end tests.
- [ ] Static deployment works.

---

# 13. DEVELOPMENT ROADMAP

Implement in the following phases.

## Phase 1 — Foundation
- Initialize Astro project.
- Configure TypeScript.
- Establish design tokens.
- Build navigation and layout.
- Configure MDX content collections.
- Implement formula rendering.
- Create homepage.

Deliverable: Functional website foundation.

## Phase 2 — Learning Content
- Implement all 16 module structures.
- Write and review educational content.
- Add formulas and diagrams.
- Add worked examples.
- Add glossary and formula reference.

Deliverable: Complete learning material platform.

## Phase 3 — Mathematical Engine
- Implement vector utility functions.
- Add unit tests.
- Validate 2D and 3D calculations.
- Implement numerical input validation.

Deliverable: Tested mathematical calculation layer.

## Phase 4 — Interactive Playground
- Implement 2D vector visualization.
- Implement 3D vector visualization.
- Build all eight operations.
- Add controls, sliders, and drag interactions.
- Add formulas and real-time numerical outputs.

Deliverable: Functional Vector Playground.

## Phase 5 — Assessment
- Build adaptive exercise engine.
- Create question bank.
- Implement topic quizzes.
- Implement feedback and explanations.
- Add local progress tracking.

Deliverable: Complete student assessment functionality.

## Phase 6 — Quality Assurance
- Test mathematical accuracy.
- Test user flows.
- Test desktop compatibility.
- Review accessibility.
- Optimize performance.
- Fix bugs.

Deliverable: Production-ready application.

## Phase 7 — Deployment
- Configure static build.
- Deploy to Cloudflare Pages or Netlify.
- Verify production routes.
- Verify asset loading.
- Test browser storage.
- Update README and deployment instructions.

Deliverable: Publicly accessible Vector Lab website.

---

# 14. IMPLEMENTATION RULES FOR OPENCODE

The coding agent must follow these rules throughout development.

## Rule 1: Follow the PRD
Do not arbitrarily remove or simplify required features.

## Rule 2: Work Incrementally
Implement one development phase at a time.

Do not attempt to implement the entire application in one unstructured operation.

## Rule 3: Mathematical Correctness First
Never prioritize visual appearance over mathematical correctness.

All core mathematical functions must have unit tests.

## Rule 4: Content Quality
Do not generate superficial placeholder explanations and treat them as completed learning materials.

Content must be detailed, understandable, and mathematically accurate.

## Rule 5: Functional Interactions
Every visible interactive control must work.

Do not create decorative buttons that have no functionality.

## Rule 6: Performance
Keep the website static-first.

Load React and Three.js only where required.

## Rule 7: No Backend
Do not introduce authentication, database services, or server dependencies unless explicitly requested in a future product revision.

## Rule 8: Documentation
Maintain README.md with:
- Installation instructions.
- Development commands.
- Project structure.
- Content authoring guide.
- Testing instructions.
- Build instructions.
- Deployment instructions.

## Rule 9: Progress Reporting
After each phase, report:
- Implemented features.
- Files created or modified.
- Tests performed.
- Test results.
- Known issues.
- Remaining tasks.

## Rule 10: Definition of Done
A feature is complete only when:
- Implementation exists.
- The feature works.
- Validation passes.
- Tests are written where applicable.
- Documentation is updated.

---

# 15. FINAL PRODUCT DEFINITION

Vector Lab is a comprehensive, static-first, interactive Engineering Mathematics learning platform for undergraduate Information Systems students.

Its core value is to connect mathematical theory, geometric visualization, numerical calculations, and practical computing applications.

The product should feel like a modern academic textbook equipped with an interactive mathematical laboratory.

**Primary experience:**
Learn → Understand → Visualize → Experiment → Calculate → Practice → Evaluate.

**Product principle:**
Make abstract mathematics understandable through structured explanations and meaningful interaction.

**Final objective:**
Help students develop genuine conceptual understanding of vectors rather than merely memorizing mathematical formulas.
