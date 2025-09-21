# Savyo Backend

This is the backend server for Savyo, a modern discount and offers website. It provides a RESTful API for managing deals, stores, categories, and user authentication.

## Features

- User authentication with JWT
- Role-based access control (Admin/User)
- CRUD operations for deals, stores, and categories
- MongoDB database with Mongoose ODM
- TypeScript for type safety
- Express.js for the web server
- Error handling middleware
- Data seeding utility

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/savyo.git
cd savyo/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/savyo
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## Usage

### Development

Run the development server with hot reload:
```bash
npm run dev
```

### Production

Build the TypeScript code:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

### Database Seeding

Seed the database with sample data:
```bash
npm run seed
```

Destroy all data in the database:
```bash
npm run seed:destroy
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Deals
- `GET /api/deals` - Get all deals
- `GET /api/deals/:id` - Get single deal
- `POST /api/deals` - Create new deal (Protected)
- `PUT /api/deals/:id` - Update deal (Protected)
- `DELETE /api/deals/:id` - Delete deal (Protected)

### Stores
- `GET /api/stores` - Get all stores
- `GET /api/stores/:id` - Get single store
- `POST /api/stores` - Create new store (Admin only)
- `PUT /api/stores/:id` - Update store (Admin only)
- `DELETE /api/stores/:id` - Delete store (Admin only)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create new category (Admin only)
- `PUT /api/categories/:id` - Update category (Admin only)
- `DELETE /api/categories/:id` - Delete category (Admin only)

## Error Handling

The API uses a centralized error handling mechanism. All errors are returned in the following format:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Authentication

Protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 