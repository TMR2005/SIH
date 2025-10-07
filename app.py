from flask import Flask, jsonify, render_template
import random

app = Flask(__name__)

# Example panel data mapping
PANEL_LOCATIONS = {
    "P1": "North Wing",
    "P2": "East Wing",
    "P3": "South Wing",
    "P4": "West Wing",
    "P5": "Roof Section A",
    "P6": "Roof Section B"
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def data():
    # Simulated random data (replace this with your actual sensor logic)
    total_panels = 6
    faulty_panels = random.choice([0, 1, 2])  # simulate 0–2 faulty panels
    faulty_ids = random.sample(list(PANEL_LOCATIONS.keys()), faulty_panels)

    # 🧠 Automatically populate faulty_details
    faulty_details = [{"panel_id": pid, "location": PANEL_LOCATIONS[pid]} for pid in faulty_ids]

    # Simulated output
    output = {
        "solar": {
            "generation": round(random.uniform(200, 250), 2),
            "efficiency": round(random.uniform(85, 92), 2),
            "inverter": round(random.uniform(95, 98), 2),
            "total_panels": total_panels,
            "faulty_panels": faulty_panels,
            "faulty_details": faulty_details  # always provided
        },
        "pump": {
            "efficiency": round(random.uniform(80, 90), 2),
            "flow": random.randint(50000, 60000)
        },
        "impact": {
            "cost_savings": round(random.uniform(1100, 1300), 2),
            "co2_saved": round(random.uniform(700, 750), 1)
        },
        "energy_mix": [random.randint(70, 90), random.randint(10, 30)]
    }

    return jsonify(output)


if __name__ == '__main__':
    app.run(debug=True)