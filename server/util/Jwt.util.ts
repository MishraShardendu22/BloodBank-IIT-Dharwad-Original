import { sign } from 'jsonwebtoken';

interface User {
    _id: string;
}

const jwtMaker = ({ role, user }: { role: string, user: User }) => {
    const token =  sign(
        { 
            _id: user._id ,
            role: role
        },
        process.env.JWT_SECRET_KEY!,
        { 
            expiresIn: '1d' 
        }
    )
    return token;
}

export { jwtMaker }