# TrucksWheel - Vehicle Listing Platform

TrucksWheel is a comprehensive vehicle listing platform that allows users to list light vehicles (cars) and heavy vehicles (trucks) for sale. The platform features an admin dashboard for managing and approving listings before they go live.

## Features

### For Sellers
- **Light Vehicle Listings**: Submit detailed car listings with specifications, photos, and pricing
- **Heavy Vehicle Listings**: Submit truck and commercial vehicle listings
- **Multi-step Form Process**: User-friendly forms with validation and progress tracking
- **Photo Upload**: Support for multiple photos per listing

### For Admins
- **Dashboard Overview**: View statistics on total listings, sellers, and pending requests
- **Listing Approval System**: Review and approve/reject pending vehicle listings
- **Dynamic Updates**: Real-time updates of pending listing counts and actions

### Backend Features
- **MySQL Database**: Structured storage for pending, approved, and rejected listings
- **RESTful API**: Express.js API for listing management
- **Approval Workflow**: Listings move from pending to approved/rejected tables based on admin decisions

## Tech Stack

### Frontend
- **React**: Component-based UI with hooks for state management
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Router**: Client-side routing

### Backend
- **Node.js**: JavaScript runtime for server-side logic
- **Express.js**: Web framework for API development
- **MySQL2**: Database driver for MySQL connections
- **CORS**: Cross-origin resource sharing for API access

## Project Structure

```
truckswheel/
├── public/                 # Static assets
├── src/
│   ├── admin/             # Admin dashboard components
│   ├── components/        # Reusable UI components
│   ├── context/           # React context for state management
│   ├── data/              # Static data files
│   └── assets/            # Images and other assets
├── server/
│   ├── db.js              # Database connection configuration
│   ├── index.js           # Express server and API routes
│   ├── migrations/        # Database schema files
│   └── package.json       # Server dependencies
├── images/                # Project images
└── package.json           # Frontend dependencies
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MySQL Server
- npm or yarn

### Database Setup
1. Create a MySQL database named `truckswheel_db`
2. Copy `server/.env.example` to `server/.env` and update with your database credentials
3. Run the migration to create tables:
   ```bash
   mysql -u your_username -p truckswheel_db < server/migrations/create_listings_tables.sql
   ```

### Installation
1. Install frontend dependencies:
   ```bash
   npm install
   ```

2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

3. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /listings` - Submit a new vehicle listing
- `GET /listings/pending` - Get all pending listings for admin review
- `POST /listings/:id/approve` - Approve a pending listing
- `POST /listings/:id/reject` - Reject a pending listing

## Usage

1. **Submit a Listing**: Use the "Add Listing" page to submit light or heavy vehicle listings
2. **Admin Approval**: Admins can log into the dashboard to review and approve/reject listings
3. **Workflow**: Pending listings are stored in the database, approved ones move to approved table, rejected to rejected table

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
