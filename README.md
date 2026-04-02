# Finance Dashboard UI

A responsive finance dashboard built for a Frontend Developer Intern assignment using React, Vite, Tailwind CSS, Zustand, and Recharts.

## Live Demo

- Live Demo: `https://finance-dashboard-beta-murex.vercel.app`
- Repository: `https://github.com/Anakvyas/Finance-dashboard`

## Overview

This project simulates a lightweight finance dashboard where users can:

- view account summaries
- explore transactions
- understand spending patterns
- switch between `Viewer` and `Admin` modes

The project uses mock data and frontend-only state management to demonstrate component structure, interaction design, responsive UI, and chart-based data presentation.

## Features

- Summary cards for total balance, total income, total expenses, and net status
- Time-based transaction trend chart
- Category-based spending breakdown chart
- Monthly income vs expense comparison chart
- Transaction search and sort
- Viewer/Admin role switching
- Admin-only add and delete transaction actions
- Insight cards for highest spending category and monthly change
- CSV export support
- Local storage persistence with Zustand
- Responsive layout for desktop, tablet, and mobile
- Empty states for charts, insights, and transactions

## Tech Stack

- React
- Vite
- Tailwind CSS
- Zustand
- Recharts

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Clone the project

```bash
git clone https://github.com/Anakvyas/Finance-dashboard
cd Finance-dashboard
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Create a production build

```bash
npm run build
```

## Project Structure

```text
src/
  components/    Reusable UI components
  data/          Mock transaction data
  pages/         Page-level views
  store/         Zustand state
  utils/         Formatting helpers
```

## Role-Based Behavior

- `Viewer`
  Can explore summaries, charts, insights, and transactions in read-only mode.

- `Admin`
  Can add transactions, delete transactions, and export records.

## State Management

Zustand is used to manage:

- transaction data
- selected role
- add/delete transaction actions
- local storage persistence
- category normalization for consistent display

## Assignment Coverage

### Dashboard Overview

- financial summary cards
- time-based chart
- category-based chart

### Transactions Section

- transaction list with date, amount, category, type, and note
- search functionality
- sorting controls

### Basic Role-Based UI

- frontend-only Viewer/Admin switch
- role-based UI actions

### Insights Section

- highest spending category
- monthly change
- monthly comparison chart

### UI and UX

- responsive layout
- empty states
- animated background and subtle motion

## Notes

- This project uses mock/static data only.
- No backend or API integration is required for this assignment.
- Local persistence is handled in the browser using Zustand middleware.
