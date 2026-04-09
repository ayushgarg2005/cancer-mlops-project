const API_URL = "http://127.0.0.1:8000/predict";

// Create 30 feature inputs
const featuresGrid = document.getElementById('features-grid');
const featureNames = [
    "radius_mean", "texture_mean", "perimeter_mean", "area_mean", "smoothness_mean",
    "compactness_mean", "concavity_mean", "concave_pts_mean", "symmetry_mean", "fractal_dim_mean",
    "radius_se", "texture_se", "perimeter_se", "area_se", "smoothness_se",
    "compactness_se", "concavity_se", "concave_pts_se", "symmetry_se", "fractal_dim_se",
    "radius_worst", "texture_worst", "perimeter_worst", "area_worst", "smoothness_worst",
    "compactness_worst", "concavity_worst", "concave_pts_worst", "symmetry_worst", "fractal_dim_worst"
];

// Dynamically generate form inputs for 30 features
featureNames.forEach((name, i) => {
    const group = document.createElement('div');
    group.className = 'input-group';
    
    const label = document.createElement('label');
    label.innerText = `F${i+1}`;
    label.title = name; // Provide full name on hover
    
    const input = document.createElement('input');
    input.type = 'number';
    input.step = 'any';
    input.id = `f${i}`;
    input.required = true;
    input.placeholder = "0.0";
    
    group.appendChild(label);
    group.appendChild(input);
    featuresGrid.appendChild(group);
});

// Real Sample Malignant Data (Target = 0 in code based on standard dataset)
const sampleMalignant = [
    17.99, 10.38, 122.8, 1001.0, 0.1184, 0.2776, 0.3001, 0.1471, 0.2419,
    0.07871, 1.095, 0.9053, 8.589, 153.4, 0.006399, 0.04904, 0.05373,
    0.01587, 0.03003, 0.006193, 25.38, 17.33, 184.6, 2019.0, 0.1622,
    0.6656, 0.7119, 0.2654, 0.4601, 0.1189
];

// General representation for a Benign Tumor (Target = 1)
const sampleBenign = [
    13.54, 14.36, 87.46, 566.3, 0.09779, 0.08129, 0.06664, 0.04781, 0.1885,
    0.05766, 0.2699, 0.7886, 2.058, 23.56, 0.008462, 0.0146, 0.02387,
    0.01315, 0.0198, 0.0023, 15.11, 19.26, 99.7, 711.2, 0.144, 0.1773,
    0.239, 0.1288, 0.2977, 0.07259
];

// Interactive Buttons
document.getElementById('btn-malignant').addEventListener('click', () => fillData(sampleMalignant));
document.getElementById('btn-benign').addEventListener('click', () => fillData(sampleBenign));
document.getElementById('btn-clear').addEventListener('click', () => {
    document.getElementById('prediction-form').reset();
    resetResult();
});

function fillData(dataArray) {
    dataArray.forEach((val, i) => {
        document.getElementById(`f${i}`).value = val;
    });
    
    // Quick visual flash to indicate load
    featuresGrid.style.opacity = '0.3';
    setTimeout(() => { featuresGrid.style.opacity = '1'; }, 200);
}

function resetResult() {
    const resultPanel = document.getElementById('result-panel');
    resultPanel.className = 'result-panel glass-panel';
    
    document.getElementById('status-icon').innerText = '🔍';
    document.getElementById('result-text').innerText = 'Awaiting Input...';
    document.getElementById('result-text').style.color = 'inherit';
    document.getElementById('result-desc').innerText = 'Submit 30 features from a biopsy to run the ML model.';
}

// Logic for Prediction Check
document.getElementById('prediction-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('btn-predict');
    submitBtn.innerText = 'Analyzing...';
    submitBtn.classList.add('is-loading');

    // Gather 30 values sequentially
    const data = [];
    for (let i = 0; i < 30; i++) {
        data.push(parseFloat(document.getElementById(`f${i}`).value));
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data })
        });
        
        if (!response.ok) throw new Error('API server unreachable');
        
        const result = await response.json();
        displayResult(result);
        
    } catch (error) {
        console.error('Error Calling Predict API:', error);
        alert('Failed to connect to the API. Make sure the FastAPI server is running with CORS enabled!');
        resetResult();
    } finally {
        submitBtn.innerText = 'Analyze Tumor';
        submitBtn.classList.remove('is-loading');
    }
});

function displayResult(resultData) {
    const resultPanel = document.getElementById('result-panel');
    const statusIcon = document.getElementById('status-icon');
    const resultText = document.getElementById('result-text');
    const resultDesc = document.getElementById('result-desc');
    
    // According to app.py logic, prediction 1 means 'Benign (Safe)' and 0 means 'Malignant (Cancer)'
    if (resultData.prediction === 0) {
        resultPanel.className = 'result-panel glass-panel is-malignant';
        statusIcon.innerText = '⚠️';
        resultText.innerText = 'Malignant (Cancer)';
        resultDesc.innerText = 'The AI model predicts that this tumor is malignant. Immediate clinical attention is highly recommended.';
    } else {
        resultPanel.className = 'result-panel glass-panel is-benign';
        statusIcon.innerText = '✅';
        resultText.innerText = 'Benign (Safe)';
        resultDesc.innerText = 'The AI model predicts that this tumor is benign. No cancerous activity detected at this stage.';
    }
}
