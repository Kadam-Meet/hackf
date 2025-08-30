import React, { useState } from 'react';
import axios from 'axios';

function ResumeUploader() {
    const [resumeFile, setResumeFile] = useState(null);
    const [jdFile, setJdFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!resumeFile || !jdFile) {
            setError('Please upload both a resume and a job description.');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        // 1. Create a FormData object
        const formData = new FormData();
        formData.append('resume', resumeFile);
        formData.append('jd', jdFile);

        try {
            // 2. Send the form data to your Node.js/Express backend
            const response = await axios.post('/api/analyze-resume', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // 3. Set the result in state to display it
            setResult(response.data);
        } catch (err) {
            setError('An error occurred during analysis.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Resume ATS Checker</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Resume (.pdf, .txt):</label>
                    <input type="file" onChange={(e) => setResumeFile(e.target.files[0])} accept=".pdf,.txt" />
                </div>
                <div>
                    <label>Job Description (.pdf, .txt):</label>
                    <input type="file" onChange={(e) => setJdFile(e.target.files[0])} accept=".pdf,.txt" />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Analyzing...' : 'Analyze'}
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {result && (
                <div>
                    <h2>Analysis Result</h2>
                    <h3>ATS Score: {result.ats_score} / 100</h3>
                    
                    <h4>✅ Strengths:</h4>
                    <ul>
                        {result.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>

                    <h4>💡 Suggestions:</h4>
                    <ul>
                        {result.feedback.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ResumeUploader;