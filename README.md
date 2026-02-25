# Kanban Board

A modern, high-performance, and responsive Kanban Board application built with React, Vite, TypeScript, and TailwindCSS. It enables users to quickly manage, track, and interact with tasks across customizable columns seamlessly.

## 🚀 Built With

- **React 19 & TypeScript**: For scalable and fully typed components.
- **Vite**: Enabling lightning-fast HMR and building.
- **Tailwind CSS v4 & Radix UI**: Fully customizable and accessible UI building blocks.
- **dnd-kit**: A lightweight, performant, and accessible drag-and-drop toolkit for moving tasks across columns.
- **Zustand**: For simple and scalable global client-side state management.
- **React Query**: For efficient data fetching, caching, and state synchronization.
- **React Hook Form & Zod**: Form management and schema-based validation.
- **JSON Server**: A mock backend to handle persistent data fetching locally.

---

## 🌟 Current Features

1. **Interactive Kanban Board**
   - Easily track and visualize tasks based on their status across designated columns.
2. **Drag and Drop Functionality**
   - Built on top of `@dnd-kit`, allowing smooth and performant dragging of task cards across different columns to update their status immediately.
3. **Comprehensive Task Management**
   - **Add Tasks**: Form validation using `react-hook-form` and `zod` to create new tasks easily.
   - **Task Details Modal**: Expanded view to read detailed descriptions and manage task-specific data.
   - **Delete Task**: Delete unwanted or completed tasks safely from the detailed task view.
4. **Customizable Status & Priority Rules**
   - Visually clear UI mapping tasks to priorities (e.g., color-coded labels).
   - Dynamic tracking capabilities synced directly with the local data API.
5. **Robust State Synchronization**
   - Integrated with React Query for continuous syncing and caching of server state, ensuring the UI is reliable and snappy.

---

## 🔮 Future Implementations & Enhancements

To extend the scalability and functionality of this application, the following updates are proposed for future versions:

- **Advanced Data Caching Layer**: Add a sophisticated caching layer (potentially upgrading React Query’s offline capabilities or using a local database service like IndexedDB) to fully support offline functionality, fast data restoration, and reduced refetching.
- **Infinite Scrolling & Pagination**: Incorporate an infinite scrolling feature inside active board columns or data grids. This will prevent performance bottlenecks efficiently when the board scales to hundreds or thousands of task entries.
- **Advanced Filtering and Search functionality**: Ability to filter tasks by priority, tags, assignees, or dates right from the main board view.
- **Authentication & Authorization**: Incorporate a secure login mechanism (e.g., JWT) to support multi-user environments, personalized boards, and role-based access.
- **Real-Time Collaboration**: Integrate a WebSocket server (e.g., using Socket.io or Supabase) to seamlessly update views across multiple active clients if tasks are updated concurrently.
- **Task Dependencies & Subtasks**: Complex task planning by linking related issues and blocking items directly on task cards.
- **Due Dates & Notifications**: Timely integration of notifications and reminders natively built-in for upcoming task due records.

---

## 📦 Getting Started

### Prerequisites

Ensure you have Node.js (version 20+ is recommended) and npm installed. Check your versions using:

```bash
node -v
npm -v
```

### Installation & Setup

1. **Clone the repository** (if you haven't already):

   ```bash
   git clone <your-repo-url>
   cd kanban-board
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the Mock API (JSON Server)**:
   The application depends on a mock API server to manipulate data. Open a new terminal tab, navigate to the project directory, and start the JSON Database server:

   ```bash
   npm run json-server
   ```

   > The server will be running on `http://localhost:3000` watching `tasks-db.json`.

4. **Start the Frontend Development Server**:
   In another terminal tab simply run the development script:

   ```bash
   npm run dev
   ```

5. **Access the App**:
   Navigate entirely to the displayed local host URL (typically `http://localhost:5173`) in your browser.

## 🛠️ Scripts

- `npm run dev`: Starts the Vite client dev server.
- `npm run json-server`: Fires up the local JSON DB mock engine.
- `npm run build`: Type-checks and builds the production bundle via Vite.
- `npm run lint`: Performs lint checks via ESLint across the codebase.
- `npm run preview`: Bootstraps a local server to preview the built projection exactly how it runs on production environments.
