import User from '../../models/User';
import connectToDatabase from '../../lib/mongoose';
import jwt from 'jsonwebtoken';  // Import JWT for session handling

export default async function handler(req, res) {
    await connectToDatabase();

    // Extract token from request headers
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    try {
        // Verify token to get user details
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const { username, email } = decodedToken;

        const { quizName, score } = req.body;

        if (!quizName || score === undefined) {
            return res.status(400).json({ error: 'Invalid data' });
        }

        // Find user by username or email and update their quiz score
        const updatedUser = await User.findOneAndUpdate(
            { $or: [{ username }, { email }] },
            { $push: { quizScores: { quizName, score } } },
            { new: true, upsert: true }
        );

        res.status(200).json({ message: 'Score updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating score:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
