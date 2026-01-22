import { useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { passwordResetAPI } from '../services/passwordResetService';
import toast from 'react-hot-toast';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

const VerifyResetCode = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);

    // Redirect if no email in state
    if (!email) {
        navigate('/forgot-password');
        return null;
    }

    const handleChange = (index, value) => {
        // Only allow numbers
        if (!/^\d*$/.test(value)) return;
        
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newCode = [...code];
        for (let i = 0; i < pastedData.length; i++) {
            newCode[i] = pastedData[i];
        }
        setCode(newCode);
        inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const codeString = code.join('');
        if (codeString.length !== 6) {
            toast.error('Please enter the complete 6-digit code');
            return;
        }

        setLoading(true);
        try {
            const response = await passwordResetAPI.verifyCode(email, codeString);
            if (response.success) {
                toast.success(response.message);
                navigate('/reset-password', { state: { email, code: codeString } });
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid or expired code');
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        try {
            const response = await passwordResetAPI.requestReset(email);
            if (response.success) {
                toast.success('New code sent to your email');
                setCode(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
            }
        } catch (error) {
            toast.error('Failed to resend code');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <Link to="/forgot-password" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Link>
                    <div className="flex justify-center">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <ShieldCheck className="w-12 h-12 text-blue-600" />
                        </div>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Enter Verification Code
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        We've sent a 6-digit code to <span className="font-medium">{email}</span>
                    </p>
                </div>
                
                <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                    <div>
                        <div className="flex justify-center gap-2" onPaste={handlePaste}>
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={el => inputRefs.current[index] = el}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            ))}
                        </div>
                        <p className="mt-3 text-center text-xs text-gray-500">
                            Code expires in 15 minutes
                        </p>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? 'Verifying...' : 'Verify Code'}
                        </button>
                    </div>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={handleResendCode}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Didn't receive the code? Resend
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerifyResetCode;
