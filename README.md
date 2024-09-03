# Dashboard Assignment

This project is a dynamic dashboard implementation based on the provided assignment for frontend trainees. It allows users to view, add, and remove widgets across different categories.

## Features

- Dynamic dashboard layout based on JSON configuration
- Add and remove widgets from categories
- Search functionality for widgets
- Responsive design

## Technologies Used

- React (Next.js)
- TypeScript
- Tailwind CSS
- Recharts for data visualization
- Lucide React for icons
- Custom UI components

## Getting Started

### Prerequisites

- Node.js (version 14 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/dhruvvbhavsar/accuknox
   ```

2. Navigate to the project directory:
   ```
   cd accuknox
   ```

3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

### Running the Application

To run the application locally:

```
npm run dev
```
or
```
yarn dev
```

The application should now be running on `http://localhost:3000`.

## Project Structure

- `app/`: Contains the main dashboard page component
- `components/`: Reusable React components
  - `charts/`: Chart components (e.g., `donut.tsx`)
  - `ui/`: UI components (buttons, inputs, etc.)
- `data.json`: Initial dashboard configuration
- `public/`: Static assets

## Implementation Details

1. The dashboard is built dynamically based on a JSON configuration.
2. Users can add widgets to categories using the "Add Widget" functionality.
3. Widgets can be removed either by clicking the 'X' icon on the widget or unchecking them in the category list.
4. The project uses a state management solution (likely React's useState or a more robust solution like Redux) to handle widget additions and removals.
5. Chart visualizations are implemented using Recharts library.

## Assignment Requirements

- [x] Create a JSON to build the dashboard dynamically
- [x] Implement functionality to add and remove widgets
- [x] Display random text for individual widgets (for assignment purposes)
- [x] Implement "Add Widget" functionality with name and text input
- [x] Add a cross icon to remove widgets from categories
- [x] Implement widget removal through category list unchecking
- [x] Add search functionality for widgets

## Further Improvements

- Implement persistent storage (e.g., localStorage or backend integration)
- Add more chart types and customization options
- Enhance error handling and input validation
- Implement drag-and-drop functionality for widget rearrangement