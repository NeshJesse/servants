from flask import Flask, jsonify, render_template
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/profiles')
def profiles():
    with open('updated_members.json', 'r') as file:
        profiles_data = json.load(file)
    return jsonify(profiles_data)

if __name__ == '__main__':
    app.run(debug=True)
