import User from '../../models/User';
import connectToDatabase from '../../lib/mongoose';
import jwt from 'jsonwebtoken';  // Import JWT for session handling

export default async function handler(req, res) {
    await connectToDatabase();

    // Extract JWT token from the request headers
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    try {
        // Verify the JWT token to get the user's details
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decodedToken); // Check the decoded token

        const { username, email } = decodedToken; // Extract username or email from token payload
        console.log('User data from token:', { username, email }); // Verify if username and email exist

        // Fetch user data based on username or email from the database
        const user = await User.findOne({ $or: [{ username }, { email }] })
                               .select('-password');  // Exclude password field
        console.log('User found:', user); // Verify if the user was found

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the user's profile data including quiz scores
        return res.status(200).json({
            username: user.username,
            email: user.email,
            quizScores: user.quizScores,  // Assuming quizScores is stored in the user document
        });

    } catch (error) {
        console.error('Error retrieving user profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
