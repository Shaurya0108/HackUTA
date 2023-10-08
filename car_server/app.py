from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample car data
cars = []

@app.route('/api/add_car', methods=['POST'])
def add_car():
    data = request.get_json()
    if 'make' in data and 'model' in data:
        car = {
            'make': data['make'],
            'model': data['model']
        }
        cars.append(car)
        return jsonify({'message': 'Car added successfully'}), 201
    else:
        return jsonify({'error': 'Make and model are required fields'}), 400

@app.route('/api/get_cars', methods=['GET'])
def get_cars():
    return jsonify(cars)

@app.route('/api/swap_car/<int:index>', methods=['PUT'])
def swap_car(index):
    if 0 <= index < len(cars):
        # Swap the car at the specified index
        new_index = len(cars) - 1
        cars[index], cars[new_index] = cars[new_index], cars[index]
        return jsonify({'message': 'Car swapped successfully'}), 200
    else:
        return jsonify({'error': 'Invalid index'}), 400

if __name__ == '__main__':
    app.run(debug=True)
