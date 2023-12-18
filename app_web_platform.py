from flask import Flask,render_template,request,jsonify
from chat import get_response

app = Flask(__name__)

@app.route('/')
def home():
	return render_template('home.html')
@app.post('/predict')
def predict():
	text = request.get_json().get("message")

	response = get_response(text)
	message = {"answer": response}
	return jsonify(message)
@app.route('/chat')
def chat():
	return render_template('chat.html')

if __name__ == "__main__":
	app.run(debug=True)