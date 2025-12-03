import express from 'express';
import cors from 'cors';
import routes from './routes';
import errorMiddleware from './middleware/error.middleware';

const app = express();

// Core middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root hint route
app.get('/', (_req, res) => {
	res.json({
		message: 'CMIS EventConnect API',
		docs: '/api',
		dbOverview: '/api/_db/overview'
	});
});

// API routes
app.use('/api', routes);

// Error handler (keep last)
app.use(errorMiddleware);

export default app;