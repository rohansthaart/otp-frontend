import React, { useState, ChangeEvent, KeyboardEvent, ClipboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { verifyOtp } from '../api/index'


const OtpPage: React.FC = () => {





    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [invalidInputs, setInvalidInputs] = useState<boolean[]>(Array(6).fill(false));

    const mutation = useMutation(
        (otp: string) => verifyOtp({ otp: +otp }),
        {
            onSuccess: (data) => {
                alert(data.message);
                navigate('/success');
            },
            onError: () => {
                alert('Verification Error');
            },
        }
    );
    const navigate = useNavigate();

    const handleChange = (elementIndex: number, event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[elementIndex] = value;
            setOtp(newOtp);

            if (value !== '' && elementIndex < 5) {
                document.getElementById(`otp${elementIndex + 1}`)?.focus();
            }

            const newInvalidInputs = [...invalidInputs];
            newInvalidInputs[elementIndex] = value === '';
            setInvalidInputs(newInvalidInputs);
        }
    };

    const handleKeyDown = (elementIndex: number, event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && otp[elementIndex] === '' && elementIndex > 0) {
            document.getElementById(`otp${elementIndex - 1}`)?.focus();
        }
    };

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const pasteData = event.clipboardData.getData('text').slice(0, 6);
        if (/^[0-9]{1,6}$/.test(pasteData)) {
            const newOtp = [...otp];
            const newInvalidInputs = [...invalidInputs];
            for (let i = 0; i < pasteData.length; i++) {
                newOtp[i] = pasteData[i];
                newInvalidInputs[i] = pasteData[i] === '';
            }
            setOtp(newOtp);
            setInvalidInputs(newInvalidInputs);
            const nextIndex = pasteData.length < 6 ? pasteData.length : 5;
            document.getElementById(`otp${nextIndex}`)?.focus();
        }
    };

    const handleSubmit = async () => {
        try {
            mutation.mutate(otp.join(''));
        } catch (err) {
            console.log(err);

        }



    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '96vh',
                width: '96vw',
            }}
        >
            <h1 className='heading-text'>Verification Code</h1>

            <div style={{ display: 'flex', gap: '8px' }}>
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        id={`otp${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(event) => handleChange(index, event)}
                        onKeyDown={(event) => handleKeyDown(index, event)}
                        onPaste={handlePaste}
                        className={`otp-input ${invalidInputs[index] ? 'invalid' : ''}`}
                    />
                ))}
            </div>
            {invalidInputs.some((invalid) => invalid) && (
                <p className='error-text'>Please enter the verification code</p>
            )}
            <button onClick={handleSubmit}
                className='otp-submit-button'
                style={{ marginTop: '20px' }}>Submit</button>
        </div>
    );
};

export default OtpPage;
