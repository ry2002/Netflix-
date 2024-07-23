let generatedOTP;

async function generateOTP() {
    const contactInfo = document.getElementById('contact-info').value;

    if (!contactInfo) {
        alert('Please enter your email or phone number.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ contactInfo: contactInfo }),
        });

        if (response.ok) {
            const data = await response.json();
            generatedOTP = data.otp;
            console.log('Generated OTP:', generatedOTP);

            // Show the OTP in a pop-up message
            alert(`Your OTP is: ${generatedOTP}`);

            // Hide the verification section and show the OTP section
            document.getElementById('verification-section').style.display = 'none';
            document.getElementById('otp-section').style.display = 'block';
        } else {
            alert('Failed to send OTP. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}

function verifyOTP() {
    const enteredOTP = document.getElementById('otp').value;

    if (enteredOTP == generatedOTP) {
        // OTP is correct, show the welcome section
        document.getElementById('otp-section').style.display = 'none';
        document.getElementById('welcome-section').style.display = 'block';
    } else {
        // OTP is incorrect, show the error message
        document.getElementById('otp-error').style.display = 'block';
    }
}

function goToHomePage() {
    window.location.href = 'whoiswatching.html'; // Redirect to home page or desired page
}
