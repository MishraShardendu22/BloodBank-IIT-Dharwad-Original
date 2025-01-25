import { sign } from 'jsonwebtoken';

interface User {
    _id: string;
}

const jwtMaker = ({ user }: { user: User }) => {
        const token =  sign(
        { _id: user._id },
        process.env.JWT_SECRET_KEY!,
        { expiresIn: '1d' }        )
}

export { jwtMaker }